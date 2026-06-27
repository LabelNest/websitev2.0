import { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getBriefings } from '@/lib/db'
import { scopeColor, scopeLabel, slugToEmoji, authorGradient } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Briefings',
  description:
    'Writing from the LabelNest team on private markets, data infrastructure, AI supply chains, and what it takes to build things that work.',
}

export const revalidate = 3600 // ISR: rebuild every hour

export default async function BriefingsPage() {
  const briefings = await getBriefings()
  const featured = briefings.filter((b) => b.is_featured)
  const rest = briefings.filter((b) => !b.is_featured)

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>
        {/* Header */}
        <section
          className="px-8 pt-16 pb-12 border-b relative overflow-hidden"
          style={{ borderColor: 'var(--border)' }}
        >
          <div
            className="absolute -top-24 -left-20 w-[460px] h-[460px] rounded-full pointer-events-none"
            style={{ background: 'rgba(249,115,22,0.07)', filter: 'blur(90px)' }}
          />
          <div className="max-w-[1240px] mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div
                className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-4"
                style={{ color: 'var(--text3)' }}
              >
                Briefings · LabelNest
              </div>
              <h1
                className="font-display font-extrabold tracking-tight leading-[1.02]"
                style={{ fontSize: 'clamp(36px,5.5vw,64px)', color: 'var(--text)' }}
              >
                How we think about
                <br />
                <span style={{ color: 'var(--text2)', fontWeight: 300 }}>
                  data, markets, and building
                </span>
              </h1>
              <p className="mt-4 text-[15.5px] leading-relaxed max-w-[480px]" style={{ color: 'var(--text2)' }}>
                Direct writing from the LabelNest team on private markets, India's AI supply chain,
                data infrastructure, and what it takes to build things that work.
              </p>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <div className="font-display font-extrabold text-[28px] tracking-tight" style={{ color: 'var(--orange)' }}>
                  {briefings.length}
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text3)' }}>Briefings</div>
              </div>
              <div className="text-center">
                <div className="font-display font-extrabold text-[28px] tracking-tight" style={{ color: 'var(--blue)' }}>4</div>
                <div className="text-[11px]" style={{ color: 'var(--text3)' }}>Authors</div>
              </div>
              <div className="text-center">
                <div className="font-display font-extrabold text-[28px] tracking-tight" style={{ color: 'var(--pink)' }}>
                  {featured.length}
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text3)' }}>Featured</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-[1240px] mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          {/* Main */}
          <div>
            {/* Featured */}
            {featured.map((b) => (
              <Link
                key={b.slug}
                href={`/briefings/${b.slug}`}
                className="block rounded-[18px] overflow-hidden mb-6 transition-all duration-200 hover:-translate-y-[3px]"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {/* Cover placeholder */}
                <div
                  className="h-[180px] flex items-center justify-center text-[48px]"
                  style={{
                    background: 'linear-gradient(135deg,rgba(249,115,22,.1),rgba(233,30,140,.06))',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span className="opacity-30">{slugToEmoji(b.slug)}</span>
                  <span
                    className="absolute top-4 left-4 font-mono text-[9.5px] tracking-[.1em] uppercase px-2.5 py-1 rounded text-white"
                    style={{ background: 'var(--orange)' }}
                  >
                    Featured
                  </span>
                </div>
                <div className="p-7">
                  <div className="font-mono text-[9.5px] tracking-[.1em] uppercase mb-2.5" style={{ color: 'var(--orange)' }}>
                    {scopeLabel(b.scope)}
                  </div>
                  <h2 className="font-display font-extrabold text-[20px] tracking-tight leading-[1.2] mb-3" style={{ color: 'var(--text)' }}>
                    {b.title}
                  </h2>
                  <p className="text-[14px] leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text2)' }}>
                    {b.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center font-display font-extrabold text-[11px] text-white"
                        style={{ background: authorGradient(b.author_name) }}
                      >
                        {b.author_name[0]}
                      </div>
                      <span className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>{b.author_name}</span>
                    </div>
                    <span className="font-mono text-[10px] tracking-wide" style={{ color: 'var(--text3)' }}>
                      {b.read_time}
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Rest */}
            <div className="flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
              {rest.map((b) => (
                <Link
                  key={b.slug}
                  href={`/briefings/${b.slug}`}
                  className="flex gap-4 items-start py-5 group"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div
                    className="w-20 h-20 rounded-[10px] flex items-center justify-center text-[28px] flex-shrink-0"
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}
                  >
                    {slugToEmoji(b.slug)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[9px] tracking-[.1em] uppercase mb-1.5" style={{ color: 'var(--text3)' }}>
                      {scopeLabel(b.scope)}
                    </div>
                    <div
                      className="font-display font-bold text-[15.5px] tracking-tight leading-[1.3] mb-1.5 transition-colors group-hover:text-[var(--orange)]"
                      style={{ color: 'var(--text)' }}
                    >
                      {b.title}
                    </div>
                    <p className="text-[13px] leading-relaxed mb-2.5 line-clamp-2" style={{ color: 'var(--text2)' }}>
                      {b.summary}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-medium" style={{ color: 'var(--text2)' }}>{b.author_name}</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'var(--text3)' }} />
                      <span className="text-[12px]" style={{ color: 'var(--text3)' }}>{b.date}</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'var(--text3)' }} />
                      <span className="font-mono text-[10px]" style={{ color: 'var(--text3)' }}>{b.read_time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 flex flex-col gap-4">
              {/* Newsletter */}
              <div
                className="rounded-[14px] p-5 relative overflow-hidden"
                style={{ background: 'var(--surface)', border: '1px solid var(--bord2)' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,#F97316,#E91E8C)' }} />
                <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-2" style={{ color: 'var(--orange)' }}>
                  Founder's Newsletter
                </div>
                <div className="font-display font-bold text-[15px] tracking-tight mb-1" style={{ color: 'var(--text)' }}>
                  Operator to Founder
                </div>
                <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
                  Building LabelNest from zero. Sharing the journey as it happens.
                </p>
                <a
                  href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7472967819387686913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center font-semibold text-[13px] py-2.5 rounded-lg text-white transition-opacity hover:opacity-88"
                  style={{ background: 'var(--orange)' }}
                >
                  Follow on LinkedIn ↗
                </a>
              </div>

              {/* Authors */}
              <div className="rounded-[14px] p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-3" style={{ color: 'var(--text3)' }}>
                  Authors
                </div>
                {['Ankit Suman', 'Shubham Singh', 'Sumedha Pandey', 'LabelNest'].map((a) => (
                  <div key={a} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center font-display font-extrabold text-[11px] text-white"
                      style={{ background: authorGradient(a) }}
                    >
                      {a[0]}
                    </div>
                    <span className="text-[13px]" style={{ color: 'var(--text2)' }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
