'use client'

import { useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Review } from '@/data/reviews'

/*
 * Na osnovu dostavljene "twitter testimonial cards" komponente: nagnute
 * kartice (ovdje čipkani papirići) naslagane jedna iza druge; hover (ili prvi
 * tap na mobitelu) podigne karticu i razmakne one ispred nje. Ovdje su to
 * Google recenzije u Behut bojama, a strelice okreću špil kroz sve recenzije.
 */

// Koliko kartica se vidi u špilu i pomak svake sljedeće, u "jedinicama" (--u: 1rem na desktopu).
const DECK = 5
const STEP = [3.2, 2.2] as const
// Blagi, različiti nagibi da špil izgleda kao gomila papirića, ne kao blok.
const TILT = [-5, 3.5, -2.5, 2, 0]
// Kad je fokusirana kartica iza, one ispred nje se razmaknu da je otkriju.
const PUSH = [5, 7] as const

function GoogleMark() {
  return <svg className="review-g" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M21.6 12.23c0-.68-.06-1.36-.18-2.02H12v3.83h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.75 2.98-4.32 2.98-7.33Z" />
    <path fill="currentColor" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.95-3.39.95-2.6 0-4.81-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22Z" opacity=".8" />
    <path fill="currentColor" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.07a10 10 0 0 0 0 8.96L6.4 13.9Z" opacity=".6" />
    <path fill="currentColor" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.52L6.4 10.1C7.19 7.74 9.4 5.98 12 5.98Z" opacity=".9" />
  </svg>
}

function Stars({ rating }: { rating: number }) {
  return <span className="review-stars" role="img" aria-label={`Ocjena ${rating} od 5`}>
    {[1, 2, 3, 4, 5].map(i => <svg key={i} viewBox="0 0 20 20" aria-hidden="true" data-on={i <= Math.round(rating)}><path d="m10 1.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6Z" /></svg>)}
  </span>
}

export function ReviewStack({ reviews, href }: { reviews: Review[]; href: string }) {
  const [start, setStart] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [active, setActive] = useState<number | null>(null)
  const n = reviews.length
  const deck = Array.from({ length: Math.min(DECK, n) }, (_, i) => (start + i) % n)
  const focused = hovered ?? active

  const rotate = (dir: number) => { setStart(s => (s + dir + n) % n); setActive(null) }

  return <div className="review-stack-wrap">
    <div className="review-stack">
      {deck.map((reviewIndex, pos) => {
        const review = reviews[reviewIndex]
        const pushed = focused !== null && pos > focused
        const x = pos * STEP[0] + (pushed ? PUSH[0] : 0)
        const y = pos * STEP[1] + (pushed ? PUSH[1] : 0) + (focused === pos ? -2.5 : 0)
        const tilt = pos === deck.length - 1 || focused === pos ? 0 : TILT[pos]
        const style = { '--x': x, '--y': y, '--r': `${tilt}deg`, zIndex: pos + 1 } as CSSProperties
        return <a key={reviewIndex} className="review-card" data-back={pos < deck.length - 1 && focused !== pos} style={style}
          href={href} target="_blank" rel="noreferrer"
          onMouseEnter={() => setHovered(pos)} onMouseLeave={() => setHovered(null)}
          onFocus={() => setActive(pos)} onBlur={() => setActive(null)}
          onClick={event => {
            // Na dodir: prvi tap otkrije karticu, drugi otvara Google Maps.
            const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
            if (touch && active !== pos) { event.preventDefault(); setActive(pos) }
          }}>
          <span className="review-head">
            <span className="review-avatar" aria-hidden="true">{review.avatar ? <img src={review.avatar} alt="" /> : review.author.charAt(0)}</span>
            <span className="review-who">
              <strong>{review.author}</strong>
              {review.rating !== undefined && <Stars rating={review.rating} />}
            </span>
            <GoogleMark />
          </span>
          <span className="review-text" lang={review.lang}>{review.text}</span>
          <span className="review-foot">{review.date && <span>{review.date}</span>}<span>Google recenzija</span></span>
        </a>
      })}
    </div>
    {n > 1 && <div className="review-controls">
      <button className="round-btn" onClick={() => rotate(-1)} aria-label="Prethodna recenzija"><ArrowLeft size={18} aria-hidden="true" /></button>
      <span aria-live="polite">{String(start + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
      <button className="round-btn" onClick={() => rotate(1)} aria-label="Sljedeća recenzija"><ArrowRight size={18} aria-hidden="true" /></button>
    </div>}
  </div>
}
