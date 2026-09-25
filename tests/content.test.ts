import { describe, expect, test } from "bun:test";
import { products } from "@/content/products";
import { productsPage } from "@/content/pages/products";
import { site } from "@/content/site";
import { frameworks, industries } from "@/content/industries";
import { industriesPage } from "@/content/pages/industries";
import { clientNeeds, services } from "@/content/services";
import { servicesPage } from "@/content/pages/services";
import { homePage } from "@/content/pages/home";
import { aboutPage } from "@/content/pages/about";
import { team } from "@/content/team";
import { contactPage } from "@/content/pages/contact";
import { careersPage } from "@/content/pages/careers";
import { hiringSteps, roles } from "@/content/careers";
import { blogPage } from "@/content/pages/blog";
import { categories } from "@/content/blog/categories";
import { drafterFacts, legalChrome, legalDocs } from "@/content/legal";
import { consentCopy } from "@/content/consent";

import { solutionsPage } from "@/content/pages/solutions";
import { chatDemoCopy } from "@/content/dima-demo";
import { problemMatcherCopy } from "@/content/problem-matcher";

/** Every content module. Add a new one here when a page is built. */
const CONTENT = {
  homePage, aboutPage, contactPage, careersPage, blogPage, categories, hiringSteps, roles, team,
  legalDocs, drafterFacts, legalChrome, consentCopy, products, productsPage, industries, frameworks, industriesPage,
  services, clientNeeds, servicesPage, solutionsPage, chatDemoCopy, problemMatcherCopy, site,
} as const;

test("service copy keeps the handover vocabulary: devir, never teslim", () => {
  const hits: string[] = [];
  const walkStrings = (node: unknown, path: string) => {
    if (typeof node === "string") { if (/\bteslim\b/i.test(node)) hits.push(path); return; }
    if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) walkStrings(v, `${path}.${k}`);
  };
  walkStrings({ services, clientNeeds, servicesPage }, "services");
  expect(hits, "design-system messaging: handover is a process (devir), delivery is a moment\n" + hits.join("\n")).toEqual([]);
});

test("sectors reference products that exist", () => {
  const ids = new Set(products.map((p) => p.id));
  const missing = industries.flatMap((s) => s.products.filter((id) => !ids.has(id)).map((id) => `${s.id} → ${id}`));
  expect(missing, missing.join("\n")).toEqual([]);
});

test("every dated pressure has a valid ISO date and a source in both languages", () => {
  const bad = industries.flatMap((s) => s.pressures
    .filter((p) => (p.date !== null && Number.isNaN(Date.parse(p.date))) || !p.source.tr || !p.source.en)
    .map((p) => `${s.id}: ${p.date}`));
  expect(bad, bad.join("\n")).toEqual([]);
});

type Leaf = { path: string; text: string };

const isLocalized = (v: unknown): v is { tr: unknown; en: unknown } =>
  !!v && typeof v === "object" && !Array.isArray(v) &&
  Object.keys(v).sort().join(",") === "en,tr";

function walk(node: unknown, path: string, visit: (path: string, node: unknown) => void) {
  visit(path, node);
  if (Array.isArray(node)) node.forEach((child, i) => walk(child, `${path}[${i}]`, visit));
  else if (node && typeof node === "object") {
    for (const [key, child] of Object.entries(node)) walk(child, `${path}.${key}`, visit);
  }
}

const leaves: Leaf[] = [];
const localized: { path: string; value: { tr: unknown; en: unknown } }[] = [];
for (const [name, module] of Object.entries(CONTENT)) {
  walk(module, name, (path, node) => {
    if (typeof node === "string") leaves.push({ path, text: node });
    if (isLocalized(node)) localized.push({ path, value: node });
  });
}

describe("both languages, always", () => {
  test("every localized field has non-empty Turkish and English", () => {
    const gaps: string[] = [];
    for (const { path, value } of localized) {
      for (const locale of ["tr", "en"] as const) {
        const v = value[locale];
        const empty = v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
        if (empty) gaps.push(`${path}.${locale}`);
      }
      if (Array.isArray(value.tr) && Array.isArray(value.en) && value.tr.length !== value.en.length) {
        gaps.push(`${path}: ${value.tr.length} Turkish items, ${value.en.length} English`);
      }
    }
    expect(gaps, "An empty field is visible; a missing translation ships.\n" + gaps.join("\n")).toEqual([]);
  });
});

describe("voice rules (design-system brand/public/voice-and-tone.md)", () => {
  const BANNED = [
    /\blider\b/i, /\ben iyi\b/i, /türkiye'nin ilk/i, /devrim niteliğinde/i, /yenilikçi/i,
    /çözüm odaklı/i, /dijital dönüşüm/i, /anahtar teslim/i, /butik yazılım/i, /her türlü yazılım/i,
    /karbon nötr/i, /net sıfır/i, /yeşil dönüşüm/i, /sürdürülebilir gelecek/i,
    /revolutionary/i, /next-generation/i, /cutting-edge/i, /ai-powered/i, /world-class/i,
    /best-in-class/i, /state-of-the-art/i, /seamless/i,
  ];

  test("no banned superlatives or empty category words", () => {
    const hits = leaves.flatMap(({ path, text }) =>
      BANNED.filter((re) => re.test(text)).map((re) => `${path}: ${re.source}`));
    expect(hits, hits.join("\n")).toEqual([]);
  });

  test("no exclamation marks", () => {
    const hits = leaves.filter(({ text }) => text.includes("!")).map(({ path }) => path);
    expect(hits, hits.join("\n")).toEqual([]);
  });
});

test("reports every [COPY NEEDED] slot still open", () => {
  const open = leaves.filter(({ text }) => text.includes("[COPY NEEDED"));
  console.log(`\n[COPY NEEDED] slots still open: ${open.length}`);
  // "products[3].title.tr" → "products[3]"; "site.footer.entity.tr" → "site.footer"
  const byArea = Map.groupBy(open, ({ path }) => path.match(/^\w+(\[\d+\]|\.\w+)/)?.[0] ?? path);
  for (const [area, items] of byArea) console.log(`  ${String(items.length).padStart(3)}  ${area}`);
  // Open slots are expected while copy is drafted, but CI can freeze the count:
  // FAIL_ON_COPY=1 fails on any open slot; MAX_COPY_N caps drift (current: 160, 2026-09-17).
  if (process.env.FAIL_ON_COPY === "1") expect(open.length, open.map(({ path }) => path).join("\n")).toEqual(0);
  const max = Number(process.env.MAX_COPY_N ?? Number.NaN);
  if (Number.isFinite(max)) expect(open.length).toBeLessThanOrEqual(max);
  expect(open.length).toBeGreaterThanOrEqual(0);
});
