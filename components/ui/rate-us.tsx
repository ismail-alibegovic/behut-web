'use client'

import { useState, type CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { dict, type Locale } from '@/lib/i18n'

/*
 * "Ocijeni nas": posjetilac pređe preko zvjezdica (ili ih bira strelicama),
 * klik ih animirano upali, a zatim ga dugme vodi na Google Maps da tamo
 * ostavi pravu recenziju. Na sajtu se ništa ne čuva niti šalje.
 */


function Star() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m12 2.2 2.95 6 6.6.96-4.78 4.65 1.13 6.57L12 17.27 6.1 20.38l1.13-6.57L2.45 9.16l6.6-.96L12 2.2Z" /></svg>
}

export function RateUs({ href, locale }: { href: string; locale: Locale }) {
  const t = dict[locale].reviews.rate
  const opensMaps = dict[locale].opensMaps
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  // Mijenja se pri svakom izboru da animacija krene ispočetka (dvije iste animacije naizmjenično).
  const [pulse, setPulse] = useState(0)
  const shown = hover || rating

  return <div className="rate-us" data-picked={rating > 0}>
    <fieldset onMouseLeave={() => setHover(0)}>
      <legend>{t.q} <span>{t.q2}</span></legend>
      <div className="rate-stars" data-pulse={pulse % 2}>
        {[1, 2, 3, 4, 5].map(value => <label key={value} className="rate-star" data-on={value <= shown} data-picked={rating > 0 && value <= rating} style={{ '--i': value } as CSSProperties} onMouseEnter={() => setHover(value)}>
          <input type="radio" name="behut-ocjena" value={value} checked={rating === value} onChange={() => { setRating(value); setPulse(p => p + 1) }} />
          <Star />
          <span className="sr-only">{value} {t.of5}</span>
        </label>)}
      </div>
    </fieldset>
    <p className="rate-label" aria-live="polite">{shown ? t.labels[shown] : t.pick}</p>
    {rating > 0 && <a className="nav-cta nav-cta-gold rate-cta" href={href} target="_blank" rel="noreferrer">
      {t.cta} <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">{opensMaps}</span>
    </a>}
  </div>
}
