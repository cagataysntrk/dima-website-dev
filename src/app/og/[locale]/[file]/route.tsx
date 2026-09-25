import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { themes } from "@upcytech/tokens/native";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { ogEntries } from "@/lib/og";
import { SITE_URL } from "@/lib/seo";

/**
 * Open Graph images, one per page and post, rendered once at build time (brief §9).
 * Satori reads neither CSS variables nor woff2, so colours come pre-resolved from the design
 * system's native token export and the faces from Fontsource's static woff cuts of the same
 * three families. The layout is the site's own: wordmark, hairline, serif display title.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const params = await Promise.all(routing.locales.map(async (locale) =>
    (await ogEntries(locale)).map((entry) => ({ locale, file: `${entry.key}.png` }))));
  return params.flat();
}

const face = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

/** Latin plus latin-ext for each face: Turkish letters (ğ ş ı İ) live in latin-ext. */
async function fonts() {
  const cut = (name: string, pkg: string, prefix: string, weight: 400 | 500 | 600) =>
    ["latin", "latin-ext"].map(async (subset) =>
      ({ name, weight, style: "normal" as const, data: await face(pkg, `${prefix}-${subset}-${weight}-normal.woff`) }));
  return Promise.all([
    ...cut("Serif", "source-serif-4", "source-serif-4", 500),
    ...cut("Sans", "plus-jakarta-sans", "plus-jakarta-sans", 400),
    ...cut("Mono", "jetbrains-mono", "jetbrains-mono", 500),
  ]);
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[locale]/[file]">) {
  const { locale, file } = await params;
  const entry = (await ogEntries(locale as Locale)).find((e) => `${e.key}.png` === file);
  if (!entry) return new Response(null, { status: 404 });

  const t = themes["upcytech.light"]!;
  const url = new URL(getPathname({ href: entry.href, locale: locale as Locale }), SITE_URL);
  const long = entry.title.length > 56;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: t.colorBgCanvas, padding: "64px 72px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "Mono", fontSize: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: t.colorTextPrimary, letterSpacing: "0.14em" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: t.colorBgBrand }} />
            UPCYTECH
          </div>
          <div style={{ color: t.colorTextMuted }}>{url.host + url.pathname}</div>
        </div>
        <div style={{ height: 1, background: t.colorBorderSubtle, marginTop: 40 }} />
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "flex-end" }}>
          <div style={{
            fontFamily: "Serif", fontSize: long ? 64 : 80, lineHeight: 1.05, letterSpacing: "-0.02em",
            color: t.colorTextPrimary, maxWidth: 1000,
          }}>
            {entry.title}
          </div>
          <div style={{
            fontFamily: "Sans", fontSize: 28, lineHeight: 1.45, color: t.colorTextMuted,
            marginTop: 28, maxWidth: 940,
          }}>
            {entry.description}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await fonts() },
  );
}
