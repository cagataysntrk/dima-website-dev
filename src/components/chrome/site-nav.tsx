"use client";

import { useParams } from "next/navigation";
import { Button, Nav, ThemeToggle } from "@upcytech/ui";
import { Link, getPathname, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/content/site";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

/** The floating glass capsule (D-032), links centred, with the contact action as the site's rainbow CTA — rim only, no glow (D-037). */
export function SiteNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const params = useParams();
  const other = site.chrome.switchTo[locale];

  return (
    <Nav
      variant="floating"
      collapseAt="lg"
      align="center"
      resetKey={`${locale}:${pathname}`}
      // Fixed, not the design system's sticky (D-039): out of the flow, so main's
      // --nav-offset padding is the only space above the content.
      className="fixed inset-x-0 top-(--nav-top) mx-3 sm:mx-4 md:mx-6 lg:mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] lg:w-full"
      product={site.name}
      logo={
        // The company logo (ink for light grounds, white for dark; swapped in globals.css).
        // Sized by width so the wordmark matches across themes; width/height reserve the box.
        <>
          <img src="/brand/upcytech-logo-on-light.png" alt="" width={338} height={64} className="logo-on-light h-auto w-[6.75rem] sm:w-[8.25rem] cursor-pointer pointer-events-none select-none" />
          <img src="/brand/upcytech-logo-on-dark.png" alt="" width={338} height={78} className="logo-on-dark h-auto w-[6.75rem] sm:w-[8.25rem] cursor-pointer pointer-events-none select-none" />
        </>
      }
      homeHref="/"
      locale={locale}
      linkAs={Link}
      items={site.nav.map((item) => ({
        label: item.label[locale],
        href: item.href,
        // next-intl's usePathname shape is version-defined (internal or localized);
        // accept either, so the current page is always marked.
        current: [item.href, getPathname({ href: item.href, locale })].includes(pathname),
      }))}
      utilities={
        <>
        <ThemeToggle locale={locale} />
        <Button variant="ghost" size="sm" asChild>
          <Link
            // @ts-expect-error -- next-intl types each pathname with its own params. The current
            // route's pathname and params always belong together, so the pair is valid here.
            href={{ pathname, params }}
            locale={other.locale}
            hrefLang={other.locale}
            lang={other.locale}
            aria-label={other.name}
          >
            {other.short}
          </Link>
        </Button>
        </>
      }
      actions={
        <RainbowButton as={Link} href={site.navAction.href} size="sm" glow={false} className="px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-ui">
          {site.navAction.label[locale]}
        </RainbowButton>
      }
    />
  );
}
