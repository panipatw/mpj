// Dev-only Astro integration: serve Keystatic's API at the site root.
//
// Why this exists: Keystatic hardcodes the path `/api/keystatic` in two places
// that must agree — its browser bundle (which does `fetch('/api/keystatic/tree')`)
// and its server-side param parser (`url.pathname.replace(/^\/api\/keystatic\/?/, '')`).
// Both assume the app is mounted at the root, so Keystatic cannot live under
// Astro's `base`. With `base: '/mpj'`, its own injected route lands at
// `/mpj/api/keystatic/...`, where the parser no longer matches and every request
// falls through to a plain-text "Not Found" — which the UI then tries to
// `JSON.parse`, producing "unexpected character at line 1 column 1".
//
// The API is dev-only and never deployed, so it doesn't need to respect `base`.
// This mounts it at the root as a Vite middleware, which runs before Astro's
// router and therefore before the check that rejects paths outside `base`.
// That leaves `base` on in dev, so internal links behave exactly as in production.
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';

const PREFIX = '/api/keystatic';

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// Keystatic returns headers as an array, a Headers, or a plain object.
function normalizeHeaders(headers) {
  if (!headers) return [];
  if (Array.isArray(headers)) return headers;
  if (typeof headers.entries === 'function') return [...headers.entries()];
  return Object.entries(headers);
}

async function toRequest(req) {
  const url = new URL(req.url, `http://${req.headers.host ?? '127.0.0.1'}`);
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  return new Request(url, {
    method: req.method,
    headers: req.headers,
    ...(hasBody ? { body: await readBody(req), duplex: 'half' } : {}),
  });
}

/**
 * @param {import('@keystatic/core').Config<any, any>} keystaticConfig
 * @returns {import('astro').AstroIntegration}
 */
export default function keystaticApiAtRoot(keystaticConfig) {
  return {
    name: 'keystatic-api-at-root',
    hooks: {
      'astro:config:setup': ({ updateConfig, command }) => {
        if (command !== 'dev') return;
        const handler = makeGenericAPIRouteHandler({ config: keystaticConfig });
        updateConfig({
          vite: {
            plugins: [
              {
                name: 'keystatic-api-at-root',
                configureServer(server) {
                  server.middlewares.use((req, res, next) => {
                    if (!req.url?.startsWith(PREFIX)) return next();
                    (async () => {
                      const { body, headers, status } = await handler(await toRequest(req));
                      for (const [k, v] of normalizeHeaders(headers)) res.setHeader(k, v);
                      res.statusCode = status ?? 200;
                      res.end(body);
                    })().catch(next);
                  });
                },
              },
            ],
          },
        });
      },
    },
  };
}
