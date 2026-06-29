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
