import type { L, Locale } from '@/lib/i18n'

export type SiteImage = { src: string; alt: string; position?: string; fit?: 'cover' | 'contain' }

/** Slika s alt tekstom na oba jezika; `localize` je pretvara u SiteImage za jedan jezik. */
export type LocalImage = Omit<SiteImage, 'alt'> & { alt: L }
export const localize = (image: LocalImage, locale: Locale): SiteImage => ({ ...image, alt: image.alt[locale] })

export const logo = '/images/behut-logo.webp'

export const images = {
  terrace: { src: '/images/hero/sarajevo-terrace.webp', alt: { bs: 'Behutova terasa s pogledom na krovove starog Sarajeva', en: 'Behut’s terrace overlooking the rooftops of old Sarajevo' }, position: '50% 58%' },
  facade: { src: '/images/hero/green-facade.webp', alt: { bs: 'Zelena fasada Behuta, cvijeće i vintage stolice', en: 'Behut’s green façade with flowers and vintage chairs' }, position: '50% 45%' },
  entrance: { src: '/images/gallery/golden-entrance.jpg', alt: { bs: 'Zlatni Behut Sarajevo natpis na ulaznim vratima', en: 'Golden Behut Sarajevo lettering on the entrance door' }, position: '40% 50%' },
  interior: { src: '/images/about/vintage-lounge.webp', alt: { bs: 'Topli Behutov salon sa starinskim lampama, slikama i tradicionalnim tekstilom', en: 'Behut’s cosy lounge with antique lamps, paintings and traditional textiles' } },
  guitar: { src: '/images/gallery/guitar-and-lamps.webp', alt: { bs: 'Gitara i starinska lampa uz zelena vrata Behuta', en: 'A guitar and an antique lamp by Behut’s green door' } },
  city: { src: '/images/gallery/kovaci-view.webp', alt: { bs: 'Šarene stolice na terasi i pogled niz sarajevske Kovače', en: 'Colourful terrace chairs and a view down Sarajevo’s Kovači street' } },
} satisfies Record<string, LocalImage>

export const siteConfig = {
  name: 'BEHUT Sarajevo',
  /** Javna adresa sajta; QR kodovi za meni vode ovdje. Promijeni kad bude vlastita domena. */
  siteUrl: 'https://behut-web.vercel.app',
  instagram: 'https://www.instagram.com/behut_cafe/',
  address: 'Kovači 20, 71000 Sarajevo, Bosnia and Herzegovina',
  // Google Maps profil "Behut Coffee shop" (43.8602721, 18.4322111).
  maps: 'https://maps.app.goo.gl/CyjTezFVSEwX47Z27',
  mapsEmbed: 'https://www.google.com/maps?q=Behut+Coffee+shop,+Kova%C4%8Di+20,+Sarajevo&ll=43.8602721,18.4322111&z=17&output=embed',
  openingHours: null as L | null,
  phone: null as string | null,
  menuPdf: null as string | null,
  hero: { backdrop: images.city, fan: [images.terrace, images.entrance, images.facade] },
  /** Reelovi u Instagram sekciji; `featured` je onaj koji je na početku u sredini. */
  instagramReels: [
    { reel: 'DTGLBZBDZHu', title: { bs: '@behut_cafe', en: '@behut_cafe' } },
    { reel: 'DTnrqLeCJfv', title: { bs: '@behut_cafe', en: '@behut_cafe' } },
    { reel: 'DPMcmKSDaCq', title: { bs: '#visitsarajevo', en: '#visitsarajevo' }, caption: { bs: '#behut #visitsarajevo', en: '#behut #visitsarajevo' } },
    { reel: 'DKzh2WLt9hw', title: { bs: 'U Behutu', en: 'At Behut' }, caption: { bs: 'U Behutu, gdje vrijeme stane, a sunce i čaj plešu polako – nastaje poezija', en: 'At Behut, where time stands still and the sun and tea dance slowly – poetry is born' }, featured: true },
    { reel: 'DPJ1vhWjfEc', title: { bs: '@behut_cafe', en: '@behut_cafe' } },
    { reel: 'DOlooOojMgE', title: { bs: '@behut_cafe', en: '@behut_cafe' } },
  ] as { reel: string; title: L; caption?: L; featured?: boolean }[],
  gallery: [images.guitar, images.city, images.interior, images.facade, images.entrance, images.terrace],
}
