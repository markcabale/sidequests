// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Production domain.
 * Leave empty until the domain is live, then set it, e.g. 'https://example.ph'.
 * Once set, canonical URLs are added to every page and /sitemap-index.xml is generated.
 */
const SITE = '';

export default defineConfig({
  site: SITE || undefined,
  integrations: SITE ? [sitemap()] : [],
});
