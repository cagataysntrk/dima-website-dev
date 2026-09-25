import { expect, test, type Page } from "@playwright/test";

const routes = ["/tr", "/tr/cozumler", "/tr/sektorler", "/tr/iletisim", "/tr/blog", "/tr/yasal/kvkk"];

/** Every page, both languages — the shell contract below holds on all of them. */
const allRoutes = [
  "/tr", "/tr/cozumler", "/tr/sektorler", "/tr/hakkimizda", "/tr/iletisim", "/tr/kariyer", "/tr/blog",
  "/tr/yasal/kvkk", "/tr/yasal/cerez-politikasi", "/tr/yasal/kullanim-kosullari",
  "/en", "/en/solutions", "/en/industries", "/en/about", "/en/contact", "/en/careers", "/en/blog",
  "/en/legal/kvkk", "/en/legal/cookie-policy", "/en/legal/terms-of-use",
];

/**
 * D-039: the nav is fixed, its footprint is exactly --nav-offset (main's top padding), and
 * nothing sticks underneath it — every sticky layer's offset clears the nav's bottom edge.
 */
async function assertShell(page: Page, route: string) {
  const report = await page.evaluate(() => {
    const nav = document.querySelector("nav[aria-label]")!;
    const navRect = nav.getBoundingClientRect();
    const main = document.querySelector("main")!;
    const stickies = [...document.querySelectorAll("main *")]
      .map((el) => ({ el, cs: getComputedStyle(el) }))
      .filter(({ cs }) => cs.position === "sticky" && cs.top !== "auto")
      .map(({ el, cs }) => ({ what: `${el.tagName}.${String(el.className).slice(0, 48)}`, top: parseFloat(cs.top) }));
    return {
      position: getComputedStyle(nav).position,
      navBottom: navRect.bottom,
      mainPad: parseFloat(getComputedStyle(main).paddingTop),
      stuckUnder: stickies.filter((s) => s.top < navRect.bottom - 1),
      sideways: document.documentElement.scrollWidth - innerWidth,
    };
  });
  expect(report.position, route).toBe("fixed");
  expect(Math.abs(report.navBottom - report.mainPad), `${route}: nav bottom ${report.navBottom} vs main padding ${report.mainPad}`).toBeLessThan(1);
  expect(report.stuckUnder, `${route}: sticky layers under the nav`).toEqual([]);
  expect(report.sideways, `${route}: page scrolls sideways`).toBeLessThanOrEqual(0);
}

async function assertNoViewportOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const viewport = window.innerWidth;
    const candidates = [...document.querySelectorAll("main h1, main h2, main h3, main p, main a, main button, main input, main select, main textarea")];
    return candidates
      .filter((element) => !element.closest("[aria-hidden='true']"))
      .map((element) => ({ text: (element.textContent ?? "").trim().slice(0, 80), rect: element.getBoundingClientRect().toJSON() }))
      .filter(({ rect }) => rect.width > 0 && (rect.left < -1 || rect.right > viewport + 1));
  });
  expect(overflow, JSON.stringify(overflow)).toEqual([]);
}

test.describe("responsive page contract", () => {
  test("active routes stay inside a 320px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("h1")).toBeVisible();
      await assertNoViewportOverflow(page);
    }
  });

  for (const width of [390, 1280]) {
    test(`fixed nav, exact offset, nothing under it, no sideways scroll at ${width}px`, async ({ page }) => {
      test.setTimeout(120_000);
      await page.setViewportSize({ width, height: 844 });
      for (const route of allRoutes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await expect(page.locator("h1")).toBeVisible();
        await assertShell(page, route);
      }
    });
  }

  test("the open mobile menu stays inside the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/tr/yasal/kvkk", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Menüyü aç" }).click();
    const nav = await page.getByRole("navigation", { name: "Ana menü" }).boundingBox();
    expect(nav!.x).toBeGreaterThanOrEqual(0);
    expect(nav!.x + nav!.width).toBeLessThanOrEqual(390);
    expect(nav!.y + nav!.height).toBeLessThanOrEqual(844);
  });

  test("desktop links sit centred on the bar", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tr", { waitUntil: "domcontentloaded" });
    const nav = await page.getByRole("navigation", { name: "Ana menü" }).boundingBox();
    const links = await page.getByRole("navigation", { name: "Ana menü" }).getByRole("list").first().boundingBox();
    expect(Math.abs((links!.x + links!.width / 2) - (nav!.x + nav!.width / 2))).toBeLessThan(2);
  });

  test("tablet navigation collapses and the menu remains reachable", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/tr", { waitUntil: "domcontentloaded" });
    const menu = page.getByRole("navigation", { name: "Ana menü" }).getByRole("button", { name: "Menüyü aç" });
    await expect(menu).toBeVisible();
    // A click before hydration lands on inert server HTML; retry until the menu answers.
    await expect(async () => {
      if (await menu.isVisible()) await menu.click();
      await expect(page.getByRole("button", { name: "Menüyü kapat" })).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout: 15_000 });
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Menüyü aç" })).toBeFocused();
  });

  test.describe("touch surfaces", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });

    test("touch fields and compact product controls meet the mobile contract", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto("/en/contact", { waitUntil: "domcontentloaded" });
      const field = page.locator("input[name='name']");
      await expect(field).toBeVisible();
      await page.waitForTimeout(500);
      const fieldFont = await field.evaluate((element) => getComputedStyle(element).fontSize);
      expect(fieldFont).toBe("16px");
      await page.goto("/tr", { waitUntil: "domcontentloaded" });
      await expect(page.locator("button[aria-pressed]").first()).toBeVisible();
      const targetHeights = await page.locator("button[aria-pressed]").evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().height));
      expect(targetHeights.every((height) => height >= 44)).toBe(true);
    });
  });

  test("desktop keeps the wheel and full navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tr", { waitUntil: "domcontentloaded" });
    await expect(page.locator("[role='listbox']")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("navigation", { name: "Ana menü" }).getByRole("link", { name: "Çözümler", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Menüyü aç" })).toBeHidden();
  });

  test("dark theme keeps the mobile shell inside the viewport", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("upcy-theme", "dark"));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/contact", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await assertNoViewportOverflow(page);
  });
});

test("an unknown address under a locale gets the site's own 404, inside the layout", async ({ page }) => {
  const response = await page.goto("/tr/yok-boyle-sayfa", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("navigation", { name: "Ana menü" })).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
});
