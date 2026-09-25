import type { PostHog } from "posthog-js";

/**
 * PostHog, strictly after consent (brief §10). posthog-js is not in the page bundle: it is
 * imported the moment a visitor accepts, and never before — so before consent there is no
 * PostHog code, no request to its host, and no cookie. Without NEXT_PUBLIC_POSTHOG_KEY,
 * analytics never starts at all.
 *
 * Our own consent record (lib/consent.ts) decides whether PostHog loads. PostHog's opt-in
 * state only mirrors it, so a choice changed mid-visit is honoured without a reload.
 */
let client: Promise<PostHog> | null = null;

function load(key: string) {
  client ??= import("posthog-js").then(({ default: posthog }) => {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      capture_pageview: "history_change", // App Router navigations are client-side
      capture_pageleave: true,
      person_profiles: "identified_only",
      // Nothing is stored until opt-in, and opting out removes what was stored.
      opt_out_persistence_by_default: true,
    });
    return posthog;
  });
  return client;
}

export async function startAnalytics() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  const posthog = await load(key);
  // The consent was given in our banner; don't send a separate $opt_in event for it.
  if (posthog.get_explicit_consent_status() !== "granted") posthog.opt_in_capturing({ captureEventName: false });
}

/**
 * A withdrawn consent: stop capturing and remove what PostHog stored. No reset() — it would
 * write a fresh identity straight back.
 */
export async function stopAnalytics() {
  if (client) (await client).opt_out_capturing();
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (name?.startsWith("ph_")) document.cookie = `${name}=; Max-Age=0; path=/`;
  }
  try {
    for (const key of Object.keys(localStorage)) if (/^_?_?ph_/.test(key)) localStorage.removeItem(key);
  } catch {
    /* storage blocked: nothing was stored there either */
  }
}
