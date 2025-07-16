import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { BlogOutlineSchema } from "./schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword, tone } = body;

  if (!keyword || !tone) {
    return NextResponse.json({ error: "Missing keyword or tone" }, { status: 400 });
  }

  const systemPrompt = createPrompt(keyword, tone);

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

    // Convert bullet point text → string[]
    const outline = rawOutput
      .split(/\n|•|-/) // split by line, bullet, or dash
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 3); // remove empty or short lines

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
