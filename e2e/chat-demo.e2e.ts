import { expect, test, type Page } from "@playwright/test";

async function openBrain(page: Page, path = "/tr") {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  const brain = page.locator('section[aria-labelledby="company-brain-title"]').first();
  await brain.scrollIntoViewIfNeeded();
  await expect(brain).toBeVisible();
  return brain;
}

for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 800 }]) {
  test.describe(`Şirket Beyni at ${viewport.width}px`, () => {
    test.use({ viewport });

    test("a selected domain survives switching between the full brain and company map", async ({ page }) => {
      const brain = await openBrain(page);
      await expect(brain).toContainText("Temsili şirket görünümü");

      await brain.getByRole("button", { name: /Finans/ }).first().click();
      await expect(brain).toContainText("Muhasebe ve Finans");
      await expect(brain).toContainText("Tahsilat davranışındaki değişim nakit planını etkiliyor.");
      await expect(brain).toContainText("Fatura vadeleri ve gerçekleşen ödeme tarihleri");

      const fullBrain = brain.getByRole("button", { name: "Tam Beyin Formu" });
      await expect(fullBrain).toHaveAttribute("aria-pressed", "true");

      const map = brain.getByRole("button", { name: "Şirket Haritası" });
      await map.click();
      await expect(map).toHaveAttribute("aria-pressed", "true");
      await expect(brain.getByRole("button", { name: /Finans/ }).first()).toHaveAttribute("aria-pressed", "true");

      await fullBrain.click();
      await expect(fullBrain).toHaveAttribute("aria-pressed", "true");
      await expect(brain.getByRole("button", { name: /Finans/ }).first()).toHaveAttribute("aria-pressed", "true");

      const sideways = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(sideways).toBeLessThanOrEqual(0);
    });

    test("both brain views are keyboard-operable", async ({ page }) => {
      const brain = await openBrain(page);
      await brain.getByRole("button", { name: /Finans/ }).first().click();

      const map = brain.getByRole("button", { name: "Şirket Haritası" });
      await map.focus();
      await page.keyboard.press("Enter");
      await expect(map).toHaveAttribute("aria-pressed", "true");

      const fullBrain = brain.getByRole("button", { name: "Tam Beyin Formu" });
      await fullBrain.focus();
      await page.keyboard.press("Enter");
      await expect(fullBrain).toHaveAttribute("aria-pressed", "true");

      const quality = brain.getByRole("button", { name: /Kalite/ }).first();
      await quality.focus();
      await page.keyboard.press("Enter");
      await expect(quality).toHaveAttribute("aria-pressed", "true");
      await expect(brain).toContainText("Kalite");
    });
  });
}

test("the product page carries the same Company Brain model in English", async ({ page }) => {
  const brain = await openBrain(page, "/en/solutions");
  await expect(brain).toContainText("Representative company view");
  await brain.getByRole("button", { name: /Finance/ }).first().click();
  await expect(brain).toContainText("Accounting & Finance");
  await expect(brain).toContainText("A change in collection behavior is affecting the cash plan.");
});

test("contextual chat remains secondary but fully interactive on the Product page", async ({ page }) => {
  await page.goto("/tr/cozumler", { waitUntil: "domcontentloaded" });
  const section = page.locator('section[aria-labelledby="contextual-chat-title"]');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toContainText("Sohbet var.");

  const demo = section.locator("[data-chat-demo]");
  await expect(demo).toBeVisible();
  await expect(demo).toHaveAttribute("data-state", "idle");

  await demo.getByRole("button", { name: "Makine bazında ortalama OEE nedir?" }).click();
  await expect.poll(async () => await demo.getAttribute("data-state"), { timeout: 10_000 }).not.toBe("idle");
  await expect(demo).toContainText("Ram 2");
});
