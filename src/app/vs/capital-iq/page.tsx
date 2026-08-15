import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/capital-iq', {
    title: 'LabelNest vs S&P Capital IQ — Private Markets Data Comparison',
    description: 'How LabelNest compares to S&P Capital IQ Pro for private-market research — a purpose-built emerging-manager tool vs a broad financial data terminal.',
  })
}

const DATA: VsPageData = {
  slug: 'capital-iq',
  category: 'intelligence',
  competitorName: 'S&P Capital IQ',
  ourName: 'LabelNest',
  h1: 'LabelNest vs S&P Capital IQ: Purpose-Built vs a Broad Financial Terminal',
  subhead: "S&P Capital IQ Pro is a financial data terminal built primarily for public-markets research, screening, and comps — private-company and fund data is one module inside a much bigger, and much more expensive, platform. LabelNest is purpose-built for private markets in India, SE Asia, and the Gulf. Here is the direct comparison.",
  primaryCta: { href: '/nestlens', label: 'Explore NestLens →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'When Capital IQ is right. When LabelNest is right.',
  tldrLeftLabel: 'Pick Capital IQ if',
  tldrRightLabel: 'Pick LabelNest if',
  tldrLeftPoints: [
    'You need public-markets screening, comps, and fixed-income data as your primary use case',
    'Private-company data is a secondary need alongside broader financial-terminal workflows',
    'Your organization already has budget for a $14K-$215K+/year enterprise terminal contract',
    'Excel plug-in and desktop/API/feed delivery across asset classes matters',
  ],
  tldrRightPoints: [
    'Private markets — companies, funds, deals, LPs — is your primary need, not a side module',
    'India, Southeast Asia, and Gulf coverage matters',
    'You want credit-based access, not a quote-negotiated enterprise terminal contract',
    'You need a data marketplace and investor data rooms in the same tool',
  ],
  tableRows: [
    { feature: 'Pricing model', competitor: { text: 'Custom-quoted; contracts documented from ~$14,800 to $215,000+/year, median around $53,000/year', verdict: 'no' }, labelnest: { text: 'Credit-based, no seat penalties, pay for what you use', verdict: 'win' } },
    { feature: 'Primary focus', competitor: { text: 'Public markets, screening, comps, fixed income — private data is one module', verdict: 'mid' }, labelnest: { text: 'Private markets is the entire product — companies, funds, deals, LPs', verdict: 'win' } },
    { feature: 'India private markets depth', competitor: { text: 'Present as part of global financial data, not a specialization', verdict: 'no' }, labelnest: { text: 'Deep — companies, funds, deals, LPs, service providers', verdict: 'win' } },
    { feature: 'Free access', competitor: { text: 'No self-serve trial, sales-negotiated only', verdict: 'no' }, labelnest: { text: 'Self-serve free tier, no credit card, no sales call', verdict: 'win' } },
    { feature: 'Excel / API delivery', competitor: { text: 'Excel plug-in, desktop, API, and data-feed delivery across asset classes', verdict: 'win' }, labelnest: { text: 'API available, expanding', verdict: 'mid' } },
    { feature: 'Data marketplace', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'NestLens Exchange — buy and sell data with KYC and escrow', verdict: 'win' } },
    { feature: 'Investor data rooms', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, investor tier scoring', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered as a workflow', verdict: 'no' }, labelnest: { text: 'Live matching for emerging managers', verdict: 'win' } },
    { feature: 'Ownership and lock-in', competitor: { text: 'Annual enterprise contract, implementation and training add-on costs common', verdict: 'no' }, labelnest: { text: 'Month-to-month possible, credits do not expire', verdict: 'win' } },
    { feature: 'Breadth of asset classes', competitor: { text: 'Equities, fixed income, private markets, macro — one platform for all of finance', verdict: 'win' }, labelnest: { text: 'Private markets only, by design', verdict: 'no' } },
  ],
  calloutTitle: 'What Capital IQ does better than us — honestly.',
  calloutBody: "S&P Capital IQ Pro is a genuinely comprehensive financial data terminal — equities, fixed income, screening, comps, and private markets all in one platform, delivered via Excel, desktop, or API. If your team needs that breadth across asset classes, it does something LabelNest was never built to do. LabelNest is not a terminal replacement — it is a purpose-built tool for the private-markets slice most terminal subscriptions treat as secondary.",
  extra: {
    tag: 'The philosophical difference',
    heading: 'One terminal for all of finance vs. one tool built for private markets.',
    body: "Capital IQ's assumption: large financial institutions need one terminal covering every asset class, priced for that breadth. LabelNest's assumption: if private markets — companies, funds, deals, LPs in India, SE Asia, and the Gulf — is actually your job, you shouldn't need to buy (or pay for) a public-markets terminal to get it. If Capital IQ's private-market module feels like an afterthought bolted onto a much bigger, much pricier product, LabelNest was built for you.",
  },
  finalTag: 'See LabelNest for yourself',
  finalHeading: '40,000+ entities. Credit-based. Free tier available.',
  finalBody: 'Open NestLens, browse the data, and decide for yourself. No credit card, no sales call required.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Try NestLens Free ↗', external: true },
  finalSecondaryCta: { href: '/vs/bloomberg', label: 'Also see: vs Bloomberg →' },
}

export default function VsCapitalIqPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/capital-iq' }, { name: 'S&P Capital IQ', path: '/vs/capital-iq' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
