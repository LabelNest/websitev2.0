import { Metadata } from 'next'
import Link from 'next/link'
import AudienceSwitcher, { type Audience } from '@/components/AudienceSwitcher'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import VideoBlock from '@/components/VideoBlock'
import { pageMetadata } from '@/lib/seo'
import { getContent, text, items } from '@/lib/siteContent'
import { getAtlasStats } from '@/lib/plans'
import { getBriefings, getTeamMembers } from '@/lib/db'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/', {
    title: 'LabelNest — Private market data you can trace to its source',
    description: 'LabelNest is a private markets data company in Bengaluru. Reviewed data on funds, companies and people, and the software to run a fund, a programme or a raise on top of it.',
  })
}

export const revalidate = 300

const SAMPLE = [
  { k: 'Fund', v: 'Sample Growth Fund I', src: 'Source: fund website' },
  { k: 'Registration', v: 'IN/AIF2/25-26/0000', src: 'Source: SEBI AIF register' },
  { k: 'Fund size', v: '₹450 crore', src: 'Source: placement memorandum, 12 Mar 2026' },
  { k: 'Vintage', v: '2024', src: 'Source: SEBI registration date' },
  { k: 'Team', v: '3 partners, dated moves', src: 'Source: firm website, press release' },
]

function CountNumber({ value, label }: { value: string; label: string }) {
  const m = value.match(/^(\d+)(.*)$/)
  return (
    <div style={{ padding: '32px 24px 8px 0' }}>
      <div className="ln-num">
        {m ? <><span className="ln-count" style={{ ['--ln-t' as string]: m[1] }} aria-label={value} />{m[2]}</> : value}
      </div>
      <p style={{ margin: '14px 0 0' }}>{label}</p>
    </div>
  )
}

function fmtDate(d: string): string {
  try { return new Date(d).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) } catch { return '' }
}

