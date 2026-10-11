// Homepage copy. Original text only (CLAUDE.md §9): no invented clients,
// numbers, awards or certifications. Anything unconfirmed is a literal
// TODO / CONFIRM token in double square brackets; <RichText> renders those as
// visible placeholders and `npm run todos` lists them.

import type { ServiceSlug } from "@/components/diagrams/ServiceGlyphs";

/* ---------------------------- Hero ------------------------------------ */

export const hero = {
  eyebrow: "Model / Coordinate / Deliver",
  // H1 options (brief §5.2). The first is live; keep the others for testing:
  //   "Every clash, found on screen."
  //   "Engineering certainty, before site."
  sub: "ISO 19650-aligned BIM modelling, coordination and documentation for architects, engineers and contractors — delivered from Delhi, across time zones.",
};

/* ------------------------ Scroll story (§7.1) -------------------------- */

export type Chapter = {
  n: number;
  name: string; // chapter name, matches the 3D scene
  service: string; // service it belongs to
  href: string;
  text: string; // two sentences
};

export const storyIntro = {
  eyebrow: "One building, every discipline",
  lead: "Follow one mid-rise from design intent to issued drawings. Each step is a service we deliver, on a model we can show you.",
};

export const chapters: Chapter[] = [
  {
    n: 1,
    name: "Architecture",
    service: "BIM Modelling",
    href: "/services/bim-modelling",
    text: "We model the shell, façade and spaces from your drawings, level by level. Grids, levels and families follow your standards from the first file.",
  },
  {
    n: 2,
    name: "Structure",
    service: "BIM Modelling",
    href: "/services/bim-modelling",
    text: "Columns, beams, slabs and cores sit on the same grid as the architecture. Every element carries its mark, material and level.",
  },
  {
    n: 3,
    name: "MEP",
    service: "BIM Modelling",
    href: "/services/bim-modelling",
    text: "Ducts, pipes and equipment are routed through the ceiling void at true size. Clearances for access and insulation are modelled, not assumed.",
  },
  {
    n: 4,
    name: "Clash detection",
    service: "Coordination & Clash Detection",
    href: "/services/coordination-clash-detection",
    text: "The models run against each other in Navisworks or Solibri. Each clash gets an ID, a location and an owner. Here, CL-014 is a duct through a beam.",
  },
  {
    n: 5,
    name: "Coordinated",
    service: "Coordination & Clash Detection",
    href: "/services/coordination-clash-detection",
    text: "The duct is rerouted, the test is re-run and the issue is closed in BCF. The number that matters is the count of clashes still open on the issue date.",
  },
  {
    n: 6,
    name: "Documentation",
    service: "Quantities & Shop Drawings",
    href: "/services/quantities-shop-drawings",
    text: "Sheets, sections, schedules and take-offs come out of the coordinated model. What gets built matches what was checked.",
  },
];

/* ------------------------- Capability strip --------------------------- */

export const capabilities: { label: string; value: string }[] = [
  { label: "Detail", value: "LOD 100–400 + as-built" },
  { label: "Standard", value: "ISO 19650-aligned workflows" },
  { label: "Software", value: "Revit · Navisworks · Civil 3D · Tekla · Solibri · ACC" },
  { label: "Exchange", value: "IFC · BCF · COBie" },
  { label: "Delivery", value: "Follow-the-sun delivery (IST)" },
  { label: "Confidentiality", value: "NDA before first file" },
];

/* --------------------------- Services grid ---------------------------- */

export const servicesIntro = {
  eyebrow: "BIM services",
  lead: "Nine services, one delivery process. Take one on its own or combine them across a project.",
};

// Outcome-led: what the client gets, not what we do.
export const serviceOutcomes: Record<ServiceSlug, string> = {
  "bim-modelling":
    "Models your team can design, check and build from, at the LOD each stage calls for.",
  "coordination-clash-detection":
    "A clash-free model on the issue date, with every resolved issue traceable in BCF.",
  "scan-to-bim":
    "Existing conditions as a measured model, so design starts from what is actually on site.",
  "as-built-fm":
    "A handover model with asset data your facility team can use on day one.",
  "quantities-shop-drawings":
    "Take-offs and shop drawings that come straight from the coordinated model.",
  "4d-sequencing":
    "A construction programme you can watch week by week, before the crane arrives.",
  "infrastructure-bim":
    "Alignments, corridors and cross-sections for roads and highways, drawn to IRC and MoRTH practice.",
  "bid-support":
    "Quantities and visuals your tender team can rely on, ready before the deadline.",
  "bim-management":
    "An ISO 19650-aligned information process: EIR response, BEP, CDE set-up and standards.",
};

