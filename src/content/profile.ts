/**
 * Single source of truth for every fact on the site.
 * Sourced from the résumé document (portfolio.docx).
 *
 * Rule: never add a number, client, result or claim that isn't verified.
 * The résumé marks unverified figures as placeholders ([XX%], [X]); those are
 * left out and only the qualitative statement is kept. Add a figure to a case
 * study's `stats` only when it is confirmed.
 */

export const site = {
  // Set NEXT_PUBLIC_SITE_URL in your hosting env (e.g. https://manikkavasagam.com)
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com").replace(/\/$/, ""),
  name: "Manikkavasagam V",
  fullName: "Manikkavasagam Varatharaj",
  shortName: "Manik",
  monogram: "MV.",
  role: "Digital Marketing Executive",
  disciplines: ["SEO", "AEO", "B2B Growth", "Marketing Automation"],
  location: {
    city: "Coimbatore",
    region: "Tamil Nadu",
    country: "India",
    countryCode: "IN",
  },
  email: "manikvaratharaj@gmail.com",
  linkedin: "https://www.linkedin.com/in/manikkavasagam-varatharaj",
  linkedinLabel: "linkedin.com/in/manikkavasagam-varatharaj",
  availability: "Open to full-time roles · on-site or remote",
  /** Downloadable CV in /public. Replace the file to update it; keep the name or change both. */
  cv: { url: "/cv/Manikkavasagam-V-CV.pdf", fileName: "Manikkavasagam-V-CV.pdf" },
  careerStart: "2021-04",
  title: "Manikkavasagam V — Digital Marketing Executive | SEO, AEO & B2B Growth",
  description:
    "Digital Marketing Executive in Coimbatore, India. 5+ years driving organic growth for B2B brands through SEO, AEO, and website design and development.",
} as const;

/** Whole years since the first role, rendered as "5+" etc. */
export function yearsOfExperience(now = new Date()): number {
  const [y, m] = site.careerStart.split("-").map(Number);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  return Math.floor(months / 12);
}

export const hero = {
  eyebrow: ["Digital marketing", "SEO", "AI search"],
  // Rendered line by line; `serif: true` marks the single editorial accent.
  headline: [
    [{ text: "Building" }],
    [{ text: "digital " }, { text: "growth", serif: true }],
    [{ text: "through search," }],
    [{ text: "data & strategy." }],
  ],
  intro:
    "I’m Manikkavasagam V, a Digital Marketing Executive with 5+ years driving organic growth and search performance for B2B brands across international markets — through SEO, AEO, and website design and development.",
  annotations: [
    { label: "SEO", note: "Organic growth" },
    { label: "AEO", note: "AI search visibility" },
    { label: "Automation", note: "n8n workflows" },
  ],
};

export const about = {
  statement: [
    [{ text: "SEO isn’t just" }],
    [{ text: "about rankings." }],
    [{ text: "It’s about connecting" }],
    [{ text: "intent", serif: true }, { text: " with" }],
    [{ text: "business growth." }],
  ],
  paragraphs: [
    "My career began in April 2021 at Kevinmax Technology, running SEO campaigns end to end with the SEO team lead, clients and content teams. I then spent over two years at Stan Ventures on manual blogger outreach and white-hat link building, before joining Kudo Metrics Technologies, where backlinks, on-page SEO, technical fixes, content and Reddit-led community growth came together.",
    "Since October 2025 I’ve been a Digital Marketing Executive at Sierra ODC, driving SEO strategy across priority international markets: search-intent and content-gap analysis, technical audits, website redesigns and migrations, and optimisation of blogs, microblogs, case studies and solution pages — while managing and mentoring the team that delivers it. I also design and build websites, so search is part of the build from day one, not a fix after launch.",
    "Search is changing. More answers now come from AI assistants rather than a list of links, so my focus has moved toward AEO (Answer Engine Optimisation) — making a brand easy for AI assistants to understand and cite — through entity-based SEO, topical authority and semantic content. I start from the data in Search Console and Analytics, and judge the work by the visibility, engagement and conversions it produces.",
  ],
  caption: "Current focus: AEO — how answer engines and AI assistants find, trust and cite a brand.",
  /** The About visual: how the same search looks as a list of links vs an AI answer. */
  shift: {
    query: "how does answer engine optimisation work",
    then: { label: "Then", title: "Search results", note: "Earn a place in a list of links." },
    now: { label: "Now", title: "AI answer", note: "Be the source the answer cites." },
  },
};

