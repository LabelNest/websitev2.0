import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { gateCheck, gateAllows, resetGateCache, jwtSecretBytes } from './gate.ts'

const url = 'https://gate.test'
const key = 'secret-key'

function answerFetch(body: unknown, calls: string[]): typeof fetch {
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push(String(input))
    assert.equal((init?.headers as Record<string, string>)['x-gate-key'], key)
    return new Response(JSON.stringify(body), { status: 200 })
  }) as typeof fetch
}
const failFetch: typeof fetch = (async () => {
  throw new Error('down')
}) as typeof fetch

beforeEach(() => resetGateCache())

test('founder short-circuits without calling the gate', async () => {
  const calls: string[] = []
  const r = await gateCheck('Ankit@LabelNest.in', 'website_admin', {
    url, key, fetchImpl: answerFetch({}, calls),
  })
  assert.equal(r?.allowed, true)
  assert.equal(calls.length, 0)
})

test('sends only email and app; caches 60s', async () => {
  const calls: string[] = []
  const f = answerFetch({ allowed: true, role: 'admin', isAppAdmin: true, reason: 'ok' }, calls)
  let t = 1000
  const o = { url, key, fetchImpl: f, now: () => t }
  await gateCheck('a@x.com', 'website_admin', o)
  t += 30_000
  await gateCheck('a@x.com', 'website_admin', o)
  assert.equal(calls.length, 1)
  assert.equal(calls[0], 'https://gate.test/api/gate?email=a%40x.com&app=website_admin')
  t += 31_000
  await gateCheck('a@x.com', 'website_admin', o)
  assert.equal(calls.length, 2)
})

test('unreachable gate uses cache up to 10 minutes, then null', async () => {
  let t = 0
  const good = answerFetch({ allowed: false, role: null, isAppAdmin: false, reason: 'denied' }, [])
  await gateCheck('a@x.com', 'website_admin', { url, key, fetchImpl: good, now: () => t })
  t = 5 * 60_000
  const r1 = await gateCheck('a@x.com', 'website_admin', { url, key, fetchImpl: failFetch, now: () => t })
  assert.equal(r1?.reason, 'denied')
  t = 11 * 60_000
  const orig = console.warn
  console.warn = () => {}
  try {
    const r2 = await gateCheck('a@x.com', 'website_admin', { url, key, fetchImpl: failFetch, now: () => t })
    assert.equal(r2, null)
  } finally {
    console.warn = orig
  }
})

test('mode off never calls gate and allows', async () => {
  const calls: string[] = []
  const ok = await gateAllows('a@x.com', {
    mode: 'off', url, key, fetchImpl: answerFetch({ allowed: false }, calls),
  })
  assert.equal(ok, true)
  assert.equal(calls.length, 0)
})

test('mode log allows and warns when gate would block', async () => {
  const warns: string[] = []
  const orig = console.warn
  console.warn = (m: string) => { warns.push(m) }
  try {
    const ok = await gateAllows('a@x.com', {
      mode: 'log', url, key,
      fetchImpl: answerFetch({ allowed: false, role: null, isAppAdmin: false, reason: 'no_entitlement' }, []),
    })
    assert.equal(ok, true)
  } finally {
    console.warn = orig
  }
  assert.deepEqual(warns, ['[access-gate] would block a@x.com app=website_admin reason=no_entitlement'])
})

test('mode enforce blocks when denied, allows when allowed, fails open with no answer', async () => {
  const denied = answerFetch({ allowed: false, role: null, isAppAdmin: false, reason: 'denied' }, [])
  assert.equal(await gateAllows('a@x.com', { mode: 'enforce', url, key, fetchImpl: denied }), false)
  resetGateCache()
  const allowed = answerFetch({ allowed: true, role: 'editor', isAppAdmin: false, reason: 'ok' }, [])
  assert.equal(await gateAllows('b@x.com', { mode: 'enforce', url, key, fetchImpl: allowed }), true)
  resetGateCache()
  const orig = console.warn
  console.warn = () => {}
  try {
    assert.equal(await gateAllows('c@x.com', { mode: 'enforce', url, key, fetchImpl: failFetch }), true)
  } finally {
    console.warn = orig
  }
})

test('enforce: revoked person is blocked once the 60s cache expires', async () => {
  let t = 0
  let allowed = true
  const f = (async () =>
    new Response(
      JSON.stringify({ allowed, role: 'admin', isAppAdmin: true, reason: allowed ? 'ok' : 'denied' })
    )) as typeof fetch
  const o = { mode: 'enforce' as const, url, key, fetchImpl: f, now: () => t }
  assert.equal(await gateAllows('d@x.com', o), true)
  allowed = false
  t = 61_000
  assert.equal(await gateAllows('d@x.com', o), false)
})

test('jwt secret: fallback allowed off, refused in enforce without JWT_SECRET', () => {
  const prevS = process.env.JWT_SECRET
  const prevM = process.env.ACCESS_GATE_MODE
  const orig = console.error
  console.error = () => {}
  try {
    delete process.env.JWT_SECRET
    process.env.ACCESS_GATE_MODE = 'off'
    assert.notEqual(jwtSecretBytes(), null)
    process.env.ACCESS_GATE_MODE = 'enforce'
    assert.equal(jwtSecretBytes(), null)
    process.env.JWT_SECRET = 'real'
    assert.notEqual(jwtSecretBytes(), null)
  } finally {
    console.error = orig
    if (prevS === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = prevS
    if (prevM === undefined) delete process.env.ACCESS_GATE_MODE; else process.env.ACCESS_GATE_MODE = prevM
  }
})
