import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { Button } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";

/** Unknown addresses under a known locale. The locale comes from the URL the visitor asked for. */
export default async function LocaleNotFound() {
  const requested = await getLocale().catch(() => routing.defaultLocale);
  const locale: Locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const copy = site.chrome.notFound;

  return (
    <PageHero
      title={copy.title[locale]}
      lede={copy.body[locale]}
      action={
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" asChild>
            <Link href="/">{copy.home[locale]}</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/contact">{copy.contact[locale]}</Link>
          </Button>
        </div>
      }
    />
  );
}
