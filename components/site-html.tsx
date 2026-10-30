import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { Figtree, Young_Serif } from 'next/font/google'
import { type Locale } from '@/lib/i18n'
import { siteMetadata } from '@/lib/seo'
import '@/app/globals.css'

const display = Young_Serif({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--font-display', display: 'swap' })
const sans = Figtree({ subsets: ['latin', 'latin-ext'], variable: '--font-body', display: 'swap' })

export { siteMetadata }
export const siteViewport: Viewport = { colorScheme: 'light', themeColor: '#103225' }

/** Zajednički <html> za oba jezika; svaka jezička grupa ruta ima svoj root layout s ovim. */
export function SiteHtml({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  // Browser extensions inject webcrx attributes on html before hydration.
  return <html lang={locale} suppressHydrationWarning className={`${display.variable} ${sans.variable}`}><body>{children}{process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_STATIC_EXPORT && <Analytics />}</body></html>
}
