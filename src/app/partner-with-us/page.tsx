import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import PartnerClient from './PartnerClient'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/partner-with-us', {
    title: 'Partner with LabelNest — Technology, Product & Growth',
    description: 'Bring the sector and the market. LabelNest brings the technology, product engineering, sales execution and channel distribution. Tell us what you want to build.',
  })
}

export default function PartnerWithUsPage() {
  return <PartnerClient />
}
