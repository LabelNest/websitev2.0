import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getBriefings, getBriefingBySlug } from '@/lib/db'
import { mdToHtml, scopeColor, scopeLabel, authorGradient, slugToEmoji } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const briefings = await getBriefings()
  return briefings.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const b = await getBriefingBySlug(slug)
  if (!b) return {}
  return {
    title: b.title,
    description: b.summary.slice(0, 160),
    openGraph: {
      title: b.title,
      description: b.summary.slice(0, 160),
      type: 'article',
      authors: [b.author_name],
    },
  }
}

export const revalidate = 3600

export default async function BriefingArticle({ params }: Props) {
  const { slug } = await params
  const briefing = await getBriefingBySlug(slug)
  if (!briefing) notFound()

  const allBriefings = await getBriefings()
  const related = allBriefings
    .filter((b) => b.slug !== slug && b.author_name === briefing.author_name)
    .slice(0, 3)

  const bodyHtml = mdToHtml(briefing.content)
  const color = scopeColor(briefing.scope)
  const label = scopeLabel(briefing.scope)
  const avGrad = authorGradient(briefing.author_name)

  return (
    <>
      <Nav />
      {/* Reading progress bar */}
      <div
        id="progress-bar"
        className="fixed top-[60px] left-0 right-0 h-[2px] z-[299]"
        style={{ background: 'var(--border)' }}
      >
        <div
          id="progress-fill"
          className="h-full"
          style={{ width: '0%', background: color, transition: 'width .1s' }}
        />
      </div>

      <main style={{ paddingTop: '60px' }}>
        <div className="max-w-[1160px] mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-14">
          {/* Article */}
          <article>
            <Link
              href="/briefings"
              className="inline-flex items-center gap-1.5 text-[13px] mb-6 transition-colors"
              style={{ color: 'var(--text2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text2)')}
            >
              ← Briefings
            </Link>

            {/* Scope + featured */}
            <div className="mb-4">
              <span
                className="inline-block font-mono text-[10px] tracking-[.12em] uppercase px-3 py-1 rounded-full"
                style={{ background: `${color}18`, color }}
              >
                {label}
              </span>
              {briefing.is_featured && (
                <span
                  className="ml-2 inline-block font-mono text-[9.5px] tracking-[.1em] uppercase px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(249,115,22,.12)', color: 'var(--orange)' }}
                >
                  Featured
                </span>
              )}
            </div>

            <h1
              className="font-display font-extrabold tracking-tight leading-[1.06] mb-5"
              style={{ fontSize: 'clamp(26px,4.2vw,48px)', color: 'var(--text)' }}
            >
              {briefing.title}
            </h1>

            {/* Summary callout */}
            <p
              className="text-[16.5px] leading-[1.74] mb-6 px-5 py-4 rounded-[12px]"
              style={{
                color: 'var(--text2)',
                background: 'var(--bg3)',
                borderLeft: `3px solid ${color}`,
              }}
            >
              {briefing.summary}
            </p>

            {/* Author strip */}
            <div
              className="flex items-center gap-3.5 p-4 rounded-[12px] mb-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-display font-extrabold text-[17px] text-white"
                style={{ background: avGrad }}
              >
                {briefing.author_name[0]}
              </div>
              <div className="flex-1">
                <div className="font-display font-bold text-[14.5px]" style={{ color: 'var(--text)' }}>
                  {briefing.author_name}
                </div>
                <div className="text-[12px]" style={{ color: 'var(--text2)' }}>
                  {briefing.author_role}{briefing.author_department ? ` · ${briefing.author_department}` : ''}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px]" style={{ color: 'var(--text2)' }}>{briefing.date}</div>
                <div className="font-mono text-[10px] tracking-wide mt-0.5" style={{ color: 'var(--text3)' }}>
                  {briefing.read_time}
                </div>
              </div>
            </div>

            {/* Cover image slot */}
            <div
              className="w-full rounded-[16px] mb-10 flex flex-col items-center justify-center gap-2"
              style={{
                aspectRatio: '16/7',
                background: briefing.cover_image ? undefined : 'var(--bg3)',
                border: '1px solid var(--border)',
                backgroundImage: briefing.cover_image ? `url(${briefing.cover_image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!briefing.cover_image && (
                <>
                  <span className="text-[44px] opacity-20">{slugToEmoji(slug)}</span>
                  <span className="font-mono text-[9px] tracking-[.12em] uppercase" style={{ color: 'var(--text3)' }}>
                    Cover image · upload via admin
                  </span>
                </>
              )}
            </div>

            {/* Body */}
            <div
              className="article-body"
              style={{ '--accent': color } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 flex flex-col gap-3.5">
              {/* Share */}
              <div className="rounded-[14px] p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-3" style={{ color: 'var(--text3)' }}>
                  Share
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://labelnest.in/briefings/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] transition-all"
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text2)')}
                  >
                    💼 Share on LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://labelnest.in/briefings/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] transition-all"
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text2)')}
                  >
                    𝕏 Share on X
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="rounded-[14px] p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-2" style={{ color: 'var(--text3)' }}>
                  Operator to Founder
                </div>
                <div className="font-display font-bold text-[14px] mb-1" style={{ color: 'var(--text)' }}>
                  Follow the newsletter
                </div>
                <p className="text-[12px] leading-relaxed mb-3" style={{ color: 'var(--text2)' }}>
                  Building LabelNest from zero. Sharing the journey as it happens.
                </p>
                <a
                  href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center font-semibold text-[13px] py-2.5 rounded-lg text-white transition-opacity hover:opacity-88"
                  style={{ background: 'var(--orange)' }}
                >
                  Follow on LinkedIn ↗
                </a>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="rounded-[14px] p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-3" style={{ color: 'var(--text3)' }}>
                    Related briefings
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/briefings/${r.slug}`}
                        className="flex gap-2.5 items-start p-2.5 rounded-lg transition-all"
                        style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--bord2)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                      >
                        <span className="text-[18px] flex-shrink-0">{slugToEmoji(r.slug)}</span>
                        <div>
                          <div className="font-display font-bold text-[12.5px] leading-[1.3] mb-0.5" style={{ color: 'var(--text)' }}>
                            {r.title.slice(0, 70)}{r.title.length > 70 ? '...' : ''}
                          </div>
                          <div className="text-[11px]" style={{ color: 'var(--text3)' }}>{r.read_time}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author */}
              <div className="rounded-[14px] p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-3" style={{ color: 'var(--text3)' }}>
                  About the author
                </div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-content-center font-display font-extrabold text-[14px] text-white"
                    style={{ background: avGrad }}
                  >
                    {briefing.author_name[0]}
                  </div>
                  <div>
                    <div className="font-display font-bold text-[14px]" style={{ color: 'var(--text)' }}>
                      {briefing.author_name}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--text2)' }}>{briefing.author_role || 'LabelNest'}</div>
                  </div>
                </div>
                <Link
                  href="/team"
                  className="font-mono text-[10px] tracking-[.1em] uppercase"
                  style={{ color: 'var(--blue)' }}
                >
                  View team →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              const s = document.documentElement;
              const p = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;
              const el = document.getElementById('progress-fill');
              if (el) el.style.width = p + '%';
            }, { passive: true });
          `,
        }}
      />
    </>
  )
}
