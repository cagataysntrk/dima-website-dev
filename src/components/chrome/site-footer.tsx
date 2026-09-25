import { Footer } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/content/site";
import { social } from "@/content/social";
import { KineticText } from "@/components/vendor/magicui/kinetic-text";
import { SocialIcon } from "./social-icon";

/**
 * The "giant wordmark" footer: the company logo and its social profiles on a slim top row,
 * the sitemap, the legal bar, and "UpcyTech" set very large across the full width in the home
 * headline's face (Geist). The parent brand does not endorse itself, so no endorsement line.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <Footer
      copyrightHolder={site.company.legalName[locale]}
      endorsement={false}
      locale={locale}
      linkAs={Link}
      homeHref="/"
      logo={
        <span className="flex items-center gap-2">
          <img src="/products/dima-mark.webp" alt="" width={30} height={30} loading="lazy" decoding="async" className="size-[1.875rem] shrink-0" />
          <span className="font-[family-name:var(--font-geist-sans)] text-ui font-semibold tracking-[-0.02em] text-ink">
            {site.name}
          </span>
        </span>
      }
      social={social.map((s) => ({ label: s.label, href: s.href, icon: <SocialIcon id={s.id} /> }))}
      wordmark={
        <KineticText
          as="span"
          text={site.name}
          className="inline-block"
          style={{
            "--kinetic-peak": 900,
            "--kinetic-near": 820,
            "--kinetic-far": 760,
          } as React.CSSProperties}
        />
      }
      wordmarkClassName="font-[family-name:var(--font-geist-sans)]"
      groups={site.footer.groups.map((group) => ({
        title: group.title[locale],
        links: group.links.map((link) => ({ label: link.label[locale], href: link.href })),
      }))}
      // No entity line and no cookie-preferences link here — the company's call, 2026-09-15.
      // The registered details stay on the contact page and in the Organization JSON-LD; the
      // way to change a cookie choice moved to the cookie policy page.
    />
  );
}
