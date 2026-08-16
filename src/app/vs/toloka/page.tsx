import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/toloka', {
    title: 'Toloka Alternatives — NestLens Exchange vs Toloka',
    description: 'Looking for a Toloka alternative? If you need crowdsourced AI data labeling, Toloka is the right category. If you need private markets datasets, here is how NestLens Exchange compares.',
  })
}

const DATA: VsPageData = {
  slug: 'toloka',
  category: 'exchange',
  competitorName: 'Toloka',
  ourName: 'NestLens Exchange',
  h1: 'Toloka Alternatives: NestLens Exchange vs Toloka',
  subhead: 'Toloka is a human-in-the-loop data annotation platform — a global crowd workforce labeling text, images, audio, and video, plus agentic skills training and AI safety evaluation, with custom pricing and no public trial. NestLens Exchange is a different kind of marketplace: buying and selling already-structured private markets data, not commissioning crowdsourced annotation.',
  primaryCta: { href: '/nestlens/exchange', label: 'Explore Exchange →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Toloka labels data for AI models. Exchange trades finished private-markets datasets.',
  tldrLeftLabel: 'Pick Toloka if',
  tldrRightLabel: 'Pick NestLens Exchange if',
  tldrLeftPoints: [
    'You need a global crowd workforce to label text, images, audio, or video',
    'Agentic skills training or AI safety evaluation is part of your workflow',
    'Customizable quality-assurance workflows for annotation matter to your team',
    'You are prepared for custom, sales-negotiated pricing with no public trial',
  ],
  tldrRightPoints: [
    'You need already-structured private markets data — companies, funds, deals, LPs',
    'You want to buy or sell finished datasets, not commission crowdsourced annotation',
    'You want every seller KYC-verified and every transaction escrow-protected',
    'You also want Intelligence and Capital Readiness in the same account',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Crowdsourced data annotation and AI evaluation', verdict: 'win' }, labelnest: { text: 'Marketplace for finished private-markets datasets', verdict: 'win' } },
    { feature: 'Data modality', competitor: { text: 'Text, images, audio, video — raw data needing labels', verdict: 'win' }, labelnest: { text: 'Structured private-markets data — companies, funds, deals', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: 'Custom-quoted, no public trial', verdict: 'no' }, labelnest: { text: 'Free to browse; sellers pay for an active listing, buyers pay per project via credits', verdict: 'win' } },
    { feature: 'Seller verification', competitor: { text: 'Not applicable — Toloka is the annotation provider, not a marketplace of sellers', verdict: 'mid' }, labelnest: { text: 'KYC required before a seller can list', verdict: 'win' } },
    { feature: 'Escrow on transactions', competitor: { text: 'Not applicable — direct service contract, not a peer marketplace', verdict: 'mid' }, labelnest: { text: 'Escrow-protected transactions', verdict: 'win' } },
    { feature: 'Bundled intelligence layer', competitor: { text: 'Not offered — annotation services only', verdict: 'no' }, labelnest: { text: 'Intelligence module in the same account', verdict: 'win' } },
    { feature: 'India private markets focus', competitor: { text: 'Not applicable — different category entirely', verdict: 'no' }, labelnest: { text: 'Deep India, SE Asia, Gulf coverage', verdict: 'win' } },
  ],
  calloutTitle: 'What Toloka does better than us — honestly.',
  calloutBody: 'If you landed here searching for an "AI data marketplace," Toloka is likely the category you actually need — a genuinely capable global crowd platform for annotation, agentic skills training, and AI safety evaluation. NestLens Exchange doesn\'t do any of that; it trades finished datasets, not crowdsourced labeling.',
  extra: {
    tag: 'Different categories, same search intent',
    heading: 'Crowdsourced annotation vs. trading finished datasets.',
    body: 'Both "Toloka" and "NestLens Exchange" show up under "data marketplace" and "AI data marketplace" searches, but they solve different problems. Toloka produces labeled and evaluated data via a global crowd workforce. NestLens Exchange helps you buy or sell already-structured, verified private markets datasets. If your need is the former, Toloka is the right tool — not Exchange.',
  },
  finalTag: 'Built for one category, done properly',
  finalHeading: 'Private markets data, KYC-verified, escrow-protected.',
  finalBody: 'Browse Exchange listings free. Buy per project with credits — no subscription needed.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Browse Exchange ↗', external: true },
  finalSecondaryCta: { href: '/vs/scale-ai', label: 'Also see: vs Scale AI →' },
}

export default function VsTolokaPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/toloka' }, { name: 'Toloka', path: '/vs/toloka' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
