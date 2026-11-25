import { Metadata } from 'next'
import ReportsClient from './ReportsClient'

export const metadata: Metadata = {
  title: 'LabelNest Research Reports — Subscribe',
  description: 'Data-led reports on India\'s private-capital ecosystem, built from the LabelNest Atlas. Get each new volume when it is published.',
}

// Volume 3 goes live on this date (the Observatory scheduler publishes it). From then on the page links to it instead of announcing it.
const VOL3_LIVE_AT = Date.parse('2026-12-06T04:30:00Z')
export const revalidate = 900

const vol3IsLive = () => Date.now() >= VOL3_LIVE_AT

export default function ReportsPage() {
  return <ReportsClient vol3Live={vol3IsLive()} />
}
