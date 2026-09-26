# upcytech.com decisions

App-level log. The design system's `DECISIONS.md` owns tokens/theming; this file owns
this site's exceptions and performance posture. Newest first.

Format: **decision** · alternatives · reason · date.

---

## 2026-09-26 — Visual-first product storytelling

### D-068 · One looping product tour replaces stacked explanatory product sections
**Decided:** the public site must explain Dima primarily by showing the product changing state,
not by stacking prose-heavy feature sections. The homepage and Product page therefore use one
large self-running product tour inspired by a guided in-product demo.

The canonical visual sequence is:
Google sign-in / start choice -> connect data -> form the company model -> show the live
Company Brain/home surface -> open contextual conversation -> continue continuous monitoring.
The tour loops automatically, can be paused, can be navigated directly, and respects reduced
motion. Each state keeps only a short title and caption; the application surface carries the
explanation.

The sign-in scene is explicitly representative. It may show Google sign-in and the
"own data / sample company" fork described by the product plan, but it is not a live auth CTA
and must not imply that an unapproved OAuth flow is already available. Real self-serve entry
remains gated by NEXT_PUBLIC_TRY_URL and NEXT_PUBLIC_LOGIN_URL.

Chat remains visible and fully interactive inside the tour. It is not promoted back to the
product center: it appears after the company model and home surface have already established
that Dima works continuously without waiting for a prompt.

The old homepage stack of Continuous Intelligence, Product Experience, full Company Brain,
Capability Depths and a separate visual gallery is removed from the primary narrative. Their
underlying concepts and reusable components may remain in code, but public storytelling must
not repeat the same loop in long text.

Use-case proof becomes a visual business-flow surface: select a business layer, then see
detect -> investigate -> recommend -> decision output, with the relevant data context attached.
Technical architecture becomes a moving source -> Dima layer -> output diagram rather than a
wall of architecture prose. Product concepts are shown as a single large rotating screen, not
three long figure/caption blocks.

**Reason:** a visitor should understand the first-run experience, the dashboard, contextual
conversation and the always-on behavior in seconds by watching the interface. Detailed copy
remains available in content models and deeper pages, but the primary marketing experience
must behave more like the product than a report.

## 2026-09-26 — Always-on product proof

### D-067 · Always-on product proof, actual Full Brain Form and contextual conversation
**Decided:** Dima's public product proof must make the always-on operating model visible before
it asks the visitor to understand individual features. The website therefore treats continuous
monitoring, auditing, deviation/opportunity detection, investigation, optimization and
decision preparation as one running loop rather than as isolated feature cards.

The major representative product surfaces auto-progress when motion is allowed and stop when
the visitor interacts with them. They remain explicitly labelled sample/representative data,
provide pause/resume controls where appropriate and respect reduced-motion preferences. Motion
must express product state or flow, never exist only as generic AI decoration.

D-065 is superseded on one narrow point: **Full Brain Form is now a real brain-shaped product
lens.** It uses a clean enterprise SVG outline with functional business-domain nodes,
connections, statuses and signals. It is not a fleshy anatomical illustration and it is not a
decorative image. Company Brain Map remains the second lens over the same selected state. The
old data -> relationship -> analysis -> decision layered visualization moves to the technical
architecture story, where that abstraction is accurate and useful.

Conversation is restored to the Product page as a substantial interactive surface, but it does
not become the product center. It opens inside existing company/finding/evidence context and
uses the existing scripted Dima chat experience to show streaming analysis, charts, source
query and follow-up behavior. The governing product law remains Company -> domain -> entity ->
relationship -> signal -> finding -> evidence/investigation -> decision -> action ->
outcome/memory; conversation is an optional interface into that context.

Three additional public proof surfaces are canonical:
1. **Continuous Intelligence:** horizontal data fragmentation plus historical depth, with a
   rotating monitoring feed showing deviation, risk, opportunity, recommendation and business
   impact.
2. **Use Case Lab:** executive, finance, sales, manufacturing, procurement and quality cases,
   each expressed as business problem -> detection -> investigation -> recommendation ->
   decision output.
3. **Technical Architecture:** sources -> company model -> deterministic analytics ->
   continuous monitoring -> evidence-backed investigation -> governed decision/action ->
   outcome memory.

The homepage leads with continuous intelligence, then the end-to-end product flow, Company
Brain, concrete use cases and business-depth proof. The Product page adds contextual
conversation and technical architecture. The Use Cases page includes the same concrete
scenario lab before detailed domain and sector contexts.

