/**
 * SPORTS — every sport shown on the site. A sport with `live: true` gets a
 * directory page at /<slug> and a page per gym at /<slug>/<gym-slug>.
 * To launch a sport: add its slug to `SportSlug`, set `live: true`, and add
 * gyms with that `sport` in src/data/gyms.ts.
 */

export type SportSlug = 'boxing' | 'muay-thai';

export interface Sport {
  /** URL segment, e.g. /muay-thai. Only set for live sports. */
  slug?: SportSlug;
  name: string;
  blurb: string;
  live: boolean;
  /** Placeholder for the directory search box. */
  searchExample?: string;
}

export const sports: Sport[] = [
  { slug: 'boxing', name: 'Boxing', blurb: 'Footwork, pad work and a serious sweat.', live: true, searchExample: 'Balibago' },
  { slug: 'muay-thai', name: 'Muay Thai', blurb: 'The art of eight limbs.', live: true, searchExample: 'Balibago' },
  { name: 'Brazilian Jiu-Jitsu', blurb: 'Grappling, leverage and technique.', live: false },
  { name: 'Pickleball', blurb: 'Fast, social and easy to pick up.', live: false },
];

export type LiveSport = Sport & { slug: SportSlug };

export const liveSports = sports.filter((sport): sport is LiveSport => sport.live && !!sport.slug);

export function getSport(slug: SportSlug): LiveSport {
  const sport = liveSports.find((s) => s.slug === slug);
  if (!sport) throw new Error(`Sport "${slug}" is not live in src/data/sports.ts`);
  return sport;
}

/** "Boxing and Muay Thai", "Boxing, Muay Thai and BJJ". */
export function listSportNames(list: Sport[] = liveSports): string {
  const names = list.map((s) => s.name);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : (names[0] ?? '');
}
