// app/api/integrations/google/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getTokensFromCode } from "../auth";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code not found" }, { status: 400 });
  }

  try {
    const tokens = await getTokensFromCode(code);
    // Optionally save tokens to DB or session here
    return NextResponse.redirect("/dashboard?google=connected");
  } catch (err) {
    console.error("OAuth Callback Error:", err);
    return NextResponse.json({ error: "OAuth callback failed" }, { status: 500 });
  }
}
