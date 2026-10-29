'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, FileText, Plus, X } from 'lucide-react'
import { formatPrice, menuCategories, type MenuEntry } from '@/data/menu'
import { siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'
import { MenuIcon } from './botanical'

const PREVIEW_COUNT = 6

export function MenuGrid() {
  const [selected, setSelected] = useState(0)
  const [detail, setDetail] = useState<MenuEntry | null>(null)
  // Prvo samo dva reda pića, da dugačka kategorija ne razvuče stranicu.
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const category = menuCategories[selected]
  const visible = expanded ? category.items : category.items.slice(0, PREVIEW_COUNT)
  const hidden = category.items.length - visible.length

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
        {menuCategories.map((item, index) => <button key={item.id} className="menu-tab" aria-pressed={selected === index} aria-controls="meni-stavke" onClick={() => { setSelected(index); setExpanded(false) }}>{item.name}</button>)}
      </div>
      <ul id="meni-stavke" className="menu-grid" aria-live="polite" aria-label={category.name}>
        {visible.map(item => {
          const entry = { ...item, category: category.name }
          return <li key={item.id} className="swatch">
            <div className="swatch-media">{item.image ? <SiteImage image={item.image} sizes="(min-width: 1080px) 280px, (min-width: 720px) 30vw, 45vw" /> : <MenuIcon type={item.icon ?? 'cup'} />}</div>
            <div className="swatch-label">
              <div>
                <h3>{item.name.bs}</h3>
                <p>{item.price !== null ? formatPrice(item.price) : category.name}</p>
              </div>
              <button className="swatch-plus" onClick={() => setDetail(entry)} aria-haspopup="dialog" aria-label={`Detalji: ${item.name.bs}`}><Plus size={16} aria-hidden="true" /></button>
            </div>
          </li>
        })}
      </ul>
      {category.items.length > PREVIEW_COUNT && <div className="menu-more">
        <button className="btn btn-ghost" aria-expanded={expanded} aria-controls="meni-stavke" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Prikaži manje' : `Prikaži još ${hidden} ${hidden === 1 ? 'piće' : 'pića'}`}
          <ChevronDown size={17} aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : undefined }} />
        </button>
      </div>}
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
