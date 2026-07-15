// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// Keystatic's admin UI (/keystatic) and API routes are server-rendered, which
// GitHub Pages can't host — so the integration is mounted in dev only (local
// mode, plan Phase 2). Revisit when moving to Cloudflare + GitHub mode (Phase 3).
const isDev = process.env.NODE_ENV !== 'production';

// https://astro.build/config
export default defineConfig({
  // Your GitHub Pages origin (no path here) — used to build absolute URLs,
  // e.g. in the sitemap.
  site: 'https://panipatw.github.io',
  // The sub-path the repo is served under. MUST match the repo name exactly.
  // Remove this line if you later move to a custom domain at the root.
  base: '/mpj',
  integrations: [sitemap(), react(), markdoc(), ...(isDev ? [keystatic()] : [])],
});