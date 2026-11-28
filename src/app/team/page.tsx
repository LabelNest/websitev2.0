import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { getAlumni, getFellows, getInterns, type Alumni, type Fellow, type Intern } from '@/lib/db'
import AlumniGrid from './AlumniGrid'
import { getTeamData, groupTeam } from '@/lib/team-feed'
import { FeedAlumni, ManagementSection, TeamNav, UnitSection } from './TeamDirectory'
import { pageMetadata } from '@/lib/seo'
import { imgFrameStyle } from '@/lib/image'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/team', {
    title: 'The LabelNest Team — Built by Operators, Not Vendors',
    description: 'Meet the LabelNest team building private markets data infrastructure. Operators, analysts, and engineers with domain experience from Preqin, BlackRock, and Microsoft.',
  })
}
export const revalidate = 3600


function FellowChip({ f, accent, background }: { f: { id: string; name: string; role: string; slug: string | null; status?: string; image_url?: string | null; image_position?: string; image_zoom?: number }; accent: string; background: string }) {
  const style: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, position: 'relative' }
  const content = (
    <>
      {f.status === 'completed' && (
        <div style={{ position: 'absolute', top: 8, right: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--bg2, rgba(127,127,127,.12))', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 5px' }}>
          Completed
        </div>
      )}
      <div className="relative overflow-hidden flex items-center justify-center font-display font-bold" style={{ width: 36, height: 36, borderRadius: '50%', marginBottom: 8, background, color: accent, fontSize: 13 }}>
        {f.image_url ? <Image src={f.image_url} alt={f.name} fill sizes="36px" style={imgFrameStyle(f.image_position || '50% 0%', f.image_zoom || 1)} /> : f.name[0]}
      </div>
      <div className="font-display font-bold" style={{ fontSize: 12, color: 'var(--text)', marginBottom: 2 }}>{f.name}</div>
      <div style={{ fontSize: 11, color: 'var(--text2)' }}>{f.role}</div>
    </>
  )
  return f.slug && f.status !== 'completed' ? (
    <Link href={`/team/${f.slug}`} className="block hover:-translate-y-1 transition-transform duration-200" style={style}>{content}</Link>
  ) : (
    <div style={style}>{content}</div>
  )
}

