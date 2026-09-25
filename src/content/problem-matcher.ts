import type { L } from "./types";
import type { BrandKey } from "./products";

export interface ProblemEntry {
  id: string;
  label: L;
  productId: "analytics" | "carbon" | "erp" | "trade-ops";
  targetSlug: string;
  brandKey: BrandKey;
  recommendation: L;
}

export interface ProblemMatcherCopy {
  badge: L;
  title: L;
  hint: L;
  actionText: L;
  problems: readonly ProblemEntry[];
}

export const problemMatcherCopy: ProblemMatcherCopy = {
  badge: {
    tr: "Çözüm Sihirbazı",
    en: "Solution Wizard",
  },
  title: {
    tr: "Hangi operasyonel sorunu çözmek istiyorsunuz?",
    en: "Which operational challenge do you want to solve?",
  },
  hint: {
    tr: "İşletmenizde karşılaştığınız sorunu seçin; uygun platformu ve yaklaşımı önerelim.",
    en: "Select the challenge you face in your operations; we will recommend the fitting platform.",
  },
  actionText: {
    tr: "Çözümü incele",
    en: "View solution",
  },
  problems: [
    {
      id: "oee-downtime",
      label: {
        tr: "Makine verimliliğini (OEE) ve duruş nedenlerini net göremiyorum",
        en: "I cannot clearly see machine efficiency (OEE) and downtime causes",
      },
      productId: "analytics",
      targetSlug: "dima",
      brandKey: "dima",
      recommendation: {
        tr: "Dima ile makine ve hat bazlı OEE verilerini, duruş sürelerini ve kök nedenleri anlık analiz edin.",
        en: "Analyze machine and line OEE, downtime periods, and root causes in real time with Dima.",
      },
    },
    {
      id: "cost-margin",
      label: {
        tr: "Üretim maliyet hesabını ve kârlılık sapmalarını takip edemiyorum",
        en: "I struggle to track production costs and profitability variances",
      },
      productId: "analytics",
      targetSlug: "dima",
      brandKey: "dima",
      recommendation: {
        tr: "Dima ile parti bazlı hammadde, enerji ve fire maliyetlerini denetleyin, kâr marjını koruyun.",
        en: "Audit batch raw material, energy, and scrap costs to protect margins with Dima.",
      },
    },
    {
      id: "capacity-bottleneck",
      label: {
        tr: "Kapasite darboğazlarını ve hat dengesizliklerini çözemiyorum",
        en: "I cannot resolve capacity bottlenecks and production line imbalances",
      },
      productId: "analytics",
      targetSlug: "dima",
      brandKey: "dima",
      recommendation: {
        tr: "Dima ile darboğaz oluşturan istasyonları veriye dayalı tespit edin ve süreç akışını dengeleyin.",
        en: "Identify bottleneck stations using verified data and balance your workflow with Dima.",
      },
    },
    {
      id: "shift-productivity",
      label: {
        tr: "Personel ve vardiya bazlı verim farklarını analiz etmek zorlaşıyor",
        en: "Analyzing personnel and shift-based productivity variances is difficult",
      },
      productId: "analytics",
      targetSlug: "dima",
      brandKey: "dima",
      recommendation: {
        tr: "Dima ile vardiya ve personel performansını karşılaştırmalı olarak inceleyin, sapmaları tespit edin.",
        en: "Review shift and personnel performance comparatively to identify variances with Dima.",
      },
    },
    {
      id: "carbon-cbam",
      label: {
        tr: "Kurumsal karbon ayak izi ve CBAM / SKDM uyum raporlaması gerekiyor",
        en: "I need corporate carbon footprint and CBAM compliance reporting",
      },
      productId: "carbon",
      targetSlug: "upcycarbon",
      brandKey: "upcycarbon",
      recommendation: {
        tr: "UpcyCarbon ile Kapsam 1-2-3 emisyonlarını hesaplayın, CBAM beyanlarını standartlara uygun hazırlayın.",
        en: "Calculate Scope 1-2-3 emissions and prepare CBAM declarations compliant with standards using UpcyCarbon.",
      },
    },
    {
      id: "modular-production",
      label: {
        tr: "Sipariş, reçete ve atölye üretim süreçlerini tek merkezden yönetmek istiyorum",
        en: "I want to manage orders, recipes, and workshop operations from a single hub",
      },
      productId: "erp",
      targetSlug: "upcyman",
      brandKey: "upcyman",
      recommendation: {
        tr: "UpcyMan ile hammadde girişinden sevkiyata tüm üretim aşamalarını modüler olarak yönetin.",
        en: "Manage all production stages from raw material intake to dispatch modularly with UpcyMan.",
      },
    },
    {
      id: "trade-logistics",
      label: {
        tr: "Dış ticaret, akreditif ve gümrük operasyonlarında evrak takibi zorlaşıyor",
        en: "Tracking documents in foreign trade, letters of credit, and customs is challenging",
      },
      productId: "trade-ops",
      targetSlug: "upcyops",
      brandKey: "upcyops",
      recommendation: {
        tr: "UpcyOps ile konşimento, akreditif ve gümrük belgelerini operasyon akışında senkronize edin.",
        en: "Synchronize bills of lading, letters of credit, and customs documents in operational flow with UpcyOps.",
      },
    },
  ],
};
