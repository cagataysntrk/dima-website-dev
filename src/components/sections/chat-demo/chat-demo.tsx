"use client";

import * as React from "react";
import {
  ArrowUp, Check, ChevronDown, ChevronRight, ChevronsUpDown, Database, FileSearch, Gauge, LayoutDashboard,
  Loader, MessageSquarePlus, MessagesSquare, Mic, PanelLeft, PanelRight, Paperclip, PenLine, Plus, Save,
  Search, Square, type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { BrandKey } from "@/content/products";
import type { ChatDemoCopy, LocalScenario, ScenarioId } from "@/content/dima-demo";
import { useIsDark } from "@/components/theme/use-is-dark";
import { match, play, type DemoEvent } from "./engine";
import { PocChart, type ChartKind, type ChartRow } from "./poc-chart";
import { SqlBlock } from "./sql-block";
import { Beam, Orb } from "./effects";

/**
 * The scripted chat demo (D-040): a copy of the analytics product's chat screen — its PoC
 * (dima/frontend/apps/metabase-poc: AppShell, AppSidebar, ChatView, Composer, ResultView) —
 * with its sidebar, 48px top bar, hero composer, turns, result card, query and follow-ups, in
 * its own classes and proportions over this site's tokens (globals.css, .dima-app). The script
 * lives in content/dima-demo.ts and plays through engine.ts, which emits the product's own event
 * stream. No network, no model; the panel says "sample data".
 *
 * The panel has a fixed height — capped to the screen under the nav, never below 24rem — and
 * scrolls inside itself, so a streaming answer never moves the page. The sidebar sits inline
 * when the panel is at least 48rem wide (the product's md), and opens as a drawer below that,
 * as the product's does on a phone. Under reduced motion answers arrive whole. Screen readers
 * hear "preparing", then the finished answer once — not every token.
 */

interface Step { id: number; text: string; done: boolean }

interface Turn {
  id: number;
  question: string;
  scenario: LocalScenario | null;
  steps: Step[];
  text: string;
  status: "pending" | "done" | "stopped";
  durationMs?: number;
  suggestions?: ScenarioId[];
}

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

function apply(turn: Turn, event: DemoEvent): Turn {
  switch (event.type) {
    case "step": {
      const steps = turn.steps.some((s) => s.id === event.id)
        ? turn.steps.map((s) => (s.id === event.id ? { id: s.id, text: event.text, done: event.done } : s))
        : [...turn.steps, { id: event.id, text: event.text, done: event.done }];
      return { ...turn, steps };
    }
    case "token": return { ...turn, text: turn.text + event.text };
    case "done": return { ...turn, status: "done", durationMs: event.durationMs };
    case "suggestions": return { ...turn, suggestions: event.items };
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * The panel's own width (a container, not the viewport): 48rem and up is "wide". Only consulted
 * once someone toggles the sidebar — the default layout is a container query, right from the
 * server's HTML, so a phone never renders the inline sidebar first.
 */
function useWide(ref: React.RefObject<HTMLElement | null>) {
  const [wide, setWide] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWide((entry?.contentRect.width ?? 0) >= 768));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return wide;
}

export function ChatDemo({ copy, locale, product }: {
  copy: ChatDemoCopy;
  locale: Locale;
  product: { name: string; brandKey: BrandKey };
}) {
  const [turns, setTurns] = React.useState<Turn[]>([]);
  const [draft, setDraft] = React.useState("");
  const [announce, setAnnounce] = React.useState("");
  // Server-rendered starters are inert until hydration; tests and the capture script wait for this.
  const [ready, setReady] = React.useState(false);
  // null: the product's default — the sidebar open when there is room, closed when there is not.
  const [rail, setRail] = React.useState<boolean | null>(null);
  const reduced = useReducedMotion();
  const dark = useIsDark();
  const root = React.useRef<HTMLDivElement>(null);
  const wide = useWide(root);
  const controller = React.useRef<AbortController | null>(null);
  const nextId = React.useRef(1);
  const thread = React.useRef<HTMLDivElement>(null);
  const input = React.useRef<HTMLTextAreaElement>(null);
  // Follow the answer down only while the reader is at the bottom; scrolling up stops it.
  const stick = React.useRef(true);
  const uid = React.useId();
  const inputId = `${uid}-input`;
  const startersId = `${uid}-starters`;

  const pending = turns.some((t) => t.status === "pending");
  const started = turns.length > 0;
  // null (the product's default): the sidebar inline where there is room — decided by CSS.
  const auto = rail === null;
  const railShown = rail ?? wide;
  const number = React.useMemo(() => new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-GB", { maximumFractionDigits: 1 }), [locale]);

  React.useEffect(() => {
    setReady(true);
    return () => controller.current?.abort();
  }, []);

  React.useEffect(() => {
    const el = thread.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [turns]);

  /**
   * `from` decides where focus lands: the first question moves the composer from the hero to the
   * floating footer, and a starter or follow-up button disappears once clicked — either way focus
   * would fall to <body>. Typed questions keep the (new) composer; a clicked question lands on the
   * thread, so a phone does not raise its keyboard.
   */
  const ask = async (question: string, from: "composer" | "button") => {
    const text = question.trim();
    // The ref, not `pending`: two submits in one frame both see the pre-render state.
    if (!text || controller.current) return;
    const scenario = match(copy, text);
    const id = nextId.current++;
    stick.current = true;
    setDraft("");
    if (!wide) setRail(null);
    setTurns((all) => [...all, { id, question: text, scenario, steps: [], text: "", status: "pending" }]);
    setAnnounce(copy.working);
    requestAnimationFrame(() => (from === "composer" ? input.current : thread.current)?.focus({ preventScroll: true }));

    const run = new AbortController();
    controller.current = run;
    try {
      for await (const event of play(copy, scenario, { signal: run.signal, instant: reduced })) {
        setTurns((all) => all.map((t) => (t.id === id ? apply(t, event) : t)));
        if (event.type === "done") {
          const answer = scenario?.answer ?? copy.fallback.answer;
          setAnnounce(`${copy.ready}. ${answer.join(" ").replace(/\*\*/g, "").replace(/(^|\s)- /g, "$1")}`);
        }
      }
    } catch {
      // Stopped, reset, or anything else: the turn ends either way, never left pending.
      setTurns((all) => all.map((t) => (t.id === id && t.status === "pending" ? { ...t, status: "stopped" } : t)));
    } finally {
      if (controller.current === run) controller.current = null;
    }
  };

  // Released at once, not in the stopped run's `finally`, so the next question is never refused.
  const cancel = () => {
    controller.current?.abort();
    controller.current = null;
  };

  const stop = () => {
    cancel();
    setAnnounce(copy.stopped);
  };

  const newChat = () => {
    cancel();
    setTurns([]);
    setDraft("");
    setAnnounce("");
    if (!wide) setRail(null);
    requestAnimationFrame(() => input.current?.focus());
  };

  /** A chat in the sidebar: a fresh conversation that asks its question. */
  const openChat = (question: string) => {
    newChat();
    requestAnimationFrame(() => void askRef.current(question, "button"));
  };

  // Stable for the memoised turns: the latest `ask` through a ref.
  const askRef = React.useRef(ask);
  askRef.current = ask;
  const onAsk = React.useCallback((question: string) => void askRef.current(question, "button"), []);
  const last = turns.at(-1);
  const current = turns[0]?.scenario?.title ?? turns[0]?.question;
  const initial = copy.shell.user.slice(0, 1).toLocaleUpperCase(locale);

  const composer = (hero: boolean) => {
    const box = (
      <div className="relative flex flex-col rounded-[1.75rem] border border-[var(--dima-edge)] bg-surface shadow-[var(--dima-shadow)] transition-[border-color,box-shadow] focus-within:border-[color-mix(in_oklab,var(--color-bg-brand)_40%,transparent)]">
        <label htmlFor={inputId} className="sr-only">{copy.composerLabel}</label>
        <textarea
          ref={input}
          id={inputId}
          rows={hero ? 2 : 1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void ask(draft, "composer"); }
          }}
          placeholder={copy.placeholder}
          className={`max-h-52 w-full resize-none bg-transparent px-5 text-base text-ink outline-none [field-sizing:content] placeholder:text-[color-mix(in_oklab,var(--color-text-muted)_70%,transparent)] focus-visible:outline-none md:text-[15px] ${hero ? "min-h-20 pt-5 pb-2" : "min-h-12 pt-4 pb-1"}`}
        />
        <div className="flex items-center gap-1 px-3 pb-3">
          {/* The product's attach, depth and dictation controls — shown, not wired: the demo has no files, one depth and no microphone. */}
          <span aria-hidden="true" title={copy.attach} className="grid size-8 place-items-center rounded-full text-muted"><Plus className="size-5" /></span>
          <div className="ml-auto flex items-center gap-1">
            <span aria-hidden="true" className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-sm text-muted">
              <Gauge className="size-4" />
              <span className="hidden @sm:inline">{copy.depthNormal}</span>
              <ChevronDown className="size-3.5 opacity-70" />
            </span>
            <span aria-hidden="true" title={copy.dictation} className="grid size-9 place-items-center rounded-full text-muted"><Mic className="size-4" /></span>
            {pending ? (
              <button type="button" onClick={stop} aria-label={copy.stop}
                      className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-ink text-canvas transition-opacity hoverable:hover:opacity-90 pointer-coarse:size-11">
                <Square aria-hidden="true" className="size-3.5 fill-current" />
              </button>
            ) : (
              <button type="submit" aria-label={copy.send} disabled={!draft.trim()}
                      className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-brand text-on-brand transition-[filter] hoverable:hover:brightness-110 disabled:cursor-not-allowed disabled:bg-[var(--dima-muted)] disabled:text-muted pointer-coarse:size-11">
                <ArrowUp aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
    return (
      <form onSubmit={(e) => { e.preventDefault(); void ask(draft, "composer"); }} className="relative rounded-[1.75rem]">
        {hero ? <Beam dark={dark} ready={ready}>{box}</Beam> : box}
      </form>
    );
  };

  const sidebar = (
    <aside
      className={[
        "w-64 shrink-0 flex-col border-r border-hairline bg-[var(--dima-sidebar)]",
        auto ? "hidden @3xl:flex" : wide ? "flex" : "absolute inset-y-0 left-0 z-30 flex shadow-[var(--dima-shadow-raised)]",
      ].join(" ")}
    >
      <div className="flex h-12 items-center justify-between px-4">
        <span className="inline-flex items-center gap-2 text-ink">
          <img src="/products/dima-mark.png" alt="" width={271} height={256} className="partner-white-on-dark h-6 w-auto" />
          <span translate="no" className="text-base leading-none font-semibold tracking-tight">{product.name}</span>
        </span>
        <span aria-hidden="true" className="grid size-7 place-items-center rounded-md text-muted"><Search className="size-4" /></span>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        <button type="button" onClick={newChat} data-active={!started || undefined}
                className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm text-ink transition-colors hoverable:hover:bg-[var(--dima-secondary)] data-[active]:bg-[var(--dima-secondary)] data-[active]:font-medium pointer-coarse:h-11">
          <MessageSquarePlus aria-hidden="true" className="size-4 shrink-0" />{copy.shell.newChat}
        </button>
        {([[Paperclip, copy.shell.attachments], [Database, copy.shell.data]] as const).map(([Icon, label]) => (
          <span key={label} aria-hidden="true" className="flex h-8 items-center gap-2 rounded-md p-2 text-sm text-ink">
            <Icon className="size-4 shrink-0" />{label}
          </span>
        ))}
      </nav>
      <div className="flex min-h-0 flex-1 flex-col p-2">
        <p className="flex h-8 items-center gap-1 px-2 text-xs font-medium text-[color-mix(in_oklab,var(--color-text-primary)_70%,transparent)]">
          <ChevronDown aria-hidden="true" className="size-3.5" />
          {copy.shell.chats}
          <span className="ml-auto text-[11px] font-normal tabular-nums text-muted">{copy.scenarios.length}</span>
        </p>
        <ul className="flex min-h-0 flex-col gap-1 overflow-y-auto">
          {copy.scenarios.map((s) => {
            const active = current === s.title;
            return (
              <li key={s.id}>
                <button type="button" onClick={() => (active ? undefined : openChat(s.question))} data-active={active || undefined}
                        className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm text-ink transition-colors hoverable:hover:bg-[var(--dima-secondary)] data-[active]:bg-[var(--dima-secondary)] data-[active]:font-medium pointer-coarse:h-11">
                  <MessagesSquare aria-hidden="true" className="size-4 shrink-0" />
                  <span className="truncate">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div aria-hidden="true" className="flex flex-col gap-2 p-2">
        <span className="flex h-9 w-full items-center gap-2 rounded-full bg-brand px-3 text-sm font-medium text-on-brand shadow-[var(--dima-shadow)]">
          <span className="size-[18px] rounded-full border-2 border-[color-mix(in_oklab,var(--color-fg-on-brand)_35%,transparent)] border-t-on-brand" />
          {copy.shell.start}
          <span className="ml-auto text-xs tabular-nums opacity-80">1/4</span>
          <ChevronDown className="size-3.5" />
        </span>
        <span className="-mx-2 border-t border-hairline" />
        <span className="flex h-12 items-center gap-2 rounded-md p-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-xs font-semibold text-on-brand">{initial}</span>
          <span className="grid min-w-0 flex-1 leading-tight">
            <span className="truncate text-sm font-medium text-ink">{copy.shell.user}</span>
            <span className="truncate text-xs text-muted">{copy.shell.company}</span>
          </span>
          <ChevronsUpDown className="size-4 text-muted" />
        </span>
      </div>
    </aside>
  );

  return (
    <div
      ref={root}
      data-chat-demo=""
      data-state={pending ? "running" : started ? "done" : "idle"}
      data-ready={ready ? "true" : undefined}
      data-brand={product.brandKey}
      className="dima-app @container relative flex h-[min(42rem,max(24rem,calc(100svh-var(--nav-offset)-2rem)))] w-full overflow-hidden rounded-panel border border-hairline bg-canvas text-ink shadow-sm"
    >
      {rail !== false && sidebar}
      {rail === true && !wide && (
        <button type="button" aria-label={copy.shell.closeSidebar} onClick={() => setRail(false)}
                className="absolute inset-0 z-20 cursor-default bg-[color-mix(in_oklab,var(--color-bg-canvas)_60%,transparent)]" />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center gap-1 px-2">
          <button type="button" onClick={() => setRail(!railShown)} aria-label={copy.shell.toggleSidebar} aria-expanded={railShown}
                  className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-md text-muted transition-colors hoverable:hover:text-ink pointer-coarse:size-11">
            <PanelLeft aria-hidden="true" className="size-4" />
          </button>
          {rail !== true && (
            <span aria-hidden="true" className={`ml-1 inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-[var(--dima-edge)] px-2.5 text-xs text-muted ${auto ? "@3xl:hidden" : ""}`}>
              <Search className="size-3.5" /><span className="hidden @sm:inline">{copy.shell.search}</span>
            </span>
          )}
          {current && <span className="min-w-0 truncate rounded-md px-2 py-1 text-sm text-muted">{current}</span>}
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <span className="rounded-full border border-[var(--dima-edge)] px-2 py-0.5 font-mono text-micro uppercase text-muted">{copy.sampleData}</span>
            {started && <span aria-hidden="true" className="grid size-8 place-items-center rounded-md text-muted"><PanelRight className="size-4" /></span>}
          </div>
        </div>

        {!started ? (
          <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto py-6">
            {/* m-auto, not justify-center: in a short panel justify-center pushes the top out of the scroll's reach. */}
            <div className="m-auto w-full max-w-3xl space-y-6 px-4 pb-10">
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">{copy.emptyTitle}</h3>
                <p className="text-sm text-muted">{fill(copy.emptyBody, { company: copy.shell.company })}</p>
              </div>
              {composer(true)}
              <div>
                <p id={startersId} className="sr-only">{copy.startersLabel}</p>
                <ul aria-labelledby={startersId} className="grid gap-2 @xl:grid-cols-2">
                  {copy.scenarios.map((s) => (
                    <li key={s.id}>
                      <button type="button" onClick={() => void ask(s.question, "button")}
                              className="dima-surface dima-interactive size-full min-h-11 cursor-pointer px-4 py-3 text-left text-sm text-ink">
                        {s.question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative min-h-0 flex-1">
            <div
              ref={thread}
              data-chat-thread=""
              tabIndex={-1}
              onScroll={(e) => {
                const el = e.currentTarget;
                stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 64;
              }}
              // No overscroll containment: at the thread's ends a swipe scrolls the page on. The top
              // 4rem fades out under the bar, as the product's MessageScroller does.
              className="h-full overflow-auto [scrollbar-gutter:stable_both-edges] [mask-image:linear-gradient(to_bottom,transparent_0,black_4rem)] focus:outline-none"
            >
              <div className="mx-auto w-full max-w-3xl space-y-9 px-4 pt-12 pb-36">
                {turns.map((turn) => (
                  <TurnView
                    key={turn.id}
                    turn={turn}
                    // Follow-ups only under the last answer, and only once nothing is playing.
                    showSuggestions={turn.id === last?.id && !pending}
                    copy={copy}
                    locale={locale}
                    productName={product.name}
                    initial={initial}
                    number={number}
                    onAsk={onAsk}
                  />
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
              <div className="h-10 bg-linear-to-b from-transparent to-canvas" />
              <div className="pointer-events-auto mx-auto w-full max-w-3xl bg-canvas px-4 pb-3">{composer(false)}</div>
            </div>
          </div>
        )}
      </div>

      <p role="status" aria-live="polite" className="sr-only">{announce}</p>
    </div>
  );
}

/**
 * One question and its answer. Memoised: while an answer streams, a token re-renders only its
 * own turn — earlier turns, with their charts and tables, keep their output (the parent keeps
 * their objects identical, and `onAsk` and `number` are stable).
 */
const TurnView = React.memo(function TurnView({ turn, showSuggestions, copy, locale, productName, initial, number, onAsk }: {
  turn: Turn;
  showSuggestions: boolean;
  copy: ChatDemoCopy;
  locale: Locale;
  productName: string;
  initial: string;
  number: Intl.NumberFormat;
  onAsk: (question: string) => void;
}) {
  const questionOf = (id: ScenarioId) => copy.scenarios.find((s) => s.id === id)!.question;
  const seconds = (turn.durationMs ?? 0) / 1000;
  return (
    <article className="scroll-mt-4 space-y-4">
      <div className="flex w-full items-start justify-end gap-3 pl-10">
        <p className="max-w-[calc(100%-2.5rem)] rounded-2xl rounded-br-sm bg-[var(--dima-secondary)] px-4 py-2 text-sm break-words text-ink">
          <span className="sr-only">{copy.you}: </span>
          {turn.question}
        </p>
        <span aria-hidden="true" className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-semibold text-on-brand">{initial}</span>
      </div>
      <div className="flex w-full items-start gap-3 pr-10">
        <Orb pending={turn.status === "pending"} />
        <div className="min-w-0 flex-1 text-ink">
          <span className="sr-only">{productName}:</span>
          {turn.status === "pending" ? (
            <div className="space-y-3">
              <LiveSteps steps={turn.steps} thinking={copy.thinking} streaming={Boolean(turn.text)} />
              {turn.text && <Answer text={turn.text} streaming />}
            </div>
          ) : (
            <div className="space-y-2">
              {turn.steps.length > 0 && (
                <Thought
                  steps={turn.steps}
                  label={fill(copy.thought, { seconds: new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-GB", { maximumFractionDigits: seconds < 10 ? 1 : 0 }).format(seconds) })}
                />
              )}
              {turn.text && <Answer text={turn.text} streaming={false} />}
              {turn.status === "stopped" && <p className="text-sm text-muted">{copy.stopped}</p>}
              {turn.status === "done" && turn.scenario && (
                <Reply scenario={turn.scenario} copy={copy} number={number} />
              )}
              {turn.suggestions && showSuggestions && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-xs text-muted">{copy.nextUp}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {turn.suggestions.map((id) => (
                      <li key={id}>
                        <button type="button" onClick={() => onAsk(questionOf(id))}
                                className="dima-surface-sm dima-interactive cursor-pointer px-2.5 py-1.5 text-left text-xs text-ink pointer-coarse:min-h-11">
                          {questionOf(id)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
});

/** The product guesses a step's icon from its own wording — no second source of truth. */
function iconFor(text: string): LucideIcon {
  if (/şema|schema/i.test(text)) return FileSearch;
  if (/yazıl|düzelt|hazırlan|writ|query written/i.test(text)) return PenLine;
  if (/çalış|sorgu|running|ran/i.test(text)) return Database;
  return Loader;
}

function LiveSteps({ steps, thinking, streaming }: { steps: Step[]; thinking: string; streaming: boolean }) {
  if (steps.length === 0) return <span className="dima-shimmer text-sm font-medium">{thinking}</span>;
  return (
    <div role="status" className="flex min-w-0 flex-col gap-1.5 pt-1">
      {!streaming && <span className="dima-shimmer text-sm font-medium">{thinking}</span>}
      <ol className="flex flex-col gap-1 border-l border-hairline pl-3">
        {steps.map((s) => {
          const Icon = iconFor(s.text);
          return (
            <li key={s.id} className="flex min-h-4 items-center gap-2 text-xs text-muted">
              <span className="flex size-4 shrink-0 items-center justify-center">
                {s.done
                  ? <Check aria-hidden="true" className="size-3.5 text-brand-text" strokeWidth={2.5} />
                  : <Icon aria-hidden="true" className="size-3.5 text-brand-text motion-safe:animate-pulse" />}
              </span>
              {s.done ? s.text : <span className="dima-shimmer">{s.text}</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Settled steps above a finished answer: "3,4 sn düşündü", collapsed. */
function Thought({ steps, label }: { steps: Step[]; label: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
              className="flex cursor-pointer items-center gap-1 rounded text-xs text-muted transition-colors hoverable:hover:text-ink">
        <ChevronRight aria-hidden="true" className={`size-3.5 transition-transform duration-160 ${open ? "rotate-90" : ""}`} />
        {label}
      </button>
      {open && (
        <ol className="mt-1.5 flex flex-col gap-1 border-l border-hairline pl-3">
          {steps.map((s) => (
            <li key={s.id} className="flex items-center gap-2 text-xs text-muted">
              <Check aria-hidden="true" className="size-3.5 text-[color-mix(in_oklab,var(--color-text-brand)_70%,transparent)]" />
              {s.text}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/** Bold is **…**. Splitting on the marker alternates plain and bold, so a half-streamed bold is bold already. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <strong key={i} className="font-semibold text-ink">{part}</strong> : part))}
    </>
  );
}

/** The product's Markdown styles: text-sm paragraphs, violet list markers. */
function Answer({ text, streaming }: { text: string; streaming: boolean }) {
  const blocks: ({ p: string } | { ul: string[] })[] = [];
  for (const block of text.split("\n\n")) {
    if (block.startsWith("- ")) {
      const prev = blocks.at(-1);
      if (prev && "ul" in prev) prev.ul.push(block.slice(2));
      else blocks.push({ ul: [block.slice(2)] });
    } else {
      blocks.push({ p: block });
    }
  }
  return (
    <div aria-busy={streaming || undefined} className="space-y-3 text-sm">
      {blocks.map((b, i) =>
        "p" in b
          ? <p key={i} className="leading-relaxed"><Inline text={b.p} /></p>
          : (
            <ul key={i} className="ml-4 list-disc space-y-1 marker:text-[color-mix(in_oklab,var(--color-text-brand)_70%,transparent)]">
              {b.ul.map((item, j) => <li key={j} className="pl-1 leading-relaxed"><Inline text={item} /></li>)}
            </ul>
          ),
      )}
    </div>
  );
}

/** The product's Reply: the result card, its save actions, then the query outside the card. */
function Reply({ scenario, copy, number }: { scenario: LocalScenario; copy: ChatDemoCopy; number: Intl.NumberFormat }) {
  const { result } = scenario;
  const [view, setView] = React.useState<"chart" | "table">("chart");
  const [kind, setKind] = React.useState<ChartKind>(result.kind);
  const [saved, setSaved] = React.useState(false);
  const format = (v: number) => fill(result.unit, { v: number.format(v) });
  const rows: ChartRow[] = result.rows.map((r) => ({ label: r.label, value: r.value, display: format(r.value) }));
  const toggle = "h-7 cursor-pointer px-2.5 text-xs transition-colors first:rounded-l-md last:rounded-r-md aria-pressed:bg-[var(--dima-secondary)] aria-pressed:text-ink text-muted hoverable:hover:text-ink pointer-coarse:h-11";
  return (
    <div className="space-y-3">
      <div data-chat-result="" className="dima-surface space-y-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
          <span className="text-xs text-muted tabular-nums">{fill(copy.rows, { n: rows.length })}</span>
          {/* Wraps under the row count in a narrow card: the touch-sized controls do not fit beside it. */}
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-1.5">
            {view === "chart" && (
              <label className="relative">
                <span className="sr-only">{copy.chartType}</span>
                <select value={kind} onChange={(e) => setKind(e.target.value as ChartKind)}
                        className="h-7 cursor-pointer appearance-none rounded-md border border-hairline bg-transparent pr-7 pl-2.5 text-xs text-ink shadow-xs pointer-coarse:h-11">
                  <option value="bar">{copy.chartTypes.bar}</option>
                  <option value="hbar">{copy.chartTypes.hbar}</option>
                  <option value="line">{copy.chartTypes.line}</option>
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted" />
              </label>
            )}
            <div className="inline-flex rounded-md border border-hairline shadow-xs">
              <button type="button" aria-pressed={view === "chart"} onClick={() => setView("chart")} className={toggle}>{copy.chart}</button>
              <button type="button" aria-pressed={view === "table"} onClick={() => setView("table")} className={`${toggle} border-l border-hairline`}>{copy.table}</button>
            </div>
          </div>
        </div>
        {view === "chart"
          ? <PocChart kind={kind} rows={rows} label={result.caption} tick={format} />
          : (
            <div className="dima-inset overflow-auto">
              <table className="w-full font-mono text-[13px]">
                <caption className="sr-only">{result.caption}</caption>
                <thead>
                  <tr className="border-b border-hairline">
                    {result.columns.map((c, i) => (
                      <th key={c} scope="col" className={`h-10 px-2 text-[11px] font-medium tracking-wide text-muted uppercase ${i ? "text-right" : "text-left"}`}>
                        <span className={`inline-flex items-center gap-1 ${i ? "flex-row-reverse" : ""}`}>
                          {c}<ChevronsUpDown aria-hidden="true" className="size-3 text-[color-mix(in_oklab,var(--color-text-muted)_50%,transparent)]" />
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-hairline last:border-b-0 hoverable:hover:bg-[color-mix(in_oklab,var(--dima-muted)_50%,transparent)]">
                      <td className="p-2 whitespace-nowrap">{r.label}</td>
                      <td className="p-2 text-right whitespace-nowrap tabular-nums">{r.display}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
      <div className="flex flex-wrap items-center gap-1">
        <span aria-hidden="true" className="inline-flex h-6 items-center gap-1 rounded-md px-2 text-xs text-ink">
          <LayoutDashboard className="size-3.5" />{copy.addToDashboard}
        </span>
        <button type="button" onClick={() => setSaved(true)} disabled={saved}
                className="inline-flex h-6 cursor-pointer items-center gap-1 rounded-md px-2 text-xs text-ink transition-colors hoverable:hover:bg-[var(--dima-secondary)] disabled:cursor-default disabled:text-muted pointer-coarse:h-11">
          <Save aria-hidden="true" className="size-3.5" />{saved ? copy.saved : copy.saveAnalysis}
        </button>
      </div>
      <SqlBlock sql={scenario.sql} label={copy.showSql} />
    </div>
  );
}
