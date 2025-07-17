import { z } from "zod";

export const LinkedInTeaserSchema = z.object({
  teaser: z.string().min(30, "Teaser is too short"),
});

export type LinkedInTeaserInput = {
  title: string;
  content: string;
};

export type LinkedInTeaserResponse = z.infer<typeof LinkedInTeaserSchema>;
