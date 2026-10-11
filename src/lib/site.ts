// Single source of truth for company facts. Anything we have not been given
// stays `null` and renders as a visible TODO placeholder (CLAUDE.md §9.1).
export const site = {
  name: "STRANTUM",
  tagline: "Digital Engineering",
  mission:
    "Design-led, ISO 19650-aligned digital delivery for the AEC industry.",
  locale: "en-GB",
  // [[TODO: domain]] — set NEXT_PUBLIC_SITE_URL in Vercel once the domain is confirmed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    address: null as string | null, // [[TODO: office address]]
    email: null as string | null, // [[TODO: email]]
    phone: null as string | null, // [[TODO: phone]]
    linkedin: null as string | null, // [[TODO: LinkedIn URL]]
  },
} as const;
