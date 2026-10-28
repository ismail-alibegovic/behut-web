import { ArrowUpRight, MapPin } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { SiteImage } from '../site-image'
import { Ornament } from './ornament'

export function Hero() {
  const { main, left, right } = siteConfig.hero
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-grid wrap">
      <div className="hero-copy">
        <span className="label reveal">Kafa · Sarajevo · Merak</span>
        <h1 id="hero-title" className="hero-title reveal">
          <span className="hero-line">Malo kafe.</span>
          <span className="hero-line hero-line--indent">Puno <em>meraka.</em></span>
        </h1>
        <Ornament className="hero-ornament reveal" />
        <p className="hero-lede reveal">Jedna sarajevska adresa na Kovačima. Bosanska kafa, stari detalji i terasa s pogledom na grad. Ovdje se ne žuri.</p>
        <div className="hero-actions reveal">
          <a className="btn btn--primary" href="#meni">Pogledaj meni <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a className="btn btn--ghost" href={siteConfig.maps} target="_blank" rel="noreferrer"><MapPin size={15} aria-hidden="true" /> Kako do nas</a>
        </div>
      </div>

      <div className="hero-collage">
        <figure className="hero-photo hero-photo--main reveal-photo">
          <div className="hero-photo-frame"><SiteImage image={main} priority sizes="(max-width: 960px) 80vw, 40vw" /></div>
          <figcaption><span>Terasa</span> Kovači 20, Sarajevo</figcaption>
        </figure>
        <figure className="hero-photo hero-photo--left reveal-photo">
          <div className="hero-photo-frame"><SiteImage image={left} priority sizes="(max-width: 960px) 40vw, 18vw" /></div>
          <figcaption>Zelena vrata</figcaption>
        </figure>
        <figure className="hero-photo hero-photo--right reveal-photo">
          <div className="hero-photo-frame"><SiteImage image={right} priority sizes="(max-width: 960px) 40vw, 20vw" /></div>
          <figcaption>Vidimo se unutra.</figcaption>
        </figure>
        <span className="hero-coords" aria-hidden="true">43°51′ N · 18°25′ E</span>
      </div>
    </div>
    <div className="hero-foot wrap">
      <span>Est. 2024</span>
      <span className="hero-foot-rule" aria-hidden="true" />
      <span>Bez žurbe. Bez povoda. Baš kako treba.</span>
    </div>
  </section>
}
