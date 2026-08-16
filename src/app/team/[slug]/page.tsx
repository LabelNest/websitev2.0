import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getTeamMemberBySlug,
  getFellowBySlug,
  getInternBySlug,
  getBriefingsByAuthor,
} from '@/lib/db'
import { pageMetadata } from '@/lib/seo'
import { imgFrameStyle } from '@/lib/image'
import { normalizeExternalUrl } from '@/lib/utils'
import { DEPT_COLORS } from '../page'

type Props = { params: Promise<{ slug: string }> }

async function resolveProfile(slug: string) {
  const member = await getTeamMemberBySlug(slug).catch(() => null)
  if (member) return { member, fellow: null, intern: null }
  const fellow = await getFellowBySlug(slug).catch(() => null)
  if (fellow) return { member: null, fellow, intern: null }
  const intern = await getInternBySlug(slug).catch(() => null)
  if (intern) return { member: null, fellow: null, intern }
  return { member: null, fellow: null, intern: null }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { member, fellow, intern } = await resolveProfile(slug)
  const person = member ?? fellow ?? intern
  if (!person) return { title: 'Team — LabelNest' }

  return pageMetadata(`/team/${slug}`, {
    title: `${person.name} — ${person.role} at LabelNest`,
    description: (member?.bio || fellow?.bio || `${person.name} is ${person.role} at LabelNest.`).slice(0, 160),
  })
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params
  const { member, fellow, intern } = await resolveProfile(slug)
  if (!member && !fellow && !intern) notFound()

  const name = member?.name ?? fellow?.name ?? intern?.name ?? ''
  const role = member?.role ?? fellow?.role ?? intern?.role ?? ''
  const imageUrl = member?.image_url ?? fellow?.image_url ?? intern?.image_url ?? null
  const imagePosition = member?.image_position ?? fellow?.image_position ?? intern?.image_position ?? '50% 0%'
  const imageZoom = member?.image_zoom ?? fellow?.image_zoom ?? intern?.image_zoom ?? 1
  const linkedinUrlRaw = member?.linkedin_url ?? fellow?.linkedin_url ?? intern?.linkedin_url ?? null
  const linkedinUrl = linkedinUrlRaw ? normalizeExternalUrl(linkedinUrlRaw) : null
  const department = member?.department || fellow?.department || fellow?.cohort || intern?.cohort || ''
  const bio = member?.bio ?? fellow?.bio ?? null
  const email = member?.email ?? fellow?.email ?? null
  const expertise = member?.expertise ?? fellow?.expertise ?? null
  const quote = member?.quote ?? fellow?.quote ?? null
  const kindLabel = member ? 'Team' : fellow ? 'Nestling Fellow' : 'Intern'
  const deptColor = DEPT_COLORS[department] || '#8985A6'

  const briefings = member || fellow
    ? await getBriefingsByAuthor(name).catch(() => [])
    : []

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>
        <section className="border-b" style={{ padding: '72px 48px 56px', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 24 }}>
              Team · LabelNest · {kindLabel}
            </div>

            <div className="flex items-start" style={{ gap: 28, marginBottom: 28 }}>
              <div className="relative overflow-hidden flex-shrink-0" style={{ width: 96, height: 96, borderRadius: 20, background: 'linear-gradient(135deg,rgba(233,30,140,.08),rgba(37,99,235,.06))' }}>
                {imageUrl ? (
                  <Image src={imageUrl} alt={name} fill sizes="96px" style={imgFrameStyle(imagePosition, imageZoom)} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-display font-extrabold" style={{ fontSize: 32, color: 'rgba(255,255,255,.15)' }}>
                    {name[0]}
                  </div>
                )}
              </div>
              <div>
                <h1 className="font-display font-extrabold" style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-.03em', lineHeight: 1.06, color: 'var(--text)', marginBottom: 8 }}>
                  {name}
                </h1>
                <div style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 8 }}>{role}</div>
                {department && (
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 5, background: 'var(--bg2)', color: deptColor }}>
                    {department}
                  </span>
                )}
              </div>
            </div>

            {bio && (
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--text2)', marginBottom: 24 }}>{bio}</p>
            )}

            {expertise && expertise.length > 0 && (
              <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 24 }}>
                {expertise.map(tag => (
                  <span key={tag} style={{ fontSize: 12, padding: '5px 11px', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {quote && (
              <blockquote style={{ borderLeft: '3px solid #E91E8C', paddingLeft: 18, fontSize: 15.5, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.65, marginBottom: 28 }}>
                &ldquo;{quote}&rdquo;
              </blockquote>
            )}

            <div className="flex" style={{ gap: 12 }}>
              {email && (
                <a href={`mailto:${email}`}
                  className="font-semibold"
                  style={{ fontSize: 13.5, padding: '10px 20px', borderRadius: 10, background: '#E91E8C', color: '#fff' }}>
                  Contact {name.split(' ')[0]}
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                  className="font-semibold"
                  style={{ fontSize: 13.5, padding: '10px 20px', borderRadius: 10, border: '1px solid var(--border)', color: 'var(--text)' }}>
                  LinkedIn →
                </a>
              )}
            </div>
          </div>
        </section>

        {briefings.length > 0 && (
          <section style={{ padding: '56px 48px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 16 }}>
                Published briefings
              </div>
              <div className="flex flex-col" style={{ gap: 12 }}>
                {briefings.map(b => (
                  <a key={b.id} href={`/briefings/${b.slug}`}
                    style={{ display: 'block', padding: '16px 18px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="font-display font-bold" style={{ fontSize: 14.5, color: 'var(--text)', marginBottom: 4 }}>{b.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{b.date}</div>
                  </a>
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
