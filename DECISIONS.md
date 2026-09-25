# upcytech.com decisions

App-level log. The design system's `DECISIONS.md` owns tokens/theming; this file owns
this site's exceptions and performance posture. Newest first.

Format: **decision** · alternatives · reason · date.

---

## 2026-09-25 — Dima master-brand website refactor

### D-044 · Company Brain replaces the globe and single-product wheel as the home product model
**Decided:** the home hero keeps its proven layout and background field, but the Stripe-style
globe is no longer the product visual. The right-hand hero slot becomes a lightweight Company
Brain preview, and the former single-product wheel becomes the interactive Company Brain
experience.

The experience has two lenses over the **same selected lobe and the same underlying content
model**: Full Brain Form and Company Brain Map. Five top-level business domains are represented
in this first marketing slice: accounting/finance, manufacturing, sales, procurement and
quality. Selecting a lobe exposes its connected entities, a representative finding, the
evidence categories inspected and the next decision step. Cross-domain relationships remain
visible in map mode.

The marketing surface uses semantic DOM + SVG and existing tokens rather than importing
ReactFlow/XYFlow or a second UI system from the product repo. The product repo's graph work is
a donor/reference for the later real entity-graph depth, not a dependency for this page.
Visible examples are explicitly labelled representative/sample data; no static marketing
interaction is presented as a live backend execution.

**Performance/accessibility:** no new WebGL dependency, deterministic first render, keyboard
buttons for both lens and lobe selection, reduced-motion-safe status pulses, and all
user-visible copy remains in typed bilingual content.

**Reason:** make the website itself explain the product's core mental model — company → lobe →
entity/relationship → signal → finding → evidence/investigation → decision/action — without
discarding the site's existing design system or performance posture.

### D-043 · Refactor the current site in place; do not rebuild it from scratch
**Decided:** the public Dima website is developed from the exact UpcyTech production
snapshot recorded in `SOURCE_BASELINE.md`. Existing layout, responsive behavior, motion,
accessibility, performance budgets, content typing, tests and design-system integration are
assets to preserve. Changes proceed route by route and component by component: adapt first,
replace only where the Dima product model requires a different interaction.

The customer-facing master brand becomes **Dima** and the canonical marketing domain becomes
`usedima.com`. **UpcyTech Teknoloji A.Ş.** remains the legal entity where legal/company
identity is required. The current Brand House V1.5 is the messaging authority: Dima is the
company's monitoring, optimization and decision center; Company Brain is the primary product
experience; chat is a contextual interface, not the product center.

The first foundation pass changes brand chrome, SEO, hero and Dima product copy, and removes
the old multi-product/services emphasis and the chat-first home demo. It deliberately does
**not** rewrite the hero visual or section primitives: the next coherent pass replaces the
globe/product-demo emphasis with the real Company Brain experience.

**Reason:** preserve the already-proven site quality while changing the product and brand
architecture without creating a second frontend or a parallel design language.

## 2026-09-24 — Website revision (nav, CTA, hero, product demo)

### D-042 · Responsive pass: phones get stacked rows, touch gets 44px everywhere
**Decided:** after a full audit (19 routes × 11 viewports measured, 51 page/width
screenshot sets reviewed):
- Comparison tables (positioning matrix, frameworks) render as stacked blocks below `sm`
  (`StackedRows`), the table from `sm` — only one is in the accessibility tree at a time, so the
  Safari table-semantics concern that kept the side-scrolling table does not arise.
- 44px targets under `pointer: coarse` for every standalone control: DS `Link standalone` and the
  footer logo (DS changeset), scroll-to-top, map controls and attribution, bento and matrix
  links, the demo's textarea, FAQ questions (padding moved onto the button, not overlapping
  the answer).
- Sentences never in 10px `micro` (DS §7): /cozumler chips and the wizard hint at `text-ui`.
- Unknown addresses under a locale hit `[locale]/[...rest]` → the site's 404 inside the layout
  (the root fallback rendered with no CSS).
