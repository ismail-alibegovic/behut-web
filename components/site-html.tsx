import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Figtree, Young_Serif } from 'next/font/google'
import { siteConfig } from '@/data/site-config'
import { paths, type Locale } from '@/lib/i18n'
import '@/app/globals.css'

const display = Young_Serif({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--font-display', display: 'swap' })
const sans = Figtree({ subsets: ['latin', 'latin-ext'], variable: '--font-body', display: 'swap' })

const descriptions = {
  bs: 'U srcu Sarajeva, na Kovačima 20. Otkrijte Behut, našu terasu, vintage ambijent i bosansku kafu. Za trenutke koji ostaju.',
  en: 'In the heart of Sarajevo, at Kovači 20. Discover Behut, our terrace, vintage atmosphere and Bosnian coffee. For moments that stay.',
}

export const siteMetadata = (locale: Locale): Metadata => ({
  metadataBase: new URL(siteConfig.siteUrl),
  title: locale === 'bs' ? 'BEHUT Sarajevo — Gdje si? U Behutu!' : 'BEHUT Sarajevo — Where are you? At Behut!',
  description: descriptions[locale],
  alternates: { canonical: paths.home[locale], languages: { bs: paths.home.bs, en: paths.home.en } },
  openGraph: { title: 'BEHUT Sarajevo', description: descriptions[locale], locale: locale === 'bs' ? 'bs_BA' : 'en_GB', type: 'website' },
})

export const siteViewport: Viewport = { colorScheme: 'light', themeColor: '#103225' }

/** Zajednički <html> za oba jezika; svaka jezička grupa ruta ima svoj root layout s ovim. */
export function SiteHtml({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  // Browser extensions inject webcrx attributes on html before hydration.
  return <html lang={locale} suppressHydrationWarning className={`${display.variable} ${sans.variable}`}><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
