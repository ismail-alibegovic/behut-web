import { SiteHtml, siteMetadata, siteViewport } from '@/components/site-html'

export const metadata = siteMetadata('en')
export const viewport = siteViewport

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteHtml locale="en">{children}</SiteHtml>
}
