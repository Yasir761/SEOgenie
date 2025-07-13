
import { NextRequest, NextResponse } from "next/server";
import { cosineSimilarity, getEmbedding } from "../../utils/utils";
import prompts from "./prompt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const keyword = body.keyword;
  if (!keyword) return NextResponse.json({ error: "Missing keyword" }, { status: 400 });

  const keywordEmbedding = await getEmbedding(`query: ${keyword}`);

  // Compute cosine similarity with each intent example
  let bestIntent = "";
  let bestScore = -1;

  for (const intent of prompts.intents) {
    const score = cosineSimilarity(keywordEmbedding, intent.embedding);
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent.label;
    }
  }

  return NextResponse.json({
    keyword,
    intent: bestIntent,
    confidence: bestScore.toFixed(3),
  });
}
