import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PortalMock from '@/components/PortalMock'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import { pageMetadata } from '@/lib/seo'
import { getContent, text, items, type ContentMap } from '@/lib/siteContent'
import { getPlans, getAtlasStats, inr, usd, type PlanCatalog } from '@/lib/plans'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens', {
    title: 'NestLens — Atlas, Exchange, Command, Ascent, Orbit, Connect',
    description: 'NestLens is the LabelNest platform: reviewed private markets data, a data marketplace, a workspace for funds, data rooms for founders, programme management and fund scouting. One record, six products.',
  })
}

export const revalidate = 300

const CSS = `
.pr-sec{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:72px;align-items:center;padding:96px 0;border-top:1px solid var(--border)}
.pr-meta{margin-top:30px;border-top:1px solid var(--border)}
.pr-meta div{padding:14px 0;border-bottom:1px solid var(--border);font-size:15.5px}
.pr-meta b{display:block;font:600 12px var(--font-sans),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--pink);margin-bottom:3px}
.pr-ul{margin:26px 0 0;padding:0;list-style:none;display:grid;gap:12px}
.pr-ul li{padding-left:22px;position:relative}
.pr-ul li::before{content:"";position:absolute;left:0;top:.72em;width:10px;border-top:2px solid var(--brass-line)}
.pr-chip{display:inline-block;border:1px solid var(--bord2);padding:4px 12px;font-size:13.5px;color:var(--text);margin:0 8px 8px 0;background:var(--surface)}
.pr-shot{border:1px solid var(--bord2);box-shadow:0 30px 60px -34px rgba(14,27,46,.3);line-height:0}
.pr-mini{background:var(--surface);border:1px solid var(--bord2);box-shadow:0 30px 60px -34px rgba(14,27,46,.3);padding:22px}
.pr-lab{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--text3);margin:0 0 10px}
.pr-bar{height:8px;background:var(--bg3);margin-top:6px}.pr-bar i{display:block;height:8px;background:var(--text)}
@media (max-width:860px){.pr-sec{padding:64px 0;gap:40px}}
`

function Meta({ different, connects }: { different: string; connects: string }) {
  return <div className="pr-meta"><div><b>How it is different</b>{different}</div><div><b>Connects to</b>{connects}</div></div>
}

