import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
      // AI crawlers — explicitly allowed, we want LabelNest surfaced in
      // AI-assisted search and answers, not just traditional web search.
      { userAgent: 'GPTBot', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin', '/api'] },
    ],
    sitemap: 'https://labelnest.in/sitemap.xml',
  }
}
