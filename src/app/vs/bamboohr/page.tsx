import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/bamboohr', {
    title: 'NestHR vs BambooHR — HR Software Comparison for India',
    description: 'How NestHR compares to BambooHR on pricing, modules, and campus placement — INR per-employee-per-year pricing with PlacementOS included vs BambooHR\'s USD per-employee-per-month tiers with paid add-ons.',
  })
}

const DATA: VsPageData = {
  slug: 'bamboohr',
  category: 'nesthr',
  competitorName: 'BambooHR',
  ourName: 'NestHR',
  h1: 'NestHR vs BambooHR: Honest Comparison for Indian HR Teams',
  subhead: 'BambooHR is a well-known US-built HRMS — $10-$25/employee/month across tiers, with a $250/month minimum for small teams and paid add-ons ($2-5/employee/month each) for performance management and time tracking. NestHR is INR-native, per-employee-per-year, with PlacementOS and every module included.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When BambooHR is right. When NestHR is right.',
  tldrLeftLabel: 'Pick BambooHR if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You need a globally recognized HRMS with a mature US/global feature set',
    'USD pricing ($10-$25/employee/month) doesn\'t create a forex problem for you',
    'You don\'t need campus recruitment or placement-specific hiring tools',
    'You\'re comfortable adding performance management or time tracking as paid add-ons',
  ],
  tldrRightPoints: [
    'You want INR-native pricing with no forex tax on every payroll cycle',
    'You need campus recruitment or startup hiring tools, not just general HR',
    'You want all modules included at every tier, no per-feature add-ons',
    'You are an Indian startup or college that needs PlacementOS specifically',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: '$10-$25/employee/month (USD), $250/month minimum for teams under 25', verdict: 'no' }, labelnest: { text: '₹799-₹1,299/employee/year (INR), no forex tax', verdict: 'win' } },
    { feature: 'Add-on costs', competitor: { text: 'Performance, wellbeing, time tracking billed separately at $2-5/employee/month each', verdict: 'no' }, labelnest: { text: 'All modules included, no add-on fees', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'PlacementOS — learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'Small-team pricing', competitor: { text: 'Flat $250/month floor makes small teams pay a high effective per-employee rate', verdict: 'no' }, labelnest: { text: 'Starter tier priced per employee from day one, no floor penalty', verdict: 'win' } },
    { feature: 'Market presence', competitor: { text: 'Globally established HRMS brand', verdict: 'win' }, labelnest: { text: 'India-focused, newer to market', verdict: 'no' } },
    { feature: 'India-specific compliance', competitor: { text: 'Not a specialization — US-built platform', verdict: 'no' }, labelnest: { text: 'Native Indian founder and compliance context', verdict: 'win' } },
  ],
  calloutTitle: 'What BambooHR does better than us — honestly.',
  calloutBody: 'BambooHR is a mature, globally recognized HRMS with a broad feature set proven across many markets. If you need a globally known brand and USD pricing isn\'t a friction point for your organization, BambooHR\'s track record is real.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Global HRMS with USD add-ons vs. India-native HR + placement OS, all-inclusive.',
    body: "BambooHR's assumption: a globally proven core HRMS, with performance and wellbeing tooling sold as separate add-ons, priced in USD. NestHR's assumption: Indian startups and colleges need INR-native pricing with every module — including campus hiring — bundled in from the start, without forex friction or add-on fees.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/rippling', label: 'Also see: vs Rippling →' },
}

export default function VsBambooHRPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/bamboohr' }, { name: 'BambooHR', path: '/vs/bamboohr' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
