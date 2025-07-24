export function createEnhancementPrompt(original: string, enhanced: string): string {
  return `
You are a content comparison expert.

Compare the following two versions of a blog post:

Original Version:
${original}

Enhanced Version:
${enhanced}

Instructions:
- Clearly analyze improvements in SEO, structure, clarity, and tone.
- List sections added, removed, or modified.
- Identify keyword additions if possible.
- Estimate SEO score improvement from 0 to 1.
- Return ONLY valid JSON:

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

Output JSON only. No explanation or intro.
  `.trim();
}
