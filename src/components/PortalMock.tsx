import type { ReactNode } from 'react'

// Vector mock-ups of the LabelNest portals, used in place of raster screenshots on the product pages.
// Every figure is sample data with invented names. Sizes are in em so the whole frame scales with its width.
// A feature uses one by setting its screenshot field to "mock:<id>".

const CSS = `
.pm-fig{container-type:inline-size;min-width:0;overflow:hidden}
.pm{line-height:1.35;text-align:left;color:#0E1B2E;font-family:var(--font-sans),system-ui,sans-serif;--ink:#0E1B2E;--mut:#667085;--ln:#E3E7EE;--bg:#F6F7F9;--ac:#1F3A5F;--br:#B58A3C;--gr:#2C6B4B;--rd:#9A3B2B;background:#fff}
.pm *{box-sizing:border-box}
.pm-fig .pm p{font-size:1em;line-height:1.35}
.pm-b{font-size:clamp(7px,1.55cqw,16px)}
.pm-bar{display:flex;align-items:center;gap:.6em;padding:.8em 1.2em;background:#EEF0F4;border-bottom:1px solid var(--ln)}
.pm-bar i{width:.8em;height:.8em;border-radius:50%;background:#C9CED8}
.pm-url{margin-left:1em;flex:1;max-width:30em;background:#fff;border:1px solid var(--ln);border-radius:.5em;padding:.3em .9em;color:var(--mut);font-size:.95em}
.pm-tag{margin-left:auto;color:var(--mut);font-size:.85em}
.pm-app{display:grid;grid-template-columns:11em 1fr;min-height:30em}
.pm-side{background:#0E1B2E;color:#C9D1DE;padding:1.4em 1em}
.pm-brand{font-family:var(--font-serif),serif;font-size:1.5em;color:#E9E4D8;margin:0 0 1.2em .3em}
.pm-side div{padding:.6em .8em;border-radius:.4em;margin:.1em 0;font-size:1em}
.pm-side div.on{background:#1C2E4A;color:#fff}
.pm-main{background:var(--bg);padding:1.3em 1.4em}
.pm-h{display:flex;justify-content:space-between;align-items:baseline;margin:0 0 1.2em}
.pm-h b{font-size:1.7em;font-weight:600;letter-spacing:-.01em}
.pm-h span{color:var(--mut)}
.pm-card{background:#fff;border:1px solid var(--ln);border-radius:.7em;padding:1.1em 1.2em}
.pm-card h4{margin:0 0 .7em;font-size:1.05em;font-weight:600}
.pm-row{display:grid;gap:1em}
.pm-c2{grid-template-columns:1fr 1fr}.pm-c3{grid-template-columns:repeat(3,1fr)}.pm-c4{grid-template-columns:repeat(4,1fr)}.pm-c5{grid-template-columns:repeat(5,1fr)}
.pm-12{grid-template-columns:1.6fr 1fr}
.pm-k{color:var(--mut);font-size:.92em}
.pm-v{font-size:1.9em;font-weight:600;letter-spacing:-.02em;margin:.1em 0}
.pm-up{color:var(--gr);font-size:.92em}
.pm-pill{display:inline-block;padding:.15em .7em;border-radius:2em;font-size:.88em;background:#EAEFF7;color:var(--ac);white-space:nowrap}
.pm-pill.g{background:#E3F0E8;color:var(--gr)}.pm-pill.a{background:#F6ECD6;color:#7A5217}.pm-pill.r{background:#F5E1DC;color:var(--rd)}
.pm-bars>div{display:grid;grid-template-columns:8.5em 1fr 3em;gap:.8em;align-items:center;margin:.55em 0}
.pm-bars em{font-style:normal;height:.7em;background:#EDF0F5;border-radius:1em;overflow:hidden;display:block}
.pm-bars em i{display:block;height:100%;background:var(--ac);border-radius:1em}
.pm-bars em i.b{background:var(--br)}.pm-bars em i.g{background:var(--gr)}.pm-bars em i.r{background:var(--rd)}
.pm-bars span:last-child{text-align:right;color:var(--mut)}
.pm-t{width:100%;border-collapse:collapse}
.pm-t th{text-align:left;color:var(--mut);font-weight:500;padding:.5em .6em;border-bottom:1px solid var(--ln)}
.pm-t td{padding:.65em .6em;border-bottom:1px solid #F0F2F6}
.pm-search{display:flex;gap:.8em;align-items:center;background:#fff;border:1px solid #CBD2DE;border-radius:.7em;padding:.9em 1.1em;font-size:1.15em;margin-bottom:1em}
.pm-search b{margin-left:auto;background:var(--ac);color:#fff;border-radius:.4em;padding:.35em 1em;font-weight:500;font-size:.85em}
.pm-chip{display:inline-block;border:1px solid var(--ln);background:#fff;border-radius:2em;padding:.25em .9em;margin:0 .5em .5em 0;font-size:.95em}
.pm-chip.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.pm-ring{width:9em;height:9em;border-radius:50%;display:grid;place-items:center;margin:0 auto}
.pm-ring div{width:6.8em;height:6.8em;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:2.2em;font-weight:600}
.pm-ring small{display:block;font-size:.35em;font-weight:400;color:var(--mut);text-align:center}
.pm-tile{background:#fff;border:1px solid var(--ln);border-radius:.7em;padding:1.1em;min-height:7em}
.pm-tile b{display:block;font-size:1.1em;margin:.7em 0 .2em}
.pm-ico{width:2.2em;height:2.2em;border-radius:.5em;background:#EAEFF7;display:block}
.pm-ico.b{background:#F6ECD6}.pm-ico.g{background:#E3F0E8}
.pm-li{display:flex;gap:.9em;align-items:center;padding:.75em 0;border-bottom:1px solid #F0F2F6}
.pm-li:last-child{border:0}
.pm-li p{margin:0;flex:1}.pm-li small{display:block;color:var(--mut)}
.pm-sw{width:2.6em;height:1.4em;border-radius:1em;background:var(--gr);position:relative;flex:none}
.pm-sw::after{content:"";position:absolute;right:.2em;top:.2em;width:1em;height:1em;border-radius:50%;background:#fff}
.pm-av{width:2.8em;height:2.8em;border-radius:50%;background:#D9DFEA;flex:none}
.pm-step{display:flex;align-items:center;gap:.8em}
.pm-step span{flex:1;text-align:center;padding:.9em .4em;border-radius:.6em;background:#fff;border:1px solid var(--ln)}
.pm-step span.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.pm-gauge{height:.9em;border-radius:1em;background:linear-gradient(90deg,#2C6B4B,#B58A3C,#9A3B2B);position:relative;margin:.9em 0 .4em}
.pm-gauge i{position:absolute;top:-.35em;width:.35em;height:1.6em;background:#0E1B2E;border-radius:.2em}
.pm-note{background:#FBF6EA;border:1px solid #EAD9AE;border-radius:.6em;padding:.9em 1.1em;margin-top:.8em}
@container (max-width:520px){.pm-app{grid-template-columns:1fr}.pm-side{display:none}}
`

