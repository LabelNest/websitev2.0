import { Metadata } from 'next'
import ReportsClient from './ReportsClient'

export const metadata: Metadata = {
  title: 'LabelNest Research Reports — Subscribe',
  description: 'Data-led reports on India\'s private-capital ecosystem, built from the LabelNest Atlas. Get each new volume when it is published.',
}

export default function ReportsPage() {
  return <ReportsClient />
}
