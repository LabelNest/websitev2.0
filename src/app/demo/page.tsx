import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CopyLink from '@/components/CopyLink'
import { pageMetadata } from '@/lib/seo'
import { DEMOS, demoUrl } from '@/lib/demos'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/demo', {
    title: 'Product demos — LabelNest',
    description: 'Watch short walkthroughs of NestLens Orbit and Ascent.',
  })
}

export default function DemosPage() {
  const items = [...DEMOS].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '72px 28px 40px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>
              Demos · LabelNest
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(34px,5vw,56px)', fontWeight: 800, letterSpacing: '-.035em', lineHeight: 1.04, color: 'var(--text)', margin: '0 0 14px' }}>
              See it <span style={{ fontWeight: 300, color: 'var(--text2)' }}>working</span>
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 560, margin: 0 }}>
              Short product walkthroughs. Each demo has its own page and a link you can copy and share.
            </p>
          </div>
        </section>
        <section style={{ padding: '36px 28px 80px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 18 }}>
            {items.map((d) => (
              <article key={d.slug} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '26px 28px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#9A4B1F' }}>{d.product}</span>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(19px,2.4vw,24px)', letterSpacing: '-.02em', lineHeight: 1.25, margin: '10px 0' }}>
                  <Link href={`/demo/${d.slug}`} style={{ color: 'var(--text)', textDecoration: 'none' }}>{d.title}</Link>
                </h2>
                <p style={{ fontSize: 14.5, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 18px' }}>{d.summary}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link href={`/demo/${d.slug}`} style={{ font: '600 13px var(--font-sans),system-ui,sans-serif', padding: '9px 14px', borderRadius: 8, background: 'var(--text)', color: 'var(--bg)', textDecoration: 'none' }}>
                    Watch the demo
                  </Link>
                  <CopyLink text={demoUrl(d.slug)} label="Copy link" copiedLabel="Link copied" variant="ghost" />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
