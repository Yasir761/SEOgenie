import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { KeywordIntentSchema } from "./schema";

const cache = new Map<string, any>(); // Basic memory cache

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();

  if (!keyword) {
    return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
  }

  if (cache.has(keyword)) {
    return NextResponse.json({ ...cache.get(keyword), cached: true });
  }

  const prompt = createPrompt(keyword);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a precise SEO keyword intent analyzer." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      })
    });

    const json = await response.json();
    let raw = json.choices?.[0]?.message?.content?.trim();

    if (!raw) {
      return NextResponse.json({ error: "No content returned from model" }, { status: 500 });
    }

    // 🧼 Remove formatting like ```json ... ```
    raw = raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("❌ JSON parsing error:", err, "\nReturned content:", raw);
      return NextResponse.json({ error: "Failed to parse model response", raw }, { status: 500 });
    }

    const result = KeywordIntentSchema.safeParse(parsed);
    if (!result.success) {
      console.error("❌ Validation error:", result.error.flatten());
      return NextResponse.json({ error: "Validation failed", raw: parsed, issues: result.error.flatten() }, { status: 422 });
    }

    cache.set(keyword, result.data);
    return NextResponse.json(result.data);
  } catch (err) {
    console.error("💥 Keyword Intent Agent Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
