import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getBriefingBySlug, getBriefings, Briefing } from '@/lib/db'
import BriefingView from './BriefingView'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const briefing = await getBriefingBySlug(slug).catch(() => null)
  if (!briefing) return { title: 'Briefing — LabelNest' }
  return {
    title: `${briefing.title} — LabelNest Briefings`,
    description: briefing.summary,
  }
}

export default async function BriefingPage({ params }: Props) {
  const { slug } = await params
  const [briefing, allBriefings] = await Promise.all([
    getBriefingBySlug(slug).catch(() => null),
    getBriefings().catch(() => [] as Briefing[]),
  ])
  if (!briefing) notFound()
  const related = allBriefings.filter(b => b.slug !== slug).slice(0, 3)
  return <BriefingView briefing={briefing} related={related} />
}
