import { DrinksPage } from '@/components/drinks-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  locale: 'en',
  title: 'Salep, Bosnian coffee, Behut Ice Tea — drinks at Behut',
  description: 'Salep, Bosnian coffee, Behut Ice Tea, pink lemonade and espresso at Kovači 20 in Sarajevo’s Old Town (Stari Grad). Descriptions, real photos and prices.',
  route: 'drinks',
})

export default function Page() {
  return <DrinksPage locale="en" />
}
