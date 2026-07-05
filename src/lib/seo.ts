import { Metadata } from 'next'
import { getPageSEO } from './db'

// Every static page calls this from generateMetadata() instead of a plain
// `export const metadata` object — it reads the admin-editable
// website_page_seo row for that path first, falling back to the values
// hardcoded here if no row exists (or fields are blank). This is what
// actually makes the SEO admin panel do something: previously the table
// and admin UI existed but nothing ever read from it.
export async function pageMetadata(
  path: string,
  fallback: { title: string; description: string },
): Promise<Metadata> {
  const seo = await getPageSEO(path).catch(() => null)
  const title = seo?.title?.trim() || fallback.title
  const description = seo?.description?.trim() || fallback.description
  const keywords = seo?.keywords?.trim()
    ? seo.keywords.split(',').map(k => k.trim()).filter(Boolean)
    : undefined
  const ogImage = seo?.og_image?.trim() || undefined

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

// BreadcrumbList JSON-LD for a sub-page — e.g. breadcrumbSchema([
//   { name: 'NestLens', path: '/nestlens' },
//   { name: 'Intelligence', path: '/nestlens/intelligence' },
// ])
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://labelnest.in/' },
      ...crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.name,
        item: `https://labelnest.in${c.path}`,
      })),
    ],
  }
}
