"use client";

import { hasLocale, useLocale } from "next-intl";
import { Button } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";

/** A failed render under a known locale. The providers above still hold, so the locale is at hand. */
export default function LocaleError({ reset }: { reset: () => void }) {
  const requested = useLocale();
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const copy = site.chrome.failure;

  return (
    <PageHero
      title={copy.title[locale]}
      lede={copy.body[locale]}
      action={
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={reset}>{copy.retry[locale]}</Button>
          <Button variant="secondary" asChild>
            <Link href="/contact">{copy.contact[locale]}</Link>
          </Button>
        </div>
      }
    />
  );
}
