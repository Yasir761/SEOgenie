export function createPrompt(keyword: string, tone: string): string {
  return `
Based on the topic "${keyword}", generate a blog post outline.

Requirements:
- Tone should be "${tone}".
- Return ONLY the outline in plain bullet points.
- Include: Introduction, 3–6 key sections, and a Conclusion.
- Do NOT write full paragraphs.

Example:
- Introduction
- Why this topic matters today
- Key challenges people face
- How to solve them using tools/strategies
- Conclusion & Call to Action
`;
}
