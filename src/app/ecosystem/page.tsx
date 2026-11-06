import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { getContent, text, items } from '@/lib/siteContent'
import EcosystemTabs, { type TabData } from './EcosystemTabs'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/ecosystem', {
    title: 'How the LabelNest products connect — Atlas, Command, Ascent, Orbit, Connect',
    description: 'One record, every product reads it. How Command and Ascent, Orbit and Ascent, and Atlas with Command and Ascent work together, step by step.',
  })
}

export const revalidate = 300

const BREADCRUMB_SCHEMA = breadcrumbSchema([{ name: 'How it connects', path: '/ecosystem' }])

const CSS = `
.ec-layer{border:1px solid var(--bord2);background:var(--surface);padding:18px 24px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 32px;align-items:center}
.ec-k{font:600 12px var(--font-sans),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--pink);margin:0 0 4px}
.ec-box{border:1px solid var(--text);background:var(--surface);padding:22px 22px 24px}
.ec-box h3{font-family:var(--font-serif),serif;font-weight:400;font-size:34px;line-height:1;color:var(--text);margin:0 0 6px;letter-spacing:-.02em}
.ec-who{font-size:13.5px;color:var(--text3);margin:0 0 14px}
.ec-feat{border-top:1px solid var(--border);padding-top:10px;margin-top:10px;font-size:14.5px;color:var(--text2)}
.ec-feat b{display:block;color:var(--text);font-weight:600}
.ec-link{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:6px;color:var(--text);padding:0 6px}
.ec-link .ar{font-family:var(--font-serif),serif;font-size:34px;line-height:1}
.ec-link .lb{font-size:13px;line-height:1.35;color:var(--text2)}
.ec-map{display:grid;grid-template-columns:1fr 150px 1.25fr 150px 1fr;align-items:stretch}
@media (max-width:900px){.ec-map{grid-template-columns:1fr}.ec-link{padding:14px 0}.ec-link .ar{transform:rotate(90deg)}}
`

