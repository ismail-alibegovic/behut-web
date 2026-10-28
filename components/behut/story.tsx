import { ArrowUpRight } from 'lucide-react'
import { images } from '@/data/site-config'
import { SiteImage } from '../site-image'
import { Ornament } from './ornament'

export function Story() {
  return <section id="prica" className="story" aria-labelledby="story-title">
    <div className="wrap story-grid">
      <div className="story-head section-head">
        <span className="label"><span className="label-index">02</span>Naša priča</span>
        <h2 id="story-title">Nismo samo mjesto za kafu. <em>Mi smo onaj osjećaj.</em></h2>
      </div>

      <figure className="story-photo">
        <div className="story-photo-frame"><SiteImage image={images.interior} sizes="(max-width: 960px) 90vw, 50vw" /></div>
        <figcaption><span className="label">Salon</span> Stare stvari. Novi omiljeni trenuci.</figcaption>
      </figure>

      <figure className="story-detail">
        <div className="story-photo-frame"><SiteImage image={images.guitar} sizes="(max-width: 960px) 45vw, 20vw" /></div>
      </figure>

      <div className="story-copy">
        <p className="story-lead">Dobro došli u Behut.</p>
        <p>Na Kovačima, među sarajevskim ulicama i poznatim pogledima, Behut je mjesto za kafu, razgovor i malo predaha.</p>
        <p>Starinske lampe, zelena vrata i detalji koji bude uspomene. Ovdje se ne žuri. Ovdje se sjedi još malo.</p>
        <Ornament className="story-ornament" />
        <a className="link-underline" href="#galerija">Uđi, raskomoti se <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </div>
  </section>
}
