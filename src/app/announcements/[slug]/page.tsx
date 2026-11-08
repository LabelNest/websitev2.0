import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CopyLink from '@/components/CopyLink'
import { pageMetadata } from '@/lib/seo'
import { ANNOUNCEMENTS, SITE_URL, announcementUrl, formatDate, getAnnouncement } from '@/lib/announcements'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ANNOUNCEMENTS.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const a = getAnnouncement(slug)
  if (!a) return { title: 'Announcement — LabelNest' }
  const base = await pageMetadata(`/announcements/${slug}`, {
    title: `${a.title} — LabelNest`,
    description: a.summary,
  })
  return { ...base, openGraph: { ...base.openGraph, type: 'article', publishedTime: a.date } }
}

export default async function AnnouncementPage({ params }: Props) {
  const { slug } = await params
  const a = getAnnouncement(slug)
  if (!a) notFound()
  const url = announcementUrl(a.slug)
  const others = ANNOUNCEMENTS.filter((x) => x.slug !== a.slug).slice(0, 3)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: a.title,
    description: a.summary,
    datePublished: a.date,
    publisher: {
      '@type': 'Organization',
      name: 'LabelNest India Private Limited',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-default.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  const h2 = { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: '-.02em', lineHeight: 1.2, color: 'var(--text)', margin: '48px 0 14px' } as const
  const h3 = { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-.01em', color: 'var(--text)', margin: '28px 0 10px' } as const
  const p = { fontSize: 16.5, lineHeight: 1.78, color: 'var(--text2)', margin: '0 0 16px' } as const

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <article style={{ padding: '56px 28px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <Link href="/announcements" style={{ fontSize: 13.5, color: 'var(--text3)', textDecoration: 'none' }}>← All announcements</Link>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', margin: '22px 0 12px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#9A4B1F' }}>{a.tag}</span>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>{formatDate(a.date)} · {a.readTime}</span>
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px,4.2vw,44px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--text)', margin: '0 0 18px' }}>
              {a.title}
            </h1>
            <p style={{ ...p, fontSize: 18, color: 'var(--text)' }}>{a.summary}</p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: '18px 0 22px', borderBottom: '1px solid var(--border)' }}>
              <CopyLink text={url} label="Copy link" copiedLabel="Link copied" />
              <CopyLink text={a.social} label="Copy as LinkedIn post" copiedLabel="Post text copied" variant="ghost" />
            </div>

            {a.body.map((b, i) => {
              if (b.t === 'h2') return <h2 key={i} style={h2}>{b.text}</h2>
              if (b.t === 'h3') return <h3 key={i} style={h3}>{b.text}</h3>
              if (b.t === 'p') return <p key={i} style={p}>{b.text}</p>
              if (b.t === 'note') {
                return (
                  <aside key={i} style={{ margin: '24px 0', padding: '16px 20px', borderLeft: '3px solid var(--brass-line)', background: 'var(--surface)', borderRadius: '0 10px 10px 0', fontSize: 14.5, lineHeight: 1.7, color: 'var(--text2)' }}>
                    {b.text}
                  </aside>
                )
              }
              return (
                <ul key={i} style={{ ...p, paddingLeft: 22, margin: '0 0 18px', display: 'grid', gap: 6 }}>
                  {b.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              )
            })}

            <div style={{ marginTop: 48, padding: '24px 26px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 }}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: 'var(--text)', marginBottom: 6 }}>Want to build with LabelNest?</div>
              <p style={{ ...p, margin: '0 0 14px' }}>We work with partners who bring a sector and a market. We bring the technology, product and growth.</p>
              <Link href="/partner-with-us" style={{ font: '600 13.5px var(--font-sans),system-ui,sans-serif', padding: '10px 16px', borderRadius: 8, background: 'var(--text)', color: 'var(--bg)', textDecoration: 'none', display: 'inline-block' }}>
                Partner with us
              </Link>
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section style={{ padding: '24px 28px 80px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', margin: '24px 0 12px' }}>More announcements</div>
              {others.map((o) => (
                <Link key={o.slug} href={`/announcements/${o.slug}`} style={{ display: 'block', padding: '14px 0', borderBottom: '1px solid var(--border)', color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>
                  {o.title} <span style={{ fontWeight: 400, color: 'var(--text3)', fontSize: 13 }}>· {formatDate(o.date)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        {others.length === 0 && <div style={{ height: 64 }} />}
      </main>
      <Footer />
    </>
  )
}
