import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'NestLens — Private Markets Operating System', description: 'NestLens is the private markets OS. Intelligence, Exchange, and Capital Readiness — three modules covering the full lifecycle from knowing the market to moving capital within it.' }

const MODULES = [
  { href: '/nestlens/intelligence', icon: '🔭', color: '#2563EB', badge: 'Live', name: 'Intelligence', desc: 'Private market entity tracking, fund signals, contact intelligence, and live market signals. Structured and verified.', stats: [{ v: '40K+', l: 'Entities tracked' }, { v: '12K+', l: 'Verified contacts' }] },
  { href: '/nestlens/exchange', icon: '⚡', color: '#E91E8C', badge: 'Live', name: 'Exchange', desc: 'Buy, sell, and license any structured dataset. KYC verified sellers, escrow-protected transactions, QC scored.', stats: [{ v: 'KYC', l: 'Verified sellers' }, { v: 'Escrow', l: 'Protected transactions' }] },
  { href: '/nestlens/capital', icon: '🏦', color: '#10B981', badge: 'Live', name: 'Capital Readiness', desc: 'Data room, investor tier scoring, LP-GP matching, SP matching, and grant and competition discovery — all live.', stats: [{ v: '10', l: 'Data room sections' }, { v: '51', l: 'Items tracked' }] },
]

export default function NestLensPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>
        <section className="px-8 py-28 relative overflow-hidden text-center">
          <div className="absolute -top-28 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'rgba(37,99,235,0.09)', filter: 'blur(90px)' }} />
          <div className="max-w-[860px] mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[.12em] uppercase px-3.5 py-1.5 rounded-full mb-8 border"
              style={{ color: 'var(--text3)', background: 'var(--bg3)', borderColor: 'var(--bord2)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
              Private Markets OS · nestlens.labelnest.in
            </div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.02] mb-3"
              style={{ fontSize: 'clamp(44px,7vw,82px)', color: 'var(--text)' }}>NestLens</h1>
            <div className="font-display leading-[1.1] mb-7" style={{ fontSize: 'clamp(22px,3.5vw,42px)', color: 'var(--text2)', fontWeight: 300 }}>
              <span>Know the market. </span>
              <strong style={{ color: 'var(--text)', fontWeight: 800 }}>Move the data. </strong>
              <span>Ready the capital.</span>
            </div>
            <p className="text-[clamp(15px,1.8vw,18px)] leading-[1.72] max-w-[580px] mx-auto mb-10" style={{ color: 'var(--text2)' }}>
              Three modules. One platform. Built for analysts, fund managers, and operators who need{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>structured intelligence, a live data marketplace, and a capital readiness system</strong> — all in one place.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
                style={{ background: 'var(--blue)' }}>Open NestLens ↗</a>
              <Link href="/contact" className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border"
                style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>Request access</Link>
            </div>
          </div>
        </section>

        {/* MODULE CARDS */}
        <section className="px-8 pb-20">
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.12em] uppercase mb-3 text-center" style={{ color: 'var(--text3)' }}>Three modules — all live</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MODULES.map(m => (
                <Link key={m.href} href={m.href}
                  className="relative rounded-[20px] p-8 overflow-hidden transition-all duration-200 hover:-translate-y-1.5 block"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = m.color)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: m.color, opacity: 0.7 }} />
                  <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[.08em] uppercase px-2 py-1 rounded"
                    style={{ background: 'rgba(16,185,129,.12)', color: '#10B981' }}>{m.badge}</div>
                  <div className="text-[28px] mb-4 leading-none">{m.icon}</div>
                  <div className="font-display font-extrabold text-[19px] tracking-tight mb-2" style={{ color: 'var(--text)' }}>{m.name}</div>
                  <p className="text-[13.5px] leading-[1.65] mb-5" style={{ color: 'var(--text2)' }}>{m.desc}</p>
                  <div className="flex gap-4 mb-5">
                    {m.stats.map(s => (
                      <div key={s.l}>
                        <div className="font-display font-extrabold text-[20px] tracking-tight" style={{ color: m.color }}>{s.v}</div>
                        <div className="text-[11px]" style={{ color: 'var(--text3)' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="font-mono text-[10px] tracking-[.1em] uppercase" style={{ color: m.color }}>Explore {m.name} →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING PHILOSOPHY */}
        <section className="px-8 py-16 border-t" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="rounded-[18px] p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#2563EB,#E91E8C,#7C3AED)' }} />
              <div>
                <div className="font-display font-extrabold text-[22px] tracking-tight mb-2" style={{ color: 'var(--text)' }}>Credit-based. No lock-in. No per-seat penalties.</div>
                <p className="text-[14.5px] leading-[1.68] max-w-[460px]" style={{ color: 'var(--text2)' }}>
                  NestLens runs on credits that work across all three modules. You pay for what you use. Adding team members is encouraged, not billed.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 flex-shrink-0">
                {['Same price for small teams and global firms', 'No per-seat penalties as you grow', 'No hidden tiers or feature gating', 'Credits work across all three modules'].map(t => (
                  <div key={t} className="flex items-center gap-2.5 text-[14px]" style={{ color: 'var(--text2)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
