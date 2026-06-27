import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Managed Services', description: 'LabelNest Managed Services puts expert human judgment where automation fails. Data sourcing, enrichment, annotation, quality, and ongoing ops — done correctly.' }

const SERVICES = [
  { color: '#10B981', icon: '🗂️', name: 'Data Sourcing and Enrichment', desc: 'We find, structure, and enrich data to the standard your systems expect. Private market entities, contacts, fund data, company profiles — built from primary sources with full provenance.', items: ['Entity sourcing from regulatory filings, websites, and news','Contact identification and verification','Cap table and ownership structure research','Fund and deal data enrichment','Company profile building to your field specification'] },
  { color: '#2563EB', icon: '✅', name: 'Data Quality and Annotation', desc: 'Expert reviewers who understand context — not just label instructions. Human verification at the edge cases where models produce unreliable outputs, with full QA audit trails.', items: ['AI training data annotation with domain expertise','Document extraction review and correction','Model output validation and QA sampling','Entity deduplication and conflict resolution','Confidence-based routing to human review'] },
  { color: '#F97316', icon: '🔄', name: 'Ongoing Data Operations', desc: 'Standing operations for data maintenance, refresh cycles, and pipeline QA. We run the engine on a recurring basis so you do not have to build and staff it internally.', items: ['Monthly and quarterly data refresh cycles','Ongoing entity monitoring and update tracking','Pipeline QA and exception handling','Contact health score maintenance','Signal monitoring and alerting'] },
  { color: '#7C3AED', icon: '📄', name: 'Document and PDF Intelligence', desc: 'Extraction from complex financial documents, DDQs, LP letters, pitch decks, annual reports, and regulatory filings. Structured outputs with recursive human feedback on extraction accuracy.', items: ['Financial document extraction (fund reports, filings)','DDQ and LP letter processing','Nested table and complex structure handling','OCR and scanned document workflows','Field-level extraction QA and correction'] },
  { color: '#E91E8C', icon: '🏗️', name: 'Custom Data Workflow Design', desc: 'Need something specific that does not fit a standard service? We design and operate bespoke data workflows from intake to structured output for research teams, funds, and platforms.', items: ['Workflow scoping and specification','Custom field taxonomy design','Pilot run with quality benchmarking','Scale-up with standing QA cadence','Output format matched to your system requirements'] },
  { color: '#10B981', icon: '🎯', name: 'Contacts Intelligence', desc: 'Verified decision-maker intelligence for GTM and research. Role identification, relationship graph mapping, contact enrichment, and coverage building for target firm lists.', items: ['Decision-maker identification by firm and role','Email and LinkedIn verification','Relationship and reporting structure mapping','People-moves detection and update tracking','Coverage building for custom firm lists'] },
]

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="px-8 py-24 relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'rgba(16,185,129,0.07)', filter: 'blur(90px)' }} />
          <div className="max-w-[1240px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-5" style={{ color: 'var(--text3)' }}>Managed Services · LabelNest</div>
              <h1 className="font-display font-extrabold tracking-tight leading-[1.04] mb-5"
                style={{ fontSize: 'clamp(38px,5.2vw,62px)', color: 'var(--text)' }}>
                The hard data work.
                <br />
                <span style={{ background: 'linear-gradient(100deg,#10B981,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Done correctly.</span>
              </h1>
              <p className="text-[clamp(15px,1.8vw,18px)] leading-[1.74] mb-8" style={{ color: 'var(--text2)' }}>
                Not everything should be automated. Some data problems require <strong style={{ color: 'var(--text)', fontWeight: 600 }}>expert human judgment at the edge cases</strong> — where models fail, where context matters, and where the cost of getting it wrong is higher than the cost of getting it right slowly.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="#contact" className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-6 py-3.5 rounded-[10px] text-white"
                  style={{ background: 'var(--green)' }}>Talk about your project</Link>
                <a href="#services" className="inline-flex items-center gap-2 font-medium text-[14.5px] px-6 py-3.5 rounded-[10px] border"
                  style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'var(--bord2)' }}>See what we do</a>
              </div>
            </div>
            <div className="rounded-[18px] p-7 relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#10B981,#2563EB)' }} />
              <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-4" style={{ color: 'var(--text3)' }}>What managed services means here</div>
              {[
                ['🧠','Human expertise, not just headcount','Our team understands the domain — private markets, AI training data, document intelligence — not just the task format.'],
                ['🔄','We run the workflow, you get the output','No setup overhead. We design, run, and QA the pipeline. You receive structured, verified data.'],
                ['📈','Scales when you need it','From a single research project to a standing operation. Same quality at any volume.'],
                ['🔗','Connected to the LabelNest stack','Work feeds into DataNest, NestIntel, and NestLens — or delivered as standalone output to your systems.'],
              ].map(([icon,name,desc]) => (
                <div key={name as string} className="flex items-start gap-3 py-3.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-[18px] flex-shrink-0">{icon}</span>
                  <div>
                    <div className="font-display font-bold text-[14px] mb-1" style={{ color: 'var(--text)' }}>{name}</div>
                    <div className="text-[12.5px] leading-[1.55]" style={{ color: 'var(--text2)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="px-8 py-16 border-t" id="services" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--green)' }}>What we offer</div>
            <h2 className="font-display font-extrabold tracking-tight mb-10" style={{ fontSize: 'clamp(26px,3.5vw,44px)', color: 'var(--text)' }}>Five service areas. One consistent standard.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map(s => (
                <div key={s.name} className="rounded-[16px] p-7 relative overflow-hidden transition-all hover:-translate-y-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity" style={{ background: s.color }} />
                  <div className="text-[30px] mb-4">{s.icon}</div>
                  <div className="font-display font-extrabold text-[18px] tracking-tight mb-2" style={{ color: 'var(--text)' }}>{s.name}</div>
                  <p className="text-[13.5px] leading-[1.68] mb-4" style={{ color: 'var(--text2)' }}>{s.desc}</p>
                  <div className="flex flex-col gap-1.5">
                    {s.items.map(i => (
                      <div key={i} className="flex items-center gap-2 text-[12.5px]" style={{ color: 'var(--text2)' }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />{i}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="px-8 py-16">
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--green)' }}>How it works</div>
            <h2 className="font-display font-extrabold tracking-tight mb-10" style={{ fontSize: 'clamp(26px,3.5vw,44px)', color: 'var(--text)' }}>From brief to structured output. Four steps.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[['01','Brief and scope','You describe the data problem. We define the workflow, timeline, and team.'],['02','Pilot run','Small-scale pilot to validate the workflow and establish quality benchmarks.'],['03','Full delivery','Scaled delivery with continuous QA, exception handling, and audit trails.'],['04','Standing ops','For recurring work — refresh cycles, monitoring, ongoing enrichment at agreed cadence.']].map(([n,t,d]) => (
                <div key={n as string} className="rounded-[14px] p-6 text-center transition-all hover:-translate-y-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="font-display font-extrabold text-[28px] mb-3 leading-none" style={{ color: 'var(--green)' }}>{n}</div>
                  <div className="font-display font-bold text-[14px] mb-2" style={{ color: 'var(--text)' }}>{t}</div>
                  <div className="text-[12.5px] leading-[1.55]" style={{ color: 'var(--text2)' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="px-8 py-16 border-t" id="contact" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-16 items-center justify-between">
            <div className="max-w-[480px]">
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--green)' }}>Talk to us</div>
              <h2 className="font-display font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--text)' }}>Tell us what you are working on</h2>
              <p className="text-[15px] leading-[1.72]" style={{ color: 'var(--text2)' }}>
                Every engagement starts with a conversation. Describe the data problem, and we will tell you whether and how we can help — and what it would cost. No obligation, no sales cycle.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/contact"
                className="inline-flex items-center gap-2 font-semibold text-[14.5px] px-8 py-4 rounded-[10px] text-white"
                style={{ background: 'var(--green)' }}>
                Start a conversation →
              </Link>
              <a href="mailto:ops@labelnest.in" className="text-center text-[13px]" style={{ color: 'var(--text2)' }}>
                or email ops@labelnest.in directly
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
