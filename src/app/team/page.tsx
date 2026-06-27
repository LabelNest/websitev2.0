import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { getTeamMembers, getAlumni, getFellows } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Team',
  description: 'The people building LabelNest. Everyone who has ever worked here stays on this page — current team, alumni, and Nestling fellows.',
}
export const revalidate = 3600

export default async function TeamPage() {
  const [team, alumni, fellows] = await Promise.all([getTeamMembers(), getAlumni(), getFellows()])

  const cohort1Labs = fellows.filter(f => f.cohort === 'NestLabs' || f.department === 'NestLabs')
  const cohort1Tech = fellows.filter(f => f.cohort === 'NestTech' || f.department === 'NestTech')

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}>

        {/* HERO */}
        <section className="px-8 py-20 border-b relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <div className="absolute -top-20 -left-16 w-[440px] h-[440px] rounded-full pointer-events-none"
            style={{ background: 'rgba(124,58,237,0.07)', filter: 'blur(90px)' }} />
          <div className="max-w-[1240px] mx-auto relative z-10">
            <div className="font-mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--text3)' }}>Team · LabelNest</div>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.02] mb-5"
              style={{ fontSize: 'clamp(38px,5.5vw,64px)', color: 'var(--text)' }}>
              Everyone who has ever
              <br />
              <span style={{ fontWeight: 300, color: 'var(--text2)' }}>worked here stays on this page.</span>
            </h1>
            <p className="text-[16px] leading-[1.72] max-w-[520px] mb-6" style={{ color: 'var(--text2)' }}>
              Current team, alumni, and Nestling fellows. Permanent, public, no exceptions. If you built something here, you belong here.
            </p>
            <div className="flex gap-6 flex-wrap">
              {[
                { num: team.length, label: 'Current team', color: 'var(--blue)' },
                { num: alumni.length, label: 'Alumni', color: 'var(--green)' },
                { num: fellows.length, label: 'Nestling fellows', color: 'var(--purple)' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-extrabold text-[28px] tracking-tight leading-none mb-1" style={{ color: s.color }}>{s.num}</div>
                  <div className="text-[12px]" style={{ color: 'var(--text3)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CURRENT TEAM */}
        <section className="px-8 py-16">
          <div className="max-w-[1240px] mx-auto">
            <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-8" style={{ color: 'var(--blue)' }}>Current team</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {team.map(m => (
                <div key={m.id}
                  className="rounded-[16px] overflow-hidden transition-all duration-200 hover:-translate-y-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="aspect-square relative" style={{ background: 'var(--bg3)' }}>
                    {m.image_url ? (
                      <Image src={m.image_url} alt={m.name} fill className="object-cover object-center" sizes="300px" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-[36px]"
                        style={{ color: 'var(--text3)', background: 'linear-gradient(135deg,rgba(233,30,140,.06),rgba(37,99,235,.06))' }}>
                        {m.name[0]}
                      </div>
                    )}
                    {m.linkedin_url && (
                      <a href={m.linkedin_url} target="_blank" rel="noopener noreferrer"
                        className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100"
                        style={{ background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(8px)' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-display font-bold text-[14.5px] tracking-tight mb-0.5" style={{ color: 'var(--text)' }}>{m.name}</div>
                    <div className="text-[12px] leading-[1.4]" style={{ color: 'var(--text2)' }}>{m.role}</div>
                    <div className="font-mono text-[9.5px] tracking-[.08em] uppercase mt-1.5" style={{ color: 'var(--text3)' }}>{m.department}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALUMNI */}
        <section className="px-8 py-16 border-t" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-2" style={{ color: 'var(--green)' }}>Alumni</div>
                <p className="text-[14px] max-w-[440px]" style={{ color: 'var(--text2)' }}>
                  Permanent. Public. Everyone who worked here stays on this page.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {alumni.map(a => (
                <div key={a.id}
                  className="rounded-[12px] p-3.5 transition-all duration-200 hover:-translate-y-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-full mb-3 overflow-hidden relative flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,rgba(16,185,129,.15),rgba(37,99,235,.1))' }}>
                    {a.image_url ? (
                      <Image src={a.image_url} alt={a.name} fill className="object-cover" sizes="40px" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-[14px]" style={{ color: 'var(--green)' }}>
                        {a.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="font-display font-bold text-[12.5px] tracking-tight mb-0.5" style={{ color: 'var(--text)' }}>{a.name}</div>
                  <div className="text-[11px] leading-[1.4] mb-2" style={{ color: 'var(--text2)' }}>{a.role}</div>
                  {a.now_at_company ? (
                    <div className="font-mono text-[9px] tracking-[.06em] uppercase" style={{ color: 'var(--green)' }}>
                      Now at {a.now_at_company}
                    </div>
                  ) : (
                    <button
                      className="font-mono text-[9px] tracking-[.06em] uppercase transition-colors hover:text-[var(--blue)]"
                      style={{ color: 'var(--text3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      title="Update your profile">
                      Update now at →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FELLOWS */}
        {(cohort1Labs.length > 0 || cohort1Tech.length > 0) && (
          <section className="px-8 py-16">
            <div className="max-w-[1240px] mx-auto">
              <div className="font-mono text-[10px] tracking-[.14em] uppercase mb-2" style={{ color: 'var(--purple)' }}>Nestling Fellows</div>
              <h2 className="font-display font-extrabold tracking-tight leading-[1.06] mb-2"
                style={{ fontSize: 'clamp(22px,3vw,36px)', color: 'var(--text)' }}>
                The Nestling Program — Cohort 1
              </h2>
              <p className="text-[14.5px] mb-10" style={{ color: 'var(--text2)' }}>
                A fellowship for people with the right potential and a clear direction.
              </p>

              {cohort1Labs.length > 0 && (
                <div className="mb-10">
                  <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-5 pb-3 border-b" style={{ color: 'var(--text3)', borderColor: 'var(--border)' }}>
                    NestLabs — Cohort 1
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {cohort1Labs.map(f => (
                      <div key={f.id} className="rounded-[12px] p-3.5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                        <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center font-display font-bold text-[14px]"
                          style={{ background: 'rgba(124,58,237,.1)', color: 'var(--purple)' }}>
                          {f.name[0]}
                        </div>
                        <div className="font-display font-bold text-[12.5px] mb-0.5" style={{ color: 'var(--text)' }}>{f.name}</div>
                        <div className="text-[11px]" style={{ color: 'var(--text2)' }}>{f.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cohort1Tech.length > 0 && (
                <div>
                  <div className="font-mono text-[9.5px] tracking-[.12em] uppercase mb-5 pb-3 border-b" style={{ color: 'var(--text3)', borderColor: 'var(--border)' }}>
                    NestTech — Cohort 1
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {cohort1Tech.map(f => (
                      <div key={f.id} className="rounded-[12px] p-3.5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                        <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center font-display font-bold text-[14px]"
                          style={{ background: 'rgba(37,99,235,.1)', color: 'var(--blue)' }}>
                          {f.name[0]}
                        </div>
                        <div className="font-display font-bold text-[12.5px] mb-0.5" style={{ color: 'var(--text)' }}>{f.name}</div>
                        <div className="text-[11px]" style={{ color: 'var(--text2)' }}>{f.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
