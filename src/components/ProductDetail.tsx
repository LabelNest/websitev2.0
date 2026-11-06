import Link from 'next/link'
import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getContent, text, items } from '@/lib/siteContent'
import { getAtlasStats, deepFill } from '@/lib/plans'
import { breadcrumbSchema } from '@/lib/seo'
import type { ProductId } from '@/lib/productDetail'
import PortalMock from '@/components/PortalMock'

// The long product page: what is inside, the features (with screenshots), why it holds, how it differs, who uses it, FAQ.
// All copy comes from the admin-editable registry (lib/productDetail.ts). Nothing here names another company.

interface Props {
  id: ProductId
  name: string
  path: string
  schemaType: string
  primary: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string }
  stats?: { label: string; value: string }[]
  children?: ReactNode
}

const CSS = `
.pd-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));border-top:1px solid var(--text)}
.pd-grid>div{padding:26px 28px 30px 0;border-bottom:1px solid var(--border)}
.pd-grid h3{font-family:var(--font-serif),serif;font-weight:400;font-size:26px;line-height:1.15;color:var(--text);margin:0 0 10px}
.pd-grid p{margin:0;font-size:15.5px}
.pd-feat{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:48px;align-items:center;padding:56px 0;border-top:1px solid var(--border)}
.pd-feat:first-child{border-top:1px solid var(--text)}
.pd-feat h3{font-family:var(--font-serif),serif;font-weight:400;font-size:32px;line-height:1.1;color:var(--text);margin:0 0 14px}
.pd-feat p{margin:0;font-size:16.5px;line-height:1.65}
.pd-shot{border:1px solid var(--bord2);box-shadow:0 30px 60px -30px rgba(14,27,46,.3);background:var(--surface);line-height:0}
.pd-shot img{width:100%;height:auto;display:block}
.pd-who{display:grid;grid-template-columns:minmax(180px,.5fr) 1.5fr;gap:12px 40px;padding:20px 0;border-top:1px solid var(--border)}
.pd-who b{font-family:var(--font-serif),serif;font-weight:400;font-size:22px;color:var(--text)}
@media (max-width:700px){.pd-who{grid-template-columns:1fr}}
.pd-faq details{border-top:1px solid var(--border);padding:18px 0}
.pd-faq details:last-child{border-bottom:1px solid var(--border)}
.pd-faq summary{cursor:pointer;font-family:var(--font-serif),serif;font-size:22px;color:var(--text);list-style:none}
.pd-faq summary::-webkit-details-marker{display:none}
.pd-faq summary::after{content:"+";float:right;color:var(--pink)}
.pd-faq details[open] summary::after{content:"–"}
.pd-faq p{margin:12px 0 0;max-width:46em}
`

