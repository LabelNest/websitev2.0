'use client'
import { useState } from 'react'
import Link from 'next/link'

export interface TabData {
  id: string
  title: string
  tagline: string
  lead: string
  steps: { title: string; body: string }[]
  syncs: string
  stays: string
  control: string
  links: { label: string; href: string; primary?: boolean }[]
}

const CSS = `
.et-tabs{display:flex;flex-wrap:wrap;gap:0 24px;margin-top:48px}
.et-tab{flex:1;min-width:240px;text-align:left;background:none;border:0;border-top:3px solid var(--border);padding:18px 20px 22px 0;cursor:pointer;font-family:var(--font-serif),Georgia,serif;font-size:28px;line-height:1.15;color:var(--text3);letter-spacing:-.01em}
.et-tab small{display:block;font:500 14px var(--font-sans),sans-serif;margin-top:6px;letter-spacing:0}
.et-tab[aria-selected="true"]{border-top-color:var(--text);color:var(--text)}
.et-step{display:grid;grid-template-columns:44px 1fr;gap:10px;padding:20px 0;border-top:1px solid var(--border)}
.et-step:last-child{border-bottom:1px solid var(--border)}
.et-step .n{font-family:var(--font-serif),serif;font-size:22px;color:var(--pink)}
.et-step h4{font-family:var(--font-serif),serif;font-weight:400;font-size:24px;color:var(--text);margin:0 0 4px}
.et-step p{margin:0;font-size:16px}
.et-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));border-top:1px solid var(--text)}
.et-two>div{padding:22px 28px 22px 0}
.et-two>div+div{padding-left:28px;border-left:1px solid var(--border)}
.et-two h4,.et-ctl h4{font:600 12px var(--font-sans),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--pink);margin:0 0 8px}
.et-ctl{margin-top:36px;padding:24px;border:1px solid var(--bord2);background:var(--surface)}
`

export default function EcosystemTabs({ tabs }: { tabs: TabData[] }) {
  const [active, setActive] = useState(tabs[0]?.id)
  const tab = tabs.find((t) => t.id === active) ?? tabs[0]
  if (!tab) return null

  return (
    <div>
      <style>{CSS}</style>
      <div className="et-tabs" role="tablist" aria-label="The three pairings">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={t.id === active} className="et-tab" onClick={() => setActive(t.id)}>
            {t.title}<small>{t.tagline}</small>
          </button>
        ))}
      </div>

      <div role="tabpanel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 72, marginTop: 56 }}>
        <div>
          <h3 className="ln-h2" style={{ fontSize: 'clamp(30px,3.4vw,44px)' }}>{tab.title}</h3>
          <p className="ln-lead" style={{ margin: '18px 0 28px' }}>{tab.lead}</p>
          {tab.steps.map((s, i) => (
            <div className="et-step" key={i}><span className="n">0{i + 1}</span><div><h4>{s.title}</h4><p>{s.body}</p></div></div>
          ))}
        </div>
        <div>
          <div className="et-two">
            <div><h4>What syncs</h4><p style={{ margin: 0 }}>{tab.syncs}</p></div>
            <div><h4>What stays put</h4><p style={{ margin: 0 }}>{tab.stays}</p></div>
          </div>
          <div className="et-ctl"><h4>Who is in control</h4><p style={{ margin: 0 }}>{tab.control}</p></div>
          <p style={{ margin: '30px 0 0', display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {tab.links.map((l) => l.primary
              ? <Link key={l.label} className="ln-btn" href={l.href}>{l.label}</Link>
              : <Link key={l.label} className="ln-tlink" style={{ alignSelf: 'center' }} href={l.href}>{l.label}</Link>)}
          </p>
        </div>
      </div>
    </div>
  )
}
