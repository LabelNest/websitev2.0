'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignalPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSignal() {
    if (!email || !email.includes('@')) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'signal-page' }),
      })
    } catch {
      // best-effort
    }
    setSubmitted(true)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', color: 'var(--text)' }}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
        .lock-anim{animation:pulse 3s ease-in-out infinite}
        .blink-dot{animation:blink 2s ease-in-out infinite}
        .signal-input{background:var(--surface);border:1px solid rgba(255,255,255,.1);border-radius:11px;padding:13px 18px;font-size:15px;color:var(--text);outline:none;font-family:'Inter',sans-serif;transition:border-color .15s;width:100%}
        .signal-input:focus{border-color:#7C3AED}
        .signal-input::placeholder{color:var(--text3)}
        .signal-btn{background:#7C3AED;color:#fff;border:none;border-radius:11px;padding:13px 22px;font-size:14.5px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;white-space:nowrap;flex-shrink:0}
        .signal-btn:hover{opacity:.88}
      `}</style>

      {/* Minimal nav */}
      <nav style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/logo.jpg" alt="LabelNest" width={36} height={36} style={{ borderRadius: 6, objectFit: 'contain' }}
            onError={() => {}} />
        </Link>
        <Link href="/" style={{ fontSize: 13.5, color: 'var(--text3)' }}>← Back to LabelNest</Link>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        {!submitted ? (
          <div style={{ maxWidth: 540, width: '100%', textAlign: 'center' }}>
            <div className="lock-anim" style={{ fontSize: 64, marginBottom: 28 }}>🔒</div>

            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span className="blink-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED', display: 'inline-block' }} />
              Something is being built · LabelNest · Aug 2026
            </div>

            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(36px,6vw,62px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.04, color: 'var(--text)', marginBottom: 16 }}>
              No name.<br />No branding.<br />
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>Not yet.</span>
            </h1>

            <p style={{ fontSize: 'clamp(15px,1.8vw,17.5px)', lineHeight: 1.74, color: 'var(--text2)', marginBottom: 14, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
              We are building something for private markets that does not exist yet.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--text3)', marginBottom: 36, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
              If you are in the room when capital decisions get made — you will want to know about this first.
            </p>

            <div style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto 16px' }}>
              <input
                type="email"
                className="signal-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSignal() }}
              />
              <button className="signal-btn" onClick={handleSignal}>Get signal</button>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)' }}>No spam. One email when it is ready.</div>
          </div>
        ) : (
          <div style={{ maxWidth: 420, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 20 }}>✅</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 26, color: 'var(--text)', marginBottom: 10 }}>You are on the list</div>
            <div style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 8 }}>One email when it is ready. No spam before that.</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)' }}>LabelNest · Building in public since Nov 2025</div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ padding: '20px 48px', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>© 2026 LabelNest India Private Limited</span>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>Data Done, Right.</span>
      </footer>
    </div>
  )
}
