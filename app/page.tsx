import { Header, FeaturedDrinks, CafeMenu, Gallery } from '@/components/cafe-interactive'
import { Hero, Story, InstagramSection, LocationAndFooter } from '@/components/cafe-sections'

export default function Page() {
  return <><a className="skip-link" href="#main">Preskoči na sadržaj</a><Header /><main id="main"><Hero /><FeaturedDrinks /><Story /><CafeMenu /><Gallery /><InstagramSection /><LocationAndFooter /></main></>
}
