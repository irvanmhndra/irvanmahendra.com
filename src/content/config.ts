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

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    github: z.string().url().optional(),
    stack: z.array(z.string()).default([]),
    status: z.enum(['live', 'wip', 'archived']).default('live'),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
})

export const collections = { blog, projects }
