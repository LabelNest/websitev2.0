import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import CareersClient from './CareersClient'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/careers', {
    title: "Careers at LabelNest — Join the Team Building India's Data Infrastructure",
    description: 'Open roles at LabelNest. Data analysts, engineers, sales, and BD across NestLens, NestHR, and managed services. Built by people with the right potential, not the right degree.',
  })
}

export default function CareersPage() {
  return <CareersClient />
}