export default async function ProductDetail({ id, name, path, schemaType, primary, secondary, stats, children }: Props) {
  const [raw, st] = await Promise.all([getContent(), getAtlasStats()])
  const c = deepFill(raw, st)
  const k = (s: string) => `pd.${id}.${s}`
  const faq = items(c, k('faq'))
  const features = items(c, k('features'))

  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name,
    description: text(c, k('lead')),
    url: `https://labelnest.in${path}`,
    publisher: { '@type': 'Organization', name: 'LabelNest India Private Limited', url: 'https://labelnest.in' },
    featureList: features.map((f) => f.title),
  }
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const crumbs = breadcrumbSchema([{ name: 'NestLens', path: '/nestlens' }, { name, path }])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faq.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <style>{CSS}</style>
      <Nav />
      <main className="ln-page">

        <section style={{ padding: '88px 0 80px' }}>
          <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 56, alignItems: 'end' }}>
            <div>
              <p className="ln-eyebrow ln-rise">{text(c, k('eyebrow'))}</p>
              <h1 className="ln-h1 ln-rise" style={{ ['--d' as string]: '.1s' }}>{text(c, k('title'))}</h1>
            </div>
            <div className="ln-rise" style={{ ['--d' as string]: '.25s' }}>
              <p className="ln-lead" style={{ margin: '0 0 28px', maxWidth: '32em' }}>{text(c, k('lead'))}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                {primary.external ? <a className="ln-btn" href={primary.href} target="_blank" rel="noopener noreferrer">{primary.label}</a> : <Link className="ln-btn" href={primary.href}>{primary.label}</Link>}
                {secondary && <Link className="ln-btn line" href={secondary.href}>{secondary.label}</Link>}
              </div>
              <p className="ln-small" style={{ margin: '16px 0 0' }}>{text(c, k('note'))}</p>
              {primary.external && <p className="ln-small" style={{ margin: '6px 0 0' }}>Live at <a className="ln-tlink" href={primary.href} target="_blank" rel="noopener noreferrer">{primary.href.replace(/^https?:\/\//, '')}</a></p>}
            </div>
          </div>
        </section>

        {stats && stats.length > 0 && (
          <section style={{ borderTop: '1px solid var(--text)', borderBottom: '1px solid var(--border)' }}>
            <div className="ln-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 24, padding: '36px 28px' }}>
              {stats.map((s) => (
                <div key={s.label}><div className="ln-serif" style={{ fontSize: 40, lineHeight: 1 }}>{s.value}</div><div className="ln-small" style={{ marginTop: 8 }}>{s.label}</div></div>
              ))}
            </div>
          </section>
        )}

        <section className="ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">What is inside</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em' }}>{text(c, k('data.title'))}</h2>
            <p className="ln-lead" style={{ margin: '20px 0 44px', maxWidth: '36em' }}>{text(c, k('data.lead'))}</p>
            <div className="pd-grid">
              {items(c, k('data')).map((d, i) => <div key={i}><h3>{d.title}</h3><p>{d.body}</p></div>)}
            </div>
          </div>
        </section>

        <section className="ln-rule ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">Features</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em', marginBottom: 40 }}>{text(c, k('feat.title'))}</h2>
            {features.map((f, i) => {
              const hasShot = !!f.shot
              const flip = i % 2 === 1
              return (
                <div key={i} className="pd-feat" style={hasShot ? undefined : { gridTemplateColumns: 'minmax(0,40em)' }}>
                  <div style={{ order: hasShot && flip ? 2 : 0 }}><h3>{f.title}</h3><p>{f.body}</p></div>
                  {hasShot && <div className="pd-shot" style={{ order: flip ? 1 : 0 }}>{f.shot.startsWith('mock:') ? <PortalMock id={f.shot.slice(5)} alt={f.alt || f.title} /> : <img src={f.shot} alt={f.alt || f.title} width={1280} height={551} loading="lazy" decoding="async" />}</div>}
                </div>
              )
            })}
          </div>
        </section>

        <section className="ln-night ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">Why it holds</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em' }}>{text(c, k('moat.title'))}</h2>
            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '40px 48px' }}>
              {items(c, k('moats')).map((m, i) => (
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
            <p className="ln-eyebrow">Compared with</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em' }}>{text(c, k('diff.title'))}</h2>
            <div className="pd-grid" style={{ marginTop: 44 }}>
              {items(c, k('diff')).map((d, i) => <div key={i}><h3>{d.title}</h3><p>{d.body}</p></div>)}
            </div>
          </div>
        </section>

        <section className="ln-rule ln-sec">
          <div className="ln-wrap">
            <p className="ln-eyebrow">Who it is for</p>
            <h2 className="ln-h2" style={{ maxWidth: '15em', marginBottom: 40 }}>{text(c, k('who.title'))}</h2>
            <div style={{ borderBottom: '1px solid var(--border)' }}>
              {items(c, k('who')).map((w, i) => <div key={i} className="pd-who"><b>{w.who}</b><span>{w.how}</span></div>)}
            </div>
          </div>
        </section>

        {children}

        {faq.length > 0 && (
          <section className="ln-rule ln-sec">
            <div className="ln-wrap pd-faq">
              <p className="ln-eyebrow">Questions</p>
              <h2 className="ln-h2" style={{ marginBottom: 36 }}>Questions people ask.</h2>
              {faq.map((f, i) => <details key={i}><summary>{f.q}</summary><p>{f.a}</p></details>)}
              <p className="ln-small" style={{ margin: '36px 0 0', maxWidth: '52em' }}>{text(c, k('topics'))}</p>
            </div>
          </section>
        )}

        <section className="ln-night ln-sec" style={{ padding: '96px 0' }}>
          <div className="ln-wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 40 }}>
            <h2 className="ln-h2" style={{ maxWidth: '16em' }}>{text(c, k('cta.title'))}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {primary.external ? <a className="ln-btn light" href={primary.href} target="_blank" rel="noopener noreferrer">{primary.label}</a> : <Link className="ln-btn light" href={primary.href}>{primary.label}</Link>}
              <Link className="ln-btn lightline" href="/contact">Talk to us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
