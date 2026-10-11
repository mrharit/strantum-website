import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Logo files are supplied later (see public/brand/README.md). Detect them at
// config-load time so <Logo /> can switch from the text wordmark to the real
// SVG without any runtime fs access. Restart `next dev` after adding a file.
const brandFile = (name: string) =>
  existsSync(join(process.cwd(), "public", "brand", name)) ? "1" : "";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  env: {
    NEXT_PUBLIC_HAS_LOGO_PRIMARY: brandFile("logo.svg"),
    NEXT_PUBLIC_HAS_LOGO_REVERSED: brandFile("logo-reversed.svg"),
    NEXT_PUBLIC_HAS_LOGO_ICON: brandFile("logo-icon.svg"),
  },
};

export default nextConfig;
