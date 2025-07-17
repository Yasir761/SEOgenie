// app/api/integrations/google/export/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createGoogleDoc } from "../docs";
import { GoogleTokenData } from "../types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, tokens } = body;

  if (!title || !content || !tokens) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const documentId = await createGoogleDoc(tokens as GoogleTokenData, title, content);
    return NextResponse.json({ success: true, documentId });
  } catch (err) {
    console.error("Google Docs export error:", err);
    return NextResponse.json({ error: "Failed to export to Google Docs" }, { status: 500 });
  }
}
