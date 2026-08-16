import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/keka', {
    title: 'NestHR vs Keka — HR & Payroll Software Comparison for India',
    description: 'How NestHR compares to Keka on pricing, modules, and campus placement — flat per-employee INR pricing with all 7 modules included vs Keka\'s tiered flat-fee-plus-per-employee model.',
  })
}

const DATA: VsPageData = {
  slug: 'keka',
  category: 'nesthr',
  competitorName: 'Keka',
  ourName: 'NestHR',
  h1: 'NestHR vs Keka: Honest Comparison for Indian HR Teams',
  subhead: 'Keka is a well-established Indian HRMS — tiered flat-fee-plus-per-employee pricing, starting at ₹9,999/month for up to 100 employees. NestHR is simple per-employee-per-year pricing with all 7 modules included and no tier upsells, plus PlacementOS, a campus and startup hiring module Keka doesn\'t offer.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Keka is right. When NestHR is right.',
  tldrLeftLabel: 'Pick Keka if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You want an established HRMS with a large existing India customer base',
    'A flat monthly base fee (from ₹9,999/month, up to 100 employees) fits your budget model',
    'You don\'t need campus recruitment or placement-specific hiring tools',
    'Onboarding support for complex payroll/compliance setup (₹25,000-₹75,000 one-time) is worth it to you',
  ],
  tldrRightPoints: [
    'You want simple per-employee-per-year pricing, not a tiered flat-fee-plus-overage model',
    'You need campus recruitment or startup hiring tools, not just general HR',
    'You want all modules included at every tier, no upsells',
    'You are a startup or college that needs PlacementOS specifically',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Tiered flat fee (₹9,999-₹15,999/month for up to 100 employees) plus ₹90-150 per extra employee, +18% GST', verdict: 'mid' }, labelnest: { text: '₹799-₹1,299/employee/year flat, all modules included, no GST surprises called out', verdict: 'win' } },
    { feature: 'Module access', competitor: { text: 'Tiered — higher plans unlock more features', verdict: 'mid' }, labelnest: { text: 'All 7 OS modules included at every tier, no upsells', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'PlacementOS — learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'Core HR / payroll / attendance', competitor: { text: 'Comprehensive, established India payroll compliance', verdict: 'win' }, labelnest: { text: 'People OS + Performance OS + Expense OS included', verdict: 'win' } },
    { feature: 'Onboarding cost', competitor: { text: '₹25,000-₹75,000 one-time setup fee typical', verdict: 'no' }, labelnest: { text: 'No stated separate onboarding fee', verdict: 'win' } },
    { feature: 'Market presence', competitor: { text: 'Established, large India customer base', verdict: 'win' }, labelnest: { text: 'Newer to market', verdict: 'no' } },
  ],
  calloutTitle: 'What Keka does better than us — honestly.',
  calloutBody: 'Keka is an established, widely-used Indian HRMS with deep payroll and statutory compliance experience across many company sizes. If you need a proven, large-scale HR platform and don\'t need campus or placement-specific hiring tools, Keka\'s track record is real.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'General HRMS vs. HR + placement OS for India.',
    body: "Keka's assumption: Indian companies need a proven, tiered HRMS that scales pricing with feature access. NestHR's assumption: HR and hiring — including campus recruitment — should be one system with simple, all-inclusive per-employee pricing. If PlacementOS's signal-learning approach to hiring matters to you, NestHR was built for that.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/darwinbox', label: 'Also see: vs Darwinbox →' },
}

export default function VsKekaPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/keka' }, { name: 'Keka', path: '/vs/keka' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
