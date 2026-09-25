import type { StaticPathname } from "@/i18n/routing";
import type { L } from "./types";

/**
 * The three legal documents. First published from the previous site's texts
 * (upcytech_archive/locales), rewritten to describe this site as built (see
 * `drafterFacts`) and to fit this structure. Counsel reviews before any change
 * is treated as settled: `updated` below is first publication, not legal advice.
 */
export interface LegalSection {
  id: string;
  title: L;
  body: L<string[]>;
}

export interface LegalDoc {
  href: StaticPathname;
  title: L;
  description: L;
  /** ISO date of the text in force. `null` until the company supplies the text. */
  updated: string | null;
  sections: LegalSection[];
}

export const legalDocs = {
  kvkk: {
    href: "/legal/kvkk",
    title: { tr: "KVKK aydınlatma metni", en: "Privacy notice (KVKK)" },
    description: {
      tr: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında UpcyTech'in kişisel verileri nasıl işlediğine dair aydınlatma metni.",
      en: "How UpcyTech processes personal data, under Türkiye's Personal Data Protection Law No. 6698 (KVKK).",
    },
    updated: "2026-09-17",
    sections: [
      {
        id: "veri-sorumlusu",
        title: { tr: "Veri sorumlusu", en: "Data controller" },
        body: {
          tr: [
            "Veri sorumlusu, UpcyTech Teknoloji A.Ş.'dir: Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul. MERSİS numarası 0893064578500001'dir.",
            "Veri sorumlusuna contact@upcytech.com adresinden ulaşabilirsiniz.",
          ],
          en: [
            "The data controller is UpcyTech Teknoloji A.Ş.: Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul, Türkiye. MERSİS number 0893064578500001.",
            "You can reach the data controller at contact@upcytech.com.",
          ],
        },
      },
      {
        id: "islenen-veriler",
        title: { tr: "İşlenen kişisel veriler", en: "Personal data we process" },
        body: {
          tr: [
            "İletişim formunda paylaştıklarınız: ad soyad, firma, kurumsal e-posta, konu, mesaj ve KVKK onayının verildiği zaman. Bu bilgiler SMTP ile şirketin e-posta kutusuna iletilir; sitede ya da bir veritabanında saklanmaz.",
            "Haritayı göstermek için tıkladığınızda IP adresiniz harita sağlayıcısına (CARTO) iletilir. Tıklamadığınız sürece harita için hiçbir istek yapılmaz.",
            "Onay verdiğinizde analitik için anonim bir kimlik tutulur. Tema tercihi, dil ve çerez seçiminiz tarayıcınızın localStorage alanında durur, sunucuya gönderilmez ve kişisel veri olarak işlenmez.",
          ],
          en: [
            "What you share in the contact form: full name, company, work email, topic, message, and the time KVKK consent was given. It is sent over SMTP to the company's mailbox; it is not stored on the site or in a database.",
            "When you choose to show the map, your IP address is sent to the map provider (CARTO). Without that click, no map request is made.",
            "Once you consent, an anonymous identifier is kept for analytics. Your theme preference, language and cookie choice live in the browser's localStorage, are never sent to a server, and are not processed as personal data.",
          ],
        },
      },
      {
        id: "amaclar",
        title: { tr: "İşleme amaçları", en: "Why we process it" },
        body: {
          tr: [
            "Verileri şu amaçlarla işliyoruz: sorularınızı yanıtlamak ve görüşme öncesi iletişimi yürütmek; siteyi ve hizmetleri iyileştirmek; güvenliği sağlamak; yasal yükümlülükleri yerine getirmek.",
          ],
          en: [
            "We process data to answer your questions and run pre-contract communication; to improve the site and the services; to keep things secure; and to meet legal obligations.",
          ],
        },
      },
      {
        id: "aktarim",
        title: { tr: "Kişisel verilerin aktarıldığı taraflar", en: "Who we share it with" },
        body: {
          tr: [
            "Kişisel verilerinizi, yasal zorunluluklar dışında, açık rızanız olmadan üçüncü taraflarla paylaşmıyoruz. Paylaşım olduğunda verilerinizin korunması için gerekli önlemleri alıyoruz.",
            "Form mesajınız şirketin e-posta kutusuna iletilir. Haritayı açarsanız IP adresiniz CARTO'ya, analitiğe onay verirseniz anonim kimliğiniz AB bölgesindeki PostHog sunucusuna (eu.i.posthog.com) gider. Yasal bir zorunluluk doğarsa veriler yetkili makamlarla paylaşılabilir.",
          ],
          en: [
            "We do not share your personal data with third parties without your explicit consent, except where required by law. Where sharing happens, we take the necessary measures to protect your data.",
            "Your form message goes to the company's mailbox. If you open the map, your IP address goes to CARTO; if you accept analytics, your anonymous identifier goes to the PostHog server in the EU region (eu.i.posthog.com). Data may be shared with competent authorities where a legal obligation arises.",
          ],
        },
      },
      {
        id: "yontem-ve-sebep",
        title: { tr: "Toplama yöntemi ve hukuki sebep", en: "How we collect it, and the legal basis" },
        body: {
          tr: [
            "Veriler iletişim formu, harita tıklaması ve onay tercihi yoluyla elektronik ortamda toplanır.",
            "Hukuki sebepler: form mesajları için sözleşme öncesi görüşmeler ve açık rıza; analitik için açık rıza; güvenlik kayıtları için meşru menfaat; yetkili makamlarla paylaşımlar için kanuni yükümlülük.",
          ],
          en: [
            "Data is collected electronically through the contact form, the map click, and the consent choice.",
            "The legal bases are: pre-contract communication and explicit consent for form messages; explicit consent for analytics; legitimate interest for security records; legal obligation for disclosures to competent authorities.",
          ],
        },
      },
      {
        id: "haklar",
        title: { tr: "İlgili kişi olarak haklarınız (KVKK md. 11)", en: "Your rights (KVKK Article 11)" },
        body: {
          tr: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme; işlenmişse buna ilişkin bilgi isteme; işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme; yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme.",
            "Eksik veya yanlış işlenmişse düzeltilmesini isteme; koşulları oluşmuşsa silinmesini veya yok edilmesini isteme; bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme.",
            "Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme; kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
          ],
          en: [
            "To learn whether your data is processed and to request information where it is; to learn why it is processed and whether it is used accordingly; to know the third parties it is shared with at home and abroad.",
            "To have incomplete or inaccurate data corrected; to have it deleted or destroyed where the conditions are met; to have those actions notified to the third parties it was shared with.",
            "To object to a result against you produced solely by automated analysis; to claim compensation where unlawful processing caused you loss.",
          ],
        },
      },
      {
        id: "basvuru",
        title: { tr: "Başvuru yolu", en: "How to make a request" },
        body: {
          tr: [
            "Yukarıdaki haklarınızı kullanmak için kimliğinizi belirten bir açıklamayla contact@upcytech.com adresine yazabilir ya da kayıtlı adresimize yazılı başvurabilirsiniz.",
            "Başvurular en geç 30 gün içinde ücretsiz yanıtlanır. İşlemin ayrıca maliyet gerektirmesi hâlinde Kişisel Verileri Koruma Kurulu tarifesindeki ücret istenebilir.",
          ],
          en: [
            "To exercise these rights, write to contact@upcytech.com with a statement identifying you, or apply in writing to our registered address.",
            "Requests are answered free of charge within 30 days at the latest. Where the process incurs separate cost, the fee in the Personal Data Protection Board's tariff may apply.",
          ],
        },
      },
    ],
  },
  cookies: {
    href: "/legal/cerez-politikasi",
    title: { tr: "Çerez politikası", en: "Cookie policy" },
    description: {
      tr: "upcytech.com'un kullandığı çerezler ve benzeri teknolojiler, ve tercihlerinizi nasıl değiştirebileceğiniz.",
      en: "The cookies and similar technologies upcytech.com uses, and how to change your choices.",
    },
    updated: "2026-09-17",
    sections: [
      {
        id: "cerez-nedir",
        title: { tr: "Çerez nedir", en: "What a cookie is" },
        body: {
          tr: [
            "Çerezler, siteleri ziyaret ettiğinizde cihazınıza yerleştirilen küçük metin dosyalarıdır. Bu site çerezleri tutumlu kullanır: tema tercihi, dil ve çerez seçiminiz çerezde değil, tarayıcınızın localStorage alanında durur ve sunucuya gönderilmez.",
            "Bu sitede çerez yazan tek işlev, onay verdiğinizde yüklenen analitiktir.",
          ],
          en: [
            "Cookies are small text files placed on your device when you visit sites. This site uses them sparingly: your theme preference, language and cookie choice live in the browser's localStorage, not in cookies, and are never sent to a server.",
            "The only thing on this site that writes a cookie is analytics, which loads after you consent.",
          ],
        },
      },
      {
        id: "zorunlu",
        title: { tr: "Zorunlu teknolojiler", en: "Strictly necessary technologies" },
        body: {
          tr: [
            "Sitenin çalışması için zorunlu çerez kullanmıyoruz. Tercihleriniz cihazınızda saklanır; sayfa açılırken yazı tipleri ve harita altyapısı kendi sunucumuzdan yüklenir, üçüncü taraf bir sunucuya istek gitmez.",
          ],
          en: [
            "We use no strictly necessary cookies. Your preferences stay on your device; fonts and map code load from our own server, and opening a page makes no request to a third party.",
          ],
        },
      },
      {
        id: "analitik",
        title: { tr: "Analitik çerezler (yalnızca onayınızla)", en: "Analytics cookies (only with your consent)" },
        body: {
          tr: [
            "Kabul et'i seçerseniz PostHog yüklenir: birinci taraf \"ph_<proje anahtarı>_posthog\" çerezi ve aynı adla bir localStorage kaydı, anonim bir kimlik tutar. Sunucu AB bölgesidir (eu.i.posthog.com) ve varsayılan saklama süresi uygulanır.",
            "Onaydan önce PostHog kodu indirilmez, istek gönderilmez, çerez yazılmaz. Onayı geri aldığınızda ikisi de silinir ve gönderim durur.",
          ],
          en: [
            "If you choose Accept, PostHog loads: a first-party \"ph_<project key>_posthog\" cookie and a localStorage entry of the same name hold an anonymous identifier. The host is the EU region (eu.i.posthog.com) with the default retention period.",
            "Before consent no PostHog code is downloaded, no request is sent and no cookie is written. Withdrawing consent deletes both and stops sending.",
          ],
        },
      },
      {
        id: "tercihler",
        title: { tr: "Tercihlerinizi değiştirmek", en: "Changing your choices" },
        body: {
          tr: [
            "Kararınızı her an bu sayfadaki \"Çerez tercihleri\" düğmesiyle değiştirebilirsiniz. Ayrıca çoğu tarayıcı, ayarlardan çerezleri kabul etmeme veya silme seçeneği sunar.",
          ],
          en: [
            "You can change your decision at any time with the \"Cookie preferences\" button on this page. Most browsers also let you refuse or delete cookies in their settings.",
          ],
        },
      },
      {
        id: "guncellemeler",
        title: { tr: "Bu politikadaki değişiklikler", en: "Changes to this policy" },
        body: {
          tr: [
            "Bu politikayı zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlanır; önemli değişikliklerde ayrıca bilgilendirme yapılır.",
          ],
          en: [
            "We may update this policy from time to time. Changes are published on this page, with separate notice for significant ones.",
          ],
        },
      },
    ],
  },
  terms: {
    href: "/legal/kullanim-kosullari",
    title: { tr: "Kullanım koşulları", en: "Terms of use" },
    description: {
      tr: "upcytech.com'un kullanım koşulları.",
      en: "The terms of use for upcytech.com.",
    },
    updated: "2026-09-17",
    sections: [
      {
        id: "kapsam",
        title: { tr: "Kapsam", en: "Scope" },
        body: {
          tr: [
            "UpcyTech web sitesini kullanarak bu Kullanım Koşullarını kabul etmiş olursunuz. Kabul etmiyorsanız siteyi kullanmayın.",
            "Siteyi kullanırken geçerli yasalara uyarsınız; başkalarının haklarını ihlal etmez, platformu kötüye kullanmaz, sistemlere zarar vermezsiniz. Siteyi yasa dışı veya yetkisiz amaçlarla kullanamazsınız.",
            "Siteyi ve içeriğini değiştirme, askıya alma veya sonlandırma hakkımız saklıdır; önemli değişikliklerde önceden bildirmeye çalışırız.",
          ],
          en: [
            "By using the UpcyTech website you accept these Terms of Use. If you do not accept them, do not use the site.",
            "On this site you comply with applicable laws; you do not infringe the rights of others, misuse the platform, or harm its systems. You may not use the site for illegal or unauthorised purposes.",
            "We reserve the right to change, suspend or discontinue the site and its content, and we try to give prior notice of significant changes.",
          ],
        },
      },
      {
        id: "fikri-mulkiyet",
        title: { tr: "Fikri mülkiyet", en: "Intellectual property" },
        body: {
          tr: [
            "Sitedeki tüm içerik, logolar, ticari markalar ve diğer fikri mülkiyet hakları UpcyTech'e veya lisans verenlere aittir. Önceden yazılı izin almadan kopyalayamaz, değiştiremez, dağıtamaz veya ticari amaçla kullanamazsınız.",
          ],
          en: [
            "All content, logos, trademarks and other intellectual property rights on this site belong to UpcyTech or its licensors. You may not copy, modify, distribute or use them commercially without prior written permission.",
          ],
        },
      },
      {
        id: "sorumluluk",
        title: { tr: "Sorumluluğun sınırı", en: "Limitation of liability" },
        body: {
          tr: [
            "Site \"olduğu gibi\" sunulur; kullanımından doğan doğrudan, dolaylı, arızi veya sonuç zararlarından sorumlu değiliz ve garanti vermiyoruz.",
          ],
          en: [
            "The site is provided \"as is\"; we are not responsible for direct, indirect, incidental or consequential damages from its use, and we give no warranty.",
          ],
        },
      },
      {
        id: "baglantilar",
        title: { tr: "Başka sitelere bağlantılar", en: "Links to other sites" },
        body: {
          tr: [
            "Site, ürünlerimizin kendi sitelerine bağlanır: upcyman.com, getdima.com ve upcycarbon.com UpcyTech'e aittir. Bunların dışındaki bağlantılar yalnızca kolaylık içindir; bağlanılan sitenin içeriğinden ve gizlilik uygulamalarından o sitenin sahibi sorumludur.",
          ],
          en: [
            "This site links to our products' own sites: upcyman.com, getdima.com and upcycarbon.com belong to UpcyTech. Any other links are for convenience only; their owners are responsible for their content and privacy practices.",
          ],
        },
      },
      {
        id: "hukuk",
        title: { tr: "Uygulanacak hukuk ve yetkili mahkeme", en: "Governing law and jurisdiction" },
        body: {
          tr: [
            "Bu koşullar Türkiye Cumhuriyeti yasalarına tabidir ve bu yasalara göre yorumlanır. Anlaşmazlıklarda Türkiye Cumhuriyeti mahkemeleri yetkilidir.",
          ],
          en: [
            "These terms are governed by and interpreted in accordance with the laws of the Republic of Türkiye. Its courts have jurisdiction over disputes.",
          ],
        },
      },
      {
        id: "iletisim",
        title: { tr: "İletişim", en: "Contact" },
        body: {
          tr: [
            "Bu koşullarla ilgili sorularınız için contact@upcytech.com adresinden bize yazın: UpcyTech Teknoloji A.Ş., Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul.",
          ],
          en: [
            "For questions about these terms write to contact@upcytech.com: UpcyTech Teknoloji A.Ş., Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul, Türkiye.",
          ],
        },
      },
    ],
  },
} satisfies Record<string, LegalDoc>;

