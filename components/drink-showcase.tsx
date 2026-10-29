'use client'

import { useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowDownRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { featuredDrinks, formatPrice } from '@/data/menu'
import { SiteImage } from './site-image'
import { BlossomBranch, LeafSprig } from './botanical'

export function DrinkShowcase() {
  const [selected, setSelected] = useState(0)
  const arc = useRef<HTMLUListElement>(null)
  const drink = featuredDrinks[selected]
  const last = featuredDrinks.length - 1

  const select = (index: number) => {
    const next = (index + featuredDrinks.length) % featuredDrinks.length
    setSelected(next)
    // Na mobitelu je luk skrolabilan; aktivni chip vrati u vidno polje.
    const list = arc.current, chip = list?.children[next] as HTMLElement | undefined
    if (list && chip && list.scrollWidth > list.clientWidth) list.scrollTo({ left: chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
  }

  return <section className="showcase" id="pica" aria-labelledby="showcase-title" tabIndex={-1}>
    <div className="showcase-intro wrap">
      <span className="eyebrow">Naši mali rituali</span>
      <h2 id="showcase-title">Izaberi svoje piće</h2>
    </div>
    <ul ref={arc} className="arc" aria-label="Izdvojena pića">
      {featuredDrinks.map((item, index) => {
        const t = last ? (index - last / 2) / (last / 2) : 0
        return <li key={item.id}><button className="chip" style={{ '--t': t, '--t2': t * t } as CSSProperties} aria-pressed={selected === index} aria-controls="istaknuto-pice" onClick={() => select(index)}>{item.name.bs}</button></li>
      })}
    </ul>
    <div className="showcase-dark dark-torn on-dark beans">
      <BlossomBranch className="dark-branch" />
      <LeafSprig className="dark-sprig" />
      <div id="istaknuto-pice" className="showcase-grid wrap" aria-live="polite">
        <div className="showcase-visual">
          {drink.image && <div className="showcase-photo" key={drink.id}><SiteImage image={drink.image} sizes="(min-width: 900px) 300px, 60vw" /></div>}
          <Image className="showcase-frame" src="/images/frames/oval-frame.webp" alt="" width={700} height={903} sizes="(min-width: 900px) 440px, 90vw" />
        </div>
        <div className="showcase-copy" key={`copy-${drink.id}`}>
          <span className="eyebrow">{drink.category}</span>
          <h3>{drink.name.bs}{drink.name.en && <em lang="en">{drink.name.en}</em>}</h3>
          {drink.description && <p>{drink.description}</p>}
          {drink.price !== null && <p className="showcase-price">{formatPrice(drink.price)}</p>}
          <div className="showcase-actions">
            <a className="btn btn-gold" href="#meni">Pogledaj meni<span className="btn-icon"><ArrowDownRight size={17} aria-hidden="true" /></span></a>
            <button className="round-btn" onClick={() => select(selected - 1)} aria-label="Prethodno piće"><ArrowLeft size={18} aria-hidden="true" /></button>
            <button className="round-btn" onClick={() => select(selected + 1)} aria-label="Sljedeće piće"><ArrowRight size={18} aria-hidden="true" /></button>
            <span className="showcase-count" aria-hidden="true">{String(selected + 1).padStart(2, '0')} / {String(featuredDrinks.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
}
