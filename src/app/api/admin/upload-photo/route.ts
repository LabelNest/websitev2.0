import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID     ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
})
const BUCKET     = process.env.R2_BUCKET_NAME ?? 'labelnest'
const PUBLIC_URL = process.env.R2_PUBLIC_URL  ?? 'https://pub-a36a86a8b72a466f95980705b327476f.r2.dev'

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookies()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const form   = await req.formData()
  const file   = form.get('file') as File | null
  const folder = (form.get('folder') as string) || 'team'
  const name   = (form.get('name') as string) || 'photo'

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const ext     = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const slug    = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const key     = `${folder}/${slug}.${ext}`
  const buf     = Buffer.from(await file.arrayBuffer())
  const mime    = file.type || (ext === 'png' ? 'image/png' : 'image/jpeg')

  await R2.send(new PutObjectCommand({
    Bucket:       BUCKET,
    Key:          key,
    Body:         buf,
    ContentType:  mime,
    CacheControl: 'public, max-age=31536000',
  }))

  return NextResponse.json({ url: `${PUBLIC_URL}/${key}` })
}
