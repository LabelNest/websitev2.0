import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { getTeamMembers, getAlumni, getFellows } from '@/lib/db'
import AlumniGrid from './AlumniGrid'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/team', {
    title: 'The LabelNest Team — Built by Operators, Not Vendors',
    description: 'Meet the LabelNest team building private markets data infrastructure. Operators, analysts, and engineers with domain experience from Preqin, BlackRock, and Microsoft.',
  })
}
export const revalidate = 3600

const DEPT_COLORS: Record<string, string> = {
  'NestIntel': '#2563EB',
  'DataNest': '#2563EB',
  'NestHR': '#2563EB',
  'NestLens': '#10B981',
  'Ops': '#F97316',
  'HR': '#7C3AED',
  'Founder': '#E91E8C',
}

export default async function TeamPage() {
  const [team, alumni, fellows] = await Promise.all([getTeamMembers(), getAlumni(), getFellows()])

  const cohort1Labs = fellows.filter(f => f.cohort === 'NestLabs' || f.department === 'NestLabs')
  const cohort1Tech = fellows.filter(f => f.cohort === 'NestTech' || f.department === 'NestTech')

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ padding: '72px 48px 56px', borderColor: 'var(--border)' }}>
          <div className="absolute pointer-events-none" style={{ top: -100, right: -80, width: 480, height: 480, borderRadius: '50%', background: 'rgba(124,58,237,.07)', filter: 'blur(90px)' }} />
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
                  { num: team.length || 13, label: 'Current team', color: '#2563EB' },
                  { num: alumni.length || 39, label: 'Alumni', color: '#10B981' },
                  { num: fellows.length || 15, label: 'Nestling fellows', color: '#7C3AED' },
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

        {/* CURRENT TEAM */}
        <section className="border-b" style={{ padding: '64px 48px', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 32 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 8 }}>Current team</div>
                <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(20px,3vw,32px)', letterSpacing: '-.025em', color: 'var(--text)' }}>The people building LabelNest right now</h2>
              </div>
              <Link href="/careers" style={{ fontSize: 13.5, color: '#E91E8C', fontWeight: 600 }}>We are hiring →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: 16 }}>
              {team.map(m => {
                const deptColor = DEPT_COLORS[m.department] || '#8985A6'
                return (
                  <div key={m.id}
                    className="overflow-hidden transition-all duration-200 hover:-translate-y-1.5"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
                    <div className="relative" style={{ aspectRatio: '1', background: 'linear-gradient(135deg,rgba(233,30,140,.08),rgba(37,99,235,.06))' }}>
                      {m.image_url ? (
                        <Image src={m.image_url} alt={m.name} fill className="object-cover object-top" sizes="300px" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center font-display font-extrabold" style={{ fontSize: 36, color: 'rgba(255,255,255,.12)' }}>
                          {m.name[0]}
                        </div>
                      )}
                      <span className="absolute" style={{ bottom: 10, left: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)', color: deptColor }}>{m.department}</span>
                    </div>
                    <div style={{ padding: 16 }}>
                      <div className="font-display font-bold" style={{ fontSize: 15, letterSpacing: '-.01em', color: 'var(--text)', marginBottom: 3 }}>{m.name}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.4 }}>{m.role}</div>
                      {m.linkedin_url && (
                        <a href={m.linkedin_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center" style={{ gap: 5, marginTop: 8, fontSize: 11.5, color: '#2563EB' }}>
                          LinkedIn →
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ALUMNI */}
        <section className="border-b" style={{ padding: '64px 48px', background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#10B981', marginBottom: 8 }}>Alumni</div>
                <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(20px,3vw,32px)', letterSpacing: '-.025em', color: 'var(--text)' }}>
                  {alumni.length || 39} people. All permanent. All on this page.
                </h2>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text2)', maxWidth: 520, marginBottom: 32, lineHeight: 1.6 }}>
              Everyone who worked at LabelNest stays on this page forever. No exceptions. If you built something here, you belong here.{' '}
              <strong style={{ color: 'var(--text)' }}>Alumni can update their "Now at" via a self-serve link sent by the team.</strong>
            </p>
            <AlumniGrid initial={alumni} />
          </div>
        </section>

        {/* FELLOWS */}
        {(cohort1Labs.length > 0 || cohort1Tech.length > 0) && (
          <section style={{ padding: '64px 48px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#7C3AED', marginBottom: 8 }}>Nestling Fellows</div>
              <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(20px,3vw,32px)', letterSpacing: '-.025em', color: 'var(--text)', marginBottom: 8 }}>
                The Nestling Program — Cohort 1
              </h2>
              <p style={{ fontSize: 14.5, color: 'var(--text2)', maxWidth: 520, marginBottom: 40, lineHeight: 1.65 }}>
                A fellowship for people with the right potential and a clear direction. Not an internship. Not a course. A real build environment.
              </p>

              {cohort1Labs.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', paddingBottom: 12, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
                    NestLabs · Cohort 1 · Research and Intelligence
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" style={{ gap: 10 }}>
                    {cohort1Labs.map(f => (
                      <div key={f.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
                        <div className="flex items-center justify-center font-display font-bold" style={{ width: 36, height: 36, borderRadius: '50%', marginBottom: 8, background: 'rgba(233,30,140,.1)', color: '#E91E8C', fontSize: 13 }}>
                          {f.name[0]}
                        </div>
                        <div className="font-display font-bold" style={{ fontSize: 12, color: 'var(--text)', marginBottom: 2 }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text2)' }}>{f.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cohort1Tech.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)', paddingBottom: 12, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
                    NestTech · Cohort 1 · Engineering
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" style={{ gap: 10 }}>
                    {cohort1Tech.map(f => (
                      <div key={f.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
                        <div className="flex items-center justify-center font-display font-bold" style={{ width: 36, height: 36, borderRadius: '50%', marginBottom: 8, background: 'rgba(37,99,235,.1)', color: '#2563EB', fontSize: 13 }}>
                          {f.name[0]}
                        </div>
                        <div className="font-display font-bold" style={{ fontSize: 12, color: 'var(--text)', marginBottom: 2 }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text2)' }}>{f.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex items-center justify-between flex-wrap" style={{ gap: 24, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
                <div>
                  <div className="font-display font-extrabold" style={{ fontSize: 20, color: 'var(--text)', marginBottom: 6 }}>Built by people with the right potential. Not the right degree.</div>
                  <div style={{ fontSize: 14, color: 'var(--text2)' }}>Open to people who want to build real things on real systems. No experience requirement. Right potential is the only bar.</div>
                </div>
                <Link href="/careers"
                  className="font-semibold text-white flex-shrink-0"
                  style={{ fontSize: 13.5, padding: '12px 24px', borderRadius: 10, background: '#7C3AED', whiteSpace: 'nowrap' }}>
                  Join the next cohort →
                </Link>
              </div>

            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
