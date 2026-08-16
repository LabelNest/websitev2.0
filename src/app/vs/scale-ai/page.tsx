import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/scale-ai', {
    title: 'Scale AI Alternatives — NestLens Exchange vs Scale AI',
    description: 'Looking for a Scale AI alternative? If you need AI training-data annotation, Scale AI is the right category. If you need private markets datasets, here is how NestLens Exchange compares.',
  })
}

const DATA: VsPageData = {
  slug: 'scale-ai',
  category: 'exchange',
  competitorName: 'Scale AI',
  ourName: 'NestLens Exchange',
  h1: 'Scale AI Alternatives: NestLens Exchange vs Scale AI',
  subhead: 'Scale AI is enterprise data-labeling and annotation infrastructure — bounding boxes, RLHF collection, model evaluation, from $0.02/image self-serve up to ~$93K average enterprise contracts. NestLens Exchange is a different kind of marketplace entirely: buying and selling already-structured private markets data, not annotating raw data for AI training.',
  primaryCta: { href: '/nestlens/exchange', label: 'Explore Exchange →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Scale AI labels data for AI models. Exchange trades finished private-markets datasets.',
  tldrLeftLabel: 'Pick Scale AI if',
  tldrRightLabel: 'Pick NestLens Exchange if',
  tldrLeftPoints: [
    'You need raw data (images, text, audio, video, 3D sensor data) labeled for AI model training',
    'RLHF collection, model evaluation, or generative AI application development is your workflow',
    'A self-serve, pay-as-you-go credit system (from $0.02/image) fits your project scale',
    'Human-in-the-loop annotation pipelines across multiple modalities matter to you',
  ],
  tldrRightPoints: [
    'You need already-structured private markets data — companies, funds, deals, LPs',
    'You want to buy or sell finished datasets, not commission raw-data annotation',
    'You want every seller KYC-verified and every transaction escrow-protected',
    'You also want Intelligence and Capital Readiness in the same account',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'AI training-data labeling, annotation, and model evaluation', verdict: 'win' }, labelnest: { text: 'Marketplace for finished private-markets datasets', verdict: 'win' } },
    { feature: 'Data modality', competitor: { text: '2D/3D images, text, audio, video — raw data needing labels', verdict: 'win' }, labelnest: { text: 'Structured private-markets data — companies, funds, deals', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: 'Pay-as-you-go from $0.02/image, or custom enterprise (~$93K average contract)', verdict: 'mid' }, labelnest: { text: 'Free to browse; sellers pay for an active listing, buyers pay per project via credits', verdict: 'win' } },
    { feature: 'Seller verification', competitor: { text: 'Not applicable — Scale is the labeling provider, not a marketplace of sellers', verdict: 'mid' }, labelnest: { text: 'KYC required before a seller can list', verdict: 'win' } },
    { feature: 'Escrow on transactions', competitor: { text: 'Not applicable — direct service contract, not a peer marketplace', verdict: 'mid' }, labelnest: { text: 'Escrow-protected transactions', verdict: 'win' } },
    { feature: 'Bundled intelligence layer', competitor: { text: 'Not offered — labeling infrastructure only', verdict: 'no' }, labelnest: { text: 'Intelligence module in the same account', verdict: 'win' } },
    { feature: 'India private markets focus', competitor: { text: 'Not applicable — different category entirely', verdict: 'no' }, labelnest: { text: 'Deep India, SE Asia, Gulf coverage', verdict: 'win' } },
  ],
  calloutTitle: 'What Scale AI does better than us — honestly.',
  calloutBody: 'If you landed here searching for an "AI data marketplace," Scale AI is likely the category you actually need — it\'s genuinely strong at data labeling, RLHF collection, and model evaluation across multiple modalities, with a self-serve tier that scales from experimentation to enterprise. NestLens Exchange doesn\'t do any of that; it trades finished datasets, not raw-data annotation.',
  extra: {
    tag: 'Different categories, same search intent',
    heading: 'Labeling raw data vs. trading finished datasets.',
    body: 'Both "Scale AI" and "NestLens Exchange" show up under "data marketplace" searches, but they solve different problems. Scale AI helps you produce labeled training data from raw inputs. NestLens Exchange helps you buy or sell already-structured, verified private markets datasets. If your need is the former, Scale AI (or a similar annotation platform) is the right tool — not Exchange.',
  },
  finalTag: 'Built for one category, done properly',
  finalHeading: 'Private markets data, KYC-verified, escrow-protected.',
  finalBody: 'Browse Exchange listings free. Buy per project with credits — no subscription needed.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Browse Exchange ↗', external: true },
  finalSecondaryCta: { href: '/vs/appen', label: 'Also see: vs Appen →' },
}

export default function VsScaleAiPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/scale-ai' }, { name: 'Scale AI', path: '/vs/scale-ai' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
