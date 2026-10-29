import type { Metadata } from 'next'
import { MenuPage } from '@/components/menu-page'
import { paths } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Menu — BEHUT Sarajevo',
  description: 'Behut’s full menu: Bosnian coffee, iced coffee, traditional juices, Behut specials and cakes, with prices.',
  alternates: { canonical: paths.menu.en, languages: { bs: paths.menu.bs, en: paths.menu.en } },
}

export default function Page() {
  return <MenuPage locale="en" />
}
