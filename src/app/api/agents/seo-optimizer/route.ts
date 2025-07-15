
import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword, outline, tone, voice, tags } = body;

  if (!keyword || !outline || !tone || !voice || !tags) {
    return NextResponse.json({ error: "Missing one or more required fields" }, { status: 400 });
  }

  const userPrompt = createPrompt(keyword, outline, tone, voice, tags);

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are an SEO optimization expert for AI-generated blog content." },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
    })
  });

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content;

  try {
    const parsed = JSON.parse(output || "{}");
    return NextResponse.json({ keyword, ...parsed });
  } catch (err) {
    return NextResponse.json({ keyword, error: "Failed to parse SEO optimizer output." });
  }
}
