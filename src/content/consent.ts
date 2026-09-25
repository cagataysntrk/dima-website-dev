import type { L } from "./types";

/**
 * The cookie banner. Accept and decline read as plain equals, and the body says what the only
 * non-essential technology is (analytics) and that declining changes nothing else.
 */
export const consentCopy = {
  title: { tr: "Çerez tercihiniz", en: "Your cookie choice" },
  body: {
    tr: "Siteyi nasıl kullandığınızı anlamak için, yalnızca onay verirseniz analitik çerezler kullanıyoruz. Reddederseniz site aynı şekilde çalışır.",
    en: "We use analytics cookies to understand how the site is used, and only if you agree. If you decline, the site works exactly the same.",
  },
  policy: { tr: "Çerez politikası", en: "Cookie policy" },
  accept: { tr: "Kabul et", en: "Accept" },
  reject: { tr: "Reddet", en: "Decline" },
  reopen: { tr: "Çerez tercihleri", en: "Cookie preferences" },
  /** On the cookie policy page, beside the control that reopens the banner. */
  manage: {
    tr: "Analitik çerez tercihinizi istediğiniz zaman değiştirebilirsiniz.",
    en: "You can change your analytics cookie choice at any time.",
  },
} satisfies Record<string, L>;
