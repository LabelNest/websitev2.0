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
  const rows = await sql`SELECT * FROM website_alumni ORDER BY name ASC`
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const a = await req.json()
  const row = await sql`
    INSERT INTO website_alumni (name,role,department,email,linkedin_url,image_url,now_at_type,now_at_company,now_at_role,now_at_url,is_active)
    VALUES (${a.name},${a.role||''},${a.department||''},${a.email||null},${a.linkedin_url||null},${a.image_url||null},${a.now_at_type||'working'},${a.now_at_company||null},${a.now_at_role||null},${a.now_at_url||null},${a.is_active!==false})
    RETURNING id`
  return NextResponse.json({ id: row[0].id })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const a = await req.json()
  await sql`
    UPDATE website_alumni SET
      name=${a.name},role=${a.role||''},department=${a.department||''},
      email=${a.email||null},linkedin_url=${a.linkedin_url||null},image_url=${a.image_url||null},
      now_at_type=${a.now_at_type||'working'},now_at_company=${a.now_at_company||null},
      now_at_role=${a.now_at_role||null},now_at_url=${a.now_at_url||null},
      is_active=${a.is_active!==false},updated_at=NOW()
    WHERE id=${a.id}`
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  await sql`DELETE FROM website_alumni WHERE id=${id}`
  return NextResponse.json({ ok: true })
}