function Frame({ url, nav, on, title, sub, children }: { url: string; nav: string[]; on: number; title: string; sub?: string; children: ReactNode }) {
  return (
    <div className="pm pm-b">
      <div className="pm-bar"><i /><i /><i /><span className="pm-url">{url}</span><span className="pm-tag">Sample data</span></div>
      <div className="pm-app">
        <div className="pm-side"><p className="pm-brand">LabelNest</p>{nav.map((n, i) => <div key={n} className={i === on ? 'on' : ''}>{n}</div>)}</div>
        <div className="pm-main"><div className="pm-h"><b>{title}</b>{sub && <span>{sub}</span>}</div>{children}</div>
      </div>
    </div>
  )
}

const Bars = ({ rows, tone }: { rows: [string, number, string?][]; tone?: string }) => (
  <div className="pm-bars">{rows.map(([l, p, t]) => <div key={l}><span>{l}</span><em><i className={tone || ''} style={{ width: p + '%' }} /></em><span>{t ?? p + '%'}</span></div>)}</div>
)
const Stat = ({ k, v, s }: { k: string; v: string; s?: string }) => <div className="pm-card"><div className="pm-k">{k}</div><div className="pm-v">{v}</div>{s && <div className="pm-up">{s}</div>}</div>
const Ring = ({ pct, label, color = '#1F3A5F' }: { pct: number; label: string; color?: string }) => (
  <div className="pm-ring" style={{ background: `conic-gradient(${color} ${pct * 3.6}deg,#E8ECF2 0)` }}><div><span>{pct}<small>{label}</small></span></div></div>
)

const ATLAS = ['Explore', 'Markets', 'Capital managers', 'Capital providers', 'Funds', 'Companies', 'People', 'Market Pulse']
const COMMAND = ['Fund overview', 'Deal flow', 'Diligence', 'Investment committee', 'LP directory', 'Capital accounts', 'LP reports', 'Automations']
const ASCENT = ['Data room', 'Readiness', 'Templates', 'Investors', 'Share links', 'Activity']
const ORBIT = ['Dashboard', 'Programmes', 'Startups', 'Mentors', 'Capital connect', 'Finance', 'Reports']
const CONNECT = ['Home', 'Funds', 'Mentors', 'Applications', 'Saved']
const HR = ['People', 'Hiring', 'Performance', 'Expenses', 'Learning', 'Analytics', 'Documents']
const SENT = ['Risk overview', 'Concentration', 'Valuation', 'Exit risk', 'Stress test', 'Operations', 'Sentinel AI']

