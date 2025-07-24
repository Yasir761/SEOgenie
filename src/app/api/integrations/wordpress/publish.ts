import { WordPressPostInput } from "./schema";
import { getWordPressAuthToken } from "./auth";
import { WordPressPostResponse } from "./types";

/**
 * Publishes a blog post to the user's WordPress site via REST API.
 * @param data - The blog post content and user credentials
 */
export async function publishBlogToWordPress(data: WordPressPostInput): Promise<WordPressPostResponse> {
  const {
    siteUrl,
    username,
    applicationPassword,
    title,
    content,
    slug,
    meta_description
  } = data;

  if (!siteUrl || !username || !applicationPassword || !title || !content) {
    throw new Error("Missing required fields for publishing to WordPress");
  }

  const endpoint = `${siteUrl.replace(/\/$/, "")}/wp-json/wp/v2/posts`;

  const requestBody = {
    title,
    content,
    status: "publish",
    slug: slug?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || undefined,
    excerpt: meta_description || "",
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: getWordPressAuthToken(username, applicationPassword),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("❌ WordPress publish error:", text);
      throw new Error(`Failed to publish post: ${text}`);
    }

    return JSON.parse(text) as WordPressPostResponse;
  } catch (err) {
    console.error("💥 WordPress publish exception:", err);
    throw new Error("Unexpected error while publishing to WordPress.");
  }
}
