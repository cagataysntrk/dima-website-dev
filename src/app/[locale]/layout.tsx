import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
// The design-system master branch does not publish @upcytech/brand yet; keep these faces local.
// Geist sets the home headline only (components/home/hero-title.tsx) — local files, never fetched.
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import Script from "next/script";

/**
 * Geist's own italic, for the home headline's accent words. The `geist` package ships it, but
 * geist/font/sans loads only the upright face — without this the italic would be a synthesised
 * slant. Variable 100–900, so the kinetic hover still thickens the accent letters.
 * Vendored under src/app/fonts (copied from the geist package): next/font/local cannot read
 * across the repo boundary reliably, and a node_modules traversal breaks on clean installs
 * and with Turbopack. Re-copy if the geist package is upgraded.
 */
const geistItalic = localFont({
  src: "../../app/fonts/Geist-Italic-var.woff2",
  weight: "100 900",
  style: "italic",
  variable: "--font-geist-italic",
  display: "swap",
});
import { themeScript } from "@upcytech/ui";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { SiteNav } from "@/components/chrome/site-nav";
import { SiteFooter } from "@/components/chrome/site-footer";
import { JsonLd } from "@/components/json-ld";
import { ConsentManager } from "@/components/consent/consent-manager";
import { ScrollProgress, ScrollToTop } from "@/components/chrome/scroll-utils";
import { organizationJsonLd, SITE_URL } from "@/lib/seo";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { template: "%s | Dima", default: "Dima" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon_apple.png", type: "image/png" },
    ],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * `data-brand` and `data-density` are rendered by the server, so there is nothing to flash.
 * `data-theme` is not server-rendered: reading a theme cookie here would make every page
 * dynamic. Without it the tokens follow the OS; a choice made in the ThemeToggle is applied by
 * themeScript before first paint (design-system D-030) — hence suppressHydrationWarning.
 */
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} data-brand="dima" data-density="comfortable" className={`${GeistSans.variable} ${geistItalic.variable}`}
          suppressHydrationWarning>
      <head>
        {/* A plain <script> here never runs on client navigation, so Next flags it. next/script
            with beforeInteractive runs before first paint AND on every client render: the stored
            theme applies without a flash, and data-js marks "JavaScript is running" for the home
            headline's reveal (globals.css) — a visitor without JS always sees the text. */}
        <Script id="upcy-theme" strategy="beforeInteractive">
          {`${themeScript};document.documentElement.dataset.js=""`}
        </Script>
      </head>
      <body className="site-responsive flex min-h-dvh flex-col bg-canvas text-ink">
        {/* [PROMOTE TO DS] Skip link, composed from tokens until a SkipLink primitive exists. */}
        <a
          href="#main"
          className="sr-only rounded-control bg-surface px-control-x py-control-y text-ui text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-outline"
        >
          {site.chrome.skipLink[locale]}
        </a>
        <NextIntlClientProvider>
          <ScrollProgress label={site.chrome.readingProgress[locale]} />
          <SiteNav locale={locale} />
          {/* The floating nav is fixed; content starts below its footprint. */}
          <main id="main" tabIndex={-1} className="flex-1 pt-(--nav-offset) focus:outline-none">
            {children}
          </main>
          <SiteFooter locale={locale} />
          <ConsentManager locale={locale} />
          <ScrollToTop label={site.chrome.scrollToTop[locale]} />
        </NextIntlClientProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
