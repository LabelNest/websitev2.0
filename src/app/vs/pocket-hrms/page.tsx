import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/pocket-hrms', {
    title: 'Pocket HRMS Alternatives for Startups — NestHR vs Pocket HRMS',
    description: 'Looking for a Pocket HRMS alternative? How NestHR compares on pricing, modules, and campus placement for startups — flat per-employee-per-year pricing with PlacementOS included.',
  })
}

const DATA: VsPageData = {
  slug: 'pocket-hrms',
  category: 'nesthr',
  competitorName: 'Pocket HRMS',
  ourName: 'NestHR',
  h1: 'Pocket HRMS Alternatives for Startups: NestHR vs Pocket HRMS',
  subhead: 'Pocket HRMS is an AI-powered Indian HRMS — tiered pricing from ₹2,995/month (Standard, up to 50 employees) plus per-employee overage, with a one-time implementation fee. NestHR bundles everything, including PlacementOS for campus and startup hiring, into simple per-employee-per-year pricing.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Pocket HRMS is right. When NestHR is right.',
  tldrLeftLabel: 'Pick Pocket HRMS if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'AI-powered HR tools and premium support on the Premium tier fit your needs',
    'A tiered base-fee-plus-per-employee model (from ₹2,995/month) fits your budget',
    'You don\'t need campus recruitment or placement-specific hiring tools',
    'You\'re prepared for a one-time implementation fee based on customization complexity',
  ],
  tldrRightPoints: [
    'You want simple flat per-employee-per-year pricing, not a tiered base-plus-overage model',
    'You need campus recruitment or startup hiring tools, not just general HR',
    'You want all modules included at every tier, no separate implementation fee',
    'You are a startup that needs PlacementOS specifically',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Tiered (₹2,995-₹4,495/month for 50 employees) plus ₹60-90/employee overage, +GST', verdict: 'mid' }, labelnest: { text: '₹799-₹1,299/employee/year flat, all modules included', verdict: 'win' } },
    { feature: 'Implementation fee', competitor: { text: 'One-time fee based on customization and data migration complexity', verdict: 'no' }, labelnest: { text: 'No stated separate implementation fee', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'PlacementOS — learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'AI-powered HR tools', competitor: { text: 'Included on Premium tier', verdict: 'win' }, labelnest: { text: 'PlacementOS uses signal learning; broader AI tooling not the primary pitch', verdict: 'mid' } },
    { feature: 'Module access', competitor: { text: 'Tiered — Standard, Professional, Premium unlock more features', verdict: 'mid' }, labelnest: { text: 'All 7 OS modules included at every tier', verdict: 'win' } },
    { feature: 'Market presence', competitor: { text: 'Established Indian HRMS brand', verdict: 'win' }, labelnest: { text: 'Newer to market', verdict: 'no' } },
  ],
  calloutTitle: 'What Pocket HRMS does better than us — honestly.',
  calloutBody: 'Pocket HRMS\'s AI-powered tools on its Premium tier and its established presence in the Indian SME market are genuinely useful if broader AI-assisted HR workflows matter more to you than campus hiring specifically.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Tiered AI-HRMS vs. HR + placement OS, all-inclusive.',
    body: "Pocket HRMS's assumption: companies pay more per tier for AI-powered HR tooling and support. NestHR's assumption: every company should get all 7 modules — including campus hiring — at every tier, priced simply per employee per year. If you need placement-specific hiring, NestHR was built for that.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/hrone', label: 'Also see: vs HROne →' },
}

export default function VsPocketHrmsPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/pocket-hrms' }, { name: 'Pocket HRMS', path: '/vs/pocket-hrms' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