**Reason:** a visitor should be able to answer, without translating product jargon, what Dima
does continuously, what it notices, how it proves a cause, what decision it prepares, how the
same intelligence appears across business functions, and where conversation and the language
model fit technically.

## 2026-09-25 — Dima master-brand website refactor

### D-066 · Public product proof is Turkish-first, evidence-led and navigable
**Decided:** the Turkish customer-facing product language uses Turkish terms for the product
model and workflow. "Company Brain" is "Şirket Beyni"; "Dima Today" is "Dima Bugün";
finding/entity/evidence/investigation/action/outcome vocabulary becomes
bulgu/varlık/kanıt/araştırma/eylem/sonuç. Long dash characters are not used in public copy.
Technical abbreviations and proper nouns such as ERP, CRM, API, OEE, MES, Excel, LinkedIn and
GitHub may remain where they identify an actual system, protocol, metric or service.

Product proof must appear immediately after the home hero and as the first substantive surface
on the Product page. The representative flow is navigable and keeps one seeded sample-company
case across Şirket Beyni -> sinyal -> araştırma -> kanıt -> karar -> eylem. The numeric
authority, source records, cause candidates and approval state remain visible so the experience
demonstrates mechanism rather than a decorative dashboard.

The Brand House's general, accounting/finance and manufacturing UX inventory is represented as
three depths of the same product, not as 70 separate modules. Each depth explains what Dima
watches, what it investigates and a concrete management question.

Initial sector contexts expand to textile/dyeing, plastics/injection, machinery/metal,
automotive supply, food/beverage, chemicals, wholesale/distribution and logistics. Sector
contexts remain overlays on the same company model.

The five existing resource articles are retained and substantively rewritten for the current
Dima product. None remain draft solely because they originated in the old portfolio. Their
subjects are reframed around evidence chains, connected business events, reconciliation,
analytical numeric authority and cross-system decision context.

Temporary dashboard concepts supplied by the product owner are published only as labelled
product concepts with sample data. They are not represented as shipped product screenshots or
customer evidence and will be replaced by real product screens later.

**Reason:** a company owner should understand what Dima does, see a believable end-to-end
product flow, learn something useful from the site and find enough domain depth to imagine the
product inside their own company without confusing old brands, untranslated product jargon or
decorative mockups.

### D-065 · Company Brain is a product dashboard, not an anatomical illustration
**Decided:** remove the hand-built anatomical/oval "brain" visualization from both the hero
and the full Company Brain section. The marketing proof now uses a product-surface composition
inspired by the actual Dima application grammar: sidebar/navigation, search/topbar, live state,
Company Map, Dima Today priority signals, evidence/decision context and compact operational
metrics.

The two Brand House lenses remain one state model. "Full Brain Form" is implemented as a
layered intelligence view (data → relationships → analysis → decision), not a literal brain
silhouette. "Company Brain Map" is an entity/domain relationship surface. Selecting a domain
continues to persist across lenses.

The hero uses a compact, non-interactive version of the same product surface. It is explicitly
sample/seeded data and does not impersonate a live customer backend. The larger section keeps
the interactive domain/lens behavior.

Dark-mode Dima marks use a single `.dima-logo-mark` treatment that converts the dark-ink PNG
to a readable light mark on dark surfaces; nav, footer and product-proof surfaces all use the
same rule.

**Reason:** the Company Brain metaphor must read as a credible enterprise product and company
operating model, not as a decorative hand-drawn brain. Product proof should resemble a real
dashboard/workspace while preserving the underlying Brand House semantics. The supplied
dashboard concepts are visual-direction references only; they are not treated as screenshots
of shipped product behavior or customer data.

### D-064 · OG Turkish glyph fallback stays fully local
**Decided:** Open Graph generation must not depend on Satori's dynamic network font fallback.
Fontsource `latin` and `latin-ext` WOFF subsets are registered as distinct font-family
records (for serif, sans and mono) and used as explicit CSS fallback chains. The OG root also
declares the active locale via `lang`.

Previously both subsets were registered with the same family name and weight. Satori could
select the Latin record while treating Turkish extended glyphs such as ğ/ş/İ/ı as missing,
then attempted its dynamic external fallback during static generation. Network timeout only
produced warnings and the build still completed, but it made builds noisy and network-
dependent.

**Reason:** production/static builds should be deterministic and offline-capable for the
languages the site explicitly supports.

