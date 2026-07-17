// The Journey — aerial road-map timeline for the About page.
// Self-contained dark panel. All CSS is scoped under `.jrny` so the generic
// class names (.card/.title/.row/.pin/…) can't collide with global styles;
// keyframes are renamed (jrnyPulse/jrnyPulse2) for the same reason. Markup is
// kept verbatim from the approved design via dangerouslySetInnerHTML (static,
// author-controlled content — no user input).

const CSS = `
.jrny{max-width:1300px;margin:0 auto;font-family:'Inter',sans-serif;color:#EBE8F6;-webkit-font-smoothing:antialiased}
.jrny *,.jrny *::before,.jrny *::after{box-sizing:border-box;margin:0;padding:0}

.jrny .tag{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#4C4868;margin-bottom:8px;text-align:center}
.jrny .sh{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:36px;letter-spacing:-.03em;color:#EBE8F6;margin-bottom:8px;text-align:center;line-height:1.1}
.jrny .intro{font-size:14.5px;color:#8985A6;text-align:center;margin-bottom:56px;max-width:540px;margin-left:auto;margin-right:auto;line-height:1.65}

.jrny .aerial{position:relative;width:100%;aspect-ratio:1300/820;background:radial-gradient(ellipse at 30% 30%,rgba(37,99,235,.05),transparent 55%),radial-gradient(ellipse at 75% 75%,rgba(233,30,140,.04),transparent 55%);border-radius:24px;overflow:visible;margin-bottom:32px}
.jrny .road-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}

.jrny .pin{position:absolute;transform:translate(-50%,-50%);z-index:5;transition:transform .18s;cursor:default}
.jrny .pin:hover{transform:translate(-50%,-50%) scale(1.04)}
.jrny .pin:hover .card{border-color:rgba(255,255,255,.18);box-shadow:0 8px 24px rgba(0,0,0,.4)}

.jrny .marker{width:38px;height:38px;border-radius:50% 50% 50% 0;background:var(--c);transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.5),0 0 0 4px #09090F;margin:0 auto;position:relative}
.jrny .marker::before{content:'';position:absolute;inset:-5px;border-radius:50% 50% 50% 0;border:2px solid var(--c);opacity:.28}
.jrny .marker-icon{transform:rotate(45deg);font-size:17px;line-height:1}

.jrny .pin.current .marker{box-shadow:0 4px 14px rgba(0,0,0,.5),0 0 0 4px #09090F,0 0 28px #E91E8C,0 0 56px rgba(233,30,140,.5)}
.jrny .pin.current .marker::before{border-color:#E91E8C;animation:jrnyPulse 2s ease-in-out infinite}
@keyframes jrnyPulse{0%,100%{opacity:.5;transform:scale(1) rotate(0)}50%{opacity:0;transform:scale(1.55) rotate(0)}}

.jrny .card{position:absolute;background:#111119;border:1px solid rgba(255,255,255,.09);border-top:2.5px solid var(--c);border-radius:11px;padding:11px 14px;width:200px;text-align:left;transition:border-color .18s,box-shadow .18s;left:50%;transform:translateX(-50%)}
.jrny .pin.card-below .card{top:calc(100% + 14px)}
.jrny .pin.card-above .card{bottom:calc(100% + 14px)}
.jrny .pin.card-left .card{left:auto;right:calc(100% + 14px);top:50%;transform:translateY(-50%)}
.jrny .pin.card-right .card{left:calc(100% + 14px);top:50%;transform:translateY(-50%)}

.jrny .date{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--c);font-weight:600;margin-bottom:4px}
.jrny .title{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:13.5px;color:#EBE8F6;letter-spacing:-.015em;line-height:1.25;margin-bottom:4px}
.jrny .desc{font-size:11.5px;color:#8985A6;line-height:1.5}

.jrny .current-badge{display:inline-flex;align-items:center;gap:4px;font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:#E91E8C;background:rgba(233,30,140,.12);padding:2px 6px;border-radius:100px;margin-left:5px;vertical-align:middle}
.jrny .current-badge span{width:4px;height:4px;border-radius:50%;background:#E91E8C;animation:jrnyPulse2 2s ease-in-out infinite}
@keyframes jrnyPulse2{0%,100%{opacity:1}50%{opacity:.3}}

.jrny .pin.future .marker{background:#2A2438;box-shadow:0 4px 14px rgba(0,0,0,.5),0 0 0 4px #09090F;border:1px dashed var(--c)}
.jrny .pin.future .marker::before{display:none}
.jrny .pin.future .marker-icon{opacity:.6;filter:grayscale(1)}
.jrny .pin.future .card{background:rgba(17,17,25,.6);border-style:dashed;opacity:.85}

.jrny .endpoint{position:absolute;transform:translate(-50%,-50%);text-align:center;z-index:4;display:flex;flex-direction:column;align-items:center;gap:8px}
.jrny .endpoint-dot{width:22px;height:22px;border-radius:50%;background:#4C4868;border:3px solid #09090F;box-shadow:0 0 0 4px #4C4868}
.jrny .endpoint-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#4C4868;white-space:nowrap;font-weight:600}
.jrny .endpoint.finish .endpoint-dot{background:#7C3AED;box-shadow:0 0 0 4px rgba(124,58,237,.35)}
.jrny .endpoint.finish .endpoint-label{color:#7C3AED}

.jrny .switchback{display:none}

@media (max-width:768px){
  .jrny .sh{font-size:26px}
  .jrny .aerial{display:none}
  .jrny .switchback{display:block}

  .jrny .row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:60px;position:relative}
  .jrny .row:last-child{margin-bottom:0}
  .jrny .row::before{content:'';position:absolute;left:50%;top:100%;width:60%;height:60px;border:3px solid rgba(233,30,140,.4);border-top:none;border-radius:0 0 100px 100px;transform:translate(-50%,-30px);z-index:0}
  .jrny .row:last-child::before{display:none}

  .jrny .stop{background:#111119;border:1px solid rgba(255,255,255,.07);border-top:2.5px solid var(--c);border-radius:11px;padding:12px 13px;position:relative;z-index:1;min-height:112px}
  .jrny .stop-head{display:flex;align-items:center;gap:6px;margin-bottom:6px}
  .jrny .stop-icon{width:22px;height:22px;border-radius:6px;background:var(--c);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0}
  .jrny .stop .date{margin-bottom:0}
  .jrny .stop .title{font-size:12.5px;line-height:1.25;margin-bottom:4px}
  .jrny .stop .desc{font-size:11px;line-height:1.4}
  .jrny .stop.current{background:linear-gradient(180deg,rgba(233,30,140,.08) 0%,#111119 60%);box-shadow:0 0 20px rgba(233,30,140,.18)}
  .jrny .stop.future{border-top-style:dashed;background:rgba(17,17,25,.5)}

  .jrny .mobile-endpoint{text-align:center;margin:20px 0}
  .jrny .mobile-endpoint .pill{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;background:rgba(37,99,235,.1);color:#2563EB;border:1px solid rgba(37,99,235,.2)}
  .jrny .mobile-endpoint.end .pill{background:rgba(124,58,237,.1);color:#7C3AED;border-color:rgba(124,58,237,.2)}
}
`;

