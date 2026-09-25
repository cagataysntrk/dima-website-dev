import { expect, test, type Page } from "@playwright/test";

/** The config runs with reduced motion, so every answer arrives whole and at once. */
async function openDemo(page: Page, path = "/tr") {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  const demo = page.locator("[data-chat-demo]").first();
  await demo.scrollIntoViewIfNeeded();
  await expect(demo).toHaveAttribute("data-ready", "true", { timeout: 30_000 });
  await expect(demo).toHaveAttribute("data-state", "idle");
  return demo;
}

for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 800 }]) {
  test.describe(`chat demo at ${viewport.width}px`, () => {
    test.use({ viewport });

    test("a starter plays through to a sourced result and a follow-up", async ({ page }) => {
      const demo = await openDemo(page);
      const scrollBefore = await page.evaluate(() => scrollY);
      // A DOM click, not Playwright's: its actionability step scrolls the page itself.
      await demo.getByRole("button", { name: "Makine bazında ortalama OEE nedir?" }).evaluate((el: HTMLElement) => el.click());
      await expect(demo).toHaveAttribute("data-state", "done");
      // The answer streams inside the panel; the page itself does not move.
      expect(Math.abs((await page.evaluate(() => scrollY)) - scrollBefore)).toBeLessThan(2);

      // The product's result card: chart first, its table one toggle away; the query below it.
      const result = demo.locator("[data-chat-result]");
      await expect(result.getByRole("img", { name: "Ortalama OEE, son 90 gün" })).toBeVisible();
      await result.getByRole("button", { name: "tablo" }).click();
      await expect(result.getByRole("table")).toBeVisible();
      await expect(result.getByRole("row")).toHaveCount(7);
      await demo.getByRole("button", { name: "Sorguyu göster" }).click();
      await expect(demo.locator("code")).toContainText("FROM oee_gunluk");

      await demo.getByRole("button", { name: "Hangi makinede en çok duruş var ve neden?" }).click();
      await expect(demo.locator("[data-chat-result]")).toHaveCount(2);
      await expect(page.locator("html")).toHaveJSProperty("scrollWidth", await page.evaluate(() => innerWidth));
    });

    test("free text routes by keyword or falls back, and a new chat starts over", async ({ page }) => {
      const demo = await openDemo(page);
      const input = demo.getByRole("textbox", { name: "Sorunuz" });
      await input.fill("hava durumu nasıl");
      await input.press("Enter");
      await expect(demo).toHaveAttribute("data-state", "done");
      await expect(demo).toContainText("Bu demo, örnek veri setinde yalnızca");
      await expect(demo.locator("[data-chat-result]")).toHaveCount(0);

      await demo.getByRole("textbox", { name: "Sorunuz" }).fill("aylık üretim trendi");
      await demo.getByRole("button", { name: "Gönder" }).click();
      await expect(demo.locator("[data-chat-result]")).toHaveCount(1);

      // "New chat" lives in the sidebar, as in the product: inline in a wide panel, a drawer in a narrow one.
      const newChat = demo.getByRole("button", { name: "Yeni sohbet" });
      if (!(await newChat.isVisible())) await demo.getByRole("button", { name: "Kenar çubuğu" }).click();
      await newChat.click();
      await expect(demo).toHaveAttribute("data-state", "idle");
      await expect(demo.getByRole("textbox", { name: "Sorunuz" })).toBeFocused();
    });
  });
}

test("the solutions page carries the same demo, in English", async ({ page }) => {
  const demo = await openDemo(page, "/en/solutions");
  await demo.getByRole("button", { name: "Who were our top 5 customers by revenue last year?" }).click();
  // As in the product, the card carries no caption; it is the chart's accessible name.
  await expect(demo.locator("[data-chat-result]").getByRole("img", { name: "2025 revenue, top 5 customers" })).toBeVisible();
});

test.describe("with motion", () => {
  test.use({ reducedMotion: "no-preference", viewport: { width: 1280, height: 800 } });

  test("Stop halts a streaming answer, and the next question plays at once", async ({ page }) => {
    // With motion the answer really streams (~3.5s scripted); parallel workers rendering the
    // page's WebGL in software can double that, so the waits allow for it.
    test.setTimeout(90_000);
    const demo = await openDemo(page);
    await demo.getByRole("button", { name: "Aylık üretim nasıl bir trend izliyor?" }).click();
    await expect(demo).toHaveAttribute("data-state", "running");
    await demo.getByRole("button", { name: "Durdur" }).click();
    await expect(demo).toContainText("Durduruldu.");
    await expect(demo.locator("[data-chat-result]")).toHaveCount(0);

    const input = demo.getByRole("textbox", { name: "Sorunuz" });
    await input.fill("OEE nedir");
    await input.press("Enter");
    await expect(demo).toHaveAttribute("data-state", "running");
    await expect(demo.locator("[data-chat-result]")).toHaveCount(1, { timeout: 45_000 });
  });
});
