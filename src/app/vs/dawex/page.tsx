import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/dawex', {
    title: 'NestLens Exchange vs Dawex — Data Exchange Infrastructure vs Private Markets Marketplace',
    description: 'How NestLens Exchange compares to Dawex — white-label data exchange infrastructure for building marketplaces vs a ready-made, KYC-verified private markets data marketplace.',
  })
}

const DATA: VsPageData = {
  slug: 'dawex',
  category: 'exchange',
  competitorName: 'Dawex',
  ourName: 'NestLens Exchange',
  h1: 'NestLens Exchange vs Dawex: Marketplace Infrastructure vs a Ready-Made Marketplace',
  subhead: 'Dawex is data exchange infrastructure — it powers over 3,000 data marketplaces across 25 countries for organizations that want to build and operate their own, taking a 20% commission on transactions. NestLens Exchange is a ready-made marketplace you join, not infrastructure you build on top of.',
  primaryCta: { href: '/nestlens/exchange', label: 'Explore Exchange →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Dawex helps you build a marketplace. Exchange is one you can join today.',
  tldrLeftLabel: 'Pick Dawex if',
  tldrRightLabel: 'Pick NestLens Exchange if',
  tldrLeftPoints: [
    'You are a bank, energy company, or enterprise that wants to build your own branded data marketplace',
    'You need consent management, contract automation, and GDPR/CCPA-grade compliance controls',
    'One-to-one, one-to-many, or multi-party data ecosystem models fit your use case',
    'You are prepared to operate as the neutral intermediary, taking a cut of transactions',
  ],
  tldrRightPoints: [
    'You want to buy or sell private markets data today, not build exchange infrastructure',
    'You specifically need private markets, fund, or deal data',
    'You want every seller KYC-verified and every transaction escrow-protected out of the box',
    'You also want Intelligence and Capital Readiness in the same account',
  ],
  tableRows: [
    { feature: 'What you get', competitor: { text: 'White-label infrastructure to build and operate your own data marketplace', verdict: 'win' }, labelnest: { text: 'A ready-made marketplace you join directly', verdict: 'win' } },
    { feature: 'Private markets depth', competitor: { text: 'Industry-agnostic infrastructure, not a private-markets specialty', verdict: 'no' }, labelnest: { text: 'Core focus — funds, deals, companies, contacts', verdict: 'win' } },
    { feature: 'Time to first transaction', competitor: { text: 'Requires building and launching your own marketplace first', verdict: 'no' }, labelnest: { text: 'Browse and transact immediately', verdict: 'win' } },
    { feature: 'Seller verification', competitor: { text: 'Compliance tooling you configure yourself', verdict: 'mid' }, labelnest: { text: 'KYC required before a seller can list', verdict: 'win' } },
    { feature: 'Escrow on transactions', competitor: { text: 'Payment/commission management infrastructure, configured per marketplace operator', verdict: 'mid' }, labelnest: { text: 'Escrow-protected transactions, built in', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: '20% commission on data transactions', verdict: 'no' }, labelnest: { text: 'Free to browse; sellers pay for an active listing, buyers pay per project via credits', verdict: 'win' } },
    { feature: 'Bundled intelligence layer', competitor: { text: 'Not offered — infrastructure only', verdict: 'no' }, labelnest: { text: 'Intelligence module in the same account', verdict: 'win' } },
    { feature: 'India private markets focus', competitor: { text: 'Global, industry-agnostic', verdict: 'mid' }, labelnest: { text: 'Deep India, SE Asia, Gulf coverage', verdict: 'win' } },
  ],
  calloutTitle: 'What Dawex does better than us — honestly.',
  calloutBody: 'Dawex\'s infrastructure genuinely powers thousands of data marketplaces across dozens of countries and industries — if you\'re an enterprise or public-sector body that wants to build and operate its own branded data exchange, that\'s a real, substantial capability NestLens Exchange doesn\'t offer at all. We\'re not infrastructure — we\'re a marketplace.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Building a marketplace vs. joining one.',
    body: "Dawex's assumption: large organizations want to operate their own data marketplace and will pay a commission for the infrastructure to do it. NestLens Exchange's assumption: most buyers and sellers of private markets data just want to transact — not build and run marketplace infrastructure. If you need the former, Dawex is the right category. If you need the latter, join Exchange.",
  },
  finalTag: 'Built for one category, done properly',
  finalHeading: 'Private markets data, KYC-verified, escrow-protected.',
  finalBody: 'Browse Exchange listings free. Buy per project with credits — no infrastructure to build.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Browse Exchange ↗', external: true },
  finalSecondaryCta: { href: '/vs/scale-ai', label: 'Also see: vs Scale AI →' },
}

export default function VsDawexPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/dawex' }, { name: 'Dawex', path: '/vs/dawex' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
