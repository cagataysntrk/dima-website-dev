import type { ChatDemoCopy, LocalScenario, ScenarioId } from "@/content/dima-demo";

/**
 * The demo's stand-in for the product's `gateway.chatStream`: the same events, in the same
 * order — each step announced when it starts and confirmed when it ends, then the answer token
 * by token, then follow-up suggestions — played from a script instead of a model and a
 * database. Pure: no React, no DOM, so tests/chat-demo.test.ts drives it directly.
 */
export type DemoEvent =
  | { type: "step"; id: number; text: string; done: boolean }
  | { type: "token"; text: string }
  | { type: "done"; durationMs: number }
  | { type: "suggestions"; items: ScenarioId[] };

export interface PlayOptions {
  signal?: AbortSignal;
  /** Reduced motion: every step arrives settled and the answer arrives whole. */
  instant?: boolean;
  /** Scales every delay; tests pass 0. */
  pace?: number;
}

/** The answer as one text: paragraphs and list items separated by blank lines. */
export const answerText = (answer: readonly string[]) => answer.join("\n\n");

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

/** Resolves after `ms`, or rejects at once when the signal aborts. */
function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    if (ms <= 0) return resolve();
    const timer = setTimeout(() => { signal?.removeEventListener("abort", onAbort); resolve(); }, ms);
    const onAbort = () => { clearTimeout(timer); reject(signal!.reason); };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Plays one answer. `scenario` null is the fallback: the schema step, then the
 * "this demo answers four questions" reply and the four starters as suggestions.
 */
export async function* play(
  copy: ChatDemoCopy,
  scenario: LocalScenario | null,
  { signal, instant = false, pace = 1 }: PlayOptions = {},
): AsyncGenerator<DemoEvent> {
  const started = Date.now();
  const wait = (ms: number) => sleep(instant ? 0 : ms * pace, signal);
  let id = 0;

  const steps: { start: string; done: string; ms: number }[] = [
    { start: copy.steps.schema, done: fill(copy.steps.schemaDone, { n: scenario?.tables ?? copy.fallback.tables }), ms: 450 },
  ];
  if (scenario) {
    steps.push(
      { start: copy.steps.write, done: copy.steps.writeDone, ms: 700 },
      { start: copy.steps.run, done: fill(copy.steps.runDone, { n: scenario.result.rows.length }), ms: 550 },
    );
  }

  for (const step of steps) {
    id += 1;
    if (!instant) yield { type: "step", id, text: step.start, done: false };
    await wait(step.ms);
    yield { type: "step", id, text: step.done, done: true };
  }

  const text = answerText(scenario?.answer ?? copy.fallback.answer);
  if (instant) {
    yield { type: "token", text };
  } else {
    // Uneven chunks of a few characters, like a model's tokens; the size is derived from the
    // position, so a replay is identical.
    for (let at = 0; at < text.length;) {
      const size = 6 + (at % 5);
      yield { type: "token", text: text.slice(at, at + size) };
      at += size;
      await wait(32);
    }
  }

  // Under reduced motion the answer arrives at once, but "0 s thought" would misdescribe the
  // product: report the script's own pace (its step waits plus one token wait per chunk).
  const scripted = steps.reduce((sum, s) => sum + s.ms, 0) + Math.ceil(text.length / 8) * 32;
  yield { type: "done", durationMs: instant ? scripted : Date.now() - started };
  await wait(250);
  yield { type: "suggestions", items: scenario?.followUps ?? copy.scenarios.map((s) => s.id) };
}

/** Lower case (Turkish rules), diacritics and punctuation dropped, spaces collapsed. */
export function normalize(text: string) {
  return text
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

/**
 * Routes a typed question to a scenario: an exact starter wins; otherwise the scenario whose
 * keywords the question contains most often, or null (the fallback) when none match.
 */
export function match(copy: ChatDemoCopy, text: string): LocalScenario | null {
  const asked = normalize(text);
  if (!asked) return null;
  const exact = copy.scenarios.find((s) => normalize(s.question) === asked);
  if (exact) return exact;
  // A keyword counts where a word starts with it — "musteri" finds "musterilerimiz", but "ton"
  // does not find "stenter".
  const padded = ` ${asked} `;
  let best: LocalScenario | null = null;
  let bestScore = 0;
  for (const scenario of copy.scenarios) {
    const score = scenario.keywords.filter((k) => padded.includes(` ${normalize(k)}`)).length;
    if (score > bestScore) { best = scenario; bestScore = score; }
  }
  return best;
}
