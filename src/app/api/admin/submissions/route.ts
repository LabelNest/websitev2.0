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
  const rows = await sql`
    SELECT id, name, email, phone, subject, message, category, metadata, is_read, created_at
    FROM website_submissions
    ORDER BY created_at DESC
  `
  return NextResponse.json({ rows })
}

export async function PATCH(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id, is_read } = await req.json()
  await sql`UPDATE website_submissions SET is_read = ${is_read}, updated_at = NOW() WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  await sql`DELETE FROM website_submissions WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}
