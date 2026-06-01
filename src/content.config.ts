import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Project case studies — see CLAUDE.md §5.3.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // One-sentence pitch shown on cards.
    pitch: z.string(),
    // Longer summary used for SEO meta + case-study intro.
    description: z.string(),
    tech: z.array(z.string()),
    // Lower numbers sort first; used to pick featured projects on the home page.
    order: z.number().default(99),
    featured: z.boolean().default(false),
    heroImage: z.string().optional(),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

// Blog posts — frontmatter schema from CLAUDE.md §6.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Auto-populated by the remark reading-time plugin in Phase 3; optional until then.
    readingTime: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
