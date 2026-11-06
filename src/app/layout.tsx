import type { Metadata } from 'next'
import { Newsreader, Hanken_Grotesk } from 'next/font/google'
import ScrollToTop from '@/components/ScrollToTop'
import KaiWidget from '@/components/KaiWidget'
import './globals.css'
import './ln.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LabelNest — Private market data you can trace to its source',
    template: '%s — LabelNest',
  },
  description:
    'LabelNest is a private markets data company in Bengaluru. We make reviewed data, and the software to use it, for the managers, founders and institutions that global platforms treat as an afterthought.',
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
  description: 'LabelNest is a private markets data company in Bengaluru. NestLens is its platform: Atlas, Exchange, Command, Ascent, Orbit and Connect. NestHR is its HR and campus-placement OS. Built in India.',
  founders: [{ '@type': 'Person', name: 'Ankit Suman', jobTitle: 'Founder and Director', url: 'https://labelnest.in/about/ankit' }],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 33, 4th Floor, 1st Main, CBI Main Rd, HMT Layout, Ganganagar',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560032',
    addressCountry: 'IN',
  },
  sameAs: ['https://www.linkedin.com/company/labelnest-india'],
  contactPoint: [{ '@type': 'ContactPoint', email: 'contact@labelnest.in', contactType: 'customer support', areaServed: 'IN', availableLanguage: 'English' }],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'NestLens',
        url: 'https://nestlens.labelnest.in',
        applicationCategory: 'BusinessApplication',
        description: 'Private markets platform: Atlas, Exchange, Command, Ascent, Orbit and Connect.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'NestHR',
        url: 'https://nesthr.labelnest.in',
        applicationCategory: 'BusinessApplication',
        description: 'HR and placement OS — 7 modules including PlacementOS for campus recruitment.',
      },
    },
  ],
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
      data-theme="light"
      className={`${newsreader.variable} ${hanken.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              /* The site is light. An older saved "dark" choice is ignored. */
              document.documentElement.setAttribute('data-theme', 'light');
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
      <body><ScrollToTop />{children}<KaiWidget /></body>
    </html>
  )
}
