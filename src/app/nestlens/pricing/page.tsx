import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { getContent, text, items } from '@/lib/siteContent'
import { getPlans, inr, usd, num, unlimited, type ApiPlan } from '@/lib/plans'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/pricing', {
    title: 'NestLens pricing — Atlas, Exchange, Command, Ascent, Orbit, Connect',
    description: 'Pricing for every NestLens product in rupees and dollars, read live from the NestLens plan catalog. Enterprise, bundle and group quotes on request.',
  })
}

export const revalidate = 300

const BREADCRUMB_SCHEMA = breadcrumbSchema([{ name: 'NestLens', path: '/nestlens' }, { name: 'Pricing', path: '/nestlens/pricing' }])

const CSS = `
.pp-sec{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:56px;padding:72px 0;border-top:1px solid var(--border)}
.pp-note{font-size:14.5px;color:var(--text3);margin:14px 0 0;max-width:46em}
.pp-jump{display:flex;flex-wrap:wrap;gap:10px 28px;font-size:15px;font-weight:600;margin-top:40px}
`

const Alt = ({ p }: { p: ApiPlan }) => {
  const u = Number(p.priceUSD)
  return p.priceINR && u > 0 ? <small>{usd(u)}</small> : null
}

function Section({ id, title, lead, children }: { id: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="pp-sec" style={{ scrollMarginTop: 120 }}>
      <div><p className="ln-eyebrow" style={{ margin: '0 0 14px' }}>{id.charAt(0).toUpperCase() + id.slice(1)}</p><h2 className="ln-h2" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>{title}</h2>{lead && <p style={{ margin: '16px 0 0' }}>{lead}</p>}</div>
      <div className="ln-scroll">{children}</div>
    </section>
  )
}

