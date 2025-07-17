import { NextRequest, NextResponse } from "next/server";
import { createLinkedInTeaserPrompt } from "./prompt";
import { LinkedInTeaserSchema } from "./schema";

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
  }

  const prompt = createLinkedInTeaserPrompt(title, content);

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a LinkedIn content strategist." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5
      })
    });

    const json = await res.json();
    const teaser = json.choices?.[0]?.message?.content?.trim();

    const validated = LinkedInTeaserSchema.safeParse({ teaser });

    if (!validated.success) {
      return NextResponse.json({
        error: "Validation failed",
        raw: teaser,
        issues: validated.error.flatten()
      }, { status: 422 });
    }

    return NextResponse.json(validated.data);
  } catch (err) {
    console.error("❌ LinkedIn Teaser Agent Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
