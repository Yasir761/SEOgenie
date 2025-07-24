export function createPrompt(keyword: string): string {
  return `
You are a professional SEO analyst.

Given the keyword: "${keyword}", determine the user's **search intent**.

Only choose ONE from this fixed list:
- Informational
- Commercial
- Transactional
- Navigational
- Comparison
- Review
- Local
- Listicle

Respond strictly in this JSON format:
{
  "keyword": "example keyword",
  "intent": "Informational",
  "confidence": 0.95,
  "explanation": "Reasoning in 1–2 sentences"
}

⚠️ Do not include any markdown, explanation, or extra text. Return JSON only.
  `.trim();
}
