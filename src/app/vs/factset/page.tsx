import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/factset', {
    title: 'LabelNest vs FactSet — Private Markets Data Comparison',
    description: 'How LabelNest compares to FactSet for private-market research — a purpose-built emerging-manager tool vs a modular financial data terminal.',
  })
}

const DATA: VsPageData = {
  slug: 'factset',
  category: 'intelligence',
  competitorName: 'FactSet',
  ourName: 'LabelNest',
  h1: 'LabelNest vs FactSet: Purpose-Built vs a Modular Financial Terminal',
  subhead: "FactSet is a modular financial data terminal — workstations range from ~$4,000/year (Basic) to $50,000+/year (Premium) depending on which analytics and datasets you license. Private-company data is one module inside a much broader public-markets platform. LabelNest is purpose-built for private markets in India, SE Asia, and the Gulf.",
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When FactSet is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick FactSet if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'Public-markets analytics, screening, and comps are your primary need',
    'You want a modular workstation you can scale from Basic (~$4K/year) to Premium ($24K-$50K+/year)',
    'Private-company data is a secondary need alongside broader financial-terminal workflows',
    'Enterprise-grade analytics and integration across asset classes matters',
  ],
  tldrRightPoints: [
    'Private markets — companies, funds, deals, LPs — is your primary need, not a side module',
    'India, Southeast Asia, and Gulf coverage matters',
    'You want credit-based access, not a modular, per-user terminal contract',
    'You need a data marketplace and investor data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Modular per-user pricing, ~$4,000 (Basic) to $50,000+/year (Premium); median customer ~$25,160/year', verdict: 'no' }, labelnest: { text: 'Credit-based, no seat penalties, pay for what you use', verdict: 'win' } },
    { feature: 'Primary focus', competitor: { text: 'Public markets, screening, comps, portfolio analytics — private data is one module', verdict: 'mid' }, labelnest: { text: 'Private markets is the entire product — companies, funds, deals, LPs', verdict: 'win' } },
    { feature: 'India private markets depth', competitor: { text: 'Present as part of global financial data, not a specialization', verdict: 'no' }, labelnest: { text: 'Deep — companies, funds, deals, LPs, service providers', verdict: 'win' } },
    { feature: 'Free access', competitor: { text: 'No self-serve trial, sales-negotiated only', verdict: 'no' }, labelnest: { text: 'Self-serve free tier, no credit card, no sales call', verdict: 'win' } },
    { feature: 'Hidden / add-on costs', competitor: { text: 'Enterprise license and per-user fees can add 30-60% to the base license fee', verdict: 'no' }, labelnest: { text: 'Credit-based, transparent pricing, no add-on license fees', verdict: 'win' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
    { feature: 'Breadth of asset classes', competitor: { text: 'Equities, portfolio analytics, private markets — one platform for all of finance', verdict: 'win' }, labelnest: { text: 'Private markets only, by design', verdict: 'no' } },
  ],
  calloutTitle: 'What FactSet does better than us — honestly.',
  calloutBody: "FactSet's modular pricing means you can scale a workstation from a $4,000/year Basic plan to a full Premium analytics suite — genuinely more flexible than a single-tier enterprise terminal, and its public-markets screening and portfolio analytics are best-in-class. If that breadth across asset classes is what you need, FactSet does something LabelNest was never built to do.",
  extra: {
    tag: 'The philosophical difference',
    heading: 'A modular terminal for all of finance vs. one tool built for private markets.',
    body: "FactSet's assumption: financial teams need a scalable, modular terminal spanning public and private data, priced by which modules you license. LabelNest's assumption: if private markets — companies, funds, deals, LPs in India, SE Asia, and the Gulf — is actually your job, you shouldn't need to license a public-markets terminal module by module to get it.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/capital-iq', label: 'Also see: vs S&P Capital IQ →' },
}

export default function VsFactSetPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/factset' }, { name: 'FactSet', path: '/vs/factset' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
