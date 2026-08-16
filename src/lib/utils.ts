// Admin-entered external URLs (LinkedIn, website, etc.) are sometimes saved without
// a scheme, e.g. "www.linkedin.com/in/handle" — rendered as <a href> directly, that
// resolves as a same-origin relative path instead of an external link (confirmed live
// 2026-08-16 via GSC: labelnest.in/www.linkedin.com/in/jeevanprakashkv showing as a
// 404 in Coverage). Prepend https:// whenever no scheme is already present.
export function normalizeExternalUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

// Timestamp display — always IST (Asia/Kolkata), regardless of viewer/server timezone
export function formatDateTimeIST(value: string | Date): string {
  return new Date(value).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric', month: 'short', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

export function formatDateIST(value: string | Date): string {
  return new Date(value).toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric', month: 'short', year: '2-digit',
  })
}

// Markdown → plain HTML (server-side, no heavy dep needed)
export function mdToHtml(text: string): string {
  if (!text) return ''
  // Strip raw HTML tags from DB content
  let t = text.replace(/<[^>]+>/g, ' ')
  // Strip markdown links
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  // Page breaks
  t = t.replace(/\/page_break/g, '<hr>')

  const lines = t.split('\n')
  const html: string[] = []
  let inUl = false
  let inOl = false

  const fmt = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (line.startsWith('### ')) {
      if (inUl) { html.push('</ul>'); inUl = false }
      if (inOl) { html.push('</ol>'); inOl = false }
      html.push(`<h3>${fmt(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      if (inUl) { html.push('</ul>'); inUl = false }
      if (inOl) { html.push('</ol>'); inOl = false }
      html.push(`<h2>${fmt(line.slice(3))}</h2>`)
    } else if (/^\d+\./.test(line)) {
      if (inUl) { html.push('</ul>'); inUl = false }
      if (!inOl) { html.push('<ol>'); inOl = true }
      html.push(`<li>${fmt(line.replace(/^\d+\.\s*/, ''))}</li>`)
    } else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      if (inOl) { html.push('</ol>'); inOl = false }
      if (!inUl) { html.push('<ul>'); inUl = true }
      html.push(`<li>${fmt(line.slice(2))}</li>`)
    } else if (!line.trim()) {
      if (inUl) { html.push('</ul>'); inUl = false }
      if (inOl) { html.push('</ol>'); inOl = false }
    } else if (line === '---') {
      if (inUl) { html.push('</ul>'); inUl = false }
      if (inOl) { html.push('</ol>'); inOl = false }
      html.push('<hr>')
    } else {
      if (inUl) { html.push('</ul>'); inUl = false }
      if (inOl) { html.push('</ol>'); inOl = false }
      const content = fmt(line)
      if (content.trim()) html.push(`<p>${content}</p>`)
    }
  }
  if (inUl) html.push('</ul>')
  if (inOl) html.push('</ol>')
  return html.join('\n')
}

// Scope → accent color
export function scopeColor(scope: string): string {
  const s = scope.toLowerCase()
  if (s.includes('intelligence') || s.includes('private market')) return '#2563EB'
  if (s.includes('manifesto') || s.includes('sovereignty')) return '#F97316'
  if (s.includes('product') || s.includes('hr-tech')) return '#E91E8C'
  if (s.includes('foundry')) return '#7C3AED'
  if (s.includes('newsletter')) return '#6B7280'
  if (s.includes('market intelligence')) return '#2563EB'
  return '#8985A6'
}

// Scope → first segment display label
export function scopeLabel(scope: string): string {
  return scope.split('/')[0].split('•')[0].replace(/"/g, '').trim().slice(0, 40)
}

// Author initials → gradient
export function authorGradient(name: string): string {
  const map: Record<string, string> = {
    'Ankit Suman': 'linear-gradient(135deg,#E91E8C,#7C3AED)',
    'Shubham Singh': 'linear-gradient(135deg,#2563EB,#7C3AED)',
    'Sumedha Pandey': 'linear-gradient(135deg,#10B981,#2563EB)',
    'LabelNest': 'linear-gradient(135deg,#4C4868,#8985A6)',
  }
  return map[name] ?? 'linear-gradient(135deg,#4C4868,#8985A6)'
}

export function slugToEmoji(slug: string): string {
  const map: Record<string, string> = {
    'forensic': '🔬', 'inr': '🇮🇳', 'datanest': '🗄️',
    'nestlens-exchange-ai': '⚡', 'democratizing': '🌐',
    '1-4': '🌏', 'built-to-last': '🏗️', 'weekly': '📬',
    'nestlens-exchange-india': '🏗️', 'death': '🔓',
    'nesthr-talent': '👥', 'introducing': '📊',
    'new-drop': '🔥', 'linkedin': '🎯',
  }
  for (const [k, v] of Object.entries(map)) {
    if (slug.includes(k)) return v
  }
  return '📄'
}

// Substitute legal document placeholders
export function substituteLegalPlaceholders(text: string): string {
  const subs: Record<string, string> = {
    '{{company_name}}': 'LabelNest India Private Limited',
    '{{address}}': 'No. 33, 4th Floor, 1st Main, CBI Main Rd, HMT Layout, Ganganagar, Bengaluru, Karnataka, India 560032',
    '{{support_email}}': 'contact@labelnest.in',
    '{{privacy_email}}': 'privacy@labelnest.in',
    '{{ops_email}}': 'ops@labelnest.in',
    '{{nestlens_email}}': 'nestlens@labelnest.in',
    '{{hr_email}}': 'hr@labelnest.in',
    '{{nesthr_email}}': 'nesthr@labelnest.in',
    '{{legal_email}}': 'contact@labelnest.in',
    '{{website_url}}': 'https://labelnest.in',
    '{{governing_law}}': 'Laws of Karnataka, India',
    '{{jurisdiction}}': 'Courts of Bengaluru, Karnataka, India',
    '{{products_covered}}': 'NestLens, NestHR, Research Services, Professional Services, APIs, Company Websites, Customer Support Channels',
    '{{internal_products}}': 'DataNest, NestIntel, NestResolve',
    '{{liability_cap}}': '[As specified in your subscription agreement]',
    '{{refund_timeline}}': '14 business days',
    '{{retention_timeline}}': '90 days after account closure',
    '{{sla_uptime}}': '99.5%',
    '{{sla_response_time}}': '24 hours',
  }
  let result = text
  for (const [k, v] of Object.entries(subs)) {
    result = result.replaceAll(k, v)
  }
  // Catch any remaining {{...}}
  return result.replace(/\{\{[^}]+\}\}/g, '[See contract]')
}
