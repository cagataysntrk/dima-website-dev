import { Heading, Section, Stack, Text } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Role } from "@/content/careers";
import type { L } from "@/content/types";
import { Reveal, RevealItem } from "../motion/reveal";
import { RainbowButton } from "@/components/vendor/magicui/rainbow-button";

/**
 * Open roles, or an honest empty state. An empty list is a state to design, not a gap to hide:
 * it says plainly there is nothing advertised and offers the next step.
 */
export function RoleList({ locale, roles, copy }: {
  locale: Locale;
  roles: readonly Role[];
  copy: { title: L; none: L; labels: { responsibilities: L; requirements: L; apply: L } };
}) {
  return (
    <Section divided aria-labelledby="roles-title">
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <Heading level={2} variant="title" id="roles-title" className="lg:col-span-5">{copy.title[locale]}</Heading>

        {roles.length === 0 ? (
          <Text className="border-t border-hairline pt-4 lg:col-span-7">{copy.none[locale]}</Text>
        ) : (
          <Reveal as="ul" stagger className="flex flex-col lg:col-span-7">
            {roles.map((role) => (
              <RevealItem as="li" key={role.id} className="flex flex-col gap-4 border-t border-hairline py-6">
                <Stack gap="tight">
                  <Heading level={3} variant="subtitle">{role.title[locale]}</Heading>
                  <Text variant="small" tone="muted">{role.team[locale]} · {role.location[locale]}</Text>
                  <Text>{role.summary[locale]}</Text>
                </Stack>
                {([["responsibilities", role.responsibilities], ["requirements", role.requirements]] as const).map(([key, list]) => (
                  <Stack key={key} gap="tight">
                    <Heading level={4} variant="subheading">{copy.labels[key][locale]}</Heading>
                    <ul className="flex list-disc flex-col gap-1 pl-5 text-muted marker:text-muted">
                      {list[locale].map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </Stack>
                ))}
                <div>
                  <RainbowButton as={Link} href={{ pathname: "/contact", query: { service: "careers", role: role.id } }}>{copy.labels.apply[locale]}</RainbowButton>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </Reveal>
    </Section>
  );
}
