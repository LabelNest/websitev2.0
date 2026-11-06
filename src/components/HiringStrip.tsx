import Link from 'next/link'
import { getOpenRoles } from '@/lib/openRoles'

// A thin "now hiring" band for the home page. Renders nothing when no role is open.
export default async function HiringStrip() {
  const roles = await getOpenRoles()
  if (!roles.length) return null
  return (
    <section style={{ background: 'var(--night)', color: 'var(--onnight)' }}>
      <div className="ln-wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 28px', padding: '16px 28px', fontSize: 15 }}>
        <span style={{ font: '600 12px var(--font-sans),sans-serif', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C9A15A' }}>Now hiring</span>
        <span style={{ flex: 1, minWidth: 220 }}>{roles.slice(0, 2).map((r) => r.title).join('  ·  ')}{roles.length > 2 ? `  ·  and ${roles.length - 2} more` : ''}</span>
        <Link href="/careers#roles" style={{ color: 'var(--onnight)', textDecoration: 'underline', textUnderlineOffset: 4 }}>See the roles</Link>
      </div>
    </section>
  )
}
