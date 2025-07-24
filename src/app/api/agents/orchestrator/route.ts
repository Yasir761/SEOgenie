import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { connectDB } from "@/app/api/utils/db";
import { BlogModel } from "@/app/models/blog";

// Agent endpoints map for easy re-use
const AGENT_ENDPOINTS = {
  keyword: "/api/agents/keyword",
  blueprint: "/api/agents/blueprint",
  tone: "/api/agents/tone",
  hashtags: "/api/agents/hashtags",
  seo: "/api/agents/seo-optimizer",
  blog: "/api/agents/blog"
};

const LOCALHOST = "http://localhost:3000";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized: Please sign in" }, { status: 401 });
  }

  const user = await clerkClient.users.getUser(userId).catch(() => null);
  const emailVerified = user?.emailAddresses?.[0]?.verification?.status === "verified";
  if (!emailVerified) {
    return NextResponse.json({ error: "Email not verified" }, { status: 403 });
  }

  const { keyword } = await req.json();
  if (!keyword) {
    return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    await connectDB();

    // 👉 Helper to call agents and handle errors
    const callAgent = async (path: string, body: any) => {
      const res = await fetch(`${LOCALHOST}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw { status: res.status, agent: path, error: json };
      return json;
    };

    // 1️⃣ Keyword Agent
    const keywordData = await callAgent(AGENT_ENDPOINTS.keyword, { keyword });
    const intent = keywordData.intent;

    // 2️⃣ Blueprint Agent
    const blueprintData = await callAgent(AGENT_ENDPOINTS.blueprint, { keyword, tone: intent });
    const outline = blueprintData.outline;

    // 3️⃣ Tone Agent
    const toneData = await callAgent(AGENT_ENDPOINTS.tone, { keyword });
    const { tone, voice } = toneData;

    // 4️⃣ Hashtag Agent
    const tagData = await callAgent(AGENT_ENDPOINTS.hashtags, { keyword });
    const tags = tagData.tags;

    // 5️⃣ SEO Optimizer Agent
    const seo = await callAgent(AGENT_ENDPOINTS.seo, {
      keyword, outline, tone, voice, tags
    });

    // 6️⃣ Blog Writer Agent
    const writerData = await callAgent(AGENT_ENDPOINTS.blog, {
      keyword, outline, tone, voice, seo
    });

    // 💾 Save Blog to DB
    const saved = await BlogModel.create({
      userId,
      keyword,
      intent,
      tone,
      voice,
      tags,
      outline,
      blog: writerData.blog,
      seo: {
        optimized_title: seo.optimized_title,
        meta_description: seo.meta_description,
        slug: seo.slug,
        final_hashtags: seo.final_hashtags,
      },
      createdAt: new Date()
    });

    return NextResponse.json({
      message: "✅ Blog successfully created",
      blog: saved
    });

  } catch (err: any) {
    console.error("💥 Orchestrator error:", err);

    if (err?.agent && err?.status) {
      return NextResponse.json({
        error: `Agent ${err.agent} failed`,
        details: err.error || "Unknown agent error"
      }, { status: err.status });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
