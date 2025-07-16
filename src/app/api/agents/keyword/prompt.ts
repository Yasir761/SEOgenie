

export function createPrompt(keyword: string): string {
  return `
You are an expert SEO strategist.

Your task is to analyze a given keyword and determine the user's **search intent**.

Choose ONLY one of the following intent categories:
- Informational
- Commercial
- Transactional
- Navigational
- Comparison
- Review
- Local
- Listicle

Return a JSON object like this:
{
  "keyword": "how to improve SEO in 2024",
  "intent": "Informational",
  "confidence": 0.92,
  "explanation": "User wants to learn techniques, not buy something."
}

Only respond with JSON. No commentary.

Keyword: "${keyword}"
`;
}
