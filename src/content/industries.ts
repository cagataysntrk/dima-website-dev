import type { L } from "./types";

export interface Industry {
  id: "textile" | "plastics" | "machinery" | "automotive" | "food" | "chemicals" | "distribution" | "logistics";
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
    name: { tr: "Tekstil ve boya", en: "Textile and dyeing" },
    summary: {
      tr: "Reçete, renk, lot, makine, kumaş, kimyasal, su, enerji ve kalite ilişkilerini aynı üretim bağlamında izler.",
      en: "Tracks recipe, color, lot, machine, fabric, chemical, water, energy and quality relationships in one production context.",
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
    name: { tr: "Plastik ve enjeksiyon", en: "Plastics and injection molding" },
    summary: {
      tr: "Hammadde, katkı, yeniden kırılmış malzeme, makine, kalıp, çevrim, kurutma, dozajlama, kusur ve enerji ilişkilerini birleştirir.",
      en: "Combines resin, additives, regrind, machine, mold, cycle, drying, dosing, defect and energy relationships.",
    },
  },
  {
    id: "machinery",
    image: {
      src: "/industries/general.webp",
      alt: { tr: "Bir üretim hattında çalışan endüstriyel robot kolları", en: "Industrial robot arms working on a production line" },
      credit: "Unsplash",
    },
    anchor: { tr: "makine-metal", en: "machinery-metal" },
    name: { tr: "Makine ve metal", en: "Machinery and metal" },
    summary: {
      tr: "İş emri, tezgâh, takım, operasyon, hurda, bakım, kalite ve teslim ilişkileri üzerinden darboğaz ve teslim riskini araştırır.",
      en: "Investigates bottlenecks and delivery risk through work orders, machines, tooling, operations, scrap, maintenance and quality.",
    },
  },
  {
    id: "automotive",
    anchor: { tr: "otomotiv-yan-sanayi", en: "automotive-supply" },
    name: { tr: "Otomotiv yan sanayi", en: "Automotive supply" },
    summary: {
      tr: "Müşteri programı, parça, kalıp, hat, kalite, teslim, tedarikçi ve kapasite ilişkilerini aynı karar bağlamında izler.",
      en: "Monitors customer schedules, parts, molds, lines, quality, delivery, suppliers and capacity in one decision context.",
    },
  },
  {
    id: "food",
    anchor: { tr: "gida-icecek", en: "food-beverage" },
    name: { tr: "Gıda ve içecek", en: "Food and beverage" },
    summary: {
      tr: "Parti, reçete, hammadde, son kullanma tarihi, kalite, hat, verim ve sevkiyat ilişkilerini birlikte değerlendirir.",
      en: "Evaluates batch, recipe, raw material, expiry, quality, line, yield and shipment relationships together.",
    },
  },
  {
    id: "chemicals",
    anchor: { tr: "kimya", en: "chemicals" },
    name: { tr: "Kimya", en: "Chemicals" },
    summary: {
      tr: "Formül, parti, hammadde, süreç koşulu, kalite, enerji, güvenlik ve maliyet değişimlerini aynı üretim geçmişiyle ilişkilendirir.",
      en: "Connects formula, batch, raw material, process, quality, energy, safety and cost change to the same production history.",
    },
  },
  {
    id: "distribution",
    anchor: { tr: "toptan-dagitim", en: "wholesale-distribution" },
    name: { tr: "Toptan satış ve dağıtım", en: "Wholesale and distribution" },
    summary: {
      tr: "Müşteri, ürün, sipariş, fiyat, marj, stok, tahsilat ve sevkiyat değişimlerini aynı ticari akış içinde izler.",
      en: "Monitors customer, product, order, price, margin, inventory, collection and shipment changes in one commercial flow.",
    },
  },
  {
    id: "logistics",
    anchor: { tr: "lojistik", en: "logistics" },
    name: { tr: "Lojistik", en: "Logistics" },
    summary: {
      tr: "Sipariş, araç, rota, kapasite, yük, teslim, gecikme ve maliyet ilişkileriyle taşıma performansını ve riskini araştırır.",
      en: "Investigates transport performance and risk through orders, vehicles, routes, capacity, loads, delivery, delay and cost.",
    },
  },
] as const satisfies readonly Industry[];
