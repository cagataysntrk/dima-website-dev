import { describe, expect, test } from "bun:test";
import { chatDemoCopy, chatDemoFor } from "@/content/dima-demo";
import { answerText, match, normalize, play, type DemoEvent } from "@/components/sections/chat-demo/engine";
import { niceTicks } from "@/components/sections/chat-demo/poc-chart";

const locales = ["tr", "en"] as const;

async function collect(gen: AsyncGenerator<DemoEvent>) {
  const events: DemoEvent[] = [];
  for await (const e of gen) events.push(e);
  return events;
}

describe("chat demo routing", () => {
  for (const locale of locales) {
    const copy = chatDemoFor(locale);
    test(`every starter reaches its own scenario (${locale})`, () => {
      for (const s of copy.scenarios) expect(match(copy, s.question)?.id).toBe(s.id);
    });
  }

  test("typed questions route by keyword, in either language", () => {
    const tr = chatDemoFor("tr");
    expect(match(tr, "müşterilerimizin cirosu")?.id).toBe("customers");
    expect(match(tr, "Duruşların nedeni ne?")?.id).toBe("downtime");
    expect(match(tr, "OEE değerleri")?.id).toBe("oee");
    expect(match(tr, "monthly production")?.id).toBe("production");
    // A generic "why" must not outvote the topic.
    expect(match(tr, "Ram 2'nin OEE'si neden düşük?")?.id).toBe("oee");
    expect(match(tr, "Why is OEE low?")?.id).toBe("oee");
  });

  test("anything else falls through to the fallback", () => {
    const tr = chatDemoFor("tr");
    expect(match(tr, "hava durumu nasıl")).toBeNull();
    expect(match(tr, "   ")).toBeNull();
    // A keyword only counts at the start of a word.
    expect(match(tr, "stenter")).toBeNull();
  });

  test("normalize folds Turkish case and diacritics", () => {
    expect(normalize("  DURUŞ, Işık  ")).toBe("durus isik");
  });
});

describe("chat demo script", () => {
  const copy = chatDemoFor("tr");
  const oee = copy.scenarios.find((s) => s.id === "oee")!;

  test("events arrive as the product sends them: steps, tokens, done, suggestions", async () => {
    const events = await collect(play(copy, oee, { pace: 0 }));
    const kinds = events.map((e) => e.type);
    const firstToken = kinds.indexOf("token");
    expect(kinds.slice(0, firstToken).every((k) => k === "step")).toBe(true);
    expect(kinds.at(-2)).toBe("done");
    expect(kinds.at(-1)).toBe("suggestions");
    // Each of the three steps is announced, then confirmed.
    const steps = events.filter((e): e is Extract<DemoEvent, { type: "step" }> => e.type === "step");
    expect(steps.map((s) => `${s.id}:${s.done}`)).toEqual(["1:false", "1:true", "2:false", "2:true", "3:false", "3:true"]);
    const text = events.filter((e) => e.type === "token").map((e) => (e as { text: string }).text).join("");
    expect(text).toBe(answerText(oee.answer));
  });

  test("reduced motion: settled steps and the answer in one piece", async () => {
    const events = await collect(play(copy, oee, { instant: true }));
    expect(events.filter((e) => e.type === "token")).toHaveLength(1);
    expect(events.filter((e) => e.type === "step").every((e) => (e as { done: boolean }).done)).toBe(true);
  });

  test("the fallback reads the schema only and offers every starter", async () => {
    const events = await collect(play(copy, null, { pace: 0 }));
    expect(events.filter((e) => e.type === "step")).toHaveLength(2);
    const last = events.at(-1) as Extract<DemoEvent, { type: "suggestions" }>;
    expect(last.items).toEqual(copy.scenarios.map((s) => s.id));
  });

  test("aborting stops the stream", async () => {
    const run = new AbortController();
    const events: DemoEvent[] = [];
    const playing = (async () => { for await (const e of play(copy, oee, { signal: run.signal })) events.push(e); })();
    run.abort();
    await expect(playing).rejects.toBeDefined();
    expect(events.some((e) => e.type === "done")).toBe(false);
  });
});

describe("chat demo content", () => {
  test("follow-ups name scenarios that exist", () => {
    const ids = new Set(chatDemoCopy.scenarios.map((s) => s.id));
    for (const s of chatDemoCopy.scenarios) for (const f of s.followUps) expect(ids.has(f)).toBe(true);
  });

  test("result rows have a label in both languages and a finite value", () => {
    for (const s of chatDemoCopy.scenarios) {
      for (const r of s.result.rows) {
        expect(r.label.tr && r.label.en).toBeTruthy();
        expect(Number.isFinite(r.value)).toBe(true);
      }
    }
  });
});

describe("chat demo chart", () => {
  test("ticks run from zero in Recharts-like steps and clear the largest value", () => {
    expect(niceTicks(78.4)).toEqual([0, 20, 40, 60, 80]);
    expect(niceTicks(468)).toEqual([0, 100, 200, 300, 400, 500]);
    expect(niceTicks(64.5)).toEqual([0, 20, 40, 60, 80]);
    for (const max of [3, 17.5, 48.6, 999]) {
      const t = niceTicks(max);
      expect(t[0]).toBe(0);
      expect(t.at(-1)!).toBeGreaterThanOrEqual(max);
      expect(t.length).toBeLessThanOrEqual(6);
    }
  });

  test("reduced motion reports the script's pace, not zero", async () => {
    const copy = chatDemoFor("tr");
    const oee = copy.scenarios.find((s) => s.id === "oee")!;
    const events: DemoEvent[] = [];
    for await (const e of play(copy, oee, { instant: true })) events.push(e);
    const done = events.find((e) => e.type === "done") as Extract<DemoEvent, { type: "done" }>;
    expect(done.durationMs).toBeGreaterThan(1000);
  });
});
