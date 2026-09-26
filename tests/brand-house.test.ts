import { expect, test } from "bun:test";
import { companyBrain } from "@/content/company-brain";
import { capabilityDepths } from "@/content/capability-depths";
import { productExperience } from "@/content/product-experience";
import { continuousIntelligence } from "@/content/continuous-intelligence";
import { useCaseLab } from "@/content/use-case-lab";
import { technicalArchitecture } from "@/content/technical-architecture";
import { contextualChat } from "@/content/contextual-chat";
import { productTour } from "@/content/product-tour";
import { capabilities, capabilityGroups, homeCapabilityIds } from "@/content/capability-catalog";
import { businessValue } from "@/content/business-value";
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

test("Şirket Beyni has a real Full Brain Form and a Company Map over the same state model", () => {
  expect(companyBrain.eyebrow.tr).toBe("Şirket Beyni");
  expect(companyBrain.lenses.brain.tr).toBe("Tam Beyin Formu");
  expect(companyBrain.lenses.map.tr).toBe("Şirket Haritası");
  expect(companyBrain.dashboard.heading.tr).toBe("Şirketiniz şu anda nasıl çalışıyor?");
  expect(companyBrain.dashboard.live.tr).toBe("Sürekli izleme");
  expect(companyBrain.dashboard.todayTitle.tr).toBe("Öne çıkan sinyaller");
});

test("Şirket Beyni flow stays contextual and conversation stays optional", () => {
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
  expect(companyBrain.flow.tr).not.toContain("Dima ile konuş");
  expect(companyBrain.detail.chat.tr).toContain("aynı bulgu, varlık ve kanıt bağlamını kaybetmeden");
  expect(companyBrain.today.label.tr).toBe("Dima Bugün");
});

test("always-on monitoring is a first-class product story", () => {
  expect(continuousIntelligence.events.length).toBeGreaterThanOrEqual(5);
  expect(continuousIntelligence.process.tr).toContain("İzle");
  expect(continuousIntelligence.process.tr).toContain("Fark et");
  expect(continuousIntelligence.process.tr).toContain("Optimize et");
  expect(continuousIntelligence.events.some((event) => event.status.tr === "Fırsat")).toBe(true);
  expect(continuousIntelligence.events.some((event) => event.status.tr === "Sapma")).toBe(true);
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

test("the public product story is one visual loop from setup to continuous monitoring", () => {
  expect(productTour.stages.map((stage) => stage.id)).toEqual([
    "auth",
    "connect",
    "model",
    "dashboard",
    "chat",
    "watch",
  ]);
  expect(productTour.stages.at(-1)?.tab.tr).toBe("Sürekli denetim");
  expect(productTour.watch.events).toHaveLength(4);
  expect(productTour.heroPreview.monitoring.tr).toBe("7/24 denetim aktif");
  expect(productTour.watch.loop.tr).toEqual([
    "İzler",
    "Fark eder",
    "Araştırır",
    "Optimize eder",
    "Karara taşır",
    "Hatırlar",
  ]);
});

test("conversation remains a strong contextual surface without becoming the product center", () => {
  expect(contextualChat.title.tr).toContain("Sohbet var");
  expect(contextualChat.title.tr).toContain("yüzey");
  expect(contextualChat.context.tr).toContain("Hat 3");
});

test("Dima capabilities stay one catalog over shared intelligence rather than separate products", () => {
  expect(capabilityGroups.map((group) => group.id)).toEqual([
    "general",
    "finance",
    "manufacturing",
    "textile",
    "plastics",
  ]);
  expect(capabilities).toHaveLength(70);
  expect(capabilities.filter((item) => item.group === "general")).toHaveLength(20);
  expect(capabilities.filter((item) => item.group === "finance")).toHaveLength(20);
  expect(capabilities.filter((item) => item.group === "manufacturing")).toHaveLength(10);
  expect(capabilities.filter((item) => item.group === "textile")).toHaveLength(10);
  expect(capabilities.filter((item) => item.group === "plastics")).toHaveLength(10);
  expect(homeCapabilityIds).toHaveLength(8);
});

test("business value keeps one company context across management layers", () => {
  expect(businessValue.roles.map((role) => role.id)).toEqual([
    "executive",
    "finance",
    "operations",
    "teams",
  ]);
  expect(businessValue.example.nodes).toHaveLength(4);
  expect(businessValue.example.signal.tr).toContain("Hat 3");
});

test("business layers are represented as both product depths and concrete use cases", () => {
  expect(capabilityDepths.map((item) => item.id)).toEqual(["management", "finance", "manufacturing"]);
  expect(capabilityDepths.every((item) => item.items.length >= 6)).toBe(true);
  expect(useCaseLab.visualLabels.signal.tr).toBe("Sinyal");
  expect(useCaseLab.visualLabels.reason.tr).toBe("Neden");
  expect(useCaseLab.visualLabels.decision.tr).toBe("Karar");
  expect(useCaseLab.cases.map((item) => item.id)).toEqual([
    "executive",
    "finance",
    "sales",
    "manufacturing",
    "procurement",
    "quality",
  ]);
});

test("technical architecture keeps deterministic analytics, monitoring, investigation and memory explicit", () => {
  expect(technicalArchitecture.layers.map((item) => item.id)).toEqual([
    "sources",
    "model",
    "analytics",
    "watch",
    "investigation",
    "decision",
    "memory",
  ]);
  expect(technicalArchitecture.principles[0]?.title.tr).toBe("Rakamı model uydurmaz");
  expect(technicalArchitecture.assurances.items).toHaveLength(4);
  expect(technicalArchitecture.assurances.items[0]?.title.tr).toBe("Kaynak izi");
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
