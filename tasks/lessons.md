# Lessons

- **Dev-server screenshots: use `localhost`, never `127.0.0.1`.** Next 16 blocks dev resources
  (HMR, client chunks) from origins other than localhost, so a page loaded via 127.0.0.1 never
  hydrates: WebGL decorations, demos and anything client-side silently stay empty. The
  production server (`next start`, e2e on :3010) is not affected.
- **Measuring "the page did not scroll" in Playwright: click through the DOM.** `locator.click()`
  scrolls the target into view as part of its actionability checks (with `scroll-behavior:
  smooth` it even animates), so a scrollY diff around it measures Playwright, not the page. Use
  `locator.evaluate(el => el.click())` for that one assertion — and isolate before "fixing" the
  app (a speculative `overflow-anchor: none` was added and reverted here).
- **Re-shoot visuals after "performance" edits to render loops.** Skipping cobe redraws when the
  angle is unchanged left a still globe blank: cobe loads its map texture asynchronously and does
  not redraw when it lands. Only a screenshot caught it — typecheck and e2e cannot see WebGL
  pixels. Any change to when a canvas draws gets a before/after screenshot in both motion modes.
- **Review findings that claim "X does nothing" deserve a screenshot, not trust in the class
  list.** `className="rounded-button"` on the DS Button looked right in code but lost to
  `rounded-control` (the DS tailwind-merge does not know site-only tokens); the capsule only
  appears with `rounded-button!`.
- **A responsive sweep that only measures boxes misses squeezed text.** The loop ribbons passed
  every overflow/target check while React Bits' `textLength` + `lengthAdjust="spacing"` crushed
  a ~2980-unit line into a ~1850-unit path (62%: overlapping letters, no word spaces), and
  `toUpperCase()` turned Turkish i into I. For decorative text, compare the natural width
  (`getComputedTextLength`) with the space it is given, and read it on a screenshot.
- **Screenshot tooling can fabricate bugs.** Pinning the nav with `nav[aria-label]{position:
  absolute}` also caught every other `<nav aria-label>` (sub-navs, filters, legal sidebar), and
  reviewers reported them as overlapping content; full-page captures also flatten sticky
  columns and leave a band under bleeding footers. Scope injected CSS to the one element, and
  confirm every "high" visual finding against a normal viewport capture before fixing.
- **Flex containers eat edge whitespace.** Turning a text link into `inline-flex` (for a 44px
  touch target) dropped the space before its arrow; give such links a `gap`.
- **A flaky e2e is a question, not noise.** The Stop test "flaked" because every token
  re-rendered every turn; memoising finished turns halved the suite's runtime. Reproduce with
  `--repeat-each` under `--workers` before loosening a timeout.
- **"Like the PoC" means the PoC's markup, not an impression of it.** The first demo was built
  from a description and read as a different product; the rebuild started from the PoC's own
  classes (shell, surfaces, composer, result card) and its real screens came from running the
  PoC itself — its chat store could be seeded, so no model key was needed. Look for a way to run
  the reference before imitating it.
- **Default layouts belong in CSS.** A `useState(true)` "wide" flag rendered the sidebar inline
  in the server HTML on phones until hydration (caught by the 320px e2e). Container queries give
  the right first paint; JS only for what the user toggles.
