# Cape Compass

Marketing site for **Cape Compass**, a company selling tailor-made South Africa trips with one dedicated local specialist.

Built with Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · MDX.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all content pages are statically generated)
npm run lint
```

## Where things live

| What | Where |
|---|---|
| Brand name, contact email and business address, nav, currencies + FX rates | `config/site.ts` |
| Colour, type and spacing tokens | `app/globals.css` (`@theme`) |
| Destinations, experiences, tours, stays, FAQs, planner options | `data/*.ts` (typed in `data/types.ts`) |
| All image URLs (Unsplash placeholders) | `data/images.ts` |
| Blog posts (MDX + frontmatter) | `content/blog/*.mdx` |
| API routes (log payloads; TODO email/CRM) | `app/api/{plan,contact,newsletter}/route.ts` |

Pages are generated from the data files, so moving to a headless CMS later means replacing the `data/*.ts` imports with fetches that return the same types.

### Prices and currencies

All prices in `/data` are stored in **USD**. The currency switcher (USD, EUR, GBP, CAD, ZAR) converts them with the static rates in `config/site.ts` and remembers the visitor's choice. Wire up live FX rates before launch (see the TODO in that file).

### Trip planner

`/plan-your-trip` is a 5-step form with zod validation (`lib/planner-schema.ts`). Progress is saved in `localStorage`. Links to it from inside the site open it as a modal (an intercepting route in `app/@modal`); visiting it directly shows the full page. Submissions POST to `/api/plan`, which validates and logs the payload. Add your email or CRM integration where the `TODO` is.

## Languages (EN · FR · DE · ES)

English is the source and keeps its URLs (`app/(en)`). `scripts/i18n-build.mjs` runs before `dev` and `build` and writes translated copies of the routes to `app/fr`, `app/de`, `app/es` and of `components`, `lib`, `data` and `config` to `.i18n/<locale>` (all git-ignored), so every page is pre-rendered in every language with no translation code in the browser.

- Translations: `i18n/fr.json`, `i18n/de.json`, `i18n/es.json` (English source text to translation; a key prefixed with `path/to/file.tsx::` applies to that file only). Blog posts: `i18n/content/<locale>/blog/*.mdx`.
- After changing copy: `npm run i18n:extract`, then `npm run i18n:missing -- --list` shows what still needs translating (brand, venue and place names are meant to stay as they are).
- Values the API validates (contact methods, month keys) stay in English; only their labels are translated.
- The language selector (`components/layout/LanguageSwitcher.tsx`) links to the same page in each language; there is no automatic redirect. Canonical and `hreflang` come from `buildMetadata`, and the sitemap lists every locale.

## Before launch: placeholders to replace

- [ ] Have a native speaker review the French, German and Spanish copy (`i18n/*.json`, `i18n/content/`), including the legal pages.

- [x] `config/site.ts`: email `capecompass@tourground.com`, business address Workshop17 Watershed (V&A Waterfront). No phone, WhatsApp, social links, testimonials, ratings, team bios or membership badges (owner decision). Set `NEXT_PUBLIC_SITE_URL`.
- [ ] **Stays** (`data/stays.ts`): property names are fictional; replace with real partner properties and approved imagery (see `IMAGES-NEEDED.md`)
- [ ] **Marketing figures**: "150+ vetted guides" and the founding year
- [ ] **FAQs** marked `verify: true` (visas, children's documents, health): **verify against official government sources** (South Africa's Department of Home Affairs and travellers' own governments)
- [ ] **Legal pages** (`/privacy`, `/terms`, `/cookies`): complete drafts; get legal review (POPIA / GDPR)
- [ ] **Images** (`data/images.ts`): Unsplash placeholders. A few are generic stand-ins (walkingSafari, robbenIsland, soweto, roadTrip, tableMountainHike)
- [ ] **FX rates**: live rates
- [ ] **Email/CRM**: integrations in `app/api/*`
- [ ] **Map**: replace the route map placeholder on tour pages with an interactive map (e.g. Mapbox)

## Deploying

The project deploys to Vercel with zero config. Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the sitemap and OG tags are correct.

## Cloudflare Workers (OpenNext)

The site can also run on Cloudflare Workers through the [OpenNext adapter](https://opennext.js.org/cloudflare) (`@opennextjs/cloudflare`). This is additive: Vercel still runs `npm run build` and ignores the Cloudflare files.

```bash
npm run cf-build   # npm run build (scripts/i18n-build.mjs + next build), OpenNext bundle, prerendered pages copied into the assets
npx wrangler dev   # serve the Worker locally on http://localhost:8787
npm run preview    # cf-build, then OpenNext's local preview
npm run deploy     # cf-build, then deploy the Worker (needs a Cloudflare login; not done yet)
```

- `wrangler.jsonc`: Worker `south-africa`, `nodejs_compat`, static assets from `.open-next/assets` and the `IMAGES` binding (Cloudflare Images) for `next/image` optimisation.
- `open-next.config.ts`: OpenNext runs `npm run build`, so the French, German and Spanish routes are generated exactly as on Vercel. Prerendered pages are served read-only from Workers static assets (`static-assets-incremental-cache`): the site has no ISR, and the blog reads `content/` with `node:fs`, which is not available at request time on Workers. That is why `cf-build` also runs `opennextjs-cloudflare populateCache local`.
- `vercel.json` is not read by Cloudflare, so its rules are mirrored in `cloudflare/_headers` (year-long immutable cache on `/_next/static/*`) and `cloudflare/_redirects` (`/testimonials` → `/about`, 308). `cf-build` copies both into the assets. Keep them in step with `vercel.json`.
- `NEXT_PUBLIC_SITE_URL` and `GOOGLE_SITE_VERIFICATION` are read when pages are prerendered, so set them in the build environment.
