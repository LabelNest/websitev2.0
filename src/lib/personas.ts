// Single source of truth for "who we serve" -- persona -> primary product
// routing, shared by the homepage hero pill row, /who-we-serve, the
// /ecosystem compact table, and the category-aware banner on every /vs/*
// page (via VsPageLayout.tsx's VsCategory -> PersonaKey mapping below).
// Edit copy here once; it propagates everywhere. Atlas is deliberately NOT
// one of these rows -- see ATLAS_NOTE -- it's the research layer nearly
// every persona also touches, not a single persona's destination.

export type PersonaKey = 'gp' | 'lp' | 'founder' | 'incubator' | 'partner' | 'researcher' | 'exchange'

export interface Persona {
  key: PersonaKey
  icon: string
  label: string       // "You are a..."
  stack: string       // "Start here" -- product name(s)
  stackHref: string    // primary product route
  blurb: string
  cta: string
  color: string        // matches the primary product's accent color on /nestlens (Atlas=blue, Exchange=pink, Orbit=purple, Ascent=green, Command=orange)
}

export const PERSONAS: Persona[] = [
  {
    key: 'gp',
    icon: '🏢',
    label: 'GP / Fund',
    stack: 'Command + Atlas + Ascent',
    stackHref: '/nestlens/command',
    blurb: 'Discover opportunities, run your investment workflow, and work with portfolio companies.',
    cta: 'Explore Command',
    color: '#F97316',
  },
  {
    key: 'lp',
    icon: '💼',
    label: 'LP / Investor',
    stack: 'Atlas + Command',
    stackHref: '/nestlens/intelligence',
    blurb: 'Research funds, GPs, and market activity before you commit capital. Command has a real Family Offices role for running your own direct portfolio, and an External Advisors role when a GP invites you into their room.',
    cta: 'Explore Atlas',
    color: '#2563EB',
  },
  {
    key: 'founder',
    icon: '🚀',
    label: 'Founder / Startup',
    stack: 'Ascent',
    stackHref: '/nestlens/capital',
    blurb: 'Build, prepare, raise, and scale with the infrastructure needed for the next stage.',
    cta: 'Explore Ascent',
    color: '#10B981',
  },
  {
    key: 'incubator',
    icon: '🏫',
    label: 'Incubator / Accelerator',
    stack: 'Orbit + Ascent',
    stackHref: '/nestlens/orbit',
    blurb: 'Run cohorts, manage founders, and help companies become capital-ready.',
    cta: 'Explore Orbit',
    color: '#7C3AED',
  },
  {
    key: 'partner',
    icon: '⚖️',
    label: 'Ecosystem Partner (SP)',
    stack: 'Atlas + Connect',
    stackHref: '/nestlens/intelligence',
    blurb: 'Law firms, auditors, and consultants — get found through Atlas, or join Connect as a vetted mentor or audit partner.',
    cta: 'Explore Atlas',
    color: '#2563EB',
  },
  {
    key: 'researcher',
    icon: '🌐',
    label: 'Researcher / Boutique Firm',
    stack: 'Atlas',
    stackHref: '/nestlens/intelligence',
    blurb: 'Research companies, founders, investors, sectors, and the relationships shaping private markets.',
    cta: 'Explore Atlas',
    color: '#2563EB',
  },
  {
    key: 'exchange',
    icon: '🔄',
    label: 'Data Buyer / Seller',
    stack: 'Exchange',
    stackHref: '/nestlens/exchange',
    blurb: 'Buy or sell structured private-market datasets, with KYC-verified counterparties and escrow-protected transactions.',
    cta: 'Explore Exchange',
    color: '#E91E8C',
  },
]

export const ATLAS_NOTE = {
  title: 'Atlas underlies all of it.',
  body: 'GPs, LPs, Funds, Ecosystem Partners, Ecosystem Builders, researchers, and boutique firms all research through Atlas first — it\'s the shared intelligence layer, not just one persona\'s product.',
}

export const WHO_WE_SERVE_TAGLINE = 'One ecosystem. Different entry points.'

// vs/* pages carry a VsCategory (see VsPageLayout.tsx) -- this maps each to
// the persona(s) most relevant to that comparison's searcher intent, so the
// banner can highlight instead of listing all 7 personas at equal weight.
// 'nesthr' is intentionally absent: those 12 pages compare a different
// product to a different audience entirely, and show no persona banner.
export const VS_CATEGORY_TO_PERSONAS: Record<string, PersonaKey[]> = {
  intelligence: ['lp', 'researcher'],
  'capital-readiness': ['founder'],
  'fund-data-room': ['gp'],
  exchange: ['exchange'],
}
