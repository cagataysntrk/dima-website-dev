import { notFound } from "next/navigation";

/**
 * Any address under a locale that matches no page. Without this route Next falls back to the
 * root app/not-found.tsx, which has no root layout above it — the 404 rendered with no styles,
 * nav or footer. Throwing here lets [locale]/not-found.tsx render inside the site's layout.
 */
export default function CatchAll() {
  notFound();
}
