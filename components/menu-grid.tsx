'use client'

import { useEffect, useRef, useState } from 'react'
import { FileText, Plus, X } from 'lucide-react'
import { formatPrice, menuCategories, type MenuEntry } from '@/data/menu'
import { siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'
import { MenuIcon } from './botanical'

export function MenuGrid() {
  const [selected, setSelected] = useState(0)
  const [detail, setDetail] = useState<MenuEntry | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const category = menuCategories[selected]

  // Dijalog se otvara tek kad je sadržaj iscrtan, da fokus padne na dugme za zatvaranje.
  useEffect(() => { if (detail && !dialog.current?.open) dialog.current?.showModal() }, [detail])

  return <section id="meni" className="section" aria-labelledby="meni-title" tabIndex={-1}>
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">Meni</span>
        <h2 id="meni-title">Po tvom. Po našem.</h2>
        <p>Od prve jutarnje do posljednje priče. Pronađi nešto baš za sebe.</p>
      </div>
      <div className="menu-tabs" role="group" aria-label="Kategorije menija">
        {menuCategories.map((item, index) => <button key={item.id} className="menu-tab" aria-pressed={selected === index} aria-controls="meni-stavke" onClick={() => setSelected(index)}>{item.name}</button>)}
      </div>
      <ul id="meni-stavke" className="menu-grid" aria-live="polite" aria-label={category.name}>
        {category.items.map(item => {
          const entry = { ...item, category: category.name }
          return <li key={item.id} className="menu-card">
            <span className="menu-cat">{category.name}</span>
            <h3>{item.name.bs}</h3>
            {item.price !== null && <p className="menu-price">{formatPrice(item.price)}</p>}
            <div className="menu-thumb">{item.image ? <SiteImage image={item.image} sizes="(min-width: 1080px) 190px, (min-width: 720px) 25vw, 38vw" /> : <MenuIcon type={item.icon ?? 'cup'} />}</div>
            <button className="menu-plus" onClick={() => setDetail(entry)} aria-haspopup="dialog" aria-label={`Detalji: ${item.name.bs}`}><Plus size={20} aria-hidden="true" /></button>
          </li>
        })}
      </ul>
      {siteConfig.menuPdf && <p className="menu-note"><a className="text-link" href={siteConfig.menuPdf} target="_blank" rel="noreferrer"><FileText size={17} aria-hidden="true" /> Cijeli meni (PDF)</a></p>}
    </div>
    <dialog ref={dialog} className="item-dialog" aria-labelledby="stavka-naslov" onClose={() => setDetail(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      {detail && <>
        <button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Zatvori"><X size={20} aria-hidden="true" /></button>
        <div className="item-dialog-media">{detail.image ? <SiteImage image={detail.image} sizes="460px" /> : <MenuIcon type={detail.icon ?? 'cup'} />}</div>
        <div className="item-dialog-body">
          <span className="menu-cat">{detail.category}</span>
          <h3 id="stavka-naslov">{detail.name.bs}</h3>
          {detail.name.en && <p className="en" lang="en">{detail.name.en}</p>}
          {detail.description && <p>{detail.description}</p>}
          {detail.price !== null && <p className="menu-price">{formatPrice(detail.price)}</p>}
        </div>
      </>}
    </dialog>
  </section>
}
