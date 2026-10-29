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
  maps: 'https://www.google.com/maps/search/?api=1&query=Kova%C4%8Di%2020%2C%2071000%20Sarajevo%2C%20Bosnia%20and%20Herzegovina',
  mapsEmbed: 'https://www.google.com/maps?q=Kova%C4%8Di%2020%2C%2071000%20Sarajevo&z=17&output=embed',
  openingHours: null as string | null,
  phone: null as string | null,
  menuPdf: null as string | null,
  hero: { backdrop: images.city, fan: [images.terrace, images.entrance, images.facade] },
  gallery: [images.guitar, images.city, images.interior, images.facade, images.entrance, images.terrace],
}
