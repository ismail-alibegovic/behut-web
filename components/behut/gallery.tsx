'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { SiteImage } from '../site-image'

export function Gallery() {
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const gallery = siteConfig.gallery
  const step = (direction: number) => setSelected(current => (current + direction + gallery.length) % gallery.length)
  const open = (index: number, button: HTMLButtonElement) => {
    opener.current = button
    setSelected(index)
    dialog.current?.showModal()
  }

  return <section id="galerija" className="gallery" aria-labelledby="gallery-title">
    <div className="wrap">
      <div className="gallery-head">
        <div className="section-head">
          <span className="label"><span className="label-index">04</span>Galerija</span>
          <h2 id="gallery-title">Svaki kutak, <em>jedna priča.</em></h2>
        </div>
        <a className="link-underline" href={siteConfig.instagram} target="_blank" rel="noreferrer">Više na Instagramu {siteConfig.instagramHandle} <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>

      <div className="gallery-grid">
        {gallery.map((image, index) => <button key={image.src} type="button" className={`gallery-item gallery-item--${index}`} onClick={event => open(index, event.currentTarget)} aria-label={`Otvori fotografiju: ${image.alt}`}>
          <SiteImage image={image} sizes="(max-width: 640px) 50vw, 33vw" />
          <span className="gallery-zoom" aria-hidden="true"><Plus size={16} /></span>
        </button>)}
      </div>
    </div>

    <dialog
      ref={dialog}
      className="lightbox"
      aria-label="Galerija Behut Sarajevo"
      onClose={() => opener.current?.focus()}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}
      onKeyDown={event => { if (event.key === 'ArrowRight') step(1); if (event.key === 'ArrowLeft') step(-1) }}
    >
      <div className="lightbox-inner">
        <button type="button" className="lightbox-close" onClick={() => dialog.current?.close()} aria-label="Zatvori galeriju"><X size={20} /></button>
        <SiteImage key={gallery[selected].src} image={{ ...gallery[selected], fit: 'contain' }} />
        <div className="lightbox-bar">
          <button type="button" onClick={() => step(-1)} aria-label="Prethodna fotografija"><ArrowLeft size={18} /></button>
          <p><span>{selected + 1} / {gallery.length}</span>{gallery[selected].alt}</p>
          <button type="button" onClick={() => step(1)} aria-label="Sljedeća fotografija"><ArrowRight size={18} /></button>
        </div>
      </div>
    </dialog>
  </section>
}
