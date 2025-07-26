import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "./prompt";
import { ToneSchema } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { checkAndConsumeCredit } from "@/app/api/utils/useCredits";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyword } = body;

  if (!keyword) {
    return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    // 🔐 Authenticate and get user email
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userRes = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const user = await userRes.json();
    const email = user?.email_addresses?.[0]?.email_address;

    if (!email) return NextResponse.json({ error: "User email not found" }, { status: 403 });

    // ✅ Check plan and consume credit if applicable
    await checkAndConsumeCredit(email, { allowOnly: ["Starter", "Pro"] });

    const prompt = createPrompt(keyword);

    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a blog tone and voice strategist." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4,
      }),
    });

    const data = await aiRes.json();
    const raw = data.choices?.[0]?.message?.content?.trim();

    if (!raw) {
      return NextResponse.json({ error: "No AI output received." }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("❌ Tone JSON parse failed:", err, "\nRaw output:", raw);
      return NextResponse.json({
        error: "Model returned invalid JSON.",
        raw
      }, { status: 500 });
    }

    const validated = ToneSchema.safeParse(parsed);

    if (!validated.success) {
      console.error("❌ Tone schema validation failed:", validated.error.format());
      return NextResponse.json({
        error: "Invalid tone/voice format",
        issues: validated.error.flatten(),
        raw: parsed
      }, { status: 422 });
    }

    return NextResponse.json({ keyword, ...validated.data });
  } catch (err) {
    console.error("💥 Tone Agent error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
