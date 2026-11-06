import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminFromCookies } from '@/lib/auth'
import { sql } from '@/lib/db'
import { CONTENT_FIELDS, fieldFor, getContent, type Item } from '@/lib/siteContent'

async function guard() {
  const admin = await getAdminFromCookies()
  if (!admin) return { err: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), admin: null }
  return { err: null, admin }
}

// Every page that reads site content. A save purges them all so the change is visible straight away.
const PAGES_TO_REFRESH = ['/', '/ecosystem', '/nestlens', '/nestlens/pricing', '/who-we-serve/incubator', '/about', '/contact']
function refresh() {
  for (const p of PAGES_TO_REFRESH) revalidatePath(p)
  revalidatePath('/', 'layout')
}

// GET: the form definition plus the current value of every field, and which fields are changed from the default.
export async function GET() {
  const { err } = await guard(); if (err) return err
  let storage = true
  let saved: Record<string, { updated_at: string; updated_by: string | null }> = {}
  try {
    const rows = (await sql`SELECT key, updated_at, updated_by FROM website_content`) as { key: string; updated_at: string; updated_by: string | null }[]
    saved = Object.fromEntries(rows.map((r) => [r.key, { updated_at: r.updated_at, updated_by: r.updated_by }]))
  } catch {
    storage = false
  }
  const values = await getContent()
  return NextResponse.json({ fields: CONTENT_FIELDS, values, saved, storage })
}

function validItems(f: { itemFields: { key: string }[] }, v: unknown): Item[] | null {
  if (!Array.isArray(v)) return null
  const out: Item[] = []
  for (const row of v) {
    if (!row || typeof row !== 'object') return null
    const clean: Item = {}
    for (const k of f.itemFields.map((x) => x.key)) clean[k] = String((row as Record<string, unknown>)[k] ?? '').slice(0, 4000)
    out.push(clean)
  }
  return out.slice(0, 40)
}

// PUT { changes: { [key]: value } } saves one or many fields. Every change is kept in the history table.
export async function PUT(req: NextRequest) {
  const { err, admin } = await guard(); if (err) return err
  const body = (await req.json()) as { changes?: Record<string, unknown> }
  const changes = body.changes ?? {}
  const keys = Object.keys(changes)
  if (!keys.length) return NextResponse.json({ error: 'Nothing to save' }, { status: 400 })
  try {
    for (const key of keys) {
      const f = fieldFor(key)
      if (!f) return NextResponse.json({ error: `Unknown field: ${key}` }, { status: 400 })
      let value: string | Item[]
      if (f.kind === 'items') {
        const v = validItems(f, changes[key])
        if (!v) return NextResponse.json({ error: `Bad list for ${key}` }, { status: 400 })
        value = v
      } else {
        if (typeof changes[key] !== 'string') return NextResponse.json({ error: `Bad text for ${key}` }, { status: 400 })
        value = (changes[key] as string).slice(0, 8000)
      }
      const old = (await sql`SELECT value FROM website_content WHERE key = ${key}`) as { value: unknown }[]
      const json = JSON.stringify(value)
      await sql`
        INSERT INTO website_content (key, value, updated_at, updated_by)
        VALUES (${key}, ${json}::jsonb, NOW(), ${admin!.email})
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW(), updated_by = EXCLUDED.updated_by
      `
      await sql`
        INSERT INTO website_content_history (key, old_value, new_value, changed_by)
        VALUES (${key}, ${old[0] ? JSON.stringify(old[0].value) : null}::jsonb, ${json}::jsonb, ${admin!.email})
      `
    }
  } catch {
    return NextResponse.json({ error: 'Content storage is not set up yet. Run "npm run migrate" once, then save again.' }, { status: 503 })
  }
  refresh()
  return NextResponse.json({ ok: true, saved: keys.length })
}

// DELETE { key } puts one field back to its default.
export async function DELETE(req: NextRequest) {
  const { err, admin } = await guard(); if (err) return err
  const { key } = (await req.json()) as { key?: string }
  if (!key || !fieldFor(key)) return NextResponse.json({ error: 'Unknown field' }, { status: 400 })
  try {
    const old = (await sql`SELECT value FROM website_content WHERE key = ${key}`) as { value: unknown }[]
    if (old[0]) {
      await sql`INSERT INTO website_content_history (key, old_value, new_value, changed_by) VALUES (${key}, ${JSON.stringify(old[0].value)}::jsonb, NULL, ${admin!.email})`
      await sql`DELETE FROM website_content WHERE key = ${key}`
    }
  } catch {
    return NextResponse.json({ error: 'Content storage is not set up yet. Run "npm run migrate" once.' }, { status: 503 })
  }
  refresh()
  return NextResponse.json({ ok: true })
}
