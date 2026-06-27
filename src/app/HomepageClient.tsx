'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function DataLatticeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const dots: { x: number; y: number; vx: number; vy: number; a: number }[] = []
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < 60; i++) {
      dots.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, a: Math.random() })
    }
    const COLORS = ['#E91E8C','#2563EB','#10B981','#7C3AED','#F97316']
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = COLORS[Math.floor(d.a * COLORS.length)]
        ctx.globalAlpha = 0.5
        ctx.fill()
      })
      dots.forEach((a, i) => dots.forEach((b, j) => {
        if (j <= i) return
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = '#2563EB'; ctx.globalAlpha = (1 - dist/120) * 0.12
          ctx.lineWidth = 0.8; ctx.stroke()
        }
      }))
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* ── HERO ── */}
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-8 py-24 text-center">
          <DataLatticeCanvas />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--bg) 100%)' }} />
          <div className="relative z-10 max-w-[820px]">
            <div className="inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[.12em] uppercase px-3.5 py-1.5 rounded-full mb-8 border"
              style={{ color: 'var(--text3)', background: 'var(--bg3)', borderColor: 'var(--bord2)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)', boxShadow: '0 0 7px var(--blue)', animation: 'blink 2.4s ease-in-out infinite' }} />
              Data Intelligence · Bangalore, India
            </div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.02] mb-5"
              style={{ fontSize: 'clamp(48px,8vw,96px)', color: 'var(--text)' }}>
              Data Done,{' '}
              <span style={{ background: 'linear-gradient(100deg,#E91E8C,#7C3AED,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Right.
              </span>
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.72] max-w-[560px] mx-auto mb-10" style={{ color: 'var(--text2)' }}>
              We build <strong style={{ color: 'var(--text)', fontWeight: 600 }}>operating systems for data-intensive industries</strong> — combining expert human reasoning with deterministic automation to solve the world's hardest data problems.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/nestlens" className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--blue)', boxShadow: '0 0 0 0 rgba(37,99,235,0)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 28px rgba(37,99,235,.32)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                Explore NestLens
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] transition-all hover:-translate-y-0.5 border"
                style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>
                Our story
              </Link>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <span className="font-mono text-[10px] tracking-[.1em] uppercase" style={{ color: 'var(--text3)' }}>Scroll</span>
            <div className="w-4 h-4 border-r border-b rotate-45" style={{ borderColor: 'var(--text3)', animation: 'bob 1.9s ease-in-out infinite' }} />
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="border-y overflow-hidden py-3" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="flex gap-0 whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
            {[...Array(3)].map((_, i) => (
              <span key={i} className="flex items-center gap-0">
                {['Data Done, Right', 'Private Markets Intelligence', 'NestLens Exchange', 'Capital Readiness', 'Expert Human Reasoning', 'Deterministic Automation', 'Bangalore, India', 'INR-First Pricing'].map(t => (
                  <span key={t} className="inline-flex items-center gap-4 px-6">
                    <span className="font-mono text-[11px] tracking-[.1em] uppercase" style={{ color: 'var(--text3)' }}>{t}</span>
                    <span style={{ color: 'var(--pink)', fontSize: 8 }}>◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── PRODUCTS ── */}
        <section className="px-8 py-24" style={{ background: 'var(--bg)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--text3)' }}>What we build</div>
            <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-3 max-w-[600px]"
              style={{ fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text)' }}>
              Operating systems for data-intensive industries
            </h2>
            <p className="text-[15.5px] leading-[1.74] max-w-[500px] mb-12" style={{ color: 'var(--text2)' }}>
              Each product is purpose-built for a specific kind of data problem. All connected by the same infrastructure. All live.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: '/nestlens', icon: '🔭', color: '#2563EB', badge: 'Live', name: 'NestLens', desc: 'Private markets OS. Intelligence, Exchange, and Capital Readiness — three modules covering the full lifecycle from knowing the market to moving capital within it.' },
                { href: '/nesthr', icon: '👥', color: '#7C3AED', badge: 'Live', name: 'NestHR', desc: 'People and operations OS for startups and colleges. 7 modules including PlacementOS that learns from every hire.' },
                { href: '/services', icon: '⚙️', color: '#10B981', badge: 'Live', name: 'Managed Services', desc: 'Expert human data operations. Sourcing, enrichment, annotation, quality, and custom workflow design — built on seven years of internal ops.' },
              ].map(p => (
                <Link key={p.href} href={p.href}
                  className="relative rounded-[18px] p-7 overflow-hidden transition-all duration-200 hover:-translate-y-1.5 block"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = p.color)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] opacity-70" style={{ background: p.color }} />
                  <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[.08em] uppercase px-2 py-1 rounded"
                    style={{ background: 'rgba(16,185,129,.12)', color: '#10B981' }}>{p.badge}</div>
                  <div className="text-[28px] mb-4 leading-none">{p.icon}</div>
                  <div className="font-display font-extrabold text-[19px] tracking-tight mb-2" style={{ color: 'var(--text)' }}>{p.name}</div>
                  <p className="text-[13.5px] leading-[1.65] mb-4" style={{ color: 'var(--text2)' }}>{p.desc}</p>
                  <div className="font-mono text-[10px] tracking-[.1em] uppercase" style={{ color: p.color }}>Learn more →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="px-8 py-16 border-y" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: '40K+', label: 'Private market entities tracked', color: 'var(--blue)' },
              { num: '12K+', label: 'Verified decision-maker contacts', color: 'var(--pink)' },
              { num: '1,000+', label: 'Years of collective analysis on the team', color: 'var(--orange)' },
              { num: '2022', label: 'Founded in Bangalore, bootstrapped by design', color: 'var(--green)' },
            ].map(s => (
              <div key={s.num} className="rounded-[13px] p-5 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="font-display font-extrabold text-[32px] tracking-tight leading-none mb-1.5" style={{ color: s.color }}>{s.num}</div>
                <div className="text-[12.5px] leading-[1.4]" style={{ color: 'var(--text2)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PHILOSOPHY STRIP ── */}
        <section className="px-8 py-24">
          <div className="max-w-[1240px] mx-auto">
            <div className="rounded-[20px] p-12 relative overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#E91E8C,#7C3AED,#2563EB)' }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--pink)' }}>Our belief</div>
                  <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-5"
                    style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--text)' }}>
                    Not a passion project.<br />A calculated response.
                  </h2>
                  <p className="text-[15px] leading-[1.74]" style={{ color: 'var(--text2)' }}>
                    Data built exclusively for institutions that can afford it. Emerging players left working with fragmented, expensive, outdated information. Pricing models designed to extract, not enable. <strong style={{ color: 'var(--text)', fontWeight: 600 }}>LabelNest is the structural fix.</strong>
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    ['Human-verified at every layer', 'Automation handles volume. Humans handle decisions that matter.'],
                    ['INR-first pricing', 'No forex tax. No institutional-only tiers. Priced for the teams doing the work.'],
                    ['Potential over pedigree', 'We hire for what people can do, not where they studied.'],
                    ['Internal tools first', 'Everything we sell externally was tested on our own data first.'],
                  ].map(([t, d]) => (
                    <div key={t} className="flex items-start gap-3 px-4 py-3.5 rounded-[9px]" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--pink)' }} />
                      <div>
                        <div className="font-semibold text-[13.5px] mb-0.5" style={{ color: 'var(--text)' }}>{t}</div>
                        <div className="text-[12.5px] leading-[1.55]" style={{ color: 'var(--text2)' }}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-8 py-24 border-t text-center" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--text3)' }}>Get started</div>
            <h2 className="font-display font-extrabold tracking-tight leading-[1.04] mb-4 max-w-[560px] mx-auto"
              style={{ fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text)' }}>
              Ready to see what LabelNest can do?
            </h2>
            <p className="text-[16px] leading-[1.72] max-w-[480px] mx-auto mb-10" style={{ color: 'var(--text2)' }}>
              Start with NestLens, talk to the team about managed services, or explore the full ecosystem.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--pink)' }}>
                Open NestLens ↗
              </a>
              <Link href="/contact"
                className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] transition-all hover:-translate-y-0.5 border"
                style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>
                Talk to the team
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        @keyframes bob { 0%,100%{transform:rotate(45deg) translateY(0)} 50%{transform:rotate(45deg) translateY(6px)} }
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.7)} }
      `}</style>
    </>
  )
}
