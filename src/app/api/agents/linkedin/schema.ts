import { z } from "zod";

export const LinkedInTeaserSchema = z.object({
  teaser: z.string()
    .min(30, "Teaser is too short")
    .max(600, "Teaser is too long"),
});

export type LinkedInTeaserInput = {
  title: string;
  content: string;
};

export type LinkedInTeaserResponse = z.infer<typeof LinkedInTeaserSchema>;
