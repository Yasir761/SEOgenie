import { z } from "zod";

export const ToneSchema = z.object({
  tone: z.string().min(3, "Tone must be at least 3 characters"),
  voice: z.string().min(3, "Voice must be at least 3 characters")
});

export type ToneResult = z.infer<typeof ToneSchema>;
