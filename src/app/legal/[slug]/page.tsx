import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getLegalDocuments, getLegalDocBySlug } from '@/lib/db'
import { mdToHtml, substituteLegalPlaceholders } from '@/lib/utils'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const docs = await getLegalDocuments()
  return docs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await getLegalDocBySlug(slug)
  if (!doc) return {}
  return { title: doc.title, description: `${doc.title} — LabelNest India Private Limited. ${doc.version}, effective ${doc.effective_date}.` }
}

export const revalidate = 86400

export default async function LegalDocPage({ params }: Props) {
  const { slug } = await params
  const doc = await getLegalDocBySlug(slug)
  if (!doc) notFound()

  const intro = substituteLegalPlaceholders(doc.intro)
  const body = substituteLegalPlaceholders(doc.body_markdown)
  const bodyHtml = mdToHtml(body)

  // Extract h2 headings for TOC
  const headings = [...bodyHtml.matchAll(/<h2>(.+?)<\/h2>/g)].map((m) => ({
    text: m[1],
    id: m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  }))
  // Add IDs to h2 tags
  let bodyWithIds = bodyHtml
  for (const h of headings) {
    bodyWithIds = bodyWithIds.replace(`<h2>${h.text}</h2>`, `<h2 id="${h.id}">${h.text}</h2>`)
  }

  return (
    <>
      <Nav />
      <main className="max-w-[1040px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-14" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        {/* Sidebar */}
        <aside className="hidden md:block">
          <div className="sticky top-20">
            <Link href="/legal" className="flex items-center gap-1.5 text-[13px] mb-5 transition-colors" style={{ color: 'var(--text2)' }}>
              ← All legal docs
            </Link>
            <div className="font-display font-bold text-[15px] mb-1" style={{ color: 'var(--text)' }}>{doc.title}</div>
            <div className="font-mono text-[10px] leading-relaxed mb-5" style={{ color: 'var(--text3)' }}>
              {doc.version} · Effective {doc.effective_date}<br />
              Last updated {doc.last_updated}
            </div>
            {headings.length > 0 && (
              <nav className="flex flex-col gap-0.5">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="text-[12.5px] px-2.5 py-1.5 rounded-md transition-all"
                    style={{ color: 'var(--text2)', borderLeft: '2px solid transparent' }}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </aside>

        {/* Body */}
        <div>
          <p className="text-[14.5px] leading-[1.78] p-5 rounded-[12px] mb-8 border-l-[3px]"
            style={{ color: 'var(--text2)', background: 'var(--bg3)', borderLeftColor: 'var(--pink)' }}>
            {intro}
          </p>
          <div className="legal-body" dangerouslySetInnerHTML={{ __html: bodyWithIds }} />
        </div>
      </main>
      <Footer />
    </>
  )
}
