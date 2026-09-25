/**
 * Links the sibling design-system checkout into node_modules/@upcytech/*. Runs on install.
 *
 * Why a symlink and not a dependency: the design system is not published yet, and its
 * packages declare `workspace:*` and `catalog:` dependencies that only resolve inside its
 * own Bun workspace — `file:` fails on those, and Bun's `link:` takes a registered name,
 * not a path. A symlink gives this app the exact import specifiers a published package
 * will, so moving to GitHub Packages later deletes this script and changes no source file.
 *
 * Location: ../design-system by default, or UPCYTECH_DESIGN_SYSTEM.
 */
import { existsSync, mkdirSync, rmSync, symlinkSync } from "node:fs";
import path from "node:path";
import { designSystemPath } from "./design-system-path.ts";

const root = path.resolve(import.meta.dir, "..");
const designSystem = designSystemPath(root);
const PACKAGES = ["ui", "tokens", "tailwind-config", "brand", "icons"] as const;

function fail(message: string): never {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

if (!existsSync(path.join(designSystem, "packages/ui/package.json"))) {
  fail(`Design system not found at ${designSystem}.\n  Clone it beside this repo, or set UPCYTECH_DESIGN_SYSTEM.`);
}
if (!existsSync(path.join(designSystem, "packages/tokens/dist/tokens.css"))) {
  fail(`Design-system tokens are not built.\n  Run: (cd ${designSystem} && bun install && bun run tokens)`);
}

const scope = path.join(root, "node_modules/@upcytech");
mkdirSync(scope, { recursive: true });

for (const name of PACKAGES) {
  const target = path.join(designSystem, "packages", name);
  const link = path.join(scope, name);
  rmSync(link, { recursive: true, force: true }); // removes a stale link, never its target
  symlinkSync(target, link, "dir");
  console.log(`@upcytech/${name} → ${path.relative(root, target)}`);
}
