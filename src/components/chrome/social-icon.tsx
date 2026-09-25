"use client";

import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import type { SocialId } from "@/content/social";

/** One brand set (Font Awesome 6, via react-icons) for every network — never mixed sets. */
const ICONS = {
  instagram: FaInstagram,
  x: FaXTwitter,
  facebook: FaFacebookF,
} satisfies Record<SocialId, unknown>;

/**
 * A social network's mark, decorative (its link carries the name). A client component:
 * react-icons reads a React context, which server components cannot.
 */
export function SocialIcon({ id }: { id: SocialId }) {
  const Icon = ICONS[id];
  return <Icon aria-hidden focusable={false} />;
}