export type LegalDocId = keyof typeof legalDocs;

/**
 * Facts for whoever drafts the KVKK notice and the cookie policy — taken from the code, so the
 * legal text describes the site as built. Rendered on those pages as a clearly marked block,
 * to be removed once the real text is in.
 */
export const drafterFacts: L<string[]> = {
  tr: [
    "İletişim formu: ad soyad, firma, kurumsal e-posta, konu, mesaj ve KVKK onayının zamanı. SMTP ile şirketin e-posta kutusuna iletilir; sitede ya da bir veritabanında saklanmaz.",
    "Harita: yalnızca ziyaretçi “Haritayı göster”e tıklarsa CARTO'nun sunucularından yüklenir ve o anda ziyaretçinin IP adresi CARTO'ya iletilir. Tıklanmazsa hiçbir istek gitmez.",
    "Tema tercihi (açık/koyu): tarayıcının localStorage alanında tutulur, sunucuya gönderilmez; çerez değildir.",
    "Dil: adres çubuğundaki /tr ya da /en ile belirlenir; dil için çerez kullanılmaz.",
    "Yazı tipleri ve harita altyapısı kendi sunucumuzdan yüklenir; sayfa açılırken üçüncü taraf bir sunucuya istek gitmez.",
    "Çerez tercihi: ziyaretçinin kararı (kabul/ret, sürüm, tarih) localStorage'da \"upcy-consent\" adıyla tutulur; çerez değildir. Çerez politikası sayfasındaki \"Çerez tercihleri\" düğmesiyle her an değiştirilebilir.",
    "Analitik: PostHog yalnızca \"Kabul et\"ten sonra yüklenir; öncesinde PostHog kodu indirilmez, istek gönderilmez, çerez yazılmaz. Onaydan sonra birinci taraf \"ph_<proje anahtarı>_posthog\" çerezi ve aynı adla bir localStorage kaydı anonim bir kimlik tutar. Onay geri alınınca ikisi de silinir ve gönderim durur. Sunucu AB bölgesidir (eu.i.posthog.com) ve varsayılan saklama süresi uygulanır.",
  ],
  en: [
    "Contact form: full name, company, work email, topic, message, and the time KVKK consent was given. Sent over SMTP to the company's mailbox; not stored on the site or in a database.",
    "Map: loads from CARTO's servers only if the visitor clicks “Show the map”, at which point their IP address reaches CARTO. Without the click, no request is made.",
    "Theme preference (light/dark): kept in the browser's localStorage and never sent to a server; it is not a cookie.",
    "Language: set by /tr or /en in the address; no cookie is used for language.",
    "Fonts and map code are served from our own server; opening a page makes no request to a third party.",
    "Cookie choice: the visitor's decision (accept/decline, version, date) is kept in localStorage as \"upcy-consent\"; it is not a cookie. It can be changed at any time with the \"Cookie preferences\" button on the cookie policy page.",
    "Analytics: PostHog loads only after \"Accept\"; before that no PostHog code is downloaded, no request is sent and no cookie is written. After consent, a first-party \"ph_<project key>_posthog\" cookie and a localStorage entry of the same name hold an anonymous identifier. Withdrawing consent deletes both and stops sending. The host is the EU region (eu.i.posthog.com) with the default retention period.",
  ],
};

