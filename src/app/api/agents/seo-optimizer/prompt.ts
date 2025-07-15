export function createPrompt(
  keyword: string,
  outline: string[],
  tone: string,
  voice: string,
  hashtags: string[]
): string {
  return `
You are an expert in SEO content optimization.

Given:
- Blog keyword: "${keyword}"
- Outline: ${JSON.stringify(outline)}
- Desired tone: ${tone}
- Desired voice: ${voice}
- Suggested hashtags: ${JSON.stringify(hashtags)}

Return ONLY a valid JSON object like:
{
  "optimized_title": "...",
  "meta_description": "...",
  "slug": "...",
  "final_hashtags": ["...", "...", "..."]
}

Requirements:
- Title should be clear, clickable, and SEO-friendly
- Meta description must summarize the blog in 140–160 characters
- Slug should be lowercase, hyphen-separated, and concise
- Final hashtags should be 3–5 relevant tags

Only return the JSON. No explanation or commentary.
`;
}
