import type { L, Point } from "../types";

/**
 * /careers. Employer copy follows the current single-product focus without inventing
 * benefits, working conditions or open roles that the company has not confirmed.
 */
export const careersPage = {
  meta: {
    title: { tr: "Kariyer: Dima'yı geliştiren ekibe katılın", en: "Careers: join the team building Dima" },
    description: {
      tr: "Dima'yı geliştiren beş kişilik ürün ve teknoloji ekibinin çalışma biçimi, açık pozisyonları ve işe alım süreci.",
      en: "How the five-person product and technology team building Dima works, current openings and the hiring process.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "Kariyer", en: "Careers" } },
  hero: {
    title: { tr: "Şirket Beyni'ni inşa eden küçük bir ekipte çalışmak.", en: "Working in a small team building a company brain." },
    lede: {
      tr: "Dima'da şirket verisini bağlayan, önemli değişimleri izleyen, nedenlerini kanıtlarıyla araştıran ve karar akışına taşıyan bir ürün geliştiriyoruz. Küçük ekipte ürün, veri, arka uç, ön yüz ve müşteri problemi birbirinden uzak katmanlar değil.",
      en: "At Dima we are building a product that connects company data, monitors important change, investigates causes with evidence and moves work into the decision flow. In a small team, product, data, backend, frontend and the customer problem are not distant layers.",
    },
  },
  why: {
    title: { tr: "Neden burada çalışmalısınız, neden çalışmamalısınız", en: "Why work here, and why not" },
    intro: {
      tr: "Beş kişilik bir ürün şirketi herkese uymaz. Karar vermeden önce işin iki tarafını da bilin.",
      en: "A five-person product company does not suit everyone. Know both sides before you decide.",
    },
    items: {
      tr: [
        {
          title: "İşin kendisi",
          body: "Dağınık şirket verisini anlamlandıran, bulgu ve kanıt üreten, finans ve üretim gibi gerçek iş alanlarında kullanılan bir karar ürünü üzerinde çalışırsınız. Yaptığınız değişiklik ürün davranışına doğrudan dokunur.",
        },
        {
          title: "Küçük ekibin avantajı",
          body: "Ürün kararının neden alındığını görebilir, teknik sonucu müşteri problemiyle doğrudan ilişkilendirebilirsiniz. Sorumluluk katmanlar arasında kaybolmaz.",
        },
        {
          title: "Sunmadıklarımız",
          body: "Büyük şirketin hazır süreçlerini, dar görev sınırlarını veya kalabalık bir organizasyonun tamponunu sunmuyoruz. Küçük ekipte yapılan iş de eksik kalan iş de görünür.",
        },
        {
          title: "Burada kimler iyi iş çıkarır",
          body: "Belirsiz bir problemi parçalayabilen, kök nedeni arayan, dokümantasyon ve test disiplinini önemseyen ve ürün kararının teknik etkisini takip eden kişiler.",
        },
      ],
      en: [
        {
          title: "The work itself",
          body: "You work on a decision product that connects fragmented company data, produces findings and evidence, and operates in real domains such as finance and manufacturing. Your changes touch product behavior directly.",
        },
        {
          title: "What a small team gives you",
          body: "You can see why a product decision was made and connect the technical result directly to the customer problem. Responsibility does not disappear between layers.",
        },
        {
          title: "What we do not offer",
          body: "We do not offer the ready-made processes, narrow role boundaries or organisational buffers of a large company. In a small team, both finished work and missing work are visible.",
        },
        {
          title: "Who does well here",
          body: "People who can break down ambiguous problems, look for kök nedens, care about belgelendirme and tests, and follow the technical consequences of product decisions.",
        },
      ],
    } satisfies L<Point[]>,
  },
  how: {
    title: { tr: "Nasıl çalışıyoruz", en: "How we work" },
    intro: {
      tr: "Dima'yı ürün olarak geliştiriyor ve işletiyoruz. Teknoloji yığını zamanla değişebilir. Değişmeyen beklenti, problemi kök neden seviyesinde çözmek ve değişikliği test edilebilir bırakmak.",
      en: "We build and operate Dima as a product. The technology stack can evolve; the constant expectation is to solve problems at root-cause level and leave changes testable.",
    },
    facts: {
      tr: [
        { label: "Ürün", value: "Dima: kurumsal karar zekâsı ve optimizasyon platformu" },
        { label: "Çalışma alanları", value: "Ürün, ön yüz, arka uç, veri ve anlamsal katman, yapay zekâ, denetimli ajan akışları ve platform mühendisliği" },
        { label: "Diller", value: "Türkçe ve İngilizce" },
        { label: "Mühendislik ilkesi", value: "İstem veya düzenli ifade yaması yerine kök neden; değişiklikle birlikte test ve belgelendirme" },
        { label: "Çalışma düzeni", value: "Pozisyona göre çalışma düzeni görüşmede netleşir." },
      ],
      en: [
        { label: "Product", value: "Dima: enterprise decision intelligence and optimization platform" },
        { label: "Areas of work", value: "Product, frontend, backend, data/semantic layer, AI/agentic flows and platform engineering" },
        { label: "Languages", value: "Turkish and English" },
        { label: "Engineering principle", value: "Root-cause fixes instead of prompt/regex patches, with tests and belgelendirme alongside the change" },
        { label: "Working arrangement", value: "The working arrangement is clarified for each role during the interview." },
      ],
    },
  },
  teamwork: {
    title: { tr: "Kiminle çalışacaksınız", en: "Who you'd work with" },
    intro: {
      tr: "Beş kişilik çekirdek ekipte ürün, finans, iş geliştirme, teknoloji ve yazılım sorumlulukları doğrudan ekip içinde.",
      en: "In the five-person core team, product, finance, business development, technology and software responsibilities sit directly inside the team.",
    },
    photo: { tr: "Fotoğraf", en: "Photo" },
  },
  roles: {
    title: { tr: "Açık pozisyonlar", en: "Open roles" },
    none: {
      tr: "Şu anda ilan ettiğimiz açık bir pozisyon yok. Yine de birlikte çalışmak istiyorsanız iletişim formunda Kariyer konusunu seçip kendinizi ve yaptığınız işi paylaşabilirsiniz.",
      en: "We have no advertised openings right now. If you would still like to work with us, choose Careers in the contact form and share a short introduction and your work.",
    },
    labels: {
      responsibilities: { tr: "Ne yapacaksınız", en: "What you will do" },
      requirements: { tr: "Aradığımız", en: "What we are looking for" },
      apply: { tr: "Başvurun", en: "Apply" },
    },
  },
  hiring: {
    title: { tr: "İşe alım süreci", en: "How we hire" },
    intro: {
      tr: "Mevcut süreçte kullandığımız adımlar ve yaklaşık süreleri.",
      en: "The steps in the current process and their approximate duration.",
    },
    duration: { tr: "Süre", en: "Duration" },
  },
  cta: {
    title: { tr: "Yaptığınız işi bize gösterin.", en: "Show us the work you do." },
    body: {
      tr: "İletişim formunda Kariyer'i seçin; kendinizi birkaç cümleyle anlatın ve LinkedIn, GitHub, portföy ya da özgeçmiş bağlantınızı ekleyin.",
      en: "Choose Careers in the contact form, introduce yourself briefly, and add a LinkedIn, GitHub, portfolio or CV link.",
    },
    action: { tr: "Kariyer için yazın", en: "Write to us about careers" },
    kvkk: {
      tr: "Başvurular, KVKK aydınlatma metnindeki esaslara göre işlenir; adaylara özel ayrı bir metin yayımlanmamıştır.",
      en: "Applications are processed under our privacy notice (KVKK); no separate candidate notice is published.",
    },
  },
} as const;
