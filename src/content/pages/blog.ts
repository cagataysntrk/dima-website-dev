/** /blog and /blog/[slug]. Post content itself lives in src/content/blog/*.mdx. */
export const blogPage = {
  meta: {
    title: {
      tr: "Blog: üretim verisi, karbon hesabı ve uyum üzerine yazılar",
      en: "Blog: writing on production data, carbon accounting and compliance",
    },
    description: {
      tr: "UpcyTech'in üretim verisi, karbon hesabı, AB düzenlemeleri ve yazılım üzerine yazıları.",
      en: "UpcyTech writing on production data, carbon accounting, EU regulation and software.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "Blog", en: "Blog" } },
  hero: {
    title: { tr: "Yazılar", en: "Writing" },
    lede: {
      tr: "Üretim verisi, karbon hesabı ve uyum üzerine yazılar. Bir iddia varsa, kaynağı da yazının içinde.",
      en: "On production data, carbon accounting and compliance. Where a post makes a claim, its source is in the post.",
    },
  },
  featured: { tr: "Öne çıkan", en: "Featured" },
  all: { tr: "Tüm yazılar", en: "All posts" },
  read: { tr: "Yazıyı okuyun", en: "Read the post" },
  filter: {
    label: { tr: "Kategoriye göre süz", en: "Filter by category" },
    all: { tr: "Tümü", en: "All" },
  },
  empty: { tr: "Henüz yayımlanmış bir yazı yok.", en: "Nothing published yet." },
  emptyCategory: { tr: "Bu kategoride henüz yazı yok.", en: "Nothing in this category yet." },
  follow: {
    title: { tr: "Takip edin", en: "Follow along" },
    // A newsletter signup flow does not exist yet: this line promises the channel,
    // not the form. Wire the signup before launch; until then it reads as intent.
    body: {
      tr: "Yeni yazılar yayımlandığında e-posta ile haber veriyoruz. Kayıt akışı kuruluyor.",
      en: "We announce new posts by email. The signup is being set up.",
    },
  },
  post: {
    by: { tr: "Yazan", en: "By" },
    updated: { tr: "Güncellendi", en: "Updated" },
    about: { tr: "Yazar hakkında", en: "About the author" },
    photo: { tr: "Fotoğraf", en: "Photo" },
    related: { tr: "İlgili yazılar", en: "Related posts" },
    ctaTitle: { tr: "Bu işi sizin verinizle yapalım", en: "Let's do this with your own data" },
    ctaBody: {
      tr: "Yazıda anlattığımızı kendi tesisinizde görmek isterseniz, buradan başlayın.",
      en: "If you would like to see this working in your own facility, start here.",
    },
    serviceAction: { tr: "Kapsam görüşmesi planlayın", en: "Book a scoping call" },
    contactAction: { tr: "Bize ulaşın", en: "Talk to us" },
  },
};
