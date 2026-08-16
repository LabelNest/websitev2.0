import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/aws-data-exchange', {
    title: 'AWS Data Exchange Alternatives — NestLens Exchange vs AWS Data Exchange',
    description: 'Looking for an AWS Data Exchange alternative for private markets data? How NestLens Exchange compares — KYC-verified, escrow-protected trading vs a general enterprise cloud data marketplace.',
  })
}

const DATA: VsPageData = {
  slug: 'aws-data-exchange',
  category: 'exchange',
  competitorName: 'AWS Data Exchange',
  ourName: 'NestLens Exchange',
  h1: 'AWS Data Exchange Alternatives: NestLens Exchange vs AWS Data Exchange',
  subhead: 'AWS Data Exchange is the default marketplace for enterprise buyers already running on AWS — datasets delivered into S3, Redshift, or via API, billed through your AWS account, spanning financial, healthcare, location, and weather data. NestLens Exchange is narrower and deeper: private markets data specifically, with KYC-verified sellers and escrow, no AWS account required.',
  primaryCta: { href: '/nestlens/exchange', label: 'Explore Exchange →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'AWS Data Exchange serves AWS-native enterprise buyers. Exchange serves private markets.',
  tldrLeftLabel: 'Pick AWS Data Exchange if',
  tldrRightLabel: 'Pick NestLens Exchange if',
  tldrLeftPoints: [
    'You are already running on AWS and want data delivered straight into S3, Redshift, or via API',
    'You need broad category coverage — financial, healthcare, location, weather data',
    'Billing through your existing AWS account matters for procurement',
    'Premium feeds up to $50,000/month are within your data budget',
  ],
  tldrRightPoints: [
    'You specifically need private markets, fund, or deal data',
    'You want every seller KYC-verified before you transact',
    'You want escrow protection built into the transaction, not billed through cloud infrastructure',
    'You also want Intelligence and Capital Readiness in the same account',
  ],
  tableRows: [
    { feature: 'Category breadth', competitor: { text: 'Financial, healthcare, location, weather, and more — broad enterprise categories', verdict: 'win' }, labelnest: { text: 'Private markets and adjacent categories only', verdict: 'mid' } },
    { feature: 'Private markets depth', competitor: { text: 'One category among many, not a specialty', verdict: 'no' }, labelnest: { text: 'Core focus — funds, deals, companies, contacts', verdict: 'win' } },
    { feature: 'Seller verification', competitor: { text: 'Standard AWS Marketplace vendor vetting, not KYC-specific', verdict: 'mid' }, labelnest: { text: 'KYC required before a seller can list', verdict: 'win' } },
    { feature: 'Escrow on transactions', competitor: { text: 'Not offered — billed through AWS account usage', verdict: 'no' }, labelnest: { text: 'Escrow-protected transactions', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: 'No standalone fee; pay for datasets plus storage/usage in Byte-Hours, providers pay ~3% listing fee', verdict: 'mid' }, labelnest: { text: 'Free to browse; sellers pay for an active listing, buyers pay per project via credits', verdict: 'win' } },
    { feature: 'Requires existing cloud account', competitor: { text: 'Requires an AWS account for billing and delivery', verdict: 'no' }, labelnest: { text: 'No cloud account required', verdict: 'win' } },
    { feature: 'Bundled intelligence layer', competitor: { text: 'Not offered — marketplace only', verdict: 'no' }, labelnest: { text: 'Intelligence module in the same account', verdict: 'win' } },
    { feature: 'India private markets focus', competitor: { text: 'Global, no regional specialty', verdict: 'mid' }, labelnest: { text: 'Deep India, SE Asia, Gulf coverage', verdict: 'win' } },
  ],
  calloutTitle: 'What AWS Data Exchange does better than us — honestly.',
  calloutBody: 'AWS Data Exchange\'s reach into enterprise datasets — Refinitiv, FactSet, IQVIA, The Weather Company — and native delivery into your existing AWS infrastructure is genuinely hard to match for teams already standardized on AWS. NestLens Exchange isn\'t trying to compete on category breadth or cloud-native delivery — it\'s built for one category, private markets, done properly.',
  finalTag: 'Built for one category, done properly',
  finalHeading: 'Private markets data, KYC-verified, escrow-protected.',
  finalBody: 'Browse Exchange listings free. Buy per project with credits — no AWS account or subscription needed.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Browse Exchange ↗', external: true },
  finalSecondaryCta: { href: '/vs/snowflake-marketplace', label: 'Also see: vs Snowflake Marketplace →' },
}

export default function VsAwsDataExchangePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/aws-data-exchange' }, { name: 'AWS Data Exchange', path: '/vs/aws-data-exchange' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
