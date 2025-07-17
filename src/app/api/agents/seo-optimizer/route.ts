import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { SEOOptimizerSchema } from "./schema";
import {
  countTokens,
  isWithinTokenLimit,
  splitTextByTokenLimit,
} from "@/app/api/utils/tokenUtils";

const MAX_TOKENS = 2048;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword, outline, tone, voice, tags } = body;

  if (!keyword || !outline || !tone || !voice || !tags) {
    return NextResponse.json(
      { error: "Missing one or more required fields" },
      { status: 400 }
    );
  }

  const userPrompt = createPrompt(keyword, outline, tone, voice, tags);

  // ✅ Token safety check
  if (!isWithinTokenLimit(userPrompt, MAX_TOKENS)) {
    const trimmed = splitTextByTokenLimit(userPrompt, MAX_TOKENS)[0] || "";
    console.warn("⚠️ Prompt too long. Using trimmed version.");
    return NextResponse.json(
      {
        warning: "Prompt exceeded token limit. Try simplifying your input.",
        trimmedPrompt: trimmed,
        tokenCount: countTokens(trimmed),
      },
      { status: 413 }
    );
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are an SEO optimization expert for AI-generated blog content.",
          },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(output || "{}");
    } catch (parseErr) {
      console.error("❌ JSON parse failed:", parseErr, "\n🧾 Raw output:", output);
      return NextResponse.json(
        { keyword, error: "Invalid JSON returned from LLM.", raw: output },
        { status: 500 }
      );
    }

    const result = SEOOptimizerSchema.safeParse(parsed);

    if (!result.success) {
      console.error("❌ Zod validation failed:", result.error.format());
      return NextResponse.json(
        {
          error: "Invalid SEO optimizer format.",
          issues: result.error.flatten(),
          raw: parsed,
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ keyword, ...result.data });
  } catch (err) {
    console.error("💥 SEO Optimizer error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
