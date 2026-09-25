import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  permanentRedirect(getPathname({ href: "/solutions", locale }));
}