/* ------------------------------ Solutions ----------------------------- */

export type Solution = {
  slug: string;
  role: string;
  problem: string;
  deliver: string;
  deliverables: string[];
  services: { title: string; href: string }[];
};

export const solutionsIntro = {
  eyebrow: "Solutions for",
  lead: "Each role meets BIM at a different point and loses time in a different place. Pick yours.",
};

export const solutionList: Solution[] = [
  {
    slug: "architects-designers",
    role: "Architects & Designers",
    problem:
      "Design intent gets diluted between concept and documentation. Models drift from drawings as the team grows, and late changes ripple through every sheet.",
    deliver:
      "Design-stage and construction-stage models built in your template, with sheets, schedules and room data kept in step. We work inside your standards and return files you can open and edit.",
    deliverables: ["RVT", "IFC", "DWG", "PDF sheet set", "Room schedules"],
    services: [
      { title: "BIM Modelling", href: "/services/bim-modelling" },
      { title: "Scan to BIM", href: "/services/scan-to-bim" },
    ],
  },
  {
    slug: "engineering-mep-consultants",
    role: "Engineering & MEP Consultants",
    problem:
      "Discipline models arrive late, at uneven detail, and clash the first time they are federated. Design changes are hard to trace across packages.",
    deliver:
      "Discipline models at LOD 300 with sizing, clearances and service data, checked against architecture and structure before every issue.",
    deliverables: ["RVT", "NWD", "IFC", "BCF report", "Clash register"],
    services: [
      { title: "BIM Modelling", href: "/services/bim-modelling" },
      {
        title: "Coordination & Clash Detection",
        href: "/services/coordination-clash-detection",
      },
    ],
  },
  {
    slug: "contractors-epcs",
    role: "Contractors & EPCs",
    problem:
      "Site finds the clashes the model should have found. RFIs pile up, and rework lands on the programme and the margin.",
    deliver:
      "Coordination runs, shop-ready models at LOD 350–400, quantities, and 4D sequences tied to your construction programme.",
    deliverables: ["NWD", "BCF", "PDF shop drawings", "Take-off schedules", "4D sequence"],
    services: [
      {
        title: "Coordination & Clash Detection",
        href: "/services/coordination-clash-detection",
      },
      {
        title: "Quantities & Shop Drawings",
        href: "/services/quantities-shop-drawings",
      },
      { title: "4D Sequencing", href: "/services/4d-sequencing" },
    ],
  },
  {
    slug: "specialist-subcontractors",
    role: "Specialist Subcontractors",
    problem:
      "Fabrication needs exact geometry and clean part data. The design model rarely carries either, so detailing starts from scratch.",
    deliver:
      "Fabrication-level models and shop drawings for MEP, façade, structural steel and precast, with part marks and bills of materials.",
    deliverables: ["RVT", "IFC", "DWG", "PDF shop drawings", "Bill of materials"],
    services: [
      {
        title: "Quantities & Shop Drawings",
        href: "/services/quantities-shop-drawings",
      },
      { title: "BIM Modelling", href: "/services/bim-modelling" },
    ],
  },
  {
    slug: "developers-owners",
    role: "Developers & Owners",
    problem:
      "Handover arrives as drawings and PDFs. Facility teams re-key every asset by hand, and the information you paid for is out of date on opening day.",
    deliver:
      "Information requirements (EIR) written with you, a BEP review, and handover models with COBie data so the asset register is ready at completion.",
    deliverables: ["IFC", "COBie", "As-built RVT", "Asset register", "O&M data"],
    services: [
      { title: "BIM Management", href: "/services/bim-management" },
      { title: "As-built & FM Models", href: "/services/as-built-fm" },
    ],
  },
];

/* ---------------------------- How we work ----------------------------- */

export const processIntro = {
  eyebrow: "How we work",
  lead: "Six steps that follow the ISO 19650 information-delivery flow. You always know what state a file is in.",
};

