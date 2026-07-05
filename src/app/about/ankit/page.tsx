import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import FounderClient from './FounderClient'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about/ankit', {
    title: 'Ankit Suman — Founder, LabelNest | Ex-BlackRock, Preqin',
    description: 'Founder of LabelNest. 9 years in private markets data at Preqin, BlackRock, Microsoft. Building the data infrastructure for emerging managers globally.',
  })
}

// Facts verified against the page's own bio content (not guessed) —
// LinkedIn handle, employer list, and university all match what's stated
// in FounderClient.
const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ankit Suman',
  jobTitle: 'Founder and Director',
  worksFor: { '@type': 'Organization', name: 'LabelNest India Private Limited' },
  url: 'https://labelnest.in/about/ankit',
  sameAs: ['https://www.linkedin.com/in/ankit-kumar-suman-29159b146/'],
  alumniOf: [{ '@type': 'EducationalOrganization', name: 'MAKAUT (formerly WBUT), West Bengal' }],
  knowsAbout: ['Private Markets Data', 'Data Quality Management', 'Data Operations', 'Fund Intelligence', 'Alternative Data'],
}

export default function FounderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }} />
      <FounderClient />
    </>
  )
}
