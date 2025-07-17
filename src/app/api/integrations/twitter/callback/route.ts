import { NextRequest, NextResponse } from "next/server";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const consumerKey = process.env.X_API_KEY!;
const consumerSecret = process.env.X_API_SECRET!;
const callbackUrl = process.env.TWITTER_CALLBACK_URL!;

const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(base: string, key: string) {
    return crypto.createHmac("sha1", key).update(base).digest("base64");
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const oauthToken = searchParams.get("oauth_token")!;
  const oauthVerifier = searchParams.get("oauth_verifier")!;

  const res = await fetch("https://api.twitter.com/oauth/access_token", {
    method: "POST",
    headers: {
      ...oauth.toHeader(
        oauth.authorize(
          {
            url: "https://api.twitter.com/oauth/access_token",
            method: "POST",
          },
          { key: oauthToken, secret: "" }
        )
      ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      oauth_verifier: oauthVerifier,
      oauth_token: oauthToken,
    }),
  });

  const text = await res.text();
  const params = new URLSearchParams(text);

  return NextResponse.redirect(
    `http://localhost:3000/dashboard?twitter_token=${params.get("oauth_token")}&screen_name=${params.get(
      "screen_name"
    )}`
  );
}
