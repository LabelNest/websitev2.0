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
  const rows = await sql`SELECT * FROM website_page_seo ORDER BY page_path ASC`
  return NextResponse.json({ rows })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id, title, description, og_image, keywords } = await req.json()
  await sql`
    UPDATE website_page_seo
    SET title = ${title || null}, description = ${description || null},
        og_image = ${og_image || null}, keywords = ${keywords || null},
        updated_at = NOW()
    WHERE id = ${id}
  `
  return NextResponse.json({ ok: true })
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { page_path, title, description, og_image, keywords } = await req.json()
  if (!page_path?.trim()) return NextResponse.json({ error: 'page_path is required' }, { status: 400 })
  const rows = await sql`
    INSERT INTO website_page_seo (page_path, title, description, og_image, keywords, updated_at)
    VALUES (${page_path.trim()}, ${title || ''}, ${description || ''}, ${og_image || null}, ${keywords || null}, NOW())
    ON CONFLICT (page_path) DO UPDATE
      SET title = EXCLUDED.title, description = EXCLUDED.description,
          og_image = EXCLUDED.og_image, keywords = EXCLUDED.keywords, updated_at = NOW()
    RETURNING *
  `
  return NextResponse.json({ ok: true, row: rows[0] })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
  await sql`DELETE FROM website_page_seo WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}
