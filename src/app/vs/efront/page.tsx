import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/efront', {
    title: 'NestLens Capital Readiness vs eFront — Investment Lifecycle Platform vs Fundraise Readiness',
    description: 'How NestLens Capital Readiness compares to eFront (a part of BlackRock) — a full alternative-investment lifecycle platform vs a fundraise-ready data room and LP-GP matching for emerging managers.',
  })
}

const DATA: VsPageData = {
  slug: 'efront',
  category: 'fund-data-room',
  competitorName: 'eFront',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs eFront: Investment Lifecycle Platform vs Fundraise Readiness',
  subhead: 'eFront, a part of BlackRock since 2019, is an end-to-end investment management platform for private equity, real estate, infrastructure, and private debt — six modular products spanning fundraising through fund accounting, quote-based. Capital Readiness solves one specific, earlier step: getting raise-ready and matched to LPs.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'eFront runs the full investment lifecycle. Capital Readiness gets you funded.',
  tldrLeftLabel: 'Pick eFront if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You need portfolio monitoring, risk analytics, and fund accounting across a real book',
    'Deal flow management and complex fund accounting are part of your daily operations',
    'BlackRock-backed infrastructure and scale matter to your LPs or compliance team',
    'You are an established PE, real estate, infrastructure, or private debt manager',
  ],
  tldrRightPoints: [
    'You are an emerging manager still raising your fund, not yet operating one at that scale',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not portfolio monitoring for a book you don\'t have yet',
    'You are an Indian or emerging market fund manager',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'End-to-end alternative-investment lifecycle platform', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Not a dedicated fundraise-readiness data room', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, structured for the raise', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a structured product feature', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Portfolio monitoring / risk analytics', competitor: { text: 'Exposure analysis, performance benchmarking, fee oversight', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Fund accounting', competitor: { text: 'Full fund accounting module', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Backing / scale', competitor: { text: 'Part of BlackRock since 2019', verdict: 'win' }, labelnest: { text: 'India, SE Asia, Gulf-focused emerging manager platform', verdict: 'mid' } },
    { feature: 'Pricing', competitor: { text: 'Quote-based, scoped by complexity and AUM', verdict: 'no' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
  ],
  calloutTitle: 'What eFront does better than us — honestly.',
  calloutBody: 'eFront\'s six modular products, backed by BlackRock\'s scale, cover the full alternative-investment lifecycle — deal flow, portfolio monitoring, risk analytics, and fund accounting — for firms already operating real portfolios. Capital Readiness doesn\'t manage a portfolio or a fund\'s books at all. If you\'re already at that scale, eFront is built for it.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Managing the investment lifecycle vs. getting funded to start one.',
    body: 'eFront\'s assumption: alternative-investment firms need a unified platform spanning fundraising through fund accounting once they\'re operating at real scale. Capital Readiness\'s assumption: emerging managers need to get raise-ready and matched to LPs before that scale of operation exists. Use Capital Readiness to raise your first fund, a platform like eFront once you\'re managing a real portfolio.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market fund managers.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/allvue', label: 'Also see: vs Allvue Systems →' },
}

export default function VsEfrontPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/efront' }, { name: 'eFront', path: '/vs/efront' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
