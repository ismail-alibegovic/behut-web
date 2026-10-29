'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'

export function Gallery() {
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const touchStart = useRef<number | null>(null)
  const gallery = siteConfig.gallery
  const step = (direction: number) => setSelected(current => (current + direction + gallery.length) % gallery.length)

  return <section id="galerija" className="section" aria-labelledby="galerija-title" tabIndex={-1}>
    <div className="wrap">
      <div className="gallery-head reveal">
        <div><span className="eyebrow">Galerija</span><h2 id="galerija-title">Svaki kutak, <em>jedna priča.</em></h2></div>
        <p>Mali detalji, veliki osjećaj. Upoznaj svoj novi omiljeni kutak na Kovačima.</p>
      </div>
      <div className="gallery-grid">
        {gallery.map((image, index) => <button key={image.src} className="gallery-item" onClick={() => { setSelected(index); dialog.current?.showModal() }} aria-haspopup="dialog" aria-label={`Uvećaj fotografiju: ${image.alt}`}>
          <SiteImage image={image} sizes="(min-width: 900px) 50vw, 100vw" />
          <span className="zoom" aria-hidden="true"><Maximize2 size={17} /></span>
        </button>)}
      </div>
    </div>
    <dialog ref={dialog} className="lightbox" aria-label="Galerija Behut Sarajevo"
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}
      onKeyDown={event => { if (event.key === 'ArrowRight') step(1); if (event.key === 'ArrowLeft') step(-1) }}
      onTouchStart={event => { touchStart.current = event.touches[0].clientX }}
      onTouchEnd={event => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1); touchStart.current = null }}>
      <div className="lightbox-inner" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Zatvori galeriju"><X size={20} aria-hidden="true" /></button>
        <figure className="lightbox-figure"><SiteImage image={{ ...gallery[selected], fit: 'contain' }} sizes="100vw" className="lightbox-photo" /></figure>
        <div className="lightbox-bar">
          <button className="round-btn" onClick={() => step(-1)} aria-label="Prethodna fotografija"><ArrowLeft size={18} aria-hidden="true" /></button>
          <p aria-live="polite"><span className="sr-only">Fotografija {selected + 1} od {gallery.length}: </span>{gallery[selected].alt}</p>
          <button className="round-btn" onClick={() => step(1)} aria-label="Sljedeća fotografija"><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </dialog>
  </section>
}
