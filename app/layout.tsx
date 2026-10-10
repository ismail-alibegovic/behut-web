import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'

const serif = Cormorant_Garamond({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-editorial', display: 'swap' })
const sans = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-body', display: 'swap' })
export const metadata: Metadata = {
  title: 'BEHUT Sarajevo — Kafa s pogledom. Sarajevo s dušom.',
  description: 'U srcu Sarajeva, na Kovačima 20. Otkrijte Behut, našu terasu, vintage ambijent i bosansku kafu. Za trenutke koji ostaju.',
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#103C2F' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Browser extensions inject webcrx attributes on html before hydration.
  return <html lang="bs" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
