/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Cloudflare R2 public bucket
      {
        protocol: 'https',
        hostname: 'assets.labelnest.in',
        pathname: '/**',
      },
      // R2 public r2.dev URL
      {
        protocol: 'https',
        hostname: 'pub-a36a86a8b72a466f95980705b327476f.r2.dev',
        pathname: '/**',
      },
      // R2 direct URL (before custom domain is set up)
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
        pathname: '/**',
      },
      // Supabase CDN (legacy team photos)
      {
        protocol: 'https',
        hostname: 'hdwfndjlgkjcjwxxciwn.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/products/nestlens', destination: '/nestlens', permanent: true },
      { source: '/products/nesthr', destination: '/nesthr', permanent: true },
      { source: '/team/ankit-kumar-suman', destination: '/about/ankit', permanent: true },
      // Legacy pre-migration URLs still indexed/linked (confirmed via GSC 2026-08-16:
      // git history shows none of these routes ever existed in this Next.js repo, so
      // they're leftover index entries from the prior site). /products and /labs have
      // confirmed real recent search-click traffic (846 and 127 impressions) landing
      // on a 404 right now.
      { source: '/products', destination: '/ecosystem', permanent: true },
      { source: '/labs', destination: '/ecosystem', permanent: true },
      { source: '/blog', destination: '/briefings', permanent: true },
      { source: '/solutions', destination: '/services', permanent: true },
      { source: '/partnerships', destination: '/contact', permanent: true },
      { source: '/labelnest-platforms', destination: '/ecosystem', permanent: true },
      { source: '/data-research-intelligence', destination: '/nestlens/intelligence', permanent: true },
      { source: '/data-annotation', destination: '/nestlens/exchange', permanent: true },
      { source: '/english-privacy-policy', destination: '/legal/privacy', permanent: true },
      { source: '/copy-of-about-us', destination: '/about', permanent: true },
      { source: '/accessibility-statement', destination: '/legal', permanent: true },
    ]
  },
}

module.exports = nextConfig
