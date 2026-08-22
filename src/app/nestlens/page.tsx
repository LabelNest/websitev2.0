import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiyBanner from '@/components/DiyBanner'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import HoverLink from '@/components/HoverLink'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens', {
    title: 'NestLens — Private Markets OS: Atlas, Exchange, Orbit, Ascent, Command, Connect',
    description: 'The private markets OS for emerging managers, funds, and institutions. Structured intelligence, a live data marketplace, programme management, and fund and founder capital tools — six live modules, credit-based access, no lock-in.',
  })
}

// Every answer restates a fact already published elsewhere on this page (module
// descriptions, pricing table) — nothing here is new/invented copy.
const FAQS = [
  {
    q: 'What is NestLens?',
    a: 'NestLens is a private markets operating system with six live modules — Atlas, Exchange, Orbit, Ascent, Command, and Connect — built for analysts, fund managers, founders, and institutions who need structured intelligence, a live data marketplace, programme management, and capital tools in one place.',
  },
  {
    q: 'What are the NestLens modules?',
    a: 'Atlas tracks 40,000+ private-market entities with 12,000+ verified contacts. Exchange is a marketplace to buy, sell, and license structured datasets with KYC-verified sellers and escrow-protected transactions. Orbit runs programme management for accelerators and incubators — application intake, screening, and cohort onboarding. Ascent is the founder-facing capital readiness system: an investor-ready data room (10 sections, 51 items) with investor tier scoring and LP-GP matching. Command is the fund-side operating system — fund dashboard, LP management, portfolio tracking, deal sourcing, and IC voting. Connect is the mentor and audit-partner network, built into the Ascent and Command workflow.',
  },
  {
    q: 'How much does NestLens Atlas cost?',
    a: 'NestLens Atlas starts at ₹14,999/month (Individual plan, or ₹1,50,000/year). The Pro plan is ₹1,64,999/month with 5 seats, 400 credits/month, and 2 data rooms. Enterprise pricing is available on request.',
  },
  {
    q: 'Is NestLens Exchange free to use?',
    a: 'Yes — Exchange is free to browse, view project briefs, and post as a buyer, paying only per project via credits. Sellers pay $199/year for an active listing with 15 applications/month included.',
  },
  {
    q: 'How much does NestLens Ascent cost?',
    a: 'Ascent starts at ₹999/month for founders in India (₹9,999/year); a Global founder plan is also available. Cohort/group access for accelerators and incubators starts at ₹4,999. Enterprise pricing covers institution-wide cohort access.',
  },
  {
    q: 'How much does NestLens Command cost?',
    a: 'Command starts at $45/month for a fund, with 1 fund data room included; extra data rooms are $300/year or $25/month. Enterprise pricing covers multiple funds and custom room counts.',
  },
  {
    q: 'How much does NestLens Orbit cost?',
    a: 'Orbit starts at ₹24,999/month (₹2,49,999/year), covering up to 1,00,000 applications with full screening and review workflow. Enterprise pricing covers multiple simultaneous programmes.',
  },
  {
    q: 'Is NestLens Connect a separate subscription?',
    a: 'No — Mentor Connect and verified audit requests are included with an active Ascent or Command plan. Mentors, audit partners, and scouting partners apply to join the network for free and are vetted before their dashboard goes live.',
  },
  {
    q: 'Are NestLens Exchange sellers verified?',
    a: 'Yes. Every seller is KYC-verified before they can list, transactions are escrow-protected, and datasets carry quality-control scores.',
  },
  {
    q: 'Does NestLens offer Enterprise or Bundle pricing?',
    a: 'Yes. Enterprise pricing covers custom seats, credit volumes, entity access, and SLA agreements for institutional funds, research firms, and accelerators. Bundle pricing combines Atlas and Ascent at a negotiated rate.',
  },
  {
    q: 'Is NestLens the same as NestHR?',
    a: "No. NestLens is LabelNest's private markets OS (Atlas, Exchange, Orbit, Ascent, Command, Connect). NestHR is a separate product — LabelNest's HR and campus-placement OS, with its own pricing at nesthr.labelnest.in.",
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://labelnest.in/nestlens#software',
  name: 'NestLens',
  operatingSystem: 'Web-based',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Private Markets Intelligence Platform',
  description: 'Private markets OS with Atlas, Exchange, Orbit, Ascent, Command, and Connect modules. Track 40,000+ entities, buy verified data, run programme management, build investor and LP data rooms.',
  url: 'https://nestlens.labelnest.in',
  publisher: { '@type': 'Organization', name: 'LabelNest India Private Limited', url: 'https://labelnest.in' },
  brand: { '@type': 'Brand', name: 'LabelNest', url: 'https://labelnest.in' },
  offers: { '@type': 'Offer', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
  featureList: [
    '40,000+ tracked entities',
    '12,000+ verified contacts',
    'Live market signals',
    'Data marketplace with KYC verified sellers',
    'Programme management for institutions',
    'Investor-ready data room builder',
    'LP-GP matching',
    'Grant and competition discovery',
    'Fund operations: LP management, portfolio tracking, deal sourcing, IC voting',
    'Mentor connect and verified audit partners',
  ],
}

export default function NestLensPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <Nav />
      <DiyBanner />
      <NestLensModuleNav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '80px 48px 72px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
          <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'rgba(37,99,235,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)', padding: '6px 16px', borderRadius: 100, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', display: 'inline-block' }} />
              Private Markets OS · nestlens.labelnest.in
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(52px,8vw,88px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1, color: 'var(--text)', marginBottom: 16 }}>NestLens</h1>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,3vw,36px)', fontWeight: 300, color: 'var(--text2)', marginBottom: 24, lineHeight: 1.2 }}>
              Know the market. <strong style={{ color: 'var(--text)', fontWeight: 800 }}>Move the data.</strong> Ready the capital.
            </p>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 620, margin: '0 auto 36px' }}>
              Six modules. One platform. Built for analysts, founders, fund managers, and institutions who need{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>structured intelligence, a live data marketplace, programme management, and capital tools for founders and funds</strong> — all in one place.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open NestLens ↗</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Request access</Link>
            </div>
          </div>
        </section>

        {/* THREE MODULES */}
        <section style={{ padding: '72px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, textAlign: 'center' }}>Six modules — all live</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 32 }}>

              <HoverLink href="/nestlens/intelligence"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #2563EB', borderRadius: 18, padding: 28, display: 'block', transition: 'transform .2s', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>🔭</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block', marginBottom: 10 }}>Live</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Atlas</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>Entity tracking, fund signals, contact intelligence, and live market signals across private markets. 40K+ entities. 12K+ verified contacts.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#2563EB' }}>40K+</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Entities</div></div>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#2563EB' }}>12K+</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Contacts</div></div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB' }}>Explore Atlas →</div>
              </HoverLink>

              <HoverLink href="/nestlens/exchange"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #E91E8C', borderRadius: 18, padding: 28, display: 'block', transition: 'transform .2s', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>⚡</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block', marginBottom: 10 }}>Live</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Exchange</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>Buy, sell, and license any structured dataset. KYC verified sellers. Escrow-protected transactions. QC scored. Universal data marketplace.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#E91E8C' }}>10+</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Sellers</div></div>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#E91E8C' }}>KYC</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Verified</div></div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#E91E8C' }}>Explore Exchange →</div>
              </HoverLink>

              <HoverLink href="/nestlens/orbit"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #7C3AED', borderRadius: 18, padding: 28, display: 'block', transition: 'transform .2s', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>🪐</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block', marginBottom: 10 }}>Live</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Orbit</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>Application intake, screening, evaluation rounds, and cohort onboarding — for accelerators and incubators running programmes at scale.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#7C3AED' }}>1,00,000</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Applications</div></div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7C3AED' }}>Explore Orbit →</div>
              </HoverLink>

              <HoverLink href="/nestlens/capital"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #10B981', borderRadius: 18, padding: 28, display: 'block', transition: 'transform .2s', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>🏦</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block', marginBottom: 10 }}>Live</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Ascent</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>Data room, investor tier scoring, LP-GP matching, SP matching, and grant and competition discovery. 10 sections. 51 items.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#10B981' }}>10</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Sections</div></div>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#10B981' }}>51</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Items</div></div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#10B981' }}>Explore Ascent →</div>
              </HoverLink>

              <HoverLink href="/nestlens/command"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #F97316', borderRadius: 18, padding: 28, display: 'block', transition: 'transform .2s', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>🎛️</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block', marginBottom: 10 }}>Live</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Command</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>Fund dashboard, LP management, portfolio company tracking, deal sourcing, diligence, and IC voting — one workspace for a fund.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#F97316' }}>1</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Fund data room incl.</div></div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#F97316' }}>Explore Command →</div>
              </HoverLink>

              <HoverLink href="/nestlens/connect"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #06B6D4', borderRadius: 18, padding: 28, display: 'block', transition: 'transform .2s', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>🤝</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(16,185,129,.1)', color: '#10B981', display: 'inline-block', marginBottom: 10 }}>Live</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Connect</div>
                <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>Mentor connect, verified audit requests, and dedicated dashboards for mentors, audit partners, and scouting partners.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: '#06B6D4' }}>Free</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>To apply</div></div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#06B6D4' }}>Explore Connect →</div>
              </HoverLink>

            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: '72px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Pricing</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 14 }}>Six modules, each priced independently.</h2>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>Subscribe only to what you need. All plans available monthly or annually — annual saves more. Enterprise and Bundle pricing on request.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {[
                {
                  accent: '#2563EB', name: 'Atlas', tagline: 'Private market data on funds, LPs, GPs, and grants.',
                  from: '₹14,999', unit: '/mo', note: 'Individual · from ₹1,50,000/yr',
                  popular: 'Pro — ₹1,64,999/mo · 5 seats · 400 credits/mo · 2 data rooms',
                },
                {
                  accent: '#E91E8C', name: 'Exchange', tagline: 'Buy and sell private market data and services.',
                  from: 'Free', unit: '', note: 'Free to browse, view briefs, and post per-project',
                  popular: 'Seller — $199/yr · 15 applications/mo · active listing',
                },
                {
                  accent: '#7C3AED', name: 'Orbit', tagline: 'Programme management for accelerators and incubators.',
                  from: '₹24,999', unit: '/mo', note: 'Programme Management · ₹2,49,999/yr',
                  popular: 'Up to 1,00,000 applications · full screening & review workflow',
                },
                {
                  accent: '#10B981', name: 'Ascent', tagline: 'Founder data room, legal checklist, investor fit scoring.',
                  from: '₹999', unit: '/mo', note: 'Founder — India · ₹9,999/yr',
                  popular: 'Cohort / Group — ₹4,999 for a cohort of 25 founders',
                },
                {
                  accent: '#F97316', name: 'Command', tagline: 'Fund operations, LP management, deal sourcing, IC voting.',
                  from: '$45', unit: '/mo', note: 'Fund · 1 fund data room included',
                  popular: 'Extra data rooms — $300/yr or $25/mo',
                },
                {
                  accent: '#06B6D4', name: 'Connect', tagline: 'Mentor connect and verified audit partners.',
                  from: 'Free', unit: '', note: 'Included with an active Ascent or Command plan',
                  popular: 'Mentors and partners apply free, vetted before going live',
                },
              ].map(m => (
                <div key={m.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: m.accent }} />
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 6 }}>{m.name}</div>
                  <p style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 16, minHeight: 38 }}>{m.tagline}</p>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: m.accent }}>{m.from}</span>
                    <span style={{ fontSize: 13, color: 'var(--text3)' }}>{m.unit}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text3)', marginBottom: 16 }}>{m.note}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text2)', padding: '10px 12px', background: 'rgba(255,255,255,.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,.06)', lineHeight: 1.5 }}>
                    <span style={{ color: m.accent, fontWeight: 600 }}>Most popular: </span>{m.popular}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in/pricing" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 10 }}>See full pricing ↗</a>
              <a href="https://nestlens.labelnest.in/enterprise-enquiry" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14, fontWeight: 500, padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,.1)' }}>Enquire about Enterprise or Bundle</a>
            </div>
            <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text3)', marginTop: 20 }}>
              See how NestLens compares: <Link href="/best-private-market-data-platforms" style={{ color: '#2563EB' }}>best private market data platforms →</Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '72px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>FAQ</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)' }}>Common questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FAQS.map(f => (
                <details key={f.q} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
                  <summary style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', cursor: 'pointer', listStyle: 'none' }}>{f.q}</summary>
                  <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.7, marginTop: 12 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '72px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Get started</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-.035em', color: 'var(--text)', marginBottom: 12 }}>Ready to open NestLens?</h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.72 }}>Platform is live. Start with Atlas, explore the Exchange, run a programme on Orbit, or build your data room on Ascent or Command.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open NestLens ↗</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Talk to the team</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
