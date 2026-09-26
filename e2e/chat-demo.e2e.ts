import { expect, test, type Page } from "@playwright/test";

async function openTour(page: Page, path = "/tr") {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  const tour = page.locator('section[aria-labelledby="visual-product-tour-title"]').first();
  await tour.scrollIntoViewIfNeeded();
  await expect(tour).toBeVisible();
  return tour;
}

for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 800 }]) {
  test.describe(`visual product tour at ${viewport.width}px`, () => {
    test.use({ viewport });

    test("setup, dashboard and continuous-monitoring states are directly navigable", async ({ page }) => {
      const tour = await openTour(page);
      const setup = tour.getByRole("tab", { name: /Kurulum/ });
      await expect(setup).toHaveAttribute("aria-selected", "true");

      const dashboard = tour.getByRole("tab", { name: /Ana ekran/ });
      await dashboard.click();
      await expect(dashboard).toHaveAttribute("aria-selected", "true");
      await expect(tour).toContainText("Şirket Beyni hazır");

      const watch = tour.getByRole("tab", { name: /Sürekli denetim/ });
      await watch.click();
      await expect(watch).toHaveAttribute("aria-selected", "true");
      await expect(tour).toContainText("7/24 denetim aktif");
      await expect(tour).toContainText("Hat 3 performansı hedefin %11 altında");

      const sideways = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(sideways).toBeLessThanOrEqual(0);
    });

    test("the conversation is a real interactive stage, not the page center", async ({ page }) => {
      const tour = await openTour(page, "/tr/cozumler");
      const chatTab = tour.getByRole("tab", { name: /Dima'ya sor/ });
      await chatTab.click();
      await expect(chatTab).toHaveAttribute("aria-selected", "true");

      const demo = tour.locator("[data-chat-demo]");
      await expect(demo).toBeVisible();
      await demo.getByRole("button", { name: "Makine bazında ortalama OEE nedir?" }).click();
      await expect.poll(async () => await demo.getAttribute("data-state"), { timeout: 10_000 }).not.toBe("idle");
      await expect(demo).toContainText("Ram 2");
    });
  });
}

test("the English product route carries the same six-stage visual story", async ({ page }) => {
  const tour = await openTour(page, "/en/solutions");
  await expect(tour.getByRole("tab")).toHaveCount(6);
  await tour.getByRole("tab", { name: /Continuous watch/ }).click();
  await expect(tour).toContainText("Always-on monitoring active");
  await expect(tour).toContainText("Line 3 performance is 11% below target");
});