export const counters = [
  { value: 5, suffix: "+", pad: false, label: "Years in SEO & digital marketing" },
  { value: 4, suffix: "", pad: true, label: "Career roles, 2021 to today" },
  { value: 6, suffix: "", pad: true, label: "Licences & certifications earned" },
  { text: "AEO", label: "Current focus: AI search visibility" },
] as const;

export type Expertise = {
  title: string;
  summary: string;
  practice: string[];
  tools: string[];
};

export const expertise: Expertise[] = [
  {
    title: "SEO & Organic Growth",
    summary:
      "Search-intent analysis, content-gap identification and keyword opportunity mapping that turn search demand into qualified B2B traffic across international markets.",
    practice: [
      "Keyword research and search-intent mapping",
      "On-page optimisation: meta tags, internal linking, keyword placement",
      "White-hat link building and blogger outreach",
      "Local SEO and Google Business Profile optimisation",
    ],
    tools: ["Google Search Console", "SEMrush", "Ahrefs", "Moz", "Ubersuggest"],
  },
  {
    title: "Technical SEO",
    summary:
      "Audits that keep sites crawlable, indexable and fast — and redesigns and migrations that keep what the site has already earned.",
    practice: [
      "Crawlability, indexation and canonicalisation",
      "Structured data and XML sitemaps",
      "URL mapping and redirect validation for redesigns and migrations",
    ],
    tools: ["Google Search Console", "SEMrush", "Ahrefs", "Moz"],
  },
  {
    title: "Website Design & Development",
    summary:
      "Websites designed and built with search in mind from the first layout — fast, responsive and structured so both people and search engines can find their way.",
    practice: [
      "Website design with clear structure and user journeys",
      "Responsive, mobile-first development",
      "SEO-ready foundations: page speed, clean URLs, structured data and internal linking",
      "Local development and testing environments",
    ],
    // Add the web technologies you use (for example a CMS, HTML/CSS/JavaScript or a design tool).
    tools: ["XAMPP"],
  },
  {
    title: "AEO & AI Search Visibility",
    summary:
      "Entity-based SEO, topical authority and semantic content so answer engines and AI assistants can understand what a brand does — and cite it.",
    practice: [
      "Entity-based SEO and topical authority",
      "Structured content initiatives on priority pages",
      "Semantic content strategy",
    ],
    tools: ["Google Search Console", "SEMrush", "ChatGPT", "Claude"],
  },
  {
    title: "B2B Lead Generation",
    summary:
      "Search built around qualified intent rather than vanity traffic — organic visibility that reaches the people a B2B pipeline depends on.",
    practice: [
      "Solution pages, case studies and blogs optimised for buyer intent",
      "Campaigns measured on traffic and conversion, not only rankings",
      "Authority built through placements and brand mentions",
    ],
    tools: ["Google Search Console", "Google Analytics", "SEMrush"],
  },
  {
    title: "Analytics & Reporting",
    summary:
      "Performance reporting in Search Console, Analytics and SEO platforms that ends in a decision — insights converted into actionable initiatives every quarter.",
    practice: [
      "KPI tracking across search performance",
      "Performance reports that inform client and stakeholder decisions",
      "Client communication and project management",
    ],
    tools: ["Google Analytics", "Google Search Console", "SEMrush"],
  },
  {
    title: "Content Strategy",
    summary:
      "Blogs, microblogs, case studies and solution pages planned around intent, topical depth and internal linking — so they support each other instead of competing.",
    practice: [
      "Content-gap identification",
      "Reducing keyword cannibalisation",
      "Improving internal-linking coverage",
    ],
    tools: ["SEMrush", "Ubersuggest", "ChatGPT", "Claude"],
  },
  {
    title: "Marketing Automation",
    summary:
      "Workflow automation with n8n and Microsoft Power Automate, with AI tools such as ChatGPT and Claude built into research and content work.",
    practice: [
      "Workflow automation with n8n",
      "Microsoft Power Automate flows",
      "Prompt engineering for AI-assisted research and content",
    ],
    tools: ["n8n", "Microsoft Power Automate", "ChatGPT", "Claude"],
  },
];

