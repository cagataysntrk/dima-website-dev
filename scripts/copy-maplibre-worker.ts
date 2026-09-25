/**
 * Copies MapLibre's worker into public/, so the map never loads code from a CDN (mapcn's
 * default is unpkg). Runs on install; the copy is gitignored because it is generated from
 * the installed maplibre-gl version and must always match it.
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dir, "..");
const dist = path.join(root, "node_modules/maplibre-gl/dist");
const target = path.join(root, "public/maplibre");
// The worker imports the shared chunk by relative path, so both travel together.
const FILES = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];

if (!existsSync(path.join(dist, FILES[0]!))) {
  console.warn("maplibre-gl is not installed; skipping the worker copy.");
  process.exit(0);
}
mkdirSync(target, { recursive: true });
for (const file of FILES) copyFileSync(path.join(dist, file), path.join(target, file));
console.log(`maplibre worker → public/maplibre/ (${FILES.join(", ")})`);
