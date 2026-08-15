import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/dealroom', {
    title: 'LabelNest vs Dealroom — VC Intelligence Platform Comparison',
    description: 'How LabelNest compares to Dealroom.co on pricing, coverage, and access model for investors researching private companies, funds, and deals.',
  })
}

const DATA: VsPageData = {
  slug: 'dealroom',
  category: 'intelligence',
  competitorName: 'Dealroom',
  ourName: 'LabelNest',
  h1: 'LabelNest vs Dealroom: Honest Comparison for VC and Corporate Research Teams',
  subhead: "Dealroom is a strong European VC intelligence platform for institutional investors and large corporates doing market research. LabelNest is built for emerging managers and analysts who need India, SE Asia, and Gulf depth, credit-based access, and tools beyond research — a marketplace and investor data rooms. Here is the direct comparison.",
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Dealroom is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick Dealroom if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'You are an institutional investor or large corporate focused on European VC intelligence',
    'You have a €12,000-€40,000/year budget and a minimum-3-seat team',
    'Unlimited search and large-volume data exports (up to 10,000/user) matter',
    'Market research and reporting is the primary use case, not transacting',
  ],
  tldrRightPoints: [
    'You are an emerging manager, boutique fund, or analyst, not an institutional research team',
    'India, Southeast Asia, and Gulf coverage matters more than European depth',
    'You want credit-based access, not a €12K+/year minimum-seat contract',
    'You need a data marketplace and investor data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: '€12,000/year (Starter, 3 seats) to €40,000/year (Corporate, 20 seats), annual only, no monthly option', verdict: 'no' }, labelnest: { text: 'Credit-based, no seat minimum, pay for what you use', verdict: 'win' } },
    { feature: 'Geographic focus', competitor: { text: 'Strong in Europe, since 2013', verdict: 'win' }, labelnest: { text: 'India, SE Asia, and Gulf focus, 40,000+ entities', verdict: 'mid' } },
    { feature: 'India private markets depth', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Deep — companies, funds, deals, LPs, service providers', verdict: 'win' } },
    { feature: 'Data exports', competitor: { text: 'Up to 10,000 exports per user on premium plans', verdict: 'win' }, labelnest: { text: 'Credit-based export, scales with plan', verdict: 'mid' } },
    { feature: 'Free trial / self-serve', competitor: { text: 'No self-serve trial, demo required', verdict: 'no' }, labelnest: { text: 'Self-serve free tier, no credit card, no demo required', verdict: 'win' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
    { feature: 'Support', competitor: { text: 'Dedicated training, onboarding, and Intelligence Unit support on premium plans', verdict: 'win' }, labelnest: { text: 'Direct team access, same-day response', verdict: 'win' } },
    { feature: 'Minimum commitment', competitor: { text: '3 seats minimum on every paid plan, annual contract', verdict: 'no' }, labelnest: { text: 'Month-to-month possible, credits do not expire', verdict: 'win' } },
  ],
  calloutTitle: 'What Dealroom does better than us — honestly.',
  calloutBody: "Dealroom has real depth in European VC intelligence and a mature research workflow — unlimited search, large-volume exports, and dedicated analyst support built for institutional teams. If Europe is where you invest and you have the budget for a seat-minimum annual contract, Dealroom is a strong, established choice. That is not who LabelNest is built for.",
  extra: {
    tag: 'The philosophical difference',
    heading: 'European institutional research tool vs. India/SE Asia-focused intelligence platform.',
    body: "Dealroom's assumption: institutional investors and large corporates researching the European VC market, with budget for a seat-minimum annual contract and dedicated analyst support. LabelNest's assumption: emerging managers, boutique funds, and analysts who need real depth in India, SE Asia, and the Gulf — plus a marketplace and data rooms Dealroom doesn't build. If your market isn't Europe, or the seat minimum doesn't fit your team size, LabelNest was built for you.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/preqin', label: 'Also see: vs Preqin →' },
}

export default function VsDealroomPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/dealroom' }, { name: 'Dealroom', path: '/vs/dealroom' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
