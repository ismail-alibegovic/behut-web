import { Header } from '@/components/behut/header'
import { Hero } from '@/components/behut/hero'
import { FeaturedDrinks } from '@/components/behut/featured-drinks'
import { Story } from '@/components/behut/story'
import { MenuCollection } from '@/components/behut/menu-collection'
import { Gallery } from '@/components/behut/gallery'
import { Location, Footer } from '@/components/behut/location-footer'

export default function Page() {
  return <>
    <a className="skip-link" href="#main">Preskoči na sadržaj</a>
    <Header />
    <main id="main">
      <Hero />
      <FeaturedDrinks />
      <Story />
      <MenuCollection />
      <Gallery />
      <Location />
    </main>
    <Footer />
  </>
}