export const steps: { n: string; title: string; ref?: string; text: string; output: string }[] = [
  {
    n: "01",
    title: "Brief & requirements review",
    ref: "EIR / OIR",
    text: "We read your information requirements and agree what is modelled, to what detail and by when.",
    output: "Scope note",
  },
  {
    n: "02",
    title: "BIM Execution Plan & standards setup",
    ref: "BEP",
    text: "Roles, naming, LOD, file structure and exchange formats are written down before modelling starts.",
    output: "BEP",
  },
  {
    n: "03",
    title: "Modelling",
    ref: "WIP",
    text: "Work in progress stays in our environment until it has passed internal checks.",
    output: "Discipline models",
  },
  {
    n: "04",
    title: "Coordination & QA",
    ref: "Clash runs · model checks",
    text: "Model checks first, then clash runs. Every issue is logged in BCF with an owner and a due date.",
    output: "Clash register",
  },
  {
    n: "05",
    title: "Issue",
    ref: "Shared → Published",
    text: "Checked models move to Shared for review and to Published once approved, with a status code and revision.",
    output: "Published models",
  },
  {
    n: "06",
    title: "Construction support & as-built",
    ref: "Handover",
    text: "We update models for RFIs and site changes, then close out with an as-built set.",
    output: "As-built models",
  },
];

/* ------------------------- Demonstration work ------------------------- */

export const demoIntro = {
  eyebrow: "Demonstration work",
  lead: "We are a new company, so we do not show other people's projects. These are models we build in-house to show how we work.",
};

export const demoLabel = "Demonstration model — produced in-house";

export const demos: {
  title: string;
  visual: "building" | "scan" | "road";
  size: string;
  lod: string;
  discipline: string;
  software: string;
  demonstrates: string;
}[] = [
  {
    title: "Mid-rise office",
    visual: "building",
    size: "[[TODO: levels and GFA]]",
    lod: "[[CONFIRM: LOD 300]]",
    discipline: "Architecture · Structure · MEP",
    software: "Revit · Navisworks",
    demonstrates:
      "A full clash cycle: detect, assign, reroute, re-test and close in BCF.",
  },
  {
    title: "Existing building",
    visual: "scan",
    size: "[[TODO: levels and GFA]]",
    lod: "[[CONFIRM: LOD 200–300]]",
    discipline: "Architecture · Structure",
    software: "Revit · [[CONFIRM: point-cloud software]]",
    demonstrates:
      "A point cloud turned into a measured model that design can start from.",
  },
  {
    title: "Road corridor",
    visual: "road",
    size: "[[TODO: length and carriageway]]",
    lod: "[[CONFIRM: LOD]]",
    discipline: "Alignment · Corridor · Cross-sections",
    software: "Civil 3D · OpenRoads",
    demonstrates:
      "An alignment, profile and corridor model with cross-sections drawn to IRC and MoRTH practice.",
  },
];

/* --------------------------- Ways to engage --------------------------- */

export const engageIntro = {
  eyebrow: "Ways to engage",
  lead: "Start small, then scale. Every route runs on the same standards and the same team.",
};

export const engagements: {
  key: string;
  tag: string;
  title: string;
  text: string;
  points: string[];
  cta: string;
  featured?: boolean;
}[] = [
  {
    key: "pilot",
    tag: "Fixed scope · fixed fee",
    title: "Paid pilot",
    text: "One floor, one zone or one discipline, coordinated and issued. You see our modelling, checking and communication on your own project before committing more.",
    points: [
      "Scope and deliverables agreed in writing",
      "Run exactly like a full project",
      "Your formats, your standards",
      "Review call at the end",
    ],
    cta: "Scope a pilot",
    featured: true,
  },
  {
    key: "project",
    tag: "Fixed scope · fixed fee",
    title: "Fixed-scope project",
    text: "A defined set of deliverables for a defined stage: a full model, a coordination package or a shop drawing set.",
    points: [
      "Quoted from your drawings",
      "Milestones tied to your programme",
      "Revision round included",
      "Handover in agreed formats",
    ],
    cta: "Request a quote",
  },
  {
    key: "team",
    tag: "Billed monthly",
    title: "Dedicated BIM team",
    text: "A named team that works as an extension of yours. Suits long programmes and multi-package work.",
    points: [
      "Named BIM lead and modellers",
      "Capacity scaled with your programme",
      "Weekly coordination call",
      "Working hours overlap [[CONFIRM: IST overlap window]]",
    ],
    cta: "Discuss a team",
  },
];

/* ----------------------------- Founder note --------------------------- */

export const founder = {
  eyebrow: "Why STRANTUM",
  // First-person draft. It states intent only, no biography or numbers.
  note: [
    "Most BIM problems are not modelling problems. They are information problems: nobody agreed what the model was for, who owns a clash, or when a file is final.",
    "So we start there. Before we model anything, we write down the standards, the LOD and the exchange formats. Then we model, check and issue the way ISO 19650 describes, and we tell you plainly what state every file is in.",
    "We are a new company. We would rather prove that on a paid pilot on your project than ask you to take it on trust.",
  ],
  placeholder:
    "[[TODO: name, photo, credentials — BIM architect; Revit, Navisworks, ISO 19650; previously INI Design Studio — CONFIRM]]",
  approval: "[[CONFIRM: founder to approve this note]]",
  principles: [
    { title: "Standards first", text: "Naming, LOD and formats are agreed before modelling begins." },
    { title: "Every issue has an owner", text: "Clashes are logged, assigned and closed in BCF." },
    { title: "Plain status", text: "WIP, Shared or Published. Never a guess." },
  ],
};

