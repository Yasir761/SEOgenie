import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { BlogOutputSchema } from "./schema";

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
    meta: seo.meta_description
  });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or fallback
        messages: [
          { role: "system", content: "You are a helpful blog writer." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
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
        raw: blog
      }, { status: 422 });
    }

    console.log("🧠 Blog generated:", result.data.blog);
    return NextResponse.json(result.data);
  } catch (err) {
    console.error("Writer Agent Error:", err);
    return NextResponse.json({ error: "Failed to generate blog." }, { status: 500 });
  }
}
