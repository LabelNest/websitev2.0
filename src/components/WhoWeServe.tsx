'use client'

import Link from 'next/link'
import { PERSONAS, ATLAS_NOTE, WHO_WE_SERVE_TAGLINE, PersonaKey, VS_CATEGORY_TO_PERSONAS } from '@/lib/personas'

// Four presentations of the same PERSONAS data -- see src/lib/personas.ts
// for the single source of truth. Edit copy/routing there; these are
// layout only.
//
// - WhoWeServeTopBar -- homepage, a full-width strip directly under Nav /
//   DiyBanner and above the Hero -- above the fold on any screen size,
//   unlike the old in-hero placement which sat below a 100vh animated
//   tagline and needed a scroll to reach. Full persona labels (not
//   truncated), each a direct link.
// - WhoWeServeCards  -- the dedicated /who-we-serve page
// - WhoWeServeTable  -- /ecosystem, under its hero
// - WhoWeServeBanner -- every /vs/[slug] page via VsPageLayout.tsx,
//   category-aware (highlights the persona(s) relevant to that comparison)

export function WhoWeServeTopBar() {
  return (
    <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)', padding: '14px 48px' }}>
      <div className="flex items-center flex-wrap" style={{ maxWidth: 1300, margin: '0 auto', gap: 14, justifyContent: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flexShrink: 0, whiteSpace: 'nowrap' }}>
          Different players, one ecosystem — <span style={{ fontWeight: 400, color: 'var(--text2)' }}>find yourself:</span>
        </div>
        <div className="flex items-center flex-wrap justify-center" style={{ gap: 8 }}>
          {PERSONAS.map(p => (
            <Link
              key={p.key}
              href={p.stackHref}
              className="inline-flex items-center gap-1.5 transition-all hover:-translate-y-0.5"
              style={{
                fontSize: 12.5, fontWeight: 600, letterSpacing: '.01em',
                padding: '7px 13px', borderRadius: 100, border: '1px solid var(--bord2)',
                background: 'var(--surface)', color: 'var(--text2)', textDecoration: 'none', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.color = p.color }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bord2)'; e.currentTarget.style.color = 'var(--text2)' }}
            >
              <span>{p.icon}</span>{p.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WhoWeServeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
      {PERSONAS.map(p => (
        <Link key={p.key} href={p.stackHref}
          className="relative overflow-hidden transition-all duration-200 hover:-translate-y-1.5 block"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 28 }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = p.color)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
          <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: p.color, opacity: .8 }} />
          <div style={{ fontSize: 26, marginBottom: 12, lineHeight: 1 }}>{p.icon}</div>
          <div className="font-display font-extrabold" style={{ fontSize: 19, letterSpacing: '-.015em', color: 'var(--text)', marginBottom: 6 }}>{p.label}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: p.color, marginBottom: 12 }}>{p.stack}</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--text2)', marginBottom: 16 }}>{p.blurb}</p>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: p.color }}>{p.cta} →</div>
        </Link>
      ))}
    </div>
  )
}

export function WhoWeServeAtlasNote() {
  return (
    <div style={{
      background: 'linear-gradient(135deg,rgba(37,99,235,.06),rgba(233,30,140,.03))',
      border: '1px solid rgba(37,99,235,.16)', borderLeft: '3px solid #2563EB',
      borderRadius: '0 12px 12px 0', padding: '20px 24px', marginBottom: 32,
    }}>
      <div className="font-display font-extrabold" style={{ fontSize: 15, color: 'var(--text)', marginBottom: 6 }}>🔭 {ATLAS_NOTE.title}</div>
      <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{ATLAS_NOTE.body}</div>
    </div>
  )
}

export function WhoWeServeTable() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', minWidth: 480, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, borderCollapse: 'separate', borderSpacing: 0, overflow: 'hidden' }}>
        <thead>
          <tr>
            <th style={{ padding: '14px 20px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'left', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>You are a…</th>
            <th style={{ padding: '14px 20px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', textAlign: 'left', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>Start here</th>
          </tr>
        </thead>
        <tbody>
          {PERSONAS.map((p, i) => (
            <tr key={p.key}>
              <td style={{ padding: '13px 20px', fontSize: 13.5, fontWeight: 600, color: 'var(--text)', borderBottom: i === PERSONAS.length - 1 ? 'none' : '1px solid var(--border)' }}>{p.icon} {p.label}</td>
              <td style={{ padding: '13px 20px', borderBottom: i === PERSONAS.length - 1 ? 'none' : '1px solid var(--border)' }}>
                <Link href={p.stackHref} style={{ fontSize: 13.5, fontWeight: 600, color: p.color, textDecoration: 'none' }}>{p.stack} →</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ fontSize: 12.5, color: 'var(--text3)', marginTop: 14, fontStyle: 'italic' }}>{WHO_WE_SERVE_TAGLINE}</div>
    </div>
  )
}

// category comes from VsPageLayout's VsCategory ('nesthr' is never passed
// here -- callers skip rendering this banner entirely for that category).
export function WhoWeServeBanner({ category }: { category: string }) {
  const highlightKeys = VS_CATEGORY_TO_PERSONAS[category] ?? []
  if (highlightKeys.length === 0) return null
  const highlighted = new Set<PersonaKey>(highlightKeys)

  return (
    <section style={{ padding: '40px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>Who this comparison is for</div>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {PERSONAS.map(p => {
            const lit = highlighted.has(p.key)
            return (
              <Link key={p.key} href={p.stackHref}
                className="inline-flex items-center gap-2 transition-all"
                style={{
                  fontSize: 12.5, fontWeight: lit ? 700 : 500, padding: '7px 13px', borderRadius: 100,
                  textDecoration: 'none',
                  background: lit ? `${p.color}18` : 'var(--bg3)',
                  border: lit ? `1px solid ${p.color}55` : '1px solid var(--bord2)',
                  color: lit ? p.color : 'var(--text3)',
                  opacity: lit ? 1 : .7,
                }}>
                <span>{p.icon}</span>{p.label}
              </Link>
            )
          })}
        </div>
        <Link href="/who-we-serve" style={{ display: 'inline-block', marginTop: 14, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text3)' }}>
          See the full breakdown →
        </Link>
      </div>
    </section>
  )
}