/* ------------------------------- Insights ----------------------------- */

export const insightsIntro = {
  eyebrow: "Insights",
  lead: "Practical notes for BIM managers, VDC leads and pre-construction teams.",
};

export const insights: {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
}[] = [
  {
    slug: "lod-300-vs-lod-400",
    tag: "Level of development",
    title: "What LOD 300 vs LOD 400 actually means for your contractor",
    excerpt:
      "Where design coordination ends and fabrication begins, and who should be paying for the extra detail.",
  },
  {
    slug: "clash-detection-wrong-kpi",
    tag: "Coordination",
    title: "Clash detection: why the number of clashes is the wrong KPI",
    excerpt:
      "A falling clash count can mean a better model or a weaker test. What to track instead.",
  },
  {
    slug: "iso-19650-small-teams",
    tag: "ISO 19650",
    title: "ISO 19650 for small project teams: the minimum that matters",
    excerpt:
      "The handful of agreements that carry most of the benefit, without a full information-management department.",
  },
];

/* --------------------------------- FAQ -------------------------------- */

export const faqIntro = {
  eyebrow: "FAQ",
  lead: "The questions BIM managers ask before they share a file.",
};

export const lodSpecUrl =
  "https://bimforum.org/resource/lod-level-of-development-lod-specification/";

// Answers are plain text so they can be emitted as FAQPage JSON-LD unchanged.
export const faqs: { q: string; a: string }[] = [
  {
    q: "Which software and versions do you work in?",
    a: "We model in Revit and coordinate in Navisworks and Solibri. Infrastructure work uses Civil 3D and OpenRoads, and steel detailing uses Tekla. We can work inside your Autodesk Construction Cloud project or share through our own CDE. [[CONFIRM: supported software versions]]",
  },
  {
    q: "Which file formats do you exchange?",
    a: "Native files (RVT, NWD, DWG) where you use the same tools. IFC for open model exchange and BCF for issues. Handover models can include COBie. Drawings go out as PDF and DWG. We agree the exact set in the BIM Execution Plan before work starts.",
  },
  {
    q: "How do you handle data security and NDAs?",
    a: "We sign your NDA, or send ours, before you share the first file. Files are kept in access-controlled storage, or in your own CDE if you prefer. [[CONFIRM: encryption, access control and retention practices]]",
  },
  {
    q: "How do time zones and turnaround work?",
    a: "We work from Delhi-NCR on IST. Your team sends updates at the end of its day, and ours are ready at the start of the next. Coordination calls run in an overlap window agreed per project. Turnaround depends on scope and is fixed in the proposal. [[CONFIRM: typical turnaround and overlap hours]]",
  },
  {
    q: "What do the LOD levels mean?",
    a: "LOD describes how developed a model element is. LOD 100 is conceptual. LOD 200 is approximate geometry. LOD 300 is precise geometry for design coordination. LOD 350 adds connections to other systems. LOD 400 is detail for fabrication and assembly. LOD 500 is field-verified. We confirm the LOD of each element in the BEP.",
  },
  {
    q: "How are revisions handled?",
    a: "Each package includes a revision round for comments on the agreed scope. Changes to scope or design after issue are re-quoted. Every revision carries a revision code and a change log. [[CONFIRM: number of included revision rounds]]",
  },
  {
    q: "How does pricing work?",
    a: "We price from scope: drawings, disciplines, LOD and programme. Pilots and fixed-scope projects are quoted as a fixed fee. Dedicated teams are billed monthly. Send your drawings and we will scope it. [[CONFIRM: payment terms]]",
  },
  {
    q: "How does a pilot work?",
    a: "A pilot is a small, paid, fixed-scope package, such as one floor, one zone or one discipline. We agree scope and deliverables in writing, work to the same standards as a full project, and finish with a review call. You then decide whether to continue. [[CONFIRM: pilot scope and duration]]",
  },
];

/* ------------------------------ Final CTA ----------------------------- */

export const finalCta = {
  title: "Share your drawings or model.",
  line: "Get a scoped pilot proposal within [[CONFIRM: 48 hours]].",
  note: "We sign an NDA before you share the first file.",
};
