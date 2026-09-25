import { copyNeeded, needed, type L, type Point } from "./types";

/**
 * The three service lines, sold as UpcyTech with no separate name, domain or accent
 * (design-system D-026).
 *
 * Custom software traces to brand/public/messaging-services-software.md, sustainability
 * consulting to messaging-services-consulting.md. Software consultancy has no message house
 * yet: its scope is a visible [COPY NEEDED] until confirmed. Vocabulary rules from those
 * houses apply — "devir", never "teslim"; "özel yazılım", never "butik"; no "anahtar teslim".
 */

export interface Offer {
  name: string;
  scope: string;
  keep: string;
}

export interface Service {
  id: string;
  anchor: L;
  name: L;
  /** The section's claim, not a slogan. */
  title: L;
  summary: L;
  scope: L<Point[]>;
  typical?: L<string[]>;
  /** What stays with the client when the work ends. */
  keep: L<string[]>;
  why?: L<Point[]>;
  offers?: L<Offer[]>;
  /** A reference line: what the claim rests on. */
  proof?: L;
  /** A capability stated as roadmap, never as delivery. */
  note?: L;
  /** The `service` value the scoping-call link carries to the contact form. */
  enquiry: string;
}

export const services: readonly Service[] = [
  {
    id: "software",
    anchor: { tr: "ozel-yazilim", en: "custom-software" },
    name: { tr: "Özel yazılım", en: "Custom software" },
    title: {
      tr: "Kendi yazılımımızı biz yazıyoruz. Sizinkini de yazabiliriz.",
      en: "We write our own software. We can write yours.",
    },
    summary: {
      tr: "İhtiyaç hazır bir üründe yoksa ilk denenen genellikle bir serbest geliştiricidir. Sorun geliştirici gittiğinde başlar: yazılım çalışır ama kimse dokunamaz, çünkü belge, test ve devir yoktur. Biz üçüyle birlikte çalışırız.",
      en: "When no product fits, the first attempt is usually a freelancer. The trouble starts when the developer leaves: the software keeps running and nobody can touch it, because there are no docs, no tests and no handover. We work with all three.",
    },
    scope: {
      tr: [
        { title: "Web uygulamaları ve iç sistemler", body: "Operasyonunuzun hazır üründe karşılığı olmayan kısmı için web uygulamaları, iç sistemler ve API'ler." },
        { title: "Entegrasyon", body: "ERP'niz, tablolarınız ve veritabanlarınız arasında, iki ucu da adıyla belli entegrasyonlar." },
        { title: "Veri ve analitik", body: "Semantik katman, raporlama ve panolar: aynı soruya her seferinde aynı cevabı veren bir veri yapısı." },
        { title: "Kurulum ve işletme", body: "Yerinde kurulum, Docker ile dağıtım, veri göçü ve devir." },
      ],
      en: [
        { title: "Web applications and internal systems", body: "Web applications, internal systems and APIs for the part of your operation no off-the-shelf product covers." },
        { title: "Integrations", body: "Between your ERP, spreadsheets and databases, with both ends of every integration named." },
        { title: "Data and analytics", body: "Semantic layers, reporting and dashboards: a data structure that gives the same answer to the same question every time." },
        { title: "Installation and operations", body: "On-premise installation, Docker deployment, data migration and handover." },
      ],
    },
    keep: {
      tr: [
        "Belgesi olan yazılım: nasıl kurulduğu, nasıl çalıştığı ve nasıl değiştirileceği yazılı.",
        "Testler: bir değişikliğin neyi bozduğunu, kimse hatırlamasa da gösteren.",
        "Devir: sizin ekibinize ya da seçtiğiniz ekibe, yazılımı yazan kişi gittiğinde de çalışır halde.",
        "Sahiplik: kod sahipliği ve lisans koşulları, kapsam belgesinde yazıya dökülür.",
      ],
      en: [
        "Documented software: how it was installed, how it works and how to change it, in writing.",
        "Tests that show what a change breaks, even when nobody remembers why the code is there.",
        "A handover to your team or one you choose, so the software still works when its author is gone.",
        "Ownership: code ownership and licensing terms are written into the scoping document.",
      ],
    },
    proof: {
      tr: "Referansımız bir slayt değil, kendi ürünlerimiz: Dima, UpcyMan ve UpcyCarbon, bizim yazdığımız ve işlettiğimiz üretim kod tabanları.",
      en: "Our reference is not a slide deck but our own products: Dima, UpcyMan and UpcyCarbon, production codebases we wrote and run.",
    },
    enquiry: "software",
  },
  {
    id: "consultancy",
    anchor: { tr: "mimari-inceleme", en: "architecture-review" },
    name: { tr: "Mimari inceleme & teknik analiz", en: "Architecture review & technical analysis" },
    title: {
      tr: "Karar vermeden önce, yazılımın ve mimarinin durumunu bağımsız bir gözle görün.",
      en: "Before you decide, know the real state of the software and architecture.",
    },
    summary: {
      tr: "Bir sistemi satın almadan, yeniden yazmadan ya da yazılımı olan bir şirkete yatırım yapmadan önce, mimarinin ve kodun bugünkü durumunu bağımsız bir gözle görmek gerekir.",
      en: "Before you buy a system, rewrite one, or invest in a company whose value is its software, you need an independent view of the architecture and the code as they stand today.",
    },
    scope: {
      tr: [
        { title: "Mimari inceleme", body: "Kod tabanını ve mimariyi yerinde inceliyoruz: modül sınırları, veri akışı, bağımlılıklar ve risk noktaları. Kapsam ve yöntem, inceleme başında yazıya dökülür." },
        { title: "Teknik durum tespiti (due diligence)", body: "Bir sistemi satın almadan, yeniden yazmadan ya da yazılımı olan bir şirkete yatırım yapmadan önce bakılır: alıcıya ya da yatırımcıya göre kapsam ve takvim, işin başında yazıya dökülür." },
      ],
      en: [
        { title: "Architecture review", body: "We examine the codebase and the architecture where it lives: module boundaries, data flow, dependencies and risk points. Scope and method go in writing before the review starts." },
        { title: "Technical due diligence", body: "Before you buy a system, rewrite one, or invest in a company whose value is its software: scope and timeline are written down at the start, shaped by whether you are the buyer or the investor." },
      ],
    },
    keep: {
      tr: ["Risk sırasına dizilmiş bulgular, önerilen adımlar ve bir kapanış görüşmesi."],
      en: ["Findings ranked by risk, recommended next steps, and a closing call."],
    },
    enquiry: "consultancy",
  },
  {
    id: "sustainability",
    anchor: { tr: "surdurulebilirlik-cozumleri", en: "sustainability-solutions" },
    name: { tr: "Sürdürülebilirlik çözümleri", en: "Sustainability solutions" },
    title: {
      tr: "Çalışma biter, hesap ve altyapı sizde kalır.",
      en: "The work concludes. The calculation and infrastructure stay with you.",
    },
    summary: {
      tr: "Alıcı, banka ya da düzenleyici bir hesap istiyor ve bir tarih veriyor. Harici hazırlanan raporlar ertesi yıl yeniden üretilemiyor. Hesabı kuran ekip, o hesabın çalıştığı yazılımı da geliştirdi: çalışma bittiğinde size sadece bir PDF değil, çalışan bir hesap ve veri altyapısı kalır.",
      en: "A customer, a bank or a regulator wants a calculation, with a date attached. An externally generated PDF cannot be reproduced the following year. The team that runs your calculation also wrote the software it lives in, so you finish with a working calculation and data infrastructure, not just a document.",
    },
    scope: {
      tr: [
        { title: "Karbon", body: "Kurumsal karbon ayak izi (Kapsam 1, 2 ve 3), ürün karbon ayak izi, gömülü emisyon, GWP setleri ve standart seçimi." },
        { title: "Su", body: "Su ayak izi, su riski değerlendirmesi ve hedef belirleme." },
        { title: "Atık ve plastik", body: "Atık akışı tasarımı, kaynağında ayrıştırma, plastik azaltımı ve geri dönüştürülmüş içerik, Sıfır Atık." },
        { title: "AB düzenlemeleri", body: "CBAM, CSRD/ESRS ve çifte önemlilik, dijital ürün pasaportu hazırlığı." },
        { title: "Veri", body: "Ölçüm noktası tasarımı, birim dönüşümleri, eksik veri stratejisi ve tesis modeli kurgusu." },
      ],
      en: [
        { title: "Carbon", body: "Corporate carbon footprints (Scopes 1, 2 and 3), product footprints, embedded emissions, GWP sets and choice of standard." },
        { title: "Water", body: "Water footprint, water risk assessment and target setting." },
        { title: "Waste and plastics", body: "Waste stream design, segregation at source, plastics reduction and recycled content, Zero Waste." },
        { title: "EU regulation", body: "CBAM, CSRD/ESRS and double materiality, digital product passport readiness." },
        { title: "Data", body: "Measurement design, unit conversion, missing-data strategy and facility modelling." },
      ],
    },
    offers: {
      tr: [
        { name: "CBAM Hazırlık", scope: "Bir ürün grubu, gömülü emisyon, tedarikçi verisinin toplanması", keep: "CBAM'e hazır beyan verisi ve UpcyCarbon'da modellenmiş tesis" },
        { name: "Kurumsal Karbon", scope: "Bir raporlama yılı, bir tüzel kişilik", keep: "Kurumsal ayak izi ve tekrar üretilebilir hesap" },
        { name: "Ürün Ayak İzi", scope: "Ürün ailesi başına", keep: "Ürün karbon ayak izi, EPD'ye hazır yapı" },
        { name: "Su ve Atık", scope: "Bir tesis", keep: "Su ayak izi, atık akışları ve döngüsellik metrikleri" },
        { name: "Sıfır Atık Uyum", scope: "Bir tesis", keep: "Belgelendirme için belge ve raporlama yapısı" },
        { name: "Veri Altyapısı Kurulumu", scope: "Ölçüm tasarımı, birim dönüşümü, entegrasyon", keep: "Kendi sayısını üreten bir tesis" },
      ],
      en: [
        { name: "CBAM readiness", scope: "One product group, embedded emissions, supplier data collection", keep: "CBAM-ready declaration data and the facility modelled in UpcyCarbon" },
        { name: "Corporate carbon", scope: "One reporting year, one legal entity", keep: "A corporate footprint and a calculation you can reproduce" },
        { name: "Product footprint", scope: "Per product family", keep: "A product carbon footprint in an EPD-ready structure" },
        { name: "Water and waste", scope: "One facility", keep: "Water footprint, waste streams and circularity metrics" },
        { name: "Zero Waste compliance", scope: "One facility", keep: "The documentation and reporting structure for certification" },
        { name: "Data infrastructure", scope: "Measurement design, unit conversion, integration", keep: "A facility that produces its own numbers" },
      ],
    },
    keep: {
      tr: [
        "Faktörü, faaliyet kaydı ve denetim iziyle birlikte, kendi sisteminizde çalışan bir hesap.",
        "Ertesi yıl sıfırdan başlamayan bir süreç: aynı hesabı kendiniz de yeniden üretebilirsiniz.",
      ],
      en: [
        "A calculation working in your own system, with its factors, activity records and audit trail.",
        "A process that does not restart from zero next year: you can reproduce the calculation yourself.",
      ],
    },
    why: {
      tr: [
        { title: "Yazılımı biz yazdık", body: "Hesabınızı kuran ekip, o hesabın çalıştığı platformu da yazdı. Arada aracı yok." },
        { title: "Kurucular sahada", body: "Büyük kurumsal yapılarda teklifi ortak verir, işi stajyer yapar. Burada teklifi veren kişi işi de yapar." },
        { title: "Yazılım ekibi arkanızda", body: "Veri toplama, birim dönüşümü, eksik kayıt: bunlar teorik tavsiye değil, mühendislik problemleri. Bizde ikisi de var." },
        { title: "Sistem sizde kalır", body: "Çalışma bittiğinde platform sizindir. Bir sonraki yıl hesabı kendiniz de yapabilirsiniz." },
      ],
      en: [
        { title: "We wrote the software", body: "The team setting up your calculation built the platform it runs on. There is no one in between." },
        { title: "Founders do the work", body: "At a large corporate firm a partner sells the work and a junior delivers it. Here the person who sells it does it." },
        { title: "A software team behind you", body: "Data collection, unit conversion, missing records: these are engineering problems, not theoretical advisory ones. We have both kinds of people." },
        { title: "The system stays with you", body: "When the engagement ends, the platform is yours. Next year you could run the calculation yourself." },
      ],
    },
    proof: {
      tr: "Referansımız kendi ürünlerimiz: hesabı kuran ekip, hesabın çalıştığı platformu da bizzat geliştirdi. UpcyCarbon, doğrudan geliştirdiğimiz ve yönettiğimiz kurumsal altyapımızdır.",
      en: "Our reference is our own product: the team setting up your calculation also wrote the platform it runs on: UpcyCarbon, a production codebase we wrote and operate.",
    },
    note: {
      tr: "Türkiye emisyon ticaret sistemi (7552 sayılı İklim Kanunu) için hazırlanıyoruz. Bugün bir hizmet olarak sunulmuyor.",
      en: "We are preparing for Türkiye's emissions trading system under Climate Law 7552. It is not offered as a service today.",
    },
    enquiry: "sustainability",
  },
];

/** What the client brings. Stated plainly, so a poor fit can see it before the first call. */
export const clientNeeds: L<Point[]> = {
  tr: [
    { title: "Veriye erişim", body: "Çalışmanın dayandığı sistemlere ve kayıtlara, işin başında." },
    { title: "Adı belli bir sorumlu", body: "Sizin tarafınızda kararları verebilen bir kişi. Herkesin sorumlu olduğu iş, kimsenin işi değildir." },
    { title: "Karar hızı", body: "Kapsamdaki sorulara günler içinde cevap. Bekleyen karar, bekleyen iştir." },
    { title: "Sahaya erişim", body: "Ölçüm noktalarını ve süreci yerinde görebilmek; özellikle sürdürülebilirlik ve veri çalışmalarında." },
  ],
  en: [
    { title: "Access to data", body: "To the systems and records the work depends on, from the start." },
    { title: "One named owner", body: "Someone on your side who can make decisions. Work that everyone owns is work nobody owns." },
    { title: "Decisions in days", body: "Answers to scoping questions within days. A decision that waits is work that waits." },
    { title: "Access to the site", body: "To see the measurement points and the process in person, especially for sustainability and data work." },
  ],
};
