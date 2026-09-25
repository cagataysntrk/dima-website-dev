import type { L } from "./types";

/**
 * Lightweight customer-facing sector context used by the home gallery.
 * Detailed domain intelligence lives in pages/industries.ts. Retired compliance/service
 * portfolio data does not belong in the active Dima marketing model.
 */
export interface Industry {
  id: "textile" | "plastics" | "general";
  anchor: L;
  name: L;
  summary: L;
  image?: { src: string; alt: L; credit: string };
}

export const industries = [
  {
    id: "textile",
    image: {
      src: "/industries/textile.webp",
      alt: { tr: "Bir dokuma tesisinde çalışan dokuma tezgâhları", en: "Weaving looms at work on a textile floor" },
      credit: "Bergstrand Consultancy / Unsplash",
    },
    anchor: { tr: "tekstil", en: "textile" },
    name: { tr: "Tekstil", en: "Textile" },
    summary: {
      tr: "Tekstil pack'i reçete, renk, lot, makine, kumaş, kimyasal, su/enerji ve kalite ilişkilerini ortak üretim beynine ekler; batch ve kalite finding'lerini proses ve maliyet bağlamında araştırmaya hazırlar.",
      en: "The textile pack adds recipe, color, lot, machine, fabric, chemical, water/energy and quality relationships to the common manufacturing brain, preparing batch and quality findings for process and cost investigation.",
    },
  },
  {
    id: "plastics",
    image: {
      src: "/industries/plastics.webp",
      alt: { tr: "Enjeksiyon kalıplama ile üretilmiş iki siyah plastik parça", en: "Two black injection-moulded plastic parts" },
      credit: "Mastars / Unsplash",
    },
    anchor: { tr: "plastik", en: "plastics" },
    name: { tr: "Plastik", en: "Plastics" },
    summary: {
      tr: "Plastik pack'i resin, masterbatch, regrind, makine, kalıp/die, cycle, drying, dosing, defect ve enerji ilişkilerini aynı üretim bağlamında birleştirir.",
      en: "The plastics pack combines resin, masterbatch, regrind, machine, mold/die, cycle, drying, dosing, defect and energy relationships in the same manufacturing context.",
    },
  },
  {
    id: "general",
    image: {
      src: "/industries/general.webp",
      alt: { tr: "Bir üretim hattında çalışan turuncu robot kollar", en: "Orange robot arms at work on a production line" },
      credit: "Unsplash (photo 8gr6bObQLOI)",
    },
    anchor: { tr: "genel-imalat", en: "general-manufacturing" },
    name: { tr: "Genel imalat", en: "General manufacturing" },
    summary: {
      tr: "Genel imalat pack'i sipariş, ürün, makine/hat, vardiya, malzeme, kalite, bakım ve maliyet ilişkilerinden şirketin kendi üretim modelini kurar.",
      en: "The general manufacturing pack builds the company's own production model from relationships among orders, products, machines/lines, shifts, materials, quality, maintenance and cost.",
    },
  },
] as const satisfies readonly Industry[];