### D-063 · Final local typecheck regressions are closed
**Decided:** the two remaining local TypeScript failures after dependency relinking are fixed
at their source boundaries: Open Graph theme lookup uses the literal content-owned
`site.themeKey` instead of deriving `${string}.light` at runtime, and `PointList` accepts
`readonly Point[]` to match immutable content.

**Verification expectation:** after pulling this commit, `bun run test` should retain the
44/44 pass baseline; `bun run typecheck` and `bun run build` must no longer report the old
TS7053 at the OG theme lookup or TS4104 at `PointList`. Any appearance of those exact old
lines means the local checkout has not pulled the current branch head.

**Reason:** close the last two compile errors from the reported local run and make stale-head
diagnosis explicit.

### D-062 · Theme identity and immutable point lists are type-safe
**Decided:** centralize the active Dima design-system identity in `site.brandKey` /
`site.themeKey` and let the Open Graph renderer index the native theme registry with that
literal content-owned key. Do not derive a theme key from an arbitrary string at runtime and
do not hardcode the product theme inside an app route.

`PointList` accepts `readonly Point[]`, matching the project's immutable `as const`
content model. Display components do not require callers to clone immutable content just to
satisfy mutable prop types.

**Reason:** remove the final TypeScript errors reported after the V1.6 refactor while keeping
brand identity in content and preserving immutable typed copy.

### D-061 · Brand House contract is part of the default test command
**Decided:** include `tests/brand-house.test.ts` in `bun run test`. A governance test that is
not part of the default verification path is not a guardrail.

Local troubleshooting now explicitly treats unresolved `@upcytech/ui` and
`@upcytech/tokens/native` as a sibling design-system link/build problem. The documented
recovery is to build tokens in `../design-system`, reinstall/relink the website, then run
typecheck/build. Do not "fix" those errors by rewriting application imports or duplicating
design-system code into this repo.

**Reason:** keep the master-brand contract executable and prevent dependency setup failures
from being misdiagnosed as dozens of source-code defects.

### D-060 · Restore compile integrity after the V1.6 content-model refactor
**Decided:** keep the active `products[]` registry Dima-only, but restore `BrandKey` as the
design-system token union rather than treating it as an active-product union. Historical/test
content may still name an available design token without becoming an active product.

Content objects are immutable (`as const`), so shared display components accept readonly
arrays for story paragraphs, principles/beliefs and fact rows instead of forcing callers to
copy data just to satisfy mutable prop types.

The retired compliance-era `IndustryBlock`, `FrameworkTable` and `RegulationCalendar`
components are removed from the working Dima website because the active routes no longer
import them and their old `Pressure/Framework/products/provides` contract conflicts with the
new sector-context model. Do not re-expand `industries.ts` to keep dead components compiling.

Finally, `dev`, `typecheck` and `build` re-run `scripts/link-design-system.ts` before
Next/TypeScript. A missing or unbuilt sibling design-system therefore fails once with the
actual root-cause message instead of cascading into dozens of TS2307 module-resolution errors.

**Reason:** fix the compile regressions introduced by the refactor at their abstraction
boundaries rather than restoring retired portfolio architecture.

### D-059 · Product CTA and controlled-action language follow V1.6
**Decided:** the Product route uses the V1.6 CTA hierarchy: when a verified
`NEXT_PUBLIC_TRY_URL` exists, "Dima'yı deneyin" is the primary action and "Canlı demo
isteyin" remains the secondary sales-assisted path. Without a working self-serve target, the
page shows only the real live-demo action instead of pretending onboarding exists.

The decision loop now states the controlled execution contract explicitly for eligible
actions: Draft → Validate → Preview → Approve → Execute → Receipt, with human approval and
audit trail retained for high-impact finance/ERP operations. Outcome is then connected back
to the same entity/finding/decision assumption to feed memory.

This language describes the governed action architecture without claiming that Dima is an
unlimited autonomous manager today.

**Reason:** match V1.6's action/approval guardrail and CTA hierarchy while preserving its
separate rule against promising unshipped capability.

### D-058 · Public metadata and contact identities cannot leak the legacy brand
**Decided:** the Open Graph image generator uses the Dima token theme selected from
`site.name` and renders the current master-brand wordmark from the same source. It must not
hardcode the retired customer-facing company brand.

