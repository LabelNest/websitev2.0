'use client'
import { useState } from 'react'
import Link from 'next/link'
import PortalMock from '@/components/PortalMock'

// One replica of each portal, picked by tab. Used on the home page and the product hub.
export const SHOWCASE_MOCKS: Record<string, string> = {
  atlas: 'atlas-explore', exchange: 'exchange-marketplace', command: 'command-fund', ascent: 'ascent-readiness',
  orbit: 'orbit-workspace', connect: 'connect-mentors', nesthr: 'nesthr-modules', sentinel: 'sentinel-risk',
}
export interface ShowItem { name: string; text: string; href: string }

export default function ProductShowcase({ items }: { items: ShowItem[] }) {
  const list = items.filter((x) => SHOWCASE_MOCKS[x.name.toLowerCase()])
  const [i, setI] = useState(0)
  const a = list[i]
  if (!a) return null
  return (
    <div style={{ marginTop: 64 }}>
      <style>{`
.ps-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 28px}
.ps-tab{font:600 15px var(--font-sans),sans-serif;padding:10px 18px;border:1px solid var(--bord2);background:transparent;color:var(--text2);cursor:pointer;border-radius:2px;transition:background .2s,color .2s}
.ps-tab:hover{color:var(--text)}
.ps-tab[aria-selected="true"]{background:var(--text);color:var(--bg);border-color:var(--text)}
.ps-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:40px;align-items:center}
.ps-view{border:1px solid var(--bord2);box-shadow:0 30px 60px -30px rgba(14,27,46,.3);line-height:0}
@media (max-width:860px){.ps-body{grid-template-columns:1fr}}
`}</style>
      <div className="ps-tabs" role="tablist" aria-label="Products">
        {list.map((x, k) => <button key={x.name} role="tab" aria-selected={k === i} className="ps-tab" onClick={() => setI(k)}>{x.name}</button>)}
      </div>
      <div className="ps-body">
        <div>
          <p className="ln-serif" style={{ fontSize: 'clamp(26px,3vw,36px)', lineHeight: 1.15, margin: 0 }}>{a.name}</p>
          <p style={{ margin: '16px 0 24px' }}>{a.text}</p>
          <Link className="ln-tlink" href={a.href}>See {a.name}</Link>
        </div>
        <div className="ps-view" key={a.name}><PortalMock id={SHOWCASE_MOCKS[a.name.toLowerCase()]} alt={`${a.name} portal`} /></div>
      </div>
    </div>
  )
}
