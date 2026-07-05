import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import ContactClient from './ContactClient'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/contact', {
    title: 'Contact LabelNest — Talk to Our Team',
    description: 'Contact LabelNest for private markets intelligence, data marketplace access, capital readiness, or managed services. Team responds within one working day.',
  })
}

export default function ContactPage() {
  return <ContactClient />
}
