// OpenNext adapter config for Cloudflare Workers (https://opennext.js.org/cloudflare).
// Vercel ignores this file; `next build` is unchanged.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

const cloudflareConfig = defineCloudflareConfig({
  // Every page is prerendered at build time and the site has no ISR, so prerendered
  // pages are served read-only from Workers static assets. This also matters because
  // the blog reads content/ (and the translated copies in .i18n/) with node:fs, which is
  // not available at request time on Workers.
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

// `npm run build` runs scripts/i18n-build.mjs (generates app/fr, app/de, app/es) before
// `next build`, exactly as on Vercel.
const config = { ...cloudflareConfig, buildCommand: "npm run build" };

export default config;
