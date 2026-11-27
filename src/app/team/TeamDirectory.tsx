import Link from 'next/link'
import { normalizeExternalUrl } from '@/lib/utils'
import { BU_INFO, MANAGEMENT, type BuGroup, type FeedPerson } from '@/lib/team-feed'

const MONO = "'JetBrains Mono', monospace"
// Accent text stays readable in both palettes: blended toward the page's text colour.
const tint = (c: string) => `color-mix(in srgb, ${c} 55%, var(--text))`

export const profileHref = (p: FeedPerson) => (p.slug === 'ankit-kumar-suman' ? '/about/ankit' : `/team/${p.slug}`)

export function PersonPhoto({ p, size, radius = 16, accent = '#7A5217' }: { p: FeedPerson; size: number | string; radius?: number; accent?: string }) {
  const box: React.CSSProperties = { width: size, height: size, borderRadius: radius, background: `linear-gradient(135deg, ${accent}22, rgba(31,58,95,.10))`, position: 'relative', overflow: 'hidden', flexShrink: 0 }
  return (
    <div style={box}>
      {p.photo_url ? (
        // Plain <img>: the feed's photo host is NestHR storage, not one of our configured image domains.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.photo_url} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 12%' }} />
      ) : (
        <div className="font-display font-extrabold" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: typeof size === 'number' ? size * 0.38 : 40, color: accent, opacity: 0.55 }}>{p.name[0]}</div>
      )}
    </div>
  )
}

function Chips({ skills, max = 3 }: { skills: string[]; max?: number }) {
  if (skills.length === 0) return null
  return (
    <div className="flex flex-wrap" style={{ gap: 5, marginTop: 10 }}>
      {skills.slice(0, max).map(s => (
        <span key={s} style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--bg2)', color: 'var(--text2)' }}>{s}</span>
      ))}
      {skills.length > max && <span style={{ fontSize: 10.5, padding: '2px 4px', color: 'var(--text3)' }}>+{skills.length - max}</span>}
    </div>
  )
}

function Eyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color, marginBottom: 8 }}>{children}</div>
}

function ManagementCard({ p }: { p: FeedPerson }) {
  const accent = BU_INFO[MANAGEMENT]?.accent ?? '#2C6B4B'
  return (
    <article className="group overflow-hidden transition-all duration-200 hover:-translate-y-1.5" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, position: 'relative' }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, #7A5217)` }} />
      <div className="flex flex-col sm:flex-row" style={{ gap: 24, padding: 24 }}>
        <Link href={profileHref(p)} aria-label={p.name}><PersonPhoto p={p} size={148} radius={18} accent={accent} /></Link>
        <div style={{ minWidth: 0 }}>
          <Link href={profileHref(p)} className="font-display font-extrabold group-hover:underline" style={{ display: 'block', fontSize: 24, letterSpacing: '-.025em', lineHeight: 1.1, color: 'var(--text)' }}>{p.name}</Link>
          <div style={{ fontSize: 14, color: tint(accent), fontWeight: 600, margin: '6px 0 10px' }}>{p.job_title}</div>
          {p.bio && <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--text2)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.bio}</p>}
          <div className="flex items-center" style={{ gap: 16, marginTop: 14, fontSize: 12.5, fontWeight: 600 }}>
            <Link href={profileHref(p)} style={{ color: 'var(--text)' }}>View profile →</Link>
            {p.linkedin_url && <a href={normalizeExternalUrl(p.linkedin_url)} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text2)', textDecoration: 'underline' }}>LinkedIn →</a>}
          </div>
        </div>
      </div>
    </article>
  )
}

