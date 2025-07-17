export function createEnhancementPrompt(original: string, enhanced: string): string {
  return `
Compare the following original and enhanced blog versions.

Original:
${original}

Enhanced:
${enhanced}

Instructions:
- Summarize what has changed.
- Highlight improvements in tone, SEO, structure, clarity.
- List added/removed sections.
- Estimate how much better the new version is.

Output a JSON with:
{
  "title_changed": boolean,
  "meta_changed": boolean,
  "tone_changed": boolean,
  "word_count_diff": number,
  "added_sections": [string],
  "removed_sections": [string],
  "keywords_added": [string],
  "seo_score_diff": number,
  "summary": string
}

Respond with JSON only, no explanation.
`
}
