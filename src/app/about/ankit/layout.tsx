import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ankit Suman — Founder, LabelNest',
  description:
    'Ankit Suman founded LabelNest after a decade in data, operations, quality, and governance. Engineer by education, practitioner by necessity.',
}

export default function AnkitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