export type Role = {
  company: string;
  title: string;
  start: string; // YYYY-MM
  end: string | null; // null = present
  period: string;
  focus: string;
  points: string[];
};

// Chronological: the journey reads from first role to current role.
export const roles: Role[] = [
  {
    company: "Kevinmax Technology",
    title: "SEO Analyst",
    start: "2021-04",
    end: "2021-12",
    period: "Apr 2021 – Dec 2021",
    focus: "End-to-end SEO campaigns",
    points: [
      "Designed and executed campaigns with the SEO team lead, clients and content teams.",
      "Delivered a 20% increase in website traffic and a 15% improvement in conversion rates through end-to-end campaign management.",
      "Improved organic search rankings and visibility through keyword research and on-page and off-page optimisation.",
      "Analysed campaign performance in Google Analytics, providing insights that shaped overall strategy.",
      "Conducted competitor analysis and market research to identify growth opportunities.",
    ],
  },
  {
    company: "Stan Ventures",
    title: "Junior Outreach Executive",
    start: "2022-01",
    end: "2024-05",
    period: "Jan 2022 – May 2024",
    focus: "Outreach and white-hat link building",
    points: [
      "Delivered guest-posting campaigns from a 20,000+ website database, securing high-authority backlinks every month.",
      "Vetted sites for genuine organic traffic through a 100% manual review process, raising average referring-domain authority.",
      "Built relationships with bloggers through manual outreach, generating placements and brand mentions.",
      "Contributed to blog, social and email content, supporting an increase in overall engagement.",
    ],
  },
  {
    company: "Kudo Metrics Technologies",
    title: "SEO Analyst",
    start: "2024-05",
    end: "2025-08",
    period: "May 2024 – Aug 2025",
    focus: "Backlinks, on-page, technical and community growth",
    points: [
      "Built backlink profiles through guest posting and outreach, improving domain authority across client sites.",
      "Published SEO-focused content that lifted keyword rankings and user engagement.",
      "Grew niche-specific traffic through Reddit marketing and community engagement strategies.",
      "Improved organic visibility by optimising on-page elements — meta tags, internal linking and keyword placement.",
      "Resolved crawl errors and improved site speed, lifting mobile-friendliness scores.",
      "Tracked KPIs in Google Analytics and SEO tools, delivering reports that informed clients’ strategic decisions.",
    ],
  },
  {
    company: "Sierra ODC Pvt Ltd",
    title: "Digital Marketing Executive",
    start: "2025-10",
    end: null,
    period: "Oct 2025 – Present",
    focus: "SEO strategy, AEO and team leadership",
    points: [
      "Drive SEO strategy across priority international markets, improving organic visibility and qualified B2B traffic.",
      "Grew keyword rankings through search-intent analysis, content-gap identification and keyword opportunity mapping in Google Search Console, SEMrush and Ubersuggest.",
      "Improved AI-search (AEO) visibility by leading entity-based SEO and structured content initiatives across priority pages, strengthening topical authority.",
      "Optimised enterprise content — blogs, microblogs, case studies and solution pages — reducing keyword cannibalisation and improving internal-linking coverage.",
      "Resolved technical SEO issues — crawlability, indexation, canonicalisation, structured data and sitemaps — through audits, improving site health.",
      "Led URL mapping and redirect validation across website redesigns and migrations, keeping organic traffic close to pre-migration levels.",
      "Deliver performance reporting through Google Search Console and SEO platforms, converting insights into actionable initiatives each quarter.",
      "Manage and mentor the team, improving on-time delivery of SEO and content output.",
    ],
  },
];

export type Motif = "migration" | "entities" | "crawl" | "outreach" | "growth" | "reporting";

