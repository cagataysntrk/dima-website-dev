import type { L } from "../types";

export const categories = [
  { id: "compliance", label: { tr: "Kanıt ve yönetişim", en: "Evidence and governance" } },
  { id: "data", label: { tr: "Veri ve karar", en: "Data and decisions" } },
  { id: "operations", label: { tr: "Üretim ve operasyon", en: "Manufacturing and operations" } },
  { id: "company", label: { tr: "Dima ve şirket", en: "Dima and company" } },
] as const satisfies readonly { id: string; label: L }[];

export type CategoryId = (typeof categories)[number]["id"];
