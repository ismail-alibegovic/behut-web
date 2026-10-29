'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ArrowUpRight, Camera, Menu, X } from 'lucide-react'
import { images, siteConfig } from '@/data/site-config'
import { LeafSprig } from './botanical'

const leftLinks = [{ href: '#meni', label: 'Meni' }, { href: '#prica', label: 'Naša priča' }, { href: '#galerija', label: 'Galerija' }]
const rightLinks = [{ href: '#lokacija', label: 'Lokacija' }]
const allLinks = [...leftLinks, ...rightLinks]

/** Prati koja je sekcija trenutno na sredini ekrana, za aktivni link. */
function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const sections = hrefs.map(href => document.querySelector<HTMLElement>(href)).filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        else setActive(current => current === `#${entry.target.id}` ? null : current)
      }
    }, { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [hrefs])
  return active
}

const hrefs = allLinks.map(link => link.href)

export function Topbar() {
  const [open, setOpen] = useState(false)
  const [floating, setFloating] = useState(false)
  const header = useRef<HTMLElement>(null)
  // Dugme koje je otvorilo panel; na njega se vraća fokus.
  const toggle = useRef<HTMLButtonElement | null>(null)
  const panel = useRef<HTMLDivElement>(null)
  // Sidro na koje skačemo tek kad se panel zatvori i skrol se vrati.
  const pending = useRef<string | null>(null)
  const active = useActiveSection(hrefs)
  const navLink = (link: { href: string; label: string }) => <a key={link.href} href={link.href} aria-current={active === link.href ? 'location' : undefined}>{link.label}</a>

  // Plutajuća traka se pojavi kad glavna navigacija izađe iz ekrana.
  useEffect(() => {
    if (!header.current) return
    const observer = new IntersectionObserver(([entry]) => setFloating(!entry.isIntersecting))
    observer.observe(header.current)
    return () => observer.disconnect()
  }, [])

  const openPanel = (event: React.MouseEvent<HTMLButtonElement>) => { toggle.current = event.currentTarget; setOpen(true) }

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector<HTMLElement>('nav a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      // Fokus ostaje unutar panela dok je otvoren.
      if (event.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>('a, button')
        const first = items[0], last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
      const target = pending.current && document.querySelector<HTMLElement>(pending.current)
      pending.current = null
      if (target) { target.scrollIntoView(); target.focus({ preventScroll: true }) }
      else toggle.current?.focus({ preventScroll: true })
    }
  }, [open])

  return <header ref={header} className="topbar">
    <nav className="topbar-links" aria-label="Glavna navigacija">{leftLinks.map(navLink)}</nav>
    <a className="icon-btn topbar-social" href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Behut na Instagramu"><Camera size={18} aria-hidden="true" /></a>
    <a href="#" className="topbar-logo" aria-label="BEHUT Sarajevo, na vrh stranice"><Image src={images.logo} alt="BEHUT Sarajevo, osnovan 2024." width={640} height={454} priority sizes="150px" /></a>
    <div className="topbar-right">
      <nav className="topbar-links" aria-label="Dodatna navigacija">{rightLinks.map(navLink)}</nav>
      <a className="icon-btn topbar-insta" href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Behut na Instagramu"><Camera size={18} aria-hidden="true" /></a>
      <a className="btn btn-gold topbar-cta" href={siteConfig.maps} target="_blank" rel="noreferrer">Kako do nas<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span><span className="sr-only"> (otvara Google Maps)</span></a>
      <button className="menu-toggle" aria-expanded={open} aria-controls="mobilni-meni" aria-label="Otvori navigaciju" onClick={openPanel}><Menu size={20} aria-hidden="true" /></button>
    </div>
    {floating && createPortal(<div className="float-bar">
      <a href="#" className="float-mark" aria-label="BEHUT Sarajevo, na vrh stranice"><span>Behut</span><small>Sarajevo</small></a>
      <nav className="float-links" aria-label="Brza navigacija">{allLinks.map(navLink)}</nav>
      <a className="btn btn-gold float-cta" href={siteConfig.maps} target="_blank" rel="noreferrer">Kako do nas<span className="btn-icon"><ArrowUpRight size={16} aria-hidden="true" /></span><span className="sr-only"> (otvara Google Maps)</span></a>
      <button className="menu-toggle" aria-expanded={open} aria-controls="mobilni-meni" aria-label="Otvori navigaciju" onClick={openPanel}><Menu size={20} aria-hidden="true" /></button>
    </div>, document.body)}
    {open && createPortal(<div ref={panel} id="mobilni-meni" className="mobile-panel on-dark" role="dialog" aria-modal="true" aria-label="Navigacija">
      <div className="mobile-panel-top"><span className="eyebrow">Behut · Kovači 20</span><button className="menu-toggle" aria-label="Zatvori navigaciju" onClick={() => setOpen(false)}><X size={22} aria-hidden="true" /></button></div>
      <nav aria-label="Mobilna navigacija">{[...allLinks, { href: '#instagram', label: 'Instagram' }].map(link => <a key={link.href} href={link.href} onClick={event => { event.preventDefault(); pending.current = link.href; history.replaceState(null, '', link.href); setOpen(false) }}>{link.label}</a>)}</nav>
      <div className="mobile-panel-foot"><span>Kovači 20, Sarajevo</span><a className="btn btn-gold" href={siteConfig.maps} target="_blank" rel="noreferrer">Kako do nas<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span></a></div>
      <LeafSprig />
    </div>, document.body)}
  </header>
}