Public Dima contact identities are environment-gated until verified. The contact page may use
`NEXT_PUBLIC_CONTACT_EMAIL` to replace the transitional legal/company mailbox and
`NEXT_PUBLIC_LINKEDIN_URL` to expose an approved Dima LinkedIn. If no Dima LinkedIn URL is
configured, no old company LinkedIn is presented as a Dima social channel. The existing
UpcyTech legal name, address, MERSİS, transitional mailbox fallback and company record remain
available where legally/operationally required.

**Reason:** Brand House V1.6 moves customer-facing digital identity to Dima while explicitly
keeping UpcyTech as the legal shell. Metadata and social/contact chrome must respect the same
boundary.

### D-057 · The active product registry is Dima-only and V1.6 is test-enforced
**Decided:** reduce the active `products` registry to Dima only and narrow the active
`BrandKey` type accordingly. The retired UpcyCarbon, UpcyMan and UpcyOps records are not moved
into new Dima sub-brands and are not retained as active customer-facing product objects in the
public working repo. Their historical source remains in the frozen upstream organization
repository and archived materials.

Add a focused `tests/brand-house.test.ts` contract for the non-negotiable V1.6 facts:
Dima master brand, usedima.com domain, UpcyTech legal identity only, exact Turkish descriptor
and hero line, official trial/live-demo/login CTA labels, the official verbal rhythm, one
active Dima product, the two Company Brain lens names, the core experience law, contextual
rather than mandatory chat, and Dima Today as the brain's focus layer.

The site domain is also centralized in `site.domain`; SEO uses that value as its default
instead of maintaining a second hard-coded brand domain.

**Reason:** make branding drift a test failure rather than a future copy-review surprise.

### D-056 · Active sector content no longer carries the retired compliance portfolio
**Decided:** simplify `src/content/industries.ts` to the only data still used by the home
sector gallery: sector id/anchor/name, Dima-aligned Company Brain pack summary and imagery.
Remove the retired regulatory-pressure, UpcyCarbon/ERP product mapping, consulting deliverable
and framework catalogue from the active typed marketing model.

This is not a historical deletion decision. The old organization repository remains the
upstream archive and the relevant legacy blog posts are already kept as drafts. The Dima
working site simply stops treating retired portfolio material as active source of truth.

The home sector heading becomes "Sektör bağlamları / Sector contexts"; the link points to the
broader use-case page. The visible brand ribbon uses the V1.6 verbal rhythm exactly:
"İzler. Denetler. Fark eder. Karara taşır." The closing home CTA asks the Brand House question
"Dima şirketinizde neyi fark eder?" while retaining the real live-demo action.

**Reason:** prevent legacy compliance/product positioning from re-entering the Dima site
through reusable typed content and align the highest-frequency homepage language to V1.6.

### D-055 · Brand House V1.6 is the active website source of truth
**Decided:** V1.6 supersedes the earlier Brand House snapshot used at the start of this branch.
The customer-facing website must preserve its exact strategic hierarchy: Dima as the single
master brand; usedima.com as the digital brand address; UpcyTech only as the legal/corporate
shell; the descriptor "Şirketinizin denetim, optimizasyon ve karar merkezi."; Company Brain
as the primary visual/product model; Dima Today as its focus layer; chat as an optional
contextual conversation interface; and Full Brain Form / Company Brain Map as two lenses over
the same selected state.

The core experience law no longer makes chat a mandatory step. It is:
Company → lobe → subdomain → entity → relationship → signal → finding →
evidence/investigation → decision → action → outcome/memory. Contextual chat may be entered
from a selected finding without resetting that chain.

Self-serve CTA behavior follows both the V1.6 hierarchy and its governance rule against
unshipped promises. The code exposes separate verified env boundaries:
`NEXT_PUBLIC_TRY_URL` for "Dima'yı deneyin" and `NEXT_PUBLIC_LOGIN_URL` for "Giriş yap".
If the self-serve URL is absent, the public site does not fake an OAuth/onboarding flow; it
falls back to product exploration plus the real sales-assisted live-demo path.

The Company Brain marketing preview remains explicitly labelled representative/sample data
until it is backed by the seeded real-product demo described by V1.6. "Dima Today" is rendered
from the same lobe/finding state, not as a separate dashboard.

**Reason:** remove drift between brand strategy and implementation without overstating current
product execution.

### D-054 · Use the existing Dima mark asset consistently in chrome and metadata
**Decided:** the source snapshot contains `public/products/dima-mark.png`; the earlier
foundation pass referenced a non-existent `.webp` variant in nav/footer. Correct both chrome
references to the real PNG and use the same mark for browser icon/apple-icon metadata instead
of continuing to publish the legacy source-site favicon set.

