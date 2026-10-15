import { ArrowDown, ArrowUpRight, Camera, MapPin } from 'lucide-react'
import { images, instagramPosts, siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'

export function Hero() {
  return <section className="hero wrap">
    <div className="hero-meta"><span>KAFA. SARAJEVO. MERAK.</span><span>EST. 2024 / KOVAČI 20</span></div>
    <div className="hero-stage">
      <div className="hero-copy"><h1>MALO KAFE.<br />PUNO<br /><em>meraka.</em></h1><p>Jedna sarajevska adresa.<br />Hiljadu razloga da ostaneš još malo.</p><a className="pill" href="#meni">Pronađi svoj ritual <ArrowUpRight size={18} /></a></div>
      <figure className="hero-dominant"><SiteImage image={siteConfig.hero.main} priority /><figcaption>SARAJEVO, IZ NAŠEG UGLA.</figcaption></figure>
      <figure className="hero-crop-one"><SiteImage image={siteConfig.hero.left} priority /></figure>
      <figure className="hero-crop-two"><SiteImage image={siteConfig.hero.right} priority /><figcaption>Vidimo se unutra.</figcaption></figure>
      <span className="hero-handwriting">tvoje mjesto<br />na Kovačima <ArrowUpRight size={24} /></span>
      <a href="#ritual" className="round-link hero-down" aria-label="Otkrij naše rituale"><ArrowDown /></a>
    </div>
    <div className="hero-bottom"><span>BEZ ŽURBE. BEZ POVODA. BAŠ KAKO TREBA.</span><a href={siteConfig.maps} target="_blank" rel="noreferrer">Kovači 20, Sarajevo <ArrowUpRight size={15} /></a></div>
  </section>
}

export function Story() {
  return <section id="prica" className="story-section"><div className="wrap"><div className="story-intro"><span className="eyebrow">02 / NAŠA PRIČA</span><h2>Nismo samo<br />mjesto za kafu.<br /><em>Mi smo onaj osjećaj.</em></h2></div><div className="story-scene"><figure className="story-wide"><SiteImage image={images.interior} /><figcaption>Stare stvari. Novi omiljeni trenuci.</figcaption></figure><div className="story-note"><span className="eyebrow">DOBRO DOŠLI U BEHUT.</span><p>Na Kovačima, među sarajevskim ulicama i poznatim pogledima, Behut je mjesto za kafu, razgovor i malo predaha.</p><p>Starinske lampe, zelena vrata i detalji koji bude uspomene. Ovdje se ne žuri. Ovdje se sjedi još malo.</p><a className="text-link" href="#galerija">Uđi, raskomoti se <ArrowUpRight size={18} /></a></div><span className="story-script" aria-hidden="true">još jednu?</span></div></div></section>
}

export function InstagramSection() {
  return <section id="instagram" className="instagram-section">
    <div className="wrap instagram-heading"><span className="eyebrow">TRENUTKE NE BROJIMO. ČUVAMO IH.</span><a href={siteConfig.instagram} target="_blank" rel="noreferrer"><h2>@behut_cafe</h2><ArrowUpRight /></a><p className="instagram-lead">Stvarni kadrovi, direktno sa našeg profila. <em>Bez filtera za merak.</em></p></div>
    <div className="ig-feed" aria-label="Objave sa Instagram profila @behut_cafe">
      {instagramPosts.map((post, i) => {
        const url = `https://www.instagram.com/${post.kind}/${post.id}/`
        const no = String(i + 1).padStart(2, '0')
        return <article className="ig-post" key={post.id}>
          <div className="ig-frame"><iframe src={`${url}embed/`} title={`Behut na Instagramu — objava ${no}`} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; clipboard-write" allowFullScreen /></div>
          <div className="ig-caption"><span>BEHUT / {no}</span><a href={url} target="_blank" rel="noreferrer">Otvori objavu <ArrowUpRight size={13} /></a></div>
        </article>
      })}
    </div>
    <div className="wrap ig-follow"><span className="ig-swipe" aria-hidden="true">Prevuci →</span><span>Još kadrova sa Kovača, svaki dan.</span><a className="pill" href={siteConfig.instagram} target="_blank" rel="noreferrer"><Camera size={17} /> Prati @behut_cafe <ArrowUpRight size={17} /></a></div>
  </section>
}

export function LocationAndFooter() {
  return <><section id="lokacija" className="location"><SiteImage image={images.city} /><div className="location-overlay wrap"><span className="eyebrow">NEKE ADRESE POSTANU NAVIKA.</span><h2>VIDIMO SE<br />NA <em>Kovačima.</em></h2><div className="location-bottom"><address><MapPin size={21} /><span>Kovači 20<br />71000 Sarajevo, Bosna i Hercegovina</span></address><a className="pill gold" href={siteConfig.maps} target="_blank" rel="noreferrer">Pokaži mi put <ArrowUpRight size={18} /></a></div>{siteConfig.openingHours && <p>{siteConfig.openingHours}</p>}{siteConfig.phone && <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>}</div></section><footer><div className="wrap footer-top"><a href="#" className="logo-window" aria-label="Behut Sarajevo — na vrh"><img src={images.logo} alt="BEHUT Sarajevo" /></a><p>Dobra kafa. Dobri ljudi.<br /><em>To je Behut.</em></p><a className="text-link" href={siteConfig.instagram} target="_blank" rel="noreferrer">Ostanimo u kontaktu <ArrowUpRight size={18} /></a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} BEHUT Sarajevo</span><span>KOVAČI 20 · SARAJEVO</span><a href="#">NAZAD NA VRH ↑</a></div></footer></>
}
