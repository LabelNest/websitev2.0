import { NextRequest, NextResponse } from 'next/server'

// Kai on the public website is a marketing/FAQ concierge only -- no DB
// import, no private data, nothing from NestLens/NestHR/DataNest customer
// accounts. Everything it can say is in the static brief below, sourced
// from the actual marketing pages (about/services/nestlens/nesthr/ecosystem)
// so it can't answer with anything that isn't already public on this site.
const LABELNEST_BRIEF = `
COMPANY: LabelNest India Private Limited. Founded in Bengaluru, 2025. A private market intelligence and capital infrastructure company for emerging managers globally.

FOUNDER: Ankit Suman (Founder & Director). Left BlackRock in November 2025 to build LabelNest full-time. Previously spent years at Preqin, BlackRock, Microsoft, and CIOReview -- roughly 1,000+ hours of domain knowledge absorbed before writing the first line of code.

TEAM: 13 current team members, 39 alumni, 15 Nestling fellows (the fellowship/careers program). Hiring is based on potential, not where someone studied.

HQ: Bengaluru, Karnataka, India.
CONTACT: contact@labelnest.in (general), ops@labelnest.in (managed services / project inquiries). Contact form at /contact.

VISION: To become the system of record for private market intelligence and capital infrastructure for emerging managers globally. Every fund manager, founder, and operator -- regardless of geography -- should have access to institutional-grade data at a price that does not exclude them. Data should be owned, structured, and explainable -- not rented forever from opaque global platforms that treat emerging markets as an afterthought.

FIVE FOUNDING PRINCIPLES:
1. Data That Teaches Machines Right -- data structured to be explainable to an auditor, regulator, or LP, not just consumed by a model.
2. Owned, Not Rented -- infrastructure organisations control; no black-box vendors, no perpetual dependency.
3. Emerging First -- emerging managers, founders, and markets are the primary focus, not an afterthought.
4. Human Accountability at Every Layer -- every automated workflow has a human review layer; a person is responsible when something is wrong.
5. Built to Last, Not to Flip -- built for long-term institutional trust, not for an exit.

PRODUCTS -- one company, multiple products:

1. NestLens (nestlens.labelnest.in) -- LIVE. The private markets OS. Six modules, each subscribed independently:
   - Atlas: structured intelligence on 40,000+ private market entities -- companies, funds, deals, people, contacts. Human-verified, credit-based access. Observatory (published research and insights on real firms, individual reports unlocked separately) is part of Atlas.
   - Exchange: buy and sell structured datasets, AI training data, research reports, and alternative data. KYC-verified sellers, escrow-protected transactions, quality scores.
   - Orbit: the institutional operating system for high-stakes programmes -- application intake, screening, evaluation rounds, cohort onboarding, built for real application volume.
   - Ascent: build an investor-ready data room in minutes (10 sections, 51 items). Investor tier scoring, LP-GP matching, grant and competition discovery. For pre-seed to Series A founders.
   - Command: the institutional operating system for funds -- fund dashboard, LP management, portfolio company tracking, deal sourcing, diligence, IC voting, and investment committee reports. One fund data room included per fund.
   - Connect: the capital and expertise network -- mentor connect and verified audit requests (included free with an active Ascent or Command plan), plus dedicated dashboards for mentors, audit partners, and scouting partners (free to apply, vetted before their dashboard goes live).
   Pricing (each module subscribed independently, monthly or annual where applicable -- exact figures live on /nestlens/pricing and can change, so give these as approximate "from" prices, not quotes):
   - Atlas: paid tiers from roughly Rs 14,999/mo, Pro tier with more seats/credits/data rooms.
   - Exchange: free to browse listings and briefs; Priority ~$199/yr (15 applications/mo, active seller listing).
   - Orbit: Programme Management from roughly Rs 24,999/mo (~Rs 2,49,999/yr), up to 1,00,000 applications.
   - Ascent: Founder Data Room from roughly Rs 8,000/yr; Cohort/Group from roughly Rs 4,999/yr (cohort of 25, +Rs 4,999 per additional founder).
   - Command: Fund Data Room from roughly $45/mo, one fund data room included.
   - Connect: included free with an active Ascent or Command plan; mentors/partners apply free.
   Enterprise and Bundle pricing (e.g. a Fund Bundle combining Command + 5 portfolio company Ascent rooms + Atlas + Exchange) on request via /contact or the in-app enterprise enquiry form.

2. NestHR (nesthr.labelnest.in) -- LIVE. HR and workforce operations OS for startups and colleges. Seven modules: People OS, Talent OS / PlacementOS (flagship -- learns from every hiring selection/rejection signal to improve shortlisting each cycle), Performance OS, Expense OS, Learning OS, Analytics, Admin. Serves two audiences: startups (5-200 people, no dedicated HR team) and colleges/institutions (campus placement via PlacementOS).
   Pricing: Starter Rs 799/employee/yr (up to 50 employees); Growth Rs 1,299/employee/yr (51-200 employees, most popular); Enterprise custom (200+ employees or colleges). All plans include all 7 modules -- no module upsells, no per-seat tricks, INR pricing.

3. Managed Services -- LIVE. Expert human data operations: Data Sourcing & Enrichment, Data Quality & Annotation, Ongoing Data Operations, Document & PDF Intelligence, Custom Data Workflow Design. For data problems that need expert human judgment at the edge cases where automated models fail. Process: brief & scope -> pilot run -> full delivery -> standing ops. Contact ops@labelnest.in.

COMING SOON:
- NestResolve -- early access October 2026. A QA and governance platform for data-operations teams ("a Jira alternative built for data problems").
- AnnoNest -- September 2026. The annotation platform, rebuilt and rebranded, multi-tenant, for structured annotation workflows at scale.
- An unannounced private-markets product -- being built, expected around August 2026, no public name yet.

INTERNAL INFRASTRUCTURE (not sold directly -- only mention if specifically asked): DataNest (central entity registry, powers NestLens Intelligence), NestIntel (AI research/extraction engine, powers DataNest and NestLens signals), NestAgent (autonomous research/enrichment agent with human QA feedback, powers DataNest enrichment).
`.trim()

