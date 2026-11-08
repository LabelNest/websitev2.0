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
    readTime: '6 min read',
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
      { t: 'h2', text: 'Partnership overview' },
      {
        t: 'p',
        text: 'LabelNest is entering a strategic partnership with an emerging venture that aims to build a diversified business across institutional technology, financial services and investment banking.',
      },
      {
        t: 'p',
        text: 'The venture will initially enter the market through SaaS products serving Education, Healthcare and institutional management. Over time, its ambition is to expand into financial services, investment banking, capital markets and private market activities.',
      },
      {
        t: 'p',
        text: 'LabelNest will serve as the venture’s Strategic Technology, Product & Growth Partner, contributing technology infrastructure, product development, commercial execution and distribution capabilities. The venture brings the business vision and leads its sector expansion.',
      },
      {
        t: 'p',
        text: 'The partnership will operate on a shared-growth and revenue-sharing model, aligning both parties around the development, commercialisation and expansion of the business.',
      },

      { t: 'h2', text: 'Target sectors and initial market entry' },
      { t: 'p', text: 'The venture plans to establish its initial market presence through three SaaS verticals.' },
      { t: 'h3', text: 'Education technology' },
      {
        t: 'ul',
        items: [
          'School Management ERP.',
          'Coaching Centre Management ERP.',
          'Student, faculty, admissions, attendance and fee management.',
          'Institutional administration and reporting.',
        ],
      },
      { t: 'h3', text: 'Healthcare technology' },
      {
        t: 'ul',
        items: [
          'Hospital Management ERP.',
          'Patient administration and registration.',
          'Appointments, billing, pharmacy and inventory workflows.',
          'Hospital administration and operational reporting.',
        ],
      },
      { t: 'h3', text: 'Financial services' },
      {
        t: 'ul',
        items: [
          'Technology and operational infrastructure for financial institutions.',
          'Investment and institutional workflow solutions.',
          'Expansion into financial services and investment banking over time.',
        ],
      },
      {
        t: 'p',
        text: 'The initial focus will be on smaller cities and underserved institutional markets, with affordable subscription models, regional language accessibility and a distributed sales network.',
      },

      { t: 'h2', text: 'What LabelNest contributes' },
      { t: 'h3', text: 'Technology and product development' },
      {
        t: 'ul',
        items: [
          'Product architecture and technical strategy.',
          'UI/UX design and engineering.',
          'Web and mobile application development.',
          'Backend infrastructure, databases and APIs.',
          'Security, access management and tenant isolation.',
          'Cloud infrastructure, deployment and maintenance.',
          'Product upgrades, integrations and technical support.',
        ],
      },
      { t: 'h3', text: 'Sales and commercial growth' },
      {
        t: 'ul',
        items: [
          'Go-to-market strategy and sales enablement.',
          'Institutional customer acquisition.',
          'Sales processes, CRM and pipeline management.',
          'Pricing and subscription infrastructure.',
          'Channel partnerships and strategic alliances.',
          'Sales performance tracking and commercial reporting.',
        ],
      },
      { t: 'h3', text: 'Distribution network development' },
      {
        t: 'ul',
        items: [
          'Recruitment of student sales associates.',
          'City-level sales leadership and regional expansion.',
          'Training, certification and sales enablement.',
          'Lead management and customer attribution.',
          'Commission tracking and channel performance.',
          'A scalable, performance-led distribution network.',
        ],
      },
      { t: 'h3', text: 'Technology ecosystem integration' },
      {
        t: 'p',
        text: 'The venture will use selected products from LabelNest’s existing ecosystem to support its operations and future expansion.',
      },

      { t: 'h2', text: 'How the LabelNest ecosystem supports the venture' },
      { t: 'h3', text: 'Command: fund and investment management infrastructure' },
      {
        t: 'p',
        text: 'Command is intended to provide the operational technology foundation for the venture’s future fund and investment management activities.',
      },
      {
        t: 'ul',
        items: [
          'Fund administration and operational workflows.',
          'Investment pipeline and deal tracking.',
          'Capital deployment and investment monitoring.',
          'Portfolio company management.',
          'Fund performance and portfolio reporting.',
          'Investor and stakeholder management.',
          'Centralised operational dashboards and reporting.',
        ],
      },
      { t: 'h3', text: 'Ascent: capital readiness and deal infrastructure' },
      {
        t: 'p',
        text: 'Ascent is intended to support startup engagement, fundraising readiness and transaction preparation.',
      },
      {
        t: 'ul',
        items: [
          'Structured startup profiles and company intelligence.',
          'Digital data rooms and document management.',
          'Fundraising documentation and preparation.',
          'Due diligence workflows and information organisation.',
          'Investor discovery and investor-fit intelligence.',
          'Capital readiness assessments.',
          'Grant and funding opportunity discovery.',
        ],
      },
      { t: 'h3', text: 'Atlas: private market intelligence infrastructure' },
      {
        t: 'p',
        text: 'Atlas is intended to provide private market intelligence for research, institutional discovery and investment-related activities.',
      },
      {
        t: 'ul',
        items: [
          'General Partner and fund intelligence.',
          'Limited Partner and investor profiles.',
          'Private company and portfolio company intelligence.',
          'Deal and transaction research.',
          'Investment firm and service provider discovery.',
          'Market mapping and sector intelligence.',
          'Investor discovery and opportunity identification.',
          'Research workflows and institutional data access.',
        ],
      },
      { t: 'h3', text: 'NestHR: workforce and HR management' },
      {
        t: 'p',
        text: 'NestHR is intended to support the venture’s internal workforce and organisational operations.',
      },
      {
        t: 'ul',
        items: [
          'Employee lifecycle management.',
          'Recruitment and onboarding.',
          'Attendance, leave and employee records.',
          'HR administration and organisational reporting.',
          'Workforce operations across locations and teams.',
        ],
      },

      { t: 'h2', text: 'The roadmap, in phases' },
      { t: 'p', text: 'The partnership is envisioned as a phased collaboration.' },
      { t: 'h3', text: 'Phase 1: establishment and SaaS market entry' },
      {
        t: 'ul',
        items: [
          'Develop the three initial ERP products.',
          'Establish product identity, positioning and pricing.',
          'Launch institutional pilots.',
          'Build the initial customer acquisition process.',
          'Establish the sales network and city-level distribution model.',
          'Deploy NestHR for workforce operations.',
        ],
      },
      { t: 'h3', text: 'Phase 2: commercialisation and distribution expansion' },
      {
        t: 'ul',
        items: [
          'Expand across Tier 2 and Tier 3 markets.',
          'Build regional sales teams and channel partnerships.',
          'Improve customer onboarding and retention.',
          'Scale subscription revenue.',
          'Introduce additional institutional integrations and capabilities.',
        ],
      },
      { t: 'h3', text: 'Phase 3: financial services infrastructure' },
      {
        t: 'ul',
        items: [
          'Expand use of Ascent for data rooms, fundraising and due diligence.',
          'Introduce Atlas for private market intelligence and investor discovery.',
          'Integrate Command for fund operations and investment management.',
          'Develop institutional relationships and transaction workflows.',
        ],
      },
      { t: 'h3', text: 'Phase 4: investment banking and broader financial services' },
      {
        t: 'ul',
        items: [
          'Develop the required business, operational and regulatory structures.',
          'Explore investment banking and capital markets opportunities.',
          'Build institutional deal sourcing and research capabilities.',
          'Use Command, Atlas and Ascent across relevant business activities.',
          'Expand strategic partnerships and financial institution relationships.',
        ],
      },
      {
        t: 'note',
        text: 'All phases are subject to commercial validation, product readiness and applicable regulatory requirements. Investment banking and financial advisory activities may require specific regulatory permissions and structures. They are described here as future ambitions; neither party is stated to be authorised to provide regulated services.',
      },

      { t: 'h2', text: 'Commercial partnership structure' },
      {
        t: 'p',
        text: 'The collaboration follows a revenue-sharing model rather than a conventional technology-vendor arrangement. Both parties will align on:',
      },
      {
        t: 'ul',
        items: [
          'Revenue participation across agreed products and services.',
          'Development and operating cost responsibilities.',
          'Customer acquisition and sales responsibilities.',
          'Product ownership, intellectual property and licensing.',
          'Customer onboarding, support and service responsibilities.',
          'Commercial reporting and revenue reconciliation.',
          'Future expansion and integration arrangements.',
        ],
      },
      { t: 'p', text: 'The detailed commercial terms will be established through definitive agreements.' },

      { t: 'h2', text: 'The long-term vision' },
      {
        t: 'p',
        text: 'The ambition is a multi-sector business supported by an integrated technology and distribution ecosystem. The venture brings the business vision, sector relationships and market development. LabelNest contributes the technology backbone, product engineering, commercial enablement and distribution infrastructure.',
      },
      {
        t: 'p',
        text: 'Together, the objective is to create scalable SaaS businesses, develop institutional relationships and progressively build capabilities across financial services and private markets.',
      },
      {
        t: 'p',
        text: 'This partnership is a long-term commitment to building businesses together, rather than simply delivering software projects. Building together. Growing together.',
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
