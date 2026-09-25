import { copyNeeded, type L, type Point } from "../types";

/**
 * /about. The thesis and convictions come from the design system's public corporate house
 * (brand/public/messaging-upcytech.md §1). The origin story and partners are the company's
 * to supply: the house itself says "none of this may be inferred". Team names and roles are
 * sourced from the published team records.
 */
export const aboutPage = {
  meta: {
    title: {
      tr: "Hakkımızda: neden varız, neye inanıyoruz, kimiz",
      en: "About: why we exist, what we believe, who we are",
    },
    description: {
      tr: "UpcyTech, üreticilerin ürettiği sayıların kaynağından ayrılmaması için kuruldu. Hikâyemiz, inandıklarımız, ekibimiz ve nerede çalıştığımız.",
      en: "UpcyTech exists so that the numbers manufacturers produce stay attached to their source. Our story, our convictions, our team, and where we work.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "Hakkımızda", en: "About" } },
  hero: {
    title: {
      tr: "Bir sayıyı üretmek ucuzladı. Onu kanıtlamak pahalılaştı.",
      en: "Producing a number got cheap. Proving one got expensive.",
    },
    lede: {
      tr: "Alıcı, denetçi ve düzenleyici artık rakamı değil, rakamın nereden geldiğini soruyor. UpcyTech, üreticinin ürettiği sayının kaynağından ayrılmaması için kuruldu.",
      en: "Buyers, auditors and regulators no longer ask for the figure; they ask where it came from. UpcyTech exists so that a manufacturer's numbers never come apart from their source.",
    },
  },
  story: {
    title: { tr: "Hikâye", en: "Story" },
    paragraphs: {
      // The founding moment itself is the founders' to sharpen: replace these two
      // paragraphs with the specific factory, report or buyer question it started with.
      tr: [
        "UpcyTech'i beş kurucu ortak kurdu: iş geliştirme, finans, ürün, teknoloji ve yazılım aynı masada. Kural ilk günden belliydi: sizinle konuşan kişi, işi yapan kişidir.",
        "Tesislerin içine girdikçe gördüğümüz şey değişmedi, adı kondu: istenen hiçbir sayı tek başına durmuyor; her birinin arkasında bir kayıt, bir kaynak, bir tarih aranıyor. O günden beri tek bir iş yapıyoruz: sayıyı, kaynağından ayrılamayacak biçimde kurmak.",
        "Bugün yaptığımız her şey aynı yere çıkıyor: bir sayıyı, kaynağından ayrılamayacak biçimde kurmak. Operasyonu kaydeden bir ERP, bir hesabı raporlayan bir karbon platformu, veriye soru soran bir analiz aracı ve hazır ürün yetmediğinde yazdığımız yazılım, bu tek işin farklı yüzleri.",
      ],
      en: [
        "UpcyTech was founded by five co-founders: business development, finance, product, technology and software around one table. The rule was set on day one: the person you talk to is the person who does the work.",
        "What we saw inside real facilities never changed, it only got its name: no requested number stands alone; behind each one someone looks for a record, a source, a date. Since then we have done exactly one job: making a number that cannot be separated from its source.",
        "Everything we build today comes back to one job: making a number that cannot be separated from its source. An ERP that records the operation, a carbon platform that reports the calculation, an analytics tool that answers questions of the data, and the software we write when no product fits are different faces of that one job.",
      ],
    },
  },
  beliefs: {
    title: { tr: "Neye inanıyoruz", en: "What we believe" },
    items: {
      tr: [
        { title: "Kaynağından ayrılabilen bir sayı iddiadır.", body: "Kaynağıyla birlikte taşınan bir sayı ise kayıttır. Yazılımın işi, bu farkı korumaktır." },
        { title: "Sorun hız değil, tekrar üretilebilirlik.", body: "Sektör cevabı hızlandırmaya çalışıyor. Asıl başarısızlık, geçen yılın cevabının bugün tekrar üretilememesi." },
        { title: "Bize güvenmeyin, sayıyı kontrol edin.", body: "Tanımadığınız bir firmadan gelen bir rakama güvenmek zor. Bu yüzden her çıktıyı, bize sormadan doğrulayabileceğiniz biçimde kuruyoruz." },
        { title: "Türkçe sonradan eklenmez.", body: "Türkçe, Türk muhasebe pratiği ve Türkiye'nin düzenleyici takvimi bir yerelleştirme katmanı değil, tasarımın girdisi." },
      ],
      en: [
        { title: "A number that can be separated from its source is a claim.", body: "A number that travels with its source is a record. Software's job is to keep the difference." },
        { title: "The failure is not speed. It is reproducibility.", body: "The industry competes on how fast it can answer. The real failure is that last year's answer cannot be reproduced today." },
        { title: "Don't trust us. Check the number.", body: "A figure from a vendor you do not know is hard to trust, so we build every output to be verifiable without asking us." },
        { title: "Turkish is not added afterwards.", body: "The Turkish language, Turkish accounting practice and Türkiye's regulatory calendar are inputs to the design, not a localisation layer." },
      ],
    } satisfies L<Point[]>,
  },
  team: {
    title: { tr: "Ekip", en: "Team" },
    intro: {
      tr: "Beş kişiyiz ve vaka çalışmamız henüz yok; bu yüzden kanıt, işi yapan insanlar. Sizinle konuşan kişi, işi yapan kişidir.",
      en: "We are five people and have no case study yet, so the proof is the people who do the work. The person you talk to is the person who delivers.",
    },
    photo: { tr: "Fotoğraf", en: "Photo" },
  },
  where: {
    title: { tr: "Nerede çalışıyoruz", en: "Where we work" },
    intro: {
      tr: "Türkiye'de kurulduk ve önce Türk üreticiler için çalışıyoruz. Müşterimiz Avrupa'ya satıyorsa, Avrupa'nın takvimi de bizim takvimimiz.",
      en: "We are based in Türkiye and work first for Turkish manufacturers. When a customer sells into Europe, Europe's regulatory calendar becomes ours too.",
    },
    facts: {
      // Headquarters repeats the registered address until an office elsewhere is supplied.
      tr: [
        { label: "Merkez", value: "Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul" },
        { label: "Öncelikli pazar", value: "Türkiye; AB'ye ihracat yapan üreticiler" },
        { label: "Diller", value: "Türkçe ve İngilizce" },
        { label: "Kurulum", value: "Bulut öncelikli; talep üzerine yerinde kurulum" },
        { label: "Uluslararası çalışma", value: "AB'ye satış yapan müşterilerimizle Avrupa'nın raporlama takviminde çalışıyoruz. Görüşmeler Türkçe ya da İngilizce, uzaktan ya da sahada yapılır." },
      ],
      en: [
        { label: "Headquarters", value: "Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul, Türkiye" },
        { label: "Primary market", value: "Türkiye, and manufacturers exporting to the EU" },
        { label: "Languages", value: "Turkish and English" },
        { label: "Deployment", value: "Cloud-first; on-premise on request" },
        { label: "International work", value: "With customers selling into the EU we work to Europe's reporting calendar. Meetings happen in Turkish or English, remote or on site." },
      ],
    },
  },
  cta: {
    title: { tr: "Bizimle çalışın ya da bize katılın", en: "Work with us, or join us" },
    body: {
      tr: "Ne üzerinde çalıştığınızı anlatın; ürün mü hizmet mi gerektiğini birlikte çıkaralım. Ekibe katılmak istiyorsanız kariyer sayfası sizin için.",
      en: "Tell us what you are working on and we will work out together whether it needs a product or a service. If you would like to join the team, the careers page is for you.",
    },
    primary: { tr: "Bize ulaşın", en: "Talk to us" },
    secondary: { tr: "Kariyer", en: "Careers" },
  },
};
