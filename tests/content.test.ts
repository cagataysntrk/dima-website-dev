import { describe, expect, test } from "bun:test";
import { products } from "@/content/products";
import { productsPage } from "@/content/pages/products";
import { site } from "@/content/site";
import { industries } from "@/content/industries";
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
import { companyBrain } from "@/content/company-brain";
import { capabilityDepths, capabilityDepthsCopy } from "@/content/capability-depths";
import { productExperience } from "@/content/product-experience";

const CONTENT = {
  homePage, aboutPage, contactPage, careersPage, blogPage, categories, hiringSteps, roles, team,
  legalDocs, drafterFacts, legalChrome, consentCopy, products, productsPage, industries, industriesPage,
  services, clientNeeds, servicesPage, solutionsPage, chatDemoCopy, problemMatcherCopy, companyBrain,
  capabilityDepths, capabilityDepthsCopy, productExperience, site,
} as const;

const PUBLIC_LANGUAGE_CONTENT = {
  homePage,
  aboutPage,
  contactPage,
  careersPage,
  blogPage,
  categories,
  industries,
  industriesPage,
  solutionsPage,
  companyBrain,
  capabilityDepths,
  capabilityDepthsCopy,
  productExperience,
  site,
  team,
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

test("sector-context previews have unique ids and localized anchors", () => {
  expect(new Set(industries.map((item) => item.id)).size).toBe(industries.length);
  const tr = industries.map((item) => item.anchor.tr);
  const en = industries.map((item) => item.anchor.en);
  expect(new Set(tr).size).toBe(tr.length);
  expect(new Set(en).size).toBe(en.length);
});

test("Şirket Beyni relations reference real lobes and lobe ids are unique", () => {
  const ids = companyBrain.lobes.map((lobe) => lobe.id);
  expect(new Set(ids).size).toBe(ids.length);
  const idSet = new Set(ids);
  const bad = companyBrain.relations
    .filter((relation) => !idSet.has(relation.from) || !idSet.has(relation.to))
    .map((relation) => `${relation.from} -> ${relation.to}`);
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

function strings(node: unknown, path: string, out: Leaf[]) {
  if (typeof node === "string") {
    out.push({ path, text: node });
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((child, i) => strings(child, `${path}[${i}]`, out));
    return;
  }
  if (node && typeof node === "object") {
    for (const [key, child] of Object.entries(node)) strings(child, `${path}.${key}`, out);
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

const publicLocalized: { path: string; value: { tr: unknown; en: unknown } }[] = [];
for (const [name, module] of Object.entries(PUBLIC_LANGUAGE_CONTENT)) {
  walk(module, name, (path, node) => {
    if (isLocalized(node)) publicLocalized.push({ path, value: node });
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

describe("public Turkish language", () => {
  const turkishLeaves: Leaf[] = [];
  for (const { path, value } of publicLocalized) strings(value.tr, `${path}.tr`, turkishLeaves);

  test("visible copy has no long dash characters", () => {
    const hits = turkishLeaves.filter(({ text }) => /[—–]/.test(text)).map(({ path, text }) => `${path}: ${text}`);
    expect(hits, hits.join("\n")).toEqual([]);
  });

  test("product jargon does not leak into Turkish copy", () => {
    const banned = [
      /\bCompany Brain\b/i,
      /\bCompany Map\b/i,
      /\bDima Today\b/i,
      /\bfinding\b/i,
      /\bevidence\b/i,
      /\bentity\b/i,
      /\binvestigation\b/i,
      /\bdashboard\b/i,
      /\bchat\b/i,
      /\bonboarding\b/i,
      /\bpack\b/i,
      /\brework\b/i,
      /\broot cause\b/i,
      /\bfrontend\b/i,
      /\bbackend\b/i,
      /\bagentic\b/i,
      /\bprompt\b/i,
      /\bdemo\b/i,
      /\blive\b/i,
      /\bpilot\b/i,
    ];
    const hits = turkishLeaves.flatMap(({ path, text }) =>
      banned.filter((re) => re.test(text)).map((re) => `${path}: ${re.source}: ${text}`));
    expect(hits, hits.join("\n")).toEqual([]);
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
  const byArea = Map.groupBy(open, ({ path }) => path.match(/^\w+(\[\d+\]|\.\w+)/)?.[0] ?? path);
  for (const [area, items] of byArea) console.log(`  ${String(items.length).padStart(3)}  ${area}`);
  if (process.env.FAIL_ON_COPY === "1") expect(open.length, open.map(({ path }) => path).join("\n")).toEqual(0);
  const max = Number(process.env.MAX_COPY_N ?? Number.NaN);
  if (Number.isFinite(max)) expect(open.length).toBeLessThanOrEqual(max);
  expect(open.length).toBeGreaterThanOrEqual(0);
});
