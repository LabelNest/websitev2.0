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
      SELECT
        c.id, c.subject, c.template_name, c.recipient_count, c.recipient_filter,
        c.status, c.sent_at, c.created_at,
        COUNT(r.id) FILTER (WHERE r.status IN ('delivered', 'opened', 'clicked')) AS delivered_count,
        COUNT(r.id) FILTER (WHERE r.status IN ('opened', 'clicked')) AS opened_count,
        COUNT(r.id) FILTER (WHERE r.status = 'clicked') AS clicked_count,
        COUNT(r.id) FILTER (WHERE r.status IN ('bounced', 'blocked', 'invalid')) AS failed_count
      FROM website_newsletter_campaigns c
      LEFT JOIN website_newsletter_recipients r ON r.campaign_id = c.id
      GROUP BY c.id
      ORDER BY c.sent_at DESC NULLS LAST`
    return NextResponse.json({ rows })
  }

  // Per-recipient drill-down for a single campaign — "who opened this"
  if (tab === 'campaign-recipients') {
    const campaignId = req.nextUrl.searchParams.get('campaign_id')
    if (!campaignId) return NextResponse.json({ error: 'campaign_id required' }, { status: 400 })
    const rows = await sql`
      SELECT email, status, open_count, click_count,
             first_opened_at, last_opened_at, first_clicked_at, last_clicked_at
      FROM website_newsletter_recipients
      WHERE campaign_id = ${campaignId}::uuid
      ORDER BY
        CASE status
          WHEN 'clicked' THEN 0 WHEN 'opened' THEN 1 WHEN 'delivered' THEN 2
          WHEN 'sent' THEN 3 ELSE 4
        END,
        last_opened_at DESC NULLS LAST`
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