function LeadCard({ p, accent }: { p: FeedPerson; accent: string }) {
  return (
    <Link href={profileHref(p)} className="group flex items-start transition-all duration-200 hover:-translate-y-1" style={{ gap: 16, padding: 18, borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${accent}` }}>
      <PersonPhoto p={p} size={76} radius={16} accent={accent} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: tint(accent), marginBottom: 4 }}>Lead</div>
        <div className="font-display font-bold group-hover:underline" style={{ fontSize: 16.5, letterSpacing: '-.015em', color: 'var(--text)', lineHeight: 1.2 }}>{p.name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text2)', marginTop: 3 }}>{p.job_title}</div>
        <Chips skills={p.skills} max={3} />
      </div>
    </Link>
  )
}

function MemberCard({ p, accent }: { p: FeedPerson; accent: string }) {
  return (
    <Link href={profileHref(p)} className="group block overflow-hidden transition-all duration-200 hover:-translate-y-1.5" style={{ borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div style={{ aspectRatio: '1', position: 'relative' }}>
        <PersonPhoto p={p} size="100%" radius={0} accent={accent} />
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div className="font-display font-bold group-hover:underline" style={{ fontSize: 14, letterSpacing: '-.01em', color: 'var(--text)', lineHeight: 1.25 }}>{p.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2, lineHeight: 1.35 }}>{p.job_title}</div>
        <Chips skills={p.skills} max={2} />
      </div>
    </Link>
  )
}

export function TeamNav({ items }: { items: { id: string; label: string; accent?: string }[] }) {
  return (
    <nav aria-label="On this page" className="border-b" style={{ position: 'sticky', top: 60, zIndex: 20, background: 'color-mix(in srgb, var(--bg) 90%, transparent)', backdropFilter: 'blur(10px)', borderColor: 'var(--border)' }}>
      <div className="flex items-center" style={{ maxWidth: 1200, margin: '0 auto', padding: '12px clamp(20px,4vw,48px)', gap: 8, overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', marginRight: 6 }}>On this page</span>
        {items.map(i => (
          <a key={i.id} href={`#${i.id}`} className="transition-colors hover:opacity-80" style={{ fontSize: 12.5, fontWeight: 600, padding: '6px 13px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            {i.accent && <span style={{ width: 7, height: 7, borderRadius: 99, background: i.accent }} />}{i.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export function ManagementSection({ people }: { people: FeedPerson[] }) {
  if (people.length === 0) return null
  return (
    <section id="management" className="border-b" style={{ padding: '64px clamp(20px,4vw,48px)', borderColor: 'var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Eyebrow color={tint('#2C6B4B')}>Leadership</Eyebrow>
        <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(22px,3vw,34px)', letterSpacing: '-.03em', color: 'var(--text)', marginBottom: 28 }}>The people who set the direction</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 20 }}>
          {people.map(p => <ManagementCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  )
}

export function UnitSection({ unit, index }: { unit: BuGroup; index: number }) {
  return (
    <section id={unit.slug} className="border-b" style={{ padding: '64px clamp(20px,4vw,48px)', borderColor: 'var(--border)', background: index % 2 === 1 ? 'var(--bg2)' : 'transparent' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="flex items-end justify-between flex-wrap" style={{ gap: 20, marginBottom: 36 }}>
          <div style={{ maxWidth: 640 }}>
            <div className="flex items-center" style={{ gap: 12, marginBottom: 10 }}>
              <span className="font-display font-extrabold" style={{ fontSize: 38, letterSpacing: '-.05em', lineHeight: 1, color: tint(unit.accent) }}>{String(index + 1).padStart(2, '0')}</span>
              <span style={{ height: 1, width: 40, background: unit.accent, opacity: 0.5 }} />
              <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)' }}>Business unit</span>
            </div>
            <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(24px,3.4vw,38px)', letterSpacing: '-.03em', lineHeight: 1.05, color: 'var(--text)', marginBottom: 10 }}>{unit.name}</h2>
            {unit.blurb && <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--text2)' }}>{unit.blurb}</p>}
          </div>
          <div style={{ fontFamily: MONO, fontSize: 11, color: tint(unit.accent), border: `1px solid ${unit.accent}55`, borderRadius: 999, padding: '5px 12px' }}>
            {unit.count} {unit.count === 1 ? 'person' : 'people'}
          </div>
        </div>

        <div className="flex flex-col" style={{ gap: 40 }}>
          {unit.departments.map(d => (
            <div key={d.department || 'none'}>
              {d.department && (
                <div className="flex items-center" style={{ gap: 14, marginBottom: 18 }}>
                  <h3 className="font-display font-bold" style={{ fontSize: 17, letterSpacing: '-.015em', color: 'var(--text)' }}>{d.department}</h3>
                  <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span style={{ fontFamily: MONO, fontSize: 10.5, color: 'var(--text3)' }}>{d.leads.length + d.members.length}</span>
                </div>
              )}
              {d.leads.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 14, marginBottom: d.members.length ? 14 : 0 }}>
                  {d.leads.map(p => <LeadCard key={p.slug} p={p} accent={unit.accent} />)}
                </div>
              )}
              {d.members.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" style={{ gap: 14 }}>
                  {d.members.map(p => <MemberCard key={p.slug} p={p} accent={unit.accent} />)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Alumni from the feed: permanent, with the years they were here.
export function FeedAlumni({ people }: { people: FeedPerson[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" style={{ gap: 12 }}>
      {people.map(p => (
        <Link key={p.slug} href={profileHref(p)} className="group block transition-all duration-200 hover:-translate-y-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
          <PersonPhoto p={p} size={44} radius={999} accent="#2C6B4B" />
          <div className="font-display font-bold group-hover:underline" style={{ fontSize: 12.5, color: 'var(--text)', margin: '10px 0 2px', lineHeight: 1.25 }}>{p.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.35 }}>{p.job_title}</div>
          {(p.joined_year || p.left_year) && (
            <div style={{ fontFamily: MONO, fontSize: 9.5, color: 'var(--text3)', marginTop: 8 }}>{p.joined_year ?? '…'} – {p.left_year ?? '…'}</div>
          )}
        </Link>
      ))}
    </div>
  )
}
