export function createPrompt(keyword: string, tone: string): string {
  return `
You are a professional blog strategist.

Your job is to generate a structured outline for a blog post on the topic: "${keyword}"

Guidelines:
- Use a "${tone}" tone throughout.
- Structure: Introduction, 4–6 main sections, Conclusion.
- Return only clean bullet points (one per line).
- Do NOT write paragraphs or explanations.
- Avoid numbering or special characters.

Example format:
- Introduction
- Importance of [topic]
- Key problems people face
- Strategies to solve them
- Case studies/examples
- Tools or resources to consider
- Conclusion and call to action

Return ONLY the outline points.
`;
}
