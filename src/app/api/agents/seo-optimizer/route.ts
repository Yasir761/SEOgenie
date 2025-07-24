import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { SEOOptimizerSchema } from "./schema";
import {
  countTokens,
  isWithinTokenLimit,
  splitTextByTokenLimit
} from "@/app/api/utils/tokenUtils";

const MAX_TOKENS = 2048;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword, outline, tone, voice, tags } = body;

  if (!keyword || !outline || !tone || !voice || !tags) {
    return NextResponse.json({ error: "Missing one or more required fields" }, { status: 400 });
  }

  const prompt = createPrompt(keyword, outline, tone, voice, tags);

  if (!isWithinTokenLimit(prompt, MAX_TOKENS)) {
    const chunks = splitTextByTokenLimit(prompt, MAX_TOKENS);
    return NextResponse.json({
      error: "Prompt too long",
      suggestion: "Try trimming outline or tags",
      tokens: countTokens(prompt),
      chunks,
    }, { status: 413 });
  }

  try {
    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are an SEO optimization expert." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
      }),
    });

    const aiJson = await aiRes.json();
    const raw = aiJson.choices?.[0]?.message?.content?.trim();

    if (!raw) {
      return NextResponse.json({ error: "No response from model." }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("❌ Failed to parse JSON:", err, "\nOutput:", raw);
      return NextResponse.json({ error: "Invalid JSON from model", raw }, { status: 500 });
    }

    // ✨ Optional: Normalize slug & tags if needed
    if (parsed.slug) {
      parsed.slug = parsed.slug.toLowerCase().replace(/[^a-z0-9\-]/g, "").replace(/\s+/g, "-");
    }
    if (Array.isArray(parsed.final_hashtags)) {
      parsed.final_hashtags = parsed.final_hashtags.map((t: string) =>
        t.startsWith("#") ? t.trim() : `#${t.trim()}`
      );
    }

    const validation = SEOOptimizerSchema.safeParse(parsed);
    if (!validation.success) {
      console.error("❌ Schema failed:", validation.error.format());
      return NextResponse.json({
        error: "Invalid SEO structure",
        issues: validation.error.flatten(),
        raw: parsed
      }, { status: 422 });
    }

    return NextResponse.json({ keyword, ...validation.data });
  } catch (err) {
    console.error("💥 SEO Agent fatal error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
