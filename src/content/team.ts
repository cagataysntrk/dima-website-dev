import type { L } from "./types";

/**
 * The canonical team records, shared by the home page, /about and blog authors. The member IDs
 * are stable even when the presentation order changes.
 */
export interface Member {
  /** Stable id: blog posts name their author by it. */
  id: string;
  name: L;
  role: L;
  /** A short description of what they own here. Shown on /about. */
  background: L;
  /**
   * A portrait (3:4) in public/team — the person's own photo, never a stand-in. Missing, the
   * card shows a visible photo placeholder.
   */
  photo?: string;
}

export const team: readonly Member[] = [
  {
    id: "member-1",
    name: { tr: "Enes Özkan", en: "Enes Özkan" },
    role: { tr: "Kurucu Ortak & İş Geliştirme", en: "Co-Founder & Business Development" },
    background: {
      tr: "İş geliştirme ve müşteri ilişkilerinden sorumludur.",
      en: "Responsible for business development and customer relationships.",
    },
    photo: "/team/enes.webp",
  },
  {
    id: "member-2",
    name: { tr: "M. Hulusi Aydoğan", en: "M. Hulusi Aydoğan" },
    role: { tr: "Kurucu Ortak & Finans Direktörü", en: "Co-Founder & Finance Director" },
    background: {
      tr: "Finans süreçlerinden sorumludur.",
      en: "Responsible for finance and financial processes.",
    },
    photo: "/team/hulusi.webp",
  },
  {
    id: "member-3",
    name: { tr: "C. Çağatay Şentürk", en: "C. Çağatay Şentürk" },
    role: { tr: "Kurucu Ortak & Ürün Yöneticisi", en: "Co-Founder & Product Manager" },
    background: {
      tr: "Ürün yönetimi ve ürün kararlarından sorumludur.",
      en: "Responsible for product management and product decisions.",
    },
    photo: "/team/cagatay.webp",
  },
  {
    id: "member-4",
    name: { tr: "A. Harun Öztürk", en: "A. Harun Öztürk" },
    role: { tr: "Kurucu Ortak & Teknoloji Lideri", en: "Co-Founder & Tech Lead" },
    background: {
      tr: "Teknoloji yönü ve teknik kararlardan sorumludur.",
      en: "Responsible for the technology direction and technical decisions.",
    },
    photo: "/team/abdullah.webp",
  },
  {
    id: "member-5",
    name: { tr: "Y. Hamza Çelebi", en: "Y. Hamza Çelebi" },
    role: { tr: "Kurucu Ortak & Yazılım Geliştirici", en: "Co-Founder & Software Developer" },
    background: {
      tr: "Yazılım geliştirme ve teknik uygulamadan sorumludur.",
      en: "Responsible for software development and technical implementation.",
    },
    photo: "/team/hamza.webp",
  },
];

/** Presentation order separates the warm orange portraits from each other on both card grids. */
const TEAM_DISPLAY_ORDER = ["member-1", "member-2", "member-4", "member-5", "member-3"] as const;

export const teamForDisplay: readonly Member[] = TEAM_DISPLAY_ORDER.map((id) =>
  team.find((member) => member.id === id)!,
);
