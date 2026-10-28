'use client'

import { useMemo, useState } from 'react'
import { formatPrice, menuCategories, menuItems, type MenuCategoryId, type MenuItem } from '@/data/menu'
import { PictureFrame } from './picture-frame'
import { Ornament } from './ornament'

type Filter = 'sve' | MenuCategoryId

const categoryName = Object.fromEntries(menuCategories.map(category => [category.id, category.name])) as Record<MenuCategoryId, string>
const filledCategories = menuCategories.filter(category => menuItems.some(item => item.category === category.id))
const pendingCategories = menuCategories.filter(category => !menuItems.some(item => item.category === category.id))

export function MenuCollection() {
  const [filter, setFilter] = useState<Filter>('sve')
  const items = useMemo(() => (filter === 'sve' ? menuItems : menuItems.filter(item => item.category === filter)), [filter])
  const filters: { id: Filter; name: string; count: number }[] = [
    { id: 'sve', name: 'Sve', count: menuItems.length },
    ...filledCategories.map(category => ({ id: category.id, name: category.name, count: menuItems.filter(item => item.category === category.id).length })),
  ]

  return <section id="meni" className="collection" aria-labelledby="collection-title">
    <div className="wrap">
      <div className="collection-head">
        <div className="section-head">
          <span className="label"><span className="label-index">03</span>Behut kolekcija</span>
          <h2 id="collection-title">Mala galerija <em>okusa.</em></h2>
        </div>
        <p className="collection-intro">Naš meni, obješen kao zbirka starih slika. Svaki napitak ima svoj ram, svoje mjesto i svoju priču.</p>
      </div>

      <div className="collection-filter" role="group" aria-label="Kategorije menija">
        {filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
          {item.name}<sup>{item.count}</sup>
        </button>)}
      </div>

      <p className="sr-only" aria-live="polite">{items.length} {items.length === 1 ? 'proizvod' : 'proizvoda'} u prikazu</p>

      <ol className="collection-grid" key={filter}>
        {items.map((item, index) => <Exhibit key={item.id} item={item} index={index} number={menuItems.indexOf(item) + 1} />)}
      </ol>

      <div className="collection-foot">
        <Ornament />
        <p>
          Cijene označene sa „cijena u caféu“ još potvrđujemo za digitalni meni.
          {pendingCategories.length > 0 && <> {pendingCategories.map(category => category.name).join(' i ')} uskoro stižu u kolekciju, a do tada vas čekaju u caféu.</>}
          {' '}Za sastojke i alergene pitajte naše osoblje.
        </p>
      </div>
    </div>
  </section>
}

function Exhibit({ item, index, number }: { item: MenuItem; index: number; number: number }) {
  const price = formatPrice(item.price)
  return <li className="exhibit" style={{ '--i': index } as React.CSSProperties}>
    <PictureFrame
      image={item.image}
      variant={item.frame}
      sizes="(max-width: 640px) 50vw, (max-width: 1100px) 45vw, 30vw"
      placeholder={<><em>{item.name}</em><span>Fotografija uskoro</span></>}
    />
    <div className="placard">
      <span className="placard-no">No. {String(number).padStart(2, '0')}<span className="placard-cat"> · {categoryName[item.category]}</span></span>
      <h3>{item.name}</h3>
      {item.description && <p>{item.description}</p>}
      <span className={`placard-price${price ? '' : ' placard-price--pending'}`}>{price ?? 'Cijena u caféu'}</span>
    </div>
  </li>
}
