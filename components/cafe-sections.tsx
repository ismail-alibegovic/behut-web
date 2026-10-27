import { ArrowDown, ArrowUpRight, Camera, MapPin } from 'lucide-react'
import { images, siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'

export function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-meta">
        <span>KAFA. SARAJEVO. MERAK.</span>
        <span>EST. 2024 / KOVAČI 20</span>
      </div>

      <div className="hero-stage">
        <div className="hero-copy">
          <h1>
            MALO KAFE.<br />
            PUNO<br />
            <em>meraka.</em>
          </h1>
          <p>
            Jedna sarajevska adresa.<br />
            Hiljadu razloga da ostaneš još malo.
          </p>
          <div className="hero-actions">
            <a className="pill" href="#meni">
              <span>Pronađi svoj ritual</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <figure className="hero-dominant">
          <SiteImage image={siteConfig.hero.main} priority />
          <figcaption>SARAJEVO, IZ NAŠEG UGLA.</figcaption>
        </figure>

        <figure className="hero-crop-one">
          <SiteImage image={siteConfig.hero.left} priority />
        </figure>

        <figure className="hero-crop-two">
          <SiteImage image={siteConfig.hero.right} priority />
          <figcaption>Vidimo se unutra.</figcaption>
        </figure>

        <span className="hero-handwriting">
          <span>tvoje mjesto na Kovačima</span>
          <ArrowUpRight size={20} />
        </span>

        <a href="#ritual" className="round-link hero-down" aria-label="Otkrij naše rituale">
          <ArrowDown size={20} />
        </a>
      </div>

      <div className="hero-bottom">
        <span>BEZ ŽURBE. BEZ POVODA. BAŠ KAKO TREBA.</span>
        <a href={siteConfig.maps} target="_blank" rel="noreferrer">
          <span>Kovači 20, Sarajevo</span>
          <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  )
}

export function Story() {
  return (
    <section id="prica" className="story-section">
      <div className="wrap">
        <div className="story-intro">
          <span className="eyebrow">02 / NAŠA PRIČA</span>
          <h2>
            Nismo samo<br />
            mjesto za kafu.<br />
            <em>Mi smo onaj osjećaj.</em>
          </h2>
        </div>

        <div className="story-scene">
          <figure className="story-wide">
            <SiteImage image={images.interior} />
            <figcaption>Stare stvari. Novi omiljeni trenuci.</figcaption>
          </figure>

          <div className="story-note">
            <span className="eyebrow">DOBRO DOŠLI U BEHUT.</span>
            <p>
              Na Kovačima, među sarajevskim ulicama i poznatim pogledima, Behut je mjesto za kafu,
              razgovor i malo predaha.
            </p>
            <p>
              Starinske lampe, zelena vrata i detalji koji bude uspomene. Ovdje se ne žuri. Ovdje se
              sjedi još malo.
            </p>
            <a className="text-link" href="#galerija">
              <span>Uđi, raskomoti se</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          <span className="story-script" aria-hidden="true">
            još jednu?
          </span>
        </div>
      </div>
    </section>
  )
}

export function InstagramSection() {
  return (
    <section className="instagram-section">
      <div className="wrap instagram-heading">
        <span className="eyebrow">TRENUTKE NE BROJIMO. ČUVAMO IH.</span>
        <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
          <h2>@behut_cafe</h2>
          <ArrowUpRight size={38} />
        </a>
      </div>

      <div className="social-collage">
        <a
          className="social-photo"
          href={siteConfig.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Fotografije Behuta na Instagramu"
        >
          <SiteImage image={images.facade} />
        </a>

        <a className="social-note" href={siteConfig.instagram} target="_blank" rel="noreferrer">
          <div className="social-note-top">
            <Camera size={30} />
            <span>
              Malo offline.<br />
              <em>Malo na feedu.</em>
            </span>
          </div>
          <span className="text-link">
            <span>Prati naš svakodnevni merak</span>
            <ArrowUpRight size={16} />
          </span>
        </a>

        <a
          className="social-photo social-detail"
          href={siteConfig.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Detalji Behuta na Instagramu"
        >
          <SiteImage image={images.entrance} />
        </a>
      </div>
    </section>
  )
}

export function LocationAndFooter() {
  return (
    <>
      <section id="lokacija" className="location">
        <SiteImage image={images.city} />
        <div className="location-overlay wrap">
          <span className="eyebrow">NEKE ADRESE POSTANU NAVIKA.</span>
          <h2>
            VIDIMO SE<br />
            NA <em>Kovačima.</em>
          </h2>

          <div className="location-bottom">
            <address>
              <MapPin size={22} />
              <span>
                <strong>Kovači 20</strong><br />
                71000 Sarajevo, Bosna i Hercegovina
              </span>
            </address>

            <a className="pill gold" href={siteConfig.maps} target="_blank" rel="noreferrer">
              <span>Pokaži mi put</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          {siteConfig.openingHours && <p className="location-hours">{siteConfig.openingHours}</p>}
          {siteConfig.phone && (
            <a className="location-phone" href={`tel:${siteConfig.phone}`}>
              {siteConfig.phone}
            </a>
          )}
        </div>
      </section>

      <footer>
        <div className="wrap footer-top">
          <div className="footer-brand">
            <a href="#" className="logo-window footer-logo" aria-label="Behut Sarajevo — na vrh">
              <img src={images.logo} alt="BEHUT Sarajevo" />
            </a>
            <p className="footer-tagline">
              Dobra kafa. Dobri ljudi.<br />
              <em>To je Behut.</em>
            </p>
          </div>

          <div className="footer-actions">
            <a
              className="footer-action-link"
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <span>Instagram @behut_cafe</span>
              <ArrowUpRight size={15} />
            </a>
            <a
              className="footer-action-link"
              href={siteConfig.maps}
              target="_blank"
              rel="noreferrer"
            >
              <span>Kovači 20, Sarajevo</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} BEHUT Sarajevo. Sva prava zadržana.</span>
          <span>KOVAČI 20 · STARI GRAD SARAJEVO</span>
          <a href="#" className="back-to-top">
            NAZAD NA VRH ↑
          </a>
        </div>
      </footer>
    </>
  )
}
