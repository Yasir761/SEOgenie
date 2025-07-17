import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { BlogOutlineSchema } from "./schema";
import {
  countTokens,
  isWithinTokenLimit,
  splitTextByTokenLimit,
} from "@/app/api/utils/tokenUtils";

const MAX_TOKENS = 2048;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword, tone } = body;

  if (!keyword || !tone) {
    return NextResponse.json({ error: "Missing keyword or tone" }, { status: 400 });
  }

  const systemPrompt = createPrompt(keyword, tone);

  // ✅ Token safety check
  if (!isWithinTokenLimit(systemPrompt, MAX_TOKENS)) {
    const trimmed = splitTextByTokenLimit(systemPrompt, MAX_TOKENS)[0] || "";
    console.warn("⚠️ Prompt too long. Using trimmed prompt.");
    return NextResponse.json({
      warning: "Prompt exceeded token limit. Try with a shorter topic.",
      trimmedPrompt: trimmed,
      tokens: countTokens(trimmed),
    }, { status: 413 });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are an expert blog strategist." },
          { role: "user", content: systemPrompt }
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    const rawOutput = data.choices?.[0]?.message?.content || "";

    // 🧠 Convert output into clean bullet points
    const outline = rawOutput
      .split(/\n|•|-/)
      .map((line:string) => line.trim())
      .filter((line:string) => line.length > 3);

    const result = BlogOutlineSchema.safeParse({ outline });

    if (!result.success) {
      console.error("❌ Outline validation failed:", result.error.format());
      return NextResponse.json({
        error: "Invalid blog outline format.",
        raw: rawOutput,
        issues: result.error.flatten()
      }, { status: 422 });
    }

    return NextResponse.json({ keyword, outline: result.data.outline });
  } catch (err) {
    console.error("💥 Blueprint agent error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
