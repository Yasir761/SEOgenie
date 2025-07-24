import { NextRequest, NextResponse } from "next/server";
import { createGoogleDoc } from "../docs";
import { GoogleTokenData } from "../types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, tokens } = body;

  if (!title || !content || !tokens || !tokens.access_token) {
    return NextResponse.json({ error: "Missing title, content, or valid tokens" }, { status: 400 });
  }

  try {
    const docId = await createGoogleDoc(tokens as GoogleTokenData, title, content);

    if (!docId) {
      return NextResponse.json({ error: "Failed to create Google Doc" }, { status: 502 });
    }

    return NextResponse.json({ success: true, documentId: docId });
  } catch (err: any) {
    console.error("🚨 Google Docs export error:", err?.message || err);
    return NextResponse.json({ error: "Failed to export to Google Docs", detail: err.message }, { status: 500 });
  }
}
