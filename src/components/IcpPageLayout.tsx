'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { IcpPageData } from '@/lib/icpPages'
import { renderIcpDiagram } from '@/lib/icpConnections'
import { WhoWeServeTopBar } from '@/components/WhoWeServe'

// Renders every /who-we-serve/[slug] page from one IcpPageData object --
// same "data object -> shared layout" pattern as VsPageLayout.tsx for the
// /vs/[slug] pages. See src/lib/icpPages.ts for the content and the
// per-entry comment naming which real product page each claim is sourced
// from.
//
// productTabs is always the diagram's center product plus its satellite
// nodes, same set and order -- clicking a tab shows that product's own
// capabilities instead of stacking every product's capabilities in one
// long scroll.

export default function IcpPageLayout(d: IcpPageData) {
  const diagramSvg = renderIcpDiagram(d.diagramCenter, d.diagramNodes, d.diagramFooter)
  const [activeTab, setActiveTab] = useState(0)
  const active = d.productTabs[activeTab]

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <WhoWeServeTopBar />

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>{d.eyebrow}</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06, color: 'var(--text)', marginBottom: 16, maxWidth: 760 }}>{d.h1}</h1>
            <p style={{ fontSize: 16, lineHeight: 1.74, color: 'var(--text2)', maxWidth: 680, marginBottom: 28 }}>{d.subhead}</p>
            <a href={d.primaryCtaHref} target={d.primaryCtaHref.startsWith('http') ? '_blank' : undefined} rel={d.primaryCtaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: d.diagramCenter.color, color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11, textDecoration: 'none' }}>
              {d.primaryCtaLabel} {d.primaryCtaHref.startsWith('/nestlens') ? '→' : '↗'}
            </a>
          </div>
        </section>

        {/* ANIMATED DIAGRAM */}
        <section style={{ padding: '56px 48px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }} dangerouslySetInnerHTML={{ __html: diagramSvg }} />
        </section>

        {/* JOURNEY */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>How it connects</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 28 }}>{d.journeyHeading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {d.journey.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, paddingBottom: i === d.journey.length - 1 ? 0 : 22, position: 'relative' }}>
                  {i !== d.journey.length - 1 && (
                    <div style={{ position: 'absolute', left: 15, top: 34, bottom: 0, width: 1, background: 'var(--border)' }} />
                  )}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${step.color}18`, border: `1.5px solid ${step.color}`, color: step.color, fontSize: 12, fontWeight: 700, zIndex: 1,
                  }}>{i + 1}</div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: step.color, marginBottom: 5 }}>{step.product}</div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.68, color: 'var(--text2)' }}>{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES -- tabbed by product */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>{d.capabilitiesHeading}</div>

            <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 28 }}>
              {d.productTabs.map((tab, i) => {
                const isActive = i === activeTab
                return (
                  <button key={tab.product} onClick={() => setActiveTab(i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
                      padding: '9px 18px', borderRadius: 10, fontFamily: 'inherit',
                      background: isActive ? `${tab.color}18` : 'var(--surface)',
                      border: isActive ? `1px solid ${tab.color}` : '1px solid var(--border)',
                      color: isActive ? tab.color : 'var(--text2)',
                    }}>
                    {tab.product}
                  </button>
                )
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14, marginBottom: 20 }}>
              {active.capabilities.map(c => (
                <div key={c.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, borderLeft: `3px solid ${active.color}`, padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>{c.icon}</span>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14.5, color: 'var(--text)' }}>{c.name}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text2)' }}>{c.desc}</p>
                </div>
              ))}
            </div>
            <Link href={active.href} style={{ fontSize: 13, fontWeight: 600, color: active.color, textDecoration: 'none' }}>Open {active.product} →</Link>
          </div>
        </section>

        {/* RELATED PERSONAS */}
        <section className="border-t text-center" style={{ padding: '72px 48px', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>One connected ecosystem</div>
            <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(22px,3vw,32px)', letterSpacing: '-.025em', lineHeight: 1.1, color: 'var(--text)', marginBottom: 24 }}>
              See how it looks from the other side.
            </h2>
            <div className="flex items-center justify-center flex-wrap" style={{ gap: 12 }}>
              {d.related.map(r => (
                <Link key={r.slug} href={`/who-we-serve/${r.slug}`}
                  className="inline-flex items-center gap-2 font-medium transition-all hover:-translate-y-0.5"
                  style={{ fontSize: 14, padding: '12px 22px', borderRadius: 11, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--bord2)', textDecoration: 'none' }}>
                  {r.label} →
                </Link>
              ))}
              <Link href="/who-we-serve" style={{ fontSize: 13, color: 'var(--text3)', marginLeft: 4 }}>All personas →</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
