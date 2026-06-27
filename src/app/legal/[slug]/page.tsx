import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLegalDocBySlug } from '@/lib/db'
import LegalDocView from './LegalDocView'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await getLegalDocBySlug(slug).catch(() => null)
  if (!doc) return { title: 'Legal — LabelNest' }
  return {
    title: `${doc.title} — LabelNest`,
    description: doc.intro,
  }
}

export default async function LegalDocPage({ params }: Props) {
  const { slug } = await params
  const doc = await getLegalDocBySlug(slug).catch(() => null)
  if (!doc) notFound()
  return <LegalDocView doc={doc} />
}
