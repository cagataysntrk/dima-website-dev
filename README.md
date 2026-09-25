# Dima website — development workspace

Dima's public marketing-site refactor, built from the exact UpcyTech production snapshot
recorded in `SOURCE_BASELINE.md`. The migration is intentionally in-place: existing layout,
responsive behavior, tests, motion and design-system integration are preserved and adapted
route by route. Next.js (App Router), TypeScript strict, Tailwind v4 through the design
system, next-intl with Turkish first. Bun only.

## Local setup

The design system is consumed from a sibling checkout until it is published:

```
Desktop/
  design-system/   github.com/UpcyTech/design-system
  upcytech/        this repo
```

```bash
(cd ../design-system && bun install && bun run tokens)
bun install        # postinstall links ../design-system/packages/* into node_modules/@upcytech
cp .env.example .env.local
bun run dev        # http://localhost:3000/tr
```

A different location: `UPCYTECH_DESIGN_SYSTEM=/path/to/design-system bun install`.

Why a symlink rather than a dependency is explained at the top of
`scripts/link-design-system.ts`. Builds use webpack (`--webpack`), because Turbopack only
reads files under its own root. `postinstall` also copies the MapLibre worker into
`public/maplibre`, so the contact map loads nothing from a CDN.

```bash
bun test           # content in both languages, voice rules, guards
bun run typecheck
bun run build
bun run check      # test + typecheck
bun run test:e2e   # production-server browser checks (Chromium)
bun run capture:screens  # re-shoot the analytics product's screens from the real PoC (see the script's header)
```

The browser suite covers 320px route overflow, the fixed nav's footprint and sticky layers on
every route in both languages, tablet navigation, touch form controls, the product selector
and wheel, the chat demo end to end, and the first-load JS budget. It builds a production
server on port 3010 unless `PLAYWRIGHT_BASE_URL` points at an already-running server.

`FAIL_ON_COPY=1 bun test` fails on any `[COPY NEEDED]` slot (default: report only,
160 open as of 2026-09-17). `MAX_COPY_N=160 bun test` caps drift.

## Deploying on Vercel

`vercel.json` runs `scripts/fetch-design-system.ts` before `bun install`, cloning the
private design-system repo into `.design-system` and building tokens (same steps as CI).
The default clone branch is `master`, where the UI and brand exports this app consumes
now live; set `UPCYTECH_DESIGN_SYSTEM_BRANCH` to build against another branch.

| Vercel env | Purpose |
|---|---|
| `DESIGN_SYSTEM_READ_TOKEN` | GitHub PAT with read access to `UpcyTech/design-system` (same secret as GitHub Actions) |
| `UPCYTECH_DESIGN_SYSTEM_BRANCH` | Design-system branch to clone; defaults to `master` |

If clone fails with **403** / *Write access to repository not granted*, the token is reaching GitHub but
is not allowed to read **`UpcyTech/design-system`** (not the `upcytech0/upcytech` app repo). On a
fine-grained PAT: repository access must include **UpcyTech/design-system**, **Contents: Read**, then
**Configure SSO** / authorize the token for the **UpcyTech** organization on the token’s page.

Production app variables (`NEXT_PUBLIC_SITE_URL`, PostHog, SMTP, etc.) are listed in
`.env.example`; set them in the Vercel project and redeploy when they change.

## Performance budgets

LCP <2.5s; per-route JS <250kB gzip (`e2e/budget.e2e.ts` measures first-load JS: /tr
237 kB, /tr/cozumler 220 kB on 2026-09-24). Heavy decoration (three/gsap/cobe/maplibre,
Pixel Blast, hero globe, map) is never in the page bundle: `dynamic ssr:false`,
idle/in-view gated (`useDeferredDecoration`), DPR ≤1.5, map click-to-load. Site
exceptions (capsule rainbow CTAs, Geist headline, vendor kit, fixed nav, chat demo) are
recorded in `DECISIONS.md` (D-032…D-041). Canonical paths: `upcytech/` is the app,
`../design-system` the authority, `../upcytech_archive` read-only legacy — do not edit.

## Environment

Every variable is listed, with comments, in `.env.example`.

