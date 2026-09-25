import { expect, test } from "bun:test";
import { companyBrain } from "@/content/company-brain";
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

test("Brand House V1.6 hero and CTA hierarchy stay aligned", () => {
  expect(homePage.hero.descriptor.tr).toBe("Şirketinizin denetim, optimizasyon ve karar merkezi.");
  expect(homePage.hero.title.tr).toBe("Şirketinizde ne oluyor, neden oluyor, ne yapılmalı?");
  expect(homePage.hero.primary.tr).toBe("Dima'yı deneyin");
  expect(homePage.hero.secondary.tr).toBe("Canlı demo isteyin");
  expect(site.trialAction.label.tr).toBe("Dima'yı deneyin");
  expect(site.chrome.login.tr).toBe("Giriş yap");
  expect(homePage.loop.tr).toBe("İzler ✦ Denetler ✦ Fark eder ✦ Karara taşır");
});

test("Brand House V1.6 keeps a single active product", () => {
  expect(products).toHaveLength(1);
  expect(products[0]?.name).toBe("Dima");
  expect(products[0]?.domain).toBe(site.domain);
  expect(products[0]?.category.tr).toBe("Kurumsal Karar Zekâsı ve Optimizasyon Platformu");
  expect(products[0]?.category.en).toBe("Decision Intelligence & Optimization Platform");
});

test("Company Brain product proof uses dashboard semantics, not an anatomical silhouette", () => {
  expect(companyBrain.dashboard.heading.tr).toBe("Şirketiniz şu anda nasıl çalışıyor?");
  expect(companyBrain.dashboard.todayTitle.tr).toBe("Öne çıkan sinyaller");
  expect(companyBrain.dashboard.layers.tr.map((layer) => layer.title)).toEqual([
    "Veri katmanı",
    "Bağlantı katmanı",
    "Analiz katmanı",
    "Karar katmanı",
  ]);
});

test("Company Brain keeps one state model across two lenses and chat stays contextual", () => {
  expect(companyBrain.lenses.brain.tr).toBe("Tam Beyin Formu");
  expect(companyBrain.lenses.map.tr).toBe("Company Brain Map");
  expect(companyBrain.flow.tr).toEqual([
    "Şirket",
    "Lob",
    "Alt alan",
    "Entity",
    "İlişki",
    "Signal",
    "Finding",
    "Evidence / Investigation",
    "Karar",
    "Aksiyon",
    "Outcome / Memory",
  ]);
  expect(companyBrain.flow.tr).not.toContain("Dima ile konuş");
  expect(companyBrain.detail.chat.tr).toContain("aynı finding, entity ve evidence bağlamını kaybetmeden");
  expect(companyBrain.today.label.tr).toBe("Dima Today");
});