const MARKUP = `
  <div class="tag">The Journey</div>
  <div class="sh">Fifteen months. Six products. One road.</div>
  <div class="intro">From planning inside Preqin to shipping the full LabelNest ecosystem. Every stop below is a decision, a launch, or a pivot that shaped where we are today.</div>

  <div class="aerial">

    <svg class="road-svg" viewBox="0 0 1300 820" preserveAspectRatio="xMidYMid meet">
      <path id="mainRoad" d="M 80 130 C 220 100, 340 150, 460 130 C 570 115, 640 200, 710 240 C 790 285, 860 240, 920 280 C 1000 335, 1040 400, 960 470 C 870 555, 720 540, 630 570 C 550 595, 490 640, 540 700 C 620 780, 810 750, 920 710 C 1050 665, 1160 685, 1230 700" stroke="#3A3350" stroke-width="42" stroke-linecap="round" fill="none"/>
      <path d="M 80 130 C 220 100, 340 150, 460 130 C 570 115, 640 200, 710 240 C 790 285, 860 240, 920 280 C 1000 335, 1040 400, 960 470 C 870 555, 720 540, 630 570 C 550 595, 490 640, 540 700 C 620 780, 810 750, 920 710 C 1050 665, 1160 685, 1230 700" stroke="#1B1826" stroke-width="34" stroke-linecap="round" fill="none"/>
      <path d="M 80 130 C 220 100, 340 150, 460 130 C 570 115, 640 200, 710 240 C 790 285, 860 240, 920 280 C 1000 335, 1040 400, 960 470 C 870 555, 720 540, 630 570 C 550 595, 490 640, 540 700 C 620 780, 810 750, 900 725" stroke="#F8D030" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="16 14" fill="none" opacity="0.65"/>
      <path d="M 900 725 C 1020 685, 1160 685, 1230 700" stroke="#4C4868" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="6 8" fill="none" opacity="0.55"/>
    </svg>

    <div class="endpoint" style="left:3%;top:14%">
      <div class="endpoint-dot"></div>
      <div class="endpoint-label">Start · Apr 2025</div>
    </div>

    <div class="pin card-above" style="--c:#2563EB;left:14%;top:14%">
      <div class="marker"><span class="marker-icon">📐</span></div>
      <div class="card"><div class="date">Apr 2025</div><div class="title">Planning begins</div><div class="desc">While still at Preqin (BlackRock), Ankit begins planning LabelNest's product architecture and market approach.</div></div>
    </div>

    <div class="pin card-below" style="--c:#E91E8C;left:27%;top:15%">
      <div class="marker"><span class="marker-icon">🚀</span></div>
      <div class="card"><div class="date">Nov 2025</div><div class="title">Left BlackRock. LabelNest full-time.</div><div class="desc">Ankit leaves his VP role at BlackRock (post Preqin acquisition) to build LabelNest full-time. The public build begins.</div></div>
    </div>

    <div class="pin card-above" style="--c:#E91E8C;left:39%;top:17%">
      <div class="marker"><span class="marker-icon">👥</span></div>
      <div class="card"><div class="date">Dec 2025</div><div class="title">NestHR live</div><div class="desc">People and operations OS for startups and colleges. PlacementOS included from day one.</div></div>
    </div>

    <div class="pin card-below" style="--c:#E91E8C;left:53%;top:19%">
      <div class="marker"><span class="marker-icon">🏷️</span></div>
      <div class="card"><div class="date">Jan 2026</div><div class="title">AnnoNest launches</div><div class="desc">First annotation platform goes live.</div></div>
    </div>

    <div class="pin card-below" style="--c:#E91E8C;left:63%;top:31%">
      <div class="marker"><span class="marker-icon">🔀</span></div>
      <div class="card"><div class="date">Feb 2026</div><div class="title">AnnoNest pivots — internal split</div><div class="desc">Multi-tenant AnnoNest paused and broken into purpose-built internal applications. Right call, not the easy one.</div></div>
    </div>

    <div class="pin card-above" style="--c:#10B981;left:72%;top:33%">
      <div class="marker"><span class="marker-icon">🎓</span></div>
      <div class="card"><div class="date">Mar 2026</div><div class="title">First cohort + internal apps live</div><div class="desc">Fellowship launches. NestLabs and NestTech Cohort 1. All internal infrastructure fully operational.</div></div>
    </div>

    <div class="pin card-right" style="--c:#E91E8C;left:74%;top:52%">
      <div class="marker"><span class="marker-icon">🔭</span></div>
      <div class="card"><div class="date">Apr 2026</div><div class="title">NestLens live — Exchange with 10+ sellers</div><div class="desc">Private markets intelligence platform live. Exchange marketplace open with verified sellers from day one.</div></div>
    </div>

    <div class="pin card-left" style="--c:#E91E8C;left:53%;top:67%">
      <div class="marker"><span class="marker-icon">🏦</span></div>
      <div class="card"><div class="date">May 2026</div><div class="title">Capital Readiness initiated</div><div class="desc">Data room, investor tier scoring, and LP-GP matching begin development inside NestLens.</div></div>
    </div>

    <div class="pin card-below" style="--c:#10B981;left:42%;top:81%">
      <div class="marker"><span class="marker-icon">✨</span></div>
      <div class="card"><div class="date">Jun 2026</div><div class="title">NestLens completely live</div><div class="desc">All three modules fully live. Team at 13. 39 alumni. Website v2 deployed.</div></div>
    </div>

    <div class="pin current card-above" style="--c:#E91E8C;left:63%;top:89%">
      <div class="marker"><span class="marker-icon">📍</span></div>
      <div class="card"><div class="date">Jul 2026 <span class="current-badge"><span></span>You are here</span></div><div class="title">NestResolve multi-tenancy planned</div><div class="desc">QA and governance platform architecture scoped. Early access target: October 2026.</div></div>
    </div>

    <div class="pin future card-below" style="--c:#7C3AED;left:79%;top:83%">
      <div class="marker"><span class="marker-icon">🔒</span></div>
      <div class="card"><div class="date">Aug 2026</div><div class="title">Something exciting coming</div><div class="desc">Details soon. Get early signal →</div></div>
    </div>

    <div class="pin future card-above" style="--c:#F97316;left:92%;top:85%">
      <div class="marker"><span class="marker-icon">🌱</span></div>
      <div class="card"><div class="date">Sep 2026</div><div class="title">AnnoNest reborn with a new brand</div><div class="desc">The annotation platform returns — rebuilt, rebranded, and ready for the market.</div></div>
    </div>

    <div class="endpoint finish" style="left:97%;top:85%">
      <div class="endpoint-dot"></div>
      <div class="endpoint-label">Road ahead →</div>
    </div>

  </div>

  <div class="switchback">

    <div class="mobile-endpoint"><span class="pill">🏁 Start · Apr 2025</span></div>

    <div class="row">
      <div class="stop" style="--c:#2563EB"><div class="stop-head"><div class="stop-icon">📐</div><div class="date">Apr 2025</div></div><div class="title">Planning begins</div><div class="desc">Still at Preqin. Ankit maps architecture.</div></div>
      <div class="stop" style="--c:#E91E8C"><div class="stop-head"><div class="stop-icon">🚀</div><div class="date">Nov 2025</div></div><div class="title">LabelNest full-time</div><div class="desc">Leaves BlackRock. Public build begins.</div></div>
    </div>

    <div class="row">
      <div class="stop" style="--c:#E91E8C"><div class="stop-head"><div class="stop-icon">🏷️</div><div class="date">Jan 2026</div></div><div class="title">AnnoNest launches</div><div class="desc">First annotation platform goes live.</div></div>
      <div class="stop" style="--c:#E91E8C"><div class="stop-head"><div class="stop-icon">👥</div><div class="date">Dec 2025</div></div><div class="title">NestHR live</div><div class="desc">People and ops OS with PlacementOS.</div></div>
    </div>

    <div class="row">
      <div class="stop" style="--c:#E91E8C"><div class="stop-head"><div class="stop-icon">🔀</div><div class="date">Feb 2026</div></div><div class="title">AnnoNest pivots</div><div class="desc">Broken into internal apps. Right call.</div></div>
      <div class="stop" style="--c:#10B981"><div class="stop-head"><div class="stop-icon">🎓</div><div class="date">Mar 2026</div></div><div class="title">First cohort + internal apps</div><div class="desc">Fellowship launches. Infra fully live.</div></div>
    </div>

    <div class="row">
      <div class="stop" style="--c:#E91E8C"><div class="stop-head"><div class="stop-icon">🔭</div><div class="date">Apr 2026</div></div><div class="title">NestLens live</div><div class="desc">Intelligence + Exchange with 10+ sellers.</div></div>
      <div class="stop" style="--c:#E91E8C"><div class="stop-head"><div class="stop-icon">🏦</div><div class="date">May 2026</div></div><div class="title">Capital Readiness</div><div class="desc">Data room + LP-GP matching begin.</div></div>
    </div>

    <div class="row">
      <div class="stop current" style="--c:#E91E8C"><div class="stop-head"><div class="stop-icon">📍</div><div class="date">Jul 2026 · Here</div></div><div class="title">NestResolve planned</div><div class="desc">QA and governance scoped. Oct 2026.</div></div>
      <div class="stop" style="--c:#10B981"><div class="stop-head"><div class="stop-icon">✨</div><div class="date">Jun 2026</div></div><div class="title">NestLens fully live</div><div class="desc">All 3 modules live. Team 13.</div></div>
    </div>

    <div class="row">
      <div class="stop future" style="--c:#7C3AED"><div class="stop-head"><div class="stop-icon">🔒</div><div class="date">Aug 2026</div></div><div class="title">Something exciting</div><div class="desc">Details soon.</div></div>
      <div class="stop future" style="--c:#F97316"><div class="stop-head"><div class="stop-icon">🌱</div><div class="date">Sep 2026</div></div><div class="title">AnnoNest reborn</div><div class="desc">Rebuilt, rebranded, market-ready.</div></div>
    </div>

    <div class="mobile-endpoint end"><span class="pill">The road ahead →</span></div>

  </div>
`;

export default function JourneyMap() {
  return (
    <section style={{ background: '#09090F', padding: '80px 40px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="jrny" dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </section>
  );
}
