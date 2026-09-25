import type { Locale } from "@/i18n/routing";

/**
 * A value in every locale. Turkish is written first; English is a rewrite for a different
 * reader, not a translation (design-system brand/public/voice-and-tone.md). Because this is
 * a Record over the locale union, a missing English string is a type error.
 */
export type L<T = string> = Record<Locale, T>;

export interface Point {
  title: string;
  body: string;
}

/**
 * A visible slot for copy nobody has supplied yet. It renders as written, so it cannot ship
 * quietly, and tests/content.test.ts counts every one. Never replace it with filler.
 */
export const copyNeeded = (what: string): string => `[COPY NEEDED: ${what}]`;

/** The same placeholder in both locales. */
export const needed = (what: string): L => ({ tr: copyNeeded(what), en: copyNeeded(what) });

/** `n` placeholder points in both locales. */
export const neededPoints = (n: number, what: string): L<Point[]> => {
  const points = Array.from({ length: n }, (_, i) => ({
    title: copyNeeded(`${what} ${i + 1} — title`),
    body: copyNeeded(`${what} ${i + 1} — one or two sentences`),
  }));
  return { tr: points, en: points };
};
