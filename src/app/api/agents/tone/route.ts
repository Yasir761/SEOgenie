import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { ToneSchema } from "./schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword } = body;

  if (!keyword) {
    return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
  }

  const systemPrompt = createPrompt(keyword);

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
    const output = data.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(output || "{}");
    } catch (err) {
      return NextResponse.json({
        keyword,
        error: "❌ Failed to parse JSON from model.",
        raw: output
      }, { status: 500 });
    }

    const result = ToneSchema.safeParse(parsed);

    if (!result.success) {
      console.error("❌ Tone/Voice validation failed:", result.error.format());
      return NextResponse.json({
        keyword,
        error: "Invalid tone/voice format",
        issues: result.error.flatten(),
        raw: parsed
      }, { status: 422 });
    }

    return NextResponse.json({ keyword, ...result.data });
  } catch (err) {
    console.error("💥 Tone agent error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
