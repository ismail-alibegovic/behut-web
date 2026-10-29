'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react'
import { localize, siteConfig } from '@/data/site-config'
import { dict, type Locale } from '@/lib/i18n'
import { SiteImage } from './site-image'

export function Gallery({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const touchStart = useRef<number | null>(null)
  const gallery = siteConfig.gallery.map(image => localize(image, locale))
  const step = (direction: number) => setSelected(current => (current + direction + gallery.length) % gallery.length)

  return <section id="galerija" className="section" aria-labelledby="galerija-title" tabIndex={-1}>
    <div className="wrap">
      <div className="gallery-head reveal">
        <div><span className="eyebrow">{t.gallery.eyebrow}</span><h2 id="galerija-title">{t.gallery.title} <em>{t.gallery.titleEm}</em></h2></div>
        <p>{t.gallery.lead}</p>
      </div>
      <div className="gallery-grid">
        {gallery.map((image, index) => <button key={image.src} className="gallery-item" onClick={() => { setSelected(index); dialog.current?.showModal() }} aria-haspopup="dialog" aria-label={`${t.gallery.open}: ${image.alt}`}>
          <SiteImage image={image} sizes="(min-width: 900px) 50vw, 100vw" />
          <span className="zoom" aria-hidden="true"><Maximize2 size={17} /></span>
        </button>)}
      </div>
    </div>
    <dialog ref={dialog} className="lightbox" aria-label={t.gallery.label}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}
      onKeyDown={event => { if (event.key === 'ArrowRight') step(1); if (event.key === 'ArrowLeft') step(-1) }}
      onTouchStart={event => { touchStart.current = event.touches[0].clientX }}
      onTouchEnd={event => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1); touchStart.current = null }}>
      <div className="lightbox-inner" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <button className="dialog-close" onClick={() => dialog.current?.close()} aria-label={t.gallery.close}><X size={20} aria-hidden="true" /></button>
        <figure className="lightbox-figure"><SiteImage image={{ ...gallery[selected], fit: 'contain' }} sizes="100vw" className="lightbox-photo" /></figure>
        <div className="lightbox-bar">
          <button className="round-btn" onClick={() => step(-1)} aria-label={t.gallery.prev}><ArrowLeft size={18} aria-hidden="true" /></button>
          <p aria-live="polite"><span className="sr-only">{t.gallery.count(selected + 1, gallery.length)}</span>{gallery[selected].alt}</p>
          <button className="round-btn" onClick={() => step(1)} aria-label={t.gallery.next}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </dialog>
  </section>
}
