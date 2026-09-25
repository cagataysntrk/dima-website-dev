import { Fragment, Suspense, type CSSProperties } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Heading, Link as UiLink, Section, Stack, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import { site } from "@/content/site";
import { contactPage as copy } from "@/content/pages/contact";
import { ContactForm, ContactFormFromParams } from "@/components/contact/contact-form";
import { OfficeMap } from "@/components/contact/office-map";
import { FactList } from "@/components/sections/about";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    href: "/contact",
    locale,
    title: copy.meta.title[locale],
    description: copy.meta.description[locale],
  });
}

const enterDelay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;
const isPlaceholder = (value: string) => value.startsWith("[COPY NEEDED");

/**
 * Brief §5: the form above the fold, then direct channels, the office, the legal entity, and
 * what happens next. A placeholder is shown as text and never as a working link.
 */
export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const company = site.company;
  const value = (entry: { tr: string; en: string }) => entry[locale];
  const email = value(company.email);
  const phone = value(company.phone);
  const linkedin = value(company.linkedin);

  return (
    <>
      <Section rhythm="hero">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="max-lg:order-1 lg:col-span-5">
            <Stack>
              <Heading level={1} variant="display" size="md" className="animate-enter">{copy.hero.title[locale]}</Heading>
              <Text variant="lede" tone="muted" className="animate-enter" style={enterDelay(90)}>{copy.hero.lede[locale]}</Text>
            </Stack>
          </div>

          <div className="animate-enter max-lg:order-2 lg:col-span-7 lg:row-span-2" style={enterDelay(120)}>
            {/* The topic comes from the query string; the static fallback is the same form, empty. */}
            <Suspense fallback={<ContactForm locale={locale} />}>
              <ContactFormFromParams locale={locale} />
            </Suspense>
          </div>

          <div className="max-lg:order-3 lg:col-span-5">
            <Stack gap="tight" className="animate-enter" style={enterDelay(180)}>
              <Heading level={2} variant="subheading">{copy.next.title[locale]}</Heading>
              <ol className="flex flex-col">
                {copy.next.steps[locale].map((step) => (
                  <li key={step} className="border-t border-hairline py-3 text-ui leading-relaxed text-muted">{step}</li>
                ))}
              </ol>
              <p className="font-mono text-micro uppercase text-muted">
                {copy.next.responseLabel[locale]} <span aria-hidden="true" className="opacity-40">·</span>{" "}
                <span className="text-ink">{value(company.responseTime)}</span>
              </p>
            </Stack>
          </div>
        </div>
      </Section>

      <FactList
        id="channels"
        title={copy.channels.title[locale]}
        intro={copy.channels.intro[locale]}
        facts={[
          { label: copy.channels.labels.email[locale], value: isPlaceholder(email) ? email : <UiLink href={`mailto:${email}`}>{email}</UiLink> },
          { label: copy.channels.labels.phone[locale], value: isPlaceholder(phone) ? phone : <UiLink href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</UiLink> },
          // Shown without scheme or trailing slash, breaking only at its slashes: the full URL broke
          // mid-word on a phone ("…/company/upcyte / ch/").
          { label: copy.channels.labels.linkedin[locale], value: isPlaceholder(linkedin) ? linkedin : (
            <UiLink href={linkedin}>
              {linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "").split("/").map((part, i) => (
                <Fragment key={i}>{i > 0 && <>/<wbr /></>}<span className="whitespace-nowrap">{part}</span></Fragment>
              ))}
            </UiLink>
          ) },
        ]}
      />

      <Section divided aria-labelledby="office-title">
        <Reveal className="grid gap-10 lg:grid-cols-12">
          <Stack gap="loose" className="lg:col-span-5">
            <Stack gap="tight">
              <Heading level={2} variant="title" id="office-title">{copy.office.title[locale]}</Heading>
              <Text tone="muted">{copy.office.intro[locale]}</Text>
            </Stack>
            <dl className="flex flex-col">
              {[
                { label: copy.office.labels.address[locale], text: value(company.officeAddress) },
                { label: copy.office.labels.visiting[locale], text: value(company.visiting) },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-1 border-t border-hairline py-4">
                  <dt className="text-ui text-muted">{row.label}</dt>
                  <dd className="text-ink">{row.text}</dd>
                </div>
              ))}
            </dl>
          </Stack>
          <div className="lg:col-span-7">
            <OfficeMap
              coordinates={company.officeCoordinates}
              labels={{
                label: copy.office.map.label[locale],
                openExternal: copy.office.map.openExternal[locale],
                missing: copy.office.map.missing[locale],
                controls: {
                  zoomIn: copy.office.map.controls.zoomIn[locale],
                  zoomOut: copy.office.map.controls.zoomOut[locale],
                  locate: copy.office.map.controls.locate[locale],
                  fullscreen: copy.office.map.controls.fullscreen[locale],
                  resetBearing: copy.office.map.controls.resetBearing[locale],
                },
              }}
            />
          </div>
        </Reveal>
      </Section>

      <FactList
        id="company"
        title={copy.legal.title[locale]}
        intro={copy.legal.intro[locale]}
        facts={[
          { label: copy.legal.labels.legalName[locale], value: value(company.legalName) },
          { label: copy.legal.labels.registeredAddress[locale], value: value(company.registeredAddress) },
          { label: copy.legal.labels.mersis[locale], value: value(company.mersis) },
        ]}
      />

      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: copy.breadcrumb.home[locale], href: "/" },
          { name: copy.breadcrumb.self[locale], href: "/contact" },
        ])}
      />
    </>
  );
}
