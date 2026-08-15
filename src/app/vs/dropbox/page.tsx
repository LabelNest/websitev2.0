import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import VsPageLayout, { VsPageData } from '@/components/VsPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/vs/dropbox', {
    title: 'Dropbox Alternatives for Fundraising — NestLens Capital Readiness vs Dropbox',
    description: 'Looking for a Dropbox alternative for your fundraise data room? How NestLens Capital Readiness compares — a structured, investor-scored data room vs general file storage.',
  })
}

const DATA: VsPageData = {
  slug: 'dropbox',
  category: 'capital-readiness',
  competitorName: 'Dropbox',
  ourName: 'Capital Readiness',
  h1: 'Dropbox Alternatives for Fundraising: Capital Readiness vs Dropbox',
  subhead: 'Dropbox Business ($15-$30/user/month) added data-room-style features — access requests, NDA gating, branded portals — on top of general file storage. Capital Readiness is a data room built for fundraising specifically, with investor tier scoring and LP-GP matching Dropbox doesn\'t offer.',
  primaryCta: { href: '/nestlens/capital', label: 'Explore Capital Readiness →' },
  secondaryCta: { href: '/contact', label: 'Talk to a real person' },
  tldrHeading: 'Dropbox is general storage with data-room features bolted on. Capital Readiness is built for the raise.',
  tldrLeftLabel: 'Pick Dropbox if',
  tldrRightLabel: 'Pick Capital Readiness if',
  tldrLeftPoints: [
    'You already use Dropbox for general team file storage and want to reuse it for a data room',
    'NDA-gating and a branded document portal are enough structure for your needs',
    'You need 9-15 TB of general-purpose shared storage, not just fundraise documents',
    'A minimum of 3 users on every paid plan works for your team size',
  ],
  tldrRightPoints: [
    'You want a data room structured specifically for fundraising, not general storage repurposed',
    'You need investor tier scoring against angel to institutional',
    'You want LP-GP matching, not just document access control',
    'You are an Indian or emerging market founder',
  ],
  tableRows: [
    { feature: 'Primary purpose', competitor: { text: 'General-purpose cloud file storage and sync', verdict: 'mid' }, labelnest: { text: 'Fundraise readiness and investor matching', verdict: 'win' } },
    { feature: 'Fundraise data room structure', competitor: { text: 'Generic folders with access requests and NDA gating, not fundraise-specific', verdict: 'mid' }, labelnest: { text: '10 sections, 51 items, purpose-built for fundraising', verdict: 'win' } },
    { feature: 'Investor tier scoring', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Angel, Accelerator, Seed VC, Institutional', verdict: 'win' } },
    { feature: 'LP-GP matching', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Live matching engine', verdict: 'win' } },
    { feature: 'General file storage', competitor: { text: '9-15 TB shared storage depending on plan', verdict: 'win' }, labelnest: { text: 'Not a general storage tool — fundraise-document focused', verdict: 'no' } },
    { feature: 'Pricing', competitor: { text: '$15-$30/user/month, 3-user minimum on paid plans', verdict: 'mid' }, labelnest: { text: 'Credit-based, INR-friendly', verdict: 'win' } },
    { feature: 'India-specific structures', competitor: { text: 'Not a specialization', verdict: 'no' }, labelnest: { text: 'Native Indian founder context', verdict: 'win' } },
    { feature: 'Grant and competition discovery', competitor: { text: 'Not offered', verdict: 'no' }, labelnest: { text: 'Included', verdict: 'win' } },
  ],
  calloutTitle: 'What Dropbox does better than us — honestly.',
  calloutBody: 'Dropbox is a mature, general-purpose storage platform your whole team already knows how to use, with genuinely useful access-request and NDA-gating features layered on for sharing sensitive documents. If you just need secure file sharing and already run on Dropbox, repurposing it is a reasonable low-effort choice — it\'s just not built specifically for what an investor expects from a fundraise data room.',
  extra: {
    tag: 'The philosophical difference',
    heading: 'General storage repurposed vs. a data room built for the raise.',
    body: 'Dropbox\'s assumption: one storage platform can be adapted to almost any sharing need, including fundraising, with the right folder structure and permissions. Capital Readiness\'s assumption: a fundraise data room should be structured the way investors actually evaluate a company — sections, completeness signals, and investor-fit scoring — not a generic folder tree.',
  },
  finalTag: 'Start where you are',
  finalHeading: 'Not raised yet? Build your data room first.',
  finalBody: 'Free to start. Investor tier scoring included. Built for Indian and emerging market founders.',
  finalPrimaryCta: { href: 'https://nestlens.labelnest.in', label: 'Open Capital Readiness ↗', external: true },
  finalSecondaryCta: { href: '/vs/google-drive', label: 'Also see: vs Google Drive →' },
}

export default function VsDropboxPage() {
  const schema = breadcrumbSchema([{ name: 'Compare', path: '/vs/dropbox' }, { name: 'Dropbox', path: '/vs/dropbox' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VsPageLayout {...DATA} />
    </>
  )
}
