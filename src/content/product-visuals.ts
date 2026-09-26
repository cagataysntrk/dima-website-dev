export const productVisuals = {
  eyebrow: { tr: "Dima ekranda", en: "Dima on screen" },
  title: {
    tr: "Şirketinizi farklı derinliklerde görün.",
    en: "See your company at different levels of depth.",
  },
  intro: {
    tr: "Aşağıdaki ekranlar nihai ürün ekranı değildir. Şirket Beyni, canlı izleme ve karar yüzeylerinin görsel yönünü göstermek için kullanılan geçici ürün konseptleridir. Gerçek ürün ekranları geldikçe aynı alanlar birebir güncellenecektir.",
    en: "The screens below are not final product screenshots. They are temporary product concepts used to show the visual direction for the Company Brain, live monitoring and decision surfaces. These slots will be replaced with real product screens as they become available.",
  },
  badge: { tr: "Ürün konsepti, örnek şirket verisi", en: "Product concept, sample company data" },
  controls: {
    pause: { tr: "Görselleri duraklat", en: "Pause visuals" },
    resume: { tr: "Görselleri sürdür", en: "Resume visuals" },
  },
  items: [
    {
      src: "/product-concepts/company-map.webp",
      title: { tr: "Şirket haritası ve öncelikli sinyaller", en: "Company map and priority signals" },
      body: {
        tr: "İş alanları, ilişkiler ve öncelikli sinyaller aynı yaşayan şirket görünümünde.",
        en: "Business domains, relationships and priority signals in one living company view.",
      },
    },
    {
      src: "/product-concepts/company-layers.webp",
      title: { tr: "Veriden karara katmanlı görünüm", en: "Layered view from data to decision" },
      body: {
        tr: "Kaynaklardan ilişkilere, analizden karara uzanan teknik katmanlar tek akışta.",
        en: "Technical layers from sources and relationships through analysis and decision in one flow.",
      },
    },
    {
      src: "/product-concepts/live-system.webp",
      title: { tr: "Canlı şirket akışı ve çıktı yüzeyleri", en: "Live company flow and output surfaces" },
      body: {
        tr: "Veri akışı sinyal, öneri, görev ve karara dönüşürken sistem çalışmaya devam eder.",
        en: "The system keeps working as data becomes signals, recommendations, tasks and decisions.",
      },
    },
  ],
} as const;
