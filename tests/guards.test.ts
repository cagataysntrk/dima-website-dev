import { expect, test } from "bun:test";
import { Glob } from "bun";
import { products } from "@/content/products";
import { contactPage } from "@/content/pages/contact";

const ROOT = new URL("../", import.meta.url).pathname;

/** Vendored third-party code (src/components/vendor) keeps its upstream form and is not scanned. */
async function scan(pattern: string) {
  const files: { path: string; lines: string[] }[] = [];
  for await (const path of new Glob(pattern).scan({ cwd: ROOT })) {
    if (path.includes("/vendor/")) continue;
    files.push({ path, lines: (await Bun.file(ROOT + path).text()).split("\n") });
  }
  return files;
}

/**
 * The Upcy products may be consolidated under a new name. That rename must touch
 * src/content/products.ts and nothing else, so no component or route may spell a name.
 */
test("product names live only in content files", async () => {
  const files = await scan("src/{components,app,lib,i18n}/**/*.{ts,tsx,css}");
  const hits: string[] = [];
  for (const { path, lines } of files) {
    lines.forEach((line, i) => {
      for (const { name } of products) if (line.includes(name)) hits.push(`${path}:${i + 1}  ${name}`);
    });
  }
  expect(hits, hits.join("\n")).toEqual([]);
});

/** Design-system rule: positioning, battlecards and objections never reach public output. */
test("nothing reaches the design system's brand/internal", async () => {
  // Everything that can reach the build. Not tests/: this file has to name the path it guards.
  const files = [
    ...(await scan("{src,scripts}/**/*.{ts,tsx,css,mdx,json}")),
    ...(await scan("next.config.ts")),
  ];
  const hits: string[] = [];
  for (const { path, lines } of files) {
    lines.forEach((line, i) => {
      if (/brand\/internal/.test(line) && !/never|NEVER/.test(line)) hits.push(`${path}:${i + 1}`);
    });
  }
  expect(hits, hits.join("\n")).toEqual([]);
});

/**
 * User-visible strings live in src/content as { tr, en } and reach components as props —
 * never as literals in JSX. A literal accessible name, placeholder or alt text ships in one
 * language to every visitor (the map's English controls did, until its labels were threaded
 * through from content). Content files themselves are exempt: they ARE the localisation system.
 */
test("no hardcoded user-visible strings in site components", async () => {
  const files = await scan("src/{components,app,lib,i18n}/**/*.{ts,tsx}");
  const hits: string[] = [];
  for (const { path, lines } of files) {
    lines.forEach((line, i) => {
      if (/\baria-label="\s*[^"{]/.test(line)) hits.push(`${path}:${i + 1}  hardcoded aria-label`);
      if (/[^a-zA-Z-]\blabel="\s*[^"{]/.test(line)) hits.push(`${path}:${i + 1}  hardcoded label`);
      if (/\bplaceholder="\s*[^"{]/.test(line)) hits.push(`${path}:${i + 1}  hardcoded placeholder`);
      if (/\balt="\s*[^"{]/.test(line)) hits.push(`${path}:${i + 1}  hardcoded alt`);
    });
  }
  expect(hits, "Move the string into src/content with tr and en, and pass it as a prop.\n" + hits.join("\n")).toEqual([]);
});

/** The map renders controls, so every control label must exist in both locales. */
test("map controls are localized", () => {
  const controls = contactPage.office.map.controls;
  const gaps: string[] = [];
  for (const key of ["zoomIn", "zoomOut", "locate", "fullscreen", "resetBearing"] as const) {
    for (const locale of ["tr", "en"] as const) {
      if (!controls[key]?.[locale]) gaps.push(`${key}.${locale}`);
    }
  }
  if (!contactPage.form.honeypot.tr || !contactPage.form.honeypot.en) gaps.push("form.honeypot");
  expect(gaps, gaps.join("\n")).toEqual([]);
});

/** The site adds no colours of its own; every one comes from the design system's tokens. */
test("no raw colour literals in site code", async () => {
  const files = await scan("src/**/*.{ts,tsx,css}");
  const hits: string[] = [];
  for (const { path, lines } of files) {
    lines.forEach((line, i) => {
      for (const m of line.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?!-)|\boklch\(|\brgba?\(|\bhsla?\(/g)) {
        hits.push(`${path}:${i + 1}  ${m[0]}`);
      }
    });
  }
  expect(hits, "Missing a colour? Add a token to the design system.\n" + hits.join("\n")).toEqual([]);
});

test("layout only imports design-system packages published on master", async () => {
  const layout = await Bun.file(ROOT + "src/app/[locale]/layout.tsx").text();
  expect(layout).not.toContain('@upcytech/brand/next');
});

test("Vercel fetch pins the current design-system branch", async () => {
  const fetchScript = await Bun.file(ROOT + "scripts/fetch-design-system.ts").text();
  expect(fetchScript).toContain("UPCYTECH_DESIGN_SYSTEM_BRANCH");
  expect(fetchScript).toContain("--branch");
});
