import { ArrowDown, ArrowUpRight, Camera, MapPin } from 'lucide-react'
import { images, siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'
import {
  CoffeeBeansCluster,
  CoffeeBranchSilhouette,
  RoseBloomSilhouette,
} from './cafe-silhouettes'

export function Hero() {
  return (
    <section className="hero wrap">
      {/* Subtle Botanical & Coffee Silhouettes in the Hero Canvas */}
      <RoseBloomSilhouette className="bg-silhouette hero-rose-silhouette" />
      <CoffeeBranchSilhouette className="bg-silhouette hero-branch-silhouette" flip />
      <CoffeeBeansCluster className="bg-silhouette hero-beans-silhouette" />

      <div className="hero-meta">
        <span className="hero-meta-left">
          <span className="meta-dot" aria-hidden="true" />
          KAFA · SARAJEVO · MERAK
        </span>
        <span>EST. 2024 / KOVAČI 20, STARI GRAD</span>
      </div>

      <div className="hero-stage">
        <div className="hero-copy">
          <span className="hero-kicker">AUTENTIČNI SARAJEVSKI CAFÉ &amp; TERASA</span>
          <h1>
            MALO KAFE.<br />
            PUNO<br />
            <em>meraka.</em>
          </h1>
          <p className="hero-lead">
            Jedna sarajevska adresa na staroj kaldrmi Kovača. Hiljadu razloga da usporiš, naručiš
            fildžan kafe i ostaneš još malo.
          </p>
          <div className="hero-actions">
            <a className="pill" href="#meni">
              <span>Pronađi svoj ritual</span>
              <span className="pill-icon-circle" aria-hidden="true">
                <ArrowUpRight size={15} />
              </span>
            </a>
            <a className="text-link hero-secondary-link" href="#prica">
              <span>Naša priča</span>
              <ArrowUpRight size={16} />
            </a>
            <a href="#ritual" className="round-link hero-down" aria-label="Otkrij naše rituale">
              <ArrowDown size={18} />
            </a>
          </div>
        </div>

        <figure className="hero-dominant">
          <SiteImage image={siteConfig.hero.main} priority />
          <figcaption>SARAJEVO, IZ NAŠEG UGLA · KOVAČI 20</figcaption>
        </figure>

        <figure className="hero-crop-one">
          <SiteImage image={siteConfig.hero.left} priority />
        </figure>

        <figure className="hero-crop-two">
          <SiteImage image={siteConfig.hero.right} priority />
          <figcaption>Vidimo se unutra.</figcaption>
        </figure>

        <a href="#lokacija" className="hero-handwriting">
          <span className="handwriting-pin" aria-hidden="true" />
          <span>tvoje mjesto na Kovačima</span>
          <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="hero-bottom">
        <span>BEZ ŽURBE. BEZ POVODA. BAŠ KAKO TREBA.</span>
        <a href={siteConfig.maps} target="_blank" rel="noreferrer">
          <span>Kovači 20, Sarajevo — Otvori mapu</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  )
}

export function Story() {
  return (
    <section id="prica" className="story-section">
      {/* Subtle Rose & Coffee Branch Silhouettes */}
      <RoseBloomSilhouette className="bg-silhouette story-rose-silhouette" flip />
      <CoffeeBranchSilhouette className="bg-silhouette story-coffee-silhouette" />

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
            <div className="story-photo-wrap">
              <SiteImage image={images.interior} />
            </div>
            <figcaption>Stare stvari. Novi omiljeni trenuci u našem toplom salonu.</figcaption>
          </figure>

          <div className="story-note">
            <span className="eyebrow">DOBRO DOŠLI U BEHUT.</span>
            <p className="story-lead-p">
              Na Kovačima, među starim sarajevskim ulicama i pogledima koji pamte generacije, Behut
              je stvoren za pravu kafu, tih razgovor i predah od svakodnevnice.
            </p>
            <p>
              Starinske lampe sa resama, prepoznatljiva zelena vrata, miris domaće ruže i detalji
              koji bude uspomene. Ovdje se nikuda ne žuri — ovdje se sjedi još malo.
            </p>

            <div className="story-pillars">
              <div className="story-pillar-item">
                <strong>Fildžan &amp; džezva</strong>
                <span>Tradicija s merakom</span>
              </div>
              <div className="story-pillar-item">
                <strong>Domaća ruža &amp; zova</strong>
                <span>Prirodni sarajevski sokovi</span>
              </div>
              <div className="story-pillar-item">
                <strong>Terasa na Kovačima</strong>
                <span>Pogled na krovove čaršije</span>
              </div>
            </div>

            <a className="text-link" href="#galerija">
              <span>Uđi, raskomoti se</span>
              <ArrowUpRight size={17} />
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
      <CoffeeBeansCluster className="bg-silhouette insta-beans-silhouette" />
      <RoseBloomSilhouette className="bg-silhouette insta-rose-silhouette" />

      <div className="wrap instagram-heading">
        <span className="eyebrow">05 / TRENUTKE NE BROJIMO. ČUVAMO IH.</span>
        <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
          <h2>@behut_cafe</h2>
          <span className="insta-arrow-circle" aria-hidden="true">
            <ArrowUpRight size={32} />
          </span>
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
          <RoseBloomSilhouette className="social-note-watermark" />
          <div className="social-note-top">
            <div className="social-camera-badge">
              <Camera size={22} />
              <span>BEHUT DNEVNIK</span>
            </div>
            <span className="social-quote">
              Malo offline.<br />
              <em>Malo na feedu.</em>
            </span>
            <p className="social-subtext">
              Jutarnje sunce na terasi, miris pržene kafe i priče sa Kovača 20.
            </p>
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
          <span className="eyebrow">06 / NEKE ADRESE POSTANU NAVIKA</span>
          <h2>
            VIDIMO SE<br />
            NA <em>Kovačima.</em>
          </h2>
          <p className="location-lead">
            Samo nekoliko koraka iznad Baščaršije — svrati na kafu s pogledom, domaći sok od ruže
            ili mirno popodne u našem salonu.
          </p>

          <div className="location-bottom">
            <address>
              <span className="address-pin-circle" aria-hidden="true">
                <MapPin size={20} />
              </span>
              <span>
                <strong>Kovači 20</strong><br />
                71000 Sarajevo, Bosna i Hercegovina
              </span>
            </address>

            <a className="pill gold" href={siteConfig.maps} target="_blank" rel="noreferrer">
              <span>Pokaži mi put na mapi</span>
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

      <footer className="site-footer">
        <CoffeeBranchSilhouette className="bg-silhouette footer-coffee-silhouette" />
        <RoseBloomSilhouette className="bg-silhouette footer-rose-silhouette" flip />

        <div className="wrap footer-top">
          <div className="footer-brand">
            <a href="#" className="logo-window footer-logo" aria-label="Behut Sarajevo — na vrh">
              <img src={images.logo} alt="BEHUT Sarajevo" />
            </a>
            <div className="footer-tagline-wrap">
              <p className="footer-tagline">
                Dobra kafa. Dobri ljudi.<br />
                <em>To je Behut.</em>
              </p>
              <span className="footer-sub">Kovači 20 · Stari Grad Sarajevo · Est. 2024</span>
            </div>
          </div>

          <div className="footer-actions">
            <a className="footer-action-link" href="#prica">
              <span>Naša priča</span>
            </a>
            <a className="footer-action-link" href="#meni">
              <span>Meni</span>
            </a>
            <a className="footer-action-link" href="#galerija">
              <span>Galerija</span>
            </a>
            <a
              className="footer-action-link is-external"
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <span>Instagram @behut_cafe</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              className="footer-action-link is-external"
              href={siteConfig.maps}
              target="_blank"
              rel="noreferrer"
            >
              <span>Google Maps</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} BEHUT Sarajevo. Sva prava zadržana.</span>
          <span>KAFA · DOMAĆI SOKOVI · MERAK NA KOVAČIMA</span>
          <a href="#" className="back-to-top">
            NAZAD NA VRH ↑
          </a>
        </div>
      </footer>
    </>
  )
}
