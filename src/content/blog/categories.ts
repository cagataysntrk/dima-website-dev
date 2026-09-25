import type { L } from "../types";

/** Blog/resource categories. Author ownership stays explicit in each post's metadata. */
export const categories = [
  { id: "compliance", label: { tr: "Kanıt & yönetişim", en: "Evidence & governance" } },
  { id: "data", label: { tr: "Veri & karar", en: "Data & decisions" } },
  { id: "operations", label: { tr: "Üretim & operasyon", en: "Manufacturing & operations" } },
  { id: "company", label: { tr: "Dima & şirket", en: "Dima & company" } },
] as const satisfies readonly { id: string; label: L }[];

export type CategoryId = (typeof categories)[number]["id"];
