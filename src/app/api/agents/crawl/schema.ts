import { z } from "zod"

export const CrawlEnhanceSchema = z.object({
  original: z.object({
    title: z.string(),
    content: z.string(),
    meta_description: z.string(),
    tone: z.string().optional(),
    voice: z.string().optional(),
    seo: z.object({
      optimized_title: z.string(),
      meta_description: z.string(),
      slug: z.string(),
      final_hashtags: z.array(z.string())
    }).optional(),
    intent: z.string().optional()
  }),
  enhanced: z.object({
    title: z.string(),
    content: z.string(),
    meta_description: z.string(),
    tone: z.string(),
    voice: z.string(),
    seo: z.object({
      optimized_title: z.string(),
      meta_description: z.string(),
      slug: z.string(),
      final_hashtags: z.array(z.string())
    }),
    intent: z.string()
  }),
  changes: z.object({
    title_changed: z.boolean(),
    meta_changed: z.boolean(),
    tone_changed: z.boolean(),
    word_count_diff: z.number(),
    added_sections: z.array(z.string()),
    removed_sections: z.array(z.string()),
    keywords_added: z.array(z.string()).optional(),
    seo_score_diff: z.number().optional(),
    summary: z.string()
  })
})

export type CrawlEnhanceResult = z.infer<typeof CrawlEnhanceSchema>;
