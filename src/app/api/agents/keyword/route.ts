
import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { KeywordIntentSchema } from "./schema";

const cache = new Map<string, any>(); // Basic in-memory cache

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword } = body;

  if (!keyword) {
    return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
  }

  // ✅ Return from cache if already generated
  if (cache.has(keyword)) {
    return NextResponse.json({ ...cache.get(keyword), cached: true });
  }

  const userPrompt = createPrompt(keyword);

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a professional SEO keyword intent analyzer." },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.2,
    }),
  });

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content;

  try {
    const parsed = JSON.parse(output || "{}");

    const result = KeywordIntentSchema.safeParse(parsed);

    if (!result.success) {
      console.error("Validation failed:", result.error.format());
      return NextResponse.json({
        error: "Invalid output format from model",
        raw: output,
        issues: result.error.flatten(),
      }, { status: 422 });
    }

    // ✅ Save to cache
    cache.set(keyword, result.data);

    return NextResponse.json(result.data);
  } catch (err) {
    console.error("JSON parse error:", err, "\nRaw output:", output);
    return NextResponse.json({
      error: "Failed to parse JSON",
      raw: output,
    }, { status: 500 });
  }
}
