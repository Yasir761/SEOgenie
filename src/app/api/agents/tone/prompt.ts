export function createPrompt(keyword: string): string {
  return `
You are a blog tone and voice strategist.

Given the blog keyword and audience, suggest:
- An appropriate **tone** (e.g., informative, casual, persuasive, humorous)
- A suitable **voice style** (e.g., confident, friendly, authoritative)

Respond ONLY in the following JSON format:

{
  "tone": "...",
  "voice": "..."
}

Keyword: "${keyword}"

`;
}
