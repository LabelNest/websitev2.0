import { getContent, items } from '@/lib/siteContent'

// The company timeline on the About page. Entries come from Admin -> Page content -> About -> Journey,
// newest last. Edit or add a line there as things ship.
export default async function JourneyMap() {
  const rows = items(await getContent(), 'about.journey.items')
  if (!rows.length) return null
  return (
    <section className="ln-rule ln-sec">
      <style>{`
.jy{margin:44px 0 0;padding:0;list-style:none;border-top:1px solid var(--text)}
.jy li{display:grid;grid-template-columns:140px 1fr;gap:8px 40px;padding:22px 0;border-bottom:1px solid var(--border)}
.jy .d{font-family:var(--font-serif),serif;font-size:22px;color:var(--pink)}
.jy .t{font-family:var(--font-serif),serif;font-size:26px;line-height:1.15;color:var(--text);margin:0 0 6px}
.jy p{margin:0;font-size:15.5px;max-width:44em}
.jy li:last-child .d::after{content:" · now";font-family:var(--font-sans),sans-serif;font-size:13px;color:var(--text3)}
@media (max-width:640px){.jy li{grid-template-columns:1fr}}
`}</style>
      <div className="ln-wrap">
        <p className="ln-eyebrow">The journey</p>
        <h2 className="ln-h2" style={{ maxWidth: '15em' }}>From a plan to a platform, in a year.</h2>
        <ol className="jy">
          {rows.map((r, i) => <li key={i}><span className="d">{r.date}</span><div><h3 className="t">{r.title}</h3><p>{r.body}</p></div></li>)}
        </ol>
      </div>
    </section>
  )
}
