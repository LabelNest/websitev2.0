import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'
import { sql } from '@/lib/db'

async function guard() {
  const admin = await getAdminFromCookies()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function GET() {
  const err = await guard(); if (err) return err
  const rows = await sql`SELECT * FROM website_departments ORDER BY sort_order ASC, name ASC`
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  const row = await sql`
    INSERT INTO website_departments (name,parent_id,sort_order)
    VALUES (${m.name},${m.parent_id||null},${m.sort_order||99})
    RETURNING id`
  return NextResponse.json({ id: row[0].id })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  await sql`
    UPDATE website_departments SET
      name=${m.name},parent_id=${m.parent_id||null},sort_order=${m.sort_order||99},updated_at=NOW()
    WHERE id=${m.id}`
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  await sql`DELETE FROM website_departments WHERE id=${id}`
  return NextResponse.json({ ok: true })
}