export const legalChrome = {
  /** The legal pages' layout (after the sister site's): hero eyebrow, sidebar label, draft notice. */
  eyebrow: { tr: "Yasal", en: "Legal" },
  sectionsLabel: { tr: "Belgeler", en: "Documents" },
  draft: {
    title: { tr: "Metin henüz yayımlanmadı", en: "The text is not published yet" },
    body: {
      tr: "Bölümler hazır; hukuki metni şirket sağlayacak. O zamana kadar her bölüm açıkça boş gösteriliyor.",
      en: "The sections are in place; the company will supply the legal text. Until then, each section is shown plainly as empty.",
    },
  },
  updated: { tr: "Son güncelleme", en: "Last updated" },
  // Unreachable while every document carries an `updated` date above; kept because
  // the layout renders it in the no-date branch.
  notYet: { tr: "—", en: "—" },
  contents: { tr: "İçindekiler", en: "Contents" },
  drafter: {
    title: { tr: "Metni yazacak kişi için: sitenin gerçekte yaptıkları", en: "For whoever drafts this text: what the site actually does" },
    note: {
      tr: "Bu blok, hukuki metin gelene kadar duruyor ve yayından önce kaldırılmalı. Koddan alınmış teknik bilgidir, hukuki metin değildir.",
      en: "This block stays until the legal text arrives and must be removed before launch. It is technical fact taken from the code, not legal text.",
    },
  },
  home: { tr: "Ana sayfa", en: "Home" },
};
