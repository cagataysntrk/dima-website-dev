import type { L } from "../types";

/**
 * Blog categories. A post names one by id; the index filters on it (?kategori=…).
 *
 * House rule for `author` (the company's call, 2026-09-17): the author follows the
 * post's product — UpcyCarbon posts are Enes (member-1), UpcyOps posts are
 * C. Çağatay Şentürk (member-3), UpcyMan posts are Y. Hamza Çelebi (member-5),
 * and Dima posts are A. Harun Öztürk (member-4).
 */
export const categories = [
  { id: "compliance", label: { tr: "Karbon ve uyum", en: "Carbon and compliance" } },
  { id: "data", label: { tr: "Veri ve raporlama", en: "Data and reporting" } },
  { id: "operations", label: { tr: "Üretim operasyonu", en: "Operations" } },
  { id: "company", label: { tr: "Şirket", en: "Company" } },
] as const satisfies readonly { id: string; label: L }[];

export type CategoryId = (typeof categories)[number]["id"];
