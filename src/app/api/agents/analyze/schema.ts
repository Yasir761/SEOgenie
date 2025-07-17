import { z } from "zod"

export const AnalyzeAgentSchema = z.object({
  intent: z.string(),
  competition_level: z.enum(["Low", "Medium", "High"]),
  keyword_difficulty_score: z.number().min(0).max(1),
  suggested_strategy: z.string(),
  title_suggestions: z.array(z.string()).min(1),
  meta_description: z.string()
})

export type AnalyzeOutput = z.infer<typeof AnalyzeAgentSchema>
