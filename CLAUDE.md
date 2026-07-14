## Project

A personal website built with **Astro**, static-first, deployed to **GitHub Pages**.
Phase 1 (static multi-page site) is live. The full multi-phase roadmap — Keystatic CMS,
custom domain + Cloudflare Pages, a client-side ML drawing game, an image-generation
Worker endpoint, and commerce — lives in `website-plan-and-implementation-guide.md`.
**Read that plan before starting any new feature**, and follow its principles:

- Static by default; add a JS island only where interactivity is actually needed.
- Secrets/API keys never live in client-side code — they require a server endpoint.
- Don't build payments/commerce from scratch; delegate to Stripe/Shopify.
- Prefer platforms with unmetered or hard-capped free tiers (bill safety).

## Critical: base path

The site is served under a sub-path in production (`base: '/mpj'` in `astro.config.mjs`).
**Every internal link and every `public/` asset reference must be prefixed** with the base,
or it will work in dev but 404 in production. Use the existing pattern:

```js
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
// then: href={base + '/about'}, href={base + '/favicon.svg'}
```

(The `base` line is removed only if the site later moves to a custom domain at root — see plan Phase 3.)

## Development

Requires Node >=22.12. Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.
Before deploying, verify the built output: `npm run build && npm run preview`.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes
to GitHub Pages automatically. There is no manual deploy step.

## Documentation

Full docs: https://docs.astro.build. Consult the relevant guide before related work:

- [Routing / pages / middleware](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components (React, Vue, Svelte)](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling / Tailwind](https://docs.astro.build/en/guides/styling/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)
