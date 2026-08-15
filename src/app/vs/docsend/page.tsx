import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/docsend', {
    title: 'NestLens Capital Readiness vs DocSend — Data Room Comparison',
    description: 'How NestLens Capital Readiness compares to DocSend for fundraise data rooms — investor scoring, LP-GP matching, and pricing.',
  })
}

const DATA: VsPageData = {
  slug: 'docsend',
  category: 'capital-readiness',
  competitorName: 'DocSend',
  ourName: 'Capital Readiness',
  h1: 'Capital Readiness vs DocSend: Which One Actually Helps You Raise?',
  subhead: 'DocSend is a file-sharing tool. Capital Readiness is a structured fundraising system. They solve related but different problems. Here is when to use which.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'DocSend shares files. Capital Readiness builds fundraise-ready structure.',
  tldrLeftLabel: 'Pick DocSend if',
  tldrLeftPoints: [
    'You already have all your fundraise docs finished',
    'You need per-recipient access tracking and analytics',
    'You share sensitive files beyond just fundraise (M&A, legal)',
    'Dropbox-owned brand recognition matters',
  ],
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrRightPoints: [
    'You are figuring out what your data room should even contain',
    'You want scoring against angel, seed VC, and institutional tiers',
    'You need LP-GP matching, not just document sharing',
    'You want grant and competition discovery in the same tool',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'Secure file sharing with analytics', verdict: 'mid' }, labelnest: { text: 'Structured fundraise readiness system', verdict: 'win' } },
    { feature: 'Data room checklist', competitor: { text: 'Generic file structure, no checklist', verdict: 'no' }, labelnest: { text: '10 sections, 51 items, pre-defined', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included in the module', verdict: 'win' } },
    { feature: 'Per-recipient access tracking', competitor: { text: 'Deep tracking, page-by-page', verdict: 'win' }, labelnest: { text: 'Basic tracking, expanding', verdict: 'mid' } },
    { feature: 'Watermarking and NDA gating', competitor: { text: 'Robust', verdict: 'win' }, labelnest: { text: 'Basic', verdict: 'mid' } },
    { feature: 'Pricing', competitor: { text: '$15-$150+ per user per month', verdict: 'mid' }, labelnest: { text: 'Credit-based, no seat penalties', verdict: 'win' } },
    { feature: 'Free tier', competitor: { text: 'Yes, limited', verdict: 'win' }, labelnest: { text: 'Yes, full data room build', verdict: 'win' } },
    { feature: 'India-specific fundraise context', competitor: { text: 'None', verdict: 'no' }, labelnest: { text: 'Deep — Indian investor tiers, INR pricing', verdict: 'win' } },
    { feature: 'Post-deal use case', competitor: { text: 'Any secure sharing', verdict: 'win' }, labelnest: { text: 'Fundraise-focused', verdict: 'mid' } },
  ],
  calloutTitle: 'What DocSend does better than us — honestly.',
  calloutBody: 'DocSend has best-in-class recipient analytics — page-by-page tracking, time spent per slide, per-viewer engagement scoring. If you already have your deck and want to know exactly how investors are engaging with it, DocSend is the right choice. Capital Readiness solves the earlier problem: building the data room in the first place.',
  extra: {
    tag: 'Better together?',
    heading: 'Use both — for different jobs.',
    body: 'Most founders end up using both tools. Capital Readiness for building the fundraise structure and matching to investors. DocSend for tracking exactly who is opening what once the data room is ready. Different jobs, different tools.',
  },
  finalTag: 'Start with the structure',
  finalHeading: 'Build your data room today. 10 sections. 51 items.',
  finalBody: 'Free to start. Investor tier scoring included.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/nestlens/capital', label: 'Learn more first' },
}

export default function VsDocsendPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/docsend' }, { name: 'DocSend', path: '/vs/docsend' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
