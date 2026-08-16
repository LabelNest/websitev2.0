import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/appen', {
    title: 'Appen Alternatives — NestLens Exchange vs Appen',
    description: 'Looking for an Appen alternative? If you need crowdsourced data annotation, Appen is the right category. If you need private markets datasets, here is how NestLens Exchange compares.',
  })
}

const DATA: VsPageData = {
  slug: 'appen',
  category: 'exchange',
  competitorName: 'Appen',
  ourName: 'NestLens Exchange',
  h1: 'Appen Alternatives: NestLens Exchange vs Appen',
  subhead: 'Appen operates one of the largest crowdsourced annotation workforces in the industry — 1 million+ contractors across 170+ countries, project-based pricing from roughly $0.01-$0.10 per task. NestLens Exchange is a different kind of marketplace: buying and selling already-structured private markets data, not commissioning crowdsourced annotation.',
  primaryCta: { href: '/nestlens/exchange', label: 'Explore Exchange →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Appen crowdsources data annotation. Exchange trades finished private-markets datasets.',
  tldrLeftLabel: 'Pick Appen if',
  tldrRightLabel: 'Pick NestLens Exchange if',
  tldrLeftPoints: [
    'You need multilingual or culturally diverse data annotation at scale',
    'Content and search relevance, RLHF, or model evaluation services fit your project',
    'A crowdsourced workforce of 1 million+ contractors across 170+ countries matters',
    'Project-based, per-task pricing (roughly $0.01-$0.10/task) fits your budget model',
  ],
  tldrRightPoints: [
    'You need already-structured private markets data — companies, funds, deals, LPs',
    'You want to buy or sell finished datasets, not commission crowdsourced annotation',
    'You want every seller KYC-verified and every transaction escrow-protected',
    'You also want Intelligence and Capital Readiness in the same account',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Crowdsourced data annotation, sourcing, and model evaluation', verdict: 'win' }, labelnest: { text: 'Marketplace for finished private-markets datasets', verdict: 'win' } },
    { feature: 'Workforce model', competitor: { text: '1M+ crowdsourced contractors, 170+ countries', verdict: 'win' }, labelnest: { text: 'KYC-verified data sellers, not a crowdsourced workforce', verdict: 'mid' } },
    { feature: 'Pricing model', competitor: { text: 'Project-based, roughly $0.01-$0.10 per annotation task', verdict: 'mid' }, labelnest: { text: 'Free to browse; sellers pay for an active listing, buyers pay per project via credits', verdict: 'win' } },
    { feature: 'Seller verification', competitor: { text: 'Not applicable — Appen is the annotation provider, not a marketplace of sellers', verdict: 'mid' }, labelnest: { text: 'KYC required before a seller can list', verdict: 'win' } },
    { feature: 'Escrow on transactions', competitor: { text: 'Not applicable — direct service contract, not a peer marketplace', verdict: 'mid' }, labelnest: { text: 'Escrow-protected transactions', verdict: 'win' } },
    { feature: 'Bundled intelligence layer', competitor: { text: 'Not offered — annotation services only', verdict: 'no' }, labelnest: { text: 'Intelligence module in the same account', verdict: 'win' } },
    { feature: 'India private markets focus', competitor: { text: 'Not applicable — different category entirely', verdict: 'no' }, labelnest: { text: 'Deep India, SE Asia, Gulf coverage', verdict: 'win' } },
  ],
  calloutTitle: 'What Appen does better than us — honestly.',
  calloutBody: 'If you landed here searching for a "data annotation marketplace," Appen is likely the category you actually need — a genuinely massive, multilingual crowdsourced workforce built specifically for annotation and content relevance work at scale. NestLens Exchange doesn\'t do any of that; it trades finished datasets, not crowdsourced labeling.',
  extra: {
    tag: 'Different categories, same search intent',
    heading: 'Crowdsourced annotation vs. trading finished datasets.',
    body: 'Both "Appen" and "NestLens Exchange" show up under "data marketplace" and "data annotation marketplace" searches, but they solve different problems. Appen produces labeled and annotated data via a global crowdsourced workforce. NestLens Exchange helps you buy or sell already-structured, verified private markets datasets. If your need is the former, Appen is the right tool — not Exchange.',
  },
  finalTag: 'Built for one category, done properly',
  finalHeading: 'Private markets data, KYC-verified, escrow-protected.',
  finalBody: 'Browse Exchange listings free. Buy per project with credits — no subscription needed.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Browse Exchange ↗', external: true },
  finalSecondaryCta: { href: '/vs/labelbox', label: 'Also see: vs Labelbox →' },
}

export default function VsAppenPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/appen' }, { name: 'Appen', path: '/vs/appen' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
