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
  const rows = await sql`SELECT * FROM website_legal_documents ORDER BY sort_order ASC, title ASC`
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  const row = await sql`
    INSERT INTO website_legal_documents
      (slug,title,intro,body_markdown,version,effective_date,last_updated,is_published,sort_order,meta_description)
    VALUES (
      ${m.slug},${m.title},${m.intro||''},${m.body_markdown||''},
      ${m.version||'v1.0'},${m.effective_date||''},${m.last_updated||''},
      ${m.is_published!==false},${m.sort_order||99},${m.meta_description||null}
    )
    RETURNING id`
  return NextResponse.json({ id: row[0].id })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  await sql`
    UPDATE website_legal_documents SET
      slug=${m.slug},title=${m.title},intro=${m.intro||''},
      body_markdown=${m.body_markdown||''},version=${m.version||'v1.0'},
      effective_date=${m.effective_date||''},last_updated=${m.last_updated||''},
      is_published=${m.is_published!==false},sort_order=${m.sort_order||99},
      meta_description=${m.meta_description||null},updated_at=NOW()
    WHERE id=${m.id}`
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  await sql`DELETE FROM website_legal_documents WHERE id=${id}`
  return NextResponse.json({ ok: true })
}
