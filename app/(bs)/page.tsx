import { HomePage } from '@/components/home-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ locale: 'bs', title: 'BEHUT Sarajevo — Gdje si? U Behutu!', route: 'home' })

export default function Page() {
  return <HomePage locale="bs" />
}
