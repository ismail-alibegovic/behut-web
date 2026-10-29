import Image from 'next/image'
import { ArrowUpRight, Camera, Lamp, MapPin, Sun } from 'lucide-react'
import { images, localize, siteConfig } from '@/data/site-config'
import { dict, tr, type Locale } from '@/lib/i18n'
import { SiteImage } from './site-image'
import { BlossomBranch, LeafSprig, SingleBlossom } from './botanical'
import PolaroidLineCarousel from './ui/polaroid-line-carousel'
import { LogoMark } from './logo-mark'
import { ReviewStack } from './ui/review-stack'
import { RateUs } from './ui/rate-us'
import { reviewSummary, reviews } from '@/data/reviews'


export function CtaStrip({ locale }: { locale: Locale }) {
  const t = dict[locale]
  return <section className="cta-strip dark-torn on-dark beans" aria-labelledby="cta-title">
    <BlossomBranch className="cta-branch" />
    <LeafSprig className="cta-sprig" />
    <div className="wrap">
      <span className="eyebrow">{t.cta.eyebrow}</span>
      <h2 id="cta-title">{t.cta.title} <em>{t.cta.titleEm}</em></h2>
      <p>{t.cta.lead}</p>
      <a className="btn btn-gold" href={siteConfig.maps} target="_blank" rel="noreferrer">{t.directions}<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span><span className="sr-only">{t.opensMaps}</span></a>
      <ul className="cta-points">
        <li><MapPin size={20} aria-hidden="true" />{t.cta.points[0]}</li>
        <li><Sun size={20} aria-hidden="true" />{t.cta.points[1]}</li>
        <li><Lamp size={20} aria-hidden="true" />{t.cta.points[2]}</li>
      </ul>
    </div>
  </section>
}

export function Story({ locale }: { locale: Locale }) {
  const t = dict[locale].story
  return <section id="prica" className="section" aria-labelledby="prica-title" tabIndex={-1}>
    <div className="wrap story-grid">
      <h2 id="prica-title" className="story-title reveal"><span>{t.title1}</span> <span>{t.title2}</span></h2>
      <div className="story-media reveal">
        <BlossomBranch className="story-branch" />
        <figure className="story-frame">
          <span className="story-photo"><SiteImage image={localize(images.interior, locale)} sizes="(min-width: 900px) 420px, 70vw" /></span>
          <Image className="story-frame-img" src="/images/frames/green-frame.webp" alt="" width={576} height={768} sizes="(min-width: 900px) 540px, 90vw" />
        </figure>
        <LeafSprig className="story-sprig" />
        <SingleBlossom className="story-blossom" />
      </div>
      <div className="story-copy reveal">
        <h3>{t.heading}</h3>
        <p>{t.p1}</p>
        <p>{t.p2}</p>
        <p className="story-sign">{t.sign}</p>
        <div className="story-facts">
          <div><strong>2024</strong><span>{t.opened}</span></div>
          <div><strong>Kovači 20</strong><span>Sarajevo</span></div>
        </div>
      </div>
    </div>
  </section>
}

export function Reviews({ locale }: { locale: Locale }) {
  const t = dict[locale]
  // Bez upisanih recenzija sekcija se ne prikazuje (nikad izmišljene).
  if (!reviews.length) return null
  return <section id="recenzije" className="section reviews" aria-labelledby="recenzije-title" tabIndex={-1}>
    <div className="wrap reviews-grid">
      <div className="reviews-intro reveal">
        <span className="eyebrow">{t.reviews.eyebrow}</span>
        <h2 id="recenzije-title">{t.reviews.title}</h2>
        <a className="reviews-score" href={siteConfig.maps} target="_blank" rel="noreferrer">
          <strong>{locale === 'bs' ? reviewSummary.rating.toFixed(1).replace('.', ',') : reviewSummary.rating.toFixed(1)}</strong>
          <span>{t.reviews.of(reviewSummary.count)} <ArrowUpRight size={15} aria-hidden="true" /></span>
          <span className="sr-only">{t.opensMaps}</span>
        </a>
        <RateUs href={siteConfig.maps} locale={locale} />
      </div>
      <ReviewStack reviews={reviews} href={siteConfig.maps} locale={locale} />
    </div>
  </section>
}

