import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedAt: z.coerce.date(),
    readingTime: z.number(),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
  }),
})

export const collections = { blog }
