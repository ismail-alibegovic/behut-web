'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, FileText, Plus, X } from 'lucide-react'
import { homeCategories, itemImage, variantImage, type MenuEntry } from '@/data/menu'
import { siteConfig } from '@/data/site-config'
import { drinkContent } from '@/data/drinks'
import { pagePath } from '@/lib/seo'
import { dict, formatPrice, paths, tr, type Locale } from '@/lib/i18n'
import { SiteImage } from './site-image'
import { MenuIcon } from './botanical'

const PREVIEW_COUNT = 6

export function MenuGrid({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const [selected, setSelected] = useState(0)
  const [detail, setDetail] = useState<MenuEntry | null>(null)
  const [variant, setVariant] = useState(0)
  // Prvo samo dva reda pića, da dugačka kategorija ne razvuče stranicu.
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const category = homeCategories[selected]
  const visible = expanded ? category.items : category.items.slice(0, PREVIEW_COUNT)
  const hidden = category.items.length - visible.length
  const detailVariant = detail?.variants?.[variant]
  const detailImage = detail && (detailVariant ? variantImage(detail, detailVariant, locale) : itemImage(detail, locale))

  // Dijalog se otvara tek kad je sadržaj iscrtan, da fokus padne na dugme za zatvaranje.
  useEffect(() => { if (detail && !dialog.current?.open) dialog.current?.showModal() }, [detail])

  return <section id="meni" className="section" aria-labelledby="meni-title" tabIndex={-1}>
    <div className="wrap">
      <div className="section-head reveal">
        <span className="eyebrow">{t.menu.eyebrow}</span>
        <h2 id="meni-title">{t.menu.title}</h2>
        <p>{t.menu.lead}</p>
      </div>
      <div className="menu-tabs" role="group" aria-label={t.menu.categories}>
        {homeCategories.map((item, index) => <button key={item.id} className="menu-tab" aria-pressed={selected === index} aria-controls="meni-stavke" onClick={() => { setSelected(index); setExpanded(false) }}>{tr(item.name, locale)}</button>)}
      </div>
      <ul id="meni-stavke" className="menu-grid" aria-live="polite" aria-label={tr(category.name, locale)}>
        {visible.map(item => {
          const image = itemImage(item, locale)
          return <li key={item.id} className="swatch">
            <div className="swatch-media">{image ? <SiteImage image={image} sizes="(min-width: 1080px) 280px, (min-width: 720px) 30vw, 45vw" /> : <MenuIcon type={item.icon ?? 'cup'} />}</div>
            <div className="swatch-label">
              <div>
                <h3>{tr(item.name, locale)}</h3>
                <p>{formatPrice(item.price, locale)}</p>
              </div>
              <button className="swatch-plus" onClick={() => { setVariant(0); setDetail({ ...item, category: category.name }) }} aria-haspopup="dialog" aria-label={`${t.menu.details}: ${tr(item.name, locale)}`}><Plus size={16} aria-hidden="true" /></button>
            </div>
          </li>
        })}
      </ul>
      <div className="menu-more">
        {category.items.length > PREVIEW_COUNT && <button className="btn btn-ghost" aria-expanded={expanded} aria-controls="meni-stavke" onClick={() => setExpanded(!expanded)}>
          {expanded ? t.menu.less : t.menu.more(hidden)}
          <ChevronDown size={17} aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : undefined }} />
        </button>}
        <a className="btn btn-forest" href={paths.menu[locale]}>{t.menu.full}<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span></a>
      </div>
      {siteConfig.menuPdf && <p className="menu-note"><a className="text-link" href={siteConfig.menuPdf} target="_blank" rel="noreferrer"><FileText size={17} aria-hidden="true" /> {t.menu.pdf}</a></p>}
    </div>
    <dialog ref={dialog} className="item-dialog" aria-labelledby="stavka-naslov" onClose={() => setDetail(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      {detail && <>
        <button className="dialog-close" onClick={() => dialog.current?.close()} aria-label={t.menu.close}><X size={20} aria-hidden="true" /></button>
        <div className="item-dialog-media">{detailImage ? <SiteImage image={detailImage} sizes="460px" /> : <MenuIcon type={detail.icon ?? 'cup'} />}</div>
        <div className="item-dialog-body">
          <span className="menu-cat">{tr(detail.category, locale)}</span>
          <h3 id="stavka-naslov">{tr(detail.name, locale)}</h3>
          {detail.description && <p>{tr(detail.description, locale)}</p>}
          {detail.variants && <div className="item-variants" role="group" aria-label={t.menu.flavours}>
            {detail.variants.map((item, index) => <button key={item.id} className="item-variant" aria-pressed={variant === index} onClick={() => setVariant(index)}>
              <span className="item-variant-photo"><SiteImage image={variantImage(detail, item, locale)} sizes="64px" /></span>
              {tr(item.name, locale)}
            </button>)}
          </div>}
          <p className="menu-price">{formatPrice(detail.price, locale)}</p>
          {drinkContent.some(content => content.id === detail.id) && <a className="text-link" href={`${pagePath(paths.drinks[locale])}#${detail.id}`}>{t.menuPage.moreAbout} →</a>}
        </div>
      </>}
    </dialog>
  </section>
}
