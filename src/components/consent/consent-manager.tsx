"use client";

import * as React from "react";
import { ConsentBanner, Link as UiLink } from "@upcytech/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { consentCopy as copy } from "@/content/consent";
import { CONSENT_OPEN_EVENT, openConsent, readConsent, writeConsent, type ConsentChoice } from "@/lib/consent";
import { startAnalytics, stopAnalytics } from "@/lib/analytics";

/**
 * Asks once, remembers the answer, and starts analytics only on "accept". The banner is
 * decided after mount — the server cannot know the stored choice — and it floats, so its
 * arrival shifts nothing.
 */
export function ConsentManager({ locale }: { locale: Locale }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const stored = readConsent();
    if (stored === null) setOpen(true);
    else if (stored === "granted") void startAnalytics();

    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const decide = (choice: ConsentChoice) => {
    writeConsent(choice);
    setOpen(false);
    void (choice === "granted" ? startAnalytics() : stopAnalytics());
  };

  return (
    <ConsentBanner
      open={open}
      title={copy.title[locale]}
      acceptLabel={copy.accept[locale]}
      rejectLabel={copy.reject[locale]}
      onAccept={() => decide("granted")}
      onReject={() => decide("denied")}
      // Phones: tighter card so the first screen keeps its CTAs visible.
      className="max-sm:gap-2 max-sm:p-4"
    >
      {copy.body[locale]}{" "}
      <UiLink as={Link} href="/legal/cerez-politikasi">{copy.policy[locale]}</UiLink>
    </ConsentBanner>
  );
}

/** The footer's way back to the banner, so a choice can be changed at any time. */
export function ConsentReopen({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openConsent}
      className="cursor-pointer text-ui text-muted underline decoration-hairline underline-offset-4 transition-colors duration-160 ease-out-expo hoverable:hover:text-ink"
    >
      {label}
    </button>
  );
}
