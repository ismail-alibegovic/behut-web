import type { Metadata } from 'next'
import QRCode from 'qrcode'
import { siteConfig } from '@/data/site-config'
import { paths } from '@/lib/i18n'
import { pagePath } from '@/lib/seo'
import { LogoMark } from '@/components/logo-mark'

export const metadata: Metadata = { title: 'QR kod za meni — BEHUT Sarajevo', robots: { index: false, follow: false }, alternates: { canonical: pagePath(paths.qr.bs) } }

// Boje QR koda su tokeni --forest i providna pozadina; QR se crta pri buildu, bez JS-a u pregledniku.
const FOREST = '#103225'

const codes = [
  { label: 'Meni', sub: 'Skeniraj i pogledaj meni', url: siteConfig.siteUrl + paths.menu.bs },
  { label: 'Menu', sub: 'Scan to see the menu', url: siteConfig.siteUrl + paths.menu.en },
]

/** Stranica za štampu: dvije kartice s QR kodom (bosanski i engleski meni) za stolove. */
export default async function Page() {
  const svgs = await Promise.all(codes.map(code => QRCode.toString(code.url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: FOREST, light: '#0000' } })))
  return <main className="qr-page">
    <p className="qr-hint">Odštampaj ovu stranicu (Cmd/Ctrl + P) i izreži kartice za stolove. Kodovi vode na {siteConfig.siteUrl}.</p>
    <div className="qr-grid">
      {codes.map((code, i) => <section key={code.url} className="qr-card" aria-label={code.label}>
        <LogoMark className="qr-logo" />
        <h1>{code.label}</h1>
        <div className="qr-code" dangerouslySetInnerHTML={{ __html: svgs[i] }} />
        <p>{code.sub}</p>
        <small>{code.url.replace('https://', '')}</small>
      </section>)}
    </div>
  </main>
}
