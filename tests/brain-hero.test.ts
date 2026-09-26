import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

import { heroBrainLab } from "@/content/hero-brain-candidates";
import { homePage } from "@/content/pages/home";

test("hero brain comparison keeps five selectable live candidates", () => {
  expect(heroBrainLab.candidates.map((item) => item.id)).toEqual([
    "atlas",
    "perfusion",
    "neon",
    "wireframe",
    "flow",
  ]);
  expect(new Set(heroBrainLab.candidates.map((item) => item.id)).size).toBe(heroBrainLab.candidates.length);
  expect(heroBrainLab.candidates.every((item) => item.modelUrl.startsWith("https://"))).toBe(true);
});

test("hero copy always provides a title in both public locales", () => {
  expect(homePage.hero.title.tr.length).toBeGreaterThan(0);
  expect(homePage.hero.title.en.length).toBeGreaterThan(0);
});

test("3D engine uses Three Timer and has a bounded model fallback", () => {
  const source = readFileSync("src/components/vendor/brain-hero/brain-scene-engine.ts", "utf8");
  expect(source.includes("new THREE.Clock")).toBe(false);
  expect(source.includes("new THREE.Timer")).toBe(true);
  expect(source.includes("timer.update(timestamp)")).toBe(true);
  expect(source.includes("FALLBACK_MODEL_URL")).toBe(true);
  expect(source.includes("Timed out while loading 3D brain asset")).toBe(true);
  expect(source.includes('onState("error")')).toBe(true);
});

test("HeroTitle cannot crash on a transient missing title during hot reload", () => {
  const source = readFileSync("src/components/home/hero-title.tsx", "utf8");
  expect(source.includes('typeof text === "string"')).toBe(true);
});
