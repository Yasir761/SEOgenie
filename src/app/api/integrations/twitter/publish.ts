import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { TwitterTokenData } from "./types";

const consumerKey = process.env.X_API_KEY!;
const consumerSecret = process.env.X_API_SECRET!;

const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(base: string, key: string): string {
    return crypto.createHmac("sha1", key).update(base).digest("base64");
  },
});

export async function publishTwitterThread(
  tokens: TwitterTokenData,
  content: string
) {
  const tweets = splitToThread(content); // Split into tweets under 280 chars
  let lastTweetId: string | undefined;

  for (const tweet of tweets) {
    const url = "https://api.twitter.com/2/tweets";
    const request_data = {
      url,
      method: "POST",
      data: {
        text: tweet,
        ...(lastTweetId ? { reply: { in_reply_to_tweet_id: lastTweetId } } : {}),
      },
    };

    const headers = oauth.toHeader(
      oauth.authorize(request_data, {
        key: tokens.accessToken,
        secret: tokens.accessSecret,
      })
    );

    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_data.data),
    });

    const json = await res.json();
    lastTweetId = json.data?.id;
  }
}

function splitToThread(text: string): string[] {
  const sentences = text.split(/(?<=[.?!])\s+/);
  const thread: string[] = [];
  let tweet = "";

  for (const sentence of sentences) {
    if ((tweet + sentence).length <= 275) {
      tweet += sentence + " ";
    } else {
      thread.push(tweet.trim());
      tweet = sentence + " ";
    }
  }

  if (tweet.trim()) thread.push(tweet.trim());
  return thread;
}
