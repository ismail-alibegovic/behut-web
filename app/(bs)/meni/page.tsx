import type { Metadata } from 'next'
import { MenuPage } from '@/components/menu-page'
import { paths } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Meni — BEHUT Sarajevo',
  description: 'Cijeli meni Behuta: bosanska kafa, ledene kafe, tradicionalni sokovi, Behut specijaliteti i kolači, s cijenama.',
  alternates: { canonical: paths.menu.bs, languages: { bs: paths.menu.bs, en: paths.menu.en } },
}

export default function Page() {
  return <MenuPage locale="bs" />
}
