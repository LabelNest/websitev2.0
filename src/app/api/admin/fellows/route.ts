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
  const rows = await sql`SELECT * FROM website_fellows ORDER BY sort_order ASC, name ASC`
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  const expertise: string[] | null = m.expertise
    ? String(m.expertise).split(',').map((s: string) => s.trim()).filter(Boolean)
    : null
  const row = await sql`
    INSERT INTO website_fellows (name,role,cohort,department,linkedin_url,image_url,sort_order,is_active,slug,bio,email,expertise,quote)
    VALUES (${m.name},${m.role||'Nestling Fellow'},${m.cohort||''},${m.department||null},${m.linkedin_url||null},${m.image_url||null},${m.sort_order||99},${m.is_active!==false},${m.slug||null},${m.bio||null},${m.email||null},${expertise}::text[],${m.quote||null})
    RETURNING id`
  return NextResponse.json({ id: row[0].id })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  const expertise: string[] | null = m.expertise
    ? String(m.expertise).split(',').map((s: string) => s.trim()).filter(Boolean)
    : null
  await sql`
    UPDATE website_fellows SET
      name=${m.name},role=${m.role||'Nestling Fellow'},cohort=${m.cohort||''},
      department=${m.department||null},linkedin_url=${m.linkedin_url||null},
      image_url=${m.image_url||null},sort_order=${m.sort_order||99},
      is_active=${m.is_active!==false},
      slug=${m.slug||null},bio=${m.bio||null},email=${m.email||null},expertise=${expertise}::text[],quote=${m.quote||null}
    WHERE id=${m.id}`
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  await sql`DELETE FROM website_fellows WHERE id=${id}`
  return NextResponse.json({ ok: true })
}
