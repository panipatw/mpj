// Astro content collections config. This is the *read* side of the CMS:
// Keystatic (keystatic.config.ts) writes .mdoc files into src/content/posts,
// and this collection lets pages query them with getCollection('posts').
// The two configs must stay in sync — the zod schema here should mirror the
// Keystatic schema for the same collection.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/products' }),
	// The schema is a function so it can receive Astro's image() helper, which
	// resolves the YAML's relative photo path into optimisable image metadata.
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			price: z.number().int().nonnegative(),
			blurb: z.string(),
			image: image().nullable().optional(),
			alt: z.string().optional(),
			featured: z.boolean().default(false),
			order: z.number().int().default(99),
			from: z.string(),
			to: z.string(),
		}),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { posts, products };
