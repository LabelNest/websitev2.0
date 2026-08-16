import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/greythr', {
    title: 'NestHR vs greytHR — HR & Payroll Software Comparison for India',
    description: 'How NestHR compares to greytHR on pricing, modules, and campus placement — flat per-employee-per-year pricing with PlacementOS included vs greytHR\'s tiered base-plus-per-employee model.',
  })
}

const DATA: VsPageData = {
  slug: 'greythr',
  category: 'nesthr',
  competitorName: 'greytHR',
  ourName: 'NestHR',
  h1: 'NestHR vs greytHR: Honest Comparison for Indian HR Teams',
  subhead: 'greytHR is a popular Indian HR and payroll platform — tiered base fee plus per-employee pricing, from ₹2,495/month (Essential, up to 50 employees) with a free tier for up to 25. NestHR is simple per-employee-per-year pricing with all 7 modules included, plus PlacementOS for campus and startup hiring.',
  primaryCta: { href: '/nesthr', label: 'Explore NestHR →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When greytHR is right. When NestHR is right.',
  tldrLeftLabel: 'Pick greytHR if',
  tldrRightLabel: 'Pick NestHR if',
  tldrLeftPoints: [
    'You are a small team (under 25 employees) that wants a free tier to start',
    'A tiered base-fee-plus-per-employee model (from ₹2,495/month) fits your budget',
    'You don\'t need campus recruitment or placement-specific hiring tools',
    'Established India payroll and statutory compliance experience matters to you',
  ],
  tldrRightPoints: [
    'You want simple flat per-employee-per-year pricing, not a tiered base-plus-overage model',
    'You need campus recruitment or startup hiring tools, not just general HR',
    'You want all modules included at every tier, no feature-gated upgrades',
    'You are a startup or college that needs PlacementOS specifically',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Tiered base fee (from ₹2,495/month for 50 employees) plus ₹45-100/employee above that, +18% GST', verdict: 'mid' }, labelnest: { text: '₹799-₹1,299/employee/year flat, all modules included', verdict: 'win' } },
    { feature: 'Free tier', competitor: { text: 'Free for up to 25 employees, limited features', verdict: 'win' }, labelnest: { text: 'No free tier stated — Starter begins at ₹799/employee/year', verdict: 'no' } },
    { feature: 'Module access', competitor: { text: 'Tiered — Essential, Growth, Performance, Enterprise unlock more features', verdict: 'mid' }, labelnest: { text: 'All 7 OS modules included at every tier', verdict: 'win' } },
    { feature: 'Campus / placement hiring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'PlacementOS — learns from every selection/rejection signal', verdict: 'win' } },
    { feature: 'Core HR / payroll compliance', competitor: { text: 'Established, India-specific statutory compliance', verdict: 'win' }, labelnest: { text: 'People OS + Performance OS + Expense OS included', verdict: 'win' } },
    { feature: 'Market presence', competitor: { text: 'Well-established India HR/payroll brand', verdict: 'win' }, labelnest: { text: 'Newer to market', verdict: 'no' } },
  ],
  calloutTitle: 'What greytHR does better than us — honestly.',
  calloutBody: 'greytHR\'s free tier for small teams and its established statutory payroll compliance track record in India are genuinely useful, especially for very small companies just getting started with HR software. If you\'re under 25 employees and don\'t need placement tools, greytHR\'s free tier is hard to beat on price.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Tiered HR/payroll vs. HR + placement OS, all-inclusive.',
    body: "greytHR's assumption: companies grow into more features as they scale, paying more per employee for each added tier. NestHR's assumption: every company should get all 7 modules — including campus hiring — at every tier, priced simply per employee per year. If you need placement-specific hiring or want to avoid tier upgrades, NestHR was built for that.",
  },
  finalTag: 'Simple. Per employee. No hidden modules.',
  finalHeading: 'All 7 OS modules included. INR pricing.',
  finalBody: 'No forex tax, no per-seat tricks. See what NestHR includes at every tier.',
  finalPrimaryCta: { href: 'https://nesthr.labelnest.in', label: 'Try NestHR ↗', external: true },
  finalSecondaryCta: { href: '/vs/zoho-people', label: 'Also see: vs Zoho People →' },
}

export default function VsGreytHRPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/greythr' }, { name: 'greytHR', path: '/vs/greythr' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
