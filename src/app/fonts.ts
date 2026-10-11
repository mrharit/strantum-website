import { Jost, JetBrains_Mono, Questrial } from "next/font/google";

// Display stand-in until the licensed Century Gothic files arrive [[TODO: licence]].
// To swap: add `next/font/local` here exporting `--font-century-gothic`, then
// put its variable on <html> in layout.tsx. The stack in globals.css already
// lists "Century Gothic" first.
export const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-questrial",
});

// Body copy.
export const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jost",
});

// Technical data: LOD values, clash IDs, dimensions, formats, step numbers.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});
