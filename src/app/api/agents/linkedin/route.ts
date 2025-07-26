import { NextRequest, NextResponse } from "next/server";
import { createLinkedInTeaserPrompt } from "./prompt";
import { LinkedInTeaserSchema } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { checkAndConsumeCredit } from "@/app/api/utils/useCredits";

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
  }

  try {
    // 🔐 Authenticate and extract email
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRes = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const user = await userRes.json();
    const email = user?.email_addresses?.[0]?.email_address;

    if (!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 403 });
    }

    // ✅ Consume credit (Free: 3, Starter: 25, Pro: unlimited)
    await checkAndConsumeCredit(email);

    const prompt = createLinkedInTeaserPrompt(title, content);

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a LinkedIn content strategist." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
      }),
    });

    const json = await res.json();
    let teaser = json.choices?.[0]?.message?.content?.trim() || "";

    // Clean markdown formatting
    teaser = teaser.replace(/```[\s\S]*?```/g, "").replace(/["“”]+/g, "").trim();

    const validated = LinkedInTeaserSchema.safeParse({ teaser });

    if (!validated.success) {
      console.error("❌ Teaser validation failed:", validated.error.flatten());
      return NextResponse.json({
        error: "Validation failed",
        raw: teaser,
        issues: validated.error.flatten(),
      }, { status: 422 });
    }

    return NextResponse.json(validated.data);
  } catch (err) {
    console.error("💥 LinkedIn Teaser Agent Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
