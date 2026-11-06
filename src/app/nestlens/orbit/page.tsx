import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import PlanSection from '@/components/PlanSection'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/orbit', {
    title: 'Orbit — incubator and accelerator management software with data rooms included',
    description: 'Applications, screening, evaluation rounds, cohorts, mentors, grants and compliance in one place, with grant reports in NIDHI-SSS, DST-TBI, BIRAC and RKVY-RAFTAR formats.',
  })
}

export default function OrbitPage() {
  return (
    <ProductDetail
      id="orbit" name="Orbit" path="/nestlens/orbit" schemaType="SoftwareApplication"
      primary={{ label: 'Open Orbit', href: 'https://orbit.labelnest.in', external: true }}
      secondary={{ label: 'See pricing', href: '/nestlens/pricing#orbit' }}
    >
      <PlanSection module="orbit" />
    </ProductDetail>
  )
}