export default async function EcosystemPage() {
  const c = await getContent()

  const mk = (id: string, links: TabData['links']): TabData => ({
    id,
    title: text(c, `eco.${id}.title`),
    tagline: text(c, `eco.${id}.tagline`),
    lead: text(c, `eco.${id}.lead`),
    steps: items(c, `eco.${id}.steps`).map((s) => ({ title: s.title, body: s.body })),
    syncs: text(c, `eco.${id}.syncs`),
    stays: text(c, `eco.${id}.stays`),
    control: text(c, `eco.${id}.control`),
    links,
  })
  const tabs: TabData[] = [
    mk('cmd', [{ label: 'See Command', href: '/nestlens/command', primary: true }, { label: 'See Ascent', href: '/nestlens/capital' }]),
    mk('orbit', [{ label: 'See Orbit for programmes', href: '/who-we-serve/incubator', primary: true }, { label: 'Pricing', href: '/nestlens/pricing' }]),
    mk('atlas', [{ label: 'See Atlas', href: '/nestlens/intelligence', primary: true }, { label: 'See Command', href: '/nestlens/command' }]),
  ]

  const outcome = (key: string, eyebrow: string, title: string, night = false) => (
    <div className={night ? 'ln-nightcol' : undefined} style={night ? undefined : { borderTop: '1px solid var(--text)', paddingTop: 24 }}>
      <p className="ln-eyebrow" style={{ margin: '0 0 10px' }}>{eyebrow}</p>
      <h3 className="ln-h3">{title}</h3>
      <ul className="ln-pts">
        {items(c, key).map((p, i) => <li key={i}><b>{p.head}</b>{p.body}</li>)}
      </ul>
    </div>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <style>{CSS}</style>
      <Nav />
      <main className="ln-page">

        <section style={{ padding: '88px 0 72px' }}>
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 56, alignItems: 'end' }}>
            <div><p className="ln-eyebrow ln-rise">How it connects</p><h1 className="ln-h1 ln-rise" style={{ ['--d' as string]: '.1s' }}>{text(c, 'eco.hero.title')}</h1></div>
            <p className="ln-lead ln-rise" style={{ ['--d' as string]: '.25s', maxWidth: '30em' }}>{text(c, 'eco.hero.lead')}</p>
          </div>
        </section>

        {/* MAP */}
        <section style={{ paddingBottom: 96 }}>
          <div className="ln-wrap">
            <div className="ec-layer">
              <div><p className="ec-k">Atlas</p><span className="ln-serif" style={{ fontSize: 24 }}>The reviewed record</span></div>
              <span className="ln-small" style={{ maxWidth: '32em' }}>{text(c, 'eco.map.atlas')}</span>
            </div>
            <div style={{ textAlign: 'center', fontSize: 22, color: 'var(--pink)', lineHeight: 1.6 }} aria-hidden="true">↓ &nbsp; ↓ &nbsp; ↓</div>
            <div className="ec-map">
              <div className="ec-box"><h3>Orbit</h3><p className="ec-who">The programme</p><p style={{ margin: 0, fontSize: 15 }}>{text(c, 'eco.map.orbit')}</p></div>
              <div className="ec-link"><span className="ar" aria-hidden="true">→</span><span className="lb">{text(c, 'eco.map.link1')}</span></div>
              <div className="ec-box" style={{ borderWidth: 2 }}>
                <h3>Ascent</h3><p className="ec-who">The founder</p>
                <div className="ec-feat" style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}><b>Data room</b>{text(c, 'eco.map.ascentRoom')}</div>
                <div className="ec-feat"><b>Deal flow</b>{text(c, 'eco.map.ascentFlow')}</div>
              </div>
              <div className="ec-link"><span className="ar" aria-hidden="true">→</span><span className="lb">{text(c, 'eco.map.link2')}</span></div>
              <div className="ec-box"><h3>Command</h3><p className="ec-who">The fund</p><p style={{ margin: 0, fontSize: 15 }}>{text(c, 'eco.map.command')}</p></div>
            </div>
            <div style={{ textAlign: 'center', fontSize: 22, color: 'var(--pink)', lineHeight: 1.6 }} aria-hidden="true">↑ &nbsp; ↑</div>
            <div className="ec-layer">
              <div><p className="ec-k">Connect</p><span className="ln-serif" style={{ fontSize: 24 }}>Mentors, audit partners, fund scouting</span></div>
              <span className="ln-small" style={{ maxWidth: '32em' }}>{text(c, 'eco.map.connect')}</span>
            </div>
          </div>
        </section>

        {/* TABS */}
        <section className="ln-rule" style={{ padding: '88px 0 104px' }}>
          <div className="ln-wrap">
            <p className="ln-eyebrow">Three pairings</p>
            <h2 className="ln-h2" style={{ maxWidth: '16em' }}>Step by step.</h2>
            <EcosystemTabs tabs={tabs} />
          </div>
        </section>

        {/* OUTCOMES */}
        <section className="ln-rule ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">What you get</p>
            <h2 className="ln-h2" style={{ maxWidth: '16em' }}>{text(c, 'eco.out.title')}</h2>
            <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 32, alignItems: 'start' }}>
              {outcome('eco.out.fund', 'If you run a fund', 'Command, with Ascent and Atlas')}
              {outcome('eco.out.startup', 'If you are a startup', 'How Ascent feels', true)}
              {outcome('eco.out.programme', 'If you run a programme', 'Orbit, with Ascent deal flow')}
            </div>
          </div>
        </section>

        <section className="ln-night ln-sec" style={{ padding: '96px 0' }}>
          <div className="ln-wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 40 }}>
            <div style={{ maxWidth: '30em' }}><h2 className="ln-h2">{text(c, 'eco.cta.title')}</h2><p className="ln-lead" style={{ margin: '18px 0 0' }}>A person replies within one business day.</p></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}><Link className="ln-btn light" href="/contact">Talk to us</Link><Link className="ln-btn lightline" href="/nestlens/pricing">See pricing</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
