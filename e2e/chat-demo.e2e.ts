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

    test("a domain selection survives a view switch", async ({ page }) => {
      const brain = await openBrain(page);
      await expect(brain).toContainText("Temsili şirket görünümü");
      await expect(brain.getByRole("button", { name: /Üretim/ }).first()).toHaveAttribute("aria-pressed", "true");

      await brain.getByRole("button", { name: /Finans/ }).first().click();
      await expect(brain).toContainText("Muhasebe & Finans");
      await expect(brain).toContainText("Tahsilat davranışındaki değişim nakit planını etkiliyor.");
      await expect(brain).toContainText("Fatura vadeleri ve gerçekleşen ödeme tarihleri");

      const layered = brain.getByRole("button", { name: "Katmanlı Şirket Beyni" });
      await layered.click();
      await expect(layered).toHaveAttribute("aria-pressed", "true");
      await expect(brain).toContainText("Finans");

      const map = brain.getByRole("button", { name: "Şirket Haritası" });
      await map.click();
      await expect(map).toHaveAttribute("aria-pressed", "true");
      await expect(brain.getByRole("button", { name: /Finans/ }).first()).toHaveAttribute("aria-pressed", "true");

      const sideways = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(sideways).toBeLessThanOrEqual(0);
    });

    test("both visual views are keyboard-operable", async ({ page }) => {
      const brain = await openBrain(page);
      const layered = brain.getByRole("button", { name: "Katmanlı Şirket Beyni" });
      await layered.focus();
      await page.keyboard.press("Enter");
      await expect(layered).toHaveAttribute("aria-pressed", "true");

      const map = brain.getByRole("button", { name: "Şirket Haritası" });
      await map.focus();
      await page.keyboard.press("Enter");
      await expect(map).toHaveAttribute("aria-pressed", "true");

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
