import { expect, test } from "bun:test";
import { companyBrain } from "@/content/company-brain";
import { capabilityDepths } from "@/content/capability-depths";
import { productExperience } from "@/content/product-experience";
import { industriesPage } from "@/content/pages/industries";
import { homePage } from "@/content/pages/home";
import { products } from "@/content/products";
import { site } from "@/content/site";

test("Brand House V1.6 master-brand contract stays fixed", () => {
  expect(site.name).toBe("Dima");
  expect(site.brandKey).toBe("dima");
  expect(site.themeKey).toBe("dima.light");
  expect(site.domain).toBe("https://usedima.com");
  expect(site.company.legalName.tr).toBe("UpcyTech Teknoloji A.Ş.");

  const customerChrome = [
    ...site.nav.flatMap((item) => [item.label.tr, item.label.en]),
    ...site.footer.groups.flatMap((group) => [
      group.title.tr,
      group.title.en,
      ...group.links.flatMap((item) => [item.label.tr, item.label.en]),
    ]),
  ].join(" ");
  expect(customerChrome).not.toContain("UpcyTech");
});

test("Brand House hero and CTA hierarchy stay aligned", () => {
  expect(homePage.hero.descriptor.tr).toBe("Şirketinizin denetim, optimizasyon ve karar merkezi.");
  expect(homePage.hero.title.tr).toBe("Şirketinizde ne oluyor, neden oluyor, ne yapılmalı?");
  expect(homePage.hero.primary.tr).toBe("Dima'yı deneyin");
  expect(homePage.hero.secondary.tr).toBe("Canlı gösterim isteyin");
  expect(site.trialAction.label.tr).toBe("Dima'yı deneyin");
  expect(site.chrome.login.tr).toBe("Giriş yap");
  expect(homePage.loop.tr).toBe("İzler ✦ Denetler ✦ Fark eder ✦ Karara taşır");
});

test("Brand House keeps a single active product", () => {
  expect(products).toHaveLength(1);
  expect(products[0]?.name).toBe("Dima");
  expect(products[0]?.domain).toBe(site.domain);
  expect(products[0]?.category.tr).toBe("Kurumsal Karar Zekâsı ve Optimizasyon Platformu");
  expect(products[0]?.category.en).toBe("Decision Intelligence & Optimization Platform");
});

test("Şirket Beyni product proof uses dashboard semantics, not an anatomical silhouette", () => {
  expect(companyBrain.eyebrow.tr).toBe("Şirket Beyni");
  expect(companyBrain.dashboard.heading.tr).toBe("Şirketiniz şu anda nasıl çalışıyor?");
  expect(companyBrain.dashboard.todayTitle.tr).toBe("Öne çıkan sinyaller");
  expect(companyBrain.dashboard.layers.tr.map((layer) => layer.title)).toEqual([
    "Veri katmanı",
    "Bağlantı katmanı",
    "Analiz katmanı",
    "Karar katmanı",
  ]);
});

test("Şirket Beyni keeps one state model across two lenses and conversation stays contextual", () => {
  expect(companyBrain.lenses.brain.tr).toBe("Katmanlı Şirket Beyni");
  expect(companyBrain.lenses.map.tr).toBe("Şirket Haritası");
  expect(companyBrain.flow.tr).toEqual([
    "Şirket",
    "İş alanı",
    "Alt alan",
    "Varlık",
    "İlişki",
    "Sinyal",
    "Bulgu",
    "Kanıt / Araştırma",
    "Karar",
    "Eylem",
    "Sonuç / Hafıza",
  ]);
  expect(companyBrain.detail.chat.tr).toContain("aynı bulgu, varlık ve kanıt bağlamını kaybetmeden");
  expect(companyBrain.today.label.tr).toBe("Dima Bugün");
});

test("the 70 UX strategy is represented as three depths, not separate products", () => {
  expect(capabilityDepths.map((item) => item.id)).toEqual(["management", "finance", "manufacturing"]);
  expect(capabilityDepths.every((item) => item.items.length >= 6)).toBe(true);
});

test("the product proof covers the full signal-to-action flow", () => {
  expect(productExperience.steps.map((step) => step.id)).toEqual([
    "overview",
    "signal",
    "investigation",
    "evidence",
    "decision",
    "action",
  ]);
});

test("sector contexts are broad enough for the first market story", () => {
  expect(industriesPage.sectorPacks).toHaveLength(8);
  expect(industriesPage.sectorPacks.map((item) => item.id)).toEqual([
    "textile",
    "plastics",
    "machinery",
    "automotive",
    "food",
    "chemicals",
    "distribution",
    "logistics",
  ]);
});
