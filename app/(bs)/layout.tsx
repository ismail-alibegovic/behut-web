import { SiteHtml, siteMetadata, siteViewport } from '@/components/site-html'

export const metadata = siteMetadata('bs')
export const viewport = siteViewport

export default function BosnianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteHtml locale="bs">{children}</SiteHtml>
}
