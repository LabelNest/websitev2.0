// Generates the animated hub-and-spoke connection diagram used on every
// /who-we-serve/[persona] page -- same visual language as Command's own
// CONNECTION_DIAGRAM_SVG (src/app/nestlens/command/page.tsx), generalized
// to take 2-4 satellite nodes instead of being hand-written per page.
// Center = the persona's primary product. Satellites = the other real
// products their workflow actually touches, each with a short real
// description of what flows across that connection (grounded in the
// receiving/sending page's own copy -- never invented).

export interface DiagramNode {
  label: string
  sublabel: string
  color: string
}

export interface DiagramCenter {
  icon: string
  label: string
  color: string
}

const NODE_Y_BY_COUNT: Record<number, number[]> = {
  2: [85, 255],
  3: [61, 146, 231],
  4: [49, 123, 197, 271],
}

// Sublabels are free-form copy (see icpPages.ts) and can run longer than the
// 90px node box fits on one line -- SVG <text> never wraps on its own, so a
// label like "Fund diligence buyers" would render past the box edge. Greedy
// word-wrap into at most 2 lines, sized for an 11px label in a ~74px box.
function wrapLabel(text: string, maxChars = 14): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const w of words) {
    const candidate = current ? `${current} ${w}` : w
    if (candidate.length > maxChars && current) {
      lines.push(current)
      current = w
    } else {
      current = candidate
    }
  }
  if (current) lines.push(current)
  if (lines.length > 2) return [lines[0], lines.slice(1).join(' ')]
  return lines
}

export function renderIcpDiagram(center: DiagramCenter, nodes: DiagramNode[], footer: string): string {
  const ys = NODE_Y_BY_COUNT[nodes.length] ?? NODE_Y_BY_COUNT[3]
  const cx = 340, cy = 175
  const boxX = 22, boxW = 90, boxH = 58
  const lines = nodes.map((n, i) => {
    const y = ys[i] + boxH / 2
    const x2 = cx - 46
    const dur = (1.4 + i * 0.3).toFixed(1)
    const subLines = wrapLabel(n.sublabel)
    const subText = subLines.length > 1
      ? `<text x="${boxX + boxW / 2}" y="${ys[i] + 31}" class="ids" text-anchor="middle" fill="var(--text2)">${subLines[0]}</text>
<text x="${boxX + boxW / 2}" y="${ys[i] + 44}" class="ids" text-anchor="middle" fill="var(--text2)">${subLines[1]}</text>`
      : `<text x="${boxX + boxW / 2}" y="${ys[i] + 37}" class="ids" text-anchor="middle" fill="var(--text2)">${subLines[0]}</text>`
    return `
<line x1="${boxX + boxW}" y1="${y}" x2="${x2}" y2="${cy}" stroke="${n.color}" stroke-width="1.5" fill="none" class="idf idf${i}" marker-end="url(#icpArr)"/>
<circle r="3.5" fill="${n.color}"><animateMotion dur="${dur}s" repeatCount="indefinite"><mpath href="#icp${i}"/></animateMotion></circle>
<path id="icp${i}" d="M${boxX + boxW},${y} L${x2},${cy}" fill="none" stroke="none"/>
<rect x="${boxX}" y="${ys[i]}" width="${boxW}" height="${boxH}" rx="7" fill="var(--surface)" stroke="${n.color}" stroke-width="1"/>
<text x="${boxX + boxW / 2}" y="${ys[i] + 18}" class="idt" text-anchor="middle" fill="var(--text)">${n.label}</text>
${subText}`
  }).join('')

  const dashRules = nodes.map((_, i) => `.idf${i} { stroke-dasharray:6 8; animation:idDash ${(1.4 + i * 0.4).toFixed(1)}s linear infinite; }`).join('\n    ')

  return `<svg width="100%" viewBox="0 0 680 360" role="img">
<title>${center.label} connections</title>
<desc>${nodes.map(n => n.label).join(', ')} flowing into ${center.label}</desc>
<defs>
  <marker id="icpArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
  <style>
    .idt { font: 600 13px/1 'Bricolage Grotesque',sans-serif; }
    .ids { font: 400 11px/1 system-ui,sans-serif; }
    .idring { fill:none; stroke:${center.color}; stroke-width:1; opacity:0.18; }
    @keyframes idSpinA { to { transform: rotate(360deg); } }
    @keyframes idSpinB { to { transform: rotate(-360deg); } }
    @keyframes idDash  { to { stroke-dashoffset: -24; } }
    @keyframes idGlow  { 0%,100%{opacity:.25} 50%{opacity:.6} }
    .idr1 { transform-origin:${cx}px ${cy}px; animation:idSpinA 20s linear infinite; }
    .idr2 { transform-origin:${cx}px ${cy}px; animation:idSpinB 32s linear infinite; }
    ${dashRules}
    .idgw { animation:idGlow 3s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) { .idr1,.idr2,${nodes.map((_, i) => `.idf${i}`).join(',')},.idgw { animation: none; } }
  </style>
</defs>
<circle class="idring idr1" cx="${cx}" cy="${cy}" r="120"/>
<circle class="idring idr2" cx="${cx}" cy="${cy}" r="95" stroke-dasharray="3 10"/>
${lines}
<circle cx="${cx}" cy="${cy}" r="50" fill="var(--surface)" stroke="${center.color}" stroke-width="1.5" class="idgw"/>
<circle cx="${cx}" cy="${cy}" r="38" fill="${center.color}1A" stroke="${center.color}" stroke-width="0.5"/>
<text x="${cx}" y="${cy - 5}" class="idt" text-anchor="middle" fill="${center.color}" font-size="17">${center.icon}</text>
<text x="${cx}" y="${cy + 12}" class="idt" text-anchor="middle" fill="${center.color}">${center.label}</text>
<text x="${cx}" y="332" class="ids" text-anchor="middle" fill="var(--text3)">${footer}</text>
</svg>`
}