Do not import the donor product frontend's dark-square SVG icon yet. Its visual grammar is
newer, but changing the actual brand mark needs a deliberate brand-asset decision rather than
silently replacing a working Dima asset during structural refactor.

**Reason:** fix a concrete broken-asset path now while keeping brand-asset replacement
separate from architecture work.

### D-053 · Browser regression follows Company Brain, not the retired chat demo
**Decided:** replace the homepage/product-page chat-demo browser contract with a Company Brain
contract. Browser tests now verify that selecting a lobe changes the visible finding/evidence,
switching Full Brain Form ↔ Company Brain Map preserves the selected lobe/context, controls are
keyboard-operable, both Turkish and English product surfaces carry the model, and the
interaction creates no horizontal overflow.

Responsive desktop assertions now expect the Company Brain lenses and the current "Ürün"
navigation label instead of the retired OptionWheel and "Çözümler" label. Touch target checks
continue to assert 44px minimum controls, now naturally covering the brain lens buttons.

The old scripted chat engine/unit tests remain temporarily as non-public reusable code until a
later dead-code deletion decision; they no longer define the public browser experience.

**Reason:** tests must protect the current product architecture, not force the website back
toward a chat-first or multi-product UX.

### D-052 · Remove dead portfolio copy and unverified legacy social links
**Decided:** remove the no-longer-rendered home `whatWeDo` and product-wheel copy rather than
leave the retired multi-product/services story in active typed content. Existing reusable
components stay in the codebase; only stale home content is removed.

The footer no longer links to the old company Instagram/X/Facebook accounts while the
customer-facing master brand is Dima. The social registry stays typed but empty until verified
Dima social URLs are supplied. The confirmed company LinkedIn/email remain available through
company/contact identity and are not silently rewritten.

Also restore the product-name content boundary: global metadata reads `site.name` rather than
hardcoding the product name in an app file, and JobPosting structured data uses the actual
legal company name from `site.company.legalName`.

**Reason:** avoid both invisible stale source-of-truth copy and public links that imply
unverified brand accounts, while preserving legal/company facts and repo guardrails.

### D-051 · Sign-in is environment-gated until a real product deployment is approved
**Decided:** add an optional public `NEXT_PUBLIC_APP_URL` boundary. When it is empty, the
marketing site renders no sign-in link. When an approved product application origin is
configured, the nav exposes a secondary "Giriş yap / Sign in" action pointing to that origin.

Do **not** expose Google OAuth, registration or the "own data vs demo company" fork from this
marketing repo yet. The donor product frontend contains UI for those flows, but its own API
client documents that register/forgot/OAuth backend endpoints are not yet part of the live
backend contract. A marketing CTA must not lead to a non-working flow.

**Reason:** prepare the information architecture without advertising functionality that is not
currently executable. The future self-serve onboarding can be enabled only after the product
auth contract and deployment are verified.

### D-050 · Root brand, Careers and legal site references align to Dima
**Decided:** the locale root now renders the Dima design-system brand scope and uses Dima in
the global metadata title template. Careers is rewritten around the actual single-product
work — decision intelligence, Company Brain, semantic/data/AI/platform engineering — rather
than the retired ERP/carbon/trade portfolio.

Legal ownership is **not** renamed: UpcyTech Teknoloji A.Ş. remains the data controller and
legal operator, and the existing confirmed company email/address/MERSİS details remain.
Only site-facing facts that became inaccurate are updated: usedima.com replaces upcytech.com
as the website domain, the terms identify Dima as the operated site, and the obsolete list of
legacy product domains is removed from the external-links clause. Legal texts remain subject
to counsel review as already stated in the file.

**Reason:** customer-facing brand and discoverability must be internally consistent without
falsifying or prematurely changing the legal entity.

### D-049 · Legacy product/service URLs redirect permanently and leave discovery surfaces
**Decided:** keep the existing localized `/products` and `/services` route files so old
bookmarks and external links do not break, but make both routes issue a permanent redirect to
the canonical Product route (`/solutions`, localized through `getPathname`).

The legacy routes are removed from the sitemap and OG-entry generator. The canonical Product
route is explicitly present in the sitemap. Route definitions stay in next-intl routing only
for backwards-compatible URL resolution; they are no longer independent discoverable
marketing surfaces.

