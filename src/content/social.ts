/**
 * The company's social accounts, as listed on upcyman.com's footer (UpcyMan repo,
 * MarketingFooter.tsx). [CONFIRM] each is live and still the company's. `id` picks the icon;
 * the label is the network's own name, the same in both languages.
 */
export const social = [
  { id: "instagram", label: "Instagram", href: "https://instagram.com/upcytech" },
  { id: "x", label: "X (Twitter)", href: "https://x.com/upcytech" },
  { id: "facebook", label: "Facebook", href: "https://facebook.com/upcytech" },
] as const;

export type SocialId = (typeof social)[number]["id"];
