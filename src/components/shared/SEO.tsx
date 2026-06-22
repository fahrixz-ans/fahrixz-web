import { Helmet } from 'react-helmet-async'
import type { SEOProps } from '@/types'

export function SEO({
  title = 'Fahri Xz Store',
  description = 'Platform Digital Terpercaya - VPS, Panel, License, File Digital',
  keywords = 'vps, hosting, license, digital product',
  image = '/og-image.jpg',
  url = 'https://fahrixz-store.vercel.app',
  type = 'website',
}: SEOProps) {
  const fullTitle = title === 'Fahri Xz Store' ? title : `${title} | Fahri Xz Store`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