export type CaseStudy = {
  slug: string;
  motif: Motif;
  category: string;
  title: string;
  summary: string;
  context: string;
  period: string;
  challenge: string;
  strategy: string;
  execution: string[];
  tools: string[];
  outcome: string;
  /** Verified figures only. Leave empty when the résumé has no number. */
  stats: { value: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "website-migration-seo",
    motif: "migration",
    category: "Enterprise SEO / Website migration",
    title: "Protecting organic search through website redesigns",
    summary:
      "URL mapping and redirect validation so redesigned sites keep the rankings, links and indexed pages they had already earned.",
    context: "Enterprise B2B platform",
    period: "2025 – present",
    challenge:
      "Every redesign or migration puts accumulated search equity at risk. Changed URLs, broken redirects and orphaned pages can undo rankings that took years to build.",
    strategy:
      "Treat the migration as an SEO project from day one: decide where every legacy URL should go before launch, then prove it after launch.",
    execution: [
      "Mapped legacy URLs to their closest new equivalents.",
      "Validated redirects across each redesign and migration.",
      "Checked canonicals, XML sitemaps and indexation around launch.",
      "Tracked organic traffic against pre-migration levels in Google Search Console.",
    ],
    tools: ["Google Search Console", "SEMrush"],
    outcome: "Organic traffic kept close to pre-migration levels through the redesigns.",
    stats: [], // TODO: add the verified "within X% of pre-migration traffic" figure
  },
  {
    slug: "aeo-ai-search-visibility",
    motif: "entities",
    category: "AEO / AI search visibility",
    title: "Making an enterprise brand easy for AI answers to cite",
    summary:
      "Entity-based SEO and structured content that help answer engines and AI assistants understand what the brand does.",
    context: "Enterprise B2B platform",
    period: "2025 – present",
    challenge:
      "Buyers now ask AI assistants and answer engines, not only search boxes. Pages written only around keywords gave those systems little to understand or cite.",
    strategy:
      "Build topical authority around clearly defined entities, and structure content so both search engines and language models can parse it.",
    execution: [
      "Led entity-based SEO and structured content initiatives across priority pages.",
      "Built topical authority through a semantic content strategy.",
      "Reduced keyword cannibalisation across blogs, microblogs, case studies and solution pages.",
      "Improved internal-linking coverage between related topics.",
    ],
    tools: ["Google Search Console", "SEMrush", "ChatGPT", "Claude"],
    outcome: "Improved AI-search visibility and stronger topical authority on priority pages.",
    stats: [], // TODO: add the verified number of priority pages / visibility change
  },
  {
    slug: "technical-seo-site-health",
    motif: "crawl",
    category: "Technical SEO / Site health",
    title: "Audit-led technical SEO that keeps sites crawlable and fast",
    summary:
      "Regular audits across crawlability, indexation, structured data and speed — fixing the foundations before chasing new keywords.",
    context: "Enterprise B2B platform and agency clients",
    period: "2024 – present",
    challenge:
      "Crawl errors, indexation gaps and slow mobile pages quietly cap how far good content can rank.",
    strategy:
      "Audit on a routine, prioritise issues by impact, and fix what stops search engines from reaching and understanding the site.",
    execution: [
      "Audited crawlability, indexation and canonicalisation.",
      "Resolved structured data and sitemap issues.",
      "Resolved crawl errors and improved site speed.",
      "Improved mobile-friendliness across client sites.",
    ],
    tools: ["Google Search Console", "SEMrush", "Ahrefs", "Moz"],
    outcome: "Improved site health on the enterprise platform and higher mobile-friendliness scores across client sites.",
    stats: [], // TODO: add verified site-health / mobile-score improvements
  },
  {
    slug: "manual-outreach-link-building",
    motif: "outreach",
    category: "Off-page SEO / Link building",
    title: "Manual outreach from a database of 20,000+ websites",
    summary:
      "Guest-posting campaigns where every prospect was checked by hand for a genuine organic audience before outreach began.",
    context: "Link-building agency",
    period: "2022 – 2024",
    challenge:
      "Links only help when they come from real sites with real audiences — and at scale, it’s easy to stop checking.",
    strategy:
      "Vet every site manually for genuine organic traffic, then earn placements through relationships rather than volume.",
    execution: [
      "Ran guest-posting campaigns from a 20,000+ website database.",
      "Reviewed prospect sites through a 100% manual vetting process.",
      "Built relationships with bloggers through personal outreach.",
      "Contributed to blog, social and email content.",
    ],
    tools: ["Mailshake", "Ahrefs", "Moz", "SEMrush"],
    outcome:
      "High-authority backlinks secured every month, higher average referring-domain authority, and placements and brand mentions earned through white-hat outreach.",
    stats: [
      { value: "20,000+", label: "Websites in the outreach database" },
      { value: "100%", label: "Manual site review" },
    ],
  },
  {
    slug: "seo-campaign-management",
    motif: "growth",
    category: "SEO campaigns / Growth",
    title: "End-to-end SEO campaigns with measurable lift",
    summary:
      "Campaigns planned with the SEO lead, clients and content teams — measured on traffic and conversions, not just rankings.",
    context: "Client SEO campaigns",
    period: "2021",
    challenge:
      "Clients needed search campaigns that moved traffic and conversions, not only ranking reports.",
    strategy:
      "Plan jointly with the SEO lead, clients and content teams, grounded in keyword research and competitor analysis.",
    execution: [
      "Keyword research, competitor analysis and market research.",
      "On-page and off-page optimisation.",
      "Campaign execution alongside the content team.",
      "Performance analysis in Google Analytics to steer the strategy.",
    ],
    tools: ["Google Analytics"],
    outcome: "A measurable lift in both website traffic and conversion rates.",
    stats: [
      { value: "+20%", label: "Website traffic" },
      { value: "+15%", label: "Conversion rate" },
    ],
  },
  {
    slug: "reporting-and-team-delivery",
    motif: "reporting",
    category: "Analytics / Team leadership",
    title: "Reporting that turns search data into quarterly initiatives",
    summary:
      "Performance reporting in Search Console and SEO platforms where every insight becomes an initiative — delivered by a team I manage and mentor.",
    context: "Enterprise B2B platform",
    period: "2025 – present",
    challenge:
      "Reports that stop at charts don’t change anything. Search data is only useful when it leads to a decision someone owns.",
    strategy:
      "End every reporting cycle with a short list of initiatives, and give the team the clarity to deliver them on time.",
    execution: [
      "Delivered performance reporting through Google Search Console and SEO platforms.",
      "Converted insights into actionable initiatives each quarter.",
      "Managed and mentored the SEO and content team.",
      "Improved on-time delivery of SEO and content output.",
    ],
    tools: ["Google Search Console", "Google Analytics", "SEMrush"],
    outcome: "A reporting rhythm that produces initiatives every quarter, and more reliable on-time delivery from the team.",
    stats: [], // TODO: add the verified initiatives-per-quarter and on-time delivery figures
  },
];

