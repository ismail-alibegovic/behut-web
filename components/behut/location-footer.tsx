import { ArrowUp, ArrowUpRight, MapPin } from 'lucide-react'
import { images, navLinks, siteConfig } from '@/data/site-config'
import { SiteImage } from '../site-image'
import { Ornament } from './ornament'

export function Location() {
  return <section id="lokacija" className="location" aria-labelledby="location-title">
    <div className="location-photo"><SiteImage image={images.city} sizes="100vw" /></div>
    <div className="wrap location-inner">
      <div className="location-card">
        <span className="label label--gold"><span className="label-index">05</span>Posjeti nas</span>
        <h2 id="location-title">Vidimo se na <em>Kovačima.</em></h2>
        <Ornament className="location-ornament" />
        <address>
          <MapPin size={18} aria-hidden="true" />
          <span>Kovači 20<br />71000 Sarajevo<br />Bosna i Hercegovina</span>
        </address>
        {siteConfig.openingHours && <p className="location-hours">{siteConfig.openingHours}</p>}
        {siteConfig.phone && <a className="location-phone" href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>}
        <div className="location-actions">
          <a className="btn btn--gold" href={siteConfig.maps} target="_blank" rel="noreferrer">Pokaži mi put <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a className="link-underline" href={siteConfig.instagram} target="_blank" rel="noreferrer">{siteConfig.instagramHandle} <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
      <p className="location-note">Neke adrese postanu navika.</p>
    </div>
  </section>
}

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-grid">
      <a href="#top" className="footer-brand" aria-label="BEHUT Sarajevo — na vrh"><img src={images.logoIvory} alt="BEHUT Sarajevo" width={480} height={343} loading="lazy" /></a>
      <p className="footer-motto">Dobra kafa. Dobri ljudi. <em>To je Behut.</em></p>
      <nav className="footer-nav" aria-label="Podnožje">
        {navLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        <a href="#lokacija">Posjeti nas</a>
        <a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram</a>
      </nav>
    </div>
    <div className="wrap footer-bottom">
      <span>© {new Date().getFullYear()} BEHUT Sarajevo</span>
      <span>Kovači 20 · Sarajevo</span>
      <a href="#top">Nazad na vrh <ArrowUp size={13} aria-hidden="true" /></a>
    </div>
  </footer>
}
