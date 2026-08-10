import type { Metadata } from 'next'
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google'
import ScrollToTop from '@/components/ScrollToTop'
import DiyPromoPopup from '@/components/DiyPromoPopup'
import KaiWidget from '@/components/KaiWidget'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['300', '400', '500', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LabelNest — Data Intelligence & Systems Company',
    template: '%s — LabelNest',
  },
  description:
    'LabelNest builds data systems and intelligence platforms combining expert human reasoning with deterministic automation.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://labelnest.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://labelnest.in',
    siteName: 'LabelNest',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@labelnest',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// On every page — tells Google what LabelNest is as an entity, separate
// from any single page's content.
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LabelNest India Private Limited',
  alternateName: 'LabelNest',
  url: 'https://labelnest.in',
  logo: 'https://labelnest.in/og-default.png',
  description: 'Private markets intelligence, data marketplace, and capital readiness platform for emerging managers and analysts.',
  founders: [{ '@type': 'Person', name: 'Ankit Suman', jobTitle: 'Founder and Director', url: 'https://labelnest.in/about/ankit' }],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 33, 4th Floor, 1st Main, CBI Main Rd, HMT Layout, Ganganagar',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560032',
    addressCountry: 'IN',
  },
  sameAs: ['https://www.linkedin.com/company/labelnest'],
  contactPoint: [{ '@type': 'ContactPoint', email: 'contact@labelnest.in', contactType: 'customer support', areaServed: 'IN', availableLanguage: 'English' }],
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LabelNest',
  url: 'https://labelnest.in',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('ln-theme') || 'dark';
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </head>
      <body><ScrollToTop />{children}<DiyPromoPopup /><KaiWidget /></body>
    </html>
  )
}
