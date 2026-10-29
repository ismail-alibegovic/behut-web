import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'
import { Topbar } from './topbar'
import { BlossomBranch, LeafSprig, SingleBlossom } from './botanical'

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-backdrop"><SiteImage image={{ ...siteConfig.hero.backdrop, alt: '' }} priority sizes="100vw" /></div>
    <div className="hero-card">
      <span className="hero-beans" aria-hidden="true" />
      <BlossomBranch className="hero-branch" />
      <LeafSprig className="hero-sprig" />
      <SingleBlossom className="hero-blossom" />
      <Topbar />
      <h1 id="hero-title" className="hero-title"><span>Gdje si?</span> <span><em>U Behutu</em></span></h1>
      <div className="hero-fan">
        {siteConfig.hero.fan.map(image => <figure key={image.src} className="fan-card"><SiteImage image={image} priority sizes="(min-width: 1200px) 320px, 30vw" /></figure>)}
      </div>
      <div className="hero-foot">
        <p>Jedna sarajevska adresa na Kovačima. Hiljadu razloga da ostaneš još malo.</p>
        <div className="hero-actions">
          <a className="btn btn-forest" href="#meni">Pogledaj meni<span className="btn-icon"><ArrowDownRight size={17} aria-hidden="true" /></span></a>
          <a className="btn btn-ghost" href={siteConfig.maps} target="_blank" rel="noreferrer">Kako do nas <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (otvara Google Maps)</span></a>
        </div>
      </div>
    </div>
  </section>
}