const SCENES: Record<string, () => ReactNode> = {
  'atlas-explore': () => (
    <Frame url="atlas.labelnest.in/explore" nav={ATLAS} on={0} title="Explore" sub="Ask in plain language">
      <div className="pm-search"><span>Healthcare companies on the platform</span><b>Search</b></div>
      <div><span className="pm-chip on">Companies</span><span className="pm-chip">Capital managers</span><span className="pm-chip">Funds</span><span className="pm-chip">Sector: Healthcare</span><span className="pm-chip">Stage: Series A</span></div>
      <div className="pm-card"><table className="pm-t"><thead><tr><th>Name</th><th>Type</th><th>Sector</th><th>Country</th><th>Last event</th></tr></thead><tbody>
        {[['Northfield Health', 'Company', 'Digital health', 'India', 'Round, 3 weeks ago'], ['Meridian Diagnostics', 'Company', 'Diagnostics', 'India', 'Hire, 5 weeks ago'], ['Harbor Ridge Care', 'Company', 'Healthcare services', 'Singapore', 'Round, 2 months ago'], ['Alder Lane Biotech', 'Company', 'Biotech', 'United Kingdom', 'Filing, 2 months ago'], ['Kestrel Medical', 'Company', 'Medical devices', 'UAE', 'News, 3 months ago']].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{i === 1 ? <span className="pm-pill">{c}</span> : c}</td>)}</tr>)}
      </tbody></table></div>
    </Frame>
  ),
  'atlas-markets': () => (
    <Frame url="atlas.labelnest.in/markets" nav={ATLAS} on={1} title="Markets and registers" sub="Coverage by regulator">
      <div><span className="pm-chip on">All regulators</span><span className="pm-chip">Stage</span><span className="pm-chip">Sector</span><span className="pm-chip">State</span></div>
      <div className="pm-row pm-12">
        <div className="pm-card"><h4>Funds on Atlas against the register</h4><Bars rows={[['India, SEBI AIF', 96], ['United States, SEC', 88], ['United Kingdom, FCA', 74], ['Singapore, MAS', 69], ['Germany, BaFin', 61], ['UAE, DFSA', 55]]} /></div>
        <div className="pm-card"><h4>Depth of coverage</h4><Bars tone="b" rows={[['Deep', 42, '42%'], ['Growing', 38, '38%'], ['Thin', 20, '20%']]} /><div className="pm-note pm-k">Know what is not covered before you rely on a count.</div></div>
      </div>
    </Frame>
  ),
  'atlas-register': () => (
    <Frame url="atlas.labelnest.in/markets/register" nav={ATLAS} on={1} title="Register coverage" sub="One register, in full">
      <div className="pm-row pm-c4" style={{ marginBottom: '1em' }}><Stat k="Funds on register" v="1,000" /><Stat k="Funds on Atlas" v="960" s="96% covered" /><Stat k="Managers behind them" v="410" /><Stat k="Portfolio companies" v="2,350" /></div>
      <div className="pm-row pm-c2"><div className="pm-card"><h4>Coverage</h4><Ring pct={96} label="covered" /></div><div className="pm-card"><h4>Funds by sector</h4><Bars rows={[['Venture', 46], ['Private equity', 24], ['Real assets', 14], ['Credit', 10], ['Other', 6]]} /></div></div>
    </Frame>
  ),
  'atlas-pulse': () => (
    <Frame url="atlas.labelnest.in/pulse" nav={ATLAS} on={7} title="Market Pulse" sub="Everything that changed">
      <div className="pm-row pm-c3" style={{ marginBottom: '1em' }}><Stat k="Reviewed events" v="1,284" /><Stat k="Early signals" v="312" /><Stat k="Fundraises this quarter" v="86" /></div>
      <div className="pm-card"><span className="pm-chip on">All</span><span className="pm-chip">Fundraises</span><span className="pm-chip">Moves</span><span className="pm-chip">Deals</span><span className="pm-chip">News</span>
        {[['Meridian Capital closed a second fund', 'Fundraise', 'g', 'Reviewed'], ['Alder Lane appointed a new head of investments', 'Move', 'g', 'Reviewed'], ['Possible new fund filing by Harbor Ridge', 'Signal', 'a', 'Unconfirmed'], ['Northfield Health raised a Series A', 'Deal', 'g', 'Reviewed']].map((r) => <div className="pm-li" key={r[0]}><p>{r[0]}<small>{r[1]}, this week</small></p><span className={'pm-pill ' + r[2]}>{r[3]}</span></div>)}
      </div>
    </Frame>
  ),
  'exchange-marketplace': () => (
    <Frame url="exchange.labelnest.in" nav={['Marketplace', 'My purchases', 'Sell data', 'Credits', 'Orders']} on={0} title="Marketplace" sub="Datasets from verified sellers">
      <div className="pm-search"><span>Search datasets</span><b>Search</b></div>
      <div className="pm-row pm-c3">{[['Fund manager contacts, South Asia', '48,200 rows', '$1,200'], ['Quarterly portfolio marks, venture', '12,900 rows', '$850'], ['Founder directory, Southeast Asia', '31,400 rows', '$640']].map((d) => <div className="pm-card" key={d[0]}><span className="pm-pill g">Verified seller</span><h4 style={{ margin: '.8em 0 .3em' }}>{d[0]}</h4><div className="pm-k">{d[1]}, updated monthly</div><div className="pm-v" style={{ fontSize: '1.5em' }}>{d[2]}</div><div className="pm-k">Sample rows before you buy</div></div>)}</div>
    </Frame>
  ),
  'command-automations': () => (
    <Frame url="command.labelnest.in/automations" nav={COMMAND} on={7} title="Automations" sub="Runs without you">
      <div className="pm-card">{[['Refresh NAV from latest valuations', 'Runs nightly, last run 02:00'], ['Pull portfolio updates from Ascent data rooms', 'Runs when a room changes'], ['Draft the quarterly LP report', 'Runs on quarter end'], ['Remind founders of missing documents', 'Runs weekly']].map((r) => <div className="pm-li" key={r[0]}><p>{r[0]}<small>{r[1]}</small></p><span className="pm-pill g">Healthy</span><span className="pm-sw" /></div>)}</div>
    </Frame>
  ),
  'command-fund': () => (
    <Frame url="command.labelnest.in/fund" nav={COMMAND} on={0} title="Fund overview" sub="Sample Fund I">
      <div className="pm-row pm-c5" style={{ marginBottom: '1em' }}><Stat k="Target size" v="$40M" /><Stat k="Called" v="$24M" s="60%" /><Stat k="NAV" v="$31.2M" /><Stat k="TVPI" v="1.42x" /><Stat k="DPI" v="0.18x" /></div>
      <div className="pm-row pm-c2"><div className="pm-card"><h4>Pipeline</h4><Bars rows={[['Sourced', 90, '36'], ['Screening', 64, '19'], ['Diligence', 38, '8'], ['Committee', 20, '4'], ['Term sheet', 10, '2']]} /></div><div className="pm-card"><h4>Needs you today</h4>{['Approve capital call 4', 'Vote on two committee items', 'Review diligence notes'].map((t) => <div className="pm-li" key={t}><p>{t}</p><span className="pm-pill a">Due</span></div>)}</div></div>
    </Frame>
  ),
  'command-menus': () => (
    <Frame url="command.labelnest.in" nav={COMMAND} on={1} title="Deal flow and LPs" sub="One workspace">
      <div className="pm-row pm-c2">
        <div className="pm-card"><h4>Deal flow</h4>{['Pipeline', 'Applications', 'Diligence tracker', 'Term sheet tracker', 'Investment committee voting', 'Decision archive', 'IC-ready report'].map((t) => <div className="pm-li" key={t}><p>{t}</p></div>)}</div>
        <div className="pm-card"><h4>Limited partners</h4>{['LP directory', 'Capital accounts', 'Fundraising pipeline', 'LP reports', 'Shareable views', 'Briefings'].map((t) => <div className="pm-li" key={t}><p>{t}</p></div>)}</div>
      </div>
    </Frame>
  ),
  'ascent-readiness': () => (
    <Frame url="ascent.labelnest.in/readiness" nav={ASCENT} on={1} title="Readiness" sub="How complete is the room">
      <div className="pm-row pm-12">
        <div className="pm-card"><h4>Score by dimension</h4><Bars tone="b" rows={[['Company', 92], ['Financials', 71], ['Legal', 64], ['Product', 80], ['Team', 88], ['Market', 56]]} /></div>
        <div className="pm-card"><Ring pct={72} label="of 100" color="#B58A3C" /><div className="pm-k" style={{ textAlign: 'center', marginTop: '.8em' }}>Ready for investor review</div></div>
      </div>
      <div className="pm-card" style={{ marginTop: '1em' }}><h4>To do</h4>{['Upload audited accounts for last year', 'Add the signed shareholders agreement', 'Complete the market sizing note'].map((t) => <div className="pm-li" key={t}><p>{t}</p><span className="pm-pill a">Missing</span></div>)}</div>
    </Frame>
  ),
  'ascent-templates': () => (
    <Frame url="ascent.labelnest.in/templates" nav={ASCENT} on={2} title="Template library" sub="116 templates">
      <div><span className="pm-chip on">All</span><span className="pm-chip">Pitch deck</span><span className="pm-chip">Financial model</span><span className="pm-chip">Term sheet</span><span className="pm-chip">Cap table</span><span className="pm-chip">Policies</span></div>
      <div className="pm-row pm-c4">{['Pitch deck', 'Financial model', 'Term sheet', 'Cap table', 'Shareholders agreement', 'ESOP policy', 'Board minutes', 'Data protection policy'].map((t, i) => <div className="pm-tile" key={t}><span className={'pm-ico ' + (i % 3 === 1 ? 'b' : i % 3 === 2 ? 'g' : '')} /><b>{t}</b><span className="pm-k">2 templates</span></div>)}</div>
    </Frame>
  ),
  'orbit-selection': () => (
    <Frame url="orbit.labelnest.in/startups" nav={ORBIT} on={2} title="Startups" sub="Spring cohort">
      <div className="pm-step" style={{ marginBottom: '1.2em' }}><span>Applied 120</span><span>Shortlisted 36</span><span className="on">Selected 12</span><span>Data room live 12</span></div>
      <div className="pm-card"><table className="pm-t"><thead><tr><th>Startup</th><th>Sector</th><th>Status</th><th>Data room</th></tr></thead><tbody>
        {[['Northfield Health', 'Digital health', 'Selected', 'Created'], ['Kestrel Mobility', 'Mobility', 'Selected', 'Created'], ['Alder Lane Foods', 'Food and agri', 'Shortlisted', '-'], ['Harbor Pay', 'Fintech', 'Shortlisted', '-']].map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td><span className={'pm-pill ' + (r[2] === 'Selected' ? 'g' : '')}>{r[2]}</span></td><td>{r[3]}</td></tr>)}
      </tbody></table></div>
    </Frame>
  ),
  'orbit-workspace': () => (
    <Frame url="orbit.labelnest.in" nav={ORBIT} on={0} title="Your programme" sub="Everything in one place">
      <div className="pm-row pm-c4">{['Dashboard', 'Programmes', 'Startups', 'Mentors', 'Capital connect', 'Finance', 'Reports', 'Cohort data room'].map((t, i) => <div className="pm-tile" key={t}><span className={'pm-ico ' + (i % 3 === 1 ? 'b' : i % 3 === 2 ? 'g' : '')} /><b>{t}</b><span className="pm-k">Open</span></div>)}</div>
    </Frame>
  ),
  'connect-home': () => (
    <Frame url="connect.labelnest.in" nav={CONNECT} on={0} title="Funds backing founders" sub="Read the thesis, then apply">
      <div className="pm-row pm-12">
        <div className="pm-card"><span className="pm-pill g">Accepting applications</span><h4 style={{ margin: '.8em 0 .4em', fontSize: '1.5em' }}>Early-stage, any sector, India</h4><p className="pm-k" style={{ margin: 0 }}>Backs founders at pre-seed and seed, and evaluates them through their data room. Typical cheque $250K to $1M.</p><div className="pm-note"><b>Apply with your Ascent room</b><div className="pm-k">No decks to attach. The fund reads the room you already keep.</div></div></div>
        <div className="pm-card"><h4>Other funds</h4>{['Sample Climate Fund', 'Sample Health Fund', 'Sample Consumer Fund'].map((t) => <div className="pm-li" key={t}><p>{t}<small>Seed, India</small></p><span className="pm-pill">View</span></div>)}</div>
      </div>
    </Frame>
  ),
  'connect-mentors': () => (
    <Frame url="connect.labelnest.in/mentors" nav={CONNECT} on={2} title="Mentors" sub="Verified, bookable">
      <div className="pm-search"><span>Ask Kai: I need to negotiate a seed term sheet</span><b>Ask</b></div>
      <div className="pm-row pm-c3">{[['Mentor A', 'Seed term sheets, fundraising'], ['Mentor B', 'Pricing and go to market'], ['Mentor C', 'Hiring your first ten']].map((m) => <div className="pm-card" key={m[0]}><div className="pm-li" style={{ border: 0, padding: 0 }}><span className="pm-av" /><p><b>{m[0]}</b><small>{m[1]}</small></p></div><div style={{ marginTop: '.9em' }}><span className="pm-pill g">Verified</span> <span className="pm-pill">Book</span></div></div>)}</div>
    </Frame>
  ),
  'nesthr-modules': () => (
    <Frame url="nesthr.labelnest.in" nav={HR} on={0} title="One workspace for people" sub="Nine modules, one login">
      <div className="pm-row pm-c3">{['People', 'Hiring', 'Performance', 'Expenses', 'Learning', 'Analytics', 'Lifecycle', 'Documents', 'Discussion'].map((t, i) => <div className="pm-tile" key={t}><span className={'pm-ico ' + (i % 3 === 1 ? 'b' : i % 3 === 2 ? 'g' : '')} /><b>{t}</b><span className="pm-k">Open</span></div>)}</div>
    </Frame>
  ),
  'nesthr-funnel': () => (
    <Frame url="nesthr.labelnest.in/hiring" nav={HR} on={1} title="Hiring funnel" sub="Campus and corporate together">
      <div className="pm-row pm-c2">
        <div className="pm-card"><h4>Campus drive</h4><Bars rows={[['Applied', 100, '640'], ['Shortlisted', 46, '295'], ['Interviewed', 24, '154'], ['Offered', 9, '58'], ['Joined', 7, '44']]} /></div>
        <div className="pm-card"><h4>Corporate requisition</h4><Bars tone="b" rows={[['Applied', 100, '210'], ['Shortlisted', 38, '80'], ['Interviewed', 20, '42'], ['Offered', 6, '13'], ['Joined', 5, '10']]} /></div>
      </div>
    </Frame>
  ),
  'sentinel-risk': () => (
    <Frame url="sentinel.labelnest.in/dashboard" nav={SENT} on={0} title="Risk overview" sub="Sample portfolio">
      <div className="pm-row pm-c5" style={{ marginBottom: '1em' }}>{[['Concentration', 'CRE', 'Moderate', 'a'], ['Valuation', 'VIE', 'Low', 'g'], ['Exit risk', 'LERE', 'Moderate', 'a'], ['Stress test', 'PSTE', 'High', 'r'], ['Operations', 'OTRM', 'Low', 'g']].map((s) => <div className="pm-card" key={s[1]}><div className="pm-k">{s[0]}</div><div className="pm-v" style={{ fontSize: '1.4em' }}>{s[1]}</div><span className={'pm-pill ' + s[3]}>{s[2]}</span></div>)}</div>
      <div className="pm-card"><h4>Sector concentration against the 0.25 threshold</h4><div className="pm-gauge"><i style={{ left: '38%' }} /></div><div className="pm-k">HHI 0.19, inside the safe threshold</div></div>
    </Frame>
  ),
  'sentinel-signal': () => (
    <Frame url="sentinel.labelnest.in/signals" nav={SENT} on={4} title="Signal to action" sub="What each score means">
      <div className="pm-row pm-c2">
        <div className="pm-card"><h4>Stress test (PSTE)</h4><span className="pm-pill r">High</span><p style={{ margin: '.8em 0 0' }}>A repeat of the 2020 market crash would reduce portfolio NAV by about 18%.</p><div className="pm-note"><b>What to consider next</b><div className="pm-k">Reduce exposure to the two most affected sectors before the next valuation date.</div></div></div>
        <div className="pm-card"><h4>How you compare</h4><Bars tone="b" rows={[['Your portfolio', 64, 'High'], ['Typical fund', 41, 'Mid'], ['Lowest quartile', 22, 'Low']]} /></div>
      </div>
    </Frame>
  ),
}