const SYSTEM_PROMPT = `You are Kai, LabelNest's assistant on the public website (labelnest.in). You are warm, concise, and genuinely helpful -- a knowledgeable guide, not a salesperson.

Rules:
- Answer ONLY using the facts in the LABELNEST BRIEF below. Never invent pricing, features, dates, statistics, or anything not stated there.
- You have NO access to any private data -- no customer accounts, no NestLens/NestHR data, no DataNest records, nothing proprietary. If asked about someone's specific account, data, or private information, say you can't access that and point them to the relevant product (NestLens/NestHR) or /contact.
- If asked something the brief doesn't cover, say so honestly and suggest /contact or the relevant page rather than guessing.
- Keep answers short -- 2-4 sentences unless the question genuinely needs a list.
- Third person for the company ("LabelNest is...", "NestLens does..."), first person is fine for yourself ("I can point you to...").
- No markdown headers, no code blocks. Plain conversational text, occasional short bullet list if it truly helps.

LABELNEST BRIEF:
${LABELNEST_BRIEF}`

type ChatMsg = { role: 'user' | 'assistant'; content: string }

const MAX_MESSAGE_LEN = 800
const MAX_HISTORY_TURNS = 6

// Best-effort only -- Vercel serverless instances are ephemeral so this
// in-memory map doesn't survive cold starts or load-balancing across
// instances, but it still caps abuse from a single warm instance at no
// infra cost. A real fix (Upstash/KV-backed) can follow if this proves
// insufficient.
const requestLog = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 8

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (requestLog.get(ip) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  timestamps.push(now)
  requestLog.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT_MAX
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.SARVAM_API_KEY
    if (!apiKey) {
      console.error('[kai] SARVAM_API_KEY not configured')
      return NextResponse.json({ error: 'Kai is not available right now.' }, { status: 503 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many messages -- please wait a moment.' }, { status: 429 })
    }

    const body = await req.json()
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const history = Array.isArray(body.history) ? (body.history as ChatMsg[]) : []

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }
    if (message.length > MAX_MESSAGE_LEN) {
      return NextResponse.json({ error: `Keep it under ${MAX_MESSAGE_LEN} characters.` }, { status: 400 })
    }

    const trimmedHistory = history
      .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-MAX_HISTORY_TURNS * 2)
      .map(m => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LEN) }))

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...trimmedHistory,
      { role: 'user', content: message },
    ]

    const sarvamRes = await fetch('https://api.sarvam.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'sarvam-105b',
        messages,
        temperature: 0.4,
        max_tokens: 400,
        // sarvam-105b reasons by default and counts that against max_tokens --
        // sending a literal null is the only way to actually disable it
        // (omitting the field or sending "low" both still reason heavily).
        reasoning_effort: null,
      }),
    })

    if (!sarvamRes.ok) {
      const errText = await sarvamRes.text().catch(() => '')
      console.error('[kai] Sarvam API error', sarvamRes.status, errText.slice(0, 500))
      return NextResponse.json({ error: 'Kai had trouble responding -- please try again.' }, { status: 502 })
    }

    const data = await sarvamRes.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      return NextResponse.json({ error: 'Kai had trouble responding -- please try again.' }, { status: 502 })
    }

    return NextResponse.json({ reply })
  } catch (e) {
    console.error('[kai] error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
