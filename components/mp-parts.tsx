import { ArrowLeft, ArrowUp, ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { siteConfig } from '@/data/site-config'
import { dict, paths, type Locale } from '@/lib/i18n'
import { LogoMark } from './logo-mark'
import { BlossomBranch, LeafSprig } from './botanical'

/** Ukrasni razdjelnik kao na štampanom meniju: linija, romb i tačke. */
export function Divider({ className = '' }: { className?: string }) {
  return <svg className={`mp-divider ${className}`} viewBox="0 0 240 14" aria-hidden="true" focusable="false">
    <path d="M4 7h92M144 7h92" />
    <circle cx="100" cy="7" r="1.6" /><circle cx="140" cy="7" r="1.6" />
    <path d="m120 1.5 5.5 5.5-5.5 5.5-5.5-5.5Z" />
  </svg>
}

/** Zeleno zaglavlje s logom, naslovom i prekidačem jezika; zajedničko za meni i stranicu pića. */
export function MpHero({ locale, title, lead, switchTo }: { locale: Locale; title: string; lead: string; switchTo: string }) {
  const t = dict[locale]
  const other: Locale = locale === 'bs' ? 'en' : 'bs'
  return <header className="mp-hero on-dark beans">
    <BlossomBranch className="mp-branch" />
    <LeafSprig className="mp-sprig" />
    <div className="mp-top">
      <a className="mp-pill" href={paths.home[locale]}><ArrowLeft size={16} aria-hidden="true" />{t.menuPage.back}</a>
      <a className="mp-pill" href={switchTo} hrefLang={other} lang={other} aria-label={t.nav.switchLabel}>{other.toUpperCase()}</a>
    </div>
    <div className="mp-title">
      <a className="mp-logo" href={paths.home[locale]} aria-label={t.toTop}><LogoMark /></a>
      <h1>{title}</h1>
      <Divider />
      <p>{lead}</p>
    </div>
  </header>
}

export function MpFoot({ locale }: { locale: Locale }) {
  const t = dict[locale]
  return <footer className="mp-foot on-dark beans">
    <LogoMark className="mp-foot-logo" />
    <div className="mp-foot-links">
      <a href={siteConfig.maps} target="_blank" rel="noreferrer"><MapPin size={16} aria-hidden="true" />Kovači 20, Sarajevo<span className="sr-only">{t.opensMaps}</span></a>
      <a href={`mailto:${siteConfig.email}`}><Mail size={16} aria-hidden="true" />{siteConfig.email}</a>
      <a href={siteConfig.instagram} target="_blank" rel="noreferrer">@behut_cafe <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">{t.opensInstagram}</span></a>
      <a href="#">{t.footer.top.replace(' ↑', '')} <ArrowUp size={15} aria-hidden="true" /></a>
    </div>
    <div className="mp-foot-copy"><p>© {new Date().getFullYear()} BEHUT Sarajevo. {t.footer.rights}.</p><p className="footer-credit">{t.footer.madeBy} <em>Ismail Alibegović</em></p></div>
  </footer>
}
