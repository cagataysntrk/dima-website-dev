import {
  Heading, Section, Stack, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text,
} from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import type { Framework } from "@/content/industries";
import type { L } from "@/content/types";
import { Reveal } from "../motion/reveal";
import { StackedRows } from "./parts";

/**
 * What each framework asks and where we stand on it. Status is plain text, not a coloured
 * badge: "consulting" and "preparing" are facts about delivery, not states to be alarmed by.
 */
export function FrameworkTable({ locale, frameworks, copy }: {
  locale: Locale;
  frameworks: readonly Framework[];
  copy: {
    title: L; intro: L; caption: L;
    columns: { framework: L; covers: L; status: L };
  };
}) {
  return (
    <Section divided aria-labelledby="frameworks-title">
      <Reveal>
      <Stack gap="loose">
        <Stack gap="tight">
          <Heading level={2} variant="title" id="frameworks-title">{copy.title[locale]}</Heading>
          <Text tone="muted">{copy.intro[locale]}</Text>
        </Stack>
        {/* Phones get the rows stacked (see PositioningMatrix); the table from sm. */}
        <StackedRows
          caption={copy.caption[locale]}
          captionHidden
          rows={frameworks.map((framework, i) => ({
            key: String(i),
            head: framework.name[locale],
            cells: [
              { label: copy.columns.covers[locale], value: framework.covers[locale], muted: true },
              { label: copy.columns.status[locale], value: framework.status[locale] },
            ],
          }))}
        />
        <div className="table-scroll max-sm:hidden">
        <Table caption={copy.caption[locale]} captionHidden scrollLabel={copy.caption[locale]} className="min-w-2xl">
          <TableHead>
            <TableRow>
              <TableHeaderCell>{copy.columns.framework[locale]}</TableHeaderCell>
              <TableHeaderCell>{copy.columns.covers[locale]}</TableHeaderCell>
              <TableHeaderCell>{copy.columns.status[locale]}</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {frameworks.map((framework, i) => (
              <TableRow key={i}>
                <TableHeaderCell scope="row">{framework.name[locale]}</TableHeaderCell>
                <TableCell className="text-muted">{framework.covers[locale]}</TableCell>
                <TableCell>{framework.status[locale]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </Stack>
      </Reveal>
    </Section>
  );
}
