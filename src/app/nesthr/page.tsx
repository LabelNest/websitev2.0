import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HoverDiv from '@/components/HoverDiv'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/nesthr', {
    title: 'NestHR — HR and Placement OS for Startups and Colleges',
    description: '7 OS modules for people, hiring, campus placement, performance, expenses, learning. PlacementOS learns from every hiring signal. INR pricing. Built for India.',
  })
}

const OS_MODULES = [
  {
    icon: '👤', name: 'People OS', border: '#7C3AED', span: 1,
    desc: 'Core employee management. Profiles, org chart, roles, departments, onboarding workflows, and document management — the foundation everything else builds on.',
    features: ['Employee profiles and org structure', 'Onboarding and offboarding workflows', 'Document management'],
  },
  {
    icon: '🎯', name: 'Talent OS / PlacementOS', border: '#E91E8C', span: 2, badge: 'Flagship module',
    desc: 'The module that makes NestHR different. PlacementOS is built for colleges managing campus recruitment and startups managing talent pipelines. It learns from every selection and rejection signal — improving shortlisting accuracy with every cycle. JD creation, candidate pipelines, interview scheduling, offer management, and placement analytics all included.',
    features: ['JD creation and publishing', 'Candidate pipeline management', 'Signal-learning shortlisting', 'Interview scheduling and feedback', 'Offer letter generation', 'Campus placement dashboards'],
    grid2col: true,
  },
  {
    icon: '📈', name: 'Performance OS', border: '#2563EB', span: 1,
    desc: 'Structured review cycles, goal setting, continuous feedback, and performance ratings — without the spreadsheet chaos.',
    features: ['Review cycle management', 'Goal tracking and OKRs', '360 feedback collection'],
  },
  {
    icon: '💳', name: 'Expense OS', border: '#F97316', span: 1,
    desc: 'Employee expense claims, manager approvals, reimbursement tracking, and monthly reporting — without email chains.',
    features: ['Claim submission and approval', 'Category and policy controls', 'Reimbursement tracking'],
  },
  {
    icon: '📚', name: 'Learning OS', border: '#10B981', span: 1,
    desc: 'Internal courses, assignments, module completion tracking, and learning progress dashboards — for onboarding and ongoing development.',
    features: ['Course and module creation', 'Assignment and deadline tracking', 'Completion certificates'],
  },
  {
    icon: '📊', name: 'Analytics', border: '#06B6D4', span: 1,
    desc: 'Cross-module workforce analytics. Headcount trends, attrition signals, placement success rates, expense summaries, and learning completion rates.',
    features: ['Headcount and attrition reports', 'Placement success analytics', 'Cross-module dashboards'],
  },
  {
    icon: '⚙️', name: 'Admin', border: '#8985A6', span: 1,
    desc: 'Organisation setup, user roles, permissions, module configuration, and workspace management — full control over how NestHR is configured for your team.',
    features: ['Role and permission management', 'Module toggles and configuration', 'Organisation settings'],
  },
]

const PLACEMENT_STEPS = [
  { step: 'Step 1', title: 'Create and publish JDs', color: '#E91E8C', desc: 'Structured job descriptions with role requirements, skills, and compensation. Published to your applicant portal in one click.' },
  { step: 'Step 2', title: 'Manage candidate pipeline', color: '#E91E8C', desc: 'Kanban-style pipeline from application to offer. Track every candidate across every stage with notes, feedback, and decision logging.' },
  { step: 'Step 3', title: 'Signal learning kicks in', color: '#E91E8C', desc: 'Every selection and rejection is a signal. PlacementOS builds a profile of what works for each role and uses it to improve shortlisting accuracy in the next cycle.' },
  { step: 'Step 4', title: 'Interviews and offers', color: '#E91E8C', desc: 'Schedule interviews, collect structured feedback, track interview rounds, and generate offer letters — all inside the same pipeline view.' },
  { step: 'Step 5', title: 'Placement analytics', color: '#E91E8C', desc: 'Season-level dashboards showing placement rates, average packages, company participation, time-to-hire, and cohort performance.' },
  { step: 'Coming', title: 'Company-side portal', color: '#7C3AED', desc: 'Dedicated portal for companies participating in campus recruitment. View candidates, submit feedback, and manage their own pipeline view.' },
]

const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NestHR',
  operatingSystem: 'Web-based',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Human Resources Software',
  description: 'HR and workforce operations OS for startups and colleges. 7 modules including PlacementOS for campus recruitment.',
  url: 'https://nesthr.labelnest.in',
  publisher: { '@type': 'Organization', name: 'LabelNest India Private Limited' },
  offers: [
    { '@type': 'Offer', name: 'Starter', price: '799', priceCurrency: 'INR', description: 'Per employee per year, up to 50 employees' },
    { '@type': 'Offer', name: 'Growth', price: '1299', priceCurrency: 'INR', description: 'Per employee per year, 51-200 employees' },
  ],
  featureList: ['People OS', 'Talent OS / PlacementOS', 'Performance OS', 'Expense OS', 'Learning OS', 'Analytics', 'Admin'],
}

