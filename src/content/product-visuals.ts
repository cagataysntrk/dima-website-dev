export const productVisuals = {
  eyebrow: { tr: "Ürün görsel yönü", en: "Product visual direction" },
  title: {
    tr: "Dima yalnız anlatılmamalı, nasıl bir ürün olduğu da görülmeli.",
    en: "Dima should not only be explained. The product should be visible.",
  },
  intro: {
    tr: "Aşağıdaki ekranlar nihai ürün ekranı değildir. Şirket Beyni, canlı izleme ve karar yüzeylerinin görsel yönünü göstermek için kullanılan geçici ürün konseptleridir. Gerçek ürün ekranları geldikçe aynı alanlar birebir güncellenecektir.",
    en: "The screens below are not final product screenshots. They are temporary product concepts used to show the visual direction for the Company Brain, live monitoring and decision surfaces. These slots will be replaced with real product screens as they become available.",
  },
  badge: { tr: "Ürün konsepti, örnek şirket verisi", en: "Product concept, sample company data" },
  items: [
    {
      src: "/product-concepts/company-map.webp",
      title: { tr: "Şirket haritası ve öncelikli sinyaller", en: "Company map and priority signals" },
      body: {
        tr: "Şirketin iş alanlarını, ilişkilerini ve o anda dikkat gerektiren sinyalleri aynı yönetim yüzeyinde gösteren ürün yönü.",
        en: "A product direction that shows business domains, relationships and current priority signals in one management surface.",
      },
    },
    {
      src: "/product-concepts/company-layers.webp",
      title: { tr: "Veriden karara katmanlı görünüm", en: "Layered view from data to decision" },
      body: {
        tr: "Veri kaynaklarından ilişkilere, analizden karara uzanan katmanların tek şirket modeli üzerinde nasıl birleşebileceğini gösteren ürün yönü.",
        en: "A product direction showing how data sources, relationships, analysis and decisions can meet on one company model.",
      },
    },
    {
      src: "/product-concepts/live-system.webp",
      title: { tr: "Canlı şirket akışı ve çıktı yüzeyleri", en: "Live company flow and output surfaces" },
      body: {
        tr: "Veri akışının sinyal, rapor, öneri, görev ve karara nasıl dönüştüğünü yoğun ama okunabilir bir yönetim ekranında gösteren ürün yönü.",
        en: "A product direction showing how data flow becomes signals, reports, recommendations, tasks and decisions in a dense but readable management surface.",
      },
    },
  ],
} as const;
