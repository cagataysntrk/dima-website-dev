import { expect, test } from "@playwright/test";

/**
 * AGENTS.md: per-route JS under 250 kB gzip. Next 16's build no longer prints route sizes, so
 * this measures the first-load JS: every script the server's HTML references, at its size over
 * the wire (`next start` compresses). Decoration fetched later through dynamic imports — the
 * hero globe after idle, WebGL behind in-view gates — is by design outside the budget, and
 * outside this count however quickly it happens to arrive.
 */
const BUDGET = 250 * 1024;

for (const route of ["/tr", "/tr/cozumler"]) {
  test(`${route} first-load JS stays under the budget`, async ({ page, request }) => {
    const html = await (await request.get(route)).text();
    const initial = new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => new URL(m[1]!, "http://x").pathname));
    expect(initial.size).toBeGreaterThan(0);

    await page.goto(route, { waitUntil: "load" });
    const scripts = await page.evaluate(() =>
      performance.getEntriesByType("resource")
        .filter((e) => (e as PerformanceResourceTiming).initiatorType === "script")
        .map((e) => ({ path: new URL(e.name).pathname, size: (e as PerformanceResourceTiming).transferSize })));
    const counted = scripts.filter((s) => initial.has(s.path));
    const total = counted.reduce((sum, s) => sum + s.size, 0);
    console.log(`${route}: ${(total / 1024).toFixed(1)} kB first-load JS over the wire (${counted.length} files)`);
    expect(total).toBeLessThan(BUDGET);
  });
}