- Layout fixes found on the way: phone mockup wrapped (Iphone's own `w-full` beat the passed
  width), product names no longer shrink mid-word, /cozumler containers on the Section grid,
  workflow rail vertical at every width, sector dates in a fixed column, team rows centred
  when they wrap, TextAnimate spaces collapse at wraps (headings started lines indented).
**Reason:** "make sure the website responsiveness is done fully"; each item was a measured or
screenshotted defect, re-verified after the fix.

### D-041 · The analytics product's showcase screens are the real PoC, in dark
**Decided:** `public/products/dima-{desktop,mobile}.webp` are screenshots of the product itself
— the Dima PoC (`Upcy/dima/frontend/apps/metabase-poc`) — in its dark theme, captured by
`bun run capture:screens`: a demo user signs in, the site demo's OEE conversation is seeded
into the PoC's own chat store (localStorage), and Playwright photographs the real screen at the
showcase's 1600×934 and 1080×2337 (the phone shows the PoC's table view). Only the PoC's auth
Postgres is needed — no model key, no Metabase. The dev indicator and the transient
"jump to bottom" button are hidden. (Supersedes the first version of this decision, which
photographed the site's own demo.)
**Reason:** the screens must show the product as it is, not a stand-in.

### D-040 · A scripted copy of the product's chat screen replaces AnalyticsDemo
**Decided:** `components/sections/chat-demo/` under "Our products" on the home page and in the
analytics block on /solutions is a copy of the PoC's app screen — AppSidebar (new chat,
attachments, data, chats, getting-started pill, account), the 48px top bar, the hero composer
with `border-beam`, the `thinking-orbs` face, live steps and "N s thought", the answer, the
result card (chart / table toggle, chart type, row count), save actions, the line-numbered
query and follow-ups — in the PoC's classes and proportions, over this site's tokens
(`.dima-app` in globals.css mixes the PoC's surfaces from them). The sidebar is inline from a
48rem-wide panel (a container query, correct from the server's HTML) and a drawer below. The
script replays the PoC's event stream (`step`/`token`/`done`/`suggestions`) from
`content/dima-demo.ts`; no network, no model; fixtures follow D-023 and the bar says "sample
data". The chart is drawn in CSS/SVG to Recharts' look (a site exception to the DS Recharts
façade, §12); orb and beam load as dynamic chunks, so first-load JS stays at /tr 240.5 kB.
**Alternatives:** a live LLM endpoint (cost, abuse, keys); porting the PoC's components with
`@dima/ui`, shadcn tokens, Better Auth and Recharts (budget, auth).
**Reason:** "a simple, working product interface, copied from the PoC" — and "it does not look
like the PoC" until it was rebuilt from the PoC's own markup.

### D-039 · The floating nav is fixed; --nav-offset is its exact footprint
**Decided:** `site-nav.tsx` sets the DS Nav `fixed` (the DS default is sticky) and
`align="center"` (new DS prop: links on the bar's true centre). `--nav-offset` =
`--nav-top` (1rem) + `--nav-height` (4.375rem, the closed bar at every breakpoint).
**Reason:** measured at 390px: the sticky nav took ~70px of flow *and* main added an 80px
offset (a double gap on every page but home), while sticky sub-bars stuck at 80px — 6px under
the nav's 86px edge (the legal pages' mobile picker rode over the glass). e2e/responsive now
asserts fixed position, nav bottom = main padding, and no sticky offset under the nav.

### D-038 · The hero's visual is the cobe globe, Stripe-style
**Decided:** `home/hero-globe.tsx` puts the globe right of the headline from lg up, 130% of its
column and cropped by the hero's right edge; it opens on Istanbul. The React Bits Prism, the
Sectors section's globe + SpinningText, and `ogl` are removed. Above the fold, the globe waits
for load + idle (`useDeferredDecoration`), not an in-view gate (amends D-035); under reduced
motion it loads but holds still. `globe.tsx` passes cobe the CSS width, so the buffer is
`width × min(dpr, 1.5)` — it was `2 × width × dpr`, breaking D-034.
**Reason:** revision request: the world visual on the right, as on Stripe.

### D-037 · CTAs are Magic UI's Rainbow Button
**Decided:** `vendor/magicui/rainbow-button.tsx` replaces the shimmer button everywhere. The
rainbow is the five brand text tokens as `light-dark()` pairs (`lib/spectrum.ts`, from
`@upcytech/tokens/native`); the fill is ink. The nav's CTA has no glow (`glow={false}`), so
the page's primary action stays the one loud call. A site exception to DS §3/§10 (no
gradients, no glow) and to D-029's accent rationing, like D-032.
**Reason:** revision request ("like Magic UI's curve"). Found on the way: `rounded-button`
never existed as a utility — `--radius-button` sat on `:root`, not in `@theme` — so D-032's
capsule CTAs rendered square. It now lives in `@theme`.

