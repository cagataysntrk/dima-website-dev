import { copyNeeded, type L, type Point } from "./types";

/**
 * Open roles and the hiring process. An empty `roles` list renders the "no openings" state;
 * every role added here also emits JobPosting structured data (brief §9).
 */
export interface Role {
  id: string;
  title: L;
  team: L;
  location: L;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "INTERN";
  summary: L;
  responsibilities: L<string[]>;
  requirements: L<string[]>;
  /** ISO date the role was posted, and until when it stays open. */
  datePosted: string;
  validThrough?: string;
}

export const roles: readonly Role[] = [];

/** The hiring steps. The order is real; durations are typical and confirmed in the interview. */
export const hiringSteps: L<(Point & { duration: string })[]> = {
  tr: [
    { title: "Tanışma görüşmesi", body: "Birbirimizi tanıyoruz: ne yaptığınız, ne aradığınız ve bizde işin nasıl yürüdüğü.", duration: "Yaklaşık 30 dakika" },
    { title: "Teknik görüşme", body: "Birlikte çalışacağınız kişiyle: gerçek işten bir problem üstünde nasıl düşündüğünüz.", duration: "Yaklaşık 1 saat" },
    { title: "Ücretli deneme işi", body: "Gerçek işten küçük, ücreti ödenen bir parça; nasıl çalıştığınızı gösterir.", duration: "Birkaç gün" },
    { title: "Teklif", body: "Teklif ve başlama tarihi; kabul ederseniz ekip sizi bekler.", duration: "1 hafta içinde" },
  ],
  en: [
    { title: "Introductory call", body: "We meet: what you've done, what you're looking for, and how work runs here.", duration: "About 30 minutes" },
    { title: "Technical conversation", body: "With the person you'd work with: how you think through a problem from real work.", duration: "About an hour" },
    { title: "Paid trial task", body: "A small, paid slice of real work; it shows how you work.", duration: "A few days" },
    { title: "Offer", body: "The offer and a start date; accept, and the team expects you.", duration: "Within a week" },
  ],
};
