import { z } from "zod";

export const KeywordIntentSchema = z.object({
  keyword: z.string(),
  intent: z.string(),
  confidence: z.number().min(0).max(1),
  explanation: z.string()
});

export type KeywordIntent = z.infer<typeof KeywordIntentSchema>;
