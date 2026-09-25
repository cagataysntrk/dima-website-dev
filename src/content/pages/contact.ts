import type { L } from "../types";

/**
 * Stable internal topic keys are retained so old deep links and the server action contract do
 * not break during the brand migration. User-visible labels now describe Dima conversations.
 */
export const TOPICS = ["products", "software", "consultancy", "sustainability", "sector", "careers", "other"] as const;
export type Topic = (typeof TOPICS)[number];

export const contactPage = {
  meta: {
    title: { tr: "İletişim: Dima ile görüşün", en: "Contact: talk to Dima" },
    description: {
      tr: "Dima canlı demosu, veri bağlantısı, muhasebe/finans, üretim veya pilot kullanım alanı için ekiple görüşün.",
      en: "Talk to the team about a Dima live demo, data connection, accounting/finance, manufacturing or a pilot use case.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "İletişim", en: "Contact" } },
  hero: {
    title: { tr: "Dima'yı kendi şirketinizde görmek için başlayın.", en: "Start with your own company context." },
    lede: {
      tr: "Bir karar problemini, bugün hangi sistemlerden baktığınızı ve cevabı bulmanın neden zor olduğunu birkaç cümleyle anlatın. İlk görüşmenin amacı ürün sunumu yapmak değil, Dima'nın hangi veriyle gerçek değer gösterebileceğini netleştirmektir.",
      en: "Describe one decision problem, which systems you look at today and why the answer is difficult to reach. The first conversation is not a generic product pitch; it is to identify which data would let Dima canlı gösteriminstrate real value.",
    },
  },
  next: {
    title: { tr: "Sonra ne olur", en: "What happens next" },
    steps: {
      tr: [
        "Mesajınızı ürün veya teknik tarafta konuyla ilgilenecek kişi okur.",
        "Bir karar problemini ve onu açıklamak için gereken veri kaynaklarını birlikte sınırlarız.",
        "Uygunsa canlı gösterim veya dar kapsamlı deneme çalışması için sonraki adımı netleştiririz.",
      ],
      en: [
        "Your message is read by the person on the product or technical side who would work on the topic.",
        "Together we narrow one decision problem and the data sources required to explain it.",
        "If there is a fit, we define the next step for a live demo or tightly scoped pilot.",
      ],
    },
    responseLabel: { tr: "Cevap süresi", en: "Response time" },
  },
  form: {
    label: { tr: "İletişim formu", en: "Contact form" },
    fields: {
      name: { tr: "Ad soyad", en: "Full name" },
      company: { tr: "Firma", en: "Company" },
      email: { tr: "Kurumsal e-posta", en: "Work email" },
      topic: { tr: "Konu", en: "Topic" },
      message: { tr: "Mesaj", en: "Message" },
    },
    emailPlaceholder: { tr: "ad.soyad@firma.com.tr…", en: "name@company.com…" },
    messageHint: {
      tr: "Örnek: hangi karar gecikiyor, veriler hangi ERP/Excel/veritabanında ve bugün bunu kim takip ediyor?",
      en: "Example: which decision is delayed, where the data lives today, and who currently has to track it?",
    },
    topicPlaceholder: { tr: "Bir konu seçin", en: "Choose a topic" },
    honeypot: { tr: "Web sitesi", en: "Website" },
    topics: {
      products: { tr: "Dima canlı demo", en: "Dima live demo" },
      software: { tr: "Veri bağlantısı & entegrasyon", en: "Data connection & integration" },
      consultancy: { tr: "Pilot & kullanım alanı", en: "Pilot & use case" },
      sustainability: { tr: "Muhasebe & finans", en: "Accounting & finance" },
      sector: { tr: "Üretim & sektör pack'i", en: "Manufacturing & sector pack" },
      careers: { tr: "Kariyer", en: "Careers" },
      other: { tr: "Diğer", en: "Something else" },
    } satisfies Record<Topic, L>,
    consent: {
      before: { tr: "Kişisel verilerimin ", en: "I agree to my personal data being processed as described in the " },
      link: { tr: "KVKK aydınlatma metni", en: "privacy notice (KVKK)" },
      after: { tr: " kapsamında işlenmesini kabul ediyorum.", en: "." },
    },
    submit: { tr: "Gönder", en: "Send" },
  },
  errors: {
    name: { tr: "Adınızı ve soyadınızı yazın.", en: "Enter your full name." },
    company: { tr: "Firma adı en fazla 160 karakter olabilir.", en: "The company name can be at most 160 characters." },
    email: {
      tr: "E-posta adresi eksik ya da hatalı. ad.soyad@firma.com.tr biçiminde yazın.",
      en: "The email address is missing or incomplete. Write it as name@company.com.",
    },
    topic: { tr: "Bir konu seçin.", en: "Choose a topic." },
    message: {
      tr: "Mesaj en az 20 karakter olmalı. Karar problemini ve verinin bugün nerede yaşadığını birkaç cümleyle yazın.",
      en: "The message needs at least 20 characters. Describe the decision problem and where the relevant data lives today.",
    },
    consent: {
      tr: "Göndermek için KVKK aydınlatma metnini onaylayın.",
      en: "Tick the privacy-notice box to send your message.",
    },
    summary: {
      tr: "Bazı alanlar eksik. İşaretli alanları düzeltip tekrar gönderin.",
      en: "Some fields need attention. Fix the marked fields and send again.",
    },
    failed: {
      tr: "Mesaj gönderilemedi. Birkaç dakika sonra tekrar deneyin ya da aşağıdaki e-posta adresine doğrudan yazın.",
      en: "The message could not be sent. Try again in a few minutes, or write to the email address below.",
    },
  },
  success: {
    title: { tr: "Gönderildi. Mesajınız bize ulaştı.", en: "Sent. Your message reached us." },
    body: {
      tr: "Mesajınızı konuyla ilgilenecek ekip üyesi okuyacak ve size e-posta ile dönecek.",
      en: "The team member responsible for the topic will read it and reply by email.",
    },
  },
  channels: {
    title: { tr: "Doğrudan ulaşın", en: "Reach us directly" },
    intro: {
      tr: "Form yerine doğrudan yazmak ya da aramak isterseniz.",
      en: "If you would rather write or call directly than use the form.",
    },
    labels: {
      email: { tr: "E-posta", en: "Email" },
      phone: { tr: "Telefon", en: "Phone" },
      linkedin: { tr: "LinkedIn", en: "LinkedIn" },
    },
  },
  office: {
    title: { tr: "Ofis", en: "Office" },
    intro: {
      tr: "Görüşmeye gelmek isterseniz önceden haber verin; konuyla ilgilenecek kişinin orada olmasını sağlayalım.",
      en: "If you would like to visit, let us know beforehand so the person responsible for the topic is there.",
    },
    labels: {
      address: { tr: "Adres", en: "Address" },
      visiting: { tr: "Ziyaret", en: "Visiting" },
    },
    map: {
      label: { tr: "Ofisin haritadaki konumu", en: "The office on a map" },
      controls: {
        zoomIn: { tr: "Yakınlaştır", en: "Zoom in" },
        zoomOut: { tr: "Uzaklaştır", en: "Zoom out" },
        locate: { tr: "Konumumu bul", en: "Find my location" },
        fullscreen: { tr: "Tam ekrana geç", en: "Toggle fullscreen" },
        resetBearing: { tr: "Kuzeye döndür", en: "Reset bearing to north" },
      },
      openExternal: { tr: "OpenStreetMap'te aç", en: "Open in OpenStreetMap" },
      missing: {
        tr: "[COPY NEEDED: office coordinates Henüz yok the map appears once they are supplied]",
        en: "[COPY NEEDED: office coordinates Henüz yok the map appears once they are supplied]",
      },
    },
  },
  legal: {
    title: { tr: "Şirket bilgileri", en: "Company details" },
    intro: {
      tr: "Dima'nın geliştiricisi olan tüzel kişiliğin Türk Ticaret Kanunu gereği yayımlanan tescil bilgileri.",
      en: "Registration details of the legal entity developing Dima, published as Turkish commercial law requires.",
    },
    labels: {
      legalName: { tr: "Ticari unvan", en: "Registered name" },
      registeredAddress: { tr: "Kayıtlı adres", en: "Registered address" },
      mersis: { tr: "MERSİS numarası", en: "MERSİS number" },
    },
  },
} as const;
