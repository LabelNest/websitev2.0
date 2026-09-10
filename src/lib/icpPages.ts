import { DiagramCenter, DiagramNode } from './icpConnections'

// Content for every /who-we-serve/[slug] page. Every capability/journey
// claim here is pulled from (or directly adapted from) the real copy
// already live on the product's own page -- see the comment above each
// entry for the source file. Never invent an integration that isn't
// actually described elsewhere on the site.

export interface JourneyStep {
  product: string
  color: string
  text: string
}

export interface Capability {
  icon: string
  name: string
  desc: string
}

// One tab per real product this persona's workflow touches -- always the
// diagram's center + its satellite nodes, same set, same order. Clicking a
// tab shows that product's own capabilities, sourced from its own page.
export interface ProductTab {
  product: string
  color: string
  href: string
  capabilities: Capability[]
}

export interface RelatedLink {
  slug: string
  label: string
}

export interface IcpPageData {
  slug: string
  metaTitle: string
  metaDesc: string
  eyebrow: string
  h1: string
  subhead: string
  primaryCtaLabel: string
  primaryCtaHref: string
  diagramCenter: DiagramCenter
  diagramNodes: DiagramNode[]
  diagramFooter: string
  journeyHeading: string
  journey: JourneyStep[]
  capabilitiesHeading: string
  productTabs: ProductTab[]
  related: RelatedLink[]
}

