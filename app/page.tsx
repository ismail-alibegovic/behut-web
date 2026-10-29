import { Hero } from '@/components/hero'
import { DrinkShowcase } from '@/components/drink-showcase'
import { MenuGrid } from '@/components/menu-grid'
import { Gallery } from '@/components/gallery'
import { CtaStrip, Story, InstagramSection, Location, Footer } from '@/components/sections'

export default function Page() {
  return <>
    <a className="skip-link" href="#main">Preskoči na sadržaj</a>
    <Hero />
    <main id="main" tabIndex={-1}>
      <DrinkShowcase />
      <MenuGrid />
      <CtaStrip />
      <Story />
      <Gallery />
      <InstagramSection />
      <Location />
    </main>
    <Footer />
  </>
}
