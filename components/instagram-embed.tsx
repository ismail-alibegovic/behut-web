'use client'

import { useEffect, useRef, useState } from 'react'

// Službeni Instagram embed. Iframe javlja svoju stvarnu visinu porukom
// { type: 'MEASURE', details: { height } }, pa se okvir prilagođava sadržaju
// (uspravni i položeni reelovi imaju različitu visinu).
export function InstagramEmbed({ url, title }: { url: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState<number | null>(null)

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!e.origin.endsWith('instagram.com') || e.source !== ref.current?.contentWindow) return
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        const h = data?.type === 'MEASURE' ? Number(data.details?.height) : NaN
        if (h > 0) setHeight(Math.ceil(h))
      } catch {
        /* poruke koje nisu JSON ignorišemo */
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <iframe
      ref={ref}
      src={`${url}embed/`}
      title={title}
      loading="lazy"
      scrolling="no"
      allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
      allowFullScreen
      className={height ? 'is-measured' : undefined}
      style={height ? { height } : undefined}
    />
  )
}
