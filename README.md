# Sidequest — boxing gym trial directory (MVP)

A static Astro site that helps beginners find boxing gyms in Santa Rosa, Laguna and reach each gym's own booking or contact page. No database, backend, accounts, or API keys.

> **"Sidequest" is a placeholder brand.** Change the name in `src/site.ts`, and the logo mark in `src/components/Header.astro` / `Footer.astro` and `public/favicon.svg`.

## Pages

| URL | What it is |
| --- | --- |
| `/` | Homepage: hero, sports (only Boxing is live), up to 3 featured gyms |
| `/boxing` | All active gyms with a client-side search by name or address |
| `/boxing/<slug>` | One page per active gym, generated at build time |

## Local development

Requires **Node.js 22.23 or newer** (Astro 7's minimum).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build into dist/
npm run preview   # serve the built site locally
```

## Editing gyms

All listings live in **`src/data/gyms.ts`**. Adding, editing or removing a gym only requires editing that file and redeploying.

```ts
{
  id: 'gym-001',                     // unique, never shown
  slug: 'example-boxing-gym',        // URL: /boxing/example-boxing-gym — lowercase, hyphens, unique
  name: 'Example Boxing Gym',
  sport: 'boxing',
  address: 'Full street address, Santa Rosa, Laguna',
  area: 'Balibago, Santa Rosa',      // short summary shown on cards
  description: 'One or two sentences, in your own words.',
  image: '/images/gyms/example.jpg', // optional — put the file in public/images/gyms/
  imageAlt: 'Boxers training on heavy bags at Example Boxing Gym', // optional
  beginnerFriendly: true,            // optional — only if the gym confirmed it
  trialPrice: 350,                   // optional — pesos, only if confirmed. 0 = free trial
  trialDetails: '60-minute intro class, wraps provided.', // optional
  bookingUrl: 'https://…',           // optional — shows "Book a Trial"
  contactUrl: 'https://m.me/…',      // optional — shows "Contact Gym" (or a secondary button if bookingUrl exists)
  mapsUrl: 'https://maps.app.goo.gl/…', // optional — shows "Get directions"
  featured: true,                    // optional — up to 3 appear on the homepage
  active: true,                      // false hides the gym everywhere and removes its page
},
```

How missing fields are handled:

- No `trialPrice` → "Ask for price". Never enter a price the gym hasn't confirmed.
- No `image` → a branded fallback cover with the gym's initials.
- No `bookingUrl` → "Contact Gym" via `contactUrl`. Neither → no CTA button.
- No `featured` gyms → the homepage shows the first three active gyms.

The build fails with a clear message if two gyms share a `slug` or `id`, or a slug has invalid characters.

### Replacing the sample data

The five listings that ship in `gyms.ts` are **fictional** (`sample: true`, names end in "(Sample)", URLs point to `example.com`). They show a yellow "Sample listing" badge so they can't be mistaken for real gyms. Delete all of them before launch and add verified gyms. Also delete `public/images/sample-cover.svg`.

## Analytics hooks

Outbound links carry `data-event` and `data-gym` attributes so they can be tracked later:

- `trial_cta_click`: the primary button (`data-cta="booking"` or `"contact"`)
- `contact_cta_click`: the secondary Contact button when a gym has both links
- `directions_click`: Google Maps link

**These are only hooks.** No analytics is installed and nothing is recorded until you add a tool (e.g. Plausible, Umami, or GA4) and listen for clicks on `[data-event]`.

## SEO

- Every page has a unique `<title>` and meta description, semantic headings, and alt text.
- Canonical URLs and `/sitemap-index.xml` turn on automatically once you set `SITE` in `astro.config.mjs` to your production domain.

## Deployment

The output is plain static files in `dist/`; any static host works.

**Vercel:** import the repo. It detects Astro: build command `npm run build`, output `dist`. Set the Node.js version to 22.x or newer in Project Settings.

**Netlify:** import the repo. Build command `npm run build`, publish directory `dist`. Set `NODE_VERSION` to `22.23.4` or newer (Site settings → Environment variables), or add a `.nvmrc`.

No environment variables or API keys are required.

## Pre-launch checklist

**Data**
- [ ] Every sample listing (`sample: true`) is removed from `src/data/gyms.ts`; no "Sample listing" badge appears anywhere on the site
- [ ] `public/images/sample-cover.svg` is deleted
- [ ] Each gym's name, address and area were confirmed by the gym or its official page
- [ ] Trial prices are only set where the gym confirmed the current price; others show "Ask for price"
- [ ] `beginnerFriendly` is only set where the gym confirmed it
- [ ] Photos are ones you have permission to use, with descriptive `imageAlt`
- [ ] 1–3 gyms are marked `featured`

**Links**
- [ ] Every `bookingUrl` and `contactUrl` opens the right gym's page (click each one)
- [ ] Every `mapsUrl` lands on the correct location
- [ ] `npm run build` completes with no errors

**Domain and brand**
- [ ] `SITE` in `astro.config.mjs` is set to the production domain (enables canonical URLs and the sitemap)
- [ ] Sitemap URL submitted in Google Search Console
- [ ] Brand name in `src/site.ts`, logo and `public/favicon.svg` updated if the name changes
- [ ] Checked on a real phone: homepage, directory search, a gym page, and the booking button
