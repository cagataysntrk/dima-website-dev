"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button, Checkbox, Heading, Input, Link as UiLink, Select, Stack, Text, Textarea } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { contactPage as copy, TOPICS, type Topic } from "@/content/pages/contact";
import { sendEnquiry, type ContactState } from "@/app/[locale]/contact/actions";

/**
 * Reads the topic the visitor arrived with: /industries sends ?sector=…, /services ?service=….
 * Separate from the form so the form itself can render statically inside a Suspense fallback.
 */
export function ContactFormFromParams({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  const service = params.get("service");
  const sector = params.get("sector");
  const product = params.get("product");
  const source = params.get("source");
  const requestedTopic = params.get("topic");

  const topic: Topic | "" =
    requestedTopic && (TOPICS as readonly string[]).includes(requestedTopic)
      ? (requestedTopic as Topic)
      : service && (TOPICS as readonly string[]).includes(service)
        ? (service as Topic)
        : product && (TOPICS as readonly string[]).includes(product)
          ? (product as Topic)
          : sector
            ? "sector"
            : "";

  const context = source ?? sector ?? service ?? product ?? "";
  return <ContactForm locale={locale} initialTopic={topic} context={context} />;
}

export function ContactForm({ locale, initialTopic = "", context = "" }: {
  locale: Locale;
  initialTopic?: Topic | "";
  context?: string;
}) {
  const [state, action, pending] = React.useActionState<ContactState, FormData>(sendEnquiry, { status: "idle" });
  const formRef = React.useRef<HTMLFormElement>(null);
  const doneRef = React.useRef<HTMLDivElement>(null);

  // When the visitor started, stamped once after mount — not during render, where Date.now()
  // would differ between server and browser, and never again: re-stamping after a failed
  // submit made a person who fixed their errors quickly look like a bot. Held in state (a
  // controlled input) so React's post-submit form reset cannot clear it. Without JavaScript it
  // stays empty, and the server accepts that.
  const [startedAt, setStartedAt] = React.useState("");
  React.useEffect(() => setStartedAt(String(Date.now())), []);

  // Controlled, unlike the text fields: React resets a form after its action runs, and a
  // <select> or checkbox snaps back to its first default — so after a failed send the topic
  // jumped to the one the visitor arrived with, and the consent box emptied.
  const [topic, setTopic] = React.useState<string>(initialTopic);
  const [consent, setConsent] = React.useState(false);
  React.useEffect(() => {
    if ((state.status === "invalid" || state.status === "failed") && state.values.topic) setTopic(state.values.topic);
  }, [state]);

  // After a failed submit, focus the first invalid field; after success, the confirmation.
  React.useEffect(() => {
    if (state.status === "invalid") formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    if (state.status === "sent") doneRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      // Focus moves to the confirmation itself, so a screen reader announces it and a keyboard
      // user is not left on a submit button that no longer exists.
      <div ref={doneRef} tabIndex={-1} role="status"
           className="flex flex-col gap-3 rounded-panel border border-hairline bg-surface p-card focus:outline-none">
        <Heading level={2} variant="subtitle">{copy.success.title[locale]}</Heading>
        <Text tone="muted">{copy.success.body[locale]}</Text>
      </div>
    );
  }

  const errors = state.status === "invalid" ? state.errors : {};
  const values = state.status === "invalid" || state.status === "failed" ? state.values : {};
  const f = copy.form;

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      aria-label={f.label[locale]}
      className="flex min-w-0 flex-col gap-5 rounded-panel border border-hairline bg-surface p-card max-sm:p-4"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="context" value={values.context ?? context} />
      <input type="hidden" name="startedAt" value={startedAt} readOnly />
      {/* Honeypot: invisible to people and to assistive technology, irresistible to bots. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">{f.honeypot[locale]}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label={f.fields.name[locale]} name="name" autoComplete="name" required
               defaultValue={values.name} error={errors.name} />
        <Input label={f.fields.company[locale]} name="company" autoComplete="organization"
               defaultValue={values.company} error={errors.company} />
        <Input label={f.fields.email[locale]} name="email" type="email" inputMode="email" autoComplete="email"
               spellCheck={false} required placeholder={f.emailPlaceholder[locale]}
               defaultValue={values.email} error={errors.email} />
        <Select label={f.fields.topic[locale]} name="topic" required placeholder={f.topicPlaceholder[locale]}
                value={topic} onChange={(e) => setTopic(e.target.value)} error={errors.topic}>
          {TOPICS.map((topic) => <option key={topic} value={topic}>{f.topics[topic][locale]}</option>)}
        </Select>
      </div>

      <Textarea label={f.fields.message[locale]} name="message" required hint={f.messageHint[locale]}
                defaultValue={values.message} error={errors.message} />

      <Checkbox
        name="consent"
        required
        checked={consent}
        onChange={(e) => setConsent(e.target.checked)}
        error={errors.consent}
        label={
          <>
            {f.consent.before[locale]}
            <UiLink as={Link} href="/legal/kvkk">{f.consent.link[locale]}</UiLink>
            {f.consent.after[locale]}
          </>
        }
      />

      <Stack gap="tight">
        <p role="status" aria-live="polite" className="text-ui text-negative empty:hidden">
          {state.status === "invalid" ? copy.errors.summary[locale] : state.status === "failed" ? copy.errors.failed[locale] : ""}
        </p>
        <div className="max-sm:w-full">
          <Button type="submit" variant="primary" loading={pending} className="rounded-button! max-sm:w-full">{f.submit[locale]}</Button>
        </div>
      </Stack>
    </form>
  );
}
