export type SiteImage = { src: string; alt: string; position?: string; mobileSrc?: string; aspectRatio?: string; fit?: 'cover' | 'contain' }

export const images = {
  logo: '/images/behut-logo.webp',
  terrace: { src: '/images/hero/sarajevo-terrace.webp', alt: 'Behutova terasa s pogledom na krovove starog Sarajeva', position: '50% 58%' },
  facade: { src: '/images/hero/green-facade.webp', alt: 'Zelena fasada Behuta, cvijeće i vintage stolice', position: '50% 45%' },
  entrance: { src: '/images/gallery/golden-entrance.jpg', alt: 'Zlatni Behut Sarajevo natpis na ulaznim vratima', position: '40% 50%' },
  interior: { src: '/images/about/vintage-lounge.webp', alt: 'Topli Behutov salon sa starinskim lampama, slikama i tradicionalnim tekstilom' },
  guitar: { src: '/images/gallery/guitar-and-lamps.webp', alt: 'Gitara i starinska lampa uz zelena vrata Behuta' },
  city: { src: '/images/gallery/kovaci-view.webp', alt: 'Šarene stolice na terasi i pogled niz sarajevske Kovače' },
} satisfies Record<string, SiteImage | string>

export const siteConfig = {
  name: 'BEHUT Sarajevo',
  instagram: 'https://www.instagram.com/behut_cafe/',
  address: 'Kovači 20, 71000 Sarajevo, Bosnia and Herzegovina',
  // Google Maps profil "Behut Coffee shop" (43.8602721, 18.4322111).
  maps: 'https://maps.app.goo.gl/CyjTezFVSEwX47Z27',
  mapsEmbed: 'https://www.google.com/maps?q=Behut+Coffee+shop,+Kova%C4%8Di+20,+Sarajevo&ll=43.8602721,18.4322111&z=17&output=embed',
  openingHours: null as string | null,
  phone: null as string | null,
  menuPdf: null as string | null,
  hero: { backdrop: images.city, fan: [images.terrace, images.entrance, images.facade] },
  /** Reelovi u Instagram sekciji; `featured` je onaj koji je na početku u sredini. */
  instagramReels: [
    { reel: 'DTGLBZBDZHu', title: '@behut_cafe' },
    { reel: 'DTnrqLeCJfv', title: '@behut_cafe' },
    { reel: 'DPMcmKSDaCq', title: '#visitsarajevo', caption: '#behut #visitsarajevo' },
    { reel: 'DKzh2WLt9hw', title: 'U Behutu', caption: 'U Behutu, gdje vrijeme stane, a sunce i čaj plešu polako – nastaje poezija', featured: true },
    { reel: 'DPJ1vhWjfEc', title: '@behut_cafe' },
    { reel: 'DOlooOojMgE', title: '@behut_cafe' },
  ] as { reel: string; title: string; caption?: string; featured?: boolean }[],
  gallery: [images.guitar, images.city, images.interior, images.facade, images.entrance, images.terrace],
}
