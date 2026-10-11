// Navigation content shared by the header, the mobile menu and the footer.
// Descriptors are deliberately plain: what the service covers, no claims.
// "\u2060" (word joiner) and "\u00A0" (nbsp) keep ranges like LOD 200–400 and
// "ISO 19650" from splitting across lines.

export type NavItem = {
  href: string;
  title: string;
  blurb: string;
};

export const services: NavItem[] = [
  {
    href: "/services/bim-modelling",
    title: "BIM Modelling",
    blurb: "Architectural, structural and MEP models, LOD\u00A0200\u2060–\u2060400.",
  },
  {
    href: "/services/coordination-clash-detection",
    title: "Coordination & Clash Detection",
    blurb: "Clash runs, BCF issues and weekly coordination.",
  },
  {
    href: "/services/scan-to-bim",
    title: "Scan to BIM",
    blurb: "Point clouds turned into usable models.",
  },
  {
    href: "/services/as-built-fm",
    title: "As-built & FM Models",
    blurb: "Handover models with COBie asset data.",
  },
  {
    href: "/services/quantities-shop-drawings",
    title: "Quantities & Shop Drawings",
    blurb: "Model-based take-offs and fabrication drawings.",
  },
  {
    href: "/services/4d-sequencing",
    title: "4D Sequencing",
    blurb: "The construction programme linked to the model.",
  },
  {
    href: "/services/infrastructure-bim",
    title: "Infrastructure BIM",
    blurb: "Roads and highways in Civil 3D and OpenRoads.",
  },
  {
    href: "/services/bid-support",
    title: "Bid Support",
    blurb: "Take-offs and visuals for tender teams.",
  },
  {
    href: "/services/bim-management",
    title: "BIM Management",
    blurb: "EIR response, BEP and CDE set-up to ISO\u00A019650.",
  },
];

export const solutions: NavItem[] = [
  {
    href: "/solutions/architects-designers",
    title: "Architects & Designers",
    blurb: "Design-stage models and documentation.",
  },
  {
    href: "/solutions/engineering-mep-consultants",
    title: "Engineering & MEP Consultants",
    blurb: "Discipline models ready to coordinate.",
  },
  {
    href: "/solutions/contractors-epcs",
    title: "Contractors & EPCs",
    blurb: "Clash-free models and shop drawings for site.",
  },
  {
    href: "/solutions/specialist-subcontractors",
    title: "Specialist Subcontractors",
    blurb: "MEP, façade, steel and precast detailing.",
  },
  {
    href: "/solutions/developers-owners",
    title: "Developers & Owners",
    blurb: "Information requirements and handover data.",
  },
];

// Top-level links that are not mega-menus.
export const primaryLinks: { href: string; title: string }[] = [
  { href: "/how-we-work", title: "How We Work" },
  { href: "/insights", title: "Insights" },
  { href: "/about", title: "About" },
];

export const companyLinks: { href: string; title: string }[] = [
  { href: "/how-we-work", title: "How We Work" },
  { href: "/engagement", title: "Ways to Engage" },
  { href: "/capabilities", title: "Capabilities" },
  { href: "/insights", title: "Insights" },
  { href: "/about", title: "About" },
  { href: "/careers", title: "Careers" },
  { href: "/contact", title: "Contact" },
];

export const legalLinks: { href: string; title: string }[] = [
  { href: "/privacy", title: "Privacy" },
  { href: "/terms", title: "Terms" },
];

export const quoteLink = { href: "/contact", title: "Get a Quote" };
