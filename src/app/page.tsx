import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/', {
    title: 'LabelNest — Private Markets Data, Exchange, and Data Rooms',
    description: 'Private markets intelligence, data marketplace, and investor data rooms for emerging managers. 40,000+ entities, verified contacts, KYC-verified data sellers. Built in India.',
  })
}

export { default } from './HomepageClient'