---

## 2026-09-17 — Full optimization pass

### D-036 · Performance budgets: LCP <2.5s, per-route JS <250kB gzip
**Decided:** budgets enforced by review (Lighthouse on tr+en home + one content page,
bundle diff per route before/after). `MAX_COPY_N`/`FAIL_ON_COPY` env gates copy drift.
**Reason:** global performance-first priority with keep-and-optimize constraint on
3D/maps/motion — budgets force lazy-gating proof instead of effect removal.

### D-035 · gsap + cobe code-split out of the home bundle
**Decided:** `TextLoop` (gsap) and `SectorGlobe` (cobe) load via `next/dynamic`
`ssr:false` in `sections/home.tsx`; both already gate on IntersectionObserver internally.
*Amended by D-038: the globe moved to the hero and gates on load + idle instead.*
**Alternatives:** removing the ribbon/globe; replacing gsap tween with rAF/CSS.
**Reason:** keep-and-optimize brief — decoration stays, but ~100KB+ of animation/GL
leaves the initial bundle for below-fold sections.

### D-034 · Particles DPR capped at 1.5
**Decided:** `vendor/magicui/particles.tsx` resolves DPR once per mount as
`min(devicePixelRatio, 1.5)`, matching the globe (`home/globe.tsx` since D-038).
**Reason:** full DPR on a 3x phone is 9x pixels for indistinguishable dots.

### D-033 · Geist headline exception + vendored italic
**Decided:** home headline stays Geist/Geist-Italic (exception to the DS three-family
rule); the variable italic is vendored at `src/app/fonts/Geist-Italic-var.woff2`
instead of a `node_modules/geist/...` traversal.
**Alternatives:** DS serif display; keeping the node_modules path.
**Reason:** founder-approved marketing exception; the traversal broke on clean installs
and under Turbopack. Re-copy from the `geist` package on upgrade.

### D-032 · Capsule buttons site-wide (reaffirmed)
**Decided:** keep `:root --radius-button: 9999px` (globals.css), recorded here as an
explicit site exception to DESIGN.md §10 (radius locked, no `full`).
**Reason:** floating nav + capsule CTA language (rainbow since D-037); inputs keep control
radius. Defined in `@theme` since D-037 — on `:root` alone the utility was never generated.
Revisit if DS gains a sanctioned pill variant (then delete override, promote usage).

### Vendor-kit + motion posture (standing)
Kept: `magicui×11, reactbits×3 (three/gsap), mapcn/map (maplibre)` as the site's
second animation vocabulary for marketing only. Rules: never in the page bundle
(`dynamic ssr:false`), never competing with LCP (idle/in-view gates,
`useDeferredDecoration`), `prefers-reduced-motion`/`saveData` respected, DPR ≤1.5,
direct dynamic rendering for the office map. `motion` consolidated on
`LazyMotion/domAnimation` (`dia-text-reveal` keeps direct
`motion` — it needs `animate/useMotionValue/useTransform` for the sweep).
`react-icons/fa6` kept for social brand accuracy (X mark has no lucide equivalent);
`optimizePackageImports` covers `lucide-react`, `react-icons`, `motion`, `@upcytech/ui`.
