/**
 * The visitor's analytics choice. Kept in localStorage, not in a cookie: recording a refusal
 * should not itself require a cookie. Versioned — bump CONSENT_VERSION when the cookie policy
 * changes in a way visitors must agree to again, and every stored choice is asked afresh.
 */
export type ConsentChoice = "granted" | "denied";

const KEY = "upcy-consent";
const CONSENT_VERSION = 1;

/** Fired to reopen the banner (the footer's "cookie preferences"). */
export const CONSENT_OPEN_EVENT = "upcy:consent-open";

export function readConsent(): ConsentChoice | null {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "null") as { choice?: string; version?: number } | null;
    if (stored?.version !== CONSENT_VERSION) return null;
    return stored.choice === "granted" || stored.choice === "denied" ? stored.choice : null;
  } catch {
    return null; // storage blocked: treat as undecided, so nothing runs
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ choice, version: CONSENT_VERSION, at: new Date().toISOString() }));
  } catch {
    /* the choice still applies for this page view */
  }
}

export const openConsent = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
