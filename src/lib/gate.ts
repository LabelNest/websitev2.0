// Access Admin gate client. Access Admin is the only place that grants access
// to this app (app code `website_admin`). Modes via ACCESS_GATE_MODE:
//   off (default) - never call the gate, behave as before
//   log           - call the gate, warn when it would have blocked someone
//   enforce       - existing checks AND the gate must allow
// Only the email and app code are ever sent to the gate. The key is never logged.
// Edge-safe: uses only fetch and Map (imported by middleware too).

export type GateMode = 'off' | 'log' | 'enforce'

export const APP_CODE = 'website_admin'
export const FOUNDER_EMAIL = 'ankit@labelnest.in'
export const ACCESS_MANAGED_MESSAGE = 'Access is managed in Access Admin'

const TIMEOUT_MS = 3000
const FRESH_MS = 60_000
const STALE_MS = 10 * 60_000

export interface GateAnswer {
  allowed: boolean
  role: string | null
  isAppAdmin: boolean
  reason: string
}

export interface GateOptions {
  fetchImpl?: typeof fetch
  now?: () => number
  url?: string
  key?: string
}

interface CacheEntry {
  answer: GateAnswer
  at: number
}

const cache = new Map<string, CacheEntry>()
let warnedUnavailable = false

export function resetGateCache(): void {
  cache.clear()
  warnedUnavailable = false
}

export function getGateMode(): GateMode {
  const m = (process.env.ACCESS_GATE_MODE ?? 'off').trim().toLowerCase()
  return m === 'log' || m === 'enforce' ? m : 'off'
}

export function accessAdminUrl(): string {
  return process.env.ACCESS_GATE_URL ?? ''
}

/**
 * Ask the gate. Returns null when the gate is unreachable and there is no
 * usable cache (caller falls back to today's behaviour).
 */
export async function gateCheck(
  email: string,
  app: string = APP_CODE,
  opts: GateOptions = {}
): Promise<GateAnswer | null> {
  const normalized = email.trim().toLowerCase()
  if (normalized === FOUNDER_EMAIL) {
    return { allowed: true, role: 'admin', isAppAdmin: true, reason: 'ok' }
  }
  const now = (opts.now ?? Date.now)()
  const cacheKey = `${normalized}|${app}`
  const hit = cache.get(cacheKey)
  if (hit && now - hit.at < FRESH_MS) return hit.answer

  const base = opts.url ?? process.env.ACCESS_GATE_URL
  const key = opts.key ?? process.env.ACCESS_GATE_KEY
  const doFetch = opts.fetchImpl ?? fetch

  const stale = (): GateAnswer | null => {
    if (hit && now - hit.at <= STALE_MS) return hit.answer
    if (!warnedUnavailable) {
      warnedUnavailable = true
      console.warn('[access-gate] gate unreachable and no cached answer; using existing decision')
    }
    return null
  }

  if (!base || !key) return stale()

  try {
    const url =
      `${base.replace(/\/+$/, '')}/api/gate?email=${encodeURIComponent(normalized)}` +
      `&app=${encodeURIComponent(app)}`
    const res = await doFetch(url, {
      headers: { 'x-gate-key': key },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
    })
    if (!res.ok) return stale()
    const body = (await res.json()) as Partial<GateAnswer>
    if (typeof body.allowed !== 'boolean') return stale()
    const answer: GateAnswer = {
      allowed: body.allowed,
      role: typeof body.role === 'string' ? body.role : null,
      isAppAdmin: body.isAppAdmin === true,
      reason: typeof body.reason === 'string' ? body.reason : 'ok',
    }
    cache.set(cacheKey, { answer, at: now })
    return answer
  } catch {
    return stale()
  }
}

/**
 * The single decision used at the choke point. The caller has already
 * verified identity (password / valid token), so the existing check passed.
 * off: true. log: true, but warns if the gate would block. enforce: gate
 * decides (fails open to today's behaviour only when the gate has no answer).
 */
export async function gateAllows(
  email: string,
  opts: GateOptions & { mode?: GateMode } = {}
): Promise<boolean> {
  const mode = opts.mode ?? getGateMode()
  if (mode === 'off') return true
  const answer = await gateCheck(email, APP_CODE, opts)
  if (!answer) return true
  if (mode === 'log') {
    if (!answer.allowed) {
      console.warn(`[access-gate] would block ${email} app=${APP_CODE} reason=${answer.reason}`)
    }
    return true
  }
  return answer.allowed
}

const FALLBACK_SECRET = 'fallback-secret-change-in-prod'

/**
 * JWT signing secret. Without JWT_SECRET the legacy hardcoded fallback is used
 * (off/log modes, unchanged). In enforce mode a real secret is required:
 * returns null so callers refuse to sign or accept tokens.
 */
export function jwtSecretBytes(): Uint8Array | null {
  const s = process.env.JWT_SECRET
  if (s) return new TextEncoder().encode(s)
  if (getGateMode() === 'enforce') {
    console.error('[access-gate] JWT_SECRET is not set; refusing to sign or verify admin sessions in enforce mode')
    return null
  }
  return new TextEncoder().encode(FALLBACK_SECRET)
}
