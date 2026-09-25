import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Page copy lives in typed content files (src/content), not in message catalogues, so a
 * missing English string is a type error rather than a runtime fallback. next-intl is
 * here for routing, locale context and formatting.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: {} };
});
