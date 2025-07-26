import { NextRequest, NextResponse } from "next/server"
import { createPrompt } from "./prompt"
import { AnalyzeAgentSchema } from "./schema"
import {
  isWithinTokenLimit,
  splitTextByTokenLimit
} from "@/app/api/utils/tokenUtils"
import { connectDB } from "@/app/api/utils/db"
import { UserModel } from "@/app/models/user"
import { checkAndConsumeCredit } from "@/app/api/utils/useCredits"

const MAX_TOKENS = 2000

export async function POST(req: NextRequest) {
  const { keyword, email } = await req.json()

  if (!keyword || !email) {
    return NextResponse.json({ error: "Missing keyword or email" }, { status: 400 })
  }

  try {
    await connectDB()

    // 🔐 Enforce plan and consume credit if needed
    await checkAndConsumeCredit(email) // <-- handles Pro bypass and Free/Starter enforcement

    // 🔍 Fetch SERP data via SerpAPI (only used after credit check)
    const serpRes = await fetch(
      `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&api_key=${process.env.SERP_API_KEY}`
    )
    const serpJson = await serpRes.json()

    if (!serpJson.organic_results || serpJson.organic_results.length === 0) {
      return NextResponse.json({ error: "No SERP data found" }, { status: 404 })
    }

    const organicResults = serpJson.organic_results.slice(0, 5)

    // 🧠 Create prompt
    const prompt = createPrompt(keyword, organicResults)

    if (!isWithinTokenLimit(prompt, MAX_TOKENS)) {
      const chunks = splitTextByTokenLimit(prompt, MAX_TOKENS)
      return NextResponse.json({
        error: "Prompt too long",
        chunks,
        suggestion: "Reduce number of SERP results or truncate content."
      }, { status: 413 })
    }

    // 🤖 Call Groq for AI completion
    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are an SEO analyst and strategist." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3
      })
    })

    const aiJson = await aiRes.json()

    if (!aiJson.choices?.[0]?.message?.content) {
      return NextResponse.json({ error: "No AI content returned." }, { status: 500 })
    }

    const rawOutput = aiJson.choices[0].message.content

    let parsed
    try {
      parsed = JSON.parse(rawOutput || "{}")
    } catch (err) {
      console.error("❌ JSON parse error:", err, "\nOutput:", rawOutput)
      return NextResponse.json({ error: "Failed to parse AI output", raw: rawOutput }, { status: 500 })
    }

    const validation = AnalyzeAgentSchema.safeParse(parsed)

    if (!validation.success) {
      return NextResponse.json({
        error: "Output schema validation failed",
        issues: validation.error.flatten(),
        raw: parsed
      }, { status: 422 })
    }

    return NextResponse.json({
      keyword,
      ...validation.data
    })

  } catch (err: any) {
    console.error("🔍 Analyze Agent Fatal Error:", err)
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
  }
}
