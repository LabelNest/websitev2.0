import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiyBanner from '@/components/DiyBanner'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import HoverDiv from '@/components/HoverDiv'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nestlens/orbit', {
    title: 'Incubation Operating System for Accelerators and Incubators | NestLens Orbit',
    description: 'Orbit PM screens thousands of applications and runs evaluation rounds. Orbit OS takes over from selection — startup tracking, mentors, voice-drafted MOMs, grant disbursement, and compliance, all the way to alumni impact.',
  })
}

const CAPABILITIES = [
  { icon: '📥', badge: 'Intake', badgeColor: '#7C3AED', hoverColor: 'rgba(124,58,237,.4)', name: 'Application Intake', desc: 'A configurable application form for your programme, built for real volume — thousands of applicants, not a handful.' },
  { icon: '🔍', badge: 'Screening', badgeColor: '#2563EB', hoverColor: 'rgba(37,99,235,.4)', name: 'Screening and Shortlisting', desc: 'Structured screening criteria and shortlisting workflow so your team reviews consistently at scale.' },
  { icon: '🗳️', badge: 'Evaluation', badgeColor: '#F97316', hoverColor: 'rgba(249,115,22,.4)', name: 'Evaluation Rounds', desc: 'Run multiple evaluation rounds with your own reviewer panel, scoring rubric, and pass/fail criteria.' },
  { icon: '🎓', badge: 'Onboarding', badgeColor: '#10B981', hoverColor: 'rgba(16,185,129,.4)', name: 'Cohort Onboarding', desc: 'Selected startups onboard directly into a cohort — carrying straight into Ascent for their own fundraise prep.' },
]

const OS_CAPABILITIES = [
  { icon: '🚀', badge: 'Startups', badgeColor: '#1D4ED8', hoverColor: 'rgba(29,78,216,.4)', name: 'Startup Tracking', desc: 'Sector, stage, revenue, headcount, funds raised, and a milestone tracker with real evidence uploads — one live record per portfolio company.' },
  { icon: '🧭', badge: 'Mentors', badgeColor: '#0D9488', hoverColor: 'rgba(13,148,136,.4)', name: 'Mentor Network', desc: 'A directory of external mentors, assigned to startups, with every session logged against the pairing.' },
  { icon: '📝', badge: 'MOMs', badgeColor: '#F59E0B', hoverColor: 'rgba(245,158,11,.4)', name: 'Voice-Drafted MOMs', desc: 'Record a meeting in any Indian language — Sarvam transcribes and translates to English, then drafts structured minutes and action items for review.' },
  { icon: '💰', badge: 'Finance', badgeColor: '#059669', hoverColor: 'rgba(5,150,105,.4)', name: 'Grants & Disbursements', desc: 'NIDHI, DST-TBI, BIRAC, RKVY-RAFTAR — a real ledger of every rupee in from a scheme and every rupee out to a startup, with a receipt on file.' },
  { icon: '🛡️', badge: 'Compliance', badgeColor: '#DC2626', hoverColor: 'rgba(220,38,38,.4)', name: 'Compliance Calendar', desc: 'Every government filing deadline in one place, with the submitted document attached once it’s done.' },
  { icon: '🎓', badge: 'Alumni', badgeColor: '#7C3AED', hoverColor: 'rgba(124,58,237,.4)', name: 'Alumni & Impact', desc: 'Post-graduation snapshots — jobs created, revenue, funds raised — so your impact story doesn’t stop at demo day.' },
]

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'NestLens', path: '/nestlens' },
  { name: 'Orbit', path: '/nestlens/orbit' },
])

const MODULE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NestLens Orbit',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Incubation Operating System',
  description: 'Orbit PM: application intake, screening, evaluation rounds, and cohort onboarding. Orbit OS: startup tracking, mentors, voice-drafted MOMs, grant disbursement, compliance, and alumni impact — the full incubation lifecycle after selection.',
  url: 'https://labelnest.in/nestlens/orbit',
  isPartOf: { '@id': 'https://labelnest.in/nestlens#software' },
  featureList: [...CAPABILITIES, ...OS_CAPABILITIES].map(c => `${c.name}: ${c.desc}`),
}

