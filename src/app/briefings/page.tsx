import { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getBriefings, Briefing } from '@/lib/db'
import { pageMetadata } from '@/lib/seo'
import { imgFrameStyle } from '@/lib/image'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/briefings', {
    title: 'Briefings — LabelNest on Private Markets, Data, and Building',
    description: "Direct writing from the LabelNest team on private markets, India's data infrastructure, and building products that work. Read the briefings.",
  })
}

function scopeColor(scope: string): string {
  const m: Record<string, string> = {
    Manifesto: '#E91E8C', Product: '#7C3AED', Intelligence: '#2563EB',
    Sovereignty: '#06B6D4', Foundry: '#10B981', 'Market Intelligence': '#F97316',
    Newsletter: '#F59E0B', Strategy: '#8B5CF6', Featured: '#F97316',
  }
  return m[scope] ?? '#F97316'
}

function scopeEmoji(scope: string): string {
  const m: Record<string, string> = {
    Manifesto: '🌏', Product: '⚡', Intelligence: '🔭', Sovereignty: '🇮🇳',
    Foundry: '🏗️', 'Market Intelligence': '🌐', Newsletter: '📬', Strategy: '🎯',
  }
  return m[scope] ?? '📊'
}

function authorInitial(name: string): string {
  return name[0]?.toUpperCase() ?? 'L'
}

function authorGradient(name: string): string {
  if (name === 'Ankit Suman') return 'linear-gradient(135deg,#E91E8C,#7C3AED)'
  if (name === 'Shubham Singh') return 'linear-gradient(135deg,#2563EB,#7C3AED)'
  if (name === 'Sumedha Pandey') return 'linear-gradient(135deg,#10B981,#2563EB)'
  return 'rgba(255,255,255,.08)'
}

const PRESS_MENTIONS = [
  { name: 'The Hindustan Wires', url: 'https://thehindustanwires.com/labelnest-building-the-end-to-end-platform-indias-emerging-private-markets-have-never-had/' },
  { name: 'The Entrepreneur Stories', url: 'https://theentrepreneurstories.com/labelnest-building-the-end-to-end-platform-indias-emerging-private-markets-have-never-had/' },
  { name: 'The Business Stories', url: 'https://thebusinessstories.com/labelnest-building-the-end-to-end-platform-indias-emerging-private-markets-have-never-had/' },
  { name: 'Dailyhunt', url: 'https://m.dailyhunt.in/news/india/english/thebusinessstories-epaper-dh81e4e6e2104e4dbbb7f32ee26194cfb7/-newsid-dh81e4e6e2104e4dbbb7f32ee26194cfb7_2c239de47aac428993f0e2058ec2aa95?sm=Y' },
]

