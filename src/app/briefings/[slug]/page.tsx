import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getBriefingBySlug, getBriefings, getPageSEO, Briefing } from '@/lib/db'
import BriefingView from './BriefingView'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const briefing = await getBriefingBySlug(slug).catch(() => null)
  if (!briefing) return { title: 'Briefing — LabelNest' }

  // A search-optimised title/keywords can be set per-briefing via
  // website_page_seo (page_path = /briefings/{slug}) without touching the
  // briefing's own title — that stays the creative H1 shown in the article.
  const seo = await getPageSEO(`/briefings/${slug}`).catch(() => null)
  const title = seo?.title?.trim() || `${briefing.title} — LabelNest Briefings`
  const description = seo?.description?.trim() || briefing.summary
  const keywords = seo?.keywords?.trim() ? seo.keywords.split(',').map(k => k.trim()).filter(Boolean) : undefined
  const image = seo?.og_image?.trim() || briefing.cover_image || briefing.hero_image || undefined

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/briefings/${slug}` },
    openGraph: {
      title,
      description,
      url: `/briefings/${slug}`,
      type: 'article',
      publishedTime: briefing.date,
      authors: [briefing.author_name],
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: briefing.title,
    description: briefing.summary,
    image: briefing.cover_image || briefing.hero_image || undefined,
    datePublished: briefing.date,
    author: { '@type': 'Person', name: briefing.author_name },
    publisher: {
      '@type': 'Organization',
      name: 'LabelNest India Private Limited',
      logo: { '@type': 'ImageObject', url: 'https://labelnest.in/og-default.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://labelnest.in/briefings/${slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BriefingView briefing={briefing} related={related} />
    </>
  )
}
