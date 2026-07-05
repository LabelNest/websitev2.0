// Full admin panel — wiring the HTML into React components
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — LabelNest',
  robots: { index: false, follow: false },
}

export { default } from './AdminClient'
