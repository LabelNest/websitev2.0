import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/deel', {
    title: 'Deel Alternatives for India — NestHR vs Deel',
    description: 'Looking for a Deel alternative for your India team? How NestHR compares — INR per-employee-per-year HR pricing with PlacementOS included vs Deel\'s USD EOR/global payroll pricing for hiring abroad.',
  })
}

const DATA: VsPageData = {
  slug: 'deel',
  category: 'nesthr',
  competitorName: 'Deel',
  ourName: 'NestHR',
  h1: 'Deel Alternatives for India: NestHR vs Deel',
  subhead: 'Deel is built for hiring and paying people in countries where you have no legal entity — Employer of Record from $599/employee/month, global payroll at $29/employee/month, contractor management at $49/contractor/month. NestHR is a different tool entirely: HR and hiring for a team you already employ directly in India.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Deel hires people abroad for you. NestHR runs HR for your India team.',
  tldrLeftLabel: 'Pick Deel if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You need to hire employees in countries where you have no legal entity (Employer of Record)',
    'You manage international contractors and need compliant contractor payments',
    'You have budget for $599/employee/month EOR fees plus employer taxes (15-45% of salary)',
    'Cross-border payroll compliance across multiple countries is your core need',
  ],
  tldrRightPoints: [
    'You already have an Indian entity and are hiring your team directly, not via EOR',
    'You need campus recruitment or startup hiring tools, not cross-border employment',
    'You want INR-native pricing with no FX spreads or refundable deposits',
    'You are an India-based startup or college that needs PlacementOS specifically',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Employer of Record, global payroll, contractor management for hiring abroad', verdict: 'win' }, labelnest: { text: 'HR and hiring for a team you already employ directly in India', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'PlacementOS — learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'Cross-border employment', competitor: { text: 'EOR in countries where you have no entity, from $599/employee/month', verdict: 'win' }, labelnest: { text: 'Not offered — assumes an existing Indian entity', verdict: 'no' } },
    { feature: 'Pricing currency', competitor: { text: 'USD, plus FX spreads (0.5-2%) on every payroll cycle', verdict: 'no' }, labelnest: { text: 'INR-native, no FX spreads', verdict: 'win' } },
    { feature: 'Deposit requirements', competitor: { text: 'Refundable deposit of 1-1.5x monthly cost locks up working capital', verdict: 'no' }, labelnest: { text: 'No deposit requirement stated', verdict: 'win' } },
    { feature: 'India-specific HR modules', competitor: { text: 'Not a specialization — global employment infrastructure', verdict: 'no' }, labelnest: { text: 'Native Indian founder and compliance context, all 7 OS modules', verdict: 'win' } },
  ],
  calloutTitle: 'What Deel does better than us — honestly.',
  calloutBody: 'Deel solves a genuinely hard problem — hiring and paying people compliantly in countries where you have no legal entity — that NestHR doesn\'t attempt to solve at all. If you\'re building a distributed global team and need EOR or cross-border contractor payments, Deel is the right category.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Global employment infrastructure vs. HR for a team you already employ in India.',
    body: "Deel's assumption: companies need to hire people in countries where they have no entity, so employment infrastructure — EOR, global payroll, compliance — is the product. NestHR's assumption: if you already employ your team directly in India, you need HR and hiring tools — including campus recruitment — not cross-border employment infrastructure. These solve different problems entirely.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/rippling', label: 'Also see: vs Rippling →' },
}

export default function VsDeelPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/deel' }, { name: 'Deel', path: '/vs/deel' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
