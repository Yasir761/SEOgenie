import { z } from "zod";

export const BlogOutlineSchema = z.object({
  outline: z.array(z.string().min(5)).min(3, "Outline must have at least 3 points")
});

export type BlogOutline = z.infer<typeof BlogOutlineSchema>;
