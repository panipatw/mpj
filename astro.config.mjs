// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Your GitHub Pages origin (no path here) — used to build absolute URLs,
  // e.g. in the sitemap.
  site: 'https://panipatw.github.io',
  // The sub-path the repo is served under. MUST match the repo name exactly.
  // Remove this line if you later move to a custom domain at the root.
  base: '/mpj',
  integrations: [sitemap()],
});