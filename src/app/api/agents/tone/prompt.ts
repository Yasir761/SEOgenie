export function createPrompt(keyword: string): string {
  return `
You are an expert blog strategist.

Your task is to determine the best **tone** and **voice** for writing a blog about the keyword provided.

Definitions:
- Tone: The emotional feel or attitude of the writing. Examples: informative, casual, persuasive, humorous, professional, inspiring
- Voice: The personality or style of the writer. Examples: confident, friendly, authoritative, witty, neutral

Only respond in this strict JSON format:
{
  "tone": "informative",
  "voice": "confident"
}

Keyword: "${keyword}"

Respond with JSON only. Do not add comments or extra text.
  `.trim();
}
