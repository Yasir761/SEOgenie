import { z } from "zod";

export const BlogOutputSchema = z.object({
  blog: z.string().min(800, "Blog content is too short"),
  keyword: z.string().min(3, "Keyword is too short"),
});

export type BlogOutput = z.infer<typeof BlogOutputSchema>;