export default function NestHRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />
      <Nav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -120, right: -80, width: 520, height: 520, borderRadius: '50%', background: 'rgba(124,58,237,.08)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)', padding: '6px 16px', borderRadius: 100, marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED', display: 'inline-block' }} />
                People and Operations OS · nesthr.labelnest.in
              </div>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(40px,6vw,72px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.03, color: 'var(--text)', marginBottom: 18 }}>NestHR</h1>
              <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(18px,2.8vw,32px)', fontWeight: 300, color: 'var(--text2)', marginBottom: 18, lineHeight: 1.2 }}>
                HR and Workforce Operations.<br /><strong style={{ color: 'var(--text)', fontWeight: 800 }}>Built for execution-focused teams.</strong>
              </p>
              <p style={{ fontSize: 'clamp(15px,1.8vw,17.5px)', lineHeight: 1.74, color: 'var(--text2)', marginBottom: 28, maxWidth: 520 }}>
                Seven purpose-built OS modules for startups and colleges. People management, talent acquisition, placement intelligence, performance, expenses, learning, and analytics — in one platform. PlacementOS learns from every selection and rejection signal.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://nesthr.labelnest.in" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7C3AED', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open NestHR ↗</a>
                <Link href="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Request demo</Link>
              </div>
            </div>

            {/* Platform preview panel */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 13.5, color: 'var(--text)' }}>NestHR Platform</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, textTransform: 'uppercase', letterSpacing: '.08em', color: '#10B981' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />Live
                </div>
              </div>
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { icon: '👤', name: 'People OS', desc: 'Employee profiles, org structure, onboarding', border: '#7C3AED' },
                  { icon: '🎯', name: 'Talent OS / PlacementOS', desc: 'Hiring pipelines, campus placements, signal learning', border: '#E91E8C' },
                  { icon: '📈', name: 'Performance OS', desc: 'Reviews, goals, continuous feedback cycles', border: '#2563EB' },
                  { icon: '💳', name: 'Expense OS', desc: 'Claims, approvals, reimbursements, tracking', border: '#F97316' },
                  { icon: '📚', name: 'Learning OS', desc: 'Courses, assignments, completion tracking', border: '#10B981' },
                ].map(m => (
                  <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg2)', border: '1px solid rgba(255,255,255,.06)', borderLeft: `3px solid ${m.border}`, borderRadius: 8, padding: '11px 14px' }}>
                    <span style={{ fontSize: 16 }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.desc}</div>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, color: '#10B981', textTransform: 'uppercase' }}>Live</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7 OS MODULES */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Seven OS modules</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>Every part of people operations. One platform.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, marginBottom: 36, lineHeight: 1.65 }}>Purpose-built modules that work independently or together. No bloat. No features you do not need. Each OS does exactly what it says.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {OS_MODULES.map(m => (
                <HoverDiv key={m.name}
                  hoverBorderColor={`${m.border}59`}
                  hoverTransform="translateY(-3px)"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${m.border}`, borderRadius: 14, padding: 22, gridColumn: m.span === 2 ? 'span 2' : 'span 1', transition: 'border-color .2s,transform .2s' }}>
                  <div style={{ fontSize: 26, marginBottom: 12 }}>{m.icon}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)' }}>{m.name}</div>
                    {m.badge && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(233,30,140,.1)', color: '#E91E8C' }}>{m.badge}</span>}
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 12 }}>{m.desc}</p>
                  <div style={{ display: m.grid2col ? 'grid' : 'flex', gridTemplateColumns: m.grid2col ? '1fr 1fr' : undefined, flexDirection: m.grid2col ? undefined : 'column', gap: 4 }}>
                    {m.features.map(f => (
                      <div key={f} style={{ fontSize: 12, color: 'var(--text3)' }}>✓ {f}</div>
                    ))}
                  </div>
                </HoverDiv>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Who uses NestHR</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>Built for two kinds of organisations.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, marginBottom: 36, lineHeight: 1.65 }}>The same platform serves both. PlacementOS is the module that makes it work for colleges. Everything else works for startups. You only pay for what you use.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                {
                  icon: '🚀', name: 'Startups', border: '#7C3AED', checkColor: '#7C3AED',
                  desc: 'Teams of 5 to 200. Moving fast. No dedicated HR team. Need people operations that do not require a specialist to run. NestHR gives founders and ops leads a complete workforce system without the enterprise bloat.',
                  features: ['People OS + Performance OS + Expense OS', 'Talent OS for hiring pipelines', 'Learning OS for onboarding and upskilling', 'Starting at ₹799 per employee per year'],
                },
                {
                  icon: '🎓', name: 'Colleges and Institutions', border: '#E91E8C', checkColor: '#E91E8C',
                  desc: 'Placement teams managing hundreds of students across dozens of companies. PlacementOS handles the entire recruitment cycle — from JD creation to offer letters — and gets smarter every placement season.',
                  features: ['PlacementOS — full campus recruitment cycle', 'Signal learning from selection and rejection', 'Company and student dashboards', 'Placement analytics and season reporting'],
                },
              ].map(o => (
                <div key={o.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 32, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: o.border }} />
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{o.icon}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 19, color: 'var(--text)', marginBottom: 8 }}>{o.name}</div>
                  <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.68, marginBottom: 16 }}>{o.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {o.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={o.checkColor} strokeWidth="2"><polyline points="20,6 9,17 4,12" /></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLACEMENTOS DEEP DIVE */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>PlacementOS — flagship module</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>The HR module that gets smarter every cycle.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 560, marginBottom: 36, lineHeight: 1.65 }}>Most ATS systems are static — they help you manage candidates but they do not learn. PlacementOS learns from every signal your team produces and uses that to improve the next cycle.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {PLACEMENT_STEPS.map(s => (
                <div key={s.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${s.color}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: s.color, marginBottom: 10 }}>{s.step}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Pricing</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 12 }}>Simple. Per employee. No hidden modules.</h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, marginBottom: 36, lineHeight: 1.65 }}>You pay per employee per year. All seven modules included. No per-seat tricks, no module upsells, no annual contract requirements.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {[
                {
                  label: 'Starter', labelColor: 'var(--text3)', border: '1px solid var(--border)', topBar: '#8985A6',
                  price: '₹799', unit: '/employee/yr', sub: 'For teams up to 50',
                  checkColor: '#10B981',
                  features: ['All 7 OS modules', 'PlacementOS included', 'Email support'],
                  cta: null,
                },
                {
                  label: 'Growth', labelColor: '#7C3AED', border: '2px solid #7C3AED', topBar: '#7C3AED',
                  price: '₹1,299', unit: '/employee/yr', sub: 'For teams of 51 to 200',
                  badge: 'Most popular',
                  checkColor: '#7C3AED',
                  features: ['All 7 OS modules', 'PlacementOS with signal learning', 'Priority support', 'Advanced analytics'],
                  cta: null,
                },
                {
                  label: 'Enterprise', labelColor: '#2563EB', border: '1px solid var(--border)', topBar: '#2563EB',
                  price: 'Custom', unit: '', sub: 'For 200+ or colleges',
                  checkColor: '#2563EB',
                  features: ['All 7 OS modules', 'Full PlacementOS for colleges', 'Dedicated support and onboarding', 'Custom integrations available'],
                  cta: '/contact',
                },
              ].map(plan => (
                <div key={plan.label} style={{ background: 'var(--surface)', border: plan.border, borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: plan.topBar }} />
                  {plan.badge && <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4, background: 'rgba(124,58,237,.15)', color: '#7C3AED' }}>{plan.badge}</div>}
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: plan.labelColor, marginBottom: 12 }}>{plan.label}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 36, color: 'var(--text)', marginBottom: 4 }}>
                    {plan.price}<span style={{ fontSize: 16, fontWeight: 400, color: 'var(--text2)' }}>{plan.unit}</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>{plan.sub}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={plan.checkColor} strokeWidth="2"><polyline points="20,6 9,17 4,12" /></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                  {plan.cta && (
                    <Link href={plan.cta} style={{ display: 'block', textAlign: 'center', background: '#2563EB', color: '#fff', fontSize: 13.5, fontWeight: 600, padding: 11, borderRadius: 9, marginTop: 20 }}>Contact us</Link>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: '14px 20px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 10, fontSize: 13, color: 'var(--text3)', textAlign: 'center' }}>
              All plans include all 7 modules. No module upsells. No per-seat tricks. INR pricing — no forex tax.
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 48px', background: 'var(--bg2)', textAlign: 'center' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14, textAlign: 'center' }}>Get started</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', maxWidth: 520, margin: '0 auto 12px' }}>Ready to open NestHR?</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>Live now. Free trial available. All 7 modules from day one. PlacementOS included.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://nesthr.labelnest.in" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7C3AED', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Open NestHR ↗</a>
              <a href="https://nesthr.labelnest.in/manual" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Read the manual</a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>Talk to us</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
