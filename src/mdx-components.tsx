import type { MDXComponents } from "mdx/types";
import { Heading, Link, Text } from "@upcytech/ui";

/**
 * Every element a post can contain, mapped onto the design system — so the blog needs no
 * separate prose stylesheet, and a post cannot drift from the rest of the site. The post's
 * own title is the page's H1; a post body starts at H2.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <Heading level={2} variant="title" className="mb-4 mt-12 scroll-mt-24" {...props} />,
    h3: (props) => <Heading level={3} variant="subtitle" className="mb-3 mt-8 scroll-mt-24" {...props} />,
    p: (props) => <Text className="my-5" {...props} />,
    a: ({ href = "", ...props }) => <Link href={href} {...props} />,
    ul: (props) => <ul className="my-5 flex max-w-prose list-disc flex-col gap-2 pl-5 marker:text-muted" {...props} />,
    ol: (props) => <ol className="my-5 flex max-w-prose list-decimal flex-col gap-2 pl-5 marker:text-muted" {...props} />,
    li: (props) => <li className="leading-relaxed" {...props} />,
    strong: (props) => <strong className="font-semibold text-ink" {...props} />,
    blockquote: (props) => <blockquote className="my-6 max-w-prose border-l border-outline pl-5 text-muted" {...props} />,
    code: (props) => <code className="rounded-chip border border-hairline bg-raised px-1.5 py-0.5 font-mono text-ui" {...props} />,
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto overscroll-x-contain rounded-card border border-hairline bg-raised p-card font-mono text-ui leading-relaxed [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
        {...props}
      />
    ),
    table: (props) => (
      <div className="table-scroll my-6">
        <div className="w-full overflow-x-auto overscroll-x-contain">
          <table className="w-full border-collapse text-left text-ui" {...props} />
        </div>
      </div>
    ),
    th: (props) => <th className="border-b border-hairline px-3 py-2 font-mono text-eyebrow uppercase text-muted" {...props} />,
    td: (props) => <td className="border-b border-hairline px-3 py-2 text-ui text-ink" {...props} />,
    hr: () => <hr className="my-10 border-hairline" />,
    ...components,
  };
}
