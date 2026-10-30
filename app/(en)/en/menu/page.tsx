import { MenuPage } from '@/components/menu-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  locale: 'en',
  title: 'Menu and prices — BEHUT Sarajevo',
  description: 'Behut’s full menu at Kovači in Sarajevo: Bosnian coffee, iced coffee, traditional juices, Behut specials and cakes, with prices.',
  route: 'menu',
})

export default function Page() {
  return <MenuPage locale="en" />
}
