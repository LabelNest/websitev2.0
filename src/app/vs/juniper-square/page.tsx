import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/juniper-square', {
    title: 'NestLens Capital Readiness vs Juniper Square — Fund Administration vs Fundraise Readiness',
    description: 'How NestLens Capital Readiness compares to Juniper Square — full fund administration and LP portal software vs a fundraise-ready data room and LP-GP matching for emerging managers.',
  })
}

const DATA: VsPageData = {
  slug: 'juniper-square',
  category: 'fund-data-room',
  competitorName: 'Juniper Square',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs Juniper Square: Fund Administration vs Fundraise Readiness',
  subhead: 'Juniper Square is full fund administration and LP-portal software — investor CRM, capital activity, reporting — quote-only, starting around $18,000/year. Capital Readiness solves an earlier problem: building a fundraise-ready data room and getting matched to the right LPs before a fund is administered day to day.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Juniper Square runs the fund. Capital Readiness gets you funded.',
  tldrLeftLabel: 'Pick Juniper Square if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You already have a fund and need investor CRM, onboarding, and capital-activity automation',
    'You need managed fund administration — AML/KYC, side letters, waterfalls, distributions',
    'You have $18,000+/year budget for fund-admin software plus usage-based add-on fees',
    'A unified LP portal for existing investors is your core need',
  ],
  tldrRightPoints: [
    'You are an emerging manager still raising your fund, not yet administering one',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not investor CRM for LPs you already have',
    'You are an Indian or emerging market fund manager',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Fund administration, investor CRM, LP portal', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Investor portal add-on, not a fundraise-readiness data room', verdict: 'mid' }, labelnest: { text: '10 sections, 51 items, structured for the raise', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered — assumes LPs are already committed', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Fund administration', competitor: { text: 'Managed service: AML/KYC, side letters, waterfalls, distributions', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Investor CRM', competitor: { text: 'Full CRM for existing LP relationships', verdict: 'win' }, labelnest: { text: 'Not a post-close CRM — pre-raise matching focused', verdict: 'no' } },
    { feature: 'Pricing', competitor: { text: 'Quote-only, starting ~$18,000/year plus usage-based fees', verdict: 'no' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
  ],
  calloutTitle: 'What Juniper Square does better than us — honestly.',
  calloutBody: 'Juniper Square\'s fund administration and investor CRM are genuinely comprehensive — AML/KYC, side letters, automated capital activity, and a real LP portal for managing relationships after commitments close. Capital Readiness doesn\'t administer funds at all. If you\'re already running a fund with LPs to manage, that\'s Juniper Square\'s job, not ours.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'Running the fund vs. raising it.',
    body: "Juniper Square's assumption: GPs need software to administer a fund and manage LP relationships once capital is committed. Capital Readiness's assumption: emerging managers need to look investor-ready and get matched to the right LPs before that administration layer is even relevant. Use Capital Readiness to raise, Juniper Square (or a similar fund-admin platform) once you're running the fund.",
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market fund managers.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/dynamo', label: 'Also see: vs Dynamo Software →' },
}

export default function VsJuniperSquarePage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/juniper-square' }, { name: 'Juniper Square', path: '/vs/juniper-square' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
