import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {  clerkClient } from "@clerk/clerk-sdk-node";
import { connectDB } from "@/app/api/utils/db";
import { BlogModel } from "@/app/models/blog";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized: Please sign in" }, { status: 401 });
  }

  // ✅ Optional: Ensure email is verified
  const user = await clerkClient.users.getUser(userId);
  const emailVerified = user.emailAddresses[0]?.verification?.status === "verified";

  if (!emailVerified) {
    return NextResponse.json({ error: "Email not verified" }, { status: 403 });
  }

  const body = await req.json();
  const { keyword } = body;

  if (!keyword) {
    return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    await connectDB();

    // 1️⃣ Keyword Agent
    const keywordRes = await fetch("http://localhost:3000/api/agents/keyword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword })
    });
    const keywordData = await keywordRes.json();
    if (!keywordRes.ok || !keywordData.intent) {
      return NextResponse.json({ error: "Keyword agent failed", details: keywordData }, { status: 500 });
    }
    const { intent } = keywordData;

    // 2️⃣ Blueprint Agent
    const blueprintRes = await fetch("http://localhost:3000/api/agents/blueprint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, tone: intent })
    });
    const blueprintData = await blueprintRes.json();
    if (!blueprintRes.ok || !blueprintData.outline) {
      return NextResponse.json({ error: "Blueprint agent failed", details: blueprintData }, { status: 500 });
    }
    const { outline } = blueprintData;

    // 3️⃣ Tone Agent
    const toneRes = await fetch("http://localhost:3000/api/agents/tone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword })
    });
    const toneData = await toneRes.json();
    if (!toneRes.ok || !toneData.tone || !toneData.voice) {
      return NextResponse.json({ error: "Tone agent failed", details: toneData }, { status: 500 });
    }
    const { tone, voice } = toneData;

    // 4️⃣ Hashtag Agent
    const tagRes = await fetch("http://localhost:3000/api/agents/hashtags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword })
    });
    const tagData = await tagRes.json();
    if (!tagRes.ok || !Array.isArray(tagData.tags)) {
      return NextResponse.json({ error: "Hashtag agent failed", details: tagData }, { status: 500 });
    }
    const tags = tagData.tags;

    // 5️⃣ SEO Optimizer Agent
    const seoRes = await fetch("http://localhost:3000/api/agents/seo-optimizer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, outline, tone, voice, tags })
    });
    const seo = await seoRes.json();
    if (!seoRes.ok || !seo.optimized_title || !seo.meta_description) {
      return NextResponse.json({ error: "SEO Optimizer agent failed", details: seo }, { status: 500 });
    }

    // 6️⃣ Blog Writer Agent
    const writerRes = await fetch("http://localhost:3000/api/agents/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, outline, tone, voice, seo })
    });
    const writerData = await writerRes.json();
    if (!writerRes.ok || !writerData.blog) {
      return NextResponse.json({ error: "Blog writer agent failed", details: writerData }, { status: 500 });
    }

    // 💾 Save full blog to DB
    const savedBlog = await BlogModel.create({
      keyword,
      intent,
      tone,
      voice,
      outline: Array.isArray(outline) ? outline : outline.split("\n").filter(Boolean),
      tags,
      seo: {
        optimized_title: seo.optimized_title,
        meta_description: seo.meta_description,
        slug: seo.slug,
        final_hashtags: seo.final_hashtags
      },
      blog: writerData.blog,
      userId, // ✅ Save the logged-in user's ID
      createdAt: new Date()
    });

    return NextResponse.json({
      message: "Blog successfully created",
      blog: savedBlog
    });

  } catch (err) {
    console.error("💥 Orchestrator Fatal Error:", err);
    return NextResponse.json({ error: "Failed to complete agent workflow." }, { status: 500 });
  }
}
