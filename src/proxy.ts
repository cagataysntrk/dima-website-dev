import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Locale prefixing and the Turkish-slug rewrites. Pages themselves stay statically generated. */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
