export const contextualChat = {
  eyebrow: { tr: "Bağlam içinden sohbet", en: "Conversation inside context" },
  title: { tr: "Sohbet var. Ama şirket zekâsının kendisi değil, ona açılan bir yüzey.", en: "Conversation is there, but it is a surface into company intelligence, not the intelligence itself." },
  intro: {
    tr: "Bir bulgudan sohbete geçtiğinizde Dima seçili şirketi, iş alanını, varlıkları, dönemi ve kanıtları kaybetmez. Kullanıcı ister hazır sorulardan ilerler ister kendi sorusunu yazar; yanıt grafik, kullanılan sorgu ve kaynak bağlamıyla birlikte gelir.",
    en: "When you move from a finding into conversation, Dima keeps the selected company, business domain, entities, period and evidence. The user can choose a prepared question or write their own; the answer arrives with a chart, the query used and source context.",
  },
  contextLabel: { tr: "Sohbete taşınan bağlam", en: "Context carried into conversation" },
  context: {
    tr: ["Üretim", "Hat 3", "Son 90 gün", "Duruş ve bakım kayıtları", "İki riskli sipariş"],
    en: ["Manufacturing", "Line 3", "Last 90 days", "Downtime and maintenance records", "Two at-risk orders"],
  },
  sample: { tr: "Tam etkileşimli temsili deneyim, örnek veri", en: "Fully interactive representative experience, sample data" },
} as const;
