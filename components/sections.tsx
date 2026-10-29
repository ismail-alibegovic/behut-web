import Image from 'next/image'
import { ArrowUpRight, Camera, Lamp, MapPin, Sun } from 'lucide-react'
import { images, siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'
import { BlossomBranch, LeafSprig, SingleBlossom } from './botanical'

const mapsLabel = <span className="sr-only"> (otvara Google Maps)</span>

export function CtaStrip() {
  return <section className="cta-strip dark-torn on-dark" aria-labelledby="cta-title">
    <BlossomBranch className="cta-branch" />
    <LeafSprig className="cta-sprig" />
    <div className="wrap">
      <span className="eyebrow">Kovači 20, Sarajevo</span>
      <h2 id="cta-title">Kafa je na putu? <em>Svrati na Kovače.</em></h2>
      <p>Bez žurbe, bez povoda. Sjedi, naruči i ostani još malo.</p>
      <a className="btn btn-gold" href={siteConfig.maps} target="_blank" rel="noreferrer">Kako do nas<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span>{mapsLabel}</a>
      <ul className="cta-points">
        <li><MapPin size={20} aria-hidden="true" />U srcu Sarajeva</li>
        <li><Sun size={20} aria-hidden="true" />Terasa s pogledom</li>
        <li><Lamp size={20} aria-hidden="true" />Vintage ambijent</li>
      </ul>
    </div>
  </section>
}

export function Story() {
  return <section id="prica" className="section" aria-labelledby="prica-title" tabIndex={-1}>
    <div className="wrap story-grid">
      <h2 id="prica-title" className="story-title reveal"><span>Više od</span> <span>kafe.</span></h2>
      <div className="story-media reveal">
        <BlossomBranch className="story-branch" />
        <figure className="story-frame">
          <span className="story-photo"><SiteImage image={images.interior} sizes="(min-width: 900px) 420px, 70vw" /></span>
          <Image className="story-frame-img" src="/images/frames/green-frame.webp" alt="" width={576} height={768} sizes="(min-width: 900px) 540px, 90vw" />
        </figure>
        <LeafSprig className="story-sprig" />
        <SingleBlossom className="story-blossom" />
      </div>
      <div className="story-copy reveal">
        <h3>Dobrodošli u kafić Behut!</h3>
        <p>U srcu naše čaršije, gdje miris svježe kafe susreće duh tradicije, otvorili smo vrata mjesta gdje ste uvijek među svojima. Ovdje se kafa ne pije na brzinu – ona se ćejfi, uz priču, osmijeh i toplu dobrodošlicu.</p>
        <p>Bilo da ste na prolazu ili ste dio naše raje, kod nas ste uvijek kući. Neka vam svaki gutljaj bude rahatluk, a svaka posjeta razlog da se opet vratite.</p>
        <p className="story-sign">Dobro nam došli!</p>
        <div className="story-facts">
          <div><strong>2024</strong><span>otvorili smo vrata</span></div>
          <div><strong>Kovači 20</strong><span>Sarajevo</span></div>
        </div>
      </div>
    </div>
  </section>
}

const instagramPhotos = [
  { image: images.facade, caption: 'zelena vrata' },
  { image: images.terrace, caption: 'pogled s terase' },
  { image: images.guitar, caption: 'gitara i lampe' },
  { image: images.entrance, caption: 'vidimo se unutra' },
]

export function InstagramSection() {
  return <section id="instagram" className="section" aria-labelledby="instagram-title" tabIndex={-1}>
    <div className="wrap">
      <div className="section-head insta-head reveal">
        <span className="eyebrow">Trenutke ne brojimo. Čuvamo ih.</span>
        <h2 id="instagram-title"><a href={siteConfig.instagram} target="_blank" rel="noreferrer">@behut_cafe <ArrowUpRight size={44} aria-hidden="true" /><span className="sr-only"> (otvara Instagram)</span></a></h2>
        <p>Malo offline, malo na feedu. Prati naš svakodnevni merak.</p>
      </div>
      <div className="insta-row">
        {instagramPhotos.map(({ image, caption }) => <a key={image.src} className="insta-tile" href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label={`${image.alt}. Otvori Behut na Instagramu`}>
          <SiteImage image={image} sizes="(min-width: 900px) 25vw, 45vw" />
          <span className="caption" aria-hidden="true">{caption}</span>
        </a>)}
      </div>
      <div className="insta-cta"><a className="btn btn-forest" href={siteConfig.instagram} target="_blank" rel="noreferrer">Prati nas na Instagramu<span className="btn-icon"><Camera size={17} aria-hidden="true" /></span></a></div>
    </div>
  </section>
}

export function Location() {
  return <section id="lokacija" className="section" aria-labelledby="lokacija-title" tabIndex={-1}>
    <div className="wrap location-grid">
      <div className="location-card reveal">
        <span className="eyebrow">Lokacija</span>
        <h2 id="lokacija-title">Vidimo se <em>na Kovačima.</em></h2>
        <address><MapPin size={22} aria-hidden="true" /><span>Kovači 20<br />71000 Sarajevo, Bosna i Hercegovina</span></address>
        {(siteConfig.openingHours || siteConfig.phone) && <div className="location-details">
          {siteConfig.openingHours && <p>{siteConfig.openingHours}</p>}
          {siteConfig.phone && <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>}
        </div>}
        <div><a className="btn btn-forest" href={siteConfig.maps} target="_blank" rel="noreferrer">Kako do nas<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span>{mapsLabel}</a></div>
        <LeafSprig />
      </div>
      <div className="map-frame reveal">
        <iframe src={siteConfig.mapsEmbed} title="Mapa: Behut, Kovači 20, Sarajevo" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    </div>
  </section>
}

export function Footer() {
  return <footer className="footer on-dark">
    <BlossomBranch />
    <div className="wrap footer-top">
      <div className="footer-intro">
        <p className="footer-tag">Dobra kafa. Dobri ljudi. <em>To je Behut.</em></p>
        <a className="btn btn-gold" href={siteConfig.maps} target="_blank" rel="noreferrer">Kako do nas<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span>{mapsLabel}</a>
      </div>
      <div className="footer-col">
        <h2>Posjeti nas</h2>
        <a href={siteConfig.maps} target="_blank" rel="noreferrer">Kovači 20<br />71000 Sarajevo{mapsLabel}</a>
        {siteConfig.openingHours && <span>{siteConfig.openingHours}</span>}
        {siteConfig.phone && <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>}
      </div>
      <nav className="footer-col" aria-label="Linkovi u podnožju">
        <h2>Istraži</h2>
        <a href="#meni">Meni</a>
        <a href="#prica">Naša priča</a>
        <a href="#galerija">Galerija</a>
        <a href="#lokacija">Lokacija</a>
      </nav>
      <div className="footer-col">
        <h2>Prati nas</h2>
        <a className="footer-social" href={siteConfig.instagram} target="_blank" rel="noreferrer"><Camera size={18} aria-hidden="true" />@behut_cafe<span className="sr-only"> (otvara Instagram)</span></a>
      </div>
    </div>
    <div className="wrap footer-brand">
      <a href="#" className="footer-logo" aria-label="BEHUT Sarajevo, na vrh stranice"><Image src={images.logo} alt="" width={640} height={454} sizes="200px" /></a>
      <div className="footer-wordmark">
        {/* textLength rasteže riječ tačno na širinu kolone, na svakom ekranu. */}
        <svg viewBox="0 0 1000 196" role="img" aria-label="Behut">
          <text x="0" y="190" textLength="1000" lengthAdjust="spacingAndGlyphs">BEHUT</text>
        </svg>
        <span>Sarajevo · Kovači 20 · od 2024.</span>
      </div>
    </div>
    <div className="wrap footer-bottom">
      <span>© {new Date().getFullYear()} BEHUT Sarajevo</span>
      <a href="#">Nazad na vrh ↑</a>
    </div>
  </footer>
}