export type Tool = { name: string; use: string };
export type StackStage = "discover" | "build" | "earn" | "measure" | "scale";
export type StackGroup = { stage: StackStage; stageLabel: string; job: string; purpose: string; tools: Tool[] };

/** The Toolkit, grouped by the job each tool does in search-led growth. */
export const stack: StackGroup[] = [
  {
    stage: "discover",
    stageLabel: "Discover",
    job: "Research & SEO",
    purpose: "Keyword research, site audits and competitor analysis",
    tools: [
      { name: "Semrush", use: "Keyword research, site audits, competitor analysis" },
      { name: "Ahrefs", use: "Backlink analysis and site audits" },
      { name: "Moz", use: "Authority checks and audits" },
      { name: "Ubersuggest", use: "Keyword opportunity mapping" },
    ],
  },
  {
    stage: "build",
    stageLabel: "Build",
    job: "Website design & development",
    purpose: "Responsive, SEO-ready websites",
    // Add the web technologies you use here too.
    tools: [{ name: "XAMPP", use: "Local development and testing environments" }],
  },
  {
    stage: "earn",
    stageLabel: "Earn",
    job: "Outreach & local",
    purpose: "White-hat link building and local visibility",
    tools: [
      { name: "Mailshake", use: "Blogger outreach campaigns" },
      { name: "Google Business Profile", use: "Local SEO and Google My Business optimisation" },
    ],
  },
  {
    stage: "measure",
    stageLabel: "Measure",
    job: "Analytics & reporting",
    purpose: "Performance tracking, KPIs and reporting",
    tools: [
      { name: "Google Analytics", use: "Traffic, engagement and KPI tracking" },
      { name: "Google Search Console", use: "Search performance, indexation and crawl health" },
    ],
  },
  {
    stage: "scale",
    stageLabel: "Scale",
    job: "Automation & AI",
    purpose: "Workflow automation and AI-assisted research and content",
    tools: [
      { name: "n8n", use: "Workflow automation" },
      { name: "Microsoft Power Automate", use: "Microsoft 365 workflow automation" },
      { name: "ChatGPT", use: "Research support and prompt engineering" },
      { name: "Claude", use: "Analysis and content support" },
    ],
  },
];

