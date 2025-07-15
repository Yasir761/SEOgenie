import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword } = body;

  if (!keyword) {
    return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    // 1. Keyword Agent (Intent Detection)
    const keywordRes = await fetch("http://localhost:3000/api/agents/keyword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword })
    });
    const { intent } = await keywordRes.json();

    // 2. Blueprint Agent (Outline)
    const blueprintRes = await fetch("http://localhost:3000/api/agents/blueprint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, tone: intent })
    });
    const { outline } = await blueprintRes.json();

    // 3. Tone Agent
    const toneRes = await fetch("http://localhost:3000/api/agents/tone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword })
    });
    const { tone, voice } = await toneRes.json();

    // 4. Hashtag Agent
    const tagRes = await fetch("http://localhost:3000/api/agents/hashtags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword })
    });
    const { tags } = await tagRes.json();

    // 5. SEO Optimizer
    const seoRes = await fetch("http://localhost:3000/api/agents/seo-optimizer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, outline, tone, voice,  tags })
    });
    const seo = await seoRes.json();

    // 6. Writer Agent (placeholder for now)
   const writerRes = await fetch("http://localhost:3000/api/agents/blog", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ keyword, outline, tone, voice, seo })
});
const { blog } = await writerRes.json();

    return NextResponse.json({
      keyword,
      intent,
      tone,
      voice,
      outline,
      tags,
      seo,
      blog
    });
  } catch (err) {
    console.error("Orchestrator Error:", err);
    return NextResponse.json({ error: "Failed to complete agent workflow." }, { status: 500 });
  }
}
