import Link from 'next/link'
import { getPlans, inr, usd, num, unlimited, type ApiPlan } from '@/lib/plans'

// The pricing block on each product page. Every number is read from the NestLens plan catalog, so a product page
// can never disagree with /nestlens/pricing or with NestLens itself.

type Module = 'atlas' | 'exchange' | 'ascent' | 'command' | 'orbit'

interface Card { key: string; name: string; main: string; alt?: string; unit?: string; lines: string[]; popular?: boolean; custom?: boolean }

const card = (key: string, p: ApiPlan, lines: string[], opts: { name?: string; unit?: string; currency?: 'INR' | 'USD' } = {}): Card => {
  const useUsd = opts.currency === 'USD' || (!p.priceINR && Number(p.priceUSD) > 0)
  const main = p.isCustomPricing ? 'Custom' : useUsd ? usd(p.priceUSD ?? 0) : p.priceINR ? inr(p.priceINR) : 'Free'
  const alt = !useUsd && Number(p.priceUSD) > 0 && p.priceINR ? usd(p.priceUSD ?? 0) : undefined
  return { key, name: opts.name ?? p.name, main, alt, unit: p.isCustomPricing ? undefined : opts.unit, lines, popular: p.popular, custom: p.isCustomPricing }
}

export default async function PlanSection({ module }: { module: Module }) {
  const { plans } = await getPlans()
  let title = ''
  let cards: Card[] = []

  if (module === 'atlas') {
    title = 'Four tiers, billed annually.'
    cards = ['atlas_basic', 'atlas_starter', 'atlas_growth', 'atlas_scale']
      .filter((k) => plans.intelligence[k])
      .map((k) => { const p = plans.intelligence[k]; return card(k, p, [`${p.seats} seat${p.seats === 1 ? '' : 's'}`, `${unlimited(p.exportsPerMonth) ? 'Unlimited' : num(p.exportsPerMonth)} exported rows a month`], { name: p.name.replace(/^Atlas\s*/, ''), unit: ' a year', currency: 'USD' }) })
    if (plans.intelligence.enterprise) cards.push(card('enterprise', plans.intelligence.enterprise, ['Custom seats, rows and alerts', 'An SLA']))
  } else if (module === 'exchange') {
    title = 'Free to buy. Pay to sell.'
    const b = plans.exchange.buyer, s = plans.exchange.priority, e = plans.exchange.enterprise
    if (b) cards.push(card('buyer', b, [`${b.jobPostsIncluded} requirements and ${b.applicationsPerMonth} applications a month`, 'Then credits. No subscription needed'], { name: 'Free' }))
    if (s) cards.push(card('priority', s, [`${s.jobPostsIncluded} requirements and ${s.applicationsPerMonth} applications a month`, 'For an active seller listing'], { name: 'Seller', unit: ' a year' }))
    if (e) cards.push(card('enterprise', e, ['High-volume buyer or seller', 'Custom credit arrangements']))
  } else if (module === 'ascent') {
    title = 'For founders raising capital.'
    const f = plans.cr.founder_paid_solo
    if (f) cards.push(card('founder', f, ['Every section, sharing links and analytics', 'Unlimited readiness audits', 'A free mentor introduction call', f.monthlyPriceINR ? `Or ${inr(f.monthlyPriceINR)} a month` : ''].filter(Boolean), { unit: ' a year' }))
    cards.push({ key: 'group', name: 'A group of startups', main: "Let's discuss", lines: ['One price for a cohort, a network or a portfolio'], custom: true })
    cards.push({ key: 'free', name: 'Start free', main: '30 days', lines: ['Full access for every new account', 'Then read-only unless you subscribe'] })
  } else if (module === 'command') {
    title = 'One package per fund, billed monthly.'
    const i = plans.cr.fund_bundle, g = plans.cr.fund_bundle_global
    if (i) cards.push(card('india', i, ['Every feature', `${num(i.dataRoomsIncluded)} Ascent data rooms for your portfolio`], { name: 'India-domiciled fund', unit: ' per fund a month' }))
    if (g) cards.push(card('global', g, ['The same package, billed in USD', `${num(g.dataRoomsIncluded)} Ascent data rooms for your portfolio`], { name: 'Fund outside India', unit: ' per fund a month' }))
    cards.push({ key: 'ent', name: 'Enterprise', main: 'Custom', lines: ['Several funds, custom room counts and an SLA'], custom: true })
  } else {
    title = 'Programmes, with data rooms included.'
    cards = ['orbit_launch', 'orbit_starter', 'orbit_growth', 'orbit_scale', 'orbit_enterprise']
      .filter((k) => plans.cr[k])
      .map((k) => { const p = plans.cr[k]; return card(k, p, [`${unlimited(p.dataRoomsIncluded) ? 'Unlimited' : num(p.dataRoomsIncluded)} Ascent data rooms for your startups`], { name: p.name.replace(/^Orbit\s*/, ''), unit: ' a year' }) })
  }

  return (
    <section style={{ padding: '72px 48px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p className="ln-eyebrow" style={{ margin: '0 0 14px' }}>Pricing</p>
          <h2 className="ln-h2" style={{ fontSize: 'clamp(26px,3vw,38px)' }}>{title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {cards.map((c) => (
            <div key={c.key} style={{ background: 'var(--surface)', border: `1px solid ${c.popular ? 'var(--text)' : 'var(--bord2)'}`, padding: 22, position: 'relative' }}>
              {c.popular && <div style={{ position: 'absolute', top: -10, left: 18, background: 'var(--text)', color: 'var(--bg)', font: '600 11px var(--font-sans),sans-serif', letterSpacing: '.06em', textTransform: 'uppercase', padding: '3px 10px' }}>Most chosen</div>}
              <div style={{ font: '600 15px var(--font-sans),sans-serif', color: 'var(--text)', marginBottom: 10 }}>{c.name}</div>
              <div style={{ marginBottom: 12 }}>
                <span className="ln-serif" style={{ fontSize: c.custom ? 24 : 30 }}>{c.main}</span>
                {c.unit && <span style={{ fontSize: 12.5, color: 'var(--text3)' }}>{c.unit}</span>}
                {c.alt && <div style={{ fontSize: 13, color: 'var(--text3)' }}>{c.alt}</div>}
              </div>
              {c.lines.map((l) => <div key={l} style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.55 }}>{l}</div>)}
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text3)', marginTop: 26 }}>
          <Link href="/nestlens/pricing" className="ln-tlink">See every plan and price</Link>
        </p>
      </div>
    </section>
  )
}