/** From the résumé's Key Skills and experience. */
export const coreSkills = [
  "Keyword research & search intent",
  "On-page SEO",
  "Technical SEO",
  "Site migrations",
  "Website design",
  "Web development",
  "AEO & entity-based SEO",
  "Topical authority",
  "Semantic content strategy",
  "Local SEO & Google My Business",
  "Blogger outreach",
  "White-hat link building",
  "Analytics & reporting",
  "Client communication",
  "Project management",
  "Team mentoring",
];

export const education = [
  { years: "2018 – 2020", title: "Master of Business Administration", school: "Sri Ramakrishna Institute of Technology", show: true },
  { years: "2015 – 2018", title: "B.Sc", school: "Karpagam Academy of Higher Education", show: true },
  { years: "2015", title: "Higher Secondary Certificate (HSC)", school: "M.S.S.D Hr. Sec School", show: false },
  { years: "2013", title: "S.S.L.C", school: "PSG High School", show: false },
];

export type Certification = {
  title: string;
  issuer: string;
  issued?: string; // YYYY-MM
  expires?: string; // YYYY-MM
  /** Verification link. Leave empty until you have it — the title becomes a link once set. */
  url: string;
};

export const certifications: Certification[] = [
  { title: "Prompt Engineering for ChatGPT", issuer: "Great Learning Support", issued: "2026-04", url: "" },
  { title: "Digital Marketing", issuer: "HubSpot Academy", issued: "2025-11", expires: "2026-12", url: "" },
  { title: "Become an AI-Powered Marketer", issuer: "Semrush", issued: "2025-10", expires: "2026-10", url: "" },
  { title: "Email Marketing", issuer: "HubSpot", issued: "2023-06", expires: "2025-06", url: "" },
  { title: "Entrepreneurship for Everyone", issuer: "Indian Institute of Management, Bangalore", url: "" },
  { title: "Digital Marketing", issuer: "Qtree Technologies, Coimbatore", url: "" },
];

/**
 * How I work: the working philosophy and the process, as one section.
 * Each principle carries the concrete practices behind it.
 */
export const howIWork = {
  sentence:
    "Search behaviour changes. Platforms change. Algorithms change. The principle remains: understand people, measure what matters, and keep improving.",
  intro:
    "Search behaviour, platforms and algorithms keep changing. The way I work doesn’t: three principles, and the practices that put them to work.",
  changes: ["Search behaviour changes", "Platforms change", "Algorithms change"],
  principles: [
    {
      lead: "Understand",
      key: "people.",
      gloss: "Start from search intent — the questions buyers actually ask, in the words they use.",
      stages: [
        { title: "Research", items: ["Audience", "Competitors", "Search intent", "Market opportunity"] },
        { title: "Strategy", items: ["Channel strategy", "Search strategy", "Content direction", "Campaign planning"] },
      ],
    },
    {
      lead: "Measure what",
      key: "matters.",
      gloss: "Judge the work by visibility, engagement and conversion — the outcomes a business actually feels.",
      stages: [{ title: "Measurement", items: ["Analytics", "Lead tracking", "Performance reporting", "KPI tracking"] }],
    },
    {
      lead: "Keep",
      key: "improving.",
      gloss: "Every report ends in the next initiative. Execute, test, adjust — and go again.",
      stages: [
        { title: "Execution", items: ["SEO", "Campaigns", "Content", "Technical optimisation"] },
        { title: "Optimisation", items: ["Testing", "Iteration", "Continuous improvement"] },
      ],
    },
  ],
};

export const contact = {
  headline: [
    [{ text: "Have a project,", muted: true }],
    [{ text: "opportunity,", muted: true }],
    [{ text: "or idea? ", muted: true }, { text: "Let’s talk." }],
  ],
};

export const nav = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "credentials", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
