import { DrinksPage } from '@/components/drinks-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  locale: 'bs',
  title: 'Salep, bosanska kafa, Behut ledeni čaj — pića u Behutu',
  description: 'Salep, bosanska kafa, Behut ledeni čaj, pink limunada i espresso na Kovačima 20 u Starom Gradu u Sarajevu. Opisi, prave fotografije i cijene.',
  route: 'drinks',
})

export default function Page() {
  return <DrinksPage locale="bs" />
}