export const ICP_PAGES: Record<string, IcpPageData> = {
  // Sources: nestlens/command/page.tsx (CONNECTIONS, CAPABILITIES)
  gp: {
    slug: 'gp',
    metaTitle: 'For GPs & Funds — How Command, Atlas & Ascent Connect | LabelNest',
    metaDesc: 'Source deals in Atlas, run fund operations in Command, and watch portfolio company data sync in automatically from Ascent — one connected workflow for GPs and funds.',
    eyebrow: 'For GPs & Funds',
    h1: 'One workflow, from sourcing to exit.',
    subhead: 'Command is your fund’s operating system — but it doesn’t stand alone. The same structured data layer that powers Atlas feeds your deal pipeline, and once a portfolio company accepts your invite, their Ascent metrics sync straight into your fund view.',
    primaryCtaLabel: 'Open Command',
    primaryCtaHref: '/nestlens/command',
    diagramCenter: { icon: '⌘', label: 'Command', color: '#F97316' },
    diagramNodes: [
      { label: 'Atlas', sublabel: 'Deal sourcing', color: '#2563EB' },
      { label: 'Ascent', sublabel: 'Portfolio metrics', color: '#10B981' },
      { label: 'Valuation', sublabel: 'NAV · TVPI · DPI', color: '#7C3AED' },
    ],
    diagramFooter: 'Deal sourcing · Cap table · NAV · TVPI/DPI/IRR · LP reports',
    journeyHeading: 'What a fund actually does across the stack',
    journey: [
      { product: 'Atlas', color: '#2563EB', text: 'Source and pipeline new deals from the same structured data layer Atlas tracks — no separate tool, no re-keying a company you decide to follow.' },
      { product: 'Command', color: '#F97316', text: 'Run diligence checklists, manage term sheets, and take the deal to IC — structured reports generated from the same pipeline data, a decision trail LPs and auditors can follow.' },
      { product: 'Ascent', color: '#10B981', text: 'Once a portfolio company accepts your invite, their headcount, revenue, burn, runway, and valuation sync into your fund view — instead of a folder per company on someone’s laptop.' },
      { product: 'Connect', color: '#06B6D4', text: 'Your portfolio companies request mentorship or a verified audit directly from their own Ascent room — Connect routes it to a vetted partner, off your plate.' },
    ],
    capabilitiesHeading: 'The stack behind a fund',
    productTabs: [
      {
        product: 'Command', color: '#F97316', href: '/nestlens/command',
        capabilities: [
          { icon: '📊', name: 'Fund Dashboard', desc: 'A live view of your fund — portfolio health, LP commitments, pipeline stage, and deal flow, in one place.' },
          { icon: '🏦', name: 'LP Management', desc: 'Track commitments, capital calls, and reporting cadence across your limited partners.' },
          { icon: '🔍', name: 'Deal Sourcing', desc: 'Search and pipeline new deals directly from the same structured data layer Atlas tracks.' },
          { icon: '✅', name: 'IC Voting & Reports', desc: 'Investment committee voting on live deals, with structured IC reports generated from the same pipeline data.' },
        ],
      },
      {
        product: 'Atlas', color: '#2563EB', href: '/nestlens/intelligence',
        capabilities: [
          { icon: '🔍', name: 'Intelligence Engine', desc: 'Central entity intelligence tracking companies, funds, deals, people, GPs, LPs, and service providers with full relationship mapping.' },
          { icon: '📡', name: 'Live Market Signals', desc: 'AI-detected events: funding rounds, leadership changes, deal activity, regulatory filings, and competitive moves.' },
        ],
      },
      {
        product: 'Ascent', color: '#10B981', href: '/nestlens/capital',
        capabilities: [
          { icon: '💰', name: 'Financials', desc: 'Revenue, burn rate, runway, and projections — synced into your Command portfolio view once a company accepts your invite.' },
          { icon: '📈', name: 'Investment Docs', desc: 'Cap table, SAFE, term sheet, and use of funds, visible the moment you\'re invited in.' },
        ],
      },
      {
        product: 'Connect', color: '#06B6D4', href: '/nestlens/connect',
        capabilities: [
          { icon: '🤝', name: 'Mentor Connect', desc: 'Your portfolio companies request mentorship directly from their own Ascent room — routed to a vetted mentor.' },
          { icon: '✅', name: 'Verified Audit Requests', desc: 'Request a verified audit on a portfolio company\'s data room from a vetted audit partner.' },
        ],
      },
    ],
    related: [
      { slug: 'lp', label: 'LP / Investor' },
      { slug: 'founder', label: 'Founder / Startup' },
    ],
  },

  // Sources: nestlens/intelligence, nestlens/command, nestlens/capital (matching), nestlens/exchange
  lp: {
    slug: 'lp',
    metaTitle: 'For LPs & Investors — Research in Atlas, Manage Direct Holdings in Command | LabelNest',
    metaDesc: 'LPs research funds and GPs in Atlas before committing capital. If you invest directly — angel checks, family office, or a syndicate — run those holdings in Command the same way a fund would.',
    eyebrow: 'For LPs & Investors',
    h1: 'Research first. Manage what you hold, either way.',
    subhead: 'Atlas is where you research funds, GPs, and market activity before you commit capital. Command isn’t just for GPs, either — it has a real Family Offices role built in: a portfolio-first lens on the same data, with no deal pipeline or LP clutter you don’t need. Invited into a GP’s room instead? Command’s External Advisors role shows you exactly the rooms you’ve been invited into, and nothing else.',
    primaryCtaLabel: 'Open Atlas',
    primaryCtaHref: '/nestlens/intelligence',
    diagramCenter: { icon: '🔍', label: 'Atlas', color: '#2563EB' },
    diagramNodes: [
      { label: 'Command', sublabel: 'Family offices & advisors', color: '#F97316' },
      { label: 'Ascent', sublabel: 'LP-GP matching', color: '#10B981' },
      { label: 'Exchange', sublabel: 'Dataset credits', color: '#E91E8C' },
    ],
    diagramFooter: 'Fund & GP research · Family offices role · Matching · Dataset credits',
    journeyHeading: 'Institutional or direct — both paths run through the same data layer',
    journey: [
      { product: 'Atlas', color: '#2563EB', text: 'Research a GP or fund’s track record, market signals, and comparable activity before you commit capital.' },
      { product: 'Command', color: '#F97316', text: 'Invited into a GP’s fund data room? The External Advisors role shows you exactly the rooms you’ve been invited into, always current, nothing else. Investing directly instead? The Family Offices role gives you a portfolio-first lens on the same data — no deal pipeline or LP clutter you don’t need.' },
      { product: 'Ascent', color: '#10B981', text: 'Founders raising get matched to LPs and GPs whose investment criteria align on stage, sector, geography, and check size — including non-institutional investors, not just funds.' },
      { product: 'Exchange', color: '#E91E8C', text: 'Need one specific dataset rather than a full platform subscription? Buy it directly, KYC-verified and escrow-protected.' },
    ],
    capabilitiesHeading: 'The stack behind an investor',
    productTabs: [
      {
        product: 'Atlas', color: '#2563EB', href: '/nestlens/intelligence',
        capabilities: [
          { icon: '🔍', name: 'Intelligence Engine', desc: 'Central entity intelligence tracking companies, funds, deals, people, GPs, LPs, and service providers with full relationship mapping.' },
          { icon: '📡', name: 'Live Market Signals', desc: 'AI-detected events: funding rounds, leadership changes, deal activity, regulatory filings, and competitive moves.' },
          { icon: '🌐', name: 'Global Search & Filters', desc: 'Unified search across all entity types, filtered by sector, stage, geography, fund size, and deal type.' },
        ],
      },
      {
        product: 'Command', color: '#F97316', href: '/nestlens/command',
        capabilities: [
          { icon: '🏠', name: 'Family Offices Role', desc: 'A portfolio-first lens on the same data a fund sees, with no deal pipeline or LP clutter you don\'t need.' },
          { icon: '👁️', name: 'External Advisors Role', desc: 'See exactly the rooms you\'ve been invited into, and nothing else — always current, never a stale export.' },
        ],
      },
      {
        product: 'Ascent', color: '#10B981', href: '/nestlens/capital',
        capabilities: [
          { icon: '🏦', name: 'LP-GP Matching', desc: 'Founders raising get matched to LPs and GPs whose criteria align on stage, sector, geography, and check size — including non-institutional investors.' },
        ],
      },
      {
        product: 'Exchange', color: '#E91E8C', href: '/nestlens/exchange',
        capabilities: [
          { icon: '📊', name: 'Datasets', desc: 'Company data, fund performance, deal flow, financials, and market intelligence — buy the one dataset you need.' },
          { icon: '✅', name: 'KYC Verified Sellers', desc: 'Every seller has completed identity and business verification before any listing goes live.' },
        ],
      },
    ],
    related: [
      { slug: 'gp', label: 'GP / Fund' },
      { slug: 'researcher', label: 'Researcher / Boutique Firm' },
    ],
  },

  // Sources: nestlens/capital (DATA_ROOM_SECTIONS, MATCHING), nestlens/connect, nestlens/orbit, nestlens/command
  founder: {
    slug: 'founder',
    metaTitle: 'For Founders & Startups — How Ascent Connects to the Rest | LabelNest',
    metaDesc: 'Your Ascent data room is the center of it — matched to LPs, GPs, and service providers, with mentor and audit access one click away, and metrics that sync straight into a fund’s view once you’re invited.',
    eyebrow: 'For Founders & Startups',
    h1: 'One data room. It goes everywhere you need it to.',
    subhead: 'You build your data room once, in Ascent. From there it’s what gets you matched to investors, what a GP sees once you’re invited into Command, what you request a mentor or audit against in Connect, and — if you came through a programme — where your Orbit cohort onboarding leads.',
    primaryCtaLabel: 'Open Ascent',
    primaryCtaHref: '/nestlens/capital',
    diagramCenter: { icon: '🚀', label: 'Ascent', color: '#10B981' },
    diagramNodes: [
      { label: 'Command', sublabel: 'GP’s fund view', color: '#F97316' },
      { label: 'Connect', sublabel: 'Mentor & audit', color: '#06B6D4' },
      { label: 'Orbit', sublabel: 'Cohort onboarding', color: '#7C3AED' },
    ],
    diagramFooter: 'Data room · LP-GP matching · SP matching · Grants · Mentor access',
    journeyHeading: 'What one data room actually unlocks',
    journey: [
      { product: 'Ascent', color: '#10B981', text: 'Fill your 10-section data room once — profile, team, financials, legal, cap table, product, and more — with a real completeness score, not a folder of loose files.' },
      { product: 'Ascent Matching', color: '#10B981', text: 'Get matched to LPs and GPs whose investment criteria align on stage, sector, geography, and check size — plus service providers, grants, and acquisition partners matched to what you actually need.' },
      { product: 'Connect', color: '#06B6D4', text: 'Request mentorship or a verified audit directly from your room — routed to a vetted partner, built into your workflow instead of a separate tool to find one.' },
      { product: 'Command', color: '#F97316', text: 'Once a fund invites you in, your headcount, revenue, burn, runway, and valuation sync straight into their portfolio view — you update it once.' },
      { product: 'Orbit', color: '#7C3AED', text: 'If you were selected into an accelerator or incubator cohort, your onboarding there carries straight into Ascent for your own fundraise prep.' },
    ],
    capabilitiesHeading: 'The stack behind a founder',
    productTabs: [
      {
        product: 'Ascent', color: '#10B981', href: '/nestlens/capital',
        capabilities: [
          { icon: '🏢', name: 'Profile & Identity', desc: 'Company name, website, stage, business model, location.' },
          { icon: '📈', name: 'Investment Docs', desc: 'Cap table, SAFE, term sheet, use of funds.' },
          { icon: '🏦', name: 'LP-GP Matching', desc: 'Matched to limited partners and general partners whose investment criteria align with your stage, sector, geography, and check size.' },
          { icon: '🏆', name: 'Grant & Competition Discovery', desc: 'Non-dilutive capital — government grants, accelerator programs, startup competitions, and innovation awards matched to your profile.' },
        ],
      },
      {
        product: 'Command', color: '#F97316', href: '/nestlens/command',
        capabilities: [
          { icon: '🚀', name: 'Portfolio Company Tracking', desc: 'Once a fund invites you in, your headcount, revenue, burn, runway, and valuation sync straight into their view — you update it once.' },
        ],
      },
      {
        product: 'Connect', color: '#06B6D4', href: '/nestlens/connect',
        capabilities: [
          { icon: '🤝', name: 'Mentor Connect', desc: 'Request mentorship directly from your data room — routed to a vetted mentor.' },
          { icon: '✅', name: 'Verified Audit Requests', desc: 'Request a verified audit on your data room from a vetted audit partner.' },
        ],
      },
      {
        product: 'Orbit', color: '#7C3AED', href: '/nestlens/orbit',
        capabilities: [
          { icon: '🎓', name: 'Cohort Onboarding', desc: 'If you were selected into an accelerator or incubator cohort, your onboarding there carries straight into Ascent for your own fundraise prep.' },
        ],
      },
    ],
    related: [
      { slug: 'incubator', label: 'Incubator / Accelerator' },
      { slug: 'gp', label: 'GP / Fund' },
    ],
  },

  // Sources: nestlens/orbit (CAPABILITIES, OS_CAPABILITIES)
  incubator: {
    slug: 'incubator',
    metaTitle: 'For Incubators & Accelerators — Orbit into Ascent | LabelNest',
    metaDesc: 'Run intake, screening, and evaluation in Orbit. Selected startups onboard directly into their own Ascent data room — no re-entry, no separate tool for what happens after acceptance.',
    eyebrow: 'For Incubators & Accelerators',
    h1: 'From application to capital-ready, one carry-through.',
    subhead: 'Orbit runs your programme — intake, screening, evaluation, cohort onboarding. The part most programme software stops at is the part that matters most: once a startup is selected, they onboard straight into their own Ascent data room to get investor-ready, and your mentor network follows them there.',
    primaryCtaLabel: 'Open Orbit',
    primaryCtaHref: '/nestlens/orbit',
    diagramCenter: { icon: '🌐', label: 'Orbit', color: '#7C3AED' },
    diagramNodes: [
      { label: 'Ascent', sublabel: 'Fundraise prep', color: '#10B981' },
      { label: 'Connect', sublabel: 'Mentor sessions', color: '#06B6D4' },
    ],
    diagramFooter: 'Intake · Screening · Evaluation · Cohort onboarding',
    journeyHeading: 'What running a programme looks like end to end',
    journey: [
      { product: 'Orbit', color: '#7C3AED', text: 'A configurable application form built for real volume — thousands of applicants, not a handful — with structured screening criteria so your team reviews consistently at scale.' },
      { product: 'Orbit', color: '#7C3AED', text: 'Run multiple evaluation rounds with your own reviewer panel, scoring rubric, and pass/fail criteria.' },
      { product: 'Ascent', color: '#10B981', text: 'Selected startups onboard directly into a cohort — carrying straight into Ascent for their own fundraise prep, with a real completeness score, not a spreadsheet you chase.' },
      { product: 'Connect', color: '#06B6D4', text: 'Your mentor network is a directory assigned to startups, with every session logged against the pairing — visible to you, not scattered across calendars.' },
    ],
    capabilitiesHeading: 'The stack behind a programme',
    productTabs: [
      {
        product: 'Orbit', color: '#7C3AED', href: '/nestlens/orbit',
        capabilities: [
          { icon: '📥', name: 'Application Intake', desc: 'A configurable application form for your programme, built for real volume.' },
          { icon: '🔍', name: 'Screening & Shortlisting', desc: 'Structured screening criteria and shortlisting workflow so your team reviews consistently at scale.' },
          { icon: '🎓', name: 'Cohort Onboarding', desc: 'Selected startups onboard directly into a cohort — carrying straight into Ascent for their own fundraise prep.' },
          { icon: '🧭', name: 'Mentor Network', desc: 'A directory of external mentors, assigned to startups, with every session logged against the pairing.' },
        ],
      },
      {
        product: 'Ascent', color: '#10B981', href: '/nestlens/capital',
        capabilities: [
          { icon: '🏢', name: 'Data Room', desc: 'Every selected startup gets a real 10-section data room — a completeness score you can see, not a spreadsheet you chase.' },
        ],
      },
      {
        product: 'Connect', color: '#06B6D4', href: '/nestlens/connect',
        capabilities: [
          { icon: '✅', name: 'Verified Audit Requests', desc: 'Your cohort companies can request a verified audit on their data room from a vetted partner.' },
        ],
      },
    ],
    related: [
      { slug: 'founder', label: 'Founder / Startup' },
      { slug: 'partner', label: 'Ecosystem Partner (SP)' },
    ],
  },

  // Sources: nestlens/connect (CAPABILITIES), nestlens/intelligence
  partner: {
    slug: 'partner',
    metaTitle: 'For Ecosystem Partners — Get Found in Atlas, Get a Dashboard in Connect | LabelNest',
    metaDesc: 'Law firms, auditors, and consultants get discovered through Atlas’s entity intelligence, and can join Connect as a vetted mentor or audit partner with their own request-queue dashboard.',
    eyebrow: 'For Ecosystem Partners',
    h1: 'Discoverable first. Built-in, if you’re vetted.',
    subhead: 'Every service provider LabelNest tracks is discoverable through Atlas’s entity intelligence — the same layer GPs and founders search when they need a partner. Get vetted, and Connect gives you your own dashboard: a real request queue, not the founder-facing navigation.',
    primaryCtaLabel: 'Open Atlas',
    primaryCtaHref: '/nestlens/intelligence',
    diagramCenter: { icon: '🌐', label: 'Atlas', color: '#2563EB' },
    diagramNodes: [
      { label: 'Connect', sublabel: 'Vetted partner dashboard', color: '#06B6D4' },
      { label: 'Ascent', sublabel: 'Founder requests', color: '#10B981' },
      { label: 'Command', sublabel: 'Fund requests', color: '#F97316' },
    ],
    diagramFooter: 'Get discovered · Mentor Connect · Verified audits · Your own dashboard',
    journeyHeading: 'How you show up across the ecosystem',
    journey: [
      { product: 'Atlas', color: '#2563EB', text: 'Tracked as a service-provider entity in the same intelligence layer GPs, LPs, and founders search — this is how most partners are found first.' },
      { product: 'Connect', color: '#06B6D4', text: 'Apply to join as a vetted mentor or verified audit partner. Once approved, you get your own account and dashboard — never the founder-facing navigation, just your real request queue.' },
      { product: 'Ascent', color: '#10B981', text: 'Founders request mentorship or a verified audit directly from their own data room — routed to you through Connect, built into their workflow.' },
      { product: 'Command', color: '#F97316', text: 'Funds request the same for their portfolio companies — the same vetted network, reached from the fund side.' },
    ],
    capabilitiesHeading: 'The stack behind a partner',
    productTabs: [
      {
        product: 'Atlas', color: '#2563EB', href: '/nestlens/intelligence',
        capabilities: [
          { icon: '🔍', name: 'Intelligence Engine', desc: 'Tracked as a service-provider entity in the same layer GPs, LPs, and founders search when they need a partner.' },
        ],
      },
      {
        product: 'Connect', color: '#06B6D4', href: '/nestlens/connect',
        capabilities: [
          { icon: '🤝', name: 'Mentor Connect', desc: 'Founders request mentorship directly from Ascent or Command; mentors run their own dashboard to accept requests and track engagements.' },
          { icon: '✅', name: 'Verified Audit Requests', desc: 'Founders request a verified audit on their data room from a vetted audit partner — built into the workflow, not a separate tool.' },
          { icon: '📋', name: 'Audit Partner Dashboard', desc: 'Audit partners get their own account and dashboard — never the founder-facing navigation, just their real request queue.' },
          { icon: '🔭', name: 'Scouting Partner Dashboard', desc: 'Scouting partners get a dedicated workspace to track the founders and funds they refer into the ecosystem.' },
        ],
      },
      {
        product: 'Ascent', color: '#10B981', href: '/nestlens/capital',
        capabilities: [
          { icon: '🔧', name: 'SP Matching', desc: 'Matched to service providers based on what a company needs, where they are, and who has helped companies like them before.' },
        ],
      },
      {
        product: 'Command', color: '#F97316', href: '/nestlens/command',
        capabilities: [
          { icon: '✅', name: 'Verified Audit Requests', desc: 'Funds request the same vetted network for their portfolio companies, reached from the fund side.' },
        ],
      },
    ],
    related: [
      { slug: 'incubator', label: 'Incubator / Accelerator' },
      { slug: 'researcher', label: 'Researcher / Boutique Firm' },
    ],
  },

  // Sources: nestlens/intelligence, nestlens/ecosystem (Observatory), nestlens/exchange
  researcher: {
    slug: 'researcher',
    metaTitle: 'For Researchers & Boutique Firms — Atlas, Without the Full-Platform Lock-In | LabelNest',
    metaDesc: 'Search, filter, and track private-market entities in Atlas. Free published research through Atlas Observatory, or buy a single dataset through Exchange — no seat contract required.',
    eyebrow: 'For Researchers & Boutique Firms',
    h1: 'Research at the depth you actually need.',
    subhead: 'Atlas is the same structured intelligence layer institutional teams use — companies, funds, deals, people, and the relationships between them — priced and packaged for a boutique fund, angel network, or independent analyst instead of a $30K+ annual seat contract.',
    primaryCtaLabel: 'Open Atlas',
    primaryCtaHref: '/nestlens/intelligence',
    diagramCenter: { icon: '🔍', label: 'Atlas', color: '#2563EB' },
    diagramNodes: [
      { label: 'Observatory', sublabel: 'Free published research', color: '#7C3AED' },
      { label: 'Exchange', sublabel: 'Single-dataset credits', color: '#E91E8C' },
      { label: 'Command', sublabel: 'If you invest directly', color: '#F97316' },
    ],
    diagramFooter: 'Search & filters · Live signals · Free research · Dataset credits',
    journeyHeading: 'Three depths of access, same underlying data',
    journey: [
      { product: 'Atlas Observatory', color: '#7C3AED', text: 'Published research and market trends, free to browse — no Atlas plan required to unlock an individual report.' },
      { product: 'Atlas', color: '#2563EB', text: 'Full search and filtering across all entity types — sector, stage, geography, fund size, deal type — plus AI-detected market signals on a daily cadence.' },
      { product: 'Exchange', color: '#E91E8C', text: 'Need one specific dataset instead of a platform subscription? Buy it directly, KYC-verified and escrow-protected, with a quality score attached.' },
      { product: 'Command', color: '#F97316', text: 'If your research turns into a direct check, Command gives you the same cap table and returns tooling a fund uses.' },
    ],
    capabilitiesHeading: 'The stack behind a researcher',
    productTabs: [
      {
        product: 'Atlas', color: '#2563EB', href: '/nestlens/intelligence',
        capabilities: [
          { icon: '🌐', name: 'Global Search & Filters', desc: 'Unified search across all entity types with structured filtering by sector, stage, geography, fund size, deal type, and contact role.' },
          { icon: '📡', name: 'Live Market Signals', desc: 'AI-detected events: funding rounds, leadership changes, deal activity, regulatory filings, and competitive moves.' },
          { icon: '📬', name: 'Contact Intelligence', desc: 'Verified contact profiles with health scores, email, LinkedIn, title taxonomy, firm history, and people-moves detection.' },
          { icon: '📊', name: 'Exports & Workflow Tools', desc: 'Export structured data, track entities across sessions, set alerts for changes, and compare companies side-by-side.' },
        ],
      },
      {
        product: 'Observatory', color: '#7C3AED', href: '/nestlens/intelligence/observatory',
        capabilities: [
          { icon: '🔭', name: 'Published Research', desc: 'Insights and trends for private markets, free to browse — no Atlas plan required to unlock an individual report.' },
        ],
      },
      {
        product: 'Exchange', color: '#E91E8C', href: '/nestlens/exchange',
        capabilities: [
          { icon: '📊', name: 'Datasets', desc: 'Company data, fund performance, deal flow, financials, market intelligence — one dataset instead of a platform subscription.' },
          { icon: '🤖', name: 'AI Training Data', desc: 'Labelled datasets, annotation outputs, domain-specific training data.' },
        ],
      },
      {
        product: 'Command', color: '#F97316', href: '/nestlens/command',
        capabilities: [
          { icon: '🏠', name: 'Family Offices Role', desc: 'If your research turns into a direct check, the same cap table and returns tooling a fund uses.' },
        ],
      },
    ],
    related: [
      { slug: 'lp', label: 'LP / Investor' },
      { slug: 'exchange', label: 'Data Buyer / Seller' },
    ],
  },

  // Sources: nestlens/exchange (CATEGORIES, trust features)
  exchange: {
    slug: 'exchange',
    metaTitle: 'For Data Buyers & Sellers — NestLens Exchange | LabelNest',
    metaDesc: 'Buy or sell structured private-market datasets, AI training data, research, and more — KYC-verified counterparties, escrow-protected transactions, and a quality score on every listing.',
    eyebrow: 'For Data Buyers & Sellers',
    h1: 'A marketplace, not a platform lock-in.',
    subhead: 'Exchange is where structured data actually changes hands — datasets, research, AI training data, and more — between KYC-verified counterparties, with payment held in escrow until delivery is confirmed. Free to browse and post as a buyer; sellers pay only for an active listing.',
    primaryCtaLabel: 'Open Exchange',
    primaryCtaHref: '/nestlens/exchange',
    diagramCenter: { icon: '🔄', label: 'Exchange', color: '#E91E8C' },
    diagramNodes: [
      { label: 'Atlas', sublabel: 'Market context', color: '#2563EB' },
      { label: 'Command', sublabel: 'Fund diligence buyers', color: '#F97316' },
    ],
    diagramFooter: 'Datasets · Research · AI training data · Escrow-protected',
    journeyHeading: 'Buying or selling, the same trust layer applies',
    journey: [
      { product: 'Exchange', color: '#E91E8C', text: 'Every seller completes identity and business verification before any listing goes live — you know exactly who you’re buying from.' },
      { product: 'Exchange', color: '#E91E8C', text: 'Payment is held in escrow until delivery is confirmed — no upfront risk for buyers, guaranteed payment for sellers on delivery.' },
      { product: 'Atlas', color: '#2563EB', text: 'Browsing for market context before you buy? The same entity intelligence layer that powers Atlas informs what’s available and how it’s categorized.' },
      { product: 'Command', color: '#F97316', text: 'Fund teams buying comparable-deal or market datasets to support their own diligence and LP reports are some of Exchange’s regular buyers.' },
    ],
    capabilitiesHeading: 'The stack behind a data buyer or seller',
    productTabs: [
      {
        product: 'Exchange', color: '#E91E8C', href: '/nestlens/exchange',
        capabilities: [
          { icon: '📊', name: 'Datasets', desc: 'Company data, fund performance, deal flow, financials, market intelligence.' },
          { icon: '🤖', name: 'AI Training Data', desc: 'Labelled datasets, annotation outputs, domain-specific training data.' },
          { icon: '✅', name: 'KYC Verified Sellers', desc: 'Every seller has completed identity and business verification before any listing goes live.' },
          { icon: '🔒', name: 'Escrow Protected', desc: 'Payment held in escrow until delivery is confirmed — no upfront risk for buyers, guaranteed payment for sellers.' },
        ],
      },
      {
        product: 'Atlas', color: '#2563EB', href: '/nestlens/intelligence',
        capabilities: [
          { icon: '🔍', name: 'Intelligence Engine', desc: 'The same entity intelligence layer that powers Atlas informs what\'s available on Exchange and how it\'s categorized.' },
        ],
      },
      {
        product: 'Command', color: '#F97316', href: '/nestlens/command',
        capabilities: [
          { icon: '📈', name: 'Comparable Deals & Reports', desc: 'Fund teams buying comparable-deal or market datasets to support their own diligence and LP reports are regular Exchange buyers.' },
        ],
      },
    ],
    related: [
      { slug: 'researcher', label: 'Researcher / Boutique Firm' },
      { slug: 'lp', label: 'LP / Investor' },
    ],
  },
}
