import type { Metadata } from 'next'
import { images, localize, logo, siteConfig } from '@/data/site-config'
import { allMenuItems, itemImage, menuCategories } from '@/data/menu'
import { drinkContent, drinkFaq, withPrices } from '@/data/drinks'
import { paths, tr, type Locale } from '@/lib/i18n'

// U statičnom exportu (cPanel) svaka stranica je <putanja>/index.html, pa je adresa s kosom crtom na kraju.
const STATIC_EXPORT = Boolean(process.env.NEXT_PUBLIC_STATIC_EXPORT)
export const pagePath = (path: string) => STATIC_EXPORT && !path.endsWith('/') ? `${path}/` : path
export const absolute = (path: string) => `${siteConfig.siteUrl}${path}`

const ogImage = { url: '/og/behut-og.jpg', width: 1200, height: 630, alt: 'BEHUT Sarajevo, kafić na Kovačima' }

const descriptions = {
  bs: 'Behut na Kovačima 20 u sarajevskom Starom Gradu: bosanska kafa, salep, Behut ledeni čaj, pink limunada i espresso. Vintage ambijent i terasa.',
  en: 'Behut at Kovači 20 in Sarajevo’s Old Town (Stari Grad): Bosnian coffee, salep, Behut Ice Tea, pink lemonade and espresso. Vintage setting and terrace.',
}
const keywords = {
  bs: ['Behut', 'Behut Sarajevo', 'kafić Sarajevo', 'bosanska kafa', 'bosanska kahva', 'salep Sarajevo', 'Behut ledeni čaj', 'ledeni čaj Sarajevo', 'pink limunada', 'espresso Sarajevo', 'Kovači 20', 'kafić Stari Grad', 'kafa Stari Grad'],
  en: ['Behut', 'Behut Sarajevo', 'coffee shop Sarajevo', 'Bosnian coffee Sarajevo', 'salep Sarajevo', 'Behut Ice Tea', 'iced tea Sarajevo', 'pink lemonade Sarajevo', 'espresso Sarajevo', 'Kovači 20', 'cafe Stari Grad Sarajevo', 'Old Town Sarajevo coffee'],
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
export function pageMetadata({ locale, title, description, route }: { locale: Locale; title: string; description?: string; route: 'home' | 'menu' | 'drinks' }): Metadata {
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
        ...(item.photo ? { image: absolute(itemImage(item, locale)!.src) } : {}),
        offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'BAM' },
      })),
    })),
  }
}

export function breadcrumbJsonLd(locale: Locale, page: 'menu' | 'drinks' = 'menu') {
  const names = { menu: locale === 'bs' ? 'Meni' : 'Menu', drinks: locale === 'bs' ? 'Pića' : 'Drinks' }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'BEHUT Sarajevo', item: absolute(pagePath(paths.home[locale])) },
      { '@type': 'ListItem', position: 2, name: names[page], item: absolute(pagePath(paths[page][locale])) },
    ],
  }
}

/** Pet pića s fotografijom, opisom iz menija i cijenom; MenuItem je povezan s kafićem kroz @id. */
export function drinksJsonLd(locale: Locale) {
  const url = absolute(pagePath(paths.drinks[locale]))
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: locale === 'bs' ? 'Behut: salep, Behut ledeni čaj, bosanska kafa, pink limunada, espresso' : 'Behut: salep, Behut Ice Tea, Bosnian coffee, pink lemonade, espresso',
    url,
    inLanguage: locale,
    provider: { '@id': absolute('/#cafe') },
    hasMenuSection: [{
      '@type': 'MenuSection',
      name: locale === 'bs' ? 'Naša pića' : 'Our drinks',
      hasMenuItem: drinkContent.map(content => {
        const item = allMenuItems.find(entry => entry.id === content.id)!
        const image = itemImage(item, locale)
        return {
          '@type': 'MenuItem',
          '@id': `${url}#${item.id}`,
          name: tr(item.name, locale),
          description: withPrices(tr(content.lead, locale), locale),
          ...(image ? { image: absolute(image.src) } : {}),
          offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'BAM' },
        }
      }),
    }],
  }
}

export function faqJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: drinkFaq.map(entry => ({
      '@type': 'Question',
      name: tr(entry.q, locale),
      acceptedAnswer: { '@type': 'Answer', text: withPrices(tr(entry.a, locale), locale) },
    })),
  }
}
