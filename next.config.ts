import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Builds use webpack (`--webpack` in package.json). The design system is a sibling checkout
 * reached through symlinks (scripts/link-design-system.ts), and Turbopack only reads files
 * under its root — which would have to be the directory holding both repos.
 */
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Tree-shake the icon/animation kits per import instead of pulling whole barrels.
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "motion", "@upcytech/ui"],
  },
  // The design system ships raw TypeScript and CSS; this app compiles them.
  transpilePackages: ["@upcytech/ui", "@upcytech/brand", "@upcytech/tokens", "@upcytech/tailwind-config"],
};

// Blog posts are MDX files in src/content/blog, imported as modules (src/lib/blog.ts);
// src/mdx-components.tsx maps their elements onto the design system's components.
const withMDX = createMDX({ extension: /\.mdx$/ });

export default withMDX(createNextIntlPlugin("./src/i18n/request.ts")(config));
