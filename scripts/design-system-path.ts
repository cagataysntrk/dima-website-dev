/**
 * Where the design-system git checkout lives. Shared by fetch + link scripts.
 *
 * - UPCYTECH_DESIGN_SYSTEM: explicit override (path relative to app root or absolute)
 * - On Vercel: `.design-system` inside the app (vercel.json env is not always set during install)
 * - Local default: sibling `../design-system`
 */
import path from "node:path";

export function designSystemPath(appRoot: string): string {
  const env = process.env.UPCYTECH_DESIGN_SYSTEM;
  if (env) return path.resolve(appRoot, env);
  if (process.env.VERCEL === "1") return path.join(appRoot, ".design-system");
  return path.resolve(appRoot, "../design-system");
}
