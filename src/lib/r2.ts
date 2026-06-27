import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
})

const BUCKET = process.env.R2_BUCKET ?? 'labelnest-assets'
const PUBLIC_URL = process.env.R2_PUBLIC_URL ?? 'https://assets.labelnest.in'

export type R2Folder = 'team' | 'founders' | 'briefings' | 'products' | 'videos' | 'misc'

// Get a presigned upload URL (expires in 5 min) — client uploads directly to R2
export async function getUploadUrl(
  key: string,
  contentType: string
): Promise<string> {
  const cmd = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  })
  return getSignedUrl(R2, cmd, { expiresIn: 300 })
}

// Delete a file from R2
export async function deleteFile(key: string): Promise<void> {
  await R2.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }))
}

// List files in a folder
export async function listFiles(folder: R2Folder) {
  const cmd = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: `${folder}/`,
    MaxKeys: 100,
  })
  const result = await R2.send(cmd)
  return (result.Contents ?? []).map((obj) => ({
    key: obj.Key ?? '',
    size: obj.Size ?? 0,
    lastModified: obj.LastModified,
    url: `${PUBLIC_URL}/${obj.Key}`,
  }))
}

// Generate public URL for a key
export function getPublicUrl(key: string): string {
  return `${PUBLIC_URL}/${key}`
}

// Build a key from folder + filename
export function buildKey(folder: R2Folder, filename: string): string {
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase()
  const timestamp = Date.now()
  return `${folder}/${timestamp}-${sanitized}`
}