const DF = ['Overview', 'Startups', 'Data rooms', 'Board', 'Introductions', 'Reports', 'Investor directory', 'Matching', 'Audit log']
const STAGES = ['Suggested', 'Introduced', 'Meeting', 'Interested', 'Diligence', 'Term sheet', 'Funded', 'Passed']
const Cols = ({ v }: { v: number[] }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5em', height: '8em' }}>{v.map((h, i) => <i key={i} style={{ flex: 1, height: h + '%', background: i === v.length - 1 ? '#B58A3C' : '#1F3A5F', borderRadius: '.25em .25em 0 0' }} />)}</div>
)

const MORE: Record<string, () => ReactNode> = {
  'ascent-room': () => (
    <Frame url="ascent.labelnest.in/room" nav={ASCENT} on={0} title="Data room" sub="Sample Startup Pvt Ltd">
      <div className="pm-row pm-12">
        <div className="pm-card"><h4>Sections</h4><Bars rows={[['Company identity', 100], ['Team', 90], ['Product', 80], ['Market', 60], ['Traction', 75], ['Financials', 70], ['Legal', 45], ['Cap table', 85]]} /></div>
        <div className="pm-card"><h4>Document vault</h4>{['Certificate of incorporation', 'Audited accounts', 'Shareholders agreement'].map((t) => <div className="pm-li" key={t}><p>{t}<small>Linked to 3 answers</small></p><span className="pm-pill g">Linked</span></div>)}</div>
      </div>
    </Frame>
  ),
  'ascent-financial': () => (
    <Frame url="ascent.labelnest.in/financial-story" nav={ASCENT} on={0} title="Financial story" sub="Enter numbers once">
      <div className="pm-row pm-c3" style={{ marginBottom: '1em' }}><div className="pm-card"><div className="pm-k">Revenue</div><Cols v={[20, 28, 36, 48, 62, 80]} /></div><div className="pm-card"><div className="pm-k">Gross margin</div><Cols v={[40, 44, 47, 52, 55, 58]} /></div><div className="pm-card"><div className="pm-k">Cash and runway</div><Cols v={[90, 80, 70, 60, 52, 44]} /></div></div>
      <div className="pm-note"><b>Narrative</b><div className="pm-k">Revenue has grown every quarter on repeat customers. Runway is 14 months at the current burn.</div></div>
    </Frame>
  ),
  'ascent-share': () => (
    <Frame url="ascent.labelnest.in/share" nav={ASCENT} on={4} title="Investor link" sub="Share on your terms">
      <div className="pm-row pm-c2">
        <div className="pm-card"><h4>Link settings</h4>{[['Email gate', 1], ['NDA', 1], ['Watermark', 1], ['Password', 0], ['Expires in 14 days', 1], ['Downloads', 0]].map((r) => <div className="pm-li" key={r[0] as string}><p>{r[0]}</p>{r[1] ? <span className="pm-sw" /> : <span className="pm-pill">Off</span>}</div>)}</div>
        <div className="pm-card"><h4>Who opened it</h4>{[['investor@samplefund.example', 'Today, 10:42'], ['partner@sampleangels.example', 'Yesterday'], ['analyst@samplefamily.example', '3 days ago']].map((r) => <div className="pm-li" key={r[0]}><span className="pm-av" /><p>{r[0]}<small>{r[1]}</small></p></div>)}</div>
      </div>
    </Frame>
  ),
  'ascent-deck': () => (
    <Frame url="ascent.labelnest.in/pitch-deck" nav={ASCENT} on={0} title="Pitch deck, both ways" sub="Analyzer">
      <div className="pm-row pm-c2">
        <div className="pm-card"><h4>Generate</h4><div className="pm-step" style={{ flexDirection: 'column', alignItems: 'stretch' }}><span>Filled-in data room</span><span>Slides grounded in real answers</span><span className="on">Nothing invented, nothing stored</span></div></div>
        <div className="pm-card"><h4>Analyze</h4><div className="pm-row pm-c2"><div><div className="pm-k">Score on a 20-item rubric</div><div className="pm-v">14 / 20</div></div><div><div className="pm-k">Claims checked</div><div className="pm-v">9 of 11</div></div></div><div className="pm-note"><b>Fill my data room from this deck</b><div className="pm-k">You review every suggested answer. Only confirmed answers are written.</div></div></div>
      </div>
    </Frame>
  ),
  'df-overview': () => (
    <Frame url="deals.ascent.labelnest.in/overview" nav={DF} on={0} title="Cohort overview" sub="Spring cohort">
      <div className="pm-row pm-c4" style={{ marginBottom: '1em' }}><Stat k="Startups" v="24" /><Stat k="Rooms ready" v="9" s="38%" /><Stat k="Gone quiet" v="5" /><Stat k="Waiting on a founder" v="7" /></div>
      <div className="pm-row pm-c2"><div className="pm-card"><h4>Cohort funnel</h4><Bars rows={[['Rooms started', 100, '24'], ['Over 40% complete', 71, '17'], ['Ready', 38, '9'], ['Introduced', 21, '5'], ['Funded', 8, '2']]} /></div><div className="pm-card"><h4>Needs attention</h4>{['Sample Foods has not opened its room in 21 days', 'Sample Pay is waiting on audited accounts', 'Sample Mobility changed 6 answers at the last sync'].map((t) => <div className="pm-li" key={t}><p>{t}</p><span className="pm-pill a">Review</span></div>)}</div></div>
    </Frame>
  ),
  'df-startups': () => (
    <Frame url="deals.ascent.labelnest.in/startups" nav={DF} on={1} title="Startups" sub="Read only, never written back">
      <div className="pm-card"><table className="pm-t"><thead><tr><th>Startup</th><th>Readiness</th><th>Completeness</th><th>Missing</th><th /></tr></thead><tbody>
        {[['Sample Health', 82, 94, 'Cap table'], ['Sample Mobility', 71, 80, 'Audited accounts'], ['Sample Foods', 48, 55, 'Legal, market'], ['Sample Pay', 66, 72, 'Financials']].map((r) => <tr key={r[0] as string}><td>{r[0]}</td><td><span className={'pm-pill ' + ((r[1] as number) > 70 ? 'g' : 'a')}>{r[1]}</span></td><td>{r[2]}%</td><td>{r[3]}</td><td><span className="pm-pill">Ask to refresh</span></td></tr>)}
      </tbody></table></div>
    </Frame>
  ),
  'df-board': () => (
    <Frame url="deals.ascent.labelnest.in/board" nav={DF} on={3} title="Board" sub="Every pairing moves left to right">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: '.6em' }}>{STAGES.map((s, i) => <div key={s}><div className="pm-k" style={{ marginBottom: '.5em' }}>{s}</div>{Array.from({ length: i < 6 ? (i % 3) + 1 : 1 }).map((_, j) => <div className="pm-card" key={j} style={{ padding: '.7em', marginBottom: '.5em', borderLeft: s === 'Passed' ? '3px solid #9A3B2B' : s === 'Funded' ? '3px solid #2C6B4B' : undefined }}><b style={{ fontSize: '.95em' }}>Sample {String.fromCharCode(65 + i + j)}</b><div className="pm-k">{(i + 1) * 3} days in stage</div></div>)}</div>)}</div>
      <div className="pm-note pm-k">Suggested to Introduced needs the founder's yes.</div>
    </Frame>
  ),
  'df-consent': () => (
    <Frame url="deals.ascent.labelnest.in/introductions" nav={DF} on={4} title="Introduction request" sub="Founder decides">
      <div className="pm-card" style={{ maxWidth: '38em', margin: '0 auto' }}><h4>Sample Fund would like an introduction to Sample Health</h4><p className="pm-k" style={{ margin: '0 0 .8em' }}>Choose what the investor can see.</p>
        {[['Profile', 1], ['Traction', 1], ['Pitch deck', 1], ['Financials', 0], ['Cap table', 0], ['Full room', 0]].map((r) => <div className="pm-li" key={r[0] as string}><p>{r[0]}</p>{r[1] ? <span className="pm-sw" /> : <span className="pm-pill">Off</span>}</div>)}
        <div style={{ marginTop: '1em', display: 'flex', gap: '.7em' }}><span className="pm-pill g">Agree and introduce</span><span className="pm-pill r">Decline</span></div></div>
    </Frame>
  ),
  'df-matching': () => (
    <Frame url="deals.ascent.labelnest.in/matching" nav={DF} on={7} title="Matching" sub="Drafts until a person approves">
      <div className="pm-card">{[['Sample Ventures', 'Seed, India, health. Cheque $500K to $2M.'], ['Sample Angels Network', 'Pre-seed, any sector, South Asia.'], ['Sample Family Office', 'Series A, India, consumer.']].map((r) => <div className="pm-li" key={r[0]}><p><b>{r[0]}</b><small>Why: {r[1]}</small></p><span className="pm-pill a">Draft</span><span className="pm-pill g">Approve</span><span className="pm-pill">Reject</span></div>)}</div>
    </Frame>
  ),
  'df-audit': () => (
    <Frame url="deals.ascent.labelnest.in/audit" nav={DF} on={8} title="Audit log" sub="Add only, never edited">
      <div className="pm-card"><table className="pm-t"><thead><tr><th>When</th><th>Who</th><th>What</th></tr></thead><tbody>
        {[['Today 11:02', 'Cohort admin', 'Viewed investor contact'], ['Today 10:40', 'Founder, Sample Health', 'Agreed to introduction'], ['Yesterday', 'Manager', 'Approved a match'], ['3 days ago', 'Founder, Sample Pay', 'Withdrew consent']].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}
      </tbody></table></div>
    </Frame>
  ),
  'connect-routes': () => (
    <Frame url="connect.labelnest.in" nav={CONNECT} on={0} title="Three routes, one rule" sub="The founder decides">
      <div className="pm-row pm-c3">{[['Capital Portal', 'The fund finds founders', ['Fund submits a thesis', 'Sees matched founders as teasers', 'Sends interest', 'Contact shown only on accept']], ['Deal Scouting', 'The founder applies', ['Fund publishes a thesis', 'Founder checks fit', 'Founder applies', 'Tracks it in My applications']], ['Through the programme', 'Ascent deal flow', ['Admin suggests an investor', 'Founder is asked', 'Founder picks what is shared', 'Introduction recorded']]].map((r) => <div className="pm-card" key={r[0] as string}><b>{r[0] as string}</b><div className="pm-k" style={{ marginBottom: '.7em' }}>{r[1] as string}</div><div className="pm-step" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '.4em' }}>{(r[2] as string[]).map((s, i, a) => <span key={s} className={i === a.length - 1 ? 'on' : ''}>{s}</span>)}</div></div>)}</div>
    </Frame>
  ),
  'connect-portal': () => (
    <Frame url="connect.labelnest.in/capital-portal" nav={CONNECT} on={1} title="Capital Portal" sub="Opt in to be found">
      <div className="pm-row pm-c2">
        <div className="pm-card"><h4>Matched founders (fund view)</h4>{[['Digital health, seed, India', '82% ready'], ['Climate, pre-seed, India', '64% ready'], ['Fintech, seed, Southeast Asia', '71% ready']].map((r) => <div className="pm-li" key={r[0]}><p>{r[0]}<small>{r[1]}, name hidden</small></p><span className="pm-pill">Send interest</span></div>)}</div>
        <div className="pm-card"><h4>Interest received (founder view)</h4><p style={{ margin: '0 0 .6em' }}>Sample Fund is interested in your company.</p><div className="pm-note pm-k">Contact details are hidden until you accept.</div><div style={{ marginTop: '1em', display: 'flex', gap: '.7em' }}><span className="pm-pill g">Accept</span><span className="pm-pill r">Decline</span></div></div>
      </div>
    </Frame>
  ),
  'connect-applications': () => (
    <Frame url="connect.labelnest.in/applications" nav={CONNECT} on={3} title="My applications" sub="Track every thesis you applied to">
      <div className="pm-card"><table className="pm-t"><thead><tr><th>Fund</th><th>Thesis</th><th>Fit</th><th>Status</th></tr></thead><tbody>
        {[['Sample Ventures', 'Seed, health, India', '88%', 'In review'], ['Sample Angels', 'Pre-seed, any sector', '76%', 'Interested'], ['Sample Climate Fund', 'Seed, climate', '54%', 'Not a fit']].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{i === 3 ? <span className={'pm-pill ' + (c === 'Interested' ? 'g' : c === 'Not a fit' ? 'r' : 'a')}>{c}</span> : c}</td>)}</tr>)}
      </tbody></table></div>
    </Frame>
  ),
}
const Steps = ({ s, on }: { s: string[]; on: number }) => <div className="pm-step">{s.map((x, i) => <span key={x} className={i <= on ? 'on' : ''}>{x}</span>)}</div>
const List = ({ rows }: { rows: [string, string, string?, string?][] }) => <div className="pm-card">{rows.map((r) => <div className="pm-li" key={r[0]}><p><b>{r[0]}</b><small>{r[1]}</small></p>{r[2] && <span className={'pm-pill ' + (r[3] || '')}>{r[2]}</span>}</div>)}</div>

