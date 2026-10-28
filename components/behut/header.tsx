'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { images, navLinks, siteConfig } from '@/data/site-config'
import { Ornament } from './ornament'


export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.documentElement.classList.add('menu-open')
    firstLink.current?.focus()
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close() }
    const onResize = () => { if (window.innerWidth > 960) setOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.documentElement.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  function close() {
    setOpen(false)
    toggle.current?.focus()
  }

  return <>
    <header className="site-header" data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <div className="header-inner wrap">
        <nav className="nav-left" aria-label="Glavna navigacija">
          {navLinks.map(link => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}
        </nav>
        <a href="#top" className="brand" aria-label="BEHUT Sarajevo — početna">
          <img src={images.logoGreen} alt="BEHUT Sarajevo, osnovan 2024." width={480} height={343} />
        </a>
        <div className="nav-right">
          <a className="nav-link" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram<span className="sr-only"> (otvara se u novom prozoru)</span></a>
          <a className="nav-cta" href="#lokacija"><span>Posjeti nas</span><ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
        <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Zatvori navigaciju' : 'Otvori navigaciju'} onClick={() => (open ? close() : setOpen(true))}>
          <span className="menu-toggle-lines" aria-hidden="true"><span /><span /></span>
        </button>
      </div>
    </header>

    <div id="mobile-menu" className="mobile-menu" data-open={open || undefined} aria-hidden={!open} inert={!open} role="dialog" aria-modal="true" aria-label="Navigacija">
      <div className="mobile-menu-inner">
        <span className="label mobile-menu-label">Behut · Kovači 20</span>
        <nav aria-label="Mobilna navigacija">
          <ol>
            {[...navLinks, { href: '#lokacija', label: 'Posjeti nas' }].map((link, index) => <li key={link.href} style={{ '--i': index } as React.CSSProperties}>
              <a ref={index === 0 ? firstLink : undefined} href={link.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{link.label}</a>
            </li>)}
          </ol>
        </nav>
        <Ornament className="mobile-menu-ornament" />
        <div className="mobile-menu-foot">
          <a href={siteConfig.maps} target="_blank" rel="noreferrer"><MapPin size={15} aria-hidden="true" /> Kovači 20, Sarajevo</a>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram {siteConfig.instagramHandle}</a>
        </div>
      </div>
    </div>
  </>
}
