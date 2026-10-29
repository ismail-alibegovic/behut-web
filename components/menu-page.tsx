import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react'
import { itemImage, menuCategories } from '@/data/menu'
import { siteConfig } from '@/data/site-config'
import { dict, formatPrice, paths, tr, type Locale } from '@/lib/i18n'
import { SiteImage } from './site-image'
import { LogoMark } from './logo-mark'
import { MenuIcon } from './botanical'

/** Cijeli meni na jednoj stranici, za QR kod na stolovima: brz, bez JavaScripta, prvo za mobitel. */
export function MenuPage({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const other: Locale = locale === 'bs' ? 'en' : 'bs'
  return <>
    <a className="skip-link" href="#meni-lista">{t.skip}</a>
    <header className="mp-head">
      <div className="mp-bar">
        <a className="mp-back" href={paths.home[locale]}><ArrowLeft size={16} aria-hidden="true" />{t.menuPage.back}</a>
        <a className="mp-logo" href={paths.home[locale]} aria-label={t.toTop}><LogoMark /></a>
        <a className="lang-switch" href={paths.menu[other]} hrefLang={other} lang={other} aria-label={t.nav.switchLabel}>{other.toUpperCase()}</a>
      </div>
      <h1>{t.menuPage.title}</h1>
      <p>{t.menuPage.lead}</p>
    </header>
    <nav className="mp-jump" aria-label={t.menuPage.jump}>
      <ul>{menuCategories.map(category => <li key={category.id}><a href={`#${category.id}`}>{tr(category.name, locale)}</a></li>)}</ul>
    </nav>
    <main id="meni-lista" className="mp-list" tabIndex={-1}>
      {menuCategories.map(category => <section key={category.id} id={category.id} className="mp-cat" aria-labelledby={`${category.id}-title`}>
        <h2 id={`${category.id}-title`}>{tr(category.name, locale)}</h2>
        <ul>
          {category.items.map(item => {
            const image = itemImage(item, locale)
            return <li key={item.id} className="mp-item">
              <span className="mp-thumb">{image ? <SiteImage image={image} sizes="72px" /> : <MenuIcon type={item.icon ?? 'cup'} />}</span>
              <span className="mp-text">
                <span className="mp-line"><strong>{tr(item.name, locale)}</strong><span className="mp-dots" aria-hidden="true" /><span className="mp-price">{formatPrice(item.price, locale)}</span></span>
                {item.description && <span className="mp-desc">{tr(item.description, locale)}</span>}
              </span>
            </li>
          })}
        </ul>
      </section>)}
      <p className="mp-note">{t.menuPage.note}</p>
    </main>
    <footer className="mp-foot">
      <a href={siteConfig.maps} target="_blank" rel="noreferrer"><MapPin size={16} aria-hidden="true" />Kovači 20, Sarajevo<span className="sr-only">{t.opensMaps}</span></a>
      <a href={siteConfig.instagram} target="_blank" rel="noreferrer">@behut_cafe <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">{t.opensInstagram}</span></a>
    </footer>
  </>
}
