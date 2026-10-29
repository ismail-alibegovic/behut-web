"use client"

import * as React from "react"

/*
 * Polaroid Line Carousel — instant photos pegged to a sagging string. Drag the
 * line (or use the arrows) and the prints slide along it, swinging on their
 * pegs with the speed you give them and settling back with a little
 * overshoot; even at rest they sway in a light breeze. The one in the middle
 * is the one you're looking at.
 *
 * Behut verzija: svaka fotka je zvanični Instagram embed reela (samo video dio,
 * bez zaglavlja), boje dolaze iz tokena, a klik na srednju fotku otvara reel.
 */

export type Slide = {
  /** Instagram reel ID, npr. "DKzh2WLt9hw". */
  reel: string
  /** Rukom pisana bilješka ispod fotke. */
  title: string
  caption?: string
}

export type PolaroidLineCarouselProps = {
  slides: Slide[]
  /** Koja fotka je na početku u sredini. */
  initialIndex?: number
  /** Any CSS length. */
  height?: number | string
  /** Width of a print in px (it shrinks on narrow screens). */
  cardWidth?: number
  /** How far the string sags in the middle, px. */
  sag?: number
  /** How much the prints swing; 0 holds them still. */
  swing?: number
  /** ms per print; 0 turns autoplay off. It waits while someone is interacting. */
  autoplay?: number
  className?: string
  ariaLabel?: string
}

// #region logic
export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v))
}

/** Height of a string sagging by `sag` between (0, y0) and (w, y0), at x. */
export function stringY(x: number, w: number, y0: number, sag: number): number {
  const t = clamp(x / w, 0, 1)
  return y0 + 4 * sag * t * (1 - t)
}

/** One step of a critically damped spring toward target. */
export function springStep(x: number, v: number, target: number, dt: number, k = 70): [number, number] {
  const c = 2 * Math.sqrt(k)
  const nv = v + (k * (target - x) - c * v) * dt
  return [x + nv * dt, nv]
}

/** One step of a print's swing. lineVel is the prints' on-screen speed (px/s, + = moving right); a print lags behind the motion, is pulled back by gravity and damped. */
export function swingStep(a: number, w: number, lineVel: number, dt: number, gain: number): [number, number] {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt
  return [clamp(a + nw * dt, -0.6, 0.6), nw]
}

/** Index of the print nearest the centre for a line offset. */
export function nearestAt(off: number, spacing: number, n: number): number {
  return clamp(Math.round(off / spacing), 0, Math.max(0, n - 1))
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n)
}
// #endregion logic

export const reelUrl = (id: string) => `https://www.instagram.com/reel/${id}/`

// Instagram embed je širok najmanje 326px; video dio je 326x408 ispod zaglavlja od 54px,
// a reel (9:16) u njemu je širok 229.5px s crnim trakama sa strane. Fotka (4:5) uzima sredinu reela.
const EMBED_W = 326
const EMBED_HEADER = 54
const MEDIA_H = 408
const REEL_W = MEDIA_H * 9 / 16
const REEL_X = (EMBED_W - REEL_W) / 2
const CROP_Y = EMBED_HEADER + (MEDIA_H - REEL_W * 1.25) / 2

