import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { ICP_PAGES } from '@/lib/icpPages'
import IcpPageLayout from '@/components/IcpPageLayout'

const DATA = ICP_PAGES.partner

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/who-we-serve/partner', { title: DATA.metaTitle, description: DATA.metaDesc })
}

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'Who We Serve', path: '/who-we-serve' },
  { name: 'Ecosystem Partner (SP)', path: '/who-we-serve/partner' },
])

export default function PartnerIcpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <IcpPageLayout {...DATA} />
    </>
  )
}
