import { ArrowUpRight, MapPin } from 'lucide-react'
import { allMenuItems, itemImage } from '@/data/menu'
import { drinkContent, drinkFaq, withPrices } from '@/data/drinks'
import { dict, formatPrice, paths, tr, type Locale } from '@/lib/i18n'
import { siteConfig } from '@/data/site-config'
import { breadcrumbJsonLd, cafeJsonLd, drinksJsonLd, faqJsonLd, pagePath } from '@/lib/seo'
import { JsonLd } from './json-ld'
import { MenuJump } from './menu-jump'
import { Divider, MpFoot, MpHero } from './mp-parts'
import { SiteImage } from './site-image'

const copy = {
  bs: {
    title: 'Naša pića',
    lead: 'Salep, Behut ledeni čaj, bosanska kafa, pink limunada i espresso: pet pića iz Behutovog menija, na Kovačima 20 u sarajevskom Starom Gradu.',
    jump: 'Pića',
    priceLabel: 'Cijena',
    where: 'Gdje nas naći',
    whereText: 'Behut Coffee shop, Kovači 20, 71000 Sarajevo, Stari Grad.',
    faq: 'Česta pitanja',
    alsoOnMenu: 'Još iz menija',
  },
  en: {
    title: 'Our drinks',
    lead: 'Salep, Behut Ice Tea, Bosnian coffee, pink lemonade and espresso: five drinks from the Behut menu, at Kovači 20 in Sarajevo’s Old Town.',
    jump: 'Drinks',
    priceLabel: 'Price',
    where: 'Find us',
    whereText: 'Behut Coffee shop, Kovači 20, 71000 Sarajevo, Old Town (Stari Grad).',
    faq: 'Frequently asked questions',
    alsoOnMenu: 'Also on the menu',
  },
}

/** Stranica pića: pet pića s pravim fotografijama, opisom iz menija i općim znanjem o piću; sav tekst je u HTML-u bez JavaScripta. */
export function DrinksPage({ locale }: { locale: Locale }) {
  const t = dict[locale], c = copy[locale]
  const other: Locale = locale === 'bs' ? 'en' : 'bs'
  const drinks = drinkContent.map(content => ({ content, item: allMenuItems.find(item => item.id === content.id)! }))
  const menuHref = (id: string) => `${pagePath(paths.menu[locale])}#${id}`

  return <div className="mp">
    <JsonLd data={[cafeJsonLd(locale), drinksJsonLd(locale), faqJsonLd(locale), breadcrumbJsonLd(locale, 'drinks')]} />
    <a className="skip-link" href="#pica-lista">{t.skip}</a>
    <MpHero locale={locale} title={c.title} lead={c.lead} switchTo={pagePath(paths.drinks[other])} />
    <MenuJump categories={drinks.map(({ item }) => ({ id: item.id, name: tr(item.name, locale) }))} label={c.jump} />

    <main id="pica-lista" className="dr-list" tabIndex={-1}>
      {drinks.map(({ content, item }) => {
        const image = itemImage(item, locale)
        const related = (content.related ?? []).map(id => allMenuItems.find(entry => entry.id === id)).filter(entry => entry !== undefined)
        return <section key={item.id} id={item.id} className="mp-cat dr" aria-labelledby={`${item.id}-title`}>
          {image && <div className="dr-photo"><SiteImage image={image} sizes="(min-width: 900px) 420px, 90vw" /></div>}
          <div className="dr-body">
            <header className="dr-head">
              <h2 id={`${item.id}-title`}>{tr(item.name, locale)}</h2>
              <p className="dr-price"><span className="sr-only">{c.priceLabel}: </span>{formatPrice(item.price, locale)}</p>
            </header>
            <p className="dr-lead">{withPrices(tr(content.lead, locale), locale)}</p>
            {item.description && <p className="dr-menu"><strong>{t.menuPage.title}:</strong> {tr(item.description, locale)}</p>}
            <h3>{tr(content.aboutTitle, locale)}</h3>
            <p>{withPrices(tr(content.about, locale), locale)}</p>
            {related.length > 0 && <p className="dr-related"><strong>{c.alsoOnMenu}:</strong> {related.map((entry, index) => <span key={entry.id}>{index > 0 && ', '}<a className="text-link" href={menuHref(entry.id)}>{tr(entry.name, locale)}</a> ({formatPrice(entry.price, locale)})</span>)}</p>}
            <div className="dr-actions">
              <a className="btn btn-forest" href={menuHref(item.id)}>{t.menuPage.inMenu}<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span></a>
              <a className="btn btn-ghost" href={`${paths.home[locale]}#lokacija`}>{t.directions}<span className="btn-icon"><MapPin size={17} aria-hidden="true" /></span></a>
            </div>
          </div>
        </section>
      })}

      <section className="mp-cat dr-faq" aria-labelledby="pica-faq">
        <header className="mp-cat-head">
          <h2 id="pica-faq">{c.faq}</h2>
          <Divider />
        </header>
        <dl>
          {drinkFaq.map(entry => <div key={entry.q.bs} className="dr-qa">
            <dt><h3>{tr(entry.q, locale)}</h3></dt>
            <dd>{withPrices(tr(entry.a, locale), locale)}</dd>
          </div>)}
        </dl>
      </section>

      <section className="mp-cat dr-where" aria-labelledby="pica-where">
        <header className="mp-cat-head">
          <h2 id="pica-where">{c.where}</h2>
          <Divider />
        </header>
        <p>{c.whereText}</p>
        <div className="dr-actions">
          <a className="btn btn-forest" href={siteConfig.maps} target="_blank" rel="noreferrer">{t.directions}<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span><span className="sr-only">{t.opensMaps}</span></a>
          <a className="btn btn-ghost" href={pagePath(paths.menu[locale])}>{t.menuPage.title}<span className="btn-icon"><ArrowUpRight size={17} aria-hidden="true" /></span></a>
        </div>
      </section>
    </main>
    <p className="mp-note">{t.menuPage.note}</p>
    <MpFoot locale={locale} />
  </div>
}
