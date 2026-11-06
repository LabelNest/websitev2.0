'use client'
import { useEffect, useState } from 'react'
import type { PlanCatalog, AtlasStats } from '@/lib/plans'

// What the public site is showing for prices right now. Read-only on purpose: prices have one home, the NestLens plan catalog.

interface Payload { plans: PlanCatalog; live: boolean; stats: AtlasStats }

const GROUPS: { key: keyof PlanCatalog; title: string; site: string }[] = [
  { key: 'intelligence', title: 'Atlas', site: '/nestlens/pricing#atlas' },
  { key: 'exchange', title: 'Exchange', site: '/nestlens/pricing#exchange' },
  { key: 'cr', title: 'Ascent, Command and Orbit', site: '/nestlens/pricing#orbit' },
]

const inr = (n?: number) => (n ? `₹${Math.round(n).toLocaleString('en-IN')}` : '')
const usd = (n?: number | string) => (Number(n) > 0 ? `$${Number(n).toLocaleString('en-US')}` : '')

export default function PricingPreview() {
  const [d, setD] = useState<Payload | null>(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    fetch('/api/admin/pricing').then((r) => (r.ok ? r.json() : Promise.reject())).then(setD).catch(() => setErr('Could not read the plan catalog.'))
  }, [])

  const th: React.CSSProperties = { textAlign: 'left', fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', padding: '10px 14px 10px 0', borderBottom: '1px solid var(--text)', fontWeight: 600 }
  const td: React.CSSProperties = { padding: '12px 14px 12px 0', borderBottom: '1px solid var(--border)', fontSize: 14, color: 'var(--text2)', verticalAlign: 'top' }

  return (
    <div style={{ maxWidth: 880 }}>
      <div style={{ fontFamily: 'var(--font-serif),Georgia,serif', fontSize: 28, color: 'var(--text)', letterSpacing: '-.01em' }}>Pricing and numbers</div>
      <p style={{ fontSize: 14, color: 'var(--text2)', margin: '6px 0 20px', maxWidth: '44em' }}>This is what the public site shows right now. It is read live from NestLens and refreshes every few minutes, so a price changed in NestLens reaches the website on its own. To change a price or a plan, edit it in the NestLens admin.</p>

      {err && <p style={{ color: '#9B2C2C' }}>{err}</p>}
      {!d && !err && <p style={{ color: 'var(--text3)' }}>Loading…</p>}
      {d && (
        <>
          <div style={{ border: `1px solid ${d.live ? 'var(--green)' : 'var(--orange)'}`, background: 'var(--surface)', padding: '12px 16px', marginBottom: 24, fontSize: 14, color: 'var(--text)' }}>
            {d.live ? <><b style={{ color: 'var(--green)' }}>Live.</b> The site is reading NestLens right now.</> : <><b style={{ color: 'var(--orange)' }}>Using the backup copy.</b> NestLens could not be reached, so the site is showing the last known prices.</>}
            <a href="https://nestlens.labelnest.in/admin" target="_blank" rel="noreferrer" style={{ marginLeft: 12, color: 'var(--pink)', fontWeight: 600 }}>Open NestLens admin ↗</a>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', fontWeight: 600, marginBottom: 8 }}>Headline numbers on the home page</div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', fontFamily: 'var(--font-serif),Georgia,serif', fontSize: 28, color: 'var(--text)' }}>
              <span>{d.stats.funds} <small style={{ fontFamily: 'var(--font-sans),sans-serif', fontSize: 13, color: 'var(--text3)' }}>funds</small></span>
              <span>{d.stats.companies} <small style={{ fontFamily: 'var(--font-sans),sans-serif', fontSize: 13, color: 'var(--text3)' }}>companies</small></span>
              <span>{d.stats.people} <small style={{ fontFamily: 'var(--font-sans),sans-serif', fontSize: 13, color: 'var(--text3)' }}>people</small></span>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text3)', margin: '6px 0 0' }}>Counted from Atlas and rounded down to the nearest thousand. To show different figures, use Page content → Home → Numbers.</p>
          </div>

          {GROUPS.map((g) => (
            <div key={g.key} style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-serif),Georgia,serif', fontSize: 22, color: 'var(--text)' }}>{g.title}</span>
                <a href={g.site} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'var(--pink)', fontWeight: 600 }}>See on the site ↗</a>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={th}>Plan</th><th style={th}>Rupees</th><th style={th}>Dollars</th><th style={th}>Billed</th><th style={th}>Data rooms</th></tr></thead>
                <tbody>
                  {Object.entries(d.plans[g.key]).map(([k, p]) => (
                    <tr key={k}>
                      <td style={{ ...td, color: 'var(--text)', fontWeight: 600 }}>{p.name}{p.popular ? ' ·  most chosen' : ''}</td>
                      <td style={td}>{p.isCustomPricing ? 'Custom' : inr(p.priceINR) || '—'}</td>
                      <td style={td}>{p.isCustomPricing ? 'Custom' : usd(p.priceUSD) || '—'}</td>
                      <td style={td}>{p.billing === 'month' ? 'Monthly' : p.billing === 'custom' ? 'Quote' : 'Yearly'}</td>
                      <td style={td}>{p.dataRoomsIncluded ? (p.dataRoomsIncluded >= 999999 ? 'Unlimited' : p.dataRoomsIncluded) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
