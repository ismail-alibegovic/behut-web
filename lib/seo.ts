import type { Metadata } from 'next'
import { images, localize, logo, siteConfig } from '@/data/site-config'
import { menuCategories } from '@/data/menu'
import { paths, tr, type Locale } from '@/lib/i18n'

// U statičnom exportu (cPanel) svaka stranica je <putanja>/index.html, pa je adresa s kosom crtom na kraju.
const STATIC_EXPORT = Boolean(process.env.NEXT_PUBLIC_STATIC_EXPORT)
export const pagePath = (path: string) => STATIC_EXPORT && !path.endsWith('/') ? `${path}/` : path
export const absolute = (path: string) => `${siteConfig.siteUrl}${path}`

const ogImage = { url: '/og/behut-og.jpg', width: 1200, height: 630, alt: 'BEHUT Sarajevo, kafić na Kovačima' }

const descriptions = {
  bs: 'U srcu Sarajeva, na Kovačima 20. Otkrijte Behut, našu terasu, vintage ambijent i bosansku kafu. Za trenutke koji ostaju.',
  en: 'In the heart of Sarajevo, at Kovači 20. Discover Behut, our terrace, vintage atmosphere and Bosnian coffee. For moments that stay.',
}
const keywords = {
  bs: ['Behut', 'Behut Sarajevo', 'kafić Sarajevo', 'bosanska kafa', 'Kovači', 'Kovači 20', 'salep', 'čaj Sarajevo', 'tradicionalni kolači', 'baklava', 'kafić Baščaršija', 'coffee shop Sarajevo'],
  en: ['Behut', 'Behut Sarajevo', 'coffee shop Sarajevo', 'Bosnian coffee', 'Kovači', 'Kovači 20', 'salep', 'tea Sarajevo', 'traditional sweets', 'baklava', 'cafe near Baščaršija', 'Sarajevo cafe'],
}

/** Meta podaci koji vrijede za cijeli sajt (u root layoutu). */
export const siteMetadata = (locale: Locale): Metadata => ({
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: keywords[locale],
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '48x48' }, { url: '/icon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
})

/** Meta podaci jedne stranice: naslov, opis, canonical, hreflang, Open Graph i Twitter kartica. */
export function pageMetadata({ locale, title, description, route }: { locale: Locale; title: string; description?: string; route: 'home' | 'menu' }): Metadata {
  const text = description ?? descriptions[locale]
  const path = pagePath(paths[route][locale])
  return {
    title,
    description: text,
    alternates: {
      canonical: path,
      languages: { bs: pagePath(paths[route].bs), en: pagePath(paths[route].en), 'x-default': pagePath(paths[route].bs) },
    },
    openGraph: {
      type: 'website', siteName: siteConfig.name, title, description: text, url: path,
      locale: locale === 'bs' ? 'bs_BA' : 'en_GB', alternateLocale: locale === 'bs' ? 'en_GB' : 'bs_BA', images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title, description: text, images: [ogImage.url] },
  }
}

/** Strukturirani podaci (schema.org) za kafić: Google ih koristi za lokalne rezultate i Maps. */
export function cafeJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': absolute('/#cafe'),
    name: siteConfig.name,
    alternateName: 'Behut Coffee shop',
    url: absolute(pagePath(paths.home[locale])),
    description: descriptions[locale],
    image: [absolute('/og/behut-og.jpg'), ...[images.terrace, images.facade, images.interior].map(image => absolute(localize(image, locale).src))],
    logo: absolute(logo),
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    address: { '@type': 'PostalAddress', streetAddress: 'Kovači 20', addressLocality: 'Sarajevo', postalCode: '71000', addressCountry: 'BA' },
    geo: { '@type': 'GeoCoordinates', latitude: 43.8602721, longitude: 18.4322111 },
    hasMap: siteConfig.maps,
    sameAs: [siteConfig.instagram, siteConfig.maps],
    servesCuisine: ['Coffee', 'Tea', 'Bosnian sweets'],
    priceRange: 'KM',
    currenciesAccepted: 'BAM',
    foundingDate: '2024',
    inLanguage: ['bs', 'en'],
    hasMenu: absolute(pagePath(paths.menu[locale])),
  }
}

/** Meni sa cijenama (schema.org Menu) za stranicu punog menija. */
export function menuJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: locale === 'bs' ? 'Meni BEHUT Sarajevo' : 'BEHUT Sarajevo menu',
    url: absolute(pagePath(paths.menu[locale])),
    inLanguage: locale,
    mainEntityOfPage: absolute(pagePath(paths.menu[locale])),
    provider: { '@id': absolute('/#cafe') },
    hasMenuSection: menuCategories.map(category => ({
      '@type': 'MenuSection',
      name: tr(category.name, locale),
      hasMenuItem: category.items.map(item => ({
        '@type': 'MenuItem',
        name: tr(item.name, locale),
        ...(item.description ? { description: tr(item.description, locale) } : {}),
        offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'BAM' },
      })),
    })),
  }
}

export function breadcrumbJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'BEHUT Sarajevo', item: absolute(pagePath(paths.home[locale])) },
      { '@type': 'ListItem', position: 2, name: locale === 'bs' ? 'Meni' : 'Menu', item: absolute(pagePath(paths.menu[locale])) },
    ],
  }
}
