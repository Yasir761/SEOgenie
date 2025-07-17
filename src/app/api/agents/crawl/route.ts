import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { CrawlEnhanceSchema } from "./schema";
import { createEnhancementPrompt } from "./prompt";
import {
  isWithinTokenLimit,
  splitTextByTokenLimit,
  countTokens
} from "@/app/api/utils/tokenUtils";
import { connectDB } from "@/app/api/utils/db";
import { CrawledBlogModel } from "@/app/models/crawledBlog";
import { auth } from "@clerk/nextjs/server"; // if using Clerk

const parser = new Parser();
const MAX_TOKENS = 2000;

export async function POST(req: NextRequest) {
  const { rssUrl } = await req.json();

  if (!rssUrl) {
    return NextResponse.json({ error: "Missing RSS feed URL" }, { status: 400 });
  }

  try {
    await connectDB();

    // Clerk user check (optional)
    const { userId } = await auth(); // If Clerk is used
    // if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 1️⃣ Fetch latest blog post from RSS
    const feed = await parser.parseURL(rssUrl);
    const firstItem = feed.items[0];
    if (!firstItem || !firstItem.link || !firstItem.title) {
      return NextResponse.json({ error: "No valid blog post found in feed." }, { status: 404 });
    }

    // 2️⃣ Fetch blog HTML
    const res = await fetch(firstItem.link);
    const html = await res.text();
    const $ = cheerio.load(html);
    const paragraphs = $("article p").map((_, el) => $(el).text()).get();
    const content = paragraphs.join("\n").trim();

    if (!content || content.length < 300) {
      return NextResponse.json({ error: "Blog content too short or not found" }, { status: 422 });
    }

    const title = firstItem.title;
    const meta = $("meta[name='description']").attr("content") || "";

    // 3️⃣ Run through AI agents
    const [intent, toneVoice, seo] = await Promise.all([
      fetch("http://localhost:3000/api/agents/keyword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: title })
      }).then(res => res.json()),

      fetch("http://localhost:3000/api/agents/tone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: title })
      }).then(res => res.json()),

      fetch("http://localhost:3000/api/agents/seo-optimizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: title,
          outline: [],
          tone: "informative",
          voice: "neutral",
          tags: []
        })
      }).then(res => res.json())
    ]);

    // 4️⃣ Enhance blog content
    const enhancedPrompt = `
You are an expert blog editor. Improve this blog in tone, SEO, flow, and engagement:

---
Title: ${title}
Meta: ${meta}
Tone: ${toneVoice.tone || "informative"}
Voice: ${toneVoice.voice || "neutral"}
Intent: ${intent.intent || "Informational"}
SEO: ${seo.optimized_title}, ${seo.meta_description}
---
Content:
${content}

Rules:
- Keep core meaning, but improve quality.
- Use Markdown headings.
- Minimum 800 words.
- Improve flow, readability, and SEO.

Output:
Return only the final improved blog content.
`.trim();

    if (!isWithinTokenLimit(enhancedPrompt, MAX_TOKENS)) {
      return NextResponse.json({
        error: "Prompt too long to enhance safely",
        suggestion: "Shorten article or content",
        chunks: splitTextByTokenLimit(enhancedPrompt, MAX_TOKENS)
      }, { status: 413 });
    }

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an expert blog enhancement agent." },
          { role: "user", content: enhancedPrompt }
        ],
        temperature: 0.6
      })
    });

    const aiJson = await aiRes.json();
    const enhancedBlog = aiJson.choices?.[0]?.message?.content?.trim();

    if (!enhancedBlog) {
      return NextResponse.json({ error: "No enhanced content returned." }, { status: 500 });
    }

    // 5️⃣ Compare original vs enhanced
    const diffPrompt = createEnhancementPrompt(content, enhancedBlog);

    if (!isWithinTokenLimit(diffPrompt, MAX_TOKENS)) {
      return NextResponse.json({
        error: "Prompt too long to compare versions",
        suggestion: "Try reducing content size"
      }, { status: 413 });
    }

    const compareRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a content diff analyzer." },
          { role: "user", content: diffPrompt }
        ],
        temperature: 0.3
      })
    });

    const compareJson = await compareRes.json();
    const comparison = JSON.parse(compareJson.choices?.[0]?.message?.content || "{}");

    const result = CrawlEnhanceSchema.safeParse({
      original: {
        title,
        content,
        meta_description: meta,
        tone: toneVoice.tone,
        voice: toneVoice.voice,
        seo,
        intent: intent.intent
      },
      enhanced: {
        title: seo.optimized_title,
        content: enhancedBlog,
        meta_description: seo.meta_description,
        tone: toneVoice.tone,
        voice: toneVoice.voice,
        seo,
        intent: intent.intent
      },
      changes: comparison
    });

    if (!result.success) {
      return NextResponse.json({
        error: "Final validation failed",
        issues: result.error.flatten()
      }, { status: 422 });
    }

    // 6️⃣ Save to MongoDB
    await CrawledBlogModel.create({
      userId, // Optional — only if Clerk is used
      sourceUrl: rssUrl,
      title,
      original: result.data.original,
      enhanced: result.data.enhanced,
      changes: result.data.changes,
      createdAt: new Date()
    });

    // ✅ Return
    return NextResponse.json(result.data);
  } catch (err) {
    console.error("💥 Crawl & Enhance Agent Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
