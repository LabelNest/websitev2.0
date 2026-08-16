import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/labelbox', {
    title: 'Labelbox Alternatives — NestLens Exchange vs Labelbox',
    description: 'Looking for a Labelbox alternative? If you need AI training-data annotation tooling, Labelbox is the right category. If you need private markets datasets, here is how NestLens Exchange compares.',
  })
}

const DATA: VsPageData = {
  slug: 'labelbox',
  category: 'exchange',
  competitorName: 'Labelbox',
  ourName: 'NestLens Exchange',
  h1: 'Labelbox Alternatives: NestLens Exchange vs Labelbox',
  subhead: 'Labelbox is a three-product data annotation platform — Catalog, Annotate, Model — with a free tier (5,000 labeled rows) and usage-based pricing from $0.10/LBU. NestLens Exchange is a different kind of marketplace: buying and selling already-structured private markets data, not building and running an annotation pipeline.',
  primaryCta: { href: '/nestlens/exchange', label: 'Explore Exchange →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Labelbox is annotation tooling for AI teams. Exchange trades finished private-markets datasets.',
  tldrLeftLabel: 'Pick Labelbox if',
  tldrRightLabel: 'Pick NestLens Exchange if',
  tldrLeftPoints: [
    'You need data curation, labeling, and model evaluation tooling in one platform',
    'Model-assisted labeling and a Python SDK fit your ML engineering workflow',
    'Deep integrations with AWS S3, Google Cloud Storage, or Snowflake matter',
    'The Boost on-demand labeling service (via the Alignerr community) fits your scale-up needs',
  ],
  tldrRightPoints: [
    'You need already-structured private markets data — companies, funds, deals, LPs',
    'You want to buy or sell finished datasets, not build an annotation pipeline',
    'You want every seller KYC-verified and every transaction escrow-protected',
    'You also want Intelligence and Capital Readiness in the same account',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Data curation, annotation, and model evaluation platform', verdict: 'win' }, labelnest: { text: 'Marketplace for finished private-markets datasets', verdict: 'win' } },
    { feature: 'Free tier', competitor: { text: '5 users, 5,000 labeled rows, 500 LBUs/month free', verdict: 'win' }, labelnest: { text: 'Free to browse listings', verdict: 'win' } },
    { feature: 'Pricing model', competitor: { text: 'Usage-based, $0.10/LBU, custom enterprise pricing available', verdict: 'mid' }, labelnest: { text: 'Free to browse; sellers pay for an active listing, buyers pay per project via credits', verdict: 'win' } },
    { feature: 'Seller verification', competitor: { text: 'Not applicable — Labelbox is annotation tooling, not a marketplace of sellers', verdict: 'mid' }, labelnest: { text: 'KYC required before a seller can list', verdict: 'win' } },
    { feature: 'Escrow on transactions', competitor: { text: 'Not applicable — subscription/usage-based tooling, not a peer marketplace', verdict: 'mid' }, labelnest: { text: 'Escrow-protected transactions', verdict: 'win' } },
    { feature: 'Cloud storage integrations', competitor: { text: 'Native AWS S3, Google Cloud Storage, Snowflake integrations', verdict: 'win' }, labelnest: { text: 'Not a data-pipeline tool', verdict: 'no' } },
    { feature: 'Bundled intelligence layer', competitor: { text: 'Not offered — annotation tooling only', verdict: 'no' }, labelnest: { text: 'Intelligence module in the same account', verdict: 'win' } },
    { feature: 'India private markets focus', competitor: { text: 'Not applicable — different category entirely', verdict: 'no' }, labelnest: { text: 'Deep India, SE Asia, Gulf coverage', verdict: 'win' } },
  ],
  calloutTitle: 'What Labelbox does better than us — honestly.',
  calloutBody: 'If you landed here searching for an "AI data marketplace" or annotation platform, Labelbox is likely the category you actually need — genuinely strong tooling for curating, labeling, and evaluating training data, with real cloud-pipeline integrations. NestLens Exchange doesn\'t do any of that; it trades finished datasets, not annotation infrastructure.',
  extra: {
    tag: 'Different categories, same search intent',
    heading: 'Annotation tooling vs. trading finished datasets.',
    body: 'Both "Labelbox" and "NestLens Exchange" show up under "data marketplace" and "AI data marketplace" searches, but they solve different problems. Labelbox helps ML teams curate, label, and evaluate training data. NestLens Exchange helps you buy or sell already-structured, verified private markets datasets. If your need is the former, Labelbox is the right tool — not Exchange.',
  },
  finalTag: 'Built for one category, done properly',
  finalHeading: 'Private markets data, KYC-verified, escrow-protected.',
  finalBody: 'Browse Exchange listings free. Buy per project with credits — no subscription needed.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Browse Exchange ↗', external: true },
  finalSecondaryCta: { href: '/vs/scale-ai', label: 'Also see: vs Scale AI →' },
}

export default function VsLabelboxPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/labelbox' }, { name: 'Labelbox', path: '/vs/labelbox' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
