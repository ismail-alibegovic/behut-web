'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { featuredCopy, featuredDrinkIds, formatPrice, getMenuItem, type MenuItem } from '@/data/menu'
import { PictureFrame } from './picture-frame'
import { Ornament } from './ornament'

const drinks = featuredDrinkIds.map(id => {
  const item = getMenuItem(id)
  if (!item) throw new Error(`Featured drink "${id}" is missing from the menu`)
  return { ...item, ...featuredCopy[id] } as MenuItem & { kicker: string; story: string }
})

export function FeaturedDrinks() {
  const [selected, setSelected] = useState(0)
  const drink = drinks[selected]
  const step = (direction: number) => setSelected(current => (current + direction + drinks.length) % drinks.length)
  const price = formatPrice(drink.price)

  return <section id="favoriti" className="featured" aria-labelledby="featured-title">
    <div className="wrap">
      <div className="section-head section-head--light">
        <span className="label"><span className="label-index">01</span>Behut favoriti</span>
        <h2 id="featured-title">Mali rituali, <em>veliki merak.</em></h2>
      </div>

      <div className="featured-stage">
        <div className="featured-visual">
          {drinks.map((item, index) => <div key={item.id} className="featured-slide" data-active={index === selected || undefined} aria-hidden={index !== selected}>
            <PictureFrame image={item.image} variant="brass" sizes="(max-width: 960px) 90vw, 46vw" />
          </div>)}
          <span className="featured-number" aria-hidden="true">0{selected + 1}</span>
        </div>

        <div className="featured-copy">
          <div className="featured-text" key={drink.id} aria-live="polite">
            <span className="label label--gold">{drink.kicker}</span>
            <h3>{drink.name}</h3>
            <p>{drink.story}</p>
            <div className="featured-meta">
              <span className="featured-price">{price ?? 'Cijena u caféu'}</span>
              <a className="link-underline" href={`#meni`}>U kolekciji <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>

          <Ornament className="featured-ornament" />

          <div className="featured-index" role="group" aria-label="Izdvojeni napici">
            {drinks.map((item, index) => <button key={item.id} type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>
              <span className="featured-index-no">0{index + 1}</span>
              <span className="featured-index-name">{item.name}</span>
            </button>)}
          </div>

          <div className="featured-arrows">
            <button type="button" onClick={() => step(-1)} aria-label="Prethodni napitak"><ArrowLeft size={18} /></button>
            <span>{String(selected + 1).padStart(2, '0')} / {String(drinks.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => step(1)} aria-label="Sljedeći napitak"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  </section>
}
