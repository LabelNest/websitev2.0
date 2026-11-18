import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CopyLink from '@/components/CopyLink'
import { pageMetadata } from '@/lib/seo'
import { DEMOS, SITE_URL, demoUrl, getDemo, r2Url } from '@/lib/demos'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return DEMOS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const d = getDemo(slug)
  if (!d) return { title: 'Demo — LabelNest' }
  const base = await pageMetadata(`/demo/${slug}`, {
    title: `${d.title} — LabelNest`,
    description: d.summary,
  })
  const image = d.posterKey ? r2Url(d.posterKey) : `${SITE_URL}/og-default.png`
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'video.other',
      images: [{ url: image, width: 1200, height: 630 }],
      videos: [{ url: r2Url(d.videoKey), type: 'video/mp4' }],
    },
    twitter: { ...base.twitter, images: [image] },
  }
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params
  const d = getDemo(slug)
  if (!d) notFound()
  const url = demoUrl(d.slug)
  const others = DEMOS.filter((x) => x.slug !== d.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: d.title,
    description: d.summary,
    uploadDate: d.date,
    contentUrl: r2Url(d.videoKey),
    thumbnailUrl: d.posterKey ? r2Url(d.posterKey) : `${SITE_URL}/og-default.png`,
    publisher: {
      '@type': 'Organization',
      name: 'LabelNest India Private Limited',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-default.png` },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <section style={{ padding: '56px 28px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Link href="/demo" style={{ fontSize: 13.5, color: 'var(--text3)', textDecoration: 'none' }}>← All demos</Link>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#9A4B1F', margin: '22px 0 12px' }}>
              {d.product} · Demo
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px,4.2vw,44px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--text)', margin: '0 0 14px' }}>
              {d.title}
            </h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.7, color: 'var(--text2)', margin: '0 0 24px', maxWidth: 680 }}>{d.summary}</p>

            <div style={{ borderRadius: 16, overflow: 'hidden', background: '#000', border: '1px solid var(--border)' }}>
              <video
                controls
                playsInline
                preload="metadata"
                poster={d.posterKey ? r2Url(d.posterKey) : undefined}
                style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 9' }}
              >
                <source src={r2Url(d.videoKey)} type="video/mp4" />
                Your browser cannot play this video. <a href={r2Url(d.videoKey)}>Download it instead</a>.
              </video>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: '20px 0 8px', alignItems: 'center' }}>
              <Link href="/contact" style={{ font: '600 13px var(--font-sans),system-ui,sans-serif', padding: '9px 14px', borderRadius: 8, background: 'var(--text)', color: 'var(--bg)', textDecoration: 'none' }}>
                Book a walkthrough
              </Link>
              <Link href={d.productHref} style={{ font: '600 13px var(--font-sans),system-ui,sans-serif', padding: '9px 14px', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text)', textDecoration: 'none' }}>
                About {d.product}
              </Link>
              <CopyLink text={url} label="Copy link" copiedLabel="Link copied" variant="ghost" />
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section style={{ padding: '24px 28px 80px' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>More demos</div>
              <div style={{ display: 'grid', gap: 14 }}>
                {others.map((o) => (
                  <Link key={o.slug} href={`/demo/${o.slug}`} style={{ display: 'block', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 22px', textDecoration: 'none' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{o.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--text2)' }}>{o.summary}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
