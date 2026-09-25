import type { L, Point } from "../types";

/**
 * /about. Dima is the customer-facing master brand; UpcyTech Teknoloji A.Ş. remains the
 * legal entity. This page explains why the product exists without reviving the old
 * multi-product portfolio story.
 */
export const aboutPage = {
  meta: {
    title: {
      tr: "Dima hakkında: neden var, nasıl düşünüyoruz, kim geliştiriyor",
      en: "About Dima: why it exists, how we think, who builds it",
    },
    description: {
      tr: "Dima'nın neden geliştirildiğini, şirket verisini nasıl ele aldığımızı, ürün ilkelerimizi ve ürünü geliştiren ekibi tanıyın.",
      en: "Learn why Dima is being built, how we think about company data, the product principles behind it, and the team building it.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "Hakkımızda", en: "About" } },
  hero: {
    title: {
      tr: "Şirketlerde veri çok. Karar için gereken bağlam hâlâ parçalı.",
      en: "Companies have plenty of data. The context needed for decisions is still fragmented.",
    },
    lede: {
      tr: "Dima'yı bu problem için geliştiriyoruz: finans, muhasebe, üretim ve diğer sistemlerde yaşayan parçaları aynı şirket bağlamında birleştirmek; önemli değişimleri siz sormadan izlemek; nedenini kanıtlarıyla araştırmak ve karara taşımak.",
      en: "Dima is built for this problem: connect the pieces living across finance, accounting, manufacturing and other systems into one company context, monitor important change without waiting for a prompt, investigate why with evidence, and move it toward a decision.",
    },
  },
  story: {
    title: { tr: "Neden Dima", en: "Why Dima" },
    paragraphs: {
      tr: [
        "Dima'yı geliştiren ekip UpcyTech Teknoloji A.Ş. çatısı altında ürün, teknoloji, yazılım, finans ve iş geliştirme disiplinlerini aynı masada birleştiriyor. Bugün müşteri-facing odağımız tek ürün: Dima.",
        "Şirket verisinin yalnız farklı sistemlere dağılmadığını gördük. Aynı müşteri, sipariş, makine veya maliyet birden fazla departmanda farklı izler bırakıyor; yıllar boyunca biriken geçmiş veri de bugünkü değişimin ne anlama geldiğini belirliyor. Asıl zor sorular bu yatay ilişkilerle zaman boyutunu birlikte okumayı gerektiriyor.",
        "Bu yüzden Dima'yı bir chatbot veya yalnızca dashboard olarak tasarlamıyoruz. Company Brain şirketin entity ve ilişkilerini yaşayan bir bağlamda tutuyor; Today ve Radar neyin değiştiğini öne çıkarıyor; Investigation ve Evidence nedenini araştırıyor; Decision ve Action katmanları sonucu işe dönüştürüyor.",
      ],
      en: [
        "The team building Dima works under UpcyTech Teknoloji A.Ş., bringing product, technology, software, finance and business development into one operating group. Today our customer-facing focus is one product: Dima.",
        "Company data is not only scattered across systems. The same customer, order, machine or cost leaves different traces across departments, while years of historical data shape what today's change actually means. The hardest questions require reading those horizontal relationships together with time.",
        "That is why Dima is not designed as a chatbot or merely a dashboard. Company Brain keeps company entities and relationships in a living context; Today and Radar surface what changed; Investigation and Evidence examine why; Decision and Action turn the result into work.",
      ],
    },
  },
  beliefs: {
    title: { tr: "Ürün ilkelerimiz", en: "Product principles" },
    items: {
      tr: [
        {
          title: "Önemli olanı kullanıcı sormadan fark etmek gerekir.",
          body: "Chat faydalıdır ama ürünün merkezi değildir. Şirketi izleyen sistem, kritik sapma, risk veya fırsatı kullanıcı doğru soruyu kurmadan önce bulabilmelidir.",
        },
        {
          title: "Bir finding kanıtından ayrı düşünülemez.",
          body: "Kaynak, dönem, entity, ilişki ve hesaplama bağlamı sonradan eklenen teknik ayrıntılar değildir. Kararın güvenilir olmasının parçasıdır.",
        },
        {
          title: "Sayısal otorite modelin tahmini olmamalıdır.",
          body: "LLM dili ve araştırmayı destekleyebilir; fakat sayısal sonuç tanımlı semantik ve analitik katmandan gelmeli, tekrar kontrol edilebilmelidir.",
        },
        {
          title: "Basitleştir, fakat boşaltma.",
          body: "İster ürün ekranı ister web sitesi olsun, bir şeyi anlaşılır hale getirirken gerçek bilgiyi yok etmiyoruz. Kullanıcı ne olduğunu, neden önemli olduğunu ve ne yapabileceğini anlayabilmeli.",
        },
        {
          title: "Tek şirket beyni, farklı yönetici lensleri.",
          body: "CEO, CFO veya üretim yöneticisi farklı öncelikler görür; fakat alttaki şirket bağlamı ve veri modeli bölünmez. Aynı finding departmanlar arasında izini korur.",
        },
      ],
      en: [
        {
          title: "Important change should surface before the user asks.",
          body: "Chat is useful but it is not the product center. A system monitoring the company should be able to find a critical deviation, risk or opportunity before the user formulates the perfect question.",
        },
        {
          title: "A finding cannot be separated from its evidence.",
          body: "Source, period, entity, relationship and calculation context are not technical details added afterwards. They are part of what makes a decision trustworthy.",
        },
        {
          title: "Numeric authority should not come from model guesswork.",
          body: "An LLM can support language and investigation, but numeric results should come from a defined semantic and analytical layer and remain checkable.",
        },
        {
          title: "Simplify without emptying the idea.",
          body: "Whether in the product or on the website, making something understandable should not remove the real information. The user should understand what it is, why it matters and what can be done.",
        },
        {
          title: "One company brain, different management lenses.",
          body: "A CEO, CFO and manufacturing leader may see different priorities, but the company context and data model underneath do not split. The same finding keeps its trace across departments.",
        },
      ],
    } satisfies L<Point[]>,
  },
  team: {
    title: { tr: "Ekip", en: "Team" },
    intro: {
      tr: "Dima'yı ürün, finans, iş geliştirme, teknoloji ve yazılım sorumluluklarını doğrudan taşıyan beş kişilik çekirdek ekip geliştiriyor.",
      en: "Dima is built by a five-person core team directly responsible for product, finance, business development, technology and software.",
    },
    photo: { tr: "Fotoğraf", en: "Photo" },
  },
  where: {
    title: { tr: "Nerede çalışıyoruz", en: "Where we work" },
    intro: {
      tr: "Türkiye'de kurulduk ve ilk odağımız Türk şirketleri. Dima'yı Türkçe iş dili, yerel muhasebe pratiği ve üretim gerçekliğini sonradan eklenen bir yerelleştirme katmanı değil, ürün girdisi olarak ele alarak geliştiriyoruz.",
      en: "We are based in Türkiye and our first focus is Turkish companies. Dima treats Turkish business language, local accounting practice and manufacturing reality as product inputs rather than a localisation layer added later.",
    },
    facts: {
      tr: [
        { label: "Merkez", value: "Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul" },
        { label: "Ana pazar", value: "Türkiye" },
        { label: "Diller", value: "Türkçe ve İngilizce" },
        { label: "Ürün odağı", value: "Dima: kurumsal karar zekâsı ve optimizasyon platformu" },
        { label: "Tüzel yapı", value: "UpcyTech Teknoloji A.Ş." },
      ],
      en: [
        { label: "Headquarters", value: "Reşitpaşa Mah. Katar Cad. İTÜ Tasarım ve Prototip Merkezi Binası No: 2/41 İç Kapı No: 19, 34467 Sarıyer / İstanbul, Türkiye" },
        { label: "Primary market", value: "Türkiye" },
        { label: "Languages", value: "Turkish and English" },
        { label: "Product focus", value: "Dima — enterprise decision intelligence and optimization platform" },
        { label: "Legal entity", value: "UpcyTech Teknoloji A.Ş." },
      ],
    },
  },
  cta: {
    title: { tr: "Dima'yı kendi şirketinizde görün ya da ekibe katılın.", en: "See Dima in your company, or join the team." },
    body: {
      tr: "Bir karar problemini ve verinin bugün nerede yaşadığını anlatın; hangi veriyle başlayacağımızı ve canlı demoda neyi göstereceğimizi netleştirelim. Ekibe katılmak istiyorsanız kariyer sayfası açık.",
      en: "Tell us about one decision problem and where the relevant data lives today; we will define what to connect first and what to show in a live demo. If you want to join the team, the careers page is open.",
    },
    primary: { tr: "Canlı gösterim isteyin", en: "Request a live demo" },
    secondary: { tr: "Kariyer", en: "Careers" },
  },
} as const;
