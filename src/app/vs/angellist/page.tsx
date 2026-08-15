import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/angellist', {
    title: 'NestLens Capital Readiness vs AngelList — Fund Formation vs Fundraise Readiness',
    description: 'How NestLens Capital Readiness compares to AngelList — SPV/syndicate fund administration infrastructure vs a fundraise-ready data room and LP-GP matching for founders.',
  })
}

const DATA: VsPageData = {
  slug: 'angellist',
  category: 'capital-readiness',
  competitorName: 'AngelList',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs AngelList: Different Vehicles, Different Jobs',
  subhead: 'AngelList is fund-formation and administration infrastructure — SPVs, syndicates, and rolling funds, with $171B+ in assets on platform, 25,000+ funds/syndicates, and ~$8,000 SPV setup fees plus platform carry. Capital Readiness is a different layer: getting a founder\'s data room investor-ready and matched to the right LPs and GPs.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'AngelList forms the vehicle. Capital Readiness gets you fundable.',
  tldrLeftLabel: 'Pick AngelList if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You are a GP or lead investor forming an SPV, syndicate, or rolling fund',
    'You need tech-enabled fund admin — tax services, filings, valuation support',
    'A 4-6 week launch timeline for the legal vehicle works for your raise',
    'You can absorb ~$8,000 SPV setup costs plus platform carry',
  ],
  tldrRightPoints: [
    'You are a founder or emerging manager who needs to look investor-ready, not form a fund vehicle',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching without setting up your own SPV infrastructure',
    'You are an Indian or emerging market founder or fund',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'SPV/syndicate/rolling-fund formation and administration', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Not offered as a founder-facing tool', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, structured', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Investor network exists, but matching is not a structured product feature', verdict: 'mid' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Fund/SPV formation and admin', competitor: { text: 'Tax services, filings, valuation support, dedicated manager', verdict: 'win' }, labelnest: { text: 'Not offered — assumes the vehicle already exists', verdict: 'no' } },
    { feature: 'Platform scale', competitor: { text: '$171B+ assets on platform, 25,000+ funds/syndicates, 72,000+ active investors', verdict: 'win' }, labelnest: { text: '40,000+ entities tracked, India/SE Asia/Gulf focus', verdict: 'mid' } },
    { feature: 'Cost structure', competitor: { text: '~$8,000 SPV setup plus regulatory costs and platform carry', verdict: 'no' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
  ],
  calloutTitle: 'What AngelList does better than us — honestly.',
  calloutBody: 'AngelList\'s fund-formation infrastructure is genuinely built for scale — $171B+ on platform, tax services, filings, and a dedicated manager for GPs standing up an SPV or rolling fund. Capital Readiness doesn\'t form or administer investment vehicles at all. If you\'re a GP who needs to launch a fund vehicle, that\'s AngelList\'s job, not ours.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Vehicle infrastructure vs. readiness and matching.',
    body: 'AngelList\'s assumption: GPs need fast, compliant fund-formation infrastructure to start deploying capital. Capital Readiness\'s assumption: founders and emerging managers need to look investor-ready and get matched to the right LPs and GPs before — or independent of — which legal vehicle eventually carries the capital. The two can coexist: build readiness with Capital Readiness, form the vehicle with AngelList if that\'s the right tool for your structure.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/gust', label: 'Also see: vs Gust →' },
}

export default function VsAngelListPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/angellist' }, { name: 'AngelList', path: '/vs/angellist' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
