import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { legalChrome, legalDocs, type LegalDocId } from "@/content/legal";
import { LegalDocument } from "@/components/sections/legal";
import { JsonLd } from "@/components/json-ld";
import { consentCopy } from "@/content/consent";
import { ConsentReopen } from "@/components/consent/consent-manager";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

/**
 * The three legal routes are one template with a different document. Each route file is a
 * two-line call into here, so the documents cannot drift apart in structure.
 */
export async function legalMetadata(id: LegalDocId, params: Promise<{ locale: string }>): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const doc = legalDocs[id];
  return pageMetadata({ href: doc.href, locale, title: doc.title[locale], description: doc.description[locale] });
}

export async function LegalPage({ id, params }: { id: LegalDocId; params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const doc = legalDocs[id];
  return (
    <>
      <LegalDocument id={id} locale={locale} showDrafterFacts={id !== "terms"}>
        {/* The way to change a cookie choice lives here, beside the policy it acts on (it left
            the footer, 2026-09-15). Withdrawing must stay as easy as agreeing. */}
        {id === "cookies" && (
          <p className="mt-16 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-hairline pt-8 text-ink">
            {consentCopy.manage[locale]}
            <ConsentReopen label={consentCopy.reopen[locale]} />
          </p>
        )}
      </LegalDocument>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: legalChrome.home[locale], href: "/" },
          { name: doc.title[locale], href: doc.href },
        ])}
      />
    </>
  );
}
