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

    const { userId } = await auth(); // Clerk check optional

    const feed = await parser.parseURL(rssUrl);
    const firstItem = feed.items?.[0];

    if (!firstItem?.link || !firstItem?.title) {
      return NextResponse.json({ error: "No valid blog post found in RSS." }, { status: 404 });
    }

    const res = await fetch(firstItem.link);
    const html = await res.text();
    const $ = cheerio.load(html);

    // 📄 Fallback strategy for scraping
    const paragraphs = $("article p, div.post-content p, p").map((_, el) => $(el).text()).get();
    const content = paragraphs.join("\n").trim();

    if (!content || content.length < 300) {
      return NextResponse.json({ error: "Blog content too short or not found" }, { status: 422 });
    }

    const title = firstItem.title;
    const meta = $("meta[name='description']").attr("content") || "";

    // 🔁 Run AI agents
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

    // ✍️ Enhancement Prompt
    const enhancedPrompt = `
You are an expert blog editor. Improve the following blog post:

Title: ${title}
Meta: ${meta}
Tone: ${toneVoice.tone || "informative"}
Voice: ${toneVoice.voice || "neutral"}
Intent: ${intent.intent || "Informational"}
SEO: ${seo.optimized_title}, ${seo.meta_description}

Content:
${content}

Enhance by:
- Keeping original meaning
- Improving tone, grammar, flow
- Using Markdown headers
- Boosting SEO where possible
- Expanding content (800+ words)

Only return the enhanced blog content.
    `.trim();

    if (!isWithinTokenLimit(enhancedPrompt, MAX_TOKENS)) {
      return NextResponse.json({
        error: "Prompt too long to enhance safely",
        chunks: splitTextByTokenLimit(enhancedPrompt, MAX_TOKENS)
      }, { status: 413 });
    }

    // 🎯 Enhance
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a precise and SEO-aware blog improver." },
          { role: "user", content: enhancedPrompt }
        ],
        temperature: 0.4
      })
    });

    const aiJson = await aiRes.json();
    const enhancedBlog = aiJson.choices?.[0]?.message?.content?.trim();

    if (!enhancedBlog || enhancedBlog.length < 400) {
      return NextResponse.json({ error: "Enhanced blog is too short or missing." }, { status: 500 });
    }

    // 🔍 Diff comparison
    const diffPrompt = createEnhancementPrompt(content, enhancedBlog);

    if (!isWithinTokenLimit(diffPrompt, MAX_TOKENS)) {
      return NextResponse.json({
        error: "Comparison prompt too long",
        suggestion: "Try smaller blog content"
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
          { role: "system", content: "You are a JSON diff analyzer." },
          { role: "user", content: diffPrompt }
        ],
        temperature: 0.2
      })
    });

    const compareJson = await compareRes.json();
    let comparison;
    try {
      comparison = JSON.parse(compareJson.choices?.[0]?.message?.content || "{}");
    } catch (e) {
      return NextResponse.json({ error: "Failed to parse comparison JSON" }, { status: 500 });
    }

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

    // ✅ Save to DB
    await CrawledBlogModel.create({
      userId,
      sourceUrl: rssUrl,
      title,
      original: result.data.original,
      enhanced: result.data.enhanced,
      changes: result.data.changes,
      createdAt: new Date()
    });

    return NextResponse.json(result.data);
  } catch (err) {
    console.error("💥 Crawl & Enhance Agent Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}