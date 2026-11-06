import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { getContent, text, items } from '@/lib/siteContent'
import { getPlans, inr, unlimited } from '@/lib/plans'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/who-we-serve/incubator', {
    title: 'For incubators and accelerators — Orbit with Ascent deal flow',
    description: 'Run the programme in Orbit, give every selected startup an Ascent data room, and turn ready rooms into consented introductions. Data rooms are included in every Orbit plan.',
  })
}

export const revalidate = 300

const BREADCRUMB_SCHEMA = breadcrumbSchema([{ name: 'Who we serve', path: '/who-we-serve' }, { name: 'Incubators and accelerators', path: '/who-we-serve/incubator' }])

const CSS = `
.ic-stage{display:inline-block;padding:9px 18px 9px 22px;margin-right:-8px;background:var(--text);color:var(--bg);font-size:14px;font-weight:600;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 50%,calc(100% - 12px) 100%,0 100%,12px 50%)}
.ic-stage.end{background:var(--text3)}
.ic-col{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));border-top:1px solid var(--text)}
.ic-col>div{padding:28px 28px 32px 0}
.ic-col>div+div{padding-left:28px;border-left:1px solid var(--border)}
.ic-col h3{font-family:var(--font-serif),serif;font-weight:400;font-size:30px;color:var(--text);margin:0 0 12px}
.ic-col ul{margin:0;padding:0;list-style:none;display:grid;gap:10px;font-size:15.5px}
.ic-col li{padding-left:18px;position:relative}
.ic-col li::before{content:"";position:absolute;left:0;top:.72em;width:9px;border-top:2px solid var(--brass-line)}
@media (max-width:860px){.ic-col>div,.ic-col>div+div{padding:24px 0;border-left:none;border-top:1px solid var(--border)}}
`

