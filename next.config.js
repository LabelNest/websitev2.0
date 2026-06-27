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
    ]
  },
}

module.exports = nextConfig
