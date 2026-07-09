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
  const rows = await sql`SELECT id,slug,title,author_name,scope,date,read_time,is_featured,cover_image,hero_image,cover_image_position,cover_image_zoom,hero_image_position,hero_image_zoom FROM website_briefings ORDER BY date DESC`
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const b = await req.json()
  const row = await sql`
    INSERT INTO website_briefings (slug,title,summary,content,scope,date,read_time,author_name,author_role,author_department,is_featured,cover_image,hero_image,cover_image_position,cover_image_zoom,hero_image_position,hero_image_zoom)
    VALUES (${b.slug},${b.title},${b.summary||''},${b.content||''},${b.scope||''},${b.date||''},${b.read_time||''},${b.author_name||''},${b.author_role||''},${b.author_department||''},${!!b.is_featured},${b.cover_image||null},${b.hero_image||null},${b.cover_image_position||'50% 50%'},${b.cover_image_zoom||1},${b.hero_image_position||'50% 50%'},${b.hero_image_zoom||1})
    RETURNING id`
  return NextResponse.json({ id: row[0].id })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const b = await req.json()
  await sql`
    UPDATE website_briefings SET
      slug=${b.slug},title=${b.title},summary=${b.summary||''},content=${b.content||''},
      scope=${b.scope||''},date=${b.date||''},read_time=${b.read_time||''},
      author_name=${b.author_name||''},is_featured=${!!b.is_featured},
      cover_image=${b.cover_image||null},hero_image=${b.hero_image||null},
      cover_image_position=${b.cover_image_position||'50% 50%'},cover_image_zoom=${b.cover_image_zoom||1},
      hero_image_position=${b.hero_image_position||'50% 50%'},hero_image_zoom=${b.hero_image_zoom||1},
      updated_at=NOW()
    WHERE id=${b.id}`
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  await sql`DELETE FROM website_briefings WHERE id=${id}`
  return NextResponse.json({ ok: true })
}
