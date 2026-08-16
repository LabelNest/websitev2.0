import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/nasdaq-data-link', {
    title: 'Nasdaq Data Link Alternatives — NestLens Exchange vs Nasdaq Data Link',
    description: 'Looking for a Nasdaq Data Link alternative for private markets data? How NestLens Exchange compares — KYC-verified, escrow-protected trading vs a la carte financial and economic datasets.',
  })
}

const DATA: VsPageData = {
  slug: 'nasdaq-data-link',
  category: 'exchange',
  competitorName: 'Nasdaq Data Link',
  ourName: 'NestLens Exchange',
  h1: 'Nasdaq Data Link Alternatives: NestLens Exchange vs Nasdaq Data Link',
  subhead: 'Nasdaq Data Link gives API access to 250+ trusted datasets and 20 million+ financial and economic data points from 500+ sources — a la carte, with a free tier for open data. NestLens Exchange is narrower and deeper: private markets data specifically, with KYC-verified sellers and escrow.',
  primaryCta: { href: '/nestlens/exchange', label: 'Explore Exchange →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Nasdaq Data Link covers public financial data. Exchange covers private markets.',
  tldrLeftLabel: 'Pick Nasdaq Data Link if',
  tldrRightLabel: 'Pick NestLens Exchange if',
  tldrLeftPoints: [
    'You need financial, economic, or alternative datasets integrated directly into Python or quant models',
    'A la carte subscriptions to individual premium datasets fit your workflow',
    'Free, open datasets cover part of your need before you subscribe to anything premium',
    'Public market and macroeconomic data is your primary interest, not private company data',
  ],
  tldrRightPoints: [
    'You specifically need private markets, fund, or deal data',
    'You want every seller KYC-verified before you transact',
    'You want escrow protection built into the transaction, not a subscription-based API',
    'You also want Intelligence and Capital Readiness in the same account',
  ],
  tableRows: [
    { feature: 'Category breadth', competitor: { text: '250+ datasets, 20M+ financial/economic/alternative data points, 500+ sources', verdict: 'win' }, labelnest: { text: 'Private markets and adjacent categories only', verdict: 'mid' } },
    { feature: 'Private markets depth', competitor: { text: 'Public-market and macro-focused, not a private-markets specialty', verdict: 'no' }, labelnest: { text: 'Core focus — funds, deals, companies, contacts', verdict: 'win' } },
    { feature: 'Seller verification', competitor: { text: 'Curated data providers, not a KYC-gated marketplace model', verdict: 'mid' }, labelnest: { text: 'KYC required before a seller can list', verdict: 'win' } },
    { feature: 'Escrow on transactions', competitor: { text: 'Not applicable — subscription/API access model, not peer transactions', verdict: 'no' }, labelnest: { text: 'Escrow-protected transactions', verdict: 'win' } },
    { feature: 'Free tier', competitor: { text: 'Large collection of free, open datasets available', verdict: 'win' }, labelnest: { text: 'Free to browse listings', verdict: 'win' } },
    { feature: 'API / quant integration', competitor: { text: 'Streaming and REST APIs, direct Python integration', verdict: 'win' }, labelnest: { text: 'API available, expanding', verdict: 'mid' } },
    { feature: 'Bundled intelligence layer', competitor: { text: 'Not offered — data access only', verdict: 'no' }, labelnest: { text: 'Intelligence module in the same account', verdict: 'win' } },
    { feature: 'India private markets focus', competitor: { text: 'Global, no regional specialty', verdict: 'mid' }, labelnest: { text: 'Deep India, SE Asia, Gulf coverage', verdict: 'win' } },
  ],
  calloutTitle: 'What Nasdaq Data Link does better than us — honestly.',
  calloutBody: 'Nasdaq Data Link\'s reach — 20 million+ data points across 250+ datasets, a la carte, with direct Python/quant integration — is genuinely strong for public-market and macroeconomic research. If that\'s your data need, its breadth and API tooling are hard to beat. NestLens Exchange isn\'t built for public-market data at all — it\'s focused on private markets specifically.',
  finalTag: 'Built for one category, done properly',
  finalHeading: 'Private markets data, KYC-verified, escrow-protected.',
  finalBody: 'Browse Exchange listings free. Buy per project with credits — no subscription needed.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Browse Exchange ↗', external: true },
  finalSecondaryCta: { href: '/vs/datarade', label: 'Also see: vs Datarade →' },
}

export default function VsNasdaqDataLinkPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/nasdaq-data-link' }, { name: 'Nasdaq Data Link', path: '/vs/nasdaq-data-link' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
