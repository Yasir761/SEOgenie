export function createPrompt(keyword: string, serp: any[]): string {
  const topResults = serp.slice(0, 5).map((result, i) => {
    return `Result ${i + 1}:\nTitle: ${result.title}\nLink: ${result.link}\nSnippet: ${result.snippet}\n`
  }).join("\n")

  return `
You're an advanced SEO strategist AI.

Given the following keyword: "${keyword}" and these top 5 Google search results:

${topResults}

Analyze the search intent, SEO patterns, and competition level.

Only respond in valid JSON like this:
{
  "intent": "Informational",
  "competition_level": "Medium",
  "keyword_difficulty_score": 0.65,
  "suggested_strategy": "Create a comparison post including tools with schema markup.",
  "title_suggestions": ["Top AI Tools for Solopreneurs in 2025", "Best AI Productivity Tools for One-Person Businesses"],
  "meta_description": "Looking to grow your solopreneur business? Discover powerful AI tools that save time, boost marketing, and simplify your work."
}

No commentary. Just pure JSON.
  `
}
