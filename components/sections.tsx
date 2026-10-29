import Image from 'next/image'
import { ArrowUpRight, Camera, Lamp, MapPin, Sun } from 'lucide-react'
import { images, siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'
import { BlossomBranch, LeafSprig, SingleBlossom } from './botanical'
import PolaroidLineCarousel from './ui/polaroid-line-carousel'
import { ReviewStack } from './ui/review-stack'
import { reviewSummary, reviews } from '@/data/reviews'

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

export function Reviews() {
  // Bez upisanih recenzija sekcija se ne prikazuje (nikad izmišljene).
  if (!reviews.length) return null
  return <section id="recenzije" className="section reviews" aria-labelledby="recenzije-title" tabIndex={-1}>
    <div className="wrap reviews-grid">
      <div className="reviews-intro reveal">
        <span className="eyebrow">Google recenzije</span>
        <h2 id="recenzije-title">Šta kažu gosti.</h2>
        <a className="reviews-score" href={siteConfig.maps} target="_blank" rel="noreferrer">
          <strong>{reviewSummary.rating.toFixed(1).replace('.', ',')}</strong>
          <span>od 5 · {reviewSummary.count} recenzija na Google Maps <ArrowUpRight size={15} aria-hidden="true" /></span>
          {mapsLabel}
        </a>
      </div>
      <ReviewStack reviews={reviews} href={siteConfig.maps} />
    </div>
  </section>
}

export function InstagramSection() {
  const reels = siteConfig.instagramReels
  return <section id="instagram" className="section" aria-labelledby="instagram-title" tabIndex={-1}>
    <div className="wrap">
      <div className="section-head insta-head reveal">
        <span className="eyebrow">Trenutke ne brojimo. Čuvamo ih.</span>
        <h2 id="instagram-title"><a href={siteConfig.instagram} target="_blank" rel="noreferrer">@behut_cafe <ArrowUpRight size={44} aria-hidden="true" /><span className="sr-only"> (otvara Instagram)</span></a></h2>
        <p>Malo offline, malo na feedu. Povuci konopac ili klikni fotku.</p>
      </div>
    </div>
    <PolaroidLineCarousel slides={reels} initialIndex={Math.max(0, reels.findIndex(reel => reel.featured))} height="clamp(620px, 52vw, 720px)" ariaLabel="Behut reelovi s Instagrama" />
    <div className="wrap">
      <div className="insta-cta"><a className="btn btn-ghost" href={siteConfig.instagram} target="_blank" rel="noreferrer">Prati nas na Instagramu <Camera size={17} aria-hidden="true" /><span className="sr-only"> (otvara Instagram)</span></a></div>
    </div>
  </section>
}

export function Location() {
  return <section id="lokacija" className="section" aria-labelledby="lokacija-title" tabIndex={-1}>
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Lokacija</span>
        <h2 id="lokacija-title">Vidimo se na Kovačima.</h2>
      </div>
      <div className="location-grid">
        <div className="gilded reveal">
          <div className="gilded-inner">
            <BlossomBranch className="gilded-branch" />
            <span className="gilded-name">Behut Coffee shop</span>
            <address><MapPin size={20} aria-hidden="true" /><span>Kovači 20<br />71000 Sarajevo<br />Bosna i Hercegovina</span></address>
            {(siteConfig.openingHours || siteConfig.phone) && <div className="location-details">
              {siteConfig.openingHours && <p>{siteConfig.openingHours}</p>}
              {siteConfig.phone && <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>}
            </div>}
            <a className="btn btn-forest" href={siteConfig.maps} target="_blank" rel="noreferrer">Kako do nas<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span>{mapsLabel}</a>
          </div>
          <Image className="frame-img" src="/images/frames/gilded-frame.webp" alt="" width={648} height={777} sizes="(min-width: 900px) 420px, 90vw" />
        </div>
        <div className="ornate reveal">
          <div className="ornate-map">
            <iframe src={siteConfig.mapsEmbed} title="Mapa: Behut Coffee shop, Kovači 20, Sarajevo" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            {/* Ton mape u bojama sajta; ne prima klikove, mapa ostaje upotrebljiva. */}
            <span className="map-tint" aria-hidden="true" />
          </div>
          <Image className="frame-img" src="/images/frames/ornate-frame.webp" alt="" width={735} height={511} sizes="(min-width: 900px) 760px, 100vw" />
        </div>
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
