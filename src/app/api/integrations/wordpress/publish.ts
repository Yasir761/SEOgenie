import { WordPressPostInput } from "./schema";
import { getWordPressAuthToken } from "./auth";
import { WordPressPostResponse } from "./types";

export async function publishBlogToWordPress(data: WordPressPostInput): Promise<WordPressPostResponse> {
  const { siteUrl, username, applicationPassword, title, content, slug, meta_description } = data;

  const endpoint = `${siteUrl.replace(/\/$/, "")}/wp-json/wp/v2/posts`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: getWordPressAuthToken(username, applicationPassword),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      status: "publish",
      slug,
      excerpt: meta_description,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`WordPress API error: ${errText}`);
  }

  return res.json();
}
