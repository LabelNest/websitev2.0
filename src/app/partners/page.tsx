import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import PartnersClient from './PartnersClient'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/partners', {
    title: 'LabelNest Partner Network — refer customers and earn on every payment',
    description: 'Individuals and institutions who work with startups, funds and investors can partner with LabelNest. Share your link or register a lead, and earn on every invoice your customer pays.',
  })
}

export default function PartnersPage() {
  return <PartnersClient />
}
