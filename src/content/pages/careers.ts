import { copyNeeded, needed, type L, type Point } from "../types";

/**
 * /careers. The design system's corporate house leaves the employer brand blank on purpose
 * ("none of this may be inferred") and names the question that makes the rest believable:
 * what you honestly do not offer. So each of its four questions is a visible slot.
 */
export const careersPage = {
  meta: {
    title: { tr: "Kariyer: beş kişilik bir ekipte çalışmak", en: "Careers: working in a team of five" },
    description: {
      tr: "UpcyTech'te çalışmak: beş kişilik bir ekip, üreticiler için yazılım, açık pozisyonlar ve işe alım süreci. Neyi sunduğumuzu ve neyi sunmadığımızı açıkça yazıyoruz.",
      en: "Working at UpcyTech: a team of five building software for manufacturers, open roles and the hiring process. We say plainly what we offer and what we do not.",
    },
  },
  breadcrumb: { home: { tr: "Ana sayfa", en: "Home" }, self: { tr: "Kariyer", en: "Careers" } },
  hero: {
    title: { tr: "Beş kişilik bir ekipte çalışmak.", en: "Working in a team of five." },
    lede: {
      tr: "Üreticiler için ERP, karbon raporlaması, veri analizi ve dış ticaret yazılımı geliştiriyoruz. Aşağıda burada çalışmanın nasıl bir şey olduğunu, neyi sunduğumuzu ve neyi sunmadığımızı açıkça yazıyoruz.",
      en: "We build ERP, carbon reporting, analytics and trade software for manufacturers. Below is what working here is like, what we offer, and what we do not.",
    },
  },
  why: {
    title: { tr: "Neden burada çalışmalısınız, neden çalışmamalısınız", en: "Why work here, and why not" },
    intro: {
      tr: "Beş kişilik bir şirket herkese uymaz. Karar vermeden önce ikisini de bilin.",
      en: "A five-person company does not suit everyone. Know both sides before you decide.",
    },
    items: {
      // Employer voice, drafted for the founders to correct: nothing here may promise
      // what a five-person company cannot keep.
      tr: [
        { title: "İşin kendisi", body: "Üreticinin sahasıyla kasası arasına giren yazılımı yazıyoruz: ERP, karbon hesabı, veri analizi, dış ticaret. Yazdığınız kod, denetime girecek bir hesabın parçası olur." },
        { title: "Büyük bir şirketin veremediği", body: "Beş kişide unvan değil iş vardır: müşteriyle konuşanla kodu yazan aynı kişidir, kararlar katmanlarda değil işin başında alınır." },
        { title: "Sunmadıklarımız", body: "Kurumsal merdiveni, hazır süreçleri ve kalabalıkta kaybolma konforunu sunmuyoruz. Küçük ekipte iş de görünür, eksik de." },
        { title: "Burada kimler iyi iş çıkarır", body: "Belirsizlikte yolunu bulan, sahaya girmekten çekinmeyen ve yazdığı kodun denetime gireceğini bilen kişiler; unvan değil, yapılan iş konuşur." },
      ],
      en: [
        { title: "The work itself", body: "We write the software between a manufacturer's floor and its books: ERP, carbon accounting, analytics, trade. The code you write becomes part of a calculation that walks into audits." },
        { title: "What a large company cannot offer", body: "In five people there are jobs, not titles: whoever talks to the customer writes the code, and decisions are made where the work starts, not three layers up." },
        { title: "What we do not offer", body: "No corporate ladder, no ready-made processes, no comfort of disappearing into a crowd. In a small team the work is visible, and so is what's missing." },
        { title: "Who does well here", body: "People who find their way in ambiguity, don't shy from the shop floor, and know their code walks into audits. The work talks, not the title." },
      ],
    } satisfies L<Point[]>,
  },
  how: {
    title: { tr: "Nasıl çalışıyoruz", en: "How we work" },
    intro: {
      tr: "Kendi ürünlerimizi yazıyor ve işletiyoruz. Kullandığımız araçlar ve çalışma düzenimiz.",
      en: "We write and run our own products. The tools we use, and how we organise the work.",
    },
    facts: {
      tr: [
        { label: "Teknoloji", value: "TypeScript, Next.js, NestJS, Prisma ve PostgreSQL; Docker ile dağıtım; paket yöneticisi Bun" },
        { label: "Diller", value: "Türkçe ve İngilizce" },
        { label: "Çalışma düzeni", value: "Çalışma düzeni görüşmede netleşir; saha işleri sahada yapılır." },
        { label: "Beklentiler", value: "Sahiplenme ve hızlı karar bekliyoruz; saatler ve karar düzeni görüşmede netleşir." },
      ],
      en: [
        { label: "Technology", value: "TypeScript, Next.js, NestJS, Prisma and PostgreSQL; Docker for deployment; Bun as the package manager" },
        { label: "Languages", value: "Turkish and English" },
        { label: "Working arrangement", value: "Working arrangements are settled in the interview; site work happens on site." },
        { label: "Expectations", value: "We expect ownership and fast decisions; hours and how decisions run are settled in the interview." },
      ],
    },
  },
  teamwork: {
    title: { tr: "Kiminle çalışacaksınız", en: "Who you'd work with" },
    intro: {
      tr: "Beş kişiyiz. Sizinle konuşan kişi, işi yapan kişidir; hem başvuruda hem işte.",
      en: "We are five people. The person you talk to is the person who does the work, in hiring as well as on the job.",
    },
    photo: { tr: "Fotoğraf", en: "Photo" },
  },
  roles: {
    title: { tr: "Açık pozisyonlar", en: "Open roles" },
    none: {
      tr: "Şu anda ilan ettiğimiz açık bir pozisyon yok. Yine de birlikte çalışmak istiyorsanız, özgeçmişinizi gönderin.",
      en: "We have no advertised openings right now. If you would still like to work with us, send your CV.",
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
      tr: "Adımlar ve her birinin yaklaşık süresi.",
      en: "The steps, and roughly how long each takes.",
    },
    duration: { tr: "Süre", en: "Duration" },
  },
  cta: {
    title: { tr: "Özgeçmişinizi gönderin", en: "Send us your CV" },
    body: {
      tr: "İletişim formunda konu olarak Kariyer'i seçin, kendinizi birkaç cümleyle anlatın ve özgeçmişinizin bağlantısını (LinkedIn, GitHub ya da kişisel siteniz) ekleyin.",
      en: "Choose Careers as the topic on the contact form, tell us about yourself in a few sentences, and add a link to your CV (LinkedIn, GitHub or your own site).",
    },
    action: { tr: "Özgeçmiş gönderin", en: "Send your CV" },
    kvkk: {
      tr: "Başvurular, KVKK aydınlatma metnindeki esaslara göre işlenir; adaylara özel ayrı bir metin yayımlanmamıştır.",
      en: "Applications are processed under our privacy notice (KVKK); no separate candidate notice is published.",
    },
  },
};
