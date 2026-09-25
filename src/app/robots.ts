import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Everything is crawlable; the sitemap lists every page in both locales (brief §9). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
