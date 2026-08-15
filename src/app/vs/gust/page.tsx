import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/gust', {
    title: 'Gust Alternatives for Startups — NestLens Capital Readiness vs Gust',
    description: 'Looking for a Gust alternative? How NestLens Capital Readiness compares for building an investor-ready data room and getting matched to LPs, not just formation and cap table setup.',
  })
}

const DATA: VsPageData = {
  slug: 'gust',
  category: 'capital-readiness',
  competitorName: 'Gust',
  ourName: 'Capital Readiness',
  h1: 'Gust Alternatives for Startups: Capital Readiness vs Gust',
  subhead: 'Gust Launch handles company formation and cap table setup — from $450/year, up to $3,500/year for option issuance and 409A valuations, no free trial. Capital Readiness is a different tool: building the fundraise-ready data room and getting matched to investors.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Gust handles formation. Capital Readiness handles readiness.',
  tldrLeftLabel: 'Pick Gust if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You need company incorporation, a registered agent, and a static cap table',
    'You need to model a funding round, issue a SAFE, or sign a convertible note',
    'Option issuance and 409A valuations on the Raise plan fit your needs',
    'You have $450-$3,500/year budget with no free trial',
  ],
  tldrRightPoints: [
    'Formation is already done — you need to get raise-ready and matched to investors',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not cap table or SAFE administration',
    'You are an Indian or emerging market founder',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Company formation, cap table, SAFE/option administration', verdict: 'win' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, structured', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Company formation / registered agent', competitor: { text: 'Included on Start plan ($450/year)', verdict: 'win' }, labelnest: { text: 'Not offered — assumes you\'re already formed', verdict: 'no' } },
    { feature: 'SAFE / convertible note issuance', competitor: { text: 'Included on Accelerate plan ($1,250/year)', verdict: 'win' }, labelnest: { text: 'Not offered', verdict: 'no' } },
    { feature: 'Free trial', competitor: { text: 'None', verdict: 'no' }, labelnest: { text: 'Free to start', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
  ],
  calloutTitle: 'What Gust does better than us — honestly.',
  calloutBody: 'Gust Launch\'s formation-through-fundraise tooling — incorporation, SAFE issuance, option administration — covers legal and cap table mechanics Capital Readiness doesn\'t touch. If you need those mechanics handled alongside your raise, Gust is built for that.',
  extra: {
    tag: 'Better together?',
    heading: 'Different layers of the same fundraise.',
    body: 'Gust handles the legal and equity mechanics of forming and raising. Capital Readiness handles the readiness and matching layer — the data room and investor-fit scoring that gets you to a term sheet. Many founders will use tools like Gust for mechanics and Capital Readiness for readiness and matching.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/pulley', label: 'Also see: vs Pulley →' },
}

export default function VsGustPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/gust' }, { name: 'Gust', path: '/vs/gust' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
