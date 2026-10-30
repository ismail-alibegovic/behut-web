import { MenuPage } from '@/components/menu-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  locale: 'bs',
  title: 'Meni i cijene — BEHUT Sarajevo',
  description: 'Cijeli meni Behuta na Kovačima u Sarajevu: bosanska kafa, ledene kafe, tradicionalni sokovi, Behut specijaliteti i kolači, s cijenama.',
  route: 'menu',
})

export default function Page() {
  return <MenuPage locale="bs" />
}