const PL_CSS = [
  ".pl-root{position:relative;width:100%;overflow:hidden;color:var(--forest);user-select:none;-webkit-user-select:none;touch-action:pan-y;outline:none;cursor:grab}",
  ".pl-root[data-drag='1']{cursor:grabbing}",
  ".pl-root:focus-visible{box-shadow:inset 0 0 0 3px var(--forest);border-radius:var(--radius)}",
  ".pl-string{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}",
  ".pl-card{position:absolute;left:0;top:0;width:var(--pl-cw);transform-origin:50% 0;will-change:transform;cursor:inherit}",
  ".pl-card[data-on='1']{cursor:pointer}",
  ".pl-print{margin-top:10px;background:var(--ivory);padding:10px 10px 0;box-shadow:0 1px 2px color-mix(in srgb,var(--ink-deep) 14%,transparent),0 18px 30px -16px color-mix(in srgb,var(--ink-deep) 50%,transparent);transition:transform .5s cubic-bezier(.2,.7,.2,1),filter .5s ease}",
  ".pl-card[data-on='0'] .pl-print{transform:scale(.9);filter:saturate(.7) brightness(.96)}",
  ".pl-shot{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--parchment)}",
  // iframe je uvijek EMBED_W širok i skaliran na širinu fotke; klikove hvata kartica, ne embed.
  ".pl-shot iframe{position:absolute;left:0;top:0;width:" + EMBED_W + "px;height:640px;border:0;transform-origin:0 0;pointer-events:none}",
  ".pl-note{height:46px;display:flex;align-items:center;justify-content:center;padding:0 6px;font:400 15px/1.1 var(--font-display),Georgia,serif;color:var(--forest);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".pl-peg{position:absolute;left:50%;top:0;width:10px;height:26px;margin-left:-5px;border-radius:2px;background:linear-gradient(90deg,color-mix(in srgb,var(--gold) 80%,var(--ink-deep)),color-mix(in srgb,var(--gold) 55%,var(--ivory)) 45%,var(--gold));box-shadow:0 2px 3px color-mix(in srgb,var(--ink-deep) 30%,transparent)}",
  ".pl-peg::after{content:'';position:absolute;left:4px;top:8px;width:2px;height:7px;background:color-mix(in srgb,var(--ink-deep) 40%,transparent);border-radius:1px}",
  ".pl-bar{position:absolute;left:max(var(--gutter),(100% - var(--max))/2);right:max(var(--gutter),(100% - var(--max))/2);bottom:0;display:flex;align-items:center;gap:clamp(12px,2vw,20px);cursor:default}",
  ".pl-cap{flex:1;min-width:0;overflow:hidden;padding-bottom:.15em}",
  ".pl-cap>*{display:block;animation:pl-in .55s cubic-bezier(.2,.8,.2,1) both}",
  ".pl-title{font:400 clamp(18px,2vw,24px)/1.2 var(--font-display),Georgia,serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".pl-sub{margin-top:4px;font-size:14px;line-height:1.4;color:var(--text-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".pl-count{font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--text-soft)}",
  ".pl-count b{color:var(--forest)}",
  ".pl-btn{appearance:none;flex:none;width:44px;height:44px;border-radius:50%;border:1.5px solid var(--line);background:transparent;color:inherit;display:grid;place-items:center;cursor:pointer;transition:background .2s ease,color .2s ease}",
  ".pl-btn:hover{background:var(--forest);color:var(--ivory)}",
  ".pl-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
  "@keyframes pl-in{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}",
  "@media (max-width:600px){.pl-count{display:none}.pl-sub{display:none}}",
  "@media (prefers-reduced-motion:reduce){.pl-cap>*{animation:none}.pl-print{transition:none}}",
].join("\n")

export default function PolaroidLineCarousel({
  slides,
  initialIndex = 0,
  height = 620,
  cardWidth = 270,
  sag = 46,
  swing = 1,
  autoplay = 0,
  className,
  ariaLabel = "Objave s Instagrama",
}: PolaroidLineCarouselProps) {
  const n = slides.length
  const start = clamp(initialIndex, 0, Math.max(0, n - 1))
  const [active, setActive] = React.useState(start)
  const [dragging, setDragging] = React.useState(false)
  const [size, setSize] = React.useState({ w: 1200, h: 620, cw: cardWidth })
  const rootRef = React.useRef(null as HTMLDivElement | null)
  const pathRef = React.useRef(null as SVGPathElement | null)
  const cards = React.useRef([] as (HTMLDivElement | null)[])
  const sim = React.useRef({ off: 0, vel: 0, target: 0, a: [] as number[], w: [] as number[] })
  const drag = React.useRef(null as null | { x: number; off: number; lx: number; lt: number; v: number; moved: boolean })
  const lastTouch = React.useRef(0)
  const activeRef = React.useRef(start)
  const opts = React.useRef({ sag, swing })
  opts.current = { sag, swing }

  const spacing = size.cw * 1.08
  const goTo = React.useCallback(
    (i: number) => {
      sim.current.target = clamp(i, 0, n - 1) * spacing
    },
    [n, spacing],
  )

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver(() => {
      const r = root.getBoundingClientRect()
      // Na mobitelu je srednja fotka šira, susjedne vire sa strane.
      const cw = Math.round(Math.max(150, Math.min(cardWidth, r.width * 0.6, r.height * 0.42)))
      setSize({ w: r.width, h: r.height, cw })
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [cardWidth])

  // keep the target on the active print when the spacing changes
  React.useEffect(() => {
    sim.current.target = activeRef.current * spacing
    sim.current.off = activeRef.current * spacing
  }, [spacing])

  // the simulation, written straight to the DOM each frame
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let visible = true
    let raf = 0
    let prev = performance.now()
    const S = sim.current
    const frame = (now: number) => {
      raf = 0
      if (!visible) return
      const dt = Math.min(0.033, (now - prev) / 1000)
      prev = now
      const { w, cw } = size
      const y0 = 24
      const d = drag.current
      let lineVel: number
      if (d && d.moved) {
        lineVel = d.v * 1000
      } else {
        const before = S.off
        ;[S.off, S.vel] = springStep(S.off, S.vel, S.target, dt)
        lineVel = -(S.off - before) / Math.max(dt, 1e-3)
      }
      const o = opts.current
      const g = reduce ? 0 : o.swing
      const near = nearestAt(S.off, spacing, n)
      for (let i = 0; i < n; i++) {
        const el = cards.current[i]
        if (!el) continue
        const x = w / 2 + i * spacing - S.off
        if (x < -cw * 1.5 || x > w + cw * 1.5) {
          el.style.visibility = "hidden"
          continue
        }
        el.style.visibility = "visible"
        let a = S.a[i] || 0
        let av = S.w[i] || 0
        ;[a, av] = swingStep(a, av, lineVel, dt, g)
        if (g) a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * g
        S.a[i] = a
        S.w[i] = av
        const y = stringY(x, w, y0, o.sag) - 6
        el.style.transform = "translate(" + (x - cw / 2).toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + a.toFixed(4) + "rad)"
        el.style.zIndex = String(i === near ? n + 1 : n - Math.abs(i - near))
      }
      pathRef.current?.setAttribute("d", "M0 " + y0 + " Q" + w / 2 + " " + (y0 + 2 * o.sag) + " " + w + " " + y0)
      if (near !== activeRef.current) {
        activeRef.current = near
        setActive(near)
      }
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) {
        prev = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(root)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [size, spacing, n])

  // autoplay, back to the first print after the last
  React.useEffect(() => {
    if (!autoplay || n < 2) return
    const t = window.setInterval(() => {
      if (document.hidden || drag.current || performance.now() - lastTouch.current < autoplay) return
      goTo(activeRef.current >= n - 1 ? 0 : activeRef.current + 1)
    }, autoplay)
    return () => window.clearInterval(t)
  }, [autoplay, n, goTo])

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".pl-bar")) return
    lastTouch.current = performance.now()
    drag.current = { x: e.clientX, off: sim.current.off, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false }
  }
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      setDragging(true)
      rootRef.current?.setPointerCapture(e.pointerId)
    }
    if (!d.moved) return
    const dt = Math.max(1, e.timeStamp - d.lt)
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v
    d.lx = e.clientX
    d.lt = e.timeStamp
    const max = (n - 1) * spacing
    let off = d.off - dx
    if (off < 0) off *= 0.35
    if (off > max) off = max + (off - max) * 0.35
    sim.current.off = off
  }
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current
    drag.current = null
    lastTouch.current = performance.now()
    if (!d) return
    if (d.moved) {
      setDragging(false)
      sim.current.vel = -d.v * 1000
      goTo(nearestAt(sim.current.off - d.v * 180, spacing, n))
      return
    }
    const card = (e.target as HTMLElement).closest("[data-i]")
    if (!card) return
    const i = Number(card.getAttribute("data-i"))
    // Klik na srednju fotku otvara reel; na ostale je dovodi u sredinu.
    if (i === activeRef.current) window.open(reelUrl(slides[i].reel), "_blank", "noopener,noreferrer")
    else goTo(i)
  }
  const step = (dir: number) => {
    lastTouch.current = performance.now()
    // Od cilja, ne od trenutne pozicije, da brzi klikovi idu više koraka.
    goTo(Math.round(sim.current.target / spacing) + dir)
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return
    if (e.key === "ArrowRight") step(1)
    else if (e.key === "ArrowLeft") step(-1)
    else return
    e.preventDefault()
  }

  const s = slides[active]
  const scale = (size.cw - 20) / REEL_W

  return (
    <div
      ref={rootRef}
      className={["pl-root", className].filter(Boolean).join(" ")}
      style={{ height, ["--pl-cw" as string]: size.cw + "px" }}
      data-drag={dragging ? "1" : "0"}
      role="region"
      aria-roledescription="karusel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <style>{PL_CSS}</style>
      <svg className="pl-string" aria-hidden="true">
        <path ref={pathRef} fill="none" stroke="color-mix(in srgb, var(--green) 55%, transparent)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {slides.map((sl, i) => (
        <div key={sl.reel} className="pl-card" data-i={i} data-on={i === active ? "1" : "0"} ref={(el) => void (cards.current[i] = el)} aria-hidden={i === active ? undefined : true}>
          <div className="pl-print">
            <div className="pl-shot">
              <iframe
                src={`https://www.instagram.com/reel/${sl.reel}/embed/`}
                title={`Instagram reel: ${sl.title}`}
                loading="lazy"
                tabIndex={-1}
                scrolling="no"
                style={{ transform: `translate(${(-REEL_X * scale).toFixed(1)}px, ${(-CROP_Y * scale).toFixed(1)}px) scale(${scale.toFixed(4)})` }}
              />
            </div>
            <div className="pl-note">{sl.title}</div>
          </div>
          <div className="pl-peg" />
        </div>
      ))}
      <div className="pl-bar">
        <div className="pl-cap" key={active} aria-hidden="true">
          <span className="pl-title">{s.title}</span>
          {s.caption ? <span className="pl-sub">{s.caption}</span> : null}
        </div>
        <span className="pl-count" aria-hidden="true">
          <b>{pad2(active + 1)}</b> / {pad2(n)}
        </span>
        <button type="button" className="pl-btn" aria-label="Prethodna objava" onClick={() => step(-1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <button type="button" className="pl-btn" aria-label="Sljedeća objava" onClick={() => step(1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <a className="btn btn-forest pl-open" href={reelUrl(s.reel)} target="_blank" rel="noreferrer">
          Otvori reel<span className="btn-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" /></svg></span>
          <span className="pl-sr"> {s.title} (otvara Instagram)</span>
        </a>
      </div>
      <div className="pl-sr" aria-live="polite">
        {"Objava " + (active + 1) + " od " + n + ": " + s.title}
      </div>
    </div>
  )
}
