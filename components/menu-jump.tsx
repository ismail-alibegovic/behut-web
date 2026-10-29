'use client'

import { useEffect, useRef, useState } from 'react'

/** Ljepljiva traka kategorija na stranici menija: ističe kategoriju koja je na ekranu i drži je vidljivom. */
export function MenuJump({ categories, label }: { categories: { id: string; name: string }[]; label: string }) {
  const [active, setActive] = useState(categories[0]?.id)
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const sections = categories.map(category => document.getElementById(category.id)).filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-120px 0px -55% 0px' })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [categories])

  // Aktivni chip pomjeri u sredinu trake, bez skrolanja stranice.
  useEffect(() => {
    const ul = list.current, chip = ul?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (ul && chip) ul.scrollTo({ left: chip.offsetLeft - (ul.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
  }, [active])

  return <nav className="mp-jump" aria-label={label}>
    <ul ref={list}>
      {categories.map(category => <li key={category.id}><a href={`#${category.id}`} data-id={category.id} aria-current={active === category.id ? 'true' : undefined}>{category.name}</a></li>)}
    </ul>
  </nav>
}
