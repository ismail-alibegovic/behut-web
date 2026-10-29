import { ArrowLeft, ArrowUp, ArrowUpRight, MapPin } from 'lucide-react'
import { itemImage, menuCategories, type MenuCategory } from '@/data/menu'
import { siteConfig } from '@/data/site-config'
import { dict, formatPrice, paths, tr, type Locale } from '@/lib/i18n'
import { SiteImage } from './site-image'
import { LogoMark } from './logo-mark'
import { MenuJump } from './menu-jump'
import { BlossomBranch, LeafSprig } from './botanical'

// Raspored kao na štampanom meniju (Kula.pdf): lijeva i desna kolona, odozgo prema dolje.
const COLUMNS = [
  ['hladni-napici', 'prirodni-napici', 'tradicionalni-sokovi', 'ledene-kafe'],
  ['behut-specials', 'topli-napici', 'tradicionalni-kolaci'],
]
const byId = (id: string) => menuCategories.find(category => category.id === id) as MenuCategory
const columns = COLUMNS.map(ids => ids.map(byId))
const ordered = columns.flat()

/** Ukrasni razdjelnik kao na štampanom meniju: linija, romb i tačke. */
function Divider({ className = '' }: { className?: string }) {
  return <svg className={`mp-divider ${className}`} viewBox="0 0 240 14" aria-hidden="true" focusable="false">
    <path d="M4 7h92M144 7h92" />
    <circle cx="100" cy="7" r="1.6" /><circle cx="140" cy="7" r="1.6" />
    <path d="m120 1.5 5.5 5.5-5.5 5.5-5.5-5.5Z" />
  </svg>
}

function Category({ category, locale }: { category: MenuCategory; locale: Locale }) {
  return <section id={category.id} className="mp-cat" aria-labelledby={`${category.id}-title`}>
    <header className="mp-cat-head">
      <h2 id={`${category.id}-title`}>{tr(category.name, locale)}</h2>
      <Divider />
    </header>
    <ul className="mp-items">
      {category.items.map(item => {
        const image = itemImage(item, locale)
        return <li key={item.id} className="mp-item">
          {image && <span className="mp-photo"><SiteImage image={image} sizes="72px" /></span>}
          <div className="mp-body">
            <div className="mp-row">
              <h3>{tr(item.name, locale)}</h3>
              <span className="mp-dots" aria-hidden="true" />
              <span className="mp-price">{formatPrice(item.price, locale)}</span>
            </div>
            {item.description && <p>{tr(item.description, locale)}</p>}
          </div>
        </li>
      })}
    </ul>
  </section>
}

/** Cijeli meni na jednoj stranici, za QR kod na stolovima, složen kao štampani Behut meni. */
export function MenuPage({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const other: Locale = locale === 'bs' ? 'en' : 'bs'
  return <div className="mp">
    <a className="skip-link" href="#meni-lista">{t.skip}</a>
    <header className="mp-hero on-dark beans">
      <BlossomBranch className="mp-branch" />
      <LeafSprig className="mp-sprig" />
      <div className="mp-top">
        <a className="mp-pill" href={paths.home[locale]}><ArrowLeft size={16} aria-hidden="true" />{t.menuPage.back}</a>
        <a className="mp-pill" href={paths.menu[other]} hrefLang={other} lang={other} aria-label={t.nav.switchLabel}>{other.toUpperCase()}</a>
      </div>
      <div className="mp-title">
        <a className="mp-logo" href={paths.home[locale]} aria-label={t.toTop}><LogoMark /></a>
        <h1>{t.menuPage.title}</h1>
        <Divider />
        <p>{t.menuPage.lead}</p>
      </div>
    </header>

    <MenuJump categories={ordered.map(category => ({ id: category.id, name: tr(category.name, locale) }))} label={t.menuPage.jump} />

    <main id="meni-lista" className="mp-list" tabIndex={-1}>
      {columns.map((column, index) => <div key={index} className="mp-col">
        {column.map(category => <Category key={category.id} category={category} locale={locale} />)}
      </div>)}
    </main>
    <p className="mp-note">{t.menuPage.note}</p>

    <footer className="mp-foot on-dark beans">
      <LogoMark className="mp-foot-logo" />
      <div className="mp-foot-links">
        <a href={siteConfig.maps} target="_blank" rel="noreferrer"><MapPin size={16} aria-hidden="true" />Kovači 20, Sarajevo<span className="sr-only">{t.opensMaps}</span></a>
        <a href={siteConfig.instagram} target="_blank" rel="noreferrer">@behut_cafe <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">{t.opensInstagram}</span></a>
        <a href="#">{t.footer.top.replace(' ↑', '')} <ArrowUp size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  </div>
}
