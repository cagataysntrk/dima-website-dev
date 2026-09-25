"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { z } from "zod";
import { contactPage as copy, TOPICS, type Topic } from "@/content/pages/contact";
import { routing, type Locale } from "@/i18n/routing";

type Field = "name" | "company" | "email" | "topic" | "message" | "consent";
export type ContactValues = Partial<Record<Exclude<Field, "consent"> | "context", string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<Field, string>>; values: ContactValues }
  | { status: "failed"; values: ContactValues }
  | { status: "sent" };

/** A person does not fill a form in under three seconds; a script does. */
const MIN_FILL_MS = 3000;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.email().max(200),
  topic: z.enum(TOPICS),
  message: z.string().trim().min(20).max(5000),
  consent: z.literal("on"),
  context: z.string().trim().max(80).optional().default(""),
});

/** One line of a header must stay one line. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

/**
 * In-memory send throttle: 5 sends per IP per minute. Single-instance only — behind
 * multiple replicas use a shared store (Redis/Upstash). Over-limit sends fail closed
 * with "failed" (not "sent"): unlike spam drops, the visitor did nothing wrong and may
 * retry, so the form must say the message did not go out.
 */
const SENDS = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (SENDS.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  SENDS.set(ip, recent);
  // Bound memory: one entry per active IP, pruned on write; idle IPs linger at most
  // until the next send from any IP touches the map — acceptable for a contact form.
  if (SENDS.size > 10_000) for (const [k, v] of SENDS) if (v.every((t) => now - t >= RATE_WINDOW_MS)) SENDS.delete(k);
  return recent.length > RATE_LIMIT;
}

export async function sendEnquiry(_previous: ContactState, form: FormData): Promise<ContactState> {
  const requested = String(form.get("locale") ?? "");
  const locale: Locale = (routing.locales as readonly string[]).includes(requested) ? (requested as Locale) : routing.defaultLocale;

  // Spam. A bot fills the hidden field or submits inhumanly fast; it is told "sent" so it
  // learns nothing. An empty timestamp is allowed: without JavaScript there is none, and
  // those visitors are people.
  // Logged, so a silent drop is visible when debugging; the visitor still sees "sent".
  if (String(form.get("website") ?? "") !== "") {
    console.info("[contact] dropped as spam: honeypot filled");
    return { status: "sent" };
  }
  const startedAt = Number(form.get("startedAt") || 0);
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    console.info("[contact] dropped as spam: submitted within %dms of loading", Date.now() - startedAt);
    return { status: "sent" };
  }

  const raw = Object.fromEntries(form) as Record<string, string>;
  const values: ContactValues = {
    name: raw.name, company: raw.company, email: raw.email, topic: raw.topic, message: raw.message, context: raw.context,
  };

  // Same-origin check: the form posts from our own pages. A cross-origin POST is a bot or a
  // forged request — fail closed like a send failure, so the visitor retries on-site.
  const origin = (await headers()).get("origin");
  const host = (await headers()).get("host");
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const isSameHost = Boolean(host && (originUrl.host === host || originUrl.host.split(":")[0] === host.split(":")[0]));
      const isLocal = originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1" || originUrl.hostname.endsWith(".local");
      const site = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://upcytech.com");
      const isConfiguredSite = originUrl.origin === site.origin;

      if (!isSameHost && !isConfiguredSite && !isLocal) {
        console.info("[contact] dropped as spam: cross-origin POST from %s (expected host %s)", oneLine(origin), host);
        return { status: "failed", values };
      }
    } catch {
      return { status: "failed", values };
    }
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<Field, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as Field;
      if (field in copy.errors && !errors[field]) errors[field] = copy.errors[field as keyof typeof copy.errors][locale];
    }
    return { status: "invalid", errors, values };
  }

  const data = parsed.data;
  const ip = ((await headers()).get("x-forwarded-for")?.split(",")[0] ?? "local").trim();
  if (rateLimited(ip || "local")) {
    console.info("[contact] rate-limited: too many sends");
    return { status: "failed", values };
  }
  // The mailbox is read in Turkish, but an English enquiry keeps its own topic alongside:
  // otherwise the visitor's words come back to them translated in the subject line.
  const topicTr = copy.form.topics[data.topic as Topic].tr;
  const topicEn = copy.form.topics[data.topic as Topic].en;
  const topic = locale === "tr" || topicEn === topicTr ? topicTr : `${topicEn} / ${topicTr}`;

  const env = process.env;
  if (!env.SMTP_HOST || !env.CONTACT_TO) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Development simulation: SMTP not configured. Message simulated as sent:", {
        name: data.name,
        company: data.company,
        email: data.email,
        topic,
        message: data.message.slice(0, 100),
      });
      return { status: "sent" };
    }
    console.error("[contact] SMTP is not configured: set SMTP_HOST and CONTACT_TO (see .env.example)");
    return { status: "failed", values };
  }

  const port = Number(env.SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });

  try {
    await transport.sendMail({
      from: env.CONTACT_FROM ?? env.SMTP_USER,
      to: env.CONTACT_TO,
      replyTo: { name: oneLine(data.name), address: data.email },
      subject: oneLine(`[upcytech.com] ${topic}: ${data.name}${data.company ? `, ${data.company}` : ""}`),
      text: [
        `Ad soyad: ${data.name}`,
        `Firma: ${data.company || "Belirtilmedi"}`,
        `E-posta: ${data.email}`,
        `Konu: ${topic}${data.context ? ` (${data.context})` : ""}`,
        `Dil: ${locale}`,
        // The consent itself is part of the record: what was agreed to, and when.
        `KVKK onayı: evet, ${new Date().toISOString()}`,
        "",
        data.message,
      ].join("\n"),
    });
    return { status: "sent" };
  } catch (error) {
    console.error("[contact] send failed", error);
    return { status: "failed", values };
  }
}
