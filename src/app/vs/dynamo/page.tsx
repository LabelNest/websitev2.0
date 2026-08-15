import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/dynamo', {
    title: 'NestLens Capital Readiness vs Dynamo Software — Alternative Investment Platform vs Fundraise Readiness',
    description: 'How NestLens Capital Readiness compares to Dynamo Software — a full alternative-investment CRM and portfolio platform vs a fundraise-ready data room and LP-GP matching for emerging managers.',
  })
}

const DATA: VsPageData = {
  slug: 'dynamo',
  category: 'fund-data-room',
  competitorName: 'Dynamo Software',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs Dynamo Software: Alternative Investment Platform vs Fundraise Readiness',
  subhead: 'Dynamo Software is an AI-powered alternative-investment management platform used by 1,000+ clients managing $10T+ in AUM — CRM, deal-flow tracking, investor reporting, and portfolio management. Capital Readiness solves a narrower, earlier problem: getting a fund raise-ready and matched to LPs.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Dynamo runs the whole investment platform. Capital Readiness gets you funded.',
  tldrLeftLabel: 'Pick Dynamo Software if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You need CRM, deal-flow tracking, and portfolio management across a large book of investments',
    'K-1 distribution, investor portal self-service, and NAV-weighted modeling matter to your operations',
    'You are a real estate, PE, VC, or family office platform managing at institutional scale',
    'You have budget for a modular, quote-based enterprise platform',
  ],
  tldrRightPoints: [
    'You are an emerging manager still raising your fund, not yet operating one at institutional scale',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not portfolio management for a book you already hold',
    'You are an Indian or emerging market fund manager',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Alternative-investment CRM, deal flow, portfolio management', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Not a dedicated fundraise-readiness data room', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, structured for the raise', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a structured product feature', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Portfolio management', competitor: { text: 'NAV-weighted modeling, stress testing, cash flow, multi-asset performance attribution', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Investor reporting / K-1s', competitor: { text: 'Automated distribution, electronic consent workflows', verdict: 'win' }, labelnest: { text: 'Not offered — pre-raise focused', verdict: 'no' } },
    { feature: 'Platform scale', competitor: { text: '1,000+ clients, $10T+ AUM managed on platform', verdict: 'win' }, labelnest: { text: '40,000+ entities tracked, India/SE Asia/Gulf focus', verdict: 'mid' } },
    { feature: 'Pricing', competitor: { text: 'Quote-based, modular, no published tiers', verdict: 'no' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
  ],
  calloutTitle: 'What Dynamo Software does better than us — honestly.',
  calloutBody: "Dynamo's scale — $10T+ in AUM managed on the platform, NAV-weighted modeling, and automated K-1 distribution — reflects real infrastructure for firms already operating at institutional scale across real estate, PE, VC, and family offices. Capital Readiness doesn't manage portfolios or investor reporting at all. If you're already running that scale of operation, Dynamo is built for it.",
  extra: {
    tag: 'The philosophical difference',
    heading: 'Operating the platform vs. getting funded to build one.',
    body: "Dynamo's assumption: alternative-investment firms need a comprehensive CRM and portfolio-management platform once they're operating at scale. Capital Readiness's assumption: emerging managers need to get raise-ready and matched to LPs first — before that scale of operation exists. Use Capital Readiness to raise your fund, a platform like Dynamo once you're managing a real book of investments.",
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market fund managers.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/juniper-square', label: 'Also see: vs Juniper Square →' },
}

export default function VsDynamoPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/dynamo' }, { name: 'Dynamo Software', path: '/vs/dynamo' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
