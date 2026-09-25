/**
 * Customer-facing social accounts are intentionally empty during the master-brand migration.
 * Add only verified public product-brand accounts here. The legal/company LinkedIn remains in
 * site.company for direct-contact/company identity until an approved product account exists.
 */
export type SocialId = "instagram" | "x" | "facebook";

export const social: readonly { id: SocialId; label: string; href: string }[] = [];
