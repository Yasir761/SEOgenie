
import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword } = body;

  if (!keyword) {
    return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
  }

  const userPrompt = createPrompt(keyword);

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a social media content strategist." },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
    })
  });

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content;

  try {
    const parsed = JSON.parse(output || "{}");
    return NextResponse.json({ keyword, tags: parsed.tags });
  } catch (err) {
    return NextResponse.json({ keyword, error: "Failed to parse hashtag output." });
  }
}
