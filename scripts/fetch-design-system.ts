/**
 * Ensures the design-system checkout exists and tokens are built. Runs before `bun install`
 * on Vercel (see vercel.json); local dev with a sibling ../design-system is a no-op.
 *
 * Location: same rule as scripts/link-design-system.ts (UPCYTECH_DESIGN_SYSTEM or ../design-system).
 * Branch: UPCYTECH_DESIGN_SYSTEM_BRANCH, defaulting to master — the UI and brand exports this
 * app consumes landed there with design-system PRs #1–#6 (2026-09-24).
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { designSystemPath } from "./design-system-path.ts";

const root = path.resolve(import.meta.dir, "..");
const designSystem = designSystemPath(root);
const REPO = process.env.DESIGN_SYSTEM_REPO ?? "https://github.com/UpcyTech/design-system.git";
const branch = process.env.UPCYTECH_DESIGN_SYSTEM_BRANCH ?? "master";
const uiMarker = path.join(designSystem, "packages/ui/package.json");
const tokensMarker = path.join(designSystem, "packages/tokens/dist/tokens.css");

function fail(message: string): never {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

function run(cmd: string, cwd: string): void {
  console.log(`→ ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

if (!existsSync(uiMarker)) {
  const token = process.env.DESIGN_SYSTEM_READ_TOKEN;
  if (!token) {
    fail(
      `Design system not found at ${designSystem}.\n` +
        `  Set DESIGN_SYSTEM_READ_TOKEN (read access to UpcyTech/design-system) or clone locally.`,
    );
  }
  const cloneUrl = REPO.replace("https://", `https://x-access-token:${token}@`);
  try {
    run(`git clone --depth 1 --branch "${branch}" "${cloneUrl}" "${designSystem}"`, root);
  } catch {
    fail(
      `Could not clone ${REPO} (HTTP 403 usually means the token cannot read that repo).\n` +
        `  Fine-grained PAT: add repository UpcyTech/design-system, Contents Read, and authorize the token for the UpcyTech org (SSO).\n` +
        `  If design-system lives elsewhere, set DESIGN_SYSTEM_REPO to its HTTPS URL.`,
    );
  }
}

if (!existsSync(tokensMarker)) {
  run("bun install --frozen-lockfile", designSystem);
  run("bun run tokens", designSystem);
}

console.log(`Design system ready at ${designSystem}`);
