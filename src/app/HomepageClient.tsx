'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const COLORS = ['#E91E8C', '#2563EB', '#10B981', '#7C3AED', '#F97316']

function DataLatticeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const dots: { x: number; y: number; vx: number; vy: number; color: string }[] = []
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < 55; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = d.color
        ctx.globalAlpha = 0.55
        ctx.fill()
      })
      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 130) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = '#2563EB'; ctx.globalAlpha = (1 - dist / 130) * 0.1
            ctx.lineWidth = 0.8; ctx.stroke()
          }
        })
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden text-center"
          style={{ minHeight: '100vh', padding: '100px 48px 80px' }}>
          <DataLatticeCanvas />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, var(--bg) 100%)' }} />
          <div className="relative z-10" style={{ maxWidth: 820 }}>
            <div className="inline-flex items-center gap-2 mb-8"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', border: '1px solid var(--bord2)', background: 'var(--bg3)', padding: '6px 16px', borderRadius: 100 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              Data Intelligence · Bangalore, India
            </div>
            <h1 className="font-display font-extrabold" style={{ fontSize: 'clamp(52px,8vw,96px)', letterSpacing: '-.04em', lineHeight: 1.01, color: 'var(--text)', marginBottom: 24 }}>
              Data Done,{' '}
              <span style={{ background: 'linear-gradient(100deg,#E91E8C,#7C3AED,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Right.
              </span>
            </h1>
            <p style={{ fontSize: 'clamp(16px,2vw,20px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 560, margin: '0 auto 40px' }}>
              We build <strong style={{ color: 'var(--text)', fontWeight: 600 }}>operating systems for data-intensive industries</strong> — combining expert human reasoning with deterministic automation to solve the world's hardest data problems.
            </p>
            <div className="flex items-center justify-center flex-wrap" style={{ gap: 12 }}>
              <Link href="/nestlens" className="inline-flex items-center gap-2 font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ fontSize: 15, padding: '14px 28px', borderRadius: 11, background: 'var(--blue)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 28px rgba(37,99,235,.35)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                Explore NestLens
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 font-medium transition-all hover:-translate-y-0.5"
                style={{ fontSize: 15, padding: '14px 28px', borderRadius: 11, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--bord2)' }}>
                Our story
              </Link>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="overflow-hidden border-y" style={{ background: 'var(--bg2)', borderColor: 'var(--border)', padding: '10px 0' }}>
          <div className="flex" style={{ width: 'max-content', animation: 'marquee 30s linear infinite' }}>
            {[...Array(2)].map((_, rep) => (
              <span key={rep} className="flex">
                {['Data Done, Right', 'Private Markets Intelligence', 'NestLens Exchange', 'Capital Readiness', 'Expert Human Reasoning', 'Bangalore, India', 'INR-First Pricing'].map(t => (
                  <span key={t} className="inline-flex items-center whitespace-nowrap" style={{ gap: 16, padding: '0 28px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)' }}>{t}</span>
                    <span style={{ color: 'var(--pink)', fontSize: 8 }}>◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <section style={{ padding: '96px 48px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>What we build</div>
            <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-.03em', lineHeight: 1.06, color: 'var(--text)', marginBottom: 14 }}>
              Operating systems for data-intensive industries
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 500, marginBottom: 52 }}>
              Each product is purpose-built for a specific kind of data problem. All connected. All live.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16 }}>
              {[
                { href: '/nestlens', icon: '🔭', color: '#2563EB', badge: 'Live', name: 'NestLens', desc: 'Private markets OS. Intelligence, Exchange, and Capital Readiness — the full lifecycle from knowing the market to moving capital within it.' },
                { href: '/nesthr', icon: '👥', color: '#7C3AED', badge: 'Live', name: 'NestHR', desc: 'People and operations OS for startups and colleges. 7 modules including PlacementOS that learns from every hire.' },
                { href: '/services', icon: '⚙️', color: '#10B981', badge: 'Live', name: 'Managed Services', desc: 'Expert human data operations. Sourcing, enrichment, annotation, and quality — built on seven years of internal ops experience.' },
              ].map(p => (
                <Link key={p.href} href={p.href}
                  className="relative overflow-hidden transition-all duration-200 hover:-translate-y-1.5 block"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 28 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = p.color)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: p.color, opacity: .7 }} />
                  <div className="absolute" style={{ top: 16, right: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 5, background: 'rgba(16,185,129,.12)', color: '#10B981' }}>{p.badge}</div>
                  <div style={{ fontSize: 28, marginBottom: 16, lineHeight: 1 }}>{p.icon}</div>
                  <div className="font-display font-extrabold" style={{ fontSize: 19, letterSpacing: '-.015em', color: 'var(--text)', marginBottom: 8 }}>{p.name}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text2)', marginBottom: 18 }}>{p.desc}</p>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: p.color }}>Explore {p.name} →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y" style={{ padding: '56px 48px', background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 14 }}>
              {[
                { num: '40K+', label: 'Private market entities tracked', color: '#2563EB' },
                { num: '12K+', label: 'Verified decision-maker contacts', color: '#E91E8C' },
                { num: '1,000+', label: 'Years of collective analysis on the team', color: '#F97316' },
                { num: 'Nov 2025', label: 'When the public build started', color: '#10B981' },
              ].map(s => (
                <div key={s.num} className="text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                  <div className="font-display font-extrabold" style={{ fontSize: 32, letterSpacing: '-.04em', lineHeight: 1, marginBottom: 8, color: s.color }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section style={{ padding: '96px 48px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 52 }}>
              <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: 'linear-gradient(90deg,#E91E8C,#7C3AED,#2563EB)' }} />
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 56, alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Our belief</div>
                  <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-.03em', lineHeight: 1.06, color: 'var(--text)', marginBottom: 16 }}>
                    Not a passion project.<br />A calculated response.
                  </h2>
                  <p style={{ fontSize: 15, lineHeight: 1.74, color: 'var(--text2)' }}>
                    Data built exclusively for institutions that can afford it. Emerging players left working with fragmented, expensive, outdated information. Pricing models designed to extract, not enable. <strong style={{ color: 'var(--text)', fontWeight: 600 }}>LabelNest is the structural fix.</strong>
                  </p>
                </div>
                <div className="flex flex-col" style={{ gap: 12 }}>
                  {[
                    ['Human-verified at every layer', 'Automation handles volume. Humans handle decisions that matter.'],
                    ['INR-first pricing', 'No forex tax. No institutional-only tiers. Priced for the teams doing the work.'],
                    ['Potential over pedigree', 'We hire for what people can do, not where they studied.'],
                    ['Internal tools first', 'Everything we sell externally was tested on our own data first.'],
                  ].map(([t, d]) => (
                    <div key={t} className="flex items-start" style={{ gap: 12, background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--pink)', marginTop: 3, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{t}</div>
                        <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--text2)' }}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t text-center" style={{ padding: '96px 48px', background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Get started</div>
            <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-.03em', lineHeight: 1.06, color: 'var(--text)', maxWidth: 560, margin: '0 auto 14px' }}>
              Ready to see what LabelNest can do?
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 480, margin: '0 auto 36px' }}>
              Start with NestLens, talk to the team about managed services, or explore the full ecosystem.
            </p>
            <div className="flex items-center justify-center flex-wrap" style={{ gap: 12 }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ fontSize: 15, padding: '14px 28px', borderRadius: 11, background: 'var(--pink)' }}>
                Open NestLens ↗
              </a>
              <Link href="/contact"
                className="inline-flex items-center gap-2 font-medium transition-all hover:-translate-y-0.5"
                style={{ fontSize: 15, padding: '14px 28px', borderRadius: 11, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--bord2)' }}>
                Talk to the team
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
      `}</style>
    </>
  )
}
