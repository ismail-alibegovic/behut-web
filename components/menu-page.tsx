import { menuCategories, type MenuCategory } from '@/data/menu'
import { drinkContent } from '@/data/drinks'
import { dict, formatPrice, paths, tr, type Locale } from '@/lib/i18n'
import { MenuJump } from './menu-jump'
import { Divider, MpFoot, MpHero } from './mp-parts'
import { JsonLd } from './json-ld'
import { breadcrumbJsonLd, cafeJsonLd, menuJsonLd, pagePath } from '@/lib/seo'

// Raspored kao na štampanom meniju (Kula.pdf): lijeva i desna kolona, odozgo prema dolje.
const COLUMNS = [
  ['hladni-napici', 'prirodni-napici', 'tradicionalni-sokovi', 'ledene-kafe'],
  ['behut-specials', 'topli-napici', 'tradicionalni-kolaci'],
]
const byId = (id: string) => menuCategories.find(category => category.id === id) as MenuCategory
const columns = COLUMNS.map(ids => ids.map(byId))
const ordered = columns.flat()

const signature = new Set(drinkContent.map(content => content.id))

function Category({ category, locale }: { category: MenuCategory; locale: Locale }) {
  return <section id={category.id} className="mp-cat" aria-labelledby={`${category.id}-title`}>
    <header className="mp-cat-head">
      <h2 id={`${category.id}-title`}>{tr(category.name, locale)}</h2>
      <Divider />
    </header>
    <ul className="mp-items">
      {category.items.map(item => <li key={item.id} id={item.id} className="mp-item">
          <div className="mp-body">
            <div className="mp-row">
              <h3>{tr(item.name, locale)}</h3>
              <span className="mp-dots" aria-hidden="true" />
              <span className="mp-price">{formatPrice(item.price, locale)}</span>
            </div>
            {item.description && <p>{tr(item.description, locale)}</p>}
            {signature.has(item.id) && <a className="mp-more" href={`${pagePath(paths.drinks[locale])}#${item.id}`}>{dict[locale].menuPage.moreAbout}</a>}
          </div>
        </li>)}
    </ul>
  </section>
}

/** Cijeli meni na jednoj stranici, za QR kod na stolovima, složen kao štampani Behut meni. */
export function MenuPage({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const other: Locale = locale === 'bs' ? 'en' : 'bs'
  return <div className="mp">
    <JsonLd data={[cafeJsonLd(locale), menuJsonLd(locale), breadcrumbJsonLd(locale)]} />
    <a className="skip-link" href="#meni-lista">{t.skip}</a>
    <MpHero locale={locale} title={t.menuPage.title} lead={t.menuPage.lead} switchTo={paths.menu[other]} />

    <MenuJump categories={ordered.map(category => ({ id: category.id, name: tr(category.name, locale) }))} label={t.menuPage.jump} />

    <main id="meni-lista" className="mp-list" tabIndex={-1}>
      {columns.map((column, index) => <div key={index} className="mp-col">
        {column.map(category => <Category key={category.id} category={category} locale={locale} />)}
      </div>)}
    </main>
    <p className="mp-note">{t.menuPage.note}</p>

    <MpFoot locale={locale} />
  </div>
}
