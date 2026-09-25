import { Heading, Section, Stack, Text } from "@upcytech/ui";

/**
 * No locale prefix, so no locale to render in: both languages, each pointing at its own home.
 * Only reachable with an address the middleware itself does not recognise.
 */
export default function RootNotFound() {
  return (
    <Section rhythm="hero">
      <Stack gap="loose">
        <Stack>
          <Heading level={1} variant="display" size="lg" className="max-w-[20ch]">
            Böyle bir sayfa yok · There is no such page
          </Heading>
          <Text variant="lede" tone="muted">
            Adresi yanlış yazmış olabilirsiniz. / The address may be mistyped.
          </Text>
        </Stack>
        <div className="flex flex-wrap gap-4 font-mono text-micro uppercase">
          <a href="/tr" className="underline underline-offset-4">Türkçe ana sayfa</a>
          <a href="/en" className="underline underline-offset-4">English home page</a>
        </div>
      </Stack>
    </Section>
  );
}
