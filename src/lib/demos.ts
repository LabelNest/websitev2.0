// Demo videos are plain data, not database rows: add an object to DEMOS and it
// appears on /demo, gets its own shareable page at /demo/<slug>, a copy-link
// button and a sitemap entry. The video file itself lives in the public R2
// bucket under demos/ (upload with `node scripts/upload-demo.mjs <file> <slug>`).

export const SITE_URL = 'https://labelnest.in'

const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? 'https://pub-a36a86a8b72a466f95980705b327476f.r2.dev').replace(/\/$/, '')

export interface Demo {
  slug: string
  title: string
  summary: string
  product: string
  productHref: string
  date: string // YYYY-MM-DD
  /** R2 object key of the video, e.g. demos/orbit-v1.mp4 */
  videoKey: string
  /** Optional R2 object key of a poster image (jpg/png). */
  posterKey?: string
}

export const DEMOS: Demo[] = [
  {
    slug: 'orbit',
    title: 'NestLens Orbit — product demo',
    summary: 'A walkthrough of Orbit, the NestLens workspace for running your capital relationships and pipeline.',
    product: 'NestLens Orbit',
    productHref: '/nestlens/orbit',
    date: '2026-11-18',
    videoKey: 'demos/orbit-v1.mp4',
  },
  {
    slug: 'ascent',
    title: 'NestLens Ascent — product demo',
    summary: 'A walkthrough of Ascent, the NestLens programme for founders preparing to raise.',
    product: 'NestLens Ascent',
    productHref: '/nestlens',
    date: '2026-11-18',
    videoKey: 'demos/ascent-v1.mp4',
  },
]

export function getDemo(slug: string): Demo | undefined {
  return DEMOS.find((d) => d.slug === slug)
}

// The short link people share (labelnest.in/orbit). It is a rewrite in
// next.config.js onto /demo/<slug>, so add a rewrite there for every new slug.
export function demoUrl(slug: string): string {
  return `${SITE_URL}/${slug}`
}

export function r2Url(key: string): string {
  return `${R2_PUBLIC_URL}/${key}`
}
