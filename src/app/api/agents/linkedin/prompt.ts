export function createLinkedInTeaserPrompt(title: string, content: string) {
  return `
You're a professional LinkedIn content creator.

Write a teaser post for the blog below using this format:
1. A bold 1-liner hook.
2. 2–3 punchy bullet points (max 10 words each).
3. A CTA line like "Read the full blog here 👇".

Guidelines:
- Use a professional tone.
- Make it engaging and clear.
- Output in plain text only (no markdown or quotes).

Blog Title: "${title}"

Blog Content:
${content}

⚠️ Return the LinkedIn teaser ONLY. No explanations, markdown, or JSON.
`.trim();
}
