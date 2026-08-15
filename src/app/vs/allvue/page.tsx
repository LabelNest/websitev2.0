import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/allvue', {
    title: 'NestLens Capital Readiness vs Allvue Systems — Fund Accounting vs Fundraise Readiness',
    description: 'How NestLens Capital Readiness compares to Allvue Systems — fund accounting, portfolio management, and investor reporting infrastructure vs a fundraise-ready data room and LP-GP matching.',
  })
}

const DATA: VsPageData = {
  slug: 'allvue',
  category: 'fund-data-room',
  competitorName: 'Allvue Systems',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs Allvue Systems: Fund Accounting vs Fundraise Readiness',
  subhead: 'Allvue Systems is fund accounting, portfolio management, and investor reporting infrastructure for private equity, credit, and real estate — custom-quoted by firm size and modules. Capital Readiness solves an earlier problem: getting raise-ready and matched to LPs before that operating infrastructure is even relevant.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Allvue runs the fund\'s books. Capital Readiness gets you funded.',
  tldrLeftLabel: 'Pick Allvue if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You already operate a fund and need fund accounting and investment accounting',
    'Portfolio monitoring, risk analytics, and compliance tracking across a real book matter',
    'You need an investor portal for LPs you already have committed',
    'You can absorb custom, firm-size-based pricing plus implementation and data-migration costs',
  ],
  tldrRightPoints: [
    'You are an emerging manager still raising your fund, not yet operating one',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not fund accounting for capital you don\'t have yet',
    'You are an Indian or emerging market fund manager',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Fund accounting, portfolio management, investor reporting', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Not offered — assumes capital is already raised', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, structured for the raise', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Fund accounting / investment accounting', competitor: { text: 'Full general ledger, budgeting, compliance tracking', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Investor portal / reporting', competitor: { text: 'Included for existing LP relationships', verdict: 'win' }, labelnest: { text: 'Not a post-close reporting tool — pre-raise focused', verdict: 'no' } },
    { feature: 'Pricing', competitor: { text: 'Custom-quoted by firm size, asset class, and modules; no free plan', verdict: 'no' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
  ],
  calloutTitle: 'What Allvue does better than us — honestly.',
  calloutBody: 'Allvue\'s fund accounting and portfolio-management infrastructure — general ledger, compliance tracking, risk analytics — is genuinely built for firms already operating across private equity, credit, and real estate at scale. Capital Readiness doesn\'t do any of that. If you\'re already running a fund and need accounting infrastructure, that\'s Allvue\'s job.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Running the fund\'s books vs. raising the fund.',
    body: 'Allvue\'s assumption: firms operating a fund need accounting and reporting infrastructure across the investment lifecycle. Capital Readiness\'s assumption: emerging managers need to get raise-ready and matched to LPs before that operating infrastructure is relevant. Use Capital Readiness to raise, Allvue (or a similar fund-accounting platform) once you\'re running the fund.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market fund managers.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/efront', label: 'Also see: vs eFront →' },
}

export default function VsAllvuePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/allvue' }, { name: 'Allvue Systems', path: '/vs/allvue' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