export default async function TeamPage() {
  const [{ people, heads }, siteAlumni, fellows, interns] = await Promise.all([getTeamData(), getAlumni().catch((): Alumni[] => []), getFellows().catch((): Fellow[] => []), getInterns().catch((): Intern[] => [])])
  const { management, units } = groupTeam(people, heads)
  const feedAlumni = people.filter(p => p.status === 'alumni').sort((a, b) => (b.left_year ?? 0) - (a.left_year ?? 0) || a.name.localeCompare(b.name))
  const alumniCount = feedAlumni.length || siteAlumni.length
  const currentCount = management.length + units.reduce((n, u) => n + u.count, 0)
  const navItems = [
    ...(management.length ? [{ id: 'management', label: 'Leadership', accent: '#2C6B4B' }] : []),
    ...units.map(u => ({ id: u.slug, label: u.name, accent: u.accent })),
    ...(fellows.length ? [{ id: 'fellows', label: 'Fellows', accent: '#5B3A6B' }] : []),
    { id: 'alumni', label: 'Alumni', accent: '#2C6B4B' },
  ]

  // Fellows are grouped by their exact `cohort` string (e.g. "NestLabs · Cohort 2 · Data Research"),
  // newest cohort number first. New cohorts need no code changes — admin just types a new cohort label.
  const cohortMap = new Map<string, typeof fellows>()
  for (const f of fellows) {
    const key = f.cohort || 'Nestling Fellows'
    if (!cohortMap.has(key)) cohortMap.set(key, [])
    cohortMap.get(key)!.push(f)
  }
  const cohortNumber = (cohort: string) => Number(cohort.match(/(\d+)/)?.[1] ?? 0)
  const cohortGroups = [...cohortMap.entries()].sort((a, b) => cohortNumber(b[0]) - cohortNumber(a[0]))
  const cohortNumbers = [...new Set(fellows.map(f => cohortNumber(f.cohort || '')))].filter(Boolean).sort((a, b) => a - b)
  const cohortHeading = cohortNumbers.length === 0 ? ''
    : cohortNumbers.length === 1 ? `Cohort ${cohortNumbers[0]}`
    : `Cohorts ${cohortNumbers.slice(0, -1).join(', ')} & ${cohortNumbers[cohortNumbers.length - 1]}`
  // Legacy cohort values predate the fuller "· Research and Intelligence" / "· Engineering" copy —
  // keep that exact wording for them; any newly typed cohort label renders verbatim.
  const COHORT_LABELS: Record<string, string> = {
    'NestLabs · Cohort 1': 'NestLabs · Cohort 1 · Research and Intelligence',
    'NestTech · Cohort 1': 'NestTech · Cohort 1 · Engineering',
  }
  const cohortAccent = (cohort: string) =>
    cohort.includes('NestTech') ? { accent: '#1F3A5F', background: 'rgba(31,58,95,.1)' }
    : cohort.includes('NestLabs') ? { accent: '#7A5217', background: 'rgba(122,82,23,.1)' }
    : { accent: '#5B3A6B', background: 'rgba(91,58,107,.1)' }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ padding: '72px 48px 56px', borderColor: 'var(--border)' }}>
          <div className="absolute pointer-events-none" style={{ top: -100, right: -80, width: 480, height: 480, borderRadius: '50%', background: 'rgba(91,58,107,.07)', filter: 'blur(90px)' }} />
          <div className="relative z-10" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="flex items-end justify-between flex-wrap" style={{ gap: 32, marginBottom: 36 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>Team · LabelNest · Bangalore</div>
                <h1 className="font-display font-extrabold" style={{ fontSize: 'clamp(38px,5.5vw,64px)', letterSpacing: '-.04em', lineHeight: 1.02, color: 'var(--text)', marginBottom: 14 }}>
                  Everyone who has ever<br />
                  <span style={{ fontWeight: 300, color: 'var(--text2)' }}>worked here stays on this page.</span>
                </h1>
                <p style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--text2)', maxWidth: 520 }}>
                  Current team, alumni, and Nestling fellows. Permanent, public, no exceptions. If you built something here, you belong here.
                </p>
              </div>
              <div className="flex" style={{ gap: 32 }}>
                {[
                  { num: currentCount, label: 'Current team', color: '#1F3A5F' },
                  { num: alumniCount, label: 'Alumni', color: '#2C6B4B' },
                  { num: fellows.length || 15, label: 'Nestling fellows', color: '#5B3A6B' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="font-display font-extrabold" style={{ fontSize: 32, letterSpacing: '-.05em', lineHeight: 1, marginBottom: 4, color: s.color }}>{s.num}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <style>{`html{scroll-behavior:smooth}section[id]{scroll-margin-top:124px}`}</style>
        <TeamNav items={navItems} />

        {/* LEADERSHIP, then each business unit and its departments (from the NestHR team feed) */}
        <ManagementSection people={management} />
        {units.map((u, i) => <UnitSection key={u.slug} unit={u} index={i} />)}
        <div className="flex justify-end" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px clamp(20px,4vw,48px) 0' }}>
          <Link href="/careers" style={{ fontSize: 13.5, color: '#7A5217', fontWeight: 600 }}>We are hiring →</Link>
        </div>

        {/* FELLOWS */}
        {fellows.length > 0 && (
          <section id="fellows" className="border-b" style={{ padding: '64px 48px', borderColor: 'var(--border)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#5B3A6B', marginBottom: 8 }}>Nestling Fellows</div>
              <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(20px,3vw,32px)', letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 8 }}>
                The Nestling Program{cohortHeading && ` — ${cohortHeading}`}
              </h2>
              <p style={{ fontSize: 14.5, color: 'var(--text2)', maxWidth: 520, marginBottom: 40, lineHeight: 1.65 }}>
                A fellowship for people with the right potential and a clear direction. Not an internship. Not a course. A real build environment.
              </p>

              {cohortGroups.map(([cohort, group]) => (
                <div key={cohort} style={{ marginBottom: 32 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', paddingBottom: 12, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
                    {COHORT_LABELS[cohort] || cohort}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" style={{ gap: 10 }}>
                    {group.map(f => <FellowChip key={f.id} f={f} {...cohortAccent(cohort)} />)}
                  </div>
                </div>
              ))}

              {/* CTA */}
              <div className="flex items-center justify-between flex-wrap" style={{ gap: 24, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
                <div>
                  <div className="font-display font-extrabold" style={{ fontSize: 20, color: 'var(--text)', marginBottom: 6 }}>Built by people with the right potential. Not the right degree.</div>
                  <div style={{ fontSize: 14, color: 'var(--text2)' }}>Open to people who want to build real things on real systems. No experience requirement. Right potential is the only bar.</div>
                </div>
                <Link href="/careers"
                  className="font-semibold text-white flex-shrink-0"
                  style={{ fontSize: 13.5, padding: '12px 24px', borderRadius: 10, background: '#5B3A6B', whiteSpace: 'nowrap' }}>
                  Join the next cohort →
                </Link>
              </div>

            </div>
          </section>
        )}

        {/* ALUMNI */}
        <section id="alumni" className="border-b" style={{ padding: '64px 48px', background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#2C6B4B', marginBottom: 8 }}>Alumni</div>
                <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(20px,3vw,32px)', letterSpacing: '-.025em', color: 'var(--text)' }}>
                  {alumniCount} people. All permanent. All on this page.
                </h2>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text2)', maxWidth: 520, marginBottom: 32, lineHeight: 1.6 }}>
              Everyone who worked at LabelNest stays on this page forever. No exceptions. If you built something here, you belong here.{' '}
              <strong style={{ color: 'var(--text)' }}>Alumni can update their &ldquo;Now at&rdquo; via a self-serve link sent by the team.</strong>
            </p>
            {feedAlumni.length > 0 ? <FeedAlumni people={feedAlumni} /> : <AlumniGrid initial={siteAlumni} />}
          </div>
        </section>

        {/* INTERNS */}
        {interns.length > 0 && (
          <section className="border-t" style={{ padding: '56px 48px', borderColor: 'var(--border)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#9A4B1F', marginBottom: 8 }}>Interns</div>
              <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(20px,3vw,32px)', letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 24 }}>
                Building alongside the team
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" style={{ gap: 10 }}>
                {interns.map(i => <FellowChip key={i.id} f={i} accent="#9A4B1F" background="rgba(154,75,31,.1)" />)}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
