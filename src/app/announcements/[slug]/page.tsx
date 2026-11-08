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
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <Link href="/announcements" style={{ fontSize: 13.5, color: 'var(--text3)', textDecoration: 'none' }}>← All announcements</Link>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', margin: '22px 0 12px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#9A4B1F' }}>{a.tag}</span>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>{formatDate(a.date)} · {a.readTime}</span>
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px,4.2vw,44px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--text)', margin: '0 0 18px' }}>
              {a.title}
            </h1>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: '18px 0 22px', borderBottom: '1px solid var(--border)' }}>
              <CopyLink text={url} label="Copy link" copiedLabel="Link copied" />
              <CopyLink text={a.social} label="Copy as LinkedIn post" copiedLabel="Post text copied" variant="ghost" />
            </div>

            {a.body.map((b, i) => {
              if (b.t === 'h2') return <h2 key={i} style={h2}>{b.text}</h2>
              if (b.t === 'h3') return <h3 key={i} style={h3}>{b.text}</h3>
              if (b.t === 'p') return <p key={i} style={p}>{b.text}</p>
              if (b.t === 'lead') return <p key={i} style={{ ...p, fontSize: 20, lineHeight: 1.65, color: 'var(--text)', margin: '26px 0 22px' }}>{b.text}</p>
              if (b.t === 'facts') {
                return (
                  <dl key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 12, margin: '0 0 8px' }}>
                    {b.items.map((f) => (
                      <div key={f.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--brass-line)', borderRadius: 12, padding: '14px 16px' }}>
                        <dt style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>{f.label}</dt>
                        <dd style={{ margin: 0, fontWeight: 600, fontSize: 14.5, lineHeight: 1.4, color: 'var(--text)' }}>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                )
              }
              if (b.t === 'cards') {
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 14, margin: '8px 0 22px' }}>
                    {b.items.map((c) => (
                      <section key={c.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 22px' }}>
                        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '-.01em', color: 'var(--text)', margin: '0 0 4px' }}>{c.title}</h3>
                        {c.text && <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text3)', margin: '0 0 10px' }}>{c.text}</p>}
                        {c.bullets && (
                          <ul style={{ margin: '10px 0 0', paddingLeft: 18, display: 'grid', gap: 6, fontSize: 14, lineHeight: 1.55, color: 'var(--text2)' }}>
                            {c.bullets.map((x) => <li key={x}>{x}</li>)}
                          </ul>
                        )}
                      </section>
                    ))}
                  </div>
                )
              }
              if (b.t === 'steps') {
                return (
                  <ol key={i} style={{ listStyle: 'none', margin: '8px 0 22px', padding: 0, display: 'grid', gap: 0 }}>
                    {b.items.map((st, n) => (
                      <li key={st.label} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 16, paddingBottom: n === b.items.length - 1 ? 0 : 22 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--text)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>{n + 1}</span>
                          {n < b.items.length - 1 && <span style={{ flex: 1, width: 2, background: 'var(--border)', marginTop: 6 }} />}
                        </div>
                        <div>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: '#9A4B1F', marginBottom: 4 }}>{st.label}</div>
                          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 18, color: 'var(--text)', margin: '0 0 8px' }}>{st.title}</h3>
                          <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 5, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text2)' }}>
                            {st.bullets.map((x) => <li key={x}>{x}</li>)}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ol>
                )
              }
              if (b.t === 'compare') {
                const col = (c: { title: string; bullets: string[] }, strong: boolean) => (
                  <section style={{ background: 'var(--surface)', border: strong ? '1px solid var(--brass-line)' : '1px solid var(--border)', borderTop: strong ? '3px solid var(--brass-line)' : '3px solid var(--border)', borderRadius: 14, padding: '20px 22px' }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)', margin: '0 0 10px' }}>{c.title}</h3>
                    <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 7, fontSize: 14, lineHeight: 1.55, color: strong ? 'var(--text)' : 'var(--text2)' }}>
                      {c.bullets.map((x) => <li key={x}>{x}</li>)}
                    </ul>
                  </section>
                )
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, margin: '8px 0 24px' }}>
                    {col(b.left, false)}
                    {col(b.right, true)}
                  </div>
                )
              }
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
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
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