export default async function PricingPage() {
  const [c, { plans, live }] = await Promise.all([getContent(), getPlans()])
  const intel = ['atlas_basic', 'atlas_starter', 'atlas_growth', 'atlas_scale'].map((k) => [k, plans.intelligence[k]] as const).filter(([, p]) => p)
  const buyer = plans.exchange.buyer
  const seller = plans.exchange.priority
  const founder = plans.cr.founder_paid_solo
  const cmdIn = plans.cr.fund_bundle
  const cmdGl = plans.cr.fund_bundle_global
  const orbit = ['orbit_launch', 'orbit_starter', 'orbit_growth', 'orbit_scale', 'orbit_enterprise'].map((k) => [k, plans.cr[k]] as const).filter(([, p]) => p)
  const orbitExtra = items(c, 'pricing.orbit.features')
  const extraFor = (name: string) => orbitExtra.filter((x) => x.plan === name).map((x) => x.text).join(' ')
  const hasExtra = orbit.some(([, p]) => extraFor(p.name))

  const offers = [
    ...intel.map(([, p]) => ({ '@type': 'Offer', name: `Atlas ${p.name}`, price: String(p.priceINR ?? 0), priceCurrency: 'INR', url: 'https://labelnest.in/nestlens/pricing', category: 'Atlas' })),
    seller ? { '@type': 'Offer', name: 'Exchange Seller', price: String(seller.priceINR ?? 0), priceCurrency: 'INR', url: 'https://labelnest.in/nestlens/pricing', category: 'Exchange' } : null,
    founder ? { '@type': 'Offer', name: 'Ascent Founder Data Room', price: String(founder.priceINR ?? 0), priceCurrency: 'INR', url: 'https://labelnest.in/nestlens/pricing', category: 'Ascent' } : null,
    cmdIn ? { '@type': 'Offer', name: 'Command, India-domiciled fund, per month', price: String(cmdIn.priceINR ?? 0), priceCurrency: 'INR', url: 'https://labelnest.in/nestlens/pricing', category: 'Command' } : null,
    ...orbit.map(([, p]) => ({ '@type': 'Offer', name: p.name, price: String(p.priceINR ?? 0), priceCurrency: 'INR', url: 'https://labelnest.in/nestlens/pricing', category: 'Orbit' })),
  ].filter(Boolean)
  const PRICING_SCHEMA = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', isPartOf: { '@id': 'https://labelnest.in/nestlens#software' }, name: 'NestLens', offers }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <style>{CSS}</style>
      <Nav />
      <main className="ln-page">
        <NestLensModuleNav />

        <section style={{ padding: '88px 0 56px' }}>
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 48, alignItems: 'end' }}>
            <div><p className="ln-eyebrow ln-rise">Pricing</p><h1 className="ln-h1 ln-rise" style={{ ['--d' as string]: '.1s' }}>{text(c, 'pricing.hero.title')}</h1></div>
            <p className="ln-lead ln-rise" style={{ ['--d' as string]: '.25s', maxWidth: '30em' }}>{text(c, 'pricing.hero.lead')}</p>
          </div>
          <div className="ln-wrap">
            <div className="pp-jump">
              {['atlas', 'exchange', 'command', 'ascent', 'orbit', 'connect'].map((s) => <a key={s} className="ln-tlink" href={`#${s}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</a>)}
            </div>
            {!live && <p className="pp-note" style={{ marginTop: 24 }}>Live pricing is temporarily unavailable, so the figures below may be a few days old. For the latest, <Link className="ln-tlink" href="/contact">ask us</Link> or check NestLens.</p>}
          </div>
        </section>

        <div className="ln-wrap">

          <Section id="atlas" title="Data on funds, companies and people." lead="Billed yearly. Credits unlock records beyond your plan.">
            <table className="ln-tbl"><thead><tr><th>Plan</th><th>Price per year</th><th>Seats</th><th>Exported rows a month</th></tr></thead><tbody>
              {intel.map(([k, p]) => (
                <tr key={k} className={p.popular ? 'hl' : undefined}><td className="nm">{p.name.replace(/^Atlas\s*/, '')}</td><td className="p">{usd(p.priceUSD ?? 0)}<small>{inr(p.priceINR ?? 0)}</small></td><td>{p.seats}</td><td>{num(p.exportsPerMonth)}</td></tr>
              ))}
            </tbody></table>
            <p className="pp-note">{text(c, 'pricing.atlas.note')}</p>
          </Section>

          <Section id="exchange" title="Free to buy. Pay to sell.">
            <table className="ln-tbl"><thead><tr><th>Plan</th><th>Price</th><th>Includes</th></tr></thead><tbody>
              {buyer && <tr><td className="nm">Free</td><td className="p">₹0</td><td>{buyer.jobPostsIncluded} requirements and {buyer.applicationsPerMonth} applications a month, then credits. {text(c, 'pricing.exchange.freeNote')}</td></tr>}
              {seller && <tr className="hl"><td className="nm">Seller</td><td className="p">{inr(seller.priceINR ?? 0)}<Alt p={seller} /><small>a year</small></td><td>{seller.jobPostsIncluded} requirements and {seller.applicationsPerMonth} applications a month. {text(c, 'pricing.exchange.sellerNote')}</td></tr>}
            </tbody></table>
          </Section>

          <Section id="command" title="One package per fund." lead="Billed monthly. No per-LP fees and no multi-year contract.">
            <table className="ln-tbl"><thead><tr><th>Fund domicile</th><th>Price per fund a month</th><th>Ascent data rooms</th></tr></thead><tbody>
              {cmdIn && <tr><td className="nm">India</td><td className="p">{inr(cmdIn.priceINR ?? 0)}</td><td>{num(cmdIn.dataRoomsIncluded)}</td></tr>}
              {cmdGl && <tr><td className="nm">Outside India</td><td className="p">{usd(cmdGl.priceUSD ?? 0)}</td><td>{num(cmdGl.dataRoomsIncluded)}</td></tr>}
            </tbody></table>
            <p className="pp-note">{text(c, 'pricing.command.note')}</p>
          </Section>

          <Section id="ascent" title="A data room for every founder." lead={text(c, 'pricing.ascent.note')}>
            <table className="ln-tbl"><thead><tr><th>Plan</th><th>Price per year</th><th>Includes</th></tr></thead><tbody>
              {founder && <tr className="hl"><td className="nm">{founder.name}</td><td className="p">{inr(founder.priceINR ?? 0)}<small>{usd(founder.priceUSD ?? 0)}{founder.monthlyPriceINR ? ` · or ${inr(founder.monthlyPriceINR)} a month` : ''}</small></td><td>{text(c, 'pricing.ascent.includes')}</td></tr>}
              <tr><td className="nm">A group of startups</td><td className="p" style={{ fontSize: 20 }}>Let&apos;s discuss</td><td>{text(c, 'pricing.ascent.group')} <Link className="ln-tlink" href="/contact">Talk to us</Link></td></tr>
            </tbody></table>
          </Section>

          <Section id="orbit" title="Programmes, with data rooms included." lead="Each plan includes Ascent data rooms for your startups. A room is used when a founder joins one of your cohorts.">
            <table className="ln-tbl"><thead><tr><th>Plan</th><th>Price per year</th><th>Ascent rooms included</th>{hasExtra && <th>Also includes</th>}</tr></thead><tbody>
              {orbit.map(([k, p]) => (
                <tr key={k} className={p.popular ? 'hl' : undefined}><td className="nm">{p.name.replace(/^Orbit\s*/, '')}</td><td className="p">{inr(p.priceINR ?? 0)}</td><td>{unlimited(p.dataRoomsIncluded) ? 'Unlimited' : p.dataRoomsIncluded}</td>{hasExtra && <td>{extraFor(p.name)}</td>}</tr>
              ))}
            </tbody></table>
            <p className="pp-note">{text(c, 'pricing.orbit.note')}</p>
          </Section>

          <Section id="connect" title="Included.">
            <table className="ln-tbl"><tbody>
              <tr><td className="nm">Founders and funds</td><td>{text(c, 'pricing.connect.founders')}</td></tr>
              <tr><td className="nm">Mentors and audit partners</td><td>{text(c, 'pricing.connect.partners')}</td></tr>
            </tbody></table>
          </Section>
        </div>

        <section className="ln-night ln-sec" style={{ padding: '96px 0' }}>
          <div className="ln-wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 40 }}>
            <div style={{ maxWidth: '30em' }}><h2 className="ln-h2">{text(c, 'pricing.cta.title')}</h2><p className="ln-lead" style={{ margin: '18px 0 0' }}>{text(c, 'pricing.cta.lead')}</p></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}><Link className="ln-btn light" href="/contact">Talk to us</Link><a className="ln-btn lightline" href="https://nestlens.labelnest.in/pricing">Subscribe in NestLens</a></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
