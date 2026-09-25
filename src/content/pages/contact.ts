import type { L } from "../types";

/**
 * /contact. Field names, errors and the consent line follow the design system's voice rules:
 * controls take the bare imperative, sentences take "siz", errors say what happened and how
 * to fix it without apologising, and an action keeps its verb ("Gönder" → "Gönderildi").
 */
export const TOPICS = ["products", "software", "consultancy", "sustainability", "sector", "careers", "other"] as const;
export type Topic = (typeof TOPICS)[number];

export const contactPage = {
  meta: {
    title: { tr: "İletişim: UpcyTech ile görüşün", en: "Contact: talk to UpcyTech" },
    description: {
      tr: "UpcyTech'e yazın: ürünler, özel yazılım, mimari inceleme ya da sürdürülebilirlik çözümleri. Mesajınızı işi yapacak kişi okur.",
      en: "Write to UpcyTech about products, custom software, architecture review or sustainability solutions. The person who reads your message is the person who does the work.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "İletişim", en: "Contact" } },
  hero: {
    title: { tr: "Bize ulaşın", en: "Talk to us" },
    lede: {
      tr: "Ne üzerinde çalıştığınızı birkaç cümleyle anlatın. Mesajınızı, işi yapacak kişi okur.",
      en: "Tell us in a few sentences what you are working on. Your message is read by the person who would do the work.",
    },
  },
  next: {
    title: { tr: "Sonra ne olur", en: "What happens next" },
    steps: {
      tr: [
        "Mesajınızı, işi yapacak kişi okur.",
        "İlk görüşmede hangi ürünün ya da hizmetin uyduğunu birlikte çıkarırız; hiçbiri uymuyorsa bunu da söyleriz.",
      ],
      en: [
        "Your message is read by the person who would do the work.",
        "In a first call we work out together which product or service fits, and tell you if none of them does.",
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
      tr: "Hangi kaydın nerede tutulduğunu ve kimin hangi raporu istediğini yazın.",
      en: "Say which records live where, and who is asking for which report.",
    },
    topicPlaceholder: { tr: "Bir konu seçin", en: "Choose a topic" },
    /** The spam honeypot is hidden from people and assistive technology; its label is still localized. */
    honeypot: { tr: "Web sitesi", en: "Website" },
    topics: {
      products: { tr: "Ürünler", en: "Products" },
      software: { tr: "Özel yazılım", en: "Custom software" },
      consultancy: { tr: "Mimari inceleme & teknik analiz", en: "Architecture review & technical analysis" },
      sustainability: { tr: "Sürdürülebilirlik çözümleri", en: "Sustainability solutions" },
      sector: { tr: "Sektörel çözüm görüşmesi", en: "Sector solution meeting" },
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
      tr: "Mesaj en az 20 karakter olmalı. Ne üzerinde çalıştığınızı birkaç cümleyle yazın.",
      en: "The message needs at least 20 characters. Describe what you are working on in a few sentences.",
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
      tr: "Mesajınızı işi yapacak kişi okuyacak ve size e-posta ile dönecek.",
      en: "The person who would do the work will read it and reply by email.",
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
      tr: "Görüşmeye gelmek isterseniz önceden haber verin; işi yapacak kişinin orada olmasını sağlayalım.",
      en: "If you would like to visit, let us know beforehand so the person who would do the work is there.",
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
        /** Unused today (only zoom renders): present so enabling a control can never ship English. */
        locate: { tr: "Konumumu bul", en: "Find my location" },
        fullscreen: { tr: "Tam ekrana geç", en: "Toggle fullscreen" },
        resetBearing: { tr: "Kuzeye döndür", en: "Reset bearing to north" },
      },
      openExternal: { tr: "OpenStreetMap'te aç", en: "Open in OpenStreetMap" },
      missing: {
        tr: "[COPY NEEDED: office coordinates — the map appears once they are supplied]",
        en: "[COPY NEEDED: office coordinates — the map appears once they are supplied]",
      },
    },
  },
  legal: {
    title: { tr: "Şirket bilgileri", en: "Company details" },
    intro: {
      tr: "Türk Ticaret Kanunu gereği yayımladığımız tescil bilgileri.",
      en: "Our registration details, published as Turkish commercial law requires.",
    },
    labels: {
      legalName: { tr: "Ticari unvan", en: "Registered name" },
      registeredAddress: { tr: "Kayıtlı adres", en: "Registered address" },
      mersis: { tr: "MERSİS numarası", en: "MERSİS number" },
    },
  },
};
