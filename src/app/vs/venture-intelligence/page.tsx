import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/venture-intelligence', {
    title: 'Venture Intelligence Alternatives for India — LabelNest vs Venture Intelligence',
    description: 'Looking for a Venture Intelligence alternative? How LabelNest compares on access model, coverage breadth, and tools beyond a PE-VC deals database.',
  })
}

const DATA: VsPageData = {
  slug: 'venture-intelligence',
  category: 'intelligence',
  competitorName: 'Venture Intelligence',
  ourName: 'LabelNest',
  h1: 'Venture Intelligence Alternatives for India: LabelNest vs Venture Intelligence',
  subhead: "Venture Intelligence has tracked India's PE-VC and M&A deal data since 2002 — 25,000+ transactions, 15,000+ M&A deals, financials on 800,000+ companies. It's a deep, established deals database. LabelNest covers the same India market but adds live entities beyond deal history — a marketplace and investor data rooms Venture Intelligence doesn't build.",
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Venture Intelligence is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick Venture Intelligence if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'Historical India PE-VC and M&A deal data (back to 1999) is your core need',
    'League tables ranking funds, bankers, and law firms by activity matter to your workflow',
    'You need financials on 800,000+ Indian companies as your primary dataset',
    'A dedicated Angel Investing / Impact Investing / Incubation sub-database is useful to you',
  ],
  tldrRightPoints: [
    'You need funds, LPs, GPs, and service providers as connected, live entities, not just deal records',
    'You want credit-based access with a self-serve free tier',
    'You need a data marketplace and investor data rooms in the same tool',
    'LP-GP matching, not just historical deal lookup, is part of your workflow',
  ],
  tableRows: [
    { feature: 'India PE-VC deal history depth', competitor: { text: '25,000+ PE/VC transactions, 15,000+ M&A deals, back to 1999', verdict: 'win' }, labelnest: { text: 'Live entity and event tracking from 2024 forward', verdict: 'mid' } },
    { feature: 'Company financials coverage', competitor: { text: 'Financials on 800,000+ Indian companies', verdict: 'win' }, labelnest: { text: '40,000+ entities with deep profile data, not broad financial-statement coverage', verdict: 'mid' } },
    { feature: 'League tables', competitor: { text: 'Funds, bankers, and law firms ranked by activity', verdict: 'win' }, labelnest: { text: 'Not offered as a standalone feature', verdict: 'no' } },
    { feature: 'Fund, LP, GP as connected entities', competitor: { text: 'Deal-record centric, not entity-relationship centric', verdict: 'no' }, labelnest: { text: 'Funds, LPs, GPs, and service providers as first-class, linked entities', verdict: 'win' } },
    { feature: 'Access model', competitor: { text: 'Subscription database access, pricing not published', verdict: 'mid' }, labelnest: { text: 'Credit-based, self-serve free tier, no credit card', verdict: 'win' } },
    { feature: 'API access', competitor: { text: 'APIs expose funding and financial feeds', verdict: 'win' }, labelnest: { text: 'API available, expanding', verdict: 'mid' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
  ],
  calloutTitle: 'What Venture Intelligence does better than us — honestly.',
  calloutBody: "Venture Intelligence has 25 years of India PE-VC deal history — 25,000+ transactions and 15,000+ M&A deals with valuation multiples and exit-return detail LabelNest, still building from 2024 forward, cannot match yet. If deep historical deal analysis is your core need, Venture Intelligence's archive is genuinely deeper.",
  extra: {
    tag: 'The philosophical difference',
    heading: 'A historical India deals database vs. a live private-markets platform.',
    body: "Venture Intelligence's assumption: the value is in the archive — 25 years of India PE-VC and M&A transaction records, valuations, and league tables. LabelNest's assumption: emerging managers and analysts need live, connected entities — funds, LPs, GPs, service providers — plus a marketplace and data rooms to act on today, not just historical deal lookup. If you need to do something with the data, not just research it, LabelNest was built for that.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/tracxn', label: 'Also see: vs Tracxn →' },
}

export default function VsVentureIntelligencePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/venture-intelligence' }, { name: 'Venture Intelligence', path: '/vs/venture-intelligence' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
