import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { WhoWeServeCards, WhoWeServeAtlasNote } from '@/components/WhoWeServe'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/who-we-serve', {
    title: 'Who We Serve — GPs, LPs, Founders, Incubators & More | LabelNest',
    description: 'Find your entry point into the LabelNest ecosystem. GP/Fund, LP/Investor, Founder, Incubator, Ecosystem Partner, Researcher, or Data Buyer/Seller — start with the product built for you.',
  })
}

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: 'Who We Serve', path: '/who-we-serve' },
])

export default function WhoWeServePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <Nav />
      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section style={{ padding: '64px 48px', borderBottom: '1px solid var(--border)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'rgba(37,99,235,.06)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>LabelNest</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(36px,5.5vw,60px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--text)', marginBottom: 16 }}>
              Different players.<br />One connected ecosystem.
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.72, color: 'var(--text2)', maxWidth: 560, margin: '0 auto' }}>
              You don&apos;t need to understand all of LabelNest to start. Find yourself below, and go straight to the product built for you.
            </p>
          </div>
        </section>

        {/* CARDS */}
        <section style={{ padding: '64px 48px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <WhoWeServeAtlasNote />
            <WhoWeServeCards />
          </div>
        </section>

        {/* CTA */}
        <section className="border-t text-center" style={{ padding: '80px 48px', background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Still not sure?</div>
            <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(24px,3.5vw,40px)', letterSpacing: '-.03em', lineHeight: 1.08, color: 'var(--text)', maxWidth: 560, margin: '0 auto 14px' }}>
              See the whole ecosystem, product by product.
            </h2>
            <div className="flex items-center justify-center flex-wrap" style={{ gap: 12, marginTop: 20 }}>
              <Link href="/ecosystem" className="inline-flex items-center gap-2 font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ fontSize: 15, padding: '14px 28px', borderRadius: 11, background: 'var(--blue)' }}>
                Explore the Ecosystem →
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 font-medium transition-all hover:-translate-y-0.5"
                style={{ fontSize: 15, padding: '14px 28px', borderRadius: 11, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--bord2)' }}>
                Talk to the team
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
