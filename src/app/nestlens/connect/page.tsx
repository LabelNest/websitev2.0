import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/connect', {
    title: 'Connect — fund theses, mentors and audit partners, with founder consent first',
    description: 'Funds publish a thesis, founders request mentors and audits from inside their data room, and contact details stay hidden until the founder agrees. Included with Ascent and Command.',
  })
}

export default function ConnectPage() {
  return (
    <ProductDetail
      id="connect" name="Connect" path="/nestlens/connect" schemaType="SoftwareApplication"
      primary={{ label: 'Open Connect', href: 'https://connect.labelnest.in', external: true }}
      secondary={{ label: 'Become a mentor', href: 'https://nestlens.labelnest.in/mentors/apply' }}
    >
    </ProductDetail>
  )
}
