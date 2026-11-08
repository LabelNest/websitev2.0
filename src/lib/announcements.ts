// Announcements are plain data, not database rows: add a new object to the top
// of ANNOUNCEMENTS and it appears on /announcements, gets its own page at
// /announcements/<slug>, a copy-link button, and a sitemap entry.

export const SITE_URL = 'https://labelnest.in'

export type AnnouncementBlock =
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'note'; text: string }
  | { t: 'lead'; text: string }
  | { t: 'facts'; items: { label: string; value: string }[] }
  | { t: 'cards'; items: { title: string; text?: string; bullets?: string[] }[] }
  | { t: 'steps'; items: { label: string; title: string; bullets: string[] }[] }

export interface Announcement {
  slug: string
  title: string
  summary: string
  date: string // YYYY-MM-DD
  tag: string
  readTime: string
  body: AnnouncementBlock[]
  // Ready-to-paste text for LinkedIn and other social posts.
  social: string
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    slug: 'strategic-technology-product-growth-partnership',
    title: 'LabelNest announces a Strategic Technology, Product & Growth Partnership with an emerging multi-sector venture',
    summary:
      'LabelNest is partnering with an emerging venture building across Education, Healthcare and Financial Services, with a longer-term ambition to expand into Investment Banking and Private Markets. LabelNest contributes product development, technology infrastructure, sales execution and channel distribution.',
    date: '2026-11-08',
    tag: 'Partnership',
    readTime: '5 min read',
    social: `LabelNest announces a Strategic Partnership with an Emerging Multi-Sector Venture

LabelNest is entering a strategic partnership with an emerging venture building across Education, Healthcare and Financial Services, with a longer-term ambition to expand into Investment Banking and Private Markets.

As its Strategic Technology, Product & Growth Partner, LabelNest will lead technology development, product engineering, platform infrastructure, sales enablement and channel distribution.

The collaboration will also draw on LabelNest's technology ecosystem:

• Command: fund management, investment operations and portfolio intelligence
• Ascent: capital readiness, digital data rooms, due diligence and fundraising infrastructure
• Atlas: private market intelligence, investor discovery and institutional research
• NestHR: workforce management and HR operations

Through a revenue-sharing partnership, both teams aim to build, commercialise and scale technology-led businesses across multiple sectors.

Building together. Growing together.

#LabelNest #StrategicPartnership #SaaS #FinTech #InvestmentBanking #PrivateMarkets`,
    body: [
      {
        t: 'lead',
        text: 'LabelNest is partnering with an emerging venture to build technology-led businesses across Education, Healthcare and Financial Services, with a longer-term ambition to reach investment banking and private markets.',
      },
      {
        t: 'facts',
        items: [
          { label: 'LabelNest’s role', value: 'Strategic Technology, Product & Growth Partner' },
          { label: 'The venture', value: 'Business vision and sector expansion' },
          { label: 'Starting with', value: 'SaaS for Education, Healthcare and institutions' },
          { label: 'Commercial model', value: 'Shared growth, through revenue sharing' },
        ],
      },

      { t: 'h2', text: 'The partnership at a glance' },
      {
        t: 'ul',
        items: [
          'The venture is building a diversified business across institutional technology, financial services and investment banking.',
          'It enters the market first through SaaS products for schools, coaching centres, hospitals and institutional management.',
          'LabelNest provides the technology, product engineering, sales execution and channel distribution.',
          'Both teams share in the growth: this is a revenue-sharing partnership, not a conventional vendor arrangement.',
        ],
      },

      { t: 'h2', text: 'Where the venture starts' },
      { t: 'p', text: 'Three SaaS verticals form the initial market entry.' },
      {
        t: 'cards',
        items: [
          {
            title: 'Education technology',
            bullets: [
              'School Management ERP',
              'Coaching Centre Management ERP',
              'Admissions, attendance, fees, students and faculty',
              'Institutional administration and reporting',
            ],
          },
          {
            title: 'Healthcare technology',
            bullets: [
              'Hospital Management ERP',
              'Patient registration and administration',
              'Appointments, billing, pharmacy and inventory',
              'Operational reporting for hospital administrators',
            ],
          },
          {
            title: 'Financial services',
            bullets: [
              'Technology and operational infrastructure for financial institutions',
              'Investment and institutional workflow solutions',
              'Expansion into financial services and investment banking over time',
            ],
          },
        ],
      },
      {
        t: 'p',
        text: 'The first focus is smaller cities and underserved institutional markets: affordable subscriptions, regional-language access and a distributed sales network.',
      },

      { t: 'h2', text: 'What LabelNest brings' },
      {
        t: 'cards',
        items: [
          {
            title: 'Technology and product',
            bullets: [
              'Product architecture and technical strategy',
              'UI/UX design and engineering',
              'Web and mobile applications',
              'Backend, databases and APIs',
              'Security, access management and tenant isolation',
              'Cloud deployment, upgrades, integrations and support',
            ],
          },
          {
            title: 'Sales and commercial growth',
            bullets: [
              'Go-to-market strategy and sales enablement',
              'Institutional customer acquisition',
              'Sales process, CRM and pipeline management',
              'Pricing and subscription infrastructure',
              'Channel partnerships and strategic alliances',
              'Performance tracking and commercial reporting',
            ],
          },
          {
            title: 'Distribution network',
            bullets: [
              'Student sales associates',
              'City-level sales leadership and regional expansion',
              'Training, certification and enablement',
              'Lead management and customer attribution',
              'Commission tracking and channel performance',
            ],
          },
          {
            title: 'Ecosystem integration',
            text: 'Selected LabelNest products support the venture’s operations and future expansion: Command, Ascent, Atlas and NestHR.',
          },
        ],
      },

      { t: 'h2', text: 'Powered by the LabelNest ecosystem' },
      { t: 'p', text: 'These capabilities are planned for the venture as it grows. Each is intended to serve a specific part of the business.' },
      {
        t: 'cards',
        items: [
          {
            title: 'Command',
            text: 'Fund and investment management',
            bullets: [
              'Fund administration and operational workflows',
              'Investment pipeline and deal tracking',
              'Capital deployment and investment monitoring',
              'Portfolio company management',
              'Fund performance and portfolio reporting',
              'Investor and stakeholder management',
            ],
          },
          {
            title: 'Ascent',
            text: 'Capital readiness and deal infrastructure',
            bullets: [
              'Structured startup profiles and company intelligence',
              'Digital data rooms and document management',
              'Fundraising documentation and due diligence workflows',
              'Investor discovery and investor-fit intelligence',
              'Capital readiness assessments',
              'Grant and funding opportunity discovery',
            ],
          },
          {
            title: 'Atlas',
            text: 'Private market intelligence',
            bullets: [
              'General Partner and fund intelligence',
              'Limited Partner and investor profiles',
              'Private and portfolio company intelligence',
              'Deal and transaction research',
              'Investment firm and service provider discovery',
              'Market mapping and sector intelligence',
            ],
          },
          {
            title: 'NestHR',
            text: 'Workforce and HR management',
            bullets: [
              'Employee lifecycle management',
              'Recruitment and onboarding',
              'Attendance, leave and employee records',
              'HR administration and reporting',
              'Workforce operations across locations and teams',
            ],
          },
        ],
      },

      { t: 'h2', text: 'The roadmap' },
      { t: 'p', text: 'The partnership is envisioned in four phases, each starting only once the one before has proven itself.' },
      {
        t: 'steps',
        items: [
          {
            label: 'Phase 1',
            title: 'Establish and enter the market',
            bullets: [
              'Develop the three initial ERP products',
              'Set product identity, positioning and pricing',
              'Launch institutional pilots',
              'Build the first customer acquisition process and city-level sales network',
              'Deploy NestHR for workforce operations',
            ],
          },
          {
            label: 'Phase 2',
            title: 'Commercialise and expand distribution',
            bullets: [
              'Expand across Tier 2 and Tier 3 markets',
              'Build regional sales teams and channel partnerships',
              'Improve onboarding and retention',
              'Scale subscription revenue',
            ],
          },
          {
            label: 'Phase 3',
            title: 'Build financial services infrastructure',
            bullets: [
              'Use Ascent for data rooms, fundraising and due diligence',
              'Introduce Atlas for private market intelligence and investor discovery',
              'Integrate Command for fund operations and investment management',
              'Develop institutional relationships and transaction workflows',
            ],
          },
          {
            label: 'Phase 4',
            title: 'Investment banking and broader financial services',
            bullets: [
              'Put the required business, operational and regulatory structures in place',
              'Explore investment banking and capital markets opportunities',
              'Build institutional deal sourcing and research capabilities',
              'Use Command, Atlas and Ascent across relevant activities',
            ],
          },
        ],
      },
      {
        t: 'note',
        text: 'Every phase depends on commercial validation, product readiness and applicable regulatory requirements. Investment banking and financial advisory activities may need specific permissions and structures. They are future ambitions: neither party is stated to be authorised to provide regulated services.',
      },

      { t: 'h2', text: 'How we will work together' },
      { t: 'p', text: 'The collaboration is built on shared growth. Both parties will agree, in definitive agreements:' },
      {
        t: 'ul',
        items: [
          'Revenue participation across agreed products and services',
          'Development and operating cost responsibilities',
          'Customer acquisition and sales responsibilities',
          'Product ownership, intellectual property and licensing',
          'Onboarding, support and service responsibilities',
          'Commercial reporting and revenue reconciliation',
          'Future expansion and integration arrangements',
        ],
      },

      { t: 'h2', text: 'The long-term vision' },
      {
        t: 'p',
        text: 'The venture brings the business vision, sector relationships and market development. LabelNest brings the technology backbone, product engineering, commercial enablement and distribution. Together, the aim is scalable SaaS businesses, strong institutional relationships and, step by step, capability across financial services and private markets.',
      },
      {
        t: 'p',
        text: 'This is a long-term commitment to building businesses together, not a software project. Building together. Growing together.',
      },
    ],
  },
]

export function getAnnouncement(slug: string): Announcement | undefined {
  return ANNOUNCEMENTS.find((a) => a.slug === slug)
}

export function announcementUrl(slug: string): string {
  return `${SITE_URL}/announcements/${slug}`
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
}
