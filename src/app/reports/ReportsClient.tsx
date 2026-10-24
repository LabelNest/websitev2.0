'use client'
import { useState } from 'react'
import Link from 'next/link'
import { submitSignup } from '@/lib/signupContext'

export default function ReportsClient() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubscribe() {
    if (!email || !email.includes('@')) return
    setState('sending')
    try {
      // list 'report-series' keeps report readers apart from other subscribers; the page's
      // utm tags (set on the report links) record which volume sent them.
      setState((await submitSignup(email, 'reports_page', 'report-series')) ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', color: 'var(--text)' }}>
      <nav style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <Link href="/" style={{ fontWeight: 700, color: 'var(--text)' }}>LabelNest</Link>
        <Link href="/" style={{ fontSize: 13.5, color: 'var(--text3)' }}>← Back to LabelNest</Link>
      </nav>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ maxWidth: 540, width: '100%' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 20 }}>
            LabelNest research series
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06, marginBottom: 16 }}>
            Get each new report when it is published.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text2)', marginBottom: 12 }}>
            Data-led reports on India's private-capital ecosystem, every figure drawn from the LabelNest Atlas and dated. Volume 1 covers the AIF universe, Volume 2 the ecosystem builders, and Volume 3 the whole capital chain.
          </p>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--text3)', marginBottom: 32 }}>
            One email per new volume or correction. No other mail.
          </p>

          {state === 'done' ? (
            <div style={{ fontSize: 16, color: 'var(--text)' }}>You are subscribed. We will write when the next volume is out.</div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSubscribe() }}
                  style={{ flex: '1 1 240px', minWidth: 0, background: 'var(--surface)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 11, padding: '13px 18px', fontSize: 15, color: 'var(--text)', outline: 'none' }}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={state === 'sending'}
                  style={{ background: '#7C3AED', color: '#fff', border: 'none', borderRadius: 11, padding: '13px 22px', fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}
                >
                  {state === 'sending' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </div>
              {state === 'error' && (
                <div style={{ marginTop: 12, fontSize: 13.5, color: 'var(--text2)' }}>
                  That did not go through. Please try again, or write to nestlens@labelnest.in.
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,.06)', fontSize: 12, color: 'var(--text3)' }}>
        © 2026 LabelNest India Private Limited
      </footer>
    </div>
  )
}
