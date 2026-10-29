'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, MapPin, Menu, X } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { dict, paths, type Locale } from '@/lib/i18n'
import { LeafSprig } from './botanical'
import { LogoMark } from './logo-mark'

// Sidra sekcija su ista na oba jezika; tekst dolazi iz rječnika.
const leftKeys = [['#meni', 'menu'], ['#prica', 'story'], ['#galerija', 'gallery']] as const
const rightKeys = [['#lokacija', 'location']] as const

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

const hrefs = [...leftKeys, ...rightKeys].map(([href]) => href)

export function Topbar({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const other: Locale = locale === 'bs' ? 'en' : 'bs'
  const leftLinks = leftKeys.map(([href, key]) => ({ href, label: t.nav[key] }))
  const rightLinks = rightKeys.map(([href, key]) => ({ href, label: t.nav[key] }))
  const allLinks = [...leftLinks, ...rightLinks]
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

  const mapsCta = (className = '') => <a className={`nav-cta ${className}`} href={siteConfig.maps} target="_blank" rel="noreferrer"><MapPin size={16} aria-hidden="true" />{t.directions}<span className="sr-only">{t.opensMaps}</span></a>
  const menuButton = <button className="menu-toggle" aria-expanded={open} aria-controls="mobilni-meni" onClick={openPanel}><span>{t.nav.openMenu}</span><Menu size={18} aria-hidden="true" /></button>
  const langSwitch = (className = '') => <a className={`lang-switch ${className}`} href={paths.home[other]} hrefLang={other} lang={other} aria-label={t.nav.switchLabel}>{other.toUpperCase()}</a>

  return <header ref={header} className="topbar">
    <nav className="topbar-links" aria-label={t.nav.main}>{leftLinks.map(navLink)}</nav>
    <a href="#" className="topbar-logo" aria-label={t.toTop}><LogoMark /></a>
    <div className="topbar-right">
      <nav className="topbar-links" aria-label={t.nav.extra}>{rightLinks.map(navLink)}</nav>
      {langSwitch()}
      {mapsCta('topbar-cta')}
      {menuButton}
    </div>
    {floating && createPortal(<div className="float-bar">
      <a href="#" className="float-mark" aria-label={t.toTop}><span>Behut</span><small>Sarajevo</small></a>
      <nav className="float-links" aria-label={t.nav.quick}>{allLinks.map(navLink)}</nav>
      {langSwitch('float-lang')}
      {mapsCta('float-cta')}
      {menuButton}
    </div>, document.body)}
    {open && createPortal(<div ref={panel} id="mobilni-meni" className="mobile-panel on-dark beans" role="dialog" aria-modal="true" aria-label={t.nav.panel} lang={locale}>
      <div className="mobile-panel-top">
        <LogoMark className="panel-logo" />
        <button className="panel-close" aria-label={t.nav.close} onClick={() => setOpen(false)}><X size={22} aria-hidden="true" /></button>
      </div>
      <nav aria-label={t.nav.mobile}>{[...allLinks, { href: '#instagram', label: t.nav.instagram }].map((link, index) => <a key={link.href} href={link.href} onClick={event => { event.preventDefault(); pending.current = link.href; history.replaceState(null, '', link.href); setOpen(false) }}><small>{String(index + 1).padStart(2, '0')}</small>{link.label}</a>)}</nav>
      <div className="mobile-panel-foot">
        <span>{t.nav.address}</span>
        {mapsCta('nav-cta-gold')}
        <div className="panel-row">
          <a className="text-link" href={siteConfig.instagram} target="_blank" rel="noreferrer">@behut_cafe <ArrowUpRight size={15} aria-hidden="true" /></a>
          <a className="text-link" href={paths.home[other]} hrefLang={other} lang={other}>{t.nav.switchTo}</a>
        </div>
      </div>
      <LeafSprig />
    </div>, document.body)}
  </header>
}