**Reason:** one customer-facing product should have one canonical product story. Compatibility
routes must not create parallel indexable remnants of the old portfolio.

### D-048 · Resources publish Dima-relevant knowledge; legacy portfolio posts stay archived
**Decided:** keep the existing MDX blog engine and post URLs, but change the public surface to
"Resources / Kaynaklar" and apply the Brand House content standard: every published item must
teach a real mechanism, explain a business problem, or show a product behavior with enough
context to be useful.

Two existing posts remain public after substantive revision:
- the month-end reconciliation article now explains cross-system entity/relationship breaks
  and how Dima investigates them without pretending every source system must be replaced;
- the old chat-centric analytics article now explains proactive findings, analytical numeric
  authority, investigation context, contextual chat and evidence.

CBAM/UpcyCarbon evidence-chain and UpcyOps trade-document posts are not deleted. Their source
files stay in the repository but are marked `draft: true`, removing them from public lists,
sitemaps and related-post surfaces until a separate UpcyTech archive strategy is decided.

Resource categories and page copy now align to data/decisions, manufacturing/operations,
evidence/governance and company/product topics. No newsletter signup is promised before one
exists.

**Reason:** preserve valuable historical content without letting retired product narratives
re-fragment the Dima master brand.

### D-047 · About and Contact become Dima-facing while legal identity stays UpcyTech
**Decided:** preserve the existing About/Contact route structure, team records, office map,
form validation, anti-spam controls and legal-registration section. Replace the old
multi-product/agency narrative with the single-product Dima story and decision-problem-led
contact flow.

The About page now explains the fragmented-context problem, Company Brain product model,
evidence/numeric-authority principles, "simplify without emptying" content rule and the legal
relationship: Dima is the customer-facing product/brand; UpcyTech Teknoloji A.Ş. is the legal
entity developing it.

The contact form retains its stable internal topic enum during migration so old deep links and
the server schema do not break, but visible topic labels now map to live demo, data connection,
pilot/use case, accounting/finance, manufacturing/sector pack and careers. The server-side
same-origin fallback and enquiry subject move from upcytech.com to usedima.com. Existing real
contact channels stay unchanged until corresponding usedima.com mail/social endpoints are
actually configured.

**Reason:** remove customer-facing legacy positioning without breaking the working form or
inventing infrastructure that has not been configured.

### D-046 · /industries becomes use cases: domain intelligence + sector packs
**Decided:** keep the localized `/industries` route for URL continuity, but change its public
meaning to "Use cases / Kullanım alanları". The old regulatory-pressure calendar, compliance
framework table and product mapping no longer render on this route.

The new page separates two concepts that must not be confused:
1. **Domain intelligence** — accounting/finance and manufacturing are depths of the same
   Company Brain, with domain-specific entities, relationships and intelligence behaviors.
2. **Sector intelligence packs** — textile, plastics and general manufacturing overlay the
   shared production brain with sector-specific entity networks and process vocabulary.

The page deliberately summarizes the large UX inventory into clusters and representative
intelligence behaviors instead of presenting 20 finance and 30 manufacturing items as separate
modules. Existing sector image/gallery content remains available on the home page, but its
summaries are updated to the new pack model; legacy regulation data stays non-rendered until
a later content/archive decision.

**Reason:** preserve the single-brain product law while still showing enough domain depth for
a buyer to understand how the product applies to real finance and manufacturing work.

### D-045 · /solutions becomes the single-product Dima explanation, not a portfolio router
**Decided:** keep the existing localized `/solutions` route for continuity, but change its
public meaning to the product page behind the nav label "Product / Ürün". The old category
jumper, problem matcher, sustainability section, multi-product matrix, service catalogue and
chat-first demo no longer render on this route.

The refactor reuses `PageHero`, `CompanyBrainExperience`, `ProductBlock`,
`WorkflowFlow`, `PointList`, `CtaBand` and the existing breadcrumb/metadata utilities.
`ProductBlock` gains two narrow controls — an optional action override and `showScreens` —
so the current chat-era screenshots can be suppressed without forking or replacing the
component.

The page now explains, in order: the Company Brain model; the concrete product problem and
capabilities; how a finding moves from connected data through monitoring, investigation,
evidence and decision to governed action/outcome memory; and what makes a finding trustworthy.
Content is explanatory rather than slogan-led and does not claim unlimited autonomy.

**Reason:** the master brand now has one product. A portfolio chooser on the primary product
route would contradict both the Brand House and the website's new navigation.

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
