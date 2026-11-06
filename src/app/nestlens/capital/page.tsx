import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import PlanSection from '@/components/PlanSection'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/capital', {
    title: 'Ascent — startup data room with readiness score, controlled sharing and deal flow',
    description: 'One structured data room per company with a readiness score, document reading, email-gated and watermarked sharing, and deal flow for programme admins. 30 days free.',
  })
}

export default function AscentPage() {
  return (
    <ProductDetail
      id="ascent" name="Ascent" path="/nestlens/capital" schemaType="SoftwareApplication"
      primary={{ label: 'Open Ascent', href: 'https://ascent.labelnest.in', external: true }}
      secondary={{ label: 'See pricing', href: '/nestlens/pricing#ascent' }}
    >
      <PlanSection module="ascent" />
    </ProductDetail>
  )
}
