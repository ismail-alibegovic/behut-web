import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope, Pinyon_Script } from 'next/font/google'
import './globals.css'

const display = Fraunces({ subsets: ['latin', 'latin-ext'], axes: ['SOFT', 'WONK', 'opsz'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' })
const sans = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-body', display: 'swap' })
// Samo za dekorativno slovo u pozadini heroja.
const script = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--font-script', display: 'swap', preload: false })

export const metadata: Metadata = {
  title: 'BEHUT Sarajevo — Malo kafe. Puno meraka.',
  description: 'U srcu Sarajeva, na Kovačima 20. Otkrijte Behut, našu terasu, vintage ambijent i bosansku kafu. Za trenutke koji ostaju.',
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#103225' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Browser extensions inject webcrx attributes on html before hydration.
  return <html lang="bs" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${script.variable}`}><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
