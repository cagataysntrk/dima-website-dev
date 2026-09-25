"use client";

import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import type { Post } from "@/lib/blog";
import { categories } from "@/content/blog/categories";
import { PostRow } from "../sections/blog";

interface Labels {
  filter: string;
  all: string;
  empty: string;
  emptyCategory: string;
}

/**
 * The category filter lives in the URL (?kategori=…), so a filtered list can be shared and the
 * back button works. The chips are real links: without JavaScript they still navigate, and
 * the full list shows.
 */
export function PostGridFromParams(props: { posts: Post[]; locale: Locale; labels: Labels }) {
  const active = useSearchParams().get("kategori");
  return <PostGrid {...props} active={active} />;
}

export function PostGrid({ posts, locale, labels, active = null }: {
  posts: Post[];
  locale: Locale;
  labels: Labels;
  active?: string | null;
}) {
  const pathname = usePathname();
  const shown = active ? posts.filter((p) => p.category === active) : posts;

  if (posts.length === 0) return <Text className="border-t border-hairline pt-5">{labels.empty}</Text>;

  const chip = (id: string | null, label: string) => {
    const current = active === id;
    return (
      <li key={id ?? "all"}>
        <NextLink
          href={id ? `${pathname}?kategori=${id}` : pathname}
          scroll={false}
          aria-current={current ? "page" : undefined}
          className={cn(
            "inline-flex min-h-9 items-center rounded-tag border px-3 text-ui no-underline pointer-coarse:min-h-11",
            "transition-colors duration-160 ease-out-expo",
            current ? "border-outline bg-raised text-ink" : "border-hairline text-muted hoverable:hover:text-ink",
          )}
        >
          {label}
        </NextLink>
      </li>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label={labels.filter}>
        <ul className="flex flex-wrap gap-2">
          {chip(null, labels.all)}
          {categories.map((c) => chip(c.id, c.label[locale]))}
        </ul>
      </nav>
      {shown.length === 0 ? (
        <Text className="border-t border-hairline pt-5" tone="muted">{labels.emptyCategory}</Text>
      ) : (
        <ul className="flex flex-col">
          {shown.map((post) => <li key={post.slug}><PostRow post={post} locale={locale} /></li>)}
        </ul>
      )}
    </div>
  );
}
