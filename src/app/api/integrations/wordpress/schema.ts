import { z } from "zod";

export const WordPressPostSchema = z.object({
  siteUrl: z.string().url(),
  username: z.string(),
  applicationPassword: z.string().min(10),
  title: z.string(),
  content: z.string().min(100),
  slug: z.string().optional(),
  meta_description: z.string().optional(),
});

export type WordPressPostInput = z.infer<typeof WordPressPostSchema>;