export default async function HomePage() {
  const c = await getContent()
  const stats = await getAtlasStats()
  const override = items(c, 'home.numbers.items')
  const numbers = override.length
    ? override
    : [
        { value: stats.funds, label: 'funds and fund managers' },
        { value: stats.companies, label: 'portfolio companies' },
        { value: stats.people, label: 'people, with dated career moves' },
      ]
  const [briefings, team] = await Promise.all([
    getBriefings().then((b) => b.filter((x) => !/newsletter/i.test(x.scope)).slice(0, 3)).catch(() => []),
    getTeamMembers().catch(() => []),
  ])
  const founder = team.find((t) => /ankit/i.test(t.name))
  const methodImage = text(c, 'home.method.image')

  return (
    <>
      <Nav />
      <main className="ln-page">

        {/* HERO */}
        <section style={{ position: 'relative', overflow: 'hidden' }}>
          <svg aria-hidden="true" viewBox="0 0 700 700" style={{ position: 'absolute', right: -120, top: -60, width: 760, height: 760, opacity: 0.5, pointerEvents: 'none' }} fill="none" stroke="#B58A3C" strokeWidth="1">
            <ellipse cx="350" cy="350" rx="320" ry="250" transform="rotate(-18 350 350)" />
            <ellipse cx="350" cy="350" rx="270" ry="205" transform="rotate(-18 350 350)" />
            <ellipse cx="350" cy="350" rx="220" ry="162" transform="rotate(-18 350 350)" />
            <ellipse cx="350" cy="350" rx="170" ry="120" transform="rotate(-18 350 350)" />
            <ellipse cx="350" cy="350" rx="120" ry="80" transform="rotate(-18 350 350)" />
            <ellipse cx="350" cy="350" rx="70" ry="44" transform="rotate(-18 350 350)" />
          </svg>
          <div className="ln-wrap" style={{ position: 'relative', paddingTop: 80, paddingBottom: 104, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <p className="ln-eyebrow ln-rise">{text(c, 'home.hero.eyebrow')}</p>
              <h1 className="ln-h1 ln-rise" style={{ ['--d' as string]: '.1s' }}>{text(c, 'home.hero.title')}</h1>
              <p className="ln-lead ln-rise" style={{ ['--d' as string]: '.25s', margin: '28px 0 0', maxWidth: '34em' }}>{text(c, 'home.hero.lead')}</p>
              <div className="ln-rise" style={{ ['--d' as string]: '.4s', display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 38 }}>
                <Link className="ln-btn" href="/nestlens">{text(c, 'home.hero.cta1')}</Link>
                <Link className="ln-btn line" href="/contact">{text(c, 'home.hero.cta2')}</Link>
              </div>
              <p className="ln-small ln-rise" style={{ ['--d' as string]: '.55s', margin: '26px 0 0', maxWidth: '30em' }}>{text(c, 'home.hero.note')}</p>
            </div>

            <div className="ln-panel ln-rise" style={{ ['--d' as string]: '.3s', maxWidth: 560, justifySelf: 'end', width: '100%' }} aria-label="A sample Atlas record">
              <div className="bar"><b>Investment fund</b><span>Sample record</span></div>
              {SAMPLE.map((r, i) => (
                <div className="ln-vrow" key={r.k} style={{ ['--d' as string]: `${i * 0.9}s` }}>
                  <span className="k">{r.k}</span><span className="v">{r.v}</span><span className="src">{r.src}</span>
                  <span className="st"><span className="pend"><i />Not yet reviewed</span><span className="done"><i />Reviewed</span></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT STATEMENT */}
        <section className="ln-rule ln-sec" style={{ padding: '96px 0' }}>
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 40, alignItems: 'start' }}>
            <p className="ln-eyebrow" style={{ margin: '6px 0 0' }}>{text(c, 'home.about.eyebrow')}</p>
            <div style={{ gridColumn: 'span 3' }}>
              <p className="ln-serif" style={{ margin: 0, fontSize: 'clamp(26px,3.4vw,44px)', lineHeight: 1.22, maxWidth: '26em' }}>{text(c, 'home.about.statement')}</p>
              <p style={{ margin: '28px 0 0' }}><Link className="ln-tlink" href="/about">Our story</Link></p>
            </div>
          </div>
        </section>

        {/* CONNECTED */}
        <section className="ln-rule ln-sec" style={{ background: 'var(--bg2)' }}>
          <div className="ln-wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 40, alignItems: 'end', marginBottom: 56 }}>
              <div><p className="ln-eyebrow">{text(c, 'home.connected.eyebrow')}</p><h2 className="ln-h2">{text(c, 'home.connected.title')}</h2></div>
              <p className="ln-lead" style={{ maxWidth: '30em' }}>{text(c, 'home.connected.lead')}</p>
            </div>

            <div style={{ border: '1px solid var(--bord2)', background: 'var(--surface)', padding: '24px 28px', marginBottom: 48 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px 24px', alignItems: 'baseline', paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                <span className="ln-serif" style={{ fontSize: 26 }}>Atlas</span><span className="ln-small">The reviewed record underneath, feeding Command and the investor directory</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1.3fr auto 1fr', gap: 16, alignItems: 'center', padding: '24px 0' }}>
                <div style={{ textAlign: 'center' }}><span className="ln-serif" style={{ fontSize: 'clamp(20px,2.6vw,30px)' }}>Orbit</span><p className="ln-small" style={{ marginTop: 4 }}>the programme</p></div>
                <span style={{ fontSize: 28, color: 'var(--pink)' }} aria-hidden="true">→</span>
                <div style={{ textAlign: 'center', border: '2px solid var(--text)', padding: '14px 12px' }}><span className="ln-serif" style={{ fontSize: 'clamp(20px,2.6vw,30px)' }}>Ascent</span><p className="ln-small" style={{ marginTop: 4 }}>data room · deal flow</p></div>
                <span style={{ fontSize: 28, color: 'var(--pink)' }} aria-hidden="true">→</span>
                <div style={{ textAlign: 'center' }}><span className="ln-serif" style={{ fontSize: 'clamp(20px,2.6vw,30px)' }}>Command</span><p className="ln-small" style={{ marginTop: 4 }}>the fund</p></div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px 24px', alignItems: 'baseline', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <span className="ln-serif" style={{ fontSize: 26 }}>Connect</span><span className="ln-small">Mentors, audit partners and fund scouting, reached from the room</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', borderTop: '1px solid var(--text)' }}>
              {items(c, 'home.connected.cards').map((card, i) => (
                <Link key={i} href="/ecosystem" style={{ padding: i === 0 ? '30px 32px 34px 0' : '30px 32px 34px 32px', borderLeft: i ? '1px solid var(--bord2)' : 'none', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <p className="ln-eyebrow" style={{ margin: '0 0 10px' }}>{card.eyebrow}</p>
                  <p className="ln-serif" style={{ fontSize: 30, lineHeight: 1.15, margin: 0 }}>{card.title}</p>
                  <p style={{ margin: '14px 0 0', fontSize: 16 }}>{card.body}</p>
                  <p style={{ margin: '18px 0 0', fontWeight: 600, color: 'var(--text)' }}>See how →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section className="ln-rule ln-sec">
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: methodImage ? 'repeat(auto-fit,minmax(min(100%,420px),1fr))' : '1fr', gap: 72, alignItems: 'center' }}>
            {methodImage && (
              <div style={{ position: 'relative', minHeight: 520, overflow: 'hidden' }}>
                <Image src={methodImage} alt="A researcher checking a record against its source" fill sizes="(max-width:900px) 100vw, 560px" style={{ objectFit: 'cover' }} />
              </div>
            )}
            <div>
              <p className="ln-eyebrow">{text(c, 'home.method.eyebrow')}</p>
              <h2 className="ln-h2" style={{ maxWidth: '16em' }}>{text(c, 'home.method.title')}</h2>
              <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: methodImage ? '1fr' : 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: methodImage ? 30 : 40 }}>
                {items(c, 'home.method.steps').map((s, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 16, borderTop: methodImage ? 'none' : '1px solid var(--text)', paddingTop: methodImage ? 0 : 22 }}>
                    <span className="ln-serif" style={{ fontSize: 30, color: 'var(--pink)' }}>0{i + 1}</span>
                    <div><h3 className="ln-h3" style={{ fontSize: 24 }}>{s.title}</h3><p style={{ margin: '6px 0 0' }}>{s.body}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="ln-rule ln-sec">
          <div className="ln-wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 40, alignItems: 'end', marginBottom: 56 }}>
              <div><p className="ln-eyebrow">{text(c, 'home.products.eyebrow')}</p><h2 className="ln-h2">{text(c, 'home.products.title')}</h2></div>
              <p className="ln-lead" style={{ maxWidth: '30em' }}>{text(c, 'home.products.lead')}</p>
            </div>
            <div>
              {items(c, 'home.products.rows').map((r, i) => (
                <Link key={i} href={r.href || '/nestlens'} className="ln-row">
                  <span className="n">{String(i + 1).padStart(2, '0')}</span><span className="t">{r.name}</span>
                  <span className="d">{r.text}</span><span className="w ln-small">{r.works}</span><span className="a" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
            <p className="ln-small" style={{ margin: '28px 0 0' }}>Also from LabelNest: <Link className="ln-tlink" href="/nesthr">NestHR</Link> for people and placements, <Link className="ln-tlink" href="/sentinel">Sentinel</Link> for risk and AI oversight (early access), and <Link className="ln-tlink" href="/services">managed data services</Link>.</p>
          </div>
        </section>

        {/* AUDIENCES: I am a ... */}
        <AudienceSwitcher eyebrow={text(c, 'home.audiences.eyebrow')} title={text(c, 'home.audiences.title')} items={items(c, 'home.switch.items') as unknown as Audience[]} />

        {/* NUMBERS */}
        <section className="ln-sec">
          <div className="ln-wrap">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 24, marginBottom: 56 }}>
              <div><p className="ln-eyebrow">{text(c, 'home.numbers.eyebrow')}</p><h2 className="ln-h2">{text(c, 'home.numbers.title')}</h2></div>
              <p className="ln-small" style={{ maxWidth: '24em' }}>{text(c, 'home.numbers.note')}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', borderTop: '1px solid var(--text)' }}>
              {numbers.map((n, i) => <CountNumber key={i} value={n.value} label={n.label} />)}
            </div>
          </div>
        </section>

        {/* VIDEO (only when a link is set) */}
        {text(c, 'home.video.url') && (
          <section className="ln-rule ln-sec" style={{ padding: '104px 0' }}>
            <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="ln-eyebrow">{text(c, 'home.video.eyebrow')}</p>
                <h2 className="ln-h2">{text(c, 'home.video.title')}</h2>
                <p className="ln-lead" style={{ margin: '22px 0 0', maxWidth: '26em' }}>{text(c, 'home.video.lead')}</p>
              </div>
              <VideoBlock url={text(c, 'home.video.url')} poster={text(c, 'home.video.poster')} title={text(c, 'home.video.title')} cta={text(c, 'home.video.cta')} />
            </div>
          </section>
        )}

        {/* FOUNDER */}
        <section className="ln-rule ln-sec">
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 72, alignItems: 'center' }}>
            {(text(c, 'home.founder.image') || founder?.image_url) && (
              <div style={{ position: 'relative', aspectRatio: '4 / 5', maxWidth: 460, width: '100%', overflow: 'hidden', background: 'var(--bg2)' }}>
                <Image
                  src={text(c, 'home.founder.image') || (founder?.image_url as string)}
                  alt="Ankit Suman, Founder and Director"
                  fill sizes="(max-width:900px) 100vw, 460px"
                  style={{ objectFit: 'cover', objectPosition: founder?.image_position || 'center' }}
                />
              </div>
            )}
            <div>
              <p className="ln-eyebrow" style={{ marginBottom: 22 }}>{text(c, 'home.founder.eyebrow')}</p>
              <blockquote className="ln-serif" style={{ margin: 0, fontSize: 'clamp(28px,3.2vw,42px)', lineHeight: 1.22, letterSpacing: '-.02em' }}>“{text(c, 'home.founder.quote')}”</blockquote>
              <p style={{ margin: '28px 0 0', maxWidth: '30em' }}>{text(c, 'home.founder.body')}</p>
              <p style={{ margin: '26px 0 0' }}><Link className="ln-tlink" href="/about/ankit">{text(c, 'home.founder.link')}</Link></p>
            </div>
          </div>
        </section>

        {/* READING */}
        {briefings.length > 0 && (
          <section className="ln-rule ln-sec">
            <div className="ln-wrap">
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 20, marginBottom: 40 }}>
                <div><p className="ln-eyebrow">{text(c, 'home.reading.eyebrow')}</p><h2 className="ln-h2">{text(c, 'home.reading.title')}</h2></div>
                <Link className="ln-tlink" href="/briefings">All research and writing</Link>
              </div>
              {briefings.map((b, i) => (
                <Link key={b.id} href={`/briefings/${b.slug}`} style={{ display: 'grid', gridTemplateColumns: 'minmax(110px,150px) 1fr auto', gap: 24, padding: '26px 0', borderTop: '1px solid var(--border)', borderBottom: i === briefings.length - 1 ? '1px solid var(--border)' : 'none', textDecoration: 'none', color: 'inherit', alignItems: 'baseline' }}>
                  <span className="ln-small">Briefing · {fmtDate(b.date)}</span>
                  <span className="ln-serif" style={{ fontSize: 'clamp(20px,2.2vw,26px)', lineHeight: 1.25 }}>{b.title}</span>
                  <span className="ln-small">{b.author_name}</span>
                </Link>
              ))}
              <p className="ln-small" style={{ margin: '36px 0 0' }}>{text(c, 'home.press.line')}</p>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="ln-night ln-sec">
          <div className="ln-wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 40 }}>
            <div style={{ maxWidth: '32em' }}>
              <h2 className="ln-h2">{text(c, 'home.cta.title')}</h2>
              <p className="ln-lead" style={{ margin: '20px 0 0' }}>{text(c, 'home.cta.lead')}</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link className="ln-btn light" href="/contact">{text(c, 'home.cta.primary')}</Link>
              <a className="ln-btn lightline" href="https://nestlens.labelnest.in">{text(c, 'home.cta.secondary')}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
