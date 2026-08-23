import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NestLensModuleNav from '@/components/NestLensModuleNav'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/access', {
    title: 'How to Get Access — NestLens',
    description: 'Two ways to get into any NestLens module: buy a plan yourself and start immediately, or request access and hear back within a business day. Plus how to manage who on your team has access.',
  })
}

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'NestLens', path: '/nestlens' },
  { name: 'How to get access', path: '/access' },
])

const MODULES = [
  { name: 'Atlas', color: '#2563EB', selfServe: 'Individual and firm plans', enterprise: '1,000+ firms, custom seats & SLA — includes all Observatory reports' },
  { name: 'Exchange', color: '#7C3AED', selfServe: 'Free to browse; Priority for active sellers', enterprise: 'High-volume buyer or seller, custom credit arrangements' },
  { name: 'Orbit', color: '#7C3AED', selfServe: 'Programme Management, up to 1,00,000 applications', enterprise: 'Multiple simultaneous programmes, custom volume & SLA' },
  { name: 'Ascent', color: '#10B981', selfServe: 'Founder Data Room, or Cohort/Group for accelerators', enterprise: 'Cohort access at accelerator/incubator scale' },
  { name: 'Command', color: '#F97316', selfServe: 'Fund Data Room', enterprise: 'Multiple funds, custom LP/portfolio room counts & SLA' },
  { name: 'Connect', color: '#06B6D4', selfServe: 'Included with an active Ascent or Command plan', enterprise: '—' },
]

const ROLES = [
  { role: 'Owner', can: 'Everything — the original account, can’t be removed by anyone else' },
  { role: 'Admin', can: 'Invite people, change anyone’s role, remove members' },
  { role: 'Member', can: 'Full workspace access, can’t manage other people' },
  { role: 'Viewer', can: 'Read-only access' },
]

export default function AccessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <Nav />
      <NestLensModuleNav />
      <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ padding: '72px 48px 56px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Access</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px,5vw,50px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--text)', marginBottom: 16 }}>Two ways in. No third option to guess at.</h1>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.7 }}>Every NestLens module works the same way: buy a plan yourself and you&apos;re in immediately, or ask for access and a real person gets back to you.</p>
          </div>
        </section>

        {/* TWO PATHS */}
        <section style={{ padding: '56px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 24 }}>

            <div style={{ background: 'var(--surface)', border: '1px solid #2563EB', borderRadius: 16, padding: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 10 }}>Instant</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>Buy a plan yourself</h2>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 16 }}>
                Every module has at least one self-serve tier — pick it, pay through Razorpay, and your access opens the moment payment clears. No form, no waiting on anyone.
              </p>
              <Link href="/nestlens/pricing" style={{ fontSize: 13.5, fontWeight: 600, color: '#2563EB' }}>See what&apos;s self-serve on each module →</Link>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>~1 business day</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>Request access</h2>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 16 }}>
                Need Enterprise pricing, a custom volume or SLA, or just want to talk to someone first? Requesting access opens a real support ticket with our team (via NestResolve) and you get an email confirmation right away — we typically respond within a business day.
              </p>
              <a href="https://nestlens.labelnest.in/enterprise-enquiry" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>Enquire about Enterprise or Bundle ↗</a>
            </div>

          </div>
        </section>

        {/* PER-MODULE BREAKDOWN */}
        <section style={{ padding: '56px 48px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>What&apos;s self-serve, module by module</h2>
            <p style={{ fontSize: 13.5, color: 'var(--text3)', marginBottom: 28 }}>Every module below has a real self-serve tier. Enterprise is request-only everywhere — that&apos;s by design, not a limitation of any one module.</p>
            <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              {MODULES.map((m, i) => (
                <div key={m.name} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 16, padding: '18px 22px',
                  borderBottom: i < MODULES.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)',
                }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: m.color }}>{m.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.5 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.04em', display: 'block', marginBottom: 2 }}>Self-serve</span>
                    {m.selfServe}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.5 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.04em', display: 'block', marginBottom: 2 }}>Enterprise</span>
                    {m.enterprise}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM ACCESS */}
        <section style={{ padding: '56px 48px', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Once you&apos;re in: managing who else has access</h2>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 700, marginBottom: 28 }}>
              Every workspace has a real Members page. Invite a colleague by email — the link expires in 7 days — and assign their role. Admins can change anyone&apos;s role or remove them; other roles can only view who&apos;s there.
            </p>
            <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', maxWidth: 700 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', padding: '10px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Role</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Can do</div>
              </div>
              {ROLES.map((r, i) => (
                <div key={r.role} style={{
                  display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12, padding: '14px 20px',
                  borderBottom: i < ROLES.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 === 0 ? 'var(--bg2)' : 'var(--surface)',
                }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 13.5, color: 'var(--text)' }}>{r.role}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)' }}>{r.can}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '56px 48px', textAlign: 'center' }}>
          <a href="https://nestlens.labelnest.in" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--text)', color: 'var(--bg)', fontSize: 14.5, fontWeight: 700, padding: '13px 30px', borderRadius: 10 }}>
            Go to NestLens ↗
          </a>
        </section>

      </main>
      <Footer />
    </>
  )
}
