import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { localize, siteConfig } from '@/data/site-config'
import { dict, type Locale } from '@/lib/i18n'
import { SiteImage } from './site-image'
import { Topbar } from './topbar'
import { BlossomBranch, LeafSprig, SingleBlossom } from './botanical'

export function Hero({ locale }: { locale: Locale }) {
  const t = dict[locale]
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-backdrop"><SiteImage image={{ ...localize(siteConfig.hero.backdrop, locale), alt: '' }} priority sizes="100vw" /></div>
    <div className="hero-card">
      <span className="hero-beans" aria-hidden="true" />
      <BlossomBranch className="hero-branch" />
      <LeafSprig className="hero-sprig" />
      <SingleBlossom className="hero-blossom" />
      <Topbar locale={locale} />
      <h1 id="hero-title" className="hero-title"><span>{t.hero.line1}</span> <span><em>{t.hero.line2}</em></span></h1>
      <div className="hero-fan">
        {siteConfig.hero.fan.map(image => <figure key={image.src} className="fan-card"><SiteImage image={localize(image, locale)} priority sizes="(min-width: 1200px) 320px, 30vw" /></figure>)}
      </div>
      <div className="hero-foot">
        <p>{t.hero.lead}</p>
        <div className="hero-actions">
          <a className="btn btn-forest" href="#meni">{t.hero.cta}<span className="btn-icon"><ArrowDownRight size={17} aria-hidden="true" /></span></a>
          <a className="btn btn-ghost" href={siteConfig.maps} target="_blank" rel="noreferrer">{t.directions} <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only">{t.opensMaps}</span></a>
        </div>
      </div>
    </div>
  </section>
}
