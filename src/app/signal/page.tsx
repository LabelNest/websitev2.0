'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function SignalPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'signal-page' }),
    })
    setSent(true)
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center px-8" style={{ paddingTop: '60px' }}>
        <div className="max-w-[560px] w-full text-center">
          <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-6" style={{ color: 'var(--text3)' }}>
            Something is being built
          </div>
          <h1 className="font-display font-extrabold tracking-tight leading-[1.04] mb-5"
            style={{ fontSize: 'clamp(36px,5vw,58px)', color: 'var(--text)' }}>
            🔒
          </h1>
          <div className="font-display font-extrabold tracking-tight leading-[1.04] mb-5"
            style={{ fontSize: 'clamp(24px,3.5vw,42px)', color: 'var(--text)' }}>
            No name. No branding.
            <br />
            <span style={{ fontWeight: 300, color: 'var(--text2)' }}>Not yet.</span>
          </div>
          <p className="text-[16px] leading-[1.72] mb-10" style={{ color: 'var(--text2)' }}>
            We are building something for private markets that does not exist yet. If you are in the room when capital decisions get made — you will want to know about this first.
          </p>
          {!sent ? (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-[400px] mx-auto">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-[10px] px-4 py-3 text-[14px] outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--bord2)', color: 'var(--text)' }} />
              <button type="submit" className="font-semibold text-[14px] px-5 py-3 rounded-[10px] text-white flex-shrink-0"
                style={{ background: 'var(--pink)' }}>
                Get signal
              </button>
            </form>
          ) : (
            <div className="font-display font-bold text-[18px]" style={{ color: 'var(--green)' }}>
              ✓ You are on the list
            </div>
          )}
          <div className="mt-4 font-mono text-[10.5px] tracking-[.1em] uppercase" style={{ color: 'var(--text3)' }}>
            No spam. One email when it is ready.
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
