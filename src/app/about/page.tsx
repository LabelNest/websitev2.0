import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JourneyMap from '@/components/JourneyMap'
import { pageMetadata, breadcrumbSchema } from '@/lib/seo'
import { getContent, text, items } from '@/lib/siteContent'
import { getAtlasStats, deepFill } from '@/lib/plans'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about', {
    title: 'About LabelNest — a private markets data company in Bengaluru',
    description: 'LabelNest makes reviewed private markets data, sourced from registers and primary documents and dated field by field, and the software that fund managers, founders and programmes run on it. Founded 2025, Bengaluru.',
  })
}

const CSS = `
.ab-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));border-top:1px solid var(--text)}
.ab-cols>div{padding:26px 28px 30px 0;border-bottom:1px solid var(--border)}
.ab-cols h3{font-family:var(--font-serif),serif;font-weight:400;font-size:26px;line-height:1.15;color:var(--text);margin:0 0 10px}
.ab-cols p{margin:0;font-size:15.5px}
.ab-dl{display:grid;grid-template-columns:200px 1fr;gap:10px 32px;margin:0;border-top:1px solid var(--text)}
.ab-dl dt,.ab-dl dd{margin:0;padding:16px 0;border-bottom:1px solid var(--border)}
.ab-dl dt{color:var(--text3);font-size:14px}
.ab-dl dd{color:var(--text)}
@media (max-width:640px){.ab-dl{grid-template-columns:1fr;gap:0}.ab-dl dt{border-bottom:none;padding-bottom:0}}
`

export default async function AboutPage() {
  const [raw, st] = await Promise.all([getContent(), getAtlasStats()])
  const c = deepFill(raw, st)
  const crumbs = breadcrumbSchema([{ name: 'About', path: '/about' }])
  const org = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'LabelNest', legalName: 'LabelNest India Private Limited', url: 'https://labelnest.in',
    foundingDate: '2025', description: text(c, 'about.hero.lead'),
    address: { '@type': 'PostalAddress', streetAddress: 'No. 33, 4th Floor, 1st Main, CBI Main Rd, HMT Layout, Ganganagar', addressLocality: 'Bengaluru', postalCode: '560032', addressCountry: 'IN' },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <style>{CSS}</style>
      <Nav />
      <main className="ln-page">

        <section style={{ padding: '88px 0 80px' }}>
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 56, alignItems: 'end' }}>
            <div>
              <p className="ln-eyebrow ln-rise">{text(c, 'about.hero.eyebrow')}</p>
              <h1 className="ln-h1 ln-rise" style={{ ['--d' as string]: '.1s' }}>{text(c, 'about.hero.title')}</h1>
            </div>
            <div className="ln-rise" style={{ ['--d' as string]: '.25s' }}>
              <p className="ln-lead" style={{ margin: '0 0 28px', maxWidth: '32em' }}>{text(c, 'about.hero.lead')}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}><Link className="ln-btn" href="/team">Meet the team</Link><Link className="ln-btn line" href="/about/ankit">Meet the founder</Link></div>
            </div>
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--text)', borderBottom: '1px solid var(--border)' }}>
          <div className="ln-wrap" style={{ padding: '36px 28px' }}>
            <p className="ln-small" style={{ margin: '0 0 20px' }}>{text(c, 'about.numbers.title')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 28 }}>
              {items(c, 'about.numbers.items').map((n, i) => <div key={i}><div className="ln-serif" style={{ fontSize: 42, lineHeight: 1 }}>{n.value}</div><div className="ln-small" style={{ marginTop: 8 }}>{n.label}</div></div>)}
            </div>
          </div>
        </section>

        <section className="ln-sec">
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 64 }}>
            <div><p className="ln-eyebrow">What we do</p><h2 className="ln-h2">{text(c, 'about.what.title')}</h2></div>
            <div style={{ display: 'grid', gap: 18 }}>
              <p className="ln-lead" style={{ margin: 0 }}>{text(c, 'about.what.body1')}</p>
              <p style={{ margin: 0 }}>{text(c, 'about.what.body2')}</p>
              <p style={{ margin: 0 }}>{text(c, 'about.what.body3')}</p>
              <p style={{ margin: '6px 0 0' }}><Link className="ln-tlink" href="/ecosystem">See how the products connect</Link></p>
            </div>
          </div>
        </section>

        <section className="ln-night ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">How we work</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em' }}>{text(c, 'about.standard.title')}</h2>
            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '40px 48px' }}>
              {items(c, 'about.standard.items').map((m, i) => (
                <div key={i} style={{ borderTop: '1px solid #2a3b55', paddingTop: 20 }}>
                  <h3 className="ln-serif" style={{ fontSize: 26, lineHeight: 1.15, margin: '0 0 10px', color: 'var(--onnight)' }}>{m.title}</h3>
                  <p style={{ margin: 0, color: 'var(--mutenight)', fontSize: 15.5 }}>{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">Principles</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em', marginBottom: 44 }}>{text(c, 'about.principles.title')}</h2>
            <div className="ab-cols">
              {items(c, 'about.principles.items').map((p, i) => <div key={i}><span className="ln-serif" style={{ color: 'var(--pink)', fontSize: 22 }}>0{i + 1}</span><h3 style={{ marginTop: 6 }}>{p.title}</h3><p>{p.body}</p></div>)}
            </div>
          </div>
        </section>

        <JourneyMap />

        <section className="ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">Who we serve</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em', marginBottom: 44 }}>{text(c, 'about.serve.title')}</h2>
            <div className="ab-cols">
              {items(c, 'about.serve.items').map((a, i) => <div key={i}><h3>{a.title}</h3><p>{a.body}</p>{a.href && <p style={{ marginTop: 12 }}><Link className="ln-tlink" href={a.href}>Read more</Link></p>}</div>)}
            </div>
          </div>
        </section>

        <section className="ln-rule ln-sec">
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 64 }}>
            <div><p className="ln-eyebrow">Company</p><h2 className="ln-h2">{text(c, 'about.company.title')}</h2><p style={{ marginTop: 18 }}><Link className="ln-tlink" href="/legal">All legal documents</Link></p></div>
            <dl className="ab-dl">
              {items(c, 'about.company.items').map((d, i) => <div key={i} style={{ display: 'contents' }}><dt>{d.label}</dt><dd>{d.value}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="ln-night ln-sec" style={{ padding: '96px 0' }}>
          <div className="ln-wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 40 }}>
            <h2 className="ln-h2" style={{ maxWidth: '16em' }}>{text(c, 'about.cta.title')}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}><Link className="ln-btn light" href="/contact">Contact us</Link><Link className="ln-btn lightline" href="/careers">We are hiring</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