export default function OrbitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(MODULE_SCHEMA) }} />
      <Nav />
      <DiyBanner />
      <NestLensModuleNav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(124,58,237,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <img src="/logos/orbit-32.png" alt="" width={20} height={20} style={{ objectFit: 'contain' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)' }}>NestLens Orbit · Live module</div>
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(40px,6vw,68px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.03, color: 'var(--text)', marginBottom: 18, maxWidth: 720 }}>
              The incubation<br />
              <span style={{ background: 'linear-gradient(100deg,#7C3AED,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>operating system.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 620, marginBottom: 28 }}>
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Orbit PM</strong> screens thousands of applications and runs evaluation rounds at scale. <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Orbit OS</strong> takes over the moment a startup is selected — tracking, mentors, voice-drafted MOMs, grant disbursement, and compliance, all the way to alumni impact.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://orbit.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7C3AED', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Orbit ↗</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Talk to the team</Link>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>What Orbit does</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 32 }}>From application to cohort, in one workflow</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CAPABILITIES.map(c => (
                <HoverDiv key={c.name}
                  hoverBorderColor={c.hoverColor}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 13, padding: 20, transition: 'border-color .2s' }}>
                  <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, background: `${c.badgeColor}1A`, color: c.badgeColor, display: 'inline-block', marginBottom: 6 }}>{c.badge}</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 5 }}>{c.name}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{c.desc}</div>
                  </div>
                </HoverDiv>
              ))}
            </div>
          </div>
        </section>

        {/* ORBIT OS CAPABILITIES */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)' }}>Orbit OS</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, background: 'rgba(29,78,216,.12)', color: '#1D4ED8' }}>Upgrade tier</div>
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 14 }}>Selection isn&apos;t the finish line.</h2>
            <p style={{ fontSize: 14.5, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 680, marginBottom: 32 }}>
              A recognized incubation centre is responsible for real government grant money, real milestone reporting, and real compliance deadlines long after a cohort is selected. Orbit OS is the full incubation ERP for everything that happens next — no separate onboarding, an Orbit PM institution sees it as a live, read-only preview until they upgrade.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12 }}>
              {OS_CAPABILITIES.map(c => (
                <HoverDiv key={c.name}
                  hoverBorderColor={c.hoverColor}
                  style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 13, padding: 18, transition: 'border-color .2s' }}>
                  <div style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, background: `${c.badgeColor}1A`, color: c.badgeColor, display: 'inline-block', marginBottom: 6 }}>{c.badge}</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 5 }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{c.desc}</div>
                  </div>
                </HoverDiv>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: '72px 48px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Pricing</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)' }}>Priced for institutional volume.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, maxWidth: 780, margin: '0 auto' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>Orbit PM</div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>₹2,499</span>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>/mo</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>Starts at — scales with cohort size and application intake</div>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid #7C3AED', borderRadius: 14, padding: 20, position: 'relative' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>Orbit OS</div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: '#7C3AED' }}>₹29,999</span>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>/mo</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>₹2,99,999/yr · full programme ERP — cohort management, mentor matching, application review, batch reporting</div>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>Enterprise</div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>Custom</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>Multiple simultaneous programmes, custom application volume, and SLA</div>
              </div>
            </div>
            <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text3)', marginTop: 24 }}>See <Link href="/nestlens/pricing" style={{ color: '#7C3AED' }}>full pricing ↗</Link></p>
          </div>
        </section>

        {/* SEE ALSO */}
        <section style={{ padding: '40px 48px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13.5, color: 'var(--text2)' }}>
            <span>See also:</span>
            <Link href="/nestlens/capital" style={{ color: '#10B981' }}>Selected startups continue on Ascent →</Link>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Ready to run your programme on Orbit?</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>From thousands of applications to a graduated cohort.</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>Orbit PM for selection, Orbit OS for everything after — built for institutions running programmes at scale, live today.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://orbit.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7C3AED', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open Orbit ↗</a>
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
