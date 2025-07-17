export function createLinkedInTeaserPrompt(title: string, content: string) {
  return `
You are a professional content strategist creating LinkedIn post teasers.

Your job:
- Write a 1-line **hook** that grabs attention.
- Include 2–3 **bullet points** summarizing key insights from the blog.
- End with a **call to action** that encourages people to read the full blog.
- Use a professional tone. Keep it concise, engaging, and formatted for LinkedIn.

Blog Title: "${title}"

Blog Content:
${content}

Output:
Only return the final LinkedIn teaser text.
`.trim();
}
