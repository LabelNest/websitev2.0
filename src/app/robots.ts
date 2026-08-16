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
      // OpenAI: GPTBot (training), OAI-SearchBot + ChatGPT-User (retrieval).
      { userAgent: 'GPTBot', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/admin', '/api'] },
      // Anthropic: ClaudeBot (training), Claude-SearchBot + Claude-User
      // (retrieval). Claude-Web was deprecated by Anthropic Feb 2026.
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'Claude-SearchBot', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'Claude-User', allow: '/', disallow: ['/admin', '/api'] },
      // Perplexity: PerplexityBot (training/indexing), Perplexity-User (retrieval).
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'Perplexity-User', allow: '/', disallow: ['/admin', '/api'] },
      // Google Gemini / AI Overviews training crawler (separate from Googlebot).
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/admin', '/api'] },
      // Apple Intelligence training crawler.
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/admin', '/api'] },
    ],
    sitemap: 'https://labelnest.in/sitemap.xml',
  }
}
