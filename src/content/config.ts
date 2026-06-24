import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    altText: z.string().optional(),
    canonical: z.string().optional(),
  }),
});

export const collections = { blog };
