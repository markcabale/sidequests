/**
 * GYM LISTINGS — the only file you need to edit to add, change or remove a gym.
 *
 * ⚠️  Every listing below is FICTIONAL SAMPLE DATA for development only.
 *     Delete them (or set `active: false`) and add verified gyms before launch.
 *     Sample listings are flagged with `sample: true` and show a "Sample listing"
 *     badge on the site so they can't be mistaken for real gyms.
 *
 * Rules for real listings:
 * - Only enter information you have confirmed with the gym (in person, by phone,
 *   or on the gym's own official page). Leave a field out rather than guess.
 * - `trialPrice` is in Philippine pesos (₱). Only set it once the gym has confirmed
 *   the current price; leave it out and the site shows "Ask for price".
 * - `beginnerFriendly` should only be `true` if the gym has confirmed it welcomes
 *   complete beginners. Leave it out otherwise.
 * - `slug` becomes the page URL (/boxing/<slug>). Use lowercase letters, numbers
 *   and hyphens, keep it unique, and avoid changing it after launch.
 * - `image` is a path inside /public, e.g. "/images/gyms/my-gym.jpg". Only use
 *   photos you have permission to publish.
 */

export interface Gym {
  id: string;
  slug: string;
  name: string;
  sport: 'boxing';
  /** Full street address shown on the detail page. */
  address: string;
  /** Short area summary shown on cards, e.g. "Balibago, Santa Rosa". */
  area: string;
  description: string;
  /** Path under /public, e.g. "/images/gyms/my-gym.jpg". */
  image?: string;
  /** Alt text for the image. Defaults to "<name> boxing gym". */
  imageAlt?: string;
  beginnerFriendly?: boolean;
  /** Verified trial price in PHP. 0 means a confirmed free trial. */
  trialPrice?: number;
  trialDetails?: string;
  /** External booking page. Shows a "Book a Trial" button. */
  bookingUrl?: string;
  /** Facebook page, Messenger link, website contact page, etc. Shows "Contact Gym" when there is no booking URL. */
  contactUrl?: string;
  /** Google Maps link for directions. */
  mapsUrl?: string;
  featured?: boolean;
  active: boolean;
  /** Marks fictional development data. Remove every sample listing before launch. */
  sample?: boolean;
}

export const gyms: Gym[] = [
  {
    id: 'sample-1',
    slug: 'sample-iron-corner-boxing',
    name: 'Iron Corner Boxing (Sample)',
    sport: 'boxing',
    address: '123 Sample Street, Barangay Example, Santa Rosa, Laguna',
    area: 'Sample area, Santa Rosa',
    description:
      'FICTIONAL SAMPLE LISTING. A placeholder gym used to preview a complete listing with every field filled in. Replace with a verified gym before launch.',
    image: '/images/sample-cover.svg',
    imageAlt: 'Placeholder cover image for a sample gym listing',
    beginnerFriendly: true,
    trialPrice: 300,
    trialDetails: 'Sample text: one 60-minute beginner class. Gloves and wraps available to borrow.',
    bookingUrl: 'https://example.com/book',
    contactUrl: 'https://example.com/contact',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Santa+Rosa+Laguna',
    featured: true,
    active: true,
    sample: true,
  },
  {
    id: 'sample-2',
    slug: 'sample-southside-fight-club',
    name: 'Southside Fight Club (Sample)',
    sport: 'boxing',
    address: '45 Placeholder Avenue, Santa Rosa, Laguna',
    area: 'Placeholder district, Santa Rosa',
    description:
      'FICTIONAL SAMPLE LISTING. Previews a gym with no confirmed price and no photo, which shows "Ask for price" and the fallback cover.',
    trialDetails: 'Sample text: trial sessions available on weekday evenings. Message the gym to schedule.',
    contactUrl: 'https://example.com/contact',
    featured: true,
    active: true,
    sample: true,
  },
  {
    id: 'sample-3',
    slug: 'sample-first-round-boxing-studio',
    name: 'First Round Boxing Studio (Sample)',
    sport: 'boxing',
    address: 'Unit 7, Example Building, Santa Rosa, Laguna',
    area: 'Example centre, Santa Rosa',
    description:
      'FICTIONAL SAMPLE LISTING. Previews a confirmed free trial and a booking link without a contact link.',
    beginnerFriendly: true,
    trialPrice: 0,
    bookingUrl: 'https://example.com/book',
    featured: true,
    active: true,
    sample: true,
  },
  {
    id: 'sample-4',
    slug: 'sample-barangay-boxing-hall',
    name: 'Barangay Boxing Hall (Sample)',
    sport: 'boxing',
    address: 'Sample Covered Court, Santa Rosa, Laguna',
    area: 'Sample barangay, Santa Rosa',
    description:
      'FICTIONAL SAMPLE LISTING. Previews a minimal listing with no price, no trial details and no booking or contact link.',
    active: true,
    sample: true,
  },
  {
    id: 'sample-5',
    slug: 'sample-inactive-gym',
    name: 'Inactive Gym (Sample)',
    sport: 'boxing',
    address: 'Sample address',
    area: 'Sample area',
    description: 'FICTIONAL SAMPLE LISTING. Inactive listings are hidden everywhere and get no page.',
    active: false,
    sample: true,
  },
];

/** All listings that should appear on the site. */
export const activeGyms = gyms.filter((gym) => gym.active);

/** Up to three featured gyms for the homepage, falling back to the first active gyms. */
export const featuredGyms = (() => {
  const featured = activeGyms.filter((gym) => gym.featured);
  return (featured.length ? featured : activeGyms).slice(0, 3);
})();

/** "₱300", "Free trial", or "Ask for price". */
export function formatTrialPrice(price?: number): string {
  if (price === undefined || price === null || Number.isNaN(price)) return 'Ask for price';
  if (price === 0) return 'Free trial';
  return `₱${price.toLocaleString('en-PH')}`;
}

export function hasVerifiedPrice(gym: Gym): boolean {
  return typeof gym.trialPrice === 'number' && !Number.isNaN(gym.trialPrice);
}

// Fail the build early on duplicate slugs or ids, which would break pages.
const seen = new Set<string>();
for (const gym of gyms) {
  for (const key of [`slug:${gym.slug}`, `id:${gym.id}`]) {
    if (seen.has(key)) throw new Error(`Duplicate gym ${key} in src/data/gyms.ts`);
    seen.add(key);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(gym.slug)) {
    throw new Error(`Invalid slug "${gym.slug}" in src/data/gyms.ts — use lowercase letters, numbers and hyphens.`);
  }
}
