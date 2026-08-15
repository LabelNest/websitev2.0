import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/fundcount', {
    title: 'FundCount Alternatives — NestLens Capital Readiness vs FundCount',
    description: 'Looking for a FundCount alternative? How NestLens Capital Readiness compares — fund accounting software for operating funds vs a fundraise-ready data room and LP-GP matching.',
  })
}

const DATA: VsPageData = {
  slug: 'fundcount',
  category: 'fund-data-room',
  competitorName: 'FundCount',
  ourName: 'Capital Readiness',
  h1: 'FundCount Alternatives: Capital Readiness vs FundCount',
  subhead: 'FundCount is fund and portfolio accounting software for family offices and fund administrators — multicurrency general ledger, bank reconciliation, investor accounting, starting around $21,928-$30,812/year depending on the plan. Capital Readiness is a different tool: a fundraise-ready data room and LP-GP matching for managers who are still raising.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'FundCount does your fund\'s books. Capital Readiness gets you funded.',
  tldrLeftLabel: 'Pick FundCount if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You already operate a fund, family office, or fund-admin business and need accounting',
    'Multicurrency general ledger, bank reconciliation, and accounts payable are core needs',
    'Automated workflows and direct broker/custodian feeds matter to your operations',
    'You have $21,928+/year budget for fund accounting infrastructure',
  ],
  tldrRightPoints: [
    'You are an emerging manager still raising your fund, not yet operating one',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not fund accounting for capital you don\'t have yet',
    'You are an Indian or emerging market fund manager',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Fund and portfolio accounting for family offices and fund administrators', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Not offered — assumes capital is already raised', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, structured for the raise', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Fund / investor accounting', competitor: { text: 'Multicurrency G/L, bank reconciliation, accounts payable', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Broker/custodian integration', competitor: { text: 'Direct automated feeds', verdict: 'win' }, labelnest: { text: 'Not an accounting tool', verdict: 'no' } },
    { feature: 'Pricing', competitor: { text: '$21,928-$30,812+/year depending on plan (HNW/family office/fund admin tiers)', verdict: 'no' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
  ],
  calloutTitle: 'What FundCount does better than us — honestly.',
  calloutBody: 'FundCount\'s multicurrency general ledger, automated broker/custodian feeds, and investor accounting are genuinely built for family offices and fund administrators managing real books of capital day to day. Capital Readiness doesn\'t do accounting at all. If you\'re already operating a fund and need that infrastructure, FundCount is built for it.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Accounting for capital you have vs. readiness for capital you\'re raising.',
    body: "FundCount's assumption: family offices and fund administrators need robust multicurrency accounting for capital already under management. Capital Readiness's assumption: emerging managers need to get raise-ready and matched to LPs before that accounting infrastructure is even relevant. Use Capital Readiness to raise, FundCount (or a similar fund-accounting platform) once you're operating.",
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market fund managers.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/allvue', label: 'Also see: vs Allvue Systems →' },
}

export default function VsFundCountPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/fundcount' }, { name: 'FundCount', path: '/vs/fundcount' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
