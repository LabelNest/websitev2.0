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
  const rows = await sql`SELECT * FROM website_job_openings ORDER BY created_at DESC`
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const j = await req.json()
  const row = await sql`
    INSERT INTO website_job_openings (title,department,type,location,complexity,apply_url,is_active)
    VALUES (${j.title},${j.department||''},${j.type||'Remote'},${j.location||''},${j.complexity||'Medium'},${j.apply_url||''},${j.is_active!==false})
    RETURNING id`
  return NextResponse.json({ id: row[0].id })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const j = await req.json()
  await sql`
    UPDATE website_job_openings SET
      title=${j.title},department=${j.department||''},type=${j.type||'Remote'},
      location=${j.location||''},complexity=${j.complexity||'Medium'},
      apply_url=${j.apply_url||''},is_active=${j.is_active!==false},updated_at=NOW()
    WHERE id=${j.id}`
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  await sql`DELETE FROM website_job_openings WHERE id=${id}`
  return NextResponse.json({ ok: true })
}
