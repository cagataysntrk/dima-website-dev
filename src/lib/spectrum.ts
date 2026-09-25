import { brands, themes } from "@upcytech/tokens/native";

/**
 * The site's spectrum: the five brand colours (company + four products), ordered round the hue
 * wheel. Values come pre-resolved from `@upcytech/tokens/native` — the same brand text tokens
 * the CSS uses, so each clears contrast on its own theme and no colour is written here.
 */

type Theme = "light" | "dark";

const brandText = (brand: string, theme: Theme) =>
  (themes as Record<string, { colorTextBrand: string }>)[`${brand}.${theme}`]?.colorTextBrand ?? "";

export const hue = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
  const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
  if (!d) return 0;
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (h * 60 + 360) % 360;
};

/**
 * Items sorted by hue, rotated to start just after the widest gap on the wheel, so a gradient
 * through them turns smoothly (teal → blue → violet → magenta → orange) instead of jumping.
 */
function byHue<T>(items: T[], colorOf: (item: T) => string) {
  const sorted = [...items].sort((a, b) => hue(colorOf(a)) - hue(colorOf(b)));
  let widest = 0, at = 0;
  sorted.forEach((item, i) => {
    const next = sorted[(i + 1) % sorted.length]!;
    const gap = (hue(colorOf(next)) - hue(colorOf(item)) + 360) % 360;
    if (gap > widest) { widest = gap; at = (i + 1) % sorted.length; }
  });
  return [...sorted.slice(at), ...sorted.slice(0, at)];
}

/** The brand colours for one theme, in the tokens' brand order. */
export const brandColors = (theme: Theme) => brands.map((b) => brandText(b, theme));

/** The brand colours for one theme, in spectrum order. */
export const spectrum = (theme: Theme) => byHue(brandColors(theme), (c) => c);

/**
 * The spectrum as theme-aware CSS colours — `light-dark(light, dark)` per brand, ordered by the
 * light theme's hues — for server-rendered decoration that follows the theme without script.
 */
export const spectrumStops = byHue([...brands], (b) => brandText(b, "light"))
  .map((b) => `light-dark(${brandText(b, "light")}, ${brandText(b, "dark")})`);
