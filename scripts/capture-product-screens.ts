/**
 * Captures the analytics product's showcase screens (public/products/dima-{desktop,mobile}.webp)
 * from the REAL product — the Dima PoC (Upcy/dima/frontend/apps/metabase-poc) — in dark mode
 * (D-041). Its chat keeps finished conversations in localStorage, so a signed-in demo user plus
 * a seeded conversation renders the real screen with no model key and no Metabase: only the
 * auth Postgres is needed. The conversation carries the site demo's OEE answer (content/
 * dima-demo.ts), so the photo and the working demo tell the same story.
 *
 *   # in Upcy/dima/frontend/apps/metabase-poc
 *   docker compose -f infra/docker-compose.yml up -d dima-pg
 *   bun --env-file=<env> scripts/migrate.ts && bun --env-file=<env> scripts/seed-users.ts
 *   (set -a; . <env>; set +a; next dev -p 3002)   # env: DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL
 *   # here
 *   bun run capture:screens                      # DIMA_POC_URL overrides http://localhost:3002
 *
 * Desktop 1280×747 at 1.25 (→ 1600×934); phone 360×779 at 3 (→ 1080×2337), where the result
 * card shows the PoC's own table view (six bar labels crowd a phone-width chart). The dev
 * server's indicator and the transient "jump to bottom" button are hidden.
 */
import path from "node:path";
import { chromium, type BrowserContextOptions, type Page } from "@playwright/test";
import sharp from "sharp";

const POC = process.env.DIMA_POC_URL ?? "http://localhost:3002";

const now = Date.UTC(2026, 8, 24, 9, 30);
const done = (id: number, question: string, answer: string, sql: string, columns: string[], rows: Record<string, unknown>[], steps: string[], durationMs: number, suggestions: string[]) =>
  ({ id, question, status: "done", reply: { answer, sql, result: { columns, rows, row_count: rows.length } }, steps, durationMs, suggestions });

function conversations(orgId: string) {
  const oee = done(1, "Makine bazında ortalama OEE nedir?",
    "Son 90 günün ortalama OEE'si **%69,2**. En yüksek **Ram 1 (%78,4)**, en düşük **Ram 2 (%58,7)**.\n\n- Ram 2'nin düşük OEE'si büyük ölçüde **kullanılabilirlik** kaybından geliyor; en çok plansız duruş da bu makinede.\n- Ram 1 ile Ram 2 arasındaki **19,7 puanlık** fark, aynı tip iki makine arasında.",
    "SELECT m.makine_adi,\n       ROUND(AVG(o.kullanilabilirlik * o.performans * o.kalite) * 100, 1) AS oee_yuzde\nFROM oee_gunluk o\nJOIN makineler m ON m.id = o.makine_id\nWHERE o.tarih >= CURRENT_DATE - INTERVAL '90 days'\nGROUP BY m.makine_adi\nORDER BY oee_yuzde DESC;",
    ["makine_adi", "oee_yuzde"],
    [["Ram 1", 78.4], ["Jet Boya 1", 74.1], ["Kurutma 1", 71.6], ["Şardon", 69.8], ["Jet Boya 3", 62.3], ["Ram 2", 58.7]].map(([a, b]) => ({ makine_adi: a, oee_yuzde: b })),
    ["Veri şeması okundu · 14 tablo", "Sorgu yazıldı", "Sorgu çalıştı · 6 satır"], 3400,
    ["Hangi makinede en çok duruş var ve neden?", "Geçen yıl en yüksek cirolu 5 müşteri kim?"]);
  const prod = done(1, "Aylık üretim nasıl bir trend izliyor?",
    "Aylık üretim **Mart–Haziran 2026** arasında zirve yaptı; en yüksek ay **Mayıs: 468 ton**.",
    "SELECT DATE_TRUNC('month', u.uretim_tarihi) AS ay, ROUND(SUM(u.net_kg) / 1000) AS ton\nFROM uretim_kayitlari u\nGROUP BY ay\nORDER BY ay;",
    ["ay", "ton"], [["2026-03", 447], ["2026-04", 452], ["2026-05", 468]].map(([a, b]) => ({ ay: a, ton: b })),
    ["Veri şeması okundu · 14 tablo", "Sorgu yazıldı", "Sorgu çalıştı · 3 satır"], 2900, []);
  const cust = done(1, "Geçen yıl en yüksek cirolu 5 müşteri kim?",
    "2025'te en yüksek ciroyu **Örnek Tekstil A.Ş.** getirdi: **48,6 mn ₺**.",
    "SELECT m.musteri_adi, ROUND(SUM(f.tutar) / 1e6, 1) AS ciro_mn_tl\nFROM faturalar f JOIN musteriler m ON m.id = f.musteri_id\nGROUP BY m.musteri_adi ORDER BY ciro_mn_tl DESC LIMIT 5;",
    ["musteri_adi", "ciro_mn_tl"], [["Örnek Tekstil A.Ş.", 48.6]].map(([a, b]) => ({ musteri_adi: a, ciro_mn_tl: b })),
    ["Veri şeması okundu · 14 tablo", "Sorgu yazıldı", "Sorgu çalıştı · 5 satır"], 2600, []);
  const conv = (id: string, title: string, entry: unknown, t: number) => ({ id, orgId, title, createdAt: t, updatedAt: t, entries: [entry] });
  return [
    conv("c-oee", "Makine bazında ortalama OEE", oee, now),
    conv("c-uretim", "Aylık üretim trendi", prod, now - 3_600_000),
    conv("c-ciro", "En yüksek cirolu müşteriler", cust, now - 86_400_000),
  ];
}

