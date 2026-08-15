import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/grata', {
    title: 'Grata Alternatives — LabelNest vs Grata',
    description: 'Looking for a Grata alternative? How LabelNest compares on pricing and coverage for investors researching private companies, funds, and LPs beyond SMB search.',
  })
}

const DATA: VsPageData = {
  slug: 'grata',
  category: 'intelligence',
  competitorName: 'Grata',
  ourName: 'LabelNest',
  h1: 'Grata Alternatives: LabelNest vs Grata',
  subhead: "Grata is a search engine for small and medium businesses, built for deal teams building targeted lead lists and monitoring buying signals — the median customer pays around $155,000/year. LabelNest is a private-markets intelligence platform for a different job: funds, LPs, GPs, and India/SE Asia/Gulf coverage, at credit-based pricing.",
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Grata is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick Grata if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'SMB account discovery and targeted lead-list building is your core workflow',
    'You need buying signals (hiring, ownership changes, funding) to time outreach',
    'Verified executive contacts and CRM integration for outreach campaigns matter',
    'You have budget for enterprise pricing — the median Grata customer pays ~$155,000/year',
  ],
  tldrRightPoints: [
    'India, Southeast Asia, and Gulf private-market coverage matters, not just SMB search',
    'You need funds, LPs, GPs, and service providers, not just company lead lists',
    'You want credit-based access with a self-serve free tier, not a $150K+/year contract',
    'You need a data marketplace and investor data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Custom-quoted; median customer pays ~$155,000/year', verdict: 'no' }, labelnest: { text: 'Credit-based, no seat penalties, pay for what you use', verdict: 'win' } },
    { feature: 'Free access', competitor: { text: 'No published free tier, contact sales for a quote', verdict: 'no' }, labelnest: { text: 'Self-serve free tier, no credit card, no sales call', verdict: 'win' } },
    { feature: 'Core use case', competitor: { text: 'SMB account discovery, lead lists, buying-signal monitoring', verdict: 'win' }, labelnest: { text: 'Private-market entity intelligence — companies, funds, deals, LPs', verdict: 'win' } },
    { feature: 'India private markets depth', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Deep — companies, funds, deals, LPs, service providers', verdict: 'win' } },
    { feature: 'Fund and LP data', competitor: { text: 'Not a focus — company/SMB search centric', verdict: 'no' }, labelnest: { text: 'Funds, LPs, GPs, and service providers as first-class entities', verdict: 'win' } },
    { feature: 'Outreach / campaign tools', competitor: { text: 'Personalized email campaigns, engagement tracking, CRM integration', verdict: 'win' }, labelnest: { text: 'Not an outreach tool — data and marketplace focused', verdict: 'no' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
  ],
  calloutTitle: 'What Grata does better than us — honestly.',
  calloutBody: "Grata's SMB search and signal-monitoring tools are purpose-built for a use case LabelNest doesn't try to solve — finding and timing outreach to acquisition targets with verified contacts and campaign tracking baked in. If that's your workflow, Grata does it well; the ~$155,000/year median price reflects a genuinely different, deal-origination-focused product.",
  extra: {
    tag: 'The philosophical difference',
    heading: 'A deal-origination search engine vs. a private-markets intelligence platform.',
    body: "Grata's assumption: deal teams need to find and reach SMB acquisition targets with signal-based timing, priced for that origination workflow. LabelNest's assumption: emerging managers and analysts need depth on the fund, LP, and GP side of private markets in India, SE Asia, and the Gulf — plus a marketplace and data rooms Grata doesn't build — without a six-figure annual commitment.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/sourcescrub', label: 'Also see: vs SourceScrub →' },
}

export default function VsGrataPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/grata' }, { name: 'Grata', path: '/vs/grata' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