export default async function IncubatorPage() {
  const [c, { plans }] = await Promise.all([getContent(), getPlans()])
  const orbit = ['orbit_launch', 'orbit_starter', 'orbit_growth', 'orbit_scale', 'orbit_enterprise'].map((k) => plans.cr[k]).filter(Boolean)
  const suited = items(c, 'incubator.pricing.suited')
  const suitedFor = (name: string) => suited.find((s) => s.plan === name)?.text ?? ''
  const title = text(c, 'incubator.hero.title')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <style>{CSS}</style>
      <Nav />
      <main className="ln-page">

        <section style={{ padding: '88px 0 96px' }}>
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 56, alignItems: 'end' }}>
            <div>
              <p className="ln-eyebrow ln-rise">For incubators and accelerators</p>
              <h1 className="ln-h1 ln-rise" style={{ ['--d' as string]: '.1s' }}>{title}</h1>
            </div>
            <div className="ln-rise" style={{ ['--d' as string]: '.25s' }}>
              <p className="ln-lead" style={{ margin: '0 0 30px', maxWidth: '30em' }}>{text(c, 'incubator.hero.lead')}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}><Link className="ln-btn" href="/contact">Book a walkthrough</Link><Link className="ln-btn line" href="/nestlens/pricing#orbit">See pricing</Link></div>
            </div>
          </div>
        </section>

        {/* FLOW */}
        <section className="ln-rule ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">One flow</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em' }}>{text(c, 'incubator.flow.title')}</h2>
            <div className="ic-col" style={{ marginTop: 56 }}>
              {items(c, 'incubator.flow.items').map((f, i) => (
                <div key={i}><span className="ln-serif" style={{ color: 'var(--pink)', fontSize: 24 }}>0{i + 1}</span><h3 className="ln-h3" style={{ margin: '6px 0 10px', fontSize: 28 }}>{f.title}</h3><p style={{ margin: 0 }}>{f.body}</p></div>
              ))}
            </div>
            <p style={{ margin: '28px 0 0' }}><Link className="ln-tlink" href="/ecosystem">See every pairing in detail</Link></p>
          </div>
        </section>

        {/* DEAL FLOW */}
        <section className="ln-rule ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">Deal flow, a feature of Ascent</p>
            <h2 className="ln-h2" style={{ maxWidth: '16em' }}>{text(c, 'incubator.admin.title')}</h2>
            <p className="ln-lead" style={{ margin: '20px 0 52px', maxWidth: '36em' }}>{text(c, 'incubator.admin.lead')}</p>
            <div className="ic-col">
              {items(c, 'incubator.admin.cols').map((col, i) => (
                <div key={i}><h3>{col.title}</h3><ul>{col.points.split('\n').filter(Boolean).map((p, j) => <li key={j}>{p}</li>)}</ul></div>
              ))}
            </div>
            <div style={{ marginTop: 56 }}>
              <p className="ln-small" style={{ margin: '0 0 14px' }}>Every pairing moves left to right</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 0' }}>
                {['Suggested', 'Introduced', 'Meeting', 'Interested', 'Diligence', 'Term sheet', 'Funded'].map((s) => <span key={s} className="ic-stage">{s}</span>)}
                <span className="ic-stage end">Passed</span>
              </div>
              <p className="ln-small" style={{ margin: '14px 0 0', maxWidth: '46em' }}>{text(c, 'incubator.board.note')}</p>
            </div>
          </div>
        </section>

        {/* LN PARTNER NETWORK */}
        <section className="ln-night ln-sec">
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 72, alignItems: 'center' }}>
            <div>
              <p className="ln-eyebrow">Open to your startups now</p>
              <h2 className="ln-h2">{text(c, 'incubator.network.title')}</h2>
              <p className="ln-lead" style={{ margin: '22px 0 0', maxWidth: '28em' }}>{text(c, 'incubator.network.lead')}</p>
              <div style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <a className="ln-btn light" href="https://connect.labelnest.in/scout/ln-partner-network">Read the thesis</a>
                <Link className="ln-btn lightline" href="/nestlens/connect">How Connect works</Link>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #2a3b55' }}>
              {items(c, 'incubator.network.facts').map((f, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 16, padding: '18px 0', borderBottom: '1px solid #2a3b55' }}><span style={{ color: 'var(--mutenight)' }}>{f.label}</span><span style={{ color: 'var(--onnight)' }}>{f.value}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING (live) */}
        <section className="ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">Pricing</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em' }}>{text(c, 'incubator.pricing.title')}</h2>
            <p className="ln-lead" style={{ margin: '20px 0 40px', maxWidth: '36em' }}>{text(c, 'incubator.pricing.lead')}</p>
            <div className="ln-scroll">
              <table className="ln-tbl"><thead><tr><th>Plan</th><th>Price per year</th><th>Data rooms included</th><th>Suited to</th></tr></thead><tbody>
                {orbit.map((p) => (
                  <tr key={p.name} className={p.popular ? 'hl' : undefined}><td className="nm">{p.name.replace(/^Orbit\s*/, '')}</td><td className="p">{inr(p.priceINR ?? 0)}</td><td>{unlimited(p.dataRoomsIncluded) ? 'Unlimited' : p.dataRoomsIncluded}</td><td>{suitedFor(p.name)}</td></tr>
                ))}
              </tbody></table>
            </div>
            <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 40, borderTop: '1px solid var(--border)', paddingTop: 28 }}>
              <div><h3 className="ln-h3" style={{ fontSize: 26 }}>Without Orbit</h3><p style={{ margin: '8px 0 0' }}>{text(c, 'incubator.pricing.without')} {plans.cr.founder_paid_solo && <>It is <b style={{ color: 'var(--text)' }}>{inr(plans.cr.founder_paid_solo.priceINR ?? 0)}</b> a year.</>}</p></div>
              <div><h3 className="ln-h3" style={{ fontSize: 26 }}>A group of startups</h3><p style={{ margin: '8px 0 0' }}>{text(c, 'incubator.pricing.group')} <Link className="ln-tlink" href="/contact">Talk to us</Link>.</p></div>
              <div><h3 className="ln-h3" style={{ fontSize: 26 }}>Try it first</h3><p style={{ margin: '8px 0 0' }}>{text(c, 'incubator.pricing.trial')}</p></div>
            </div>
          </div>
        </section>

        <section className="ln-night ln-sec" style={{ padding: '96px 0' }}>
          <div className="ln-wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 40 }}>
            <h2 className="ln-h2" style={{ maxWidth: '16em' }}>{text(c, 'incubator.cta.title')}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}><Link className="ln-btn light" href="/contact">Book a walkthrough</Link><Link className="ln-btn lightline" href="/contact">Ask for a group quote</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
