import type { Metadata, Viewport } from "next";
import "./globals.css";
import { jetbrainsMono, jost, questrial } from "./fonts";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "ISO 19650-aligned BIM modelling, coordination and documentation for architects, engineers and contractors — delivered from Delhi, across time zones.",
  openGraph: {
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#031211", // --ink
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      // The font variables must sit on <html>: --font-display in globals.css
      // is declared on :root and resolves var(--font-questrial) there.
      className={`${questrial.variable} ${jost.variable} ${jetbrainsMono.variable}`}
      // Lenis adds classes to <html> after hydration.
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="font-display sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-teal focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <LenisProvider>
          <Header />
          {/* Pages account for the fixed header (--header-h) in their first section. */}
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
