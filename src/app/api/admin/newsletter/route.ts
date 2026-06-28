import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'
import { sql } from '@/lib/db'

async function guard() {
  const admin = await getAdminFromCookies()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

// GET /api/admin/newsletter?tab=subscribers|campaigns
export async function GET(req: NextRequest) {
  const err = await guard(); if (err) return err
  const tab = req.nextUrl.searchParams.get('tab') || 'subscribers'

  if (tab === 'campaigns') {
    const rows = await sql`
      SELECT id, subject, template_name, recipient_count, recipient_filter, status, sent_at, created_at
      FROM website_newsletter_campaigns
      ORDER BY sent_at DESC NULLS LAST`
    return NextResponse.json({ rows })
  }

  // subscribers (default)
  const rows = await sql`
    SELECT id, email, name, source, status, subscribed_at, created_at
    FROM website_newsletter_subscribers
    ORDER BY created_at DESC`
  return NextResponse.json({ rows, total: rows.length })
}

// DELETE /api/admin/newsletter — unsubscribe or hard-delete a subscriber
export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id, hard } = await req.json()
  if (hard) {
    await sql`DELETE FROM website_newsletter_subscribers WHERE id=${id}`
  } else {
    await sql`UPDATE website_newsletter_subscribers SET status='unsubscribed', unsubscribed_at=NOW(), updated_at=NOW() WHERE id=${id}`
  }
  return NextResponse.json({ ok: true })
}
