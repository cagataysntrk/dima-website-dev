/** /blog and /blog/[slug]. Post content itself lives in src/content/blog/*.mdx. */
export const blogPage = {
  meta: {
    title: {
      tr: "Kaynaklar: şirket verisi, karar zekâsı, finans ve üretim",
      en: "Resources: company data, decision intelligence, finance and manufacturing",
    },
    description: {
      tr: "Dima'nın ele aldığı veri, denetim, kök neden, finans ve üretim problemlerini somut örneklerle açıklayan kaynaklar.",
      en: "Practical resources explaining the data, monitoring, root-cause, finance and manufacturing problems Dima is built to address.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "Kaynaklar", en: "Resources" } },
  hero: {
    title: { tr: "Kaynaklar", en: "Resources" },
    lede: {
      tr: "Bir kavramı anlatıyorsak okuyucu ne olduğunu ve neden önemli olduğunu öğrenmeli. Bir ürün davranışını anlatıyorsak Dima'nın hangi veriye baktığı, nasıl araştırdığı ve sonucun nasıl doğrulanabildiği anlaşılmalı.",
      en: "When we explain a concept, the reader should learn what it is and why it matters. When we explain product behavior, it should be clear what data Dima inspects, how the investigation works and how the result can be checked.",
    },
  },
  featured: { tr: "Öne çıkan", en: "Featured" },
  all: { tr: "Tüm kaynaklar", en: "All resources" },
  read: { tr: "Yazıyı okuyun", en: "Read the post" },
  filter: {
    label: { tr: "Kategoriye göre süz", en: "Filter by category" },
    all: { tr: "Tümü", en: "All" },
  },
  empty: { tr: "Henüz yayımlanmış bir kaynak yok.", en: "Nothing published yet." },
  emptyCategory: { tr: "Bu kategoride henüz kaynak yok.", en: "Nothing in this category yet." },
  follow: {
    title: { tr: "Neyi yayımlıyoruz", en: "What we publish" },
    body: {
      tr: "Sloganı içerik yerine kullanmıyoruz. Her yazı ya gerçek bir işletme problemini mekanizmasıyla açıklamalı, ya okuyucuya uygulanabilir bir düşünme yöntemi vermeli ya da Dima'nın bir davranışını veri, bağlam ve sınırlarıyla göstermeli.",
      en: "We do not use slogans as a substitute for content. Every post should either explain a real business problem and its mechanism, give the reader a usable way to think about it, or show a Dima behavior together with its data, context and boundaries.",
    },
  },
  post: {
    by: { tr: "Yazan", en: "By" },
    updated: { tr: "Güncellendi", en: "Updated" },
    about: { tr: "Yazar hakkında", en: "About the author" },
    photo: { tr: "Fotoğraf", en: "Photo" },
    related: { tr: "İlgili yazılar", en: "Related posts" },
    ctaTitle: { tr: "Bunu kendi verinizde görün", en: "See this with your own data" },
    ctaBody: {
      tr: "Yazıdaki problemi kendi şirketinizde nasıl görünür hale getirebileceğimizi konuşmak isterseniz, tek bir karar problemi ve onu açıklayan veriyle başlayabiliriz.",
      en: "If you want to see how the problem described here becomes visible in your own company, we can start with one decision problem and the data required to explain it.",
    },
    serviceAction: { tr: "Deneme çalışmasını konuşun", en: "Discuss a pilot scope" },
    contactAction: { tr: "Canlı gösterim isteyin", en: "Request a live demonstration" },
  },
} as const;
