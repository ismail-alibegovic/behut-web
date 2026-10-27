'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X, Plus } from 'lucide-react'
import { images, menuCategories, siteConfig } from '@/data/site-config'
import { SiteImage } from './site-image'

const links = [
  { href: '#prica', label: 'Naša priča' },
  { href: '#ritual', label: 'Rituali' },
  { href: '#meni', label: 'Meni' },
  { href: '#galerija', label: 'Galerija' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header-wrap ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header wrap">
        <nav className="nav-left" aria-label="Glavna navigacija">
          {links.map(link => (
            <a key={link.href} href={link.href} className="nav-link">
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <a href="#" className="logo-window" aria-label="BEHUT Sarajevo — početna">
          <img src={images.logo} alt="BEHUT Sarajevo, osnovan 2024." />
        </a>

        <div className="nav-right">
          <a
            className="instagram-nav"
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <span>Instagram</span>
            <ArrowUpRight size={13} />
          </a>
          <a className="nav-visit" href="#lokacija">
            <span>Svrati na kafu</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        <button
          className="mobile-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Zatvori navigaciju' : 'Otvori navigaciju'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {open && (
          <div className="mobile-nav-backdrop" onClick={() => setOpen(false)}>
            <nav
              id="mobile-nav"
              className="mobile-nav"
              aria-label="Mobilna navigacija"
              onClick={e => e.stopPropagation()}
            >
              <div className="mobile-nav-header">
                <span className="eyebrow">BEHUT SARAJEVO</span>
                <button
                  type="button"
                  className="mobile-close-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Zatvori meni"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mobile-nav-links">
                {[...links, { href: '#lokacija', label: 'Pronađi nas' }].map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="mobile-nav-item"
                    onClick={() => setOpen(false)}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>

              <div className="mobile-nav-footer">
                <a
                  className="pill gold mobile-nav-cta"
                  href={siteConfig.maps}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Kovači 20, Sarajevo</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export function FeaturedDrinks() {
  const [selected, setSelected] = useState(0)
  const drinks = [
    menuCategories[0].items[0], // Bosanska kafa
    menuCategories[2].items[0], // Limunana
    menuCategories[5].items[0], // Behut ledeni čaj
  ]
  const drink = drinks[selected]
  const photo = selected === 0 ? siteConfig.coffeeImage : siteConfig.productImages[drink.name.bs]

  return (
    <section id="ritual" className="featured">
      <div className="wrap">
        <div className="featured-top">
          <span className="eyebrow">01 / NAŠI MALI RITUALI</span>
          <span className="featured-top-tag">NEŠTO DOBRO SE UVIJEK DIJELI.</span>
        </div>

        <div className="drink-stage">
          <span className="drink-backdrop" aria-hidden="true">
            merak
          </span>

          <div className="drink-copy" key={selected} aria-live="polite">
            <span className="eyebrow">BEHUT FAVORITI / 0{selected + 1}</span>
            <h2>{drink.name.bs}</h2>
            <p>
              {selected === 0
                ? 'Nije samo kafa. To je vrijeme za sebe, za svoje ljude i za razgovore koji na Kovačima traju satima.'
                : selected === 1
                  ? 'Svježe cijeđeni limun i domaća menta. Savršeno rashlađeno za predah na našoj terasi.'
                  : 'Naš kućni specijalitet s voćnim notama. Još jedan razlog da ostaneš malo duže.'}
            </p>
            <div className="drink-price-wrap">
              <span className="drink-price">
                {drink.price !== null
                  ? `${drink.price.toFixed(2).replace('.', ',')} KM`
                  : 'Cijena u caféu'}
              </span>
              {drink.price !== null && (
                <span className="drink-price-note">Verificirana cijena u caféu</span>
              )}
            </div>
            <a className="text-link" href="#meni">
              <span>Pogledaj cijeli meni</span>
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="drink-asset" key={`photo-${selected}`}>
            {photo ? (
              <SiteImage image={photo} />
            ) : (
              <div className="asset-slot">
                <span className="asset-slot-eyebrow">BEHUT · SARAJEVO</span>
                <strong className="asset-number">0{selected + 1}</strong>
                <span className="asset-slot-name">{drink.name.bs}</span>
                <span className="asset-slot-badge">ORIGINALNI SERVIS NA KOVAČIMA</span>
              </div>
            )}
          </div>

          <span className="drink-side" aria-hidden="true">
            PRIPREMLJENO S MERAKOM.
          </span>
        </div>

        <div className="drink-nav" role="group" aria-label="Izdvojeni rituali">
          {drinks.map((item, index) => {
            const isSelected = selected === index
            return (
              <button
                key={item.name.bs}
                type="button"
                className={`drink-nav-pill ${isSelected ? 'is-active' : ''}`}
                aria-pressed={isSelected}
                onClick={() => setSelected(index)}
              >
                <span className="drink-nav-num">0{index + 1}</span>
                <span className="drink-nav-label">{item.name.bs}</span>
                <ArrowUpRight size={16} />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function CafeMenu() {
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState<string | null>(null)
  const category = menuCategories[selected]

  return (
    <section id="meni" className="menu-section wrap">
      <div className="menu-heading">
        <div>
          <span className="eyebrow">03 / MENI ZA TVOJ TRENUTAK</span>
          <h2>
            Po tvom.<br />
            <em>Po našem.</em>
          </h2>
        </div>
        <p>
          Od prve jutarnje do posljednje priče.<br />
          Pronađi nešto baš za sebe.
        </p>
      </div>

      <div className="menu-categories" role="group" aria-label="Kategorije menija">
        {menuCategories.map((item, index) => {
          const isSelected = selected === index
          return (
            <button
              key={item.name}
              type="button"
              className={`menu-category-btn ${isSelected ? 'is-active' : ''}`}
              aria-pressed={isSelected}
              onClick={() => {
                setSelected(index)
                setExpanded(null)
              }}
            >
              {item.name}
            </button>
          )
        })}
      </div>

      <div className="product-grid" key={selected} aria-live="polite">
        {category.items.length ? (
          category.items.map((item, index) => {
            const photo =
              item.name.bs === 'Bosanska kafa'
                ? siteConfig.coffeeImage
                : siteConfig.productImages[item.name.bs]
            const isOpen = expanded === item.name.bs
            const shortWord = item.name.bs.split(' ')[0]

            return (
              <article
                className={`product-card product-card-shape-${(index % 3) + 1}`}
                key={item.name.bs}
              >
                <button
                  type="button"
                  className="product-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : item.name.bs)}
                >
                  <div className="product-visual">
                    {photo ? (
                      <SiteImage image={photo} />
                    ) : (
                      <div className="product-visual-inner">
                        <span className="product-number">0{index + 1}</span>
                        <span className="product-word">{shortWord}</span>
                        <span className="product-slot-label">BEHUT · KOVAČI 20</span>
                      </div>
                    )}
                    <span
                      className="product-plus"
                      aria-label={isOpen ? 'Zatvori detalje' : 'Otvori detalje'}
                    >
                      {isOpen ? <X size={18} /> : <Plus size={18} />}
                    </span>
                  </div>

                  <div className="product-info">
                    <h3>{item.name.bs}</h3>
                    <span className="product-price">
                      {item.price !== null
                        ? `${item.price.toFixed(2).replace('.', ',')} KM`
                        : 'Cijena u caféu'}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="product-details">
                    {item.name.en && (
                      <p className="product-details-en">
                        <strong>Naziv:</strong> {item.name.en}
                      </p>
                    )}
                    <p className="product-details-note">
                      {item.price !== null
                        ? 'Potvrđena cijena iz ponude Behut Sarajevo. Poslužuje se svježe pripremljeno u našem caféu.'
                        : 'Za aktuelnu cijenu, sastojke i alergene ljubazno pitajte naše osoblje na Kovačima.'}
                    </p>
                  </div>
                )}
              </article>
            )
          })
        ) : (
          <div className="menu-empty">
            <span className="eyebrow">{category.name.toUpperCase()}</span>
            <h3>Sezonska ponuda u caféu</h3>
            <p>
              Ovu ponudu pripremamo svježe za toplije dane na našoj terasi. Dođite na Kovače 20 i
              otkrijte našu aktuelnu selekciju.
            </p>
          </div>
        )}
      </div>

      <div className="menu-footnote">
        <span>Dobro poznati okusi. Uvijek s merakom.</span>
        <p>Cijene u KM su prikazane za verificirane artikle. Sve detalje provjerite u caféu.</p>
      </div>
    </section>
  )
}

export function Gallery() {
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const gallery = siteConfig.gallery

  const step = (direction: number) =>
    setSelected(current => (current + direction + gallery.length) % gallery.length)

  return (
    <section id="galerija" className="gallery-section wrap section-space">
      <div className="gallery-heading">
        <div>
          <span className="eyebrow">MALI DETALJI. VELIKI OSJEĆAJ.</span>
          <h2>
            Svaki kutak, <em>jedna priča.</em>
          </h2>
        </div>
        <a href="#lokacija" className="gallery-hint">
          <span>Upoznaj svoj novi omiljeni kutak</span>
          <ArrowUpRight size={17} />
        </a>
      </div>

      <div className="gallery-grid">
        {gallery.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`gallery-photo gallery-photo-${index}`}
            onClick={() => {
              setSelected(index)
              dialog.current?.showModal()
            }}
            aria-label={`Pogledaj fotografiju: ${image.alt}`}
          >
            <SiteImage image={image} />
            <span className="photo-expand" aria-hidden="true">
              <Plus size={20} />
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Galerija Behut Sarajevo"
        onClick={event => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
        onKeyDown={event => {
          if (event.key === 'ArrowRight') step(1)
          if (event.key === 'ArrowLeft') step(-1)
        }}
      >
        <div className="lightbox-inner">
          <button
            type="button"
            className="lightbox-close"
            onClick={() => dialog.current?.close()}
            aria-label="Zatvori galeriju"
          >
            <X size={20} />
          </button>
          <div className="lightbox-stage">
            <SiteImage image={gallery[selected]} />
          </div>
          <div className="lightbox-controls">
            <button
              type="button"
              className="lightbox-nav-btn"
              onClick={() => step(-1)}
              aria-label="Prethodna fotografija"
            >
              <ArrowLeft size={18} />
              <span>Prethodna</span>
            </button>
            <p className="lightbox-counter">
              {selected + 1} / {gallery.length}
            </p>
            <button
              type="button"
              className="lightbox-nav-btn"
              onClick={() => step(1)}
              aria-label="Sljedeća fotografija"
            >
              <span>Sljedeća</span>
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="lightbox-caption">{gallery[selected].alt}</p>
        </div>
      </dialog>
    </section>
  )
}
