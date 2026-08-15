import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/cb-insights', {
    title: 'LabelNest vs CB Insights — Market Intelligence Comparison',
    description: 'How LabelNest compares to CB Insights on pricing, coverage, and access model for VC, corporate strategy, and M&A teams tracking private markets.',
  })
}

const DATA: VsPageData = {
  slug: 'cb-insights',
  category: 'intelligence',
  competitorName: 'CB Insights',
  ourName: 'LabelNest',
  h1: 'LabelNest vs CB Insights: Honest Comparison for Teams Tracking Private Markets',
  subhead: 'CB Insights is built for corporate strategy, VC, and M&A teams who need funding signals, analyst reports, and AI-driven company research at enterprise scale. LabelNest is built for emerging managers and analysts who need real private-market data without a six-figure contract. Here is the direct comparison.',
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When CB Insights is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick CB Insights if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'You are a corporate strategy, M&A, or VC team with a $50K-$265K/year budget',
    'You need AI-assisted analyst reports and a due-diligence accelerator built in',
    'Native Salesforce, Microsoft 365 Copilot, or Snowflake integration matters',
    'Global company/investor signal coverage matters more than India/SE Asia depth',
  ],
  tldrRightPoints: [
    'You are an emerging manager, boutique fund, or analyst, not an enterprise strategy team',
    'India, Southeast Asia, and Gulf private-market coverage matters',
    'You want credit-based access with a self-serve free tier, not a sales-negotiated contract',
    'You need a data marketplace and investor data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Custom-quoted, seats bundled and limited; typically $50K-$85K/year, up to $265K+ for full enterprise deployments', verdict: 'no' }, labelnest: { text: 'Credit-based, no seat penalties, pay for what you use', verdict: 'win' } },
    { feature: 'Free access', competitor: { text: '10-day free trial only, full access requires a sales call', verdict: 'mid' }, labelnest: { text: 'Self-serve free tier, no credit card, no sales call', verdict: 'win' } },
    { feature: 'Coverage focus', competitor: { text: 'Global company/investor signals, funding data, valuations — broad, enterprise-oriented', verdict: 'win' }, labelnest: { text: '40,000+ entities, India, SE Asia, and Gulf focus', verdict: 'mid' } },
    { feature: 'India private markets depth', competitor: { text: 'Present as part of global coverage, not a specialization', verdict: 'no' }, labelnest: { text: 'Deep — companies, funds, deals, LPs, service providers', verdict: 'win' } },
    { feature: 'AI research tools', competitor: { text: 'ChatCBI, Personal Briefing agent, Commercial Due Diligence Accelerator, Acquisition Hunter', verdict: 'win' }, labelnest: { text: 'AI-assisted extraction and entity resolution behind the data, not a standalone research agent yet', verdict: 'mid' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'CRM/BI integrations', competitor: { text: 'Native Salesforce, Microsoft 365 Copilot, Snowflake', verdict: 'win' }, labelnest: { text: 'API available, expanding', verdict: 'mid' } },
    { feature: 'Human verification', competitor: { text: 'Analyst-produced reports on top of automated signals', verdict: 'win' }, labelnest: { text: 'Human review at every low-confidence flag', verdict: 'win' } },
    { feature: 'Ownership and lock-in', competitor: { text: 'Annual contract, module add-ons renegotiated separately', verdict: 'no' }, labelnest: { text: 'Month-to-month possible, credits do not expire', verdict: 'win' } },
    { feature: 'Support', competitor: { text: 'Dedicated onboarding specialist on enterprise plans', verdict: 'win' }, labelnest: { text: 'Direct team access, same-day response', verdict: 'win' } },
  ],
  calloutTitle: 'What CB Insights does better than us — honestly.',
  calloutBody: 'CB Insights has genuinely useful AI research tooling — ChatCBI, a due-diligence accelerator, and native integrations into Salesforce and Snowflake that plug straight into an enterprise corporate-strategy workflow. If you are a large team with that budget and those integration needs, it does things LabelNest does not do yet. That is not who LabelNest is built for.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Enterprise signal platform vs. emerging-manager intelligence tool.',
    body: "CB Insights' assumption: corporate strategy, M&A, and enterprise VC teams with dedicated budget for AI-assisted research at global scale, priced accordingly. LabelNest's assumption: emerging managers, boutique funds, and analysts who need real depth on companies, funds, deals, and LPs in India, SE Asia, and the Gulf — without a $50K+ annual commitment. If a CB Insights quote is out of reach or its coverage doesn't match where you actually operate, LabelNest was built for you.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/preqin', label: 'Also see: vs Preqin →' },
}

export default function VsCbInsightsPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/cb-insights' }, { name: 'CB Insights', path: '/vs/cb-insights' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