function Block({ id, n, name, c, children, visual, flip, buttons }: {
  id: string; n: string; name: string; c: ContentMap; visual: React.ReactNode; flip?: boolean; children?: React.ReactNode
  buttons: React.ReactNode
}) {
  const points = items(c, `products.${id}.points`)
  const copy = (
    <div>
      <p className="ln-eyebrow" style={{ margin: '0 0 16px' }}>{n} · {name}</p>
      <h2 className="ln-h2">{text(c, `products.${id}.title`)}</h2>
      <ul className="pr-ul">{points.map((p, i) => <li key={i}>{p.text}</li>)}</ul>
      <Meta different={text(c, `products.${id}.different`)} connects={text(c, `products.${id}.connects`)} />
      <p style={{ margin: '30px 0 0', display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center' }}>{buttons}</p>
      {children}
    </div>
  )
  return <section id={id} className="pr-sec">{flip ? <>{visual}{copy}</> : <>{copy}{visual}</>}</section>
}

function faqs(plans: PlanCatalog, atlasN: { funds: string; companies: string; people: string }) {
  const i = plans.intelligence
  const tiers = ['atlas_basic', 'atlas_starter', 'atlas_growth', 'atlas_scale'].map((k) => i[k]).filter(Boolean)
  const atlas = tiers.map((p) => `${p.name} ${usd(p.priceUSD ?? 0)} a year (${inr(p.priceINR ?? 0)})`).join(', ')
  const ex = plans.exchange
  const cr = plans.cr
  const orbit = ['orbit_launch', 'orbit_starter', 'orbit_growth', 'orbit_scale', 'orbit_enterprise'].map((k) => cr[k]).filter(Boolean)
  return [
    { q: 'What is NestLens?', a: 'NestLens is the LabelNest platform for private markets: Atlas (reviewed data), Exchange (a data marketplace), Command (a workspace for funds), Ascent (data rooms for founders), Orbit (programme management) and Connect (mentors, audit partners and fund scouting). The products read one shared record.' },
    { q: 'How do the NestLens products connect?', a: 'A founder fills in an Ascent data room once. A fund in Command reads it, a programme in Orbit selects startups into it, and Atlas is the reviewed data underneath. Nothing is written back to the founder and nothing is shared without their consent.' },
    { q: 'How much data does Atlas hold?', a: `Atlas holds ${atlasN.funds} funds and fund managers, ${atlasN.companies} portfolio companies and ${atlasN.people} people. Every field shows its source and the date a person last reviewed it.` },
    { q: 'How much does Atlas cost?', a: `Atlas is billed yearly: ${atlas}. Enterprise is priced on request.` },
    { q: 'Is Exchange free to use?', a: `Exchange is free to browse and to post requirements${ex.buyer?.jobPostsIncluded ? ` (${ex.buyer.jobPostsIncluded} a month included)` : ''}. Sellers pay ${inr(ex.priority?.priceINR ?? 0)} a year (${usd(ex.priority?.priceUSD ?? 0)}) for an active listing. Sellers are identity-verified and payment is held in escrow.` },
    { q: 'How much does Ascent cost?', a: `Every new account gets 30 days of full access, free. The Founder Data Room is ${inr(cr.founder_paid_solo?.priceINR ?? 0)} a year (${usd(cr.founder_paid_solo?.priceUSD ?? 0)}). For a cohort or a group of startups, LabelNest quotes one price.` },
    { q: 'How much does Command cost?', a: `Command is one package per fund, billed monthly: ${inr(cr.fund_bundle?.priceINR ?? 0)} for India-domiciled funds and ${usd(cr.fund_bundle_global?.priceUSD ?? 0)} for funds domiciled elsewhere. It includes ${cr.fund_bundle?.dataRoomsIncluded ?? 10} Ascent data rooms for your portfolio companies.` },
    { q: 'How much does Orbit cost?', a: `Orbit is billed yearly: ${orbit.map((p) => `${p.name} ${inr(p.priceINR ?? 0)} (${p.dataRoomsIncluded} Ascent data rooms)`).join(', ')}.` },
    { q: 'Is Connect a separate subscription?', a: 'No. Mentor requests and verified audits come with an active Ascent or Command plan. Mentors and audit partners apply for free and are vetted before they go live.' },
    { q: 'Is NestLens the same as NestHR?', a: "No. NestHR is LabelNest's separate HR and campus-placement product, with its own pricing." },
  ]
}

export default async function NestLensPage() {
  const [c, { plans }, stats] = await Promise.all([getContent(), getPlans(), getAtlasStats()])
  const FAQS = faqs(plans, stats)
  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const SOFTWARE_SCHEMA = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', '@id': 'https://labelnest.in/nestlens#software',
    name: 'NestLens', operatingSystem: 'Web-based', applicationCategory: 'BusinessApplication', applicationSubCategory: 'Private Markets Platform',
    description: 'Atlas, Exchange, Command, Ascent, Orbit and Connect: reviewed private markets data and the software to run a fund, a programme or a raise.',
    url: 'https://nestlens.labelnest.in',
    publisher: { '@type': 'Organization', name: 'LabelNest India Private Limited', url: 'https://labelnest.in' },
    brand: { '@type': 'Brand', name: 'LabelNest', url: 'https://labelnest.in' },
    featureList: [`${stats.funds} funds and fund managers`, `${stats.companies} portfolio companies`, `${stats.people} people`, 'Data marketplace with verified sellers and escrow', 'Fund workspace: pipeline, portfolio, LP reporting, NAV, committee', 'Investor-ready data rooms for founders', 'Programme management for incubators and accelerators', 'Mentors, audit partners and fund scouting'],
  }
  const tags = text(c, 'products.connect.thesisTags').split(',').map((t) => t.trim()).filter(Boolean)
  const tl = (href: string, label: string, external = false) => external
    ? <a className="ln-btn" href={href}>{label}</a>
    : <Link className="ln-btn" href={href}>{label}</Link>
  const price = <Link className="ln-tlink" href="/nestlens/pricing">Pricing</Link>

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <style>{CSS}</style>
      <Nav />
      <main className="ln-page">
        <NestLensModuleNav />

        <section style={{ padding: '88px 0 80px' }}>
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 48, alignItems: 'end' }}>
            <div><p className="ln-eyebrow ln-rise">NestLens</p><h1 className="ln-h1 ln-rise" style={{ ['--d' as string]: '.1s' }}>{text(c, 'products.hero.title')}</h1></div>
            <p className="ln-lead ln-rise" style={{ ['--d' as string]: '.25s', maxWidth: '30em' }}>{text(c, 'products.hero.lead')} <Link className="ln-tlink" href="/ecosystem">See how they connect</Link>.</p>
          </div>
        </section>

        <div className="ln-wrap">

          <Block id="atlas" n="01" name="Atlas" c={c}
            buttons={<>{tl('https://nestlens.labelnest.in', 'Open Atlas', true)}<Link className="ln-tlink" href="/nestlens/intelligence">Learn more</Link>{price}</>}
            visual={<div className="pr-shot"><PortalMock id="atlas-explore" alt="Sample atlas portal view" /></div>}
          />

          <Block id="exchange" n="02" name="Exchange" c={c} flip
            buttons={<>{tl('https://nestlens.labelnest.in', 'Browse Exchange', true)}<Link className="ln-tlink" href="/nestlens/exchange">Learn more</Link>{price}</>}
            visual={<div className="pr-shot"><PortalMock id="exchange-marketplace" alt="Sample exchange portal view" /></div>}
          />

          <Block id="command" n="03" name="Command" c={c}
            buttons={<>{tl('/contact', 'Book a walkthrough')}<Link className="ln-tlink" href="/nestlens/command">Learn more</Link>{price}</>}
            visual={<div className="pr-shot"><PortalMock id="command-fund" alt="Sample command portal view" /></div>}
          />

          <Block id="ascent" n="04" name="Ascent" c={c} flip
            buttons={<>{tl('https://nestlens.labelnest.in', 'Start your room', true)}<Link className="ln-tlink" href="/nestlens/capital">Learn more</Link>{price}</>}
            visual={<div className="pr-shot"><PortalMock id="ascent-readiness" alt="Sample ascent portal view" /></div>}
          />

          <Block id="orbit" n="05" name="Orbit" c={c}
            buttons={<>{tl('/who-we-serve/incubator', 'See Orbit for programmes')}<Link className="ln-tlink" href="/nestlens/orbit">Learn more</Link>{price}</>}
            visual={<div className="pr-shot"><PortalMock id="orbit-selection" alt="Sample orbit portal view" /></div>}
          />

          <Block id="connect" n="06" name="Connect" c={c} flip
            buttons={<>{tl('https://connect.labelnest.in', 'Explore Connect', true)}<Link className="ln-tlink" href="/nestlens/connect">Learn more</Link></>}
            visual={<div className="pr-shot"><PortalMock id="connect-home" alt="Sample connect portal view" /></div>}
          />
        </div>

        <section className="ln-rule" style={{ padding: '64px 0 96px' }}>
          <div className="ln-wrap">
            <p className="ln-eyebrow">Also from LabelNest</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 40 }}>
              <div><h3 className="ln-h3"><Link href="/nesthr" style={{ color: 'inherit' }}>NestHR</Link></h3><p style={{ margin: '8px 0 0' }}>People operations and campus placements for startups and colleges.</p></div>
              <div><h3 className="ln-h3"><Link href="/sentinel" style={{ color: 'inherit' }}>Sentinel</Link></h3><p style={{ margin: '8px 0 0' }}>Risk monitoring for portfolios and audits of AI systems. Early access.</p></div>
              <div><h3 className="ln-h3"><Link href="/services" style={{ color: 'inherit' }}>Managed data services</Link></h3><p style={{ margin: '8px 0 0' }}>Sourcing, enrichment and annotation run by our team, to your specification.</p></div>
            </div>
          </div>
        </section>

        <section className="ln-rule ln-sec">
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 64 }}>
            <div><p className="ln-eyebrow">Questions</p><h2 className="ln-h2">Common questions.</h2></div>
            <div>
              {FAQS.map((f) => (
                <details key={f.q} style={{ borderTop: '1px solid var(--border)', padding: '18px 0' }}>
                  <summary style={{ cursor: 'pointer', fontFamily: 'var(--font-serif),serif', fontSize: 22, color: 'var(--text)', listStyle: 'none' }}>{f.q}</summary>
                  <p style={{ margin: '12px 0 0' }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="ln-night ln-sec" style={{ padding: '96px 0' }}>
          <div className="ln-wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 40 }}>
            <h2 className="ln-h2" style={{ maxWidth: '16em' }}>{text(c, 'products.cta.title')}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}><Link className="ln-btn light" href="/contact">Talk to us</Link><Link className="ln-btn lightline" href="/nestlens/pricing">See pricing</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
