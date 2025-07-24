import { z } from "zod";

export const KeywordIntentSchema = z.object({
  keyword: z.string(),
  intent: z.enum([
    "Informational",
    "Commercial",
    "Transactional",
    "Navigational",
    "Comparison",
    "Review",
    "Local",
    "Listicle"
  ]),
  confidence: z.number().min(0).max(1),
  explanation: z.string().min(5)
});

export type KeywordIntent = z.infer<typeof KeywordIntentSchema>;
