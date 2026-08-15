import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/datarade', {
    title: 'NestLens Exchange vs Datarade — Data Marketplace Comparison',
    description: 'How NestLens Exchange compares to Datarade for buying and selling data — general-purpose marketplace vs private-markets-focused exchange with KYC and escrow.',
  })
}

const DATA: VsPageData = {
  slug: 'datarade',
  category: 'exchange',
  competitorName: 'Datarade',
  ourName: 'NestLens Exchange',
  h1: 'NestLens Exchange vs Datarade: Which Data Marketplace Fits Your Search?',
  subhead: 'Datarade is a huge, general-purpose data marketplace — 2,600+ providers across 560+ categories, from geospatial to healthcare. NestLens Exchange is narrower and deeper: private markets data specifically, with KYC-verified sellers and escrow. Here is when to use each.',
  primaryCta: { href: '/nestlens/exchange', label: 'Explore Exchange →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Datarade covers everything. Exchange covers private markets, deeply.',
  tldrLeftLabel: 'Pick Datarade if',
  tldrLeftPoints: [
    'You need data outside private markets — geospatial, consumer, healthcare, web data',
    'You want the widest possible provider directory to browse and compare',
    'You are sourcing a one-off dataset and want free expert sourcing advice',
    'Category breadth matters more than private-markets-specific vetting',
  ],
  tldrRightLabel: 'Pick NestLens Exchange if',
  tldrRightPoints: [
    'You specifically need private markets, fund, or deal data',
    'You want every seller KYC-verified before you transact',
    'You want escrow protection built into the transaction, not just a listing',
    'You also want Intelligence and Capital Readiness in the same account',
  ],
  tableRows: [
    { feature: 'Category breadth', competitor: { text: '2,600+ providers across 560+ categories, all industries', verdict: 'win' }, labelnest: { text: 'Private markets and adjacent categories only', verdict: 'mid' } },
    { feature: 'Private markets depth', competitor: { text: 'One category among hundreds, not a specialty', verdict: 'no' }, labelnest: { text: 'Core focus — funds, deals, companies, contacts', verdict: 'win' } },
    { feature: 'Seller verification', competitor: { text: 'Provider directory with compliance notes, not KYC-gated', verdict: 'mid' }, labelnest: { text: 'KYC required before a seller can list', verdict: 'win' } },
    { feature: 'Escrow on transactions', competitor: { text: 'Not offered — deals are arranged directly with the provider', verdict: 'no' }, labelnest: { text: 'Escrow-protected transactions', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: 'Free to browse; each vendor sets its own price', verdict: 'win' }, labelnest: { text: 'Free to browse; sellers pay for an active listing, buyers pay per project via credits', verdict: 'mid' } },
    { feature: 'Sample previews', competitor: { text: 'Instant previews across most listings', verdict: 'win' }, labelnest: { text: 'Available per listing', verdict: 'mid' } },
    { feature: 'Bundled intelligence layer', competitor: { text: 'Not offered — marketplace only', verdict: 'no' }, labelnest: { text: 'Intelligence module in the same account', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Capital Readiness module included', verdict: 'win' } },
    { feature: 'India private markets focus', competitor: { text: 'Global, no regional specialty', verdict: 'mid' }, labelnest: { text: 'Deep India, SE Asia, Gulf coverage', verdict: 'win' } },
  ],
  calloutTitle: 'What Datarade does better than us — honestly.',
  calloutBody: "Datarade's scale is real — thousands of providers across categories NestLens doesn't touch at all: geospatial, consumer behavior, web scraping, healthcare. If your data need is outside private markets, Datarade's directory and free sourcing advice are hard to beat. NestLens Exchange isn't trying to compete on breadth — it's built for one category, done properly.",
  finalTag: 'Built for one category, done properly',
  finalHeading: 'Private markets data, KYC-verified, escrow-protected.',
  finalBody: 'Browse Exchange listings free. Buy per project with credits — no subscription needed.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Browse Exchange ↗', external: true },
  finalSecondaryCta: { href: '/vs/neudata', label: 'Also see: vs Neudata →' },
}

export default function VsDataradePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/datarade' }, { name: 'Datarade', path: '/vs/datarade' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