| Variable | Without it |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical, hreflang, sitemap and share-image URLs use `https://upcytech.com` |
| `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | Analytics never starts, even after consent |
| `SMTP_*`, `CONTACT_TO`, `CONTACT_FROM` | The contact form validates, then shows "could not send" and keeps what was typed |

`NEXT_PUBLIC_*` values are read at **build** time; change them and rebuild.

## Editing content

Copy is never written in a component. It lives in typed files under `src/content/`:

| File | Holds |
|---|---|
| `products.ts` | Every product: name, brand colour, domain, and all its copy |
| `industries.ts` | Sectors, their dated regulatory pressures (each with a source), brand frameworks |
| `services.ts` | Services and the needs a client arrives with |
| `team.ts`, `careers.ts` | The team (home and about share it), open roles, the hiring steps |
| `legal.ts` | The legal pages' structure, and the facts their drafter needs |
| `consent.ts` | The cookie banner |
| `dima-demo.ts` | The scripted chat demo: its questions, answers, sample data and SQL |
| `pages/<page>.ts` | The strings on one page that are not about a single product, sector or service |
| `site.ts` | Navigation, footer, company details, skip link |
| `blog/` | Posts and categories — see below |

Every string is `{ tr, en }`. A missing English string is a **type error**, and `bun test`
fails on an empty one. Turkish is written first; English is a rewrite for a different
reader, not a translation — see the design system's `brand/public/voice-and-tone.md`.

Where copy is unknown, write `copyNeeded("what is missing")`. It renders visibly as
`[COPY NEEDED: …]`, and `bun test` prints how many remain. Never fill a gap with an invented
metric, customer, quote or certification.

## Renaming or consolidating a product

Edit `src/content/products.ts` only: `name`, `slug`, `brandKey`, `domain`, and the copy.
`tests/guards.test.ts` fails if a product name appears in any component or route, which is
what keeps a rename to one file. A new or retired brand colour is a design-system change
(`packages/tokens/src/brand/`), made there first.

## Adding a blog post

A post is one MDX file per language in `src/content/blog/`: `<slug>.tr.mdx` and, if it has
one, `<slug>.en.mdx`. The slug is the URL (`/tr/blog/<slug>`), so write it in lowercase
ASCII with hyphens and keep it the same in both files. A post that exists in one language
only is listed only there, and its hreflang says so.

Each file starts with a typed `metadata` export instead of frontmatter:

```mdx
export const metadata = {
  title: "…",
  description: "…",           // one sentence; also the search and share-image description
  date: "2026-10-01",         // ISO; `updated` is optional
  author: "member-1",         // an id from src/content/team.ts
  category: "compliance",     // compliance | data | operations | company
  related: { kind: "product", id: "carbon" }, // where the closing CTA points
  featured: false,
  draft: false,
};

Body in Markdown. Headings start at `##`.
```

`metadata` is checked against `PostMeta` in `src/lib/blog.ts`, so a missing or misspelled
field fails the build. `draft: true` hides a post everywhere — list, sitemap, share image —
except in builds run with `SHOW_DRAFTS=1`. `ilk-yazi` is such a draft: it shows every
element of the post template, and should be deleted once a real post is published.

## Cookie consent and analytics

Nothing non-essential runs before consent. The banner (`ConsentBanner` from the design
system, wired in `src/components/consent/`) asks once; decline and accept carry equal
weight. The choice is kept in localStorage as `upcy-consent`, not in a cookie, and the
footer's "Çerez tercihleri" reopens it.

PostHog is not in the page bundle. `src/lib/analytics.ts` imports it only when a visitor
accepts, and withdrawing consent stops capture and deletes PostHog's cookie and storage.
Bump `CONSENT_VERSION` in `src/lib/consent.ts` when the cookie policy changes in a way
visitors must agree to again; every stored choice is then asked afresh.

The cookie policy itself is not written here. `drafterFacts` in `src/content/legal.ts`
lists what the site actually stores, for whoever drafts it.

## Share images

Every page and post has its own 1200×630 Open Graph image, rendered at build time by
`src/app/og/[locale]/[file]/route.tsx` from the same title and description as the page's
metadata. A new page gets one by adding a line to `src/lib/og.ts`; posts get theirs
automatically.

The images use the design system's colours (from its native token export) and static cuts
of the brand faces from Fontsource, because the renderer reads neither CSS variables nor
woff2.
