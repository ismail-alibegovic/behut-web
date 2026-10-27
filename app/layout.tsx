import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const serif = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  display: 'swap',
})

const sans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BEHUT Sarajevo — Kafa s pogledom. Sarajevo s dušom.',
  description:
    'U srcu Sarajeva, na Kovačima 20. Otkrijte Behut, našu terasu, vintage ambijent, domaći sok od ruže i bosansku kafu. Za trenutke koji ostaju.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#173E30',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Browser extensions inject webcrx attributes on html before hydration.
  return (
    <html lang="bs" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
