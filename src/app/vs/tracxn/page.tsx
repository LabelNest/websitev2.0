import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/tracxn', {
    title: 'Tracxn Alternatives for India — LabelNest vs Tracxn',
    description: 'Looking for a Tracxn alternative? How LabelNest compares on pricing, access model, and what\'s built beyond startup tracking — for India-focused investors and analysts.',
  })
}

const DATA: VsPageData = {
  slug: 'tracxn',
  category: 'intelligence',
  competitorName: 'Tracxn',
  ourName: 'LabelNest',
  h1: 'Tracxn Alternatives for India: LabelNest vs Tracxn',
  subhead: "Tracxn is a well-known India-origin platform tracking 1.4M+ entities globally across sectors. If you're evaluating it as your India private-markets tool, here's how LabelNest compares — same India focus, different access model and a lot more than tracking alone.",
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Tracxn is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick Tracxn if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'You need global startup/sector tracking across 1.4M+ entities, not just India',
    'A dedicated CRM tool and personalized dashboard builder are core to your workflow',
    'You have budget for a custom-quoted, sales-negotiated plan with no monthly option',
    'Cap table and financial-statement data depth across a wide sector taxonomy matters',
  ],
  tldrRightPoints: [
    'India, Southeast Asia, and Gulf private-market depth is your primary need',
    'You want credit-based access with a self-serve free tier, not a sales-negotiated contract',
    'You need funds, LPs, GPs, and service providers as first-class data, not just startups',
    'You need a data marketplace and investor data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Custom-quoted, no published pricing, no monthly plan; positioned at a premium for the India market', verdict: 'no' }, labelnest: { text: 'Credit-based, no seat penalties, pay for what you use', verdict: 'win' } },
    { feature: 'Free access', competitor: { text: 'No free trial offered', verdict: 'no' }, labelnest: { text: 'Self-serve free tier, no credit card, no sales call', verdict: 'win' } },
    { feature: 'Entity coverage', competitor: { text: '1.4M+ entities globally across sectors', verdict: 'win' }, labelnest: { text: '40,000+ entities, India, SE Asia, and Gulf focus', verdict: 'mid' } },
    { feature: 'Fund, LP, and GP data', competitor: { text: 'Primarily startup/company-tracking focused', verdict: 'no' }, labelnest: { text: 'Funds, LPs, GPs, and service providers as first-class entities', verdict: 'win' } },
    { feature: 'CRM / dashboard tools', competitor: { text: 'Inbuilt CRM tool and personalized dashboard builder', verdict: 'win' }, labelnest: { text: 'Not a CRM workflow tool — data and marketplace focused', verdict: 'no' } },
    { feature: 'API access', competitor: { text: 'API support included', verdict: 'win' }, labelnest: { text: 'API available, expanding', verdict: 'mid' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
    { feature: 'Ownership and lock-in', competitor: { text: 'Annual contract, no monthly billing option', verdict: 'no' }, labelnest: { text: 'Month-to-month possible, credits do not expire', verdict: 'win' } },
  ],
  calloutTitle: 'What Tracxn does better than us — honestly.',
  calloutBody: "Tracxn's global sector coverage — 1.4 million entities with cap tables, financials, and an inbuilt CRM — is genuinely broader than what LabelNest tracks today, and its dashboard/sourcing-board tools are built for a deal-sourcing workflow LabelNest doesn't replicate. If global sector breadth and CRM-style sourcing tools are what you need, Tracxn does that well.",
  extra: {
    tag: 'The philosophical difference',
    heading: 'Global startup tracker vs. fund-and-LP intelligence for India, SE Asia, and the Gulf.',
    body: "Tracxn's assumption: broad, global sector coverage with sourcing and CRM tools built for deal teams, priced at a premium with no self-serve option. LabelNest's assumption: if your job is the fund, LP, and GP side of India, SE Asia, and Gulf private markets — not just startup tracking — you need entities Tracxn doesn't treat as first-class, plus a marketplace and data rooms it doesn't build, without a sales-negotiated annual contract.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/venture-intelligence', label: 'Also see: vs Venture Intelligence →' },
}

export default function VsTracxnPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/tracxn' }, { name: 'Tracxn', path: '/vs/tracxn' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
