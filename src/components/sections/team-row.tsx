import { Section } from "@upcytech/ui";

export interface TeamRowMember {
  id: string;
  name: string;
  role: string;
  photo?: string;
}

/**
 * The team in one row (after Shadcnblocks gallery27, without the carousel — five people fit):
 * the title and intro, then 3:4 portraits with name and role — five across on desktop, three
 * on tablets, two on phones. Portraits are the people's own photos only; without one the card
 * keeps its frame and says so plainly.
 */
export function TeamRow({ title, intro, photoLabel, members }: {
  title: string;
  intro: string;
  photoLabel: string;
  members: readonly TeamRowMember[];
}) {
  return (
    // No divider line on top: on the home page a ribbon separator already sits above it.
    <Section aria-labelledby="team-title">
      <div className="max-w-2xl">
        <h2 id="team-title" className="font-title text-title font-semibold text-balance text-ink">{title}</h2>
        <p className="mt-4 text-lede text-muted">{intro}</p>
      </div>
      {/* Wrapped rows, centred: five people never leave one alone at the edge of a 2- or
          3-column row. Widths are the columns a grid would give (gap-x-5 = 1.25rem). */}
      <ul className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-8">
        {members.map((m) => (
          <li key={m.id} className="w-full min-[360px]:w-[calc((100%-1.25rem)/2)] sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-5rem)/5)]">
            <figure>
              {m.photo ? (
                <img src={m.photo} alt="" width={600} height={800} loading="lazy" decoding="async" className="aspect-[3/4] w-full rounded-card object-cover" />
              ) : (
                <div className="grid aspect-[3/4] w-full place-items-center rounded-card border border-dashed border-outline bg-raised font-mono text-micro uppercase text-muted">
                  {photoLabel}
                </div>
              )}
              <figcaption className="mt-4">
                <p className="font-title text-subtitle font-semibold text-ink">{m.name}</p>
                <p className="mt-1 text-ui text-muted">{m.role}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
