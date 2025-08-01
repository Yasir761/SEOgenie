import { NextRequest, NextResponse } from "next/server"
import { createPrompt } from "./prompt"
import { BlogOutputSchema } from "./schema"
import {
  countTokens,
  isWithinTokenLimit,
  splitTextByTokenLimit,
} from "@/app/api/utils/tokenUtils"
import { connectDB } from "@/app/api/utils/db"
import { checkAndConsumeCredit } from "@/app/api/utils/useCredits"

const MAX_TOKENS = 2048

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { keyword, outline, tone, seo } = body

  if (
    !keyword ||
    !outline ||
    !tone ||
    !seo?.optimized_title ||
    !seo?.meta_description
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    // 🔗 Connect and check credit access
    await connectDB()
    // await checkAndConsumeCredit(email, { allowOnly: ["Starter", "Pro"] }) // handles Free, Starter, Pro

    // ✨ Create AI-Powered prompt
    const prompt = createPrompt({
      keyword,
      outline,
      tone,
      voice: body.voice || "",
      title: seo.optimized_title,
      meta: seo.meta_description,
    })

    // 🚀 Token safety check
    if (!isWithinTokenLimit(prompt, MAX_TOKENS)) {
      const chunks = splitTextByTokenLimit(prompt, MAX_TOKENS)
      if (chunks.length === 0) {
        return NextResponse.json(
          { error: "Prompt too long and could not be split." },
          { status: 500 }
        )
      }

      return NextResponse.json(
        {
          warning: "Prompt was too long and has been trimmed. Please shorten input or upgrade your plan.",
          trimmedPrompt: chunks[0],
          tokens: countTokens(chunks[0]),
        },
        { status: 413 }
      )
    }

    // 🎯 Generate with OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a professional blog writer. Write a blog article in clean, structured HTML using proper headings (h1, h2, h3), paragraphs, bold text, and lists where necessary. Avoid placeholder years (like 2023 or 2024); instead, use 'this year' or be timeless. Ensure the result is high quality and looks like a published blog.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: MAX_TOKENS,
      }),
    })

    const data = await response.json()
    const blog = data.choices?.[0]?.message?.content?.trim()

    console.log("📨 Full OpenAI response:", JSON.stringify(data, null, 2))

    // 🔍 Validate output schema
    const result = BlogOutputSchema.safeParse({ blog, keyword })

    if (!result.success) {
      return NextResponse.json(
        {
          keyword,
          error: "Output schema invalid",
          issues: result.error.flatten(),
          raw: blog,
        },
        { status: 422 }
      )
    }

    return NextResponse.json(result.data)
  } catch (err: any) {
    console.error("❌ Blog Agent Error:", err)
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 })
  }
}