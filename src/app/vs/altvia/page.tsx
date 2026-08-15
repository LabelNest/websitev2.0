import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/altvia', {
    title: 'NestLens Capital Readiness vs Altvia — Private Capital CRM vs Fundraise Readiness',
    description: 'How NestLens Capital Readiness compares to Altvia — a Salesforce-built private capital CRM for the full fund lifecycle vs a fundraise-ready data room and LP-GP matching.',
  })
}

const DATA: VsPageData = {
  slug: 'altvia',
  category: 'fund-data-room',
  competitorName: 'Altvia',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs Altvia: Private Capital CRM vs Fundraise Readiness',
  subhead: 'Altvia is a Salesforce-built CRM for the full private capital fund lifecycle — client management, PPM generation and tracking, deal pipeline — priced from around $1,800/year plus implementation. Capital Readiness solves a narrower, earlier step: getting raise-ready and matched to the right LPs and GPs.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Altvia manages your fund lifecycle in Salesforce. Capital Readiness gets you funded.',
  tldrLeftLabel: 'Pick Altvia if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You already run on Salesforce and want a CRM built for the full fund lifecycle',
    'Automated PPM generation, distribution, and tracking fits your fundraising process',
    'You need client management, benchmarking, and modeling across an existing investor base',
    'You have budget for CRM licensing ($1,800+/year) plus implementation and data migration',
  ],
  tldrRightPoints: [
    'You are an emerging manager who needs to look investor-ready, not run a Salesforce CRM',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not a CRM to manage relationships you already have',
    'You are an Indian or emerging market fund manager',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Private capital CRM built on Salesforce, full fund lifecycle', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'VDR and LP portal available as an add-on module', verdict: 'mid' }, labelnest: { text: '10 sections, 51 items, structured, built in', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered — CRM for relationships you already have', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'PPM generation and tracking', competitor: { text: 'Automated generation, distribution, and tracking', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Deal tracking / pipeline', competitor: { text: 'Custom checklists, fund details, metrics tracking', verdict: 'win' }, labelnest: { text: 'Investor matching serves a similar goal differently', verdict: 'mid' } },
    { feature: 'Pricing', competitor: { text: 'From ~$1,800/year plus $2,000-$15,000+ implementation', verdict: 'mid' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
  ],
  calloutTitle: 'What Altvia does better than us — honestly.',
  calloutBody: 'Altvia\'s Salesforce foundation and full-lifecycle modules — automated PPM generation and tracking, client management, deal pipeline — are genuinely useful if you\'re already invested in the Salesforce ecosystem and managing an existing fund lifecycle. Capital Readiness is narrower by design: it doesn\'t try to be a CRM.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'A CRM for the fund lifecycle vs. a tool for getting funded.',
    body: 'Altvia\'s assumption: private capital firms need a Salesforce-native CRM spanning fundraising through portfolio management. Capital Readiness\'s assumption: emerging managers need to look investor-ready and get matched to the right LPs before that full-lifecycle CRM is even relevant. The two can coexist at different stages of a fund\'s life.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market fund managers.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/dealcloud', label: 'Also see: vs DealCloud →' },
}

export default function VsAltviaPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/altvia' }, { name: 'Altvia', path: '/vs/altvia' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
