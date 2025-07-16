import { z } from "zod";

export const HashtagSchema = z.object({
  tags: z.array(
    z.string()
      .min(3, "Hashtag too short")
      .startsWith("#", "Hashtag must start with #")
  ).min(5, "At least 5 hashtags").max(7, "No more than 7 hashtags")
});

export type HashtagResult = z.infer<typeof HashtagSchema>;
