import {
  Heading, Section, Stack, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow,
} from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import type { Product } from "@/content/products";
import type { L } from "@/content/types";
import { Reveal } from "../motion/reveal";
import { StackedRows } from "./parts";

/**
 * Product → problem → audience, so the portfolio reads as one argument rather than a pile
 * of cards. Five accents can share this screen (D-029): each is only the brand dot.
 */
export function PositioningMatrix({ locale, products, copy }: {
  locale: Locale;
  products: readonly Product[];
  copy: {
    title: L; caption: L;
    columns: { product: L; problem: L; audience: L };
  };
}) {
  return (
    <Section divided aria-labelledby="matrix-title">
      <Reveal>
      <Stack gap="loose">
        <Heading level={2} variant="title" id="matrix-title">{copy.title[locale]}</Heading>
        {/* Below sm the three columns would squeeze into slivers: a phone gets the rows as
            stacked blocks (StackedRows), and the table — not restacked with CSS display, which
            drops table semantics in Safari — takes over from sm. Between sm and ~42rem it still
            scrolls inside its own container; .table-scroll fades the trailing edge. */}
        <StackedRows
          caption={copy.caption[locale]}
          rows={products.map((product) => ({
            key: product.id,
            brand: product.brandKey,
            head: (
              <a href={`#${product.slug}`} translate="no"
                 className="inline-flex min-h-11 items-center gap-2 text-ink no-underline hoverable:hover:text-brand-text">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-chip bg-brand" />
                {product.name}
              </a>
            ),
            cells: [
              { label: copy.columns.problem[locale], value: product.matrix.problem[locale] },
              { label: copy.columns.audience[locale], value: product.matrix.audience[locale], muted: true },
            ],
          }))}
        />
        <div className="table-scroll max-sm:hidden">
        <Table caption={copy.caption[locale]} scrollLabel={copy.caption[locale]} className="min-w-2xl">
          <TableHead>
            <TableRow>
              <TableHeaderCell>{copy.columns.product[locale]}</TableHeaderCell>
              <TableHeaderCell>{copy.columns.problem[locale]}</TableHeaderCell>
              <TableHeaderCell>{copy.columns.audience[locale]}</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} data-brand={product.brandKey}>
                <TableHeaderCell scope="row" className="whitespace-nowrap">
                  <a href={`#${product.slug}`} translate="no"
                     className="inline-flex items-center gap-2 text-ink no-underline hoverable:hover:text-brand-text pointer-coarse:min-h-11">
                    <span aria-hidden="true" className="size-2 shrink-0 rounded-chip bg-brand" />
                    {product.name}
                  </a>
                </TableHeaderCell>
                <TableCell>{product.matrix.problem[locale]}</TableCell>
                <TableCell className="text-muted">{product.matrix.audience[locale]}</TableCell>
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
