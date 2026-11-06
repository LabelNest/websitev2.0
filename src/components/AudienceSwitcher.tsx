'use client'
import { useState } from 'react'
import Link from 'next/link'

export interface Audience { who: string; line: string; points: string; products: string; href: string; cta: string }

// "I am a ..." switcher. Content comes from the admin-editable registry (home.switch.items).
export default function AudienceSwitcher({ items, eyebrow, title }: { items: Audience[]; eyebrow: string; title: string }) {
  const [i, setI] = useState(0)
  const a = items[i]
  if (!a) return null
  const pts = a.points.split('\n').map((p) => p.trim()).filter(Boolean)
  return (
    <section className="ln-night ln-sec">
      <style>{`
.as-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:36px 0 0}
.as-tab{font:600 15px var(--font-sans),sans-serif;padding:11px 20px;border:1px solid #34475f;background:transparent;color:var(--mutenight);cursor:pointer;border-radius:2px;transition:background .2s,color .2s,border-color .2s}
.as-tab:hover{color:var(--onnight);border-color:var(--onnight)}
.as-tab[aria-selected="true"]{background:var(--onnight);color:var(--night);border-color:var(--onnight)}
.as-body{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:56px;margin-top:48px;border-top:1px solid #2a3b55;padding-top:44px}
.as-pts{margin:0;padding:0;list-style:none;display:grid;gap:16px}
.as-pts li{padding-left:22px;position:relative;color:var(--onnight);font-size:17px;line-height:1.5}
.as-pts li::before{content:"";position:absolute;left:0;top:.8em;width:10px;border-top:2px solid #B58A3C}
@media (prefers-reduced-motion:no-preference){.as-body>*{animation:asin .35s ease both}@keyframes asin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}}
`}</style>
      <div className="ln-wrap">
        <p className="ln-eyebrow">{eyebrow}</p>
        <h2 className="ln-h2" style={{ maxWidth: '14em' }}>{title}</h2>
        <div className="as-tabs" role="tablist" aria-label="Who you are">
          {items.map((x, k) => (
            <button key={x.who} role="tab" id={`as-t${k}`} aria-selected={k === i} aria-controls="as-panel" className="as-tab" onClick={() => setI(k)}>{x.who}</button>
          ))}
        </div>
        <div className="as-body" role="tabpanel" id="as-panel" aria-labelledby={`as-t${i}`} key={i}>
          <div>
            <p className="ln-serif" style={{ fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.15, margin: 0 }}>{a.line}</p>
            <p style={{ margin: '24px 0 0', color: 'var(--mutenight)' }}>Uses: <b style={{ color: 'var(--onnight)' }}>{a.products}</b></p>
            <p style={{ margin: '28px 0 0' }}><Link className="ln-btn light" href={a.href || '/who-we-serve'}>{a.cta}</Link></p>
          </div>
          <ul className="as-pts">{pts.map((p, k) => <li key={k}>{p}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}
