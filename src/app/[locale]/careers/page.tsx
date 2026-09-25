import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { hiringSteps, roles } from "@/content/careers";
import { careersPage as copy } from "@/content/pages/careers";
import { teamForDisplay } from "@/content/team";
import { PageHero } from "@/components/sections/page-hero";
import { Principles } from "@/components/sections/home";
import { FactList } from "@/components/sections/about";
import { TeamRow } from "@/components/sections/team-row";
import { RoleList } from "@/components/sections/careers";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, jobPostingJsonLd, pageMetadata } from "@/lib/seo";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

export async function generateMetadata({ params }: PageProps<"/[locale]/careers">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    href: "/careers",
    locale,
    title: copy.meta.title[locale],
    description: copy.meta.description[locale],
  });
}

/** Brief §5: hero, why work here (honestly), how we work, roles, hiring process, CV. */
export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <PageHero title={copy.hero.title[locale]} lede={copy.hero.lede[locale]} />

      <Principles title={copy.why.title[locale]} intro={copy.why.intro[locale]} principles={copy.why.items[locale]} />

      <FactList id="how" title={copy.how.title[locale]} intro={copy.how.intro[locale]} facts={copy.how.facts[locale]} />

      <RoleList locale={locale} roles={roles} copy={copy.roles} />

      <TeamRow
        title={copy.teamwork.title[locale]}
        intro={copy.teamwork.intro[locale]}
        photoLabel={copy.teamwork.photo[locale]}
        members={teamForDisplay.map((m) => ({ id: m.id, name: m.name[locale], role: m.role[locale], photo: m.photo }))}
      />

      <ProcessSteps
        title={copy.hiring.title[locale]}
        intro={copy.hiring.intro[locale]}
        durationLabel={copy.hiring.duration[locale]}
        steps={hiringSteps[locale]}
        layout="timeline"
      />

      <CtaBand
        id="apply"
        title={copy.cta.title[locale]}
        body={`${copy.cta.body[locale]} ${copy.cta.kvkk[locale]}`}
        action={
          <RainbowButton as={Link} href={{ pathname: "/contact", query: { service: "careers" } }}>{copy.cta.action[locale]}</RainbowButton>
        }
      />

      {roles.map((role) => <JsonLd key={role.id} data={jobPostingJsonLd(locale, role)} />)}
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: copy.breadcrumb.home[locale], href: "/" },
          { name: copy.breadcrumb.self[locale], href: "/careers" },
        ])}
      />
    </>
  );
}