async function signInAndSeed(page: Page, theme: "dark" | "light") {
  await page.goto(`${POC}/login`, { waitUntil: "networkidle" });
  await page.locator("input[type=email], input[name=email]").first().fill("ayse@boyahane.demo");
  await page.locator("input[type=password]").first().fill("DimaDemo!2026");
  await page.locator("button[type=submit]").first().click();
  await page.waitForURL(/\/app/, { timeout: 60_000 });
  const orgId = await page.evaluate(async () => {
    const orgs = await (await fetch("/api/auth/organization/list")).json();
    const org = orgs.find((o: { slug: string }) => o.slug === "boyahane");
    await fetch("/api/auth/organization/set-active", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ organizationId: org.id }) });
    return org.id as string;
  });
  await page.evaluate(({ convs, theme }) => {
    localStorage.setItem("dima-poc-conversations", JSON.stringify({ state: { conversations: convs }, version: 1 }));
    localStorage.setItem("theme", theme);
  }, { convs: conversations(orgId), theme });
  return orgId;
}

const SHOTS: { file: string; width: number; height: number; context: BrowserContextOptions }[] = [
  { file: "dima-desktop.webp", width: 1600, height: 934, context: { viewport: { width: 1280, height: 747 }, deviceScaleFactor: 1.25 } },
  { file: "dima-mobile.webp", width: 1080, height: 2337, context: { viewport: { width: 360, height: 779 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } },
];
const OUT = path.resolve(import.meta.dir, "../public/products");
const b = await chromium.launch();
for (const s of SHOTS) {
  const ctx = await b.newContext({ ...s.context, colorScheme: "dark", reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await signInAndSeed(p, "dark");
  await p.goto(`${POC}/app/chat?c=c-oee`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  // The dev server's own indicator is not part of the product.
  // …nor is the transient "jump to bottom" button that appears once the thread is scrolled up.
  await p.addStyleTag({ content: "nextjs-portal{display:none!important} button[aria-label='En alta git']{display:none!important}" });
  // A phone's width crowds six bar labels together; the PoC's own table view reads cleanly there.
  if ((s.context.viewport?.width ?? 0) < 640) { await p.getByRole("radio", { name: "tablo" }).first().click().catch(async () => { await p.getByText("tablo", { exact: true }).first().click(); }); await p.waitForTimeout(400); }
  // Thread back to its start: the question, the answer and the chart in frame.
  await p.evaluate(() => { for (const el of document.querySelectorAll("main *, [data-slot=sidebar-inset] *")) { const e = el as HTMLElement; if (e.scrollHeight > e.clientHeight + 20 && getComputedStyle(e).overflowY === "auto") e.scrollTop = 0; } });
  await p.waitForTimeout(600);
  const png = await p.screenshot({ type: "png" });
  await sharp(png).resize(s.width, s.height, { fit: "cover", position: "top" }).webp({ quality: 85 }).toFile(path.join(OUT, s.file));
  console.log(`${s.file}  ${s.width}×${s.height}`);
  await ctx.close();
}
await b.close();