export function InstagramSection({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const reels = siteConfig.instagramReels.map(reel => ({ reel: reel.reel, title: tr(reel.title, locale), caption: reel.caption && tr(reel.caption, locale), featured: reel.featured }))
  return <section id="instagram" className="section" aria-labelledby="instagram-title" tabIndex={-1}>
    <div className="wrap">
      <div className="section-head insta-head reveal">
        <span className="eyebrow">{t.instagram.eyebrow}</span>
        <h2 id="instagram-title"><a href={siteConfig.instagram} target="_blank" rel="noreferrer">@behut_cafe <ArrowUpRight size={44} aria-hidden="true" /><span className="sr-only">{t.opensInstagram}</span></a></h2>
        <p>{t.instagram.lead}</p>
      </div>
    </div>
    <PolaroidLineCarousel slides={reels} initialIndex={Math.max(0, reels.findIndex(reel => reel.featured))} height="clamp(620px, 52vw, 720px)" ariaLabel={t.instagram.carousel} locale={locale} />
    <div className="wrap">
      <div className="insta-cta"><a className="btn btn-ghost" href={siteConfig.instagram} target="_blank" rel="noreferrer">{t.instagram.follow} <Camera size={17} aria-hidden="true" /><span className="sr-only">{t.opensInstagram}</span></a></div>
    </div>
  </section>
}

export function Location({ locale }: { locale: Locale }) {
  const t = dict[locale]
  return <section id="lokacija" className="section" aria-labelledby="lokacija-title" tabIndex={-1}>
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">{t.location.eyebrow}</span>
        <h2 id="lokacija-title">{t.location.title}</h2>
      </div>
      <div className="location-grid">
        <div className="gilded reveal">
          <div className="gilded-inner">
            <BlossomBranch className="gilded-branch" />
            <span className="gilded-name">Behut Coffee shop</span>
            <address><MapPin size={20} aria-hidden="true" /><span>Kovači 20<br />71000 Sarajevo<br />{t.location.country}</span></address>
            {(siteConfig.openingHours || siteConfig.phone) && <div className="location-details">
              {siteConfig.openingHours && <p>{tr(siteConfig.openingHours, locale)}</p>}
              {siteConfig.phone && <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>}
            </div>}
            <a className="btn btn-forest" href={siteConfig.maps} target="_blank" rel="noreferrer">{t.directions}<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span><span className="sr-only">{t.opensMaps}</span></a>
          </div>
          <Image className="frame-img" src="/images/frames/gilded-frame.webp" alt="" width={648} height={777} sizes="(min-width: 900px) 420px, 90vw" />
        </div>
        <div className="ornate reveal">
          <div className="ornate-map">
            <iframe src={siteConfig.mapsEmbed} title={t.location.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            {/* Ton mape u bojama sajta; ne prima klikove, mapa ostaje upotrebljiva. */}
            <span className="map-tint" aria-hidden="true" />
          </div>
          <Image className="frame-img" src="/images/frames/ornate-frame.webp" alt="" width={735} height={511} sizes="(min-width: 900px) 760px, 100vw" />
        </div>
      </div>
    </div>
  </section>
}

export function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale]
  return <footer className="footer on-dark beans">
    <BlossomBranch />
    <div className="wrap footer-top">
      <div className="footer-intro">
        <p className="footer-tag">{t.footer.tag} <em>{t.footer.tagEm}</em></p>
        <a className="btn btn-gold" href={siteConfig.maps} target="_blank" rel="noreferrer">{t.directions}<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span><span className="sr-only">{t.opensMaps}</span></a>
      </div>
      <div className="footer-col">
        <h2>{t.footer.visit}</h2>
        <a href={siteConfig.maps} target="_blank" rel="noreferrer">Kovači 20<br />71000 Sarajevo<span className="sr-only">{t.opensMaps}</span></a>
        {siteConfig.openingHours && <span>{tr(siteConfig.openingHours, locale)}</span>}
        {siteConfig.phone && <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>}
      </div>
      <nav className="footer-col" aria-label={t.footer.links}>
        <h2>{t.footer.explore}</h2>
        <a href="#meni">{t.nav.menu}</a>
        <a href="#prica">{t.nav.story}</a>
        <a href="#galerija">{t.nav.gallery}</a>
        <a href="#lokacija">{t.nav.location}</a>
      </nav>
      <div className="footer-col">
        <h2>{t.footer.follow}</h2>
        <a className="footer-social" href={siteConfig.instagram} target="_blank" rel="noreferrer"><Camera size={18} aria-hidden="true" />@behut_cafe<span className="sr-only">{t.opensInstagram}</span></a>
      </div>
    </div>
    <div className="wrap footer-brand">
      <a href="#" className="footer-logo" aria-label={t.toTop}><LogoMark /></a>
      <div className="footer-wordmark">
        {/* textLength rasteže riječ tačno na širinu kolone, na svakom ekranu. */}
        <svg viewBox="0 0 1000 196" role="img" aria-label="Behut">
          <text x="0" y="190" textLength="1000" lengthAdjust="spacingAndGlyphs">BEHUT</text>
        </svg>
        <span>{t.footer.since}</span>
      </div>
    </div>
    <div className="wrap footer-bottom">
      <span>© {new Date().getFullYear()} BEHUT Sarajevo</span>
      <a href="#">{t.footer.top}</a>
    </div>
  </footer>
}
