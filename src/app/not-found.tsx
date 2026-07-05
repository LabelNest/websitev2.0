import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Page Not Found — LabelNest',
  description: "The page you're looking for doesn't exist. Explore LabelNest products and briefings instead.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 48px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>404</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--text)', marginBottom: 16 }}>Page not found</h1>
          <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 32 }}>
            The page you're looking for doesn't exist or has moved. Try one of the links below.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563EB', color: '#fff', fontSize: 14.5, fontWeight: 600, padding: '13px 26px', borderRadius: 11, textDecoration: 'none' }}>Go home</Link>
            <Link href="/nestlens" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>Explore NestLens</Link>
            <Link href="/briefings" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', color: 'var(--text)', fontSize: 14.5, fontWeight: 500, padding: '13px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>Read briefings</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
