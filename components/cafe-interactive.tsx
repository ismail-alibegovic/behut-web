'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X, Plus } from 'lucide-react'
import { images, menuCategories, siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'

const links = [{ href: '#prica', label: 'Naša priča' }, { href: '#meni', label: 'Meni' }, { href: '#galerija', label: 'Galerija' }]

export function Header() {
  const [open, setOpen] = useState(false)
  return <header className="header wrap">
    <nav className="nav-left" aria-label="Glavna navigacija">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
    <a href="#" className="logo-window" aria-label="BEHUT Sarajevo — početna"><img src={images.logo} alt="BEHUT Sarajevo, osnovan 2024." /></a>
    <div className="nav-right"><a className="instagram-nav" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a className="nav-visit" href="#lokacija">Svrati na kafu <ArrowUpRight size={15} /></a></div>
    <button className="mobile-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Zatvori navigaciju' : 'Otvori navigaciju'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobilna navigacija">{[...links, { href: '#lokacija', label: 'Pronađi nas' }].map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}</nav>}
  </header>
}

export function FeaturedDrinks() {
  const [selected, setSelected] = useState(0)
  const drinks = [menuCategories[0].items[0], menuCategories[2].items[0], menuCategories[5].items[0]]
  const drink = drinks[selected]
  const photo = selected === 0 ? siteConfig.coffeeImage : siteConfig.productImages[drink.name.bs]
  return <section id="ritual" className="featured"><div className="wrap"><div className="featured-top"><span className="eyebrow">01 / NAŠI MALI RITUALI</span><span>NEŠTO DOBRO SE UVIJEK DIJELI.</span></div><div className="drink-stage"><span className="drink-backdrop" aria-hidden="true">merak</span><div className="drink-copy" key={selected} aria-live="polite"><span className="eyebrow">BEHUT FAVORITI / 0{selected + 1}</span><h2>{drink.name.bs}</h2><p>{selected === 0 ? 'Nije samo kafa. To je vrijeme za sebe, za svoje ljude i za razgovore koji traju.' : 'Za predah na našoj terasi. Još jedan razlog da ostaneš malo duže.'}</p><span className="drink-price">{drink.price !== null ? `${drink.price.toFixed(2).replace('.', ',')} KM` : 'Cijenu provjerite u caféu'}</span><a className="text-link" href="#meni">Pogledaj meni <ArrowUpRight size={19} /></a></div><div className="drink-asset" key={`photo-${selected}`}>{photo ? <SiteImage image={photo} /> : <div className="asset-slot"><span>BEHUT / ORIGINAL SERVIS</span><strong>0{selected + 1}</strong><span>Fotografija napitka uskoro</span></div>}</div><span className="drink-side">PRIPREMLJENO S MERAKOM.</span></div><div className="drink-nav" aria-label="Izdvojeni napici">{drinks.map((item, index) => <button key={item.name.bs} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.name.bs}<ArrowUpRight size={17} /></button>)}</div></div></section>
}

export function CafeMenu() {
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState<string | null>(null)
  const category = menuCategories[selected]
  return <section id="meni" className="menu-section wrap"><div className="menu-heading"><div><span className="eyebrow">03 / MENI ZA TVOJ TRENUTAK</span><h2>Po tvom.<br /><em>Po našem.</em></h2></div><p>Od prve jutarnje do posljednje priče.<br />Pronađi nešto baš za sebe.</p></div><div className="menu-categories" aria-label="Kategorije menija">{menuCategories.map((item, index) => <button key={item.name} aria-pressed={selected === index} onClick={() => { setSelected(index); setExpanded(null) }}>{item.name}</button>)}</div><div className="product-grid" key={selected} aria-live="polite">{category.items.length ? category.items.map((item, index) => {
    const photo = item.name.bs === 'Bosanska kafa' ? siteConfig.coffeeImage : siteConfig.productImages[item.name.bs]
    const isOpen = expanded === item.name.bs
    return <article className="product-card" key={item.name.bs}><button className="product-trigger" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : item.name.bs)}><div className="product-visual">{photo ? <SiteImage image={photo} /> : <><span className="product-number">0{index + 1}</span><span className="product-word">{item.name.bs.split(' ')[0]}</span><span className="product-slot-label">FOTOGRAFIJA USKORO</span></>}<span className="product-plus">{isOpen ? <X size={18} /> : <Plus size={18} />}</span></div><div className="product-info"><h3>{item.name.bs}</h3><span>{item.price !== null ? `${item.price.toFixed(2).replace('.', ',')} KM` : 'Na upit'}</span></div></button>{isOpen && <p className="product-details">{item.name.en ? `${item.name.en}. ` : ''}{item.price !== null ? 'Potvrđena cijena iz ponude. Za sastojke i alergene pitajte naše osoblje.' : 'Za aktuelnu cijenu, sastojke i alergene pitajte naše osoblje.'}</p>}</article>
  }) : <p className="menu-empty">Ovu ponudu pripremamo za digitalni meni. Do tada, otkrijte je u našem caféu.</p>}</div><div className="menu-footnote"><span>Dobro poznati okusi. Uvijek s merakom.</span><p>Digitalni meni je u pripremi. Nepotvrđene cijene provjerite u caféu.</p></div></section>
}

export function Gallery() {
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const gallery = siteConfig.gallery
  const step = (direction: number) => setSelected(current => (current + direction + gallery.length) % gallery.length)
  return <section id="galerija" className="gallery-section wrap section-space"><div className="gallery-heading"><div><span className="eyebrow">MALI DETALJI. VELIKI OSJEĆAJ.</span><h2>Svaki kutak, <em>jedna priča.</em></h2></div><span className="gallery-hint">Upoznaj svoj novi omiljeni kutak <ArrowUpRight size={17} /></span></div>
    <div className="gallery-grid">{gallery.map((image, index) => <button key={image.src} className={`gallery-photo gallery-photo-${index}`} onClick={() => { setSelected(index); dialog.current?.showModal() }} aria-label={`Pogledaj fotografiju: ${image.alt}`}><SiteImage image={image} /><span className="photo-expand"><Plus size={20} /></span></button>)}</div>
    <dialog ref={dialog} className="lightbox" aria-label="Galerija Behut Sarajevo" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }} onKeyDown={event => { if (event.key === 'ArrowRight') step(1); if (event.key === 'ArrowLeft') step(-1) }}><div className="lightbox-inner"><button className="lightbox-close" onClick={() => dialog.current?.close()} aria-label="Zatvori galeriju"><X /></button><SiteImage image={gallery[selected]} /><div className="lightbox-controls"><button onClick={() => step(-1)} aria-label="Prethodna fotografija"><ArrowLeft /></button><p>{selected + 1} / {gallery.length}</p><button onClick={() => step(1)} aria-label="Sljedeća fotografija"><ArrowRight /></button></div><p className="lightbox-caption">{gallery[selected].alt}</p></div></dialog>
  </section>
}
