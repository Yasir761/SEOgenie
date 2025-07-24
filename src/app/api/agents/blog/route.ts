import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { BlogOutputSchema } from "./schema";
import {
  countTokens,
  isWithinTokenLimit,
  splitTextByTokenLimit,
} from "@/app/api/utils/tokenUtils"; 

const MAX_TOKENS = 2048;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword, outline, tone, voice, seo } = body;

  if (!keyword || !outline || !tone || !voice || !seo?.optimized_title || !seo?.meta_description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const prompt = createPrompt({
    keyword,
    outline,
    tone,
    voice,
    title: seo.optimized_title,
    meta: seo.meta_description,
  });

  // ✅ Token safety check
  if (!isWithinTokenLimit(prompt, MAX_TOKENS)) {
    console.warn("⚠️ Prompt exceeds token limit. Splitting...");

    const chunks = splitTextByTokenLimit(prompt, MAX_TOKENS);

    if (chunks.length === 0) {
      return NextResponse.json({ error: "Failed to split prompt safely" }, { status: 500 });
    }

    // Optionally: You can later stitch multiple chunks and call OpenAI multiple times if needed
    return NextResponse.json({
      warning: "Prompt was too long and has been trimmed for now. Please shorten input or upgrade plan.",
      trimmedPrompt: chunks[0],
      tokens: countTokens(chunks[0])
    }, { status: 413 }); // Payload Too Large
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful blog writer." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
        max_tokens: MAX_TOKENS,
      }),
    });
 


    const data = await response.json();
    const blog = data.choices?.[0]?.message?.content?.trim();

    console.log("📨 Full OpenAI raw response:", JSON.stringify(data, null, 2));

    const result = BlogOutputSchema.safeParse({ blog, keyword });

    if (!result.success) {
      console.error("❌ Blog schema validation failed:", result.error.format());
      return NextResponse.json({
        keyword,
        error: "Blog output did not meet expected format",
        issues: result.error.flatten(),
        raw: blog,
      }, { status: 422 });
    }

    console.log("🧠 Blog generated:", result.data.blog);
    return NextResponse.json(result.data);
  } catch (err) {
    console.error("Writer Agent Error:", err);
    return NextResponse.json({ error: "Failed to generate blog." }, { status: 500 });
  }
}
