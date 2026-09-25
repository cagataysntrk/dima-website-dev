# upcytech.com — agent rules

Canonical source is `upcytech/` (this repo). `../design-system` is the token/component
authority (symlinked, not published yet). `../upcytech_archive` is read-only legacy
reference — never edit, never index for patterns without checking this repo first.

- Bun only (`bun install`, `bun test`, `bun run`). Next 16.3.5 App Router, `--webpack`
  builds (Turbopack cannot leave the root to reach the sibling design system).
- Copy lives in typed `src/content/` (`{ tr, en }`); never invent metrics/quotes/certs —
  use `copyNeeded()`. Product names only in content (`tests/guards.test.ts` enforces).
- No raw colours outside design-system tokens (no hex/oklch/rgb in site code; OG route
  uses `@upcytech/tokens/native` pre-resolved because Satori reads no CSS vars).
- Performance budgets: LCP <2.5s, per-route JS <250kB gzip; heavy decoration
  (three/gsap/cobe/maplibre) stays dynamic `ssr:false` + idle/in-view gated, DPR ≤1.5.
- Full rules: `README.md` + `DECISIONS.md` in this repo; tokens/theming: design-system
  `DESIGN.md`, `TOKEN_ARCHITECTURE.md`, `DECISIONS.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
