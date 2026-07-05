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
  const rows = await sql`SELECT * FROM website_interns ORDER BY sort_order ASC, name ASC`
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  const row = await sql`
    INSERT INTO website_interns (name,role,cohort,linkedin_url,image_url,sort_order,is_active,slug)
    VALUES (${m.name},${m.role||'Intern'},${m.cohort||''},${m.linkedin_url||null},${m.image_url||null},${m.sort_order||99},${m.is_active!==false},${m.slug||null})
    RETURNING id`
  return NextResponse.json({ id: row[0].id })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  await sql`
    UPDATE website_interns SET
      name=${m.name},role=${m.role||'Intern'},cohort=${m.cohort||''},
      linkedin_url=${m.linkedin_url||null},image_url=${m.image_url||null},
      sort_order=${m.sort_order||99},is_active=${m.is_active!==false},slug=${m.slug||null}
    WHERE id=${m.id}`
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  await sql`DELETE FROM website_interns WHERE id=${id}`
  return NextResponse.json({ ok: true })
}
