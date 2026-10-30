import { HomePage } from '@/components/home-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ locale: 'en', title: 'BEHUT Sarajevo — Where are you? At Behut!', route: 'home' })

export default function Page() {
  return <HomePage locale="en" />
}
