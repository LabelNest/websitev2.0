import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/zoho-people', {
    title: 'NestHR vs Zoho People — HR Software Comparison for India',
    description: 'How NestHR compares to Zoho People on pricing, modules, and campus placement — flat per-employee-per-year pricing with PlacementOS included vs Zoho People\'s per-employee-per-month tiers plus payroll add-on.',
  })
}

const DATA: VsPageData = {
  slug: 'zoho-people',
  category: 'nesthr',
  competitorName: 'Zoho People',
  ourName: 'NestHR',
  h1: 'NestHR vs Zoho People: Honest Comparison for Indian HR Teams',
  subhead: 'Zoho People is one of the most affordable HRMS options in India — ₹50-₹230/employee/month across four tiers, with payroll and statutory compliance as a separate ₹33/employee/month add-on. NestHR bundles everything, including PlacementOS for campus and startup hiring, into simple per-employee-per-year pricing.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Zoho People is right. When NestHR is right.',
  tldrLeftLabel: 'Pick Zoho People if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You already use other Zoho apps and want HR in the same ecosystem',
    'Very low entry pricing (from ₹50/employee/month on Essential) matters most',
    'You don\'t need campus recruitment or placement-specific hiring tools',
    'You\'re comfortable adding Zoho Payroll separately for statutory compliance',
  ],
  tldrRightPoints: [
    'You want payroll and compliance bundled in, not a separate add-on to configure',
    'You need campus recruitment or startup hiring tools, not just general HR',
    'You want all modules included at every tier, no feature-gated upgrades',
    'You are a startup or college that needs PlacementOS specifically',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: '₹50-₹230/employee/month across 4 tiers (₹600-₹2,760/year), plus GST', verdict: 'mid' }, labelnest: { text: '₹799-₹1,299/employee/year flat, all modules included', verdict: 'win' } },
    { feature: 'Payroll / statutory compliance', competitor: { text: 'Separate Zoho Payroll add-on at ₹33/employee/month', verdict: 'mid' }, labelnest: { text: 'Included — no separate payroll product to configure', verdict: 'win' } },
    { feature: 'Module access', competitor: { text: 'Tiered — Essential, Professional, Premium, Enterprise unlock more features', verdict: 'mid' }, labelnest: { text: 'All 7 OS modules included at every tier', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'PlacementOS — learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'Free tier', competitor: { text: 'Free for up to 5 employees', verdict: 'win' }, labelnest: { text: 'No free tier stated — Starter begins at ₹799/employee/year', verdict: 'no' } },
    { feature: 'Ecosystem integration', competitor: { text: 'Deep integration across the broader Zoho app suite', verdict: 'win' }, labelnest: { text: 'Standalone, not part of a larger app ecosystem', verdict: 'no' } },
  ],
  calloutTitle: 'What Zoho People does better than us — honestly.',
  calloutBody: 'Zoho People\'s low entry price and deep integration with the wider Zoho ecosystem are genuinely compelling if you\'re already a Zoho customer or need the cheapest possible entry point. If ecosystem lock-in and rock-bottom per-employee cost matter more than bundled payroll or campus hiring, Zoho People is a real option.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Modular Zoho ecosystem vs. bundled HR + placement OS.',
    body: "Zoho People's assumption: HR is one module in a broader suite, priced separately from payroll and other add-ons. NestHR's assumption: HR, payroll, and hiring — including campus recruitment — should be one bundled system with no separate products to configure. If you don't need the Zoho ecosystem and want payroll and placement tools built in, NestHR was built for that.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/greythr', label: 'Also see: vs greytHR →' },
}

export default function VsZohoPeoplePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/zoho-people' }, { name: 'Zoho People', path: '/vs/zoho-people' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