export default async function BriefingsPage() {
  let briefings: Briefing[] = []
  try {
    briefings = await getBriefings()
  } catch {
    // DB unavailable — show empty state
  }

  const featured = briefings.find(b => b.is_featured) ?? briefings[0] ?? null
  const listBriefings = featured ? briefings.filter(b => b.slug !== featured.slug) : briefings

  return (
    <>
      <style>{`
        .briefing-featured:hover { border-color: #F97316 !important; transform: translateY(-3px); }
        .briefing-item:hover { opacity: 0.8; }
        .press-card:hover { border-color: #F97316 !important; transform: translateY(-2px); }
        @keyframes press-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes press-dot { 0%,100% { opacity: 1; transform: scale(1) } 50% { opacity: .4; transform: scale(.7) } }
        .press-track { animation: press-marquee 32s linear infinite; }
        .press-band:hover .press-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .press-track { animation: none; } }
      `}</style>
      <Nav />
      <main style={{ paddingTop: 64 }}>

        {/* PRESS — top of page, animated + highlighted */}
        <section className="press-band" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'linear-gradient(135deg, rgba(249,115,22,.09), rgba(233,30,140,.05))' }}>
          <div style={{ position: 'absolute', top: -80, right: -60, width: 360, height: 360, borderRadius: '50%', background: 'rgba(233,30,140,.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 48px 0', position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#F97316', marginBottom: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', display: 'inline-block', animation: 'press-dot 2s ease-in-out infinite' }} />
              In the Press
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(20px,2.6vw,30px)', letterSpacing: '-.02em', color: 'var(--text)', margin: '0 auto' }}>
              What the press is saying about us
            </h2>
          </div>
          <div style={{ overflow: 'hidden', padding: '22px 0 26px' }}>
            <div className="press-track" style={{ display: 'flex', width: 'max-content', gap: 16 }}>
              {[...Array(2)].map((_, rep) => (
                <div key={rep} style={{ display: 'flex', gap: 16 }}>
                  {PRESS_MENTIONS.map(p => (
                    <a key={`${rep}-${p.name}`} href={p.url} target="_blank" rel="noopener noreferrer" className="press-card"
                      style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 260, maxWidth: 260, padding: '16px 18px', background: 'var(--surface)', border: '1px solid rgba(249,115,22,.25)', borderRadius: 14, textDecoration: 'none', flexShrink: 0, transition: 'border-color .2s, transform .2s' }}>
                      <span style={{ fontSize: 20, color: '#F97316', lineHeight: 1 }}>&ldquo;</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{p.name}</span>
                      <span style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>Building the end-to-end platform India&apos;s emerging private markets have never had</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', color: '#F97316', marginTop: 2 }}>Read the story ↗</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HERO */}
        <section style={{ padding: '72px 48px 56px', borderBottom: '1px solid rgba(255,255,255,.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: -60, width: 480, height: 480, borderRadius: '50%', background: 'rgba(249,115,22,.06)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Briefings · LabelNest</div>
                <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(36px,5.5vw,64px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.02, color: 'var(--text)', marginBottom: 14 }}>
                  How we think about<br />
                  <span style={{ fontWeight: 300, color: 'var(--text2)' }}>data, markets, and building</span>
                </h1>
                <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 480, lineHeight: 1.72 }}>Direct writing from the LabelNest team on private markets, India's data infrastructure, and what it takes to build things that work.</p>
              </div>
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 28, color: '#F97316', letterSpacing: '-.04em' }}>{briefings.length || 14}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>Briefings</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 28, color: '#2563EB', letterSpacing: '-.04em' }}>4</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>Authors</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT + SIDEBAR */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48, alignItems: 'start' }}>

          {/* MAIN FEED */}
          <div>
            {featured ? (
              <Link href={`/briefings/${featured.slug}`} className="briefing-featured" style={{ display: 'block', background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 18, overflow: 'hidden', marginBottom: 20, transition: 'border-color .2s, transform .2s' }}>
                <div style={{ height: 180, background: 'linear-gradient(135deg,rgba(249,115,22,.1),rgba(233,30,140,.06))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, opacity: .3, borderBottom: '1px solid rgba(255,255,255,.06)', position: 'relative' }}>
                  {featured.cover_image
                    ? <img src={featured.cover_image} alt="" style={{ ...imgFrameStyle(featured.cover_image_position || '50% 50%', featured.cover_image_zoom || 1), position: 'absolute', inset: 0, opacity: 1 }} />
                    : scopeEmoji(featured.scope)
                  }
                  <span style={{ position: 'absolute', top: 14, left: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 5, background: '#F97316', color: '#fff' }}>Featured</span>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: scopeColor(featured.scope), marginBottom: 8 }}>{featured.scope}</div>
                  <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-.02em', lineHeight: 1.25, color: 'var(--text)', marginBottom: 10 }}>{featured.title}</h2>
                  <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>{featured.summary}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: authorGradient(featured.author_name), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 11, color: '#fff' }}>{authorInitial(featured.author_name)}</div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{featured.author_name}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text3)' }}>{featured.read_time} · {featured.date}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 18, padding: 48, textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📝</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 6 }}>No briefings yet</div>
                <div style={{ fontSize: 13.5, color: 'var(--text2)' }}>Publishing soon. Follow Operator to Founder on LinkedIn for updates.</div>
              </div>
            )}

            {/* LIST */}
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255,255,255,.06)' }}>
              {listBriefings.map(b => (
                <Link key={b.slug} href={`/briefings/${b.slug}`} className="briefing-item" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,.06)', transition: 'opacity .15s' }}>
                  <div style={{ width: 72, height: 72, borderRadius: 10, background: 'var(--surface)', border: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                    {scopeEmoji(b.scope)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: scopeColor(b.scope), marginBottom: 5 }}>{b.scope}</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '-.01em', lineHeight: 1.3, color: 'var(--text)', marginBottom: 6 }}>{b.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--text3)' }}>
                      <span>{b.author_name}</span>
                      <span>·</span>
                      <span>{b.date}</span>
                      <span>·</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}>{b.read_time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Newsletter */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#F97316,#E91E8C)' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#F97316', marginBottom: 6 }}>Founder's Newsletter</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>Operator to Founder</div>
              <div style={{ fontSize: 12.5, color: 'var(--text2)', marginBottom: 14, lineHeight: 1.5 }}>Building LabelNest from zero. Sharing the journey as it happens.</div>
              <a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: '#F97316', color: '#fff', fontSize: 13, fontWeight: 600, padding: 10, borderRadius: 8 }}>Follow on LinkedIn ↗</a>
            </div>

            {/* Press */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Press</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { name: 'The Hindustan Wires', url: 'https://thehindustanwires.com/labelnest-building-the-end-to-end-platform-indias-emerging-private-markets-have-never-had/' },
                  { name: 'The Entrepreneur Stories', url: 'https://theentrepreneurstories.com/labelnest-building-the-end-to-end-platform-indias-emerging-private-markets-have-never-had/' },
                  { name: 'The Business Stories', url: 'https://thebusinessstories.com/labelnest-building-the-end-to-end-platform-indias-emerging-private-markets-have-never-had/' },
                ].map(p => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', textDecoration: 'none', lineHeight: 1.4, borderBottom: '1px solid rgba(255,255,255,.06)', paddingBottom: 10 }}>
                    {p.name} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Authors */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Authors</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { name: 'Ankit Suman', role: 'Founder and Director', grad: 'linear-gradient(135deg,#E91E8C,#7C3AED)' },
                  { name: 'Shubham Singh', role: 'Data and AI Systems', grad: 'linear-gradient(135deg,#2563EB,#7C3AED)' },
                  { name: 'Sumedha Pandey', role: 'Research', grad: 'linear-gradient(135deg,#10B981,#2563EB)' },
                  { name: 'LabelNest', role: 'Team posts', grad: 'rgba(255,255,255,.08)' },
                ].map(a => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: a.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 12, color: a.name === 'LabelNest' ? 'var(--text2)' : '#fff', flexShrink: 0, border: a.name === 'LabelNest' ? '1px solid rgba(255,255,255,.1)' : 'none' }}>{a.name[0]}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{a.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
