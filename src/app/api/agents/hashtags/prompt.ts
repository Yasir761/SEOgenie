export function createPrompt(keyword: string): string {
  return `
You're a social media strategist.

Given the blog keyword, generate 5–7 relevant hashtags to promote it on platforms like Twitter, LinkedIn, and Instagram.

- Make sure they are short, relevant, and formatted with \"#\".
- Do not include any explanations or extra text.
- Output must be a valid JSON object with a \"tags\" array.

Example output:
{
  "tags": ["#AIWriting", "#ContentMarketing", "#AIForCreators"]
}

Keyword: "${keyword}"
`;
}
