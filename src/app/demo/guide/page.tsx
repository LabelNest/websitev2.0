import { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/demo/guide', {
    title: 'NestLens guides — LabelNest',
    description: 'Detailed guides to every NestLens module: Orbit, Ascent, Command, Connect, Atlas and Sentinel, and how they connect.',
  })
}

// The guides are self-contained pages in public/demo/guide/. Add a row here when a new one is added.
const GUIDES = [
  { file: '00-nestlens-and-sentinel-overview.html', n: '00', title: 'NestLens and Sentinel', blurb: 'Start here: the whole platform, every module on one page.' },
  { file: '01-orbit-guide.html', n: '01', title: 'Orbit', blurb: 'Incubators and programmes.' },
  { file: '02-ascent-guide.html', n: '02', title: 'Ascent', blurb: 'Founder data rooms and capital readiness.' },
  { file: '03-command-guide.html', n: '03', title: 'Command', blurb: 'The fund operating system.' },
  { file: '04-connect-guide.html', n: '04', title: 'Connect', blurb: 'Investors, founders and partners.' },
  { file: '05-atlas-guide.html', n: '05', title: 'Atlas', blurb: 'Private-market intelligence and Exchange.' },
  { file: '06-sentinel-guide.html', n: '06', title: 'Sentinel', blurb: 'Risk and AI governance, in early access.' },
  { file: '07-how-the-modules-connect.html', n: '07', title: 'How everything connects', blurb: 'Which module links to which, at what stage, and how.' },
  { file: '08-why-buyers-buy-and-how-we-differ.html', n: '08', title: 'Why buyers choose NestLens', blurb: 'The case, the buyers and the differences.' },
]

export default function GuidesPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '72px 28px 40px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>
              Demos · Guides
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(34px,5vw,56px)', fontWeight: 800, letterSpacing: '-.035em', lineHeight: 1.04, color: 'var(--text)', margin: '0 0 14px' }}>
              NestLens <span style={{ fontWeight: 300, color: 'var(--text2)' }}>in depth</span>
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 580, margin: 0 }}>
              A guide to each module, screen by screen, and how they work together. Read the first, then the module you care about.
            </p>
          </div>
        </section>
        <section style={{ padding: '36px 28px 80px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))' }}>
            {GUIDES.map((g) => (
              // Plain anchors on purpose: these are static HTML files, not app routes.
              <a key={g.file} href={`/demo/guide/${g.file}`} style={{ display: 'block', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 22px', textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#9A4B1F' }}>{g.n}</span>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-.02em', margin: '8px 0 6px', color: 'var(--text)' }}>{g.title}</h2>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>{g.blurb}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
