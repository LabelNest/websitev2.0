import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { pageMetadata } from '@/lib/seo'
import { CLIENTS } from '@/lib/clients'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/clients', {
    title: 'Trusted by — LabelNest customers and partners',
    description: 'The funds, programmes and institutions that use LabelNest.',
  })
}

// Hidden until the first logo is added to src/lib/clients.ts.
export default function ClientsPage() {
  if (CLIENTS.length === 0) notFound()
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '72px 28px 80px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Trusted by</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px,4.8vw,52px)', fontWeight: 800, letterSpacing: '-.035em', lineHeight: 1.05, color: 'var(--text)', margin: '0 0 36px' }}>
              The teams that build <span style={{ fontWeight: 300, color: 'var(--text2)' }}>with LabelNest</span>
            </h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
              {CLIENTS.map((c) => {
                const card = (
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22, textAlign: 'center', height: '100%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={c.name} style={{ maxWidth: '100%', maxHeight: 56, objectFit: 'contain', margin: '0 auto 12px', display: 'block' }} />
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{c.name}</div>
                    {c.note && <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{c.note}</div>}
                  </div>
                )
                return c.url
                  ? <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{card}</a>
                  : <div key={c.name}>{card}</div>
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
