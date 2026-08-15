import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/sourcescrub', {
    title: 'SourceScrub Alternatives — LabelNest vs SourceScrub',
    description: 'Looking for a SourceScrub alternative? How LabelNest compares for investors and analysts who need private-market data beyond deal sourcing, with India/SE Asia depth.',
  })
}

const DATA: VsPageData = {
  slug: 'sourcescrub',
  category: 'intelligence',
  competitorName: 'SourceScrub',
  ourName: 'LabelNest',
  h1: 'SourceScrub Alternatives: LabelNest vs SourceScrub',
  subhead: "SourceScrub is a deal-sourcing platform for investment and M&A teams, built around 16M+ companies and 220,000+ information sources with an expert-in-the-loop AI process. LabelNest is a different kind of tool — private-market intelligence, a marketplace, and investor data rooms for emerging managers focused on India, SE Asia, and the Gulf.",
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When SourceScrub is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick SourceScrub if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'Deal sourcing across 16M+ companies and 220,000+ sources is your core workflow',
    'Complex search/filter tools and CRM/workflow integrations are central to your process',
    'You are on an investment or M&A team doing high-volume target discovery',
    'Expert-in-the-loop AI-assisted sourcing at that scale is worth the investment',
  ],
  tldrRightPoints: [
    'India, Southeast Asia, and Gulf private-market depth matters more than global sourcing breadth',
    'You need funds, LPs, GPs, and service providers as connected entities, not just sourcing targets',
    'You want credit-based access with a self-serve free tier, not a sales-negotiated contract',
    'You need a data marketplace and investor data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Company coverage', competitor: { text: '16M+ companies via 220,000+ information sources', verdict: 'win' }, labelnest: { text: '40,000+ entities, India, SE Asia, and Gulf focus', verdict: 'mid' } },
    { feature: 'India private markets depth', competitor: { text: 'Not a specialization — global deal-sourcing focus', verdict: 'no' }, labelnest: { text: 'Deep — companies, funds, deals, LPs, service providers', verdict: 'win' } },
    { feature: 'Deal sourcing / target discovery', competitor: { text: 'Purpose-built, expert-in-the-loop AI-powered sourcing', verdict: 'win' }, labelnest: { text: 'Not a sourcing-workflow tool — data and marketplace focused', verdict: 'no' } },
    { feature: 'CRM / workflow integration', competitor: { text: 'Integrates with common CRM and workflow tools', verdict: 'win' }, labelnest: { text: 'API available, expanding', verdict: 'mid' } },
    { feature: 'Free access', competitor: { text: 'No published free tier, contact sales', verdict: 'no' }, labelnest: { text: 'Self-serve free tier, no credit card, no sales call', verdict: 'win' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
    { feature: 'Human verification', competitor: { text: 'Expert-in-the-loop review on sourced data', verdict: 'win' }, labelnest: { text: 'Human review at every low-confidence flag', verdict: 'win' } },
  ],
  calloutTitle: 'What SourceScrub does better than us — honestly.',
  calloutBody: "SourceScrub's core strength is deal sourcing at scale — 16 million companies pulled from 220,000+ sources with expert-in-the-loop verification and deep CRM/workflow integration. If your job is finding and qualifying acquisition or investment targets at that volume, it's purpose-built for that in a way LabelNest, which is not a sourcing tool, is not.",
  extra: {
    tag: 'The philosophical difference',
    heading: 'A global deal-sourcing engine vs. a regional private-markets platform.',
    body: "SourceScrub's assumption: investment and M&A teams need to search and qualify targets across the widest possible company universe, with sourcing workflow built in. LabelNest's assumption: emerging managers and analysts working India, SE Asia, and the Gulf need depth on funds, LPs, and GPs as connected entities — not sourcing tools — plus a marketplace and data rooms SourceScrub doesn't build.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/grata', label: 'Also see: vs Grata →' },
}

export default function VsSourceScrubPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/sourcescrub' }, { name: 'SourceScrub', path: '/vs/sourcescrub' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
