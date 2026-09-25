import type { ReactNode } from "react";
import { ChevronDown, Cookie, Info, ScrollText, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn, Heading, Section, Text } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { drafterFacts, legalChrome, legalDocs, type LegalDocId } from "@/content/legal";
import { formatPostDate } from "./blog";

const ICONS: Record<LegalDocId, LucideIcon> = { kvkk: ShieldCheck, cookies: Cookie, terms: ScrollText };
const ORDER = Object.keys(legalDocs) as LegalDocId[];

/** The documents, with the open one's sections under it — the sidebar and the phone drop-down. */
function DocNav({ active, locale }: { active: LegalDocId; locale: Locale }) {
  return (
    <nav aria-label={legalChrome.sectionsLabel[locale]}>
      <p className="mb-3 px-3 font-mono text-micro uppercase text-muted">{legalChrome.sectionsLabel[locale]}</p>
      <ul className="flex flex-col gap-1">
        {ORDER.map((key) => {
          const doc = legalDocs[key];
          const Icon = ICONS[key];
          const open = key === active;
          return (
            <li key={key}>
              <Link
                href={doc.href}
                aria-current={open ? "page" : undefined}
                className={cn(
                  "group flex min-h-11 items-center gap-2.5 rounded-control px-3 text-ui font-medium no-underline transition-colors duration-160 ease-out-expo",
                  open ? "bg-raised text-ink" : "text-muted hoverable:hover:bg-raised hoverable:hover:text-ink",
                )}
              >
                <span aria-hidden="true" className={cn("h-5 w-0.5 shrink-0 rounded-full", open ? "bg-brand" : "bg-transparent")} />
                <Icon aria-hidden="true" className={cn("size-3.5 shrink-0", open ? "text-brand-text" : "text-muted")} />
                <span className="truncate">{doc.title[locale]}</span>
              </Link>
              {open && (
                <ul className="ml-9 mt-1 flex flex-col gap-0.5">
                  {doc.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="flex min-h-11 items-center rounded-control px-3 py-1.5 text-ui text-muted no-underline transition-colors duration-160 ease-out-expo hoverable:hover:text-ink">
                        {s.title[locale]}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * One legal document, laid out after the sister site's legal page: a centred hero, then a
 * sticky sidebar of the three documents (the open one's sections beneath it) beside a single
 * reading column. On phones the sidebar is a sticky native <details> drop-down — no script.
 * Each document keeps its own URL. A plain notice says so while the text is still to come.
 */
export function LegalDocument({ id, locale, showDrafterFacts = false, children }: {
  id: LegalDocId;
  locale: Locale;
  showDrafterFacts?: boolean;
  /** Anything that belongs with this document, at the end of the reading column. */
  children?: ReactNode;
}) {
  const doc = legalDocs[id];
  const Icon = ICONS[id];

  return (
    <>
      <div className="relative isolate">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_28%,color-mix(in_oklab,var(--color-text-brand)_10%,transparent),transparent_65%)]" />
        <Section rhythm="hero">
          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-enter font-mono text-micro uppercase text-brand-text">{legalChrome.eyebrow[locale]}</p>
            <Heading level={1} variant="display" size="md" className="mt-4 animate-enter text-balance">{doc.title[locale]}</Heading>
            <Text variant="lede" tone="muted" className="mx-auto mt-6 max-w-2xl animate-enter text-balance">{doc.description[locale]}</Text>
          </div>
        </Section>
      </div>

      <div className="mx-auto w-full max-w-content px-6 pb-24">
        <details className="group sticky top-(--nav-offset) z-20 -mx-6 border-y border-hairline bg-canvas/90 backdrop-blur-xl lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-6 py-3 text-ui font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <Icon aria-hidden="true" className="size-4 text-brand-text" />
              {doc.title[locale]}
            </span>
            <ChevronDown aria-hidden="true" className="size-4 text-muted transition-transform duration-200 ease-out-expo group-open:rotate-180" />
          </summary>
          <div className="px-3 pb-4">
            <DocNav active={id} locale={locale} />
          </div>
        </details>

        <div className="lg:flex lg:gap-12">
          <aside className="hidden lg:sticky lg:top-[calc(var(--nav-offset)+1.5rem)] lg:block lg:max-h-[calc(100svh-var(--nav-offset)-3rem)] lg:w-64 lg:shrink-0 lg:self-start lg:overflow-y-auto lg:py-12">
            <DocNav active={id} locale={locale} />
          </aside>

          <div className="min-w-0 flex-1 py-12 lg:border-l lg:border-hairline lg:pl-12">
            <p className="border-b border-hairline pb-8 font-mono text-micro uppercase text-muted">
              {legalChrome.updated[locale]} <span aria-hidden="true" className="opacity-40">·</span>{" "}
              {doc.updated
                ? <time dateTime={doc.updated} className="text-ink">{formatPostDate(doc.updated, locale)}</time>
                : <span className="text-ink">{legalChrome.notYet[locale]}</span>}
            </p>

            {!doc.updated && (
              <div className="mt-8 flex items-start gap-3 rounded-panel border border-outline bg-raised px-4 py-3">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-text" />
                <div>
                  <p className="text-ui font-medium text-ink">{legalChrome.draft.title[locale]}</p>
                  <p className="mt-0.5 text-ui text-muted">{legalChrome.draft.body[locale]}</p>
                </div>
              </div>
            )}

            <div className="mt-12 flex flex-col gap-12">
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="flex scroll-mt-[calc(var(--nav-offset)+4rem)] flex-col gap-3">
                  <Heading level={2} variant="subtitle" id={`${s.id}-title`}>{s.title[locale]}</Heading>
                  {s.body[locale].map((p, i) => <Text key={i}>{p}</Text>)}
                </section>
              ))}
            </div>

            {showDrafterFacts && (
              <aside aria-labelledby="drafter-title" className="mt-16 flex flex-col gap-3 rounded-panel border border-dashed border-outline p-card">
                <Heading level={2} variant="subheading" id="drafter-title">{legalChrome.drafter.title[locale]}</Heading>
                <Text variant="small" tone="muted">{legalChrome.drafter.note[locale]}</Text>
                <ul className="flex list-disc flex-col gap-2 pl-5 text-ui leading-relaxed text-ink marker:text-muted">
                  {drafterFacts[locale].map((fact) => <li key={fact}>{fact}</li>)}
                </ul>
              </aside>
            )}

            {children}
          </div>
        </div>
      </div>
    </>
  );
}
