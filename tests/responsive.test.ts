import { expect, test } from "bun:test";

const ROOT = new URL("../", import.meta.url).pathname;

test("layout exports mobile viewport with viewportFit cover", async () => {
  const layout = await Bun.file(ROOT + "src/app/[locale]/layout.tsx").text();
  expect(layout).toContain("export const viewport: Viewport");
  expect(layout).toContain('viewportFit: "cover"');
});

test("globals.css sets overflow-x clip and mobile open nav styles", async () => {
  const css = await Bun.file(ROOT + "src/app/globals.css").text();
  expect(css).toContain("overflow-x: clip");
  expect(css).toContain('nav[aria-label="Ana menü"]:has([aria-expanded="true"])');
  expect(css).toContain("site-responsive");
  expect(css).toContain("@media (max-width: 42rem)");
});

test("hero titles include word break and fluid responsive sizing", async () => {
  const heroTitle = await Bun.file(ROOT + "src/components/home/hero-title.tsx").text();
  expect(heroTitle).toContain("break-words");
  expect(heroTitle).toContain("[overflow-wrap:anywhere]");

  const pageHero = await Bun.file(ROOT + "src/components/sections/page-hero.tsx").text();
  expect(pageHero).toContain("break-words");
  expect(pageHero).toContain("[overflow-wrap:anywhere]");
});

test("homepage uses product-first wide surfaces instead of decorative AI hero effects", async () => {
  const hero = await Bun.file(ROOT + "src/components/home/home-hero.tsx").text();
  expect(hero).toContain('width="wide"');
  expect(hero).not.toContain("HeroField");

  const home = await Bun.file(ROOT + "src/app/[locale]/page.tsx").text();
  expect(home).not.toContain("RainbowButton");

  const tour = await Bun.file(ROOT + "src/components/sections/visual-product-tour.tsx").text();
  expect(tour).toContain('width="wide"');
  expect(tour).toContain("AnimatedBackground");

  const capabilities = await Bun.file(ROOT + "src/components/sections/capability-catalog.tsx").text();
  expect(capabilities).toContain("dima-command-center.webp");
  expect(capabilities).not.toContain("FEATURE_POSITIONS");
});

test("inner product pages keep the product-first editorial contract", async () => {
  const pageHero = await Bun.file(ROOT + "src/components/sections/page-hero.tsx").text();
  expect(pageHero).toContain('width="wide"');
  expect(pageHero).not.toContain("bg-[radial-gradient(circle");

  const solutions = await Bun.file(ROOT + "src/app/[locale]/solutions/page.tsx").text();
  const industries = await Bun.file(ROOT + "src/app/[locale]/industries/page.tsx").text();
  expect(solutions).not.toContain("RainbowButton");
  expect(industries).not.toContain("RainbowButton");

  const capabilities = await Bun.file(ROOT + "src/components/sections/capability-catalog.tsx").text();
  expect(capabilities).toContain('max-h-[38rem] overflow-y-auto');
  expect(capabilities).toContain("AnimatedBackground");
});

test("sector gallery maintains vertical accordion on tablets up to lg", async () => {
  const sectorGallery = await Bun.file(ROOT + "src/components/sections/sector-gallery.tsx").text();
  expect(sectorGallery).toContain("lg:flex-row");
  expect(sectorGallery).not.toContain("md:flex-row");
});

test("product showcase formats footer description and link responsively", async () => {
  const showcase = await Bun.file(ROOT + "src/components/sections/product-showcase.tsx").text();
  expect(showcase).toContain("sm:flex-row");
  expect(showcase).not.toContain("flex-nowrap");
});

// One column below 360px, two from 360 (half the row less one gap); rows wrap centred, so an
// odd last card sits in the middle instead of alone at the edge.
test("team row and grid support single column on narrow mobile", async () => {
  const teamRow = await Bun.file(ROOT + "src/components/sections/team-row.tsx").text();
  expect(teamRow).toContain("flex flex-wrap justify-center");
  expect(teamRow).toContain("w-full min-[360px]:w-[calc((100%-1.25rem)/2)]");

  const home = await Bun.file(ROOT + "src/components/sections/home.tsx").text();
  expect(home).toContain("flex flex-wrap justify-center");
  expect(home).toContain("w-full flex-col gap-3 min-[360px]:w-[calc((100%-1.5rem)/2)]");
});

test("navigation includes responsive margins and logo scaling", async () => {
  const nav = await Bun.file(ROOT + "src/components/chrome/site-nav.tsx").text();
  expect(nav).toContain("w-[calc(100%-1.5rem)]");
  expect(nav).toContain("w-[6.75rem]");
  expect(nav).toContain('collapseAt="lg"');
});

test("touch product selector avoids the gesture-capturing wheel", async () => {
  const showcase = await Bun.file(ROOT + "src/components/sections/product-showcase.tsx").text();
  expect(showcase).toContain("aria-pressed");
  expect(showcase).toContain("max-width: 63.99rem");
  expect(showcase).toContain("selectedIndex");
});

test("shared touch controls and table regions are wired", async () => {
  const field = await Bun.file(new URL("../../design-system/packages/ui/src/components/field.tsx", import.meta.url).pathname).text();
  const table = await Bun.file(new URL("../../design-system/packages/ui/src/components/table.tsx", import.meta.url).pathname).text();
  expect(field).toContain("pointer-coarse:text-base");
  expect(table).toContain("scrollLabel");
});

test("MDX components include responsive table handling", async () => {
  const mdx = await Bun.file(ROOT + "src/mdx-components.tsx").text();
  expect(mdx).toContain("table:");
  expect(mdx).toContain("overflow-x-auto");
});
