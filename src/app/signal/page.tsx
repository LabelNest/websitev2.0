import { Metadata } from 'next'
import SignalClient from './SignalClient'

// noindex: this is a waitlist page for an unannounced product — it
// shouldn't compete with real product pages for search ranking.
export const metadata: Metadata = {
  title: 'Something Is Being Built — LabelNest Signal',
  description: 'Something new is being built for private markets. Get on the list to know first.',
  robots: { index: false, follow: true },
}

export default function SignalPage() {
  return <SignalClient />
}
