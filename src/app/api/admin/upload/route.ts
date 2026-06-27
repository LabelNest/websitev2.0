import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'
import { getUploadUrl, buildKey } from '@/lib/r2'

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookies()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { filename, contentType, folder } = await req.json()
    if (!filename || !contentType || !folder) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    const key = buildKey(folder, filename)
    const uploadUrl = await getUploadUrl(key, contentType)
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`
    return NextResponse.json({ uploadUrl, key, publicUrl })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
