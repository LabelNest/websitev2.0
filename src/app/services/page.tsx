import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Managed Services — LabelNest',
  description: 'Expert human data operations. Data sourcing, enrichment, annotation, quality, and custom workflow design.',
}

export default function ServicesPage() {
  return (
    <>
      <style>{`
        .svc-card { background: var(--surface); border: 1px solid rgba(255,255,255,.07); border-radius: 16px; padding: 28px; transition: border-color .2s, transform .2s; }
        .svc-card:hover { border-color: rgba(16,185,129,.3) !important; transform: translateY(-3px); }
      `}</style>
      <Nav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid rgba(255,255,255,.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(16,185,129,.07)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Managed Services · LabelNest</div>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(38px,5.2vw,62px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.04, color: 'var(--text)', marginBottom: 16 }}>
                The hard data work.<br />
                <span style={{ background: 'linear-gradient(100deg,#10B981,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Done correctly.</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.74, color: 'var(--text2)', marginBottom: 28 }}>Not everything should be automated. Some data problems require <strong style={{ color: 'var(--text)', fontWeight: 600 }}>expert human judgment at the edge cases</strong> — where models fail, where context matters, and where the cost of getting it wrong is higher than the cost of getting it right slowly.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#10B981', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Talk about your project</a>
                <a href="#services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)' }}>See what we do</a>
              </div>
            </div>

            {/* Info panel */}
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 18, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#10B981,#2563EB)' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>What managed services means here</div>
              {[
                { icon: '🧠', title: 'Human expertise, not just headcount', desc: 'Our team understands the domain — private markets, AI training data, document intelligence — not just the task format.' },
                { icon: '🔄', title: 'We run the workflow, you get the output', desc: 'No setup overhead. We design, run, and QA the pipeline. You receive structured, verified data.' },
                { icon: '📈', title: 'Scales when you need it', desc: 'From a single research project to a standing operation. Same quality at any volume.' },
                { icon: '🔗', title: 'Connected to the LabelNest stack', desc: 'Work feeds into DataNest and NestLens — or delivered as standalone output to your systems.' },
              ].map((item, i) => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{ padding: '64px 48px', background: 'var(--bg2)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>What we offer</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 32 }}>Five service areas. One consistent standard.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                {
                  icon: '🗂️', border: '#10B981', title: 'Data Sourcing and Enrichment',
                  desc: 'We find, structure, and enrich data to the standard your systems expect. Private market entities, contacts, fund data — built from primary sources with full provenance.',
                  items: ['Entity sourcing from regulatory filings and websites', 'Contact identification and verification', 'Cap table and ownership structure research', 'Company profile building to your field specification'],
                },
                {
                  icon: '✅', border: '#2563EB', title: 'Data Quality and Annotation',
                  desc: 'Expert reviewers who understand context — not just label instructions. Human verification at the edge cases where models produce unreliable outputs.',
                  items: ['AI training data annotation with domain expertise', 'Document extraction review and correction', 'Model output validation and QA sampling', 'Entity deduplication and conflict resolution'],
                },
                {
                  icon: '🔄', border: '#F97316', title: 'Ongoing Data Operations',
                  desc: 'Standing operations for data maintenance, refresh cycles, and pipeline QA — on a recurring basis so you do not have to build and staff it internally.',
                  items: ['Monthly and quarterly data refresh cycles', 'Ongoing entity monitoring and update tracking', 'Pipeline QA and exception handling'],
                },
                {
                  icon: '📄', border: '#7C3AED', title: 'Document and PDF Intelligence',
                  desc: 'Extraction from complex financial documents, DDQs, LP letters, pitch decks, annual reports, and regulatory filings. Structured outputs with human feedback on accuracy.',
                  items: ['Financial document extraction (fund reports, filings)', 'DDQ and LP letter processing', 'Nested table and complex structure handling'],
                },
              ].map(s => (
                <div key={s.title} className="svc-card" style={{ borderTop: `3px solid ${s.border}` }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 8 }}>{s.title}</div>
                  <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.68, marginBottom: 12 }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {s.items.map(item => <div key={item} style={{ fontSize: 12, color: 'var(--text3)' }}>✓ {item}</div>)}
                  </div>
                </div>
              ))}

              {/* Wide card - Custom Workflow */}
              <div className="svc-card" style={{ gridColumn: 'span 2', borderTop: '3px solid #E91E8C' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>🏗️</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 8 }}>Custom Data Workflow Design</div>
                    <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.68 }}>Need something specific that does not fit a standard service? We design and operate bespoke data workflows from intake to structured output for research teams, funds, and platforms.</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 52 }}>
                    {['Workflow scoping and specification', 'Custom field taxonomy design', 'Pilot run with quality benchmarking', 'Scale-up with standing QA cadence', 'Output format matched to your system'].map(item => (
                      <div key={item} style={{ fontSize: 12, color: 'var(--text3)' }}>✓ {item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>How it works</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 32 }}>From brief to structured output. Four steps.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                { num: '01', title: 'Brief and scope', desc: 'You describe the data problem. We define the workflow, timeline, and team.' },
                { num: '02', title: 'Pilot run', desc: 'Small-scale pilot to validate the workflow and establish quality benchmarks.' },
                { num: '03', title: 'Full delivery', desc: 'Scaled delivery with continuous QA, exception handling, and audit trails.' },
                { num: '04', title: 'Standing ops', desc: 'For recurring work — refresh cycles, monitoring, ongoing enrichment at agreed cadence.' },
              ].map(step => (
                <div key={step.num} style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 22, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 32, color: '#10B981', marginBottom: 10 }}>{step.num}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 6 }}>{step.title}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.55 }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" style={{ padding: '64px 48px', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 500 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Talk to us</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 10 }}>Tell us what you are working on</h2>
              <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.72 }}>Every engagement starts with a conversation. Describe the data problem, and we will tell you whether and how we can help — and what it would cost. No obligation, no sales cycle.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#10B981', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11 }}>Start a conversation →</Link>
              <a href="mailto:ops@labelnest.in" style={{ textAlign: 'center', fontSize: 13, color: 'var(--text3)' }}>or email ops@labelnest.in directly</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