const MORE2: Record<string, () => ReactNode> = {
  'atlas-lists': () => (
    <Frame url="atlas.labelnest.in/compare" nav={ATLAS} on={2} title="Compare" sub="Up to three side by side">
      <div className="pm-row pm-c3">{[['Northfield Capital', '$420M', 'Venture', '14 funds'], ['Meridian Partners', '$1.1B', 'Private equity', '9 funds'], ['Harbor Ridge', '$260M', 'Credit', '6 funds']].map((r) => <div className="pm-card" key={r[0]}><b>{r[0]}</b><div className="pm-v">{r[1]}</div><div className="pm-k">{r[2]}</div><div className="pm-k">{r[3]}</div><span className="pm-pill g">Reviewed</span></div>)}</div>
      <div className="pm-note"><b>Alert</b><div className="pm-k">Meridian Partners has a new fund on its register. 2 lists affected.</div></div>
    </Frame>
  ),
  'atlas-notes': () => (
    <Frame url="atlas.labelnest.in/field-notes" nav={ATLAS} on={2} title="Add a Field Note" sub="About a minute">
      <div className="pm-card"><div className="pm-k">Record</div><b>Sample Capital Manager</b><div className="pm-search" style={{ fontSize: '1em', margin: '.8em 0' }}><span>Their second fund closed in March</span><b>Submit</b></div><Steps s={['Submitted', 'Reviewed', 'Approved', 'Credits earned']} on={2} /></div>
    </Frame>
  ),
  'atlas-exports': () => (
    <Frame url="atlas.labelnest.in/export" nav={ATLAS} on={0} title="Export" sub="Within your plan">
      <div className="pm-row pm-c2"><div className="pm-card"><h4>Your filtered view</h4><div className="pm-v">2,340 rows</div><div className="pm-k">Healthcare, India, Series A</div><div style={{ marginTop: '.8em' }}><span className="pm-pill">CSV</span> <span className="pm-pill g">Export</span></div></div><div className="pm-card"><h4>Credits</h4><div className="pm-v">480</div><div className="pm-k">Balance, always on screen</div><Bars tone="b" rows={[['Premium reads', 35], ['Exports', 20]]} /></div></div>
    </Frame>
  ),
  'nesthr-payroll': () => (
    <Frame url="nesthr.labelnest.in/payroll" nav={HR} on={0} title="Attendance, leave and payroll" sub="One record">
      <div className="pm-row pm-c2"><div className="pm-card"><h4>Leave to approve</h4>{[['Sample Employee A', '2 days'], ['Sample Employee B', '1 day']].map((r) => <div className="pm-li" key={r[0]}><p>{r[0]}<small>{r[1]}</small></p><span className="pm-pill g">Approve</span></div>)}</div><div className="pm-card"><h4>This month</h4><Bars rows={[['Attendance', 96], ['Payroll run', 100, 'Done'], ['Payslips in Documents', 100, 'Filed']]} /></div></div>
    </Frame>
  ),
  'nesthr-reviews': () => (
    <Frame url="nesthr.labelnest.in/performance" nav={HR} on={2} title="Reviews, goals and learning" sub="Appraisal cycle">
      <div className="pm-row pm-c3">{[['Work log', 'This week, 12 entries'], ['Goals', '4 of 5 on track'], ['Appraisal', 'Self review due']].map((r) => <div className="pm-card" key={r[0]}><b>{r[0]}</b><div className="pm-k">{r[1]}</div></div>)}</div>
      <div className="pm-note"><b>From the review</b><div className="pm-k">Assigned learning path: Managing teams. Cohort starts next month.</div></div>
    </Frame>
  ),
  'sentinel-grounded': () => (
    <Frame url="sentinel.labelnest.in/portfolio" nav={SENT} on={1} title="One entity, one record" sub="Same record as Atlas">
      <List rows={[['Sample Capital Manager', 'Manager, 3 funds', 'Linked', 'g'], ['Sample Fund II', 'Fund, 18 companies', 'Linked', 'g'], ['Sample Health Pvt Ltd', 'Company, Series A', 'Linked', 'g']]} />
    </Frame>
  ),
  'sentinel-inputs': () => (
    <Frame url="sentinel.labelnest.in/score" nav={SENT} on={2} title="Valuation (VIE)" sub="Open the score">
      <div className="pm-row pm-12"><div className="pm-card"><h4>Inputs behind the score</h4><Bars tone="b" rows={[['Mark age', 40, '210 days'], ['Gap to comparables', 55, '22%'], ['Reported against observed', 30, '9%']]} /><div className="pm-k">Each input shows its source and date.</div></div><div className="pm-card"><Ring pct={58} label="risk" color="#B58A3C" /></div></div>
    </Frame>
  ),
  'exchange-escrow': () => (
    <Frame url="exchange.labelnest.in/orders" nav={['Marketplace', 'My purchases', 'Sell data', 'Credits', 'Orders']} on={4} title="Order" sub="Held in escrow">
      <div className="pm-card"><Steps s={['Buyer pays', 'Held in escrow', 'Data delivered', 'Delivery confirmed', 'Seller paid']} on={1} /><div className="pm-note pm-k">The buyer carries no upfront risk. The seller is guaranteed payment on delivery.</div></div>
    </Frame>
  ),
  'exchange-quality': () => (
    <Frame url="exchange.labelnest.in/dataset" nav={['Marketplace', 'My purchases', 'Sell data', 'Credits', 'Orders']} on={0} title="Dataset quality" sub="Quality score 86">
      <div className="pm-row pm-12"><div className="pm-card"><Bars rows={[['Completeness', 91], ['Recency', 84], ['Provenance', 82]]} /><div className="pm-k">The listing shows how each score is worked out.</div></div><div className="pm-card"><Ring pct={86} label="quality" color="#2C6B4B" /></div></div>
    </Frame>
  ),
  'exchange-requirement': () => (
    <Frame url="exchange.labelnest.in/requirements" nav={['Marketplace', 'My purchases', 'Sell data', 'Credits', 'Orders']} on={0} title="Post a requirement" sub="Sellers apply">
      <div className="pm-card"><b>Need: fund manager contacts for Southeast Asia</b><div className="pm-k">Budget set by you. Sellers apply with a sample.</div></div>
      <List rows={[['Seller A', 'Verified, 48,000 rows', 'Sample sent', 'g'], ['Seller B', 'Verified, 22,500 rows', 'Applied', '']]} />
    </Frame>
  ),
  'command-memo': () => (
    <Frame url="command.labelnest.in/memo" nav={COMMAND} on={3} title="Investment memo" sub="Draft by AI">
      <div className="pm-row pm-12"><div className="pm-card"><h4>Sample Health: seed round</h4><div className="pm-bars"><div><span>Market</span><em><i style={{ width: '100%' }} /></em><span /></div><div><span>Team</span><em><i style={{ width: '85%' }} /></em><span /></div><div><span>Risks</span><em><i style={{ width: '70%' }} /></em><span /></div></div></div><div className="pm-card"><span className="pm-pill a">Awaiting approval</span><p style={{ margin: '.8em 0' }}>A person reviews it and approves. The approval is logged.</p><span className="pm-pill g">Approve</span></div></div>
    </Frame>
  ),
  'command-lp': () => (
    <Frame url="command.labelnest.in/capital-accounts" nav={COMMAND} on={5} title="Capital accounts" sub="Same numbers as the portfolio">
      <div className="pm-card"><table className="pm-t"><thead><tr><th>LP</th><th>Committed</th><th>Called</th><th>NAV share</th></tr></thead><tbody>{[['Sample LP 1', '$5.0M', '$3.0M', '$3.9M'], ['Sample LP 2', '$2.5M', '$1.5M', '$1.9M'], ['Sample LP 3', '$1.0M', '$0.6M', '$0.8M']].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody></table></div>
    </Frame>
  ),
  'command-sourcing': () => (
    <Frame url="command.labelnest.in/sourcing" nav={COMMAND} on={1} title="Source from Atlas" sub="Without leaving the fund">
      <div className="pm-search"><span>Seed-stage climate companies in India</span><b>Search</b></div>
      <List rows={[['Sample Climate A', 'Seed, 2 co-investors', 'Add to pipeline', 'g'], ['Sample Climate B', 'Pre-seed, 1 co-investor', 'Add to pipeline', 'g']]} />
    </Frame>
  ),
  'ascent-extract': () => (
    <Frame url="ascent.labelnest.in/documents" nav={ASCENT} on={0} title="Terms read for you" sub="Shareholders agreement">
      <List rows={[['Liquidation preference', '1x non-participating', 'Confirm', 'a'], ['Board seats', '3 of 5', 'Confirmed', 'g'], ['Anti-dilution', 'Broad-based weighted average', 'Confirm', 'a']]} />
    </Frame>
  ),
  'ascent-questions': () => (
    <Frame url="ascent.labelnest.in/questions" nav={ASCENT} on={1} title="Investor questions" sub="Drafted for your company">
      <div className="pm-row pm-12"><List rows={[['What is your net revenue retention?', 'Editable draft'], ['How is the cap table split after the round?', 'Editable draft'], ['What are the two biggest risks?', 'Editable draft']]} /><div className="pm-card"><h4>Ask Kai</h4><div className="pm-note">Works on your own room. Which section is weakest?</div></div></div>
    </Frame>
  ),
  'ascent-capital': () => (
    <Frame url="ascent.labelnest.in/funding" nav={ASCENT} on={3} title="Funding opportunities" sub="Matched to your profile">
      <List rows={[['Sample Innovation Grant', 'Closes in 9 days', 'Alert set', 'a'], ['Sample Startup Challenge', 'Closes in 3 weeks', 'Matched', 'g']]} />
      <div className="pm-note"><b>Capital Portal</b><div className="pm-k">Opt in to be found. Contact details stay hidden until you accept.</div></div>
    </Frame>
  ),
  'orbit-rubric': () => (
    <Frame url="orbit.labelnest.in/evaluation" nav={ORBIT} on={1} title="Evaluation" sub="Your rubric, your rounds">
      <div className="pm-card"><table className="pm-t"><thead><tr><th>Startup</th><th>Team</th><th>Market</th><th>Traction</th><th>Round 1</th></tr></thead><tbody>{[['Sample A', 8, 7, 6, 21], ['Sample B', 7, 9, 8, 24], ['Sample C', 6, 6, 5, 17]].map((r) => <tr key={r[0] as string}>{r.map((c, i) => <td key={i}>{i === 4 ? <span className="pm-pill g">{c}</span> : c}</td>)}</tr>)}</tbody></table></div>
    </Frame>
  ),
  'orbit-funds': () => (
    <Frame url="orbit.labelnest.in/capital-connect" nav={ORBIT} on={4} title="Capital connect" sub="Rooms to introductions">
      <Steps s={['Rooms read', 'Ready rooms', 'Founder agrees', 'Introduced through Connect']} on={2} />
      <List rows={[['Sample Health', 'Ready, 94% complete', 'Founder agreed', 'g'], ['Sample Pay', 'Ready, 81% complete', 'Awaiting founder', 'a']]} />
    </Frame>
  ),
  'orbit-grants': () => (
    <Frame url="orbit.labelnest.in/reports" nav={ORBIT} on={6} title="Grant reports" sub="From data you already hold">
      <div className="pm-row pm-c4">{['NIDHI-SSS', 'DST-TBI', 'BIRAC', 'RKVY-RAFTAR'].map((t) => <div className="pm-tile" key={t}><span className="pm-ico b" /><b>{t}</b><span className="pm-k">Generate</span></div>)}</div>
    </Frame>
  ),
  'connect-partners': () => (
    <Frame url="connect.labelnest.in/partners" nav={CONNECT} on={1} title="Legal and audit partners" sub="Verified, public profiles">
      <div className="pm-row pm-c3">{[['Sample Law Chambers', 'Fundraise and shareholder agreements'], ['Sample Audit LLP', 'Statutory and startup audits'], ['Sample Counsel', 'ESOP and compliance']].map((r) => <div className="pm-card" key={r[0]}><div className="pm-li" style={{ border: 0, padding: 0 }}><span className="pm-av" /><p><b>{r[0]}</b><small>{r[1]}</small></p></div><div style={{ marginTop: '.8em' }}><span className="pm-pill g">Verified</span></div></div>)}</div>
    </Frame>
  ),
  'connect-room': () => (
    <Frame url="ascent.labelnest.in/room/ask" nav={ASCENT} on={0} title="Request a mentor" sub="From inside the room">
      <div className="pm-card"><b>Negotiating a seed term sheet</b><div className="pm-k">The request carries your stage, sector and readiness. No retyping.</div><div style={{ marginTop: '.8em' }}><span className="pm-pill g">Send request</span></div></div>
      <List rows={[['Mentor A', 'Seed term sheets', 'Suggested', 'g'], ['Audit partner', 'Statutory audit', 'Request', '']]} />
    </Frame>
  ),
  'connect-consent': () => (
    <Frame url="connect.labelnest.in/introductions" nav={CONNECT} on={3} title="Introduction" sub="Contact hidden until you agree">
      <div className="pm-card"><b>Sample Fund asked to be introduced</b><div className="pm-v" style={{ fontSize: '1.4em' }}>••••••@•••••.com</div><div className="pm-k">Shown only after you accept.</div><div style={{ marginTop: '.8em' }}><span className="pm-pill g">Accept</span> <span className="pm-pill r">Decline</span></div></div>
    </Frame>
  ),
}
Object.assign(SCENES, MORE, MORE2)

export const MOCK_IDS = Object.keys(SCENES)

export default function PortalMock({ id, alt }: { id: string; alt: string }) {
  const scene = SCENES[id]
  if (!scene) return null
  return (
    <figure role="img" aria-label={alt} className="pm-fig" style={{ margin: 0 }}>
      <style>{CSS}</style>
      {scene()}
    </figure>
  )
}
