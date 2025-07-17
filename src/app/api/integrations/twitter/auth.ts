import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { NextRequest } from "next/server";

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

export function getTwitterAuthHeader(
  url: string,
  method: string,
  token: { key: string; secret: string } = { key: "", secret: "" }
) {
  return oauth.toHeader(oauth.authorize({ url, method }, token));
}
