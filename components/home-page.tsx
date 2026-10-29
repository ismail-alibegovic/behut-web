import { dict, type Locale } from '@/lib/i18n'
import { Hero } from './hero'
import { DrinkShowcase } from './drink-showcase'
import { MenuGrid } from './menu-grid'
import { Gallery } from './gallery'
import { CtaStrip, Story, Reviews, InstagramSection, Location, Footer } from './sections'

export function HomePage({ locale }: { locale: Locale }) {
  return <>
    <a className="skip-link" href="#main">{dict[locale].skip}</a>
    <Hero locale={locale} />
    <main id="main" tabIndex={-1}>
      <DrinkShowcase locale={locale} />
      <MenuGrid locale={locale} />
      <CtaStrip locale={locale} />
      <Story locale={locale} />
      <Reviews locale={locale} />
      <Gallery locale={locale} />
      <InstagramSection locale={locale} />
      <Location locale={locale} />
    </main>
    <Footer locale={locale} />
  </>
}
