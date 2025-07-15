export function createPrompt({
  keyword,
  outline,
  tone,
  voice,
  title,
  meta
}: {
  keyword: string;
  outline: string;
  tone: string;
  voice: string;
  title: string;
  meta: string;
}) {
  return `
You are an expert blog writer AI.

Write a high-quality blog post using the following data:

- Keyword: "${keyword}"
- Title: "${title}"
- Meta Description: "${meta}"
- Tone: "${tone}"
- Voice Style: "${voice}"

Blog Outline:
${outline}

Instructions:
- Write a blog post based on this outline.
- Maintain the given tone and voice throughout.
- Write at least 800–1000 words.
- Format sections with headings and subheadings.
- Include a brief intro and a strong conclusion.
- Do not include hashtags or bullet points unless the outline specifies it.

Start the blog below:
`;
}
