export type SiteImage = { src: string; alt: string; position?: string; mobileSrc?: string; aspectRatio?: string; fit?: 'cover' | 'contain' }

export const images = {
  logo: '/images/behut-logo.png',
  terrace: { src: '/images/hero/sarajevo-terrace.webp', alt: 'Behutova terasa s pogledom na krovove starog Sarajeva', position: '50% 58%' },
  facade: { src: '/images/hero/green-facade.webp', alt: 'Zelena fasada Behuta, cvijeće i vintage stolice', position: '50% 45%' },
  entrance: { src: '/images/gallery/golden-entrance.jpg', alt: 'Zlatni Behut Sarajevo natpis na ulaznim vratima' },
  interior: { src: '/images/about/vintage-lounge.webp', alt: 'Topli Behutov salon sa starinskim lampama, slikama i tradicionalnim tekstilom' },
  guitar: { src: '/images/gallery/guitar-and-lamps.webp', alt: 'Gitara i starinska lampa uz zelena vrata Behuta' },
  city: { src: '/images/gallery/kovaci-view.webp', alt: 'Šarene stolice na terasi i pogled niz sarajevske Kovače' },
} satisfies Record<string, SiteImage | string>

export const siteConfig = {
  name: 'BEHUT Sarajevo',
  instagram: 'https://www.instagram.com/behut_cafe/',
  address: 'Kovači 20, 71000 Sarajevo, Bosnia and Herzegovina',
  maps: 'https://www.google.com/maps/search/?api=1&query=Kova%C4%8Di%2020%2C%2071000%20Sarajevo%2C%20Bosnia%20and%20Herzegovina',
  openingHours: null as string | null,
  phone: null as string | null,
  menuPdf: null as string | null,
  coffeeImage: null as SiteImage | null,
  productImages: {} as Record<string, SiteImage | undefined>,
  hero: { main: images.terrace, left: images.facade, right: images.entrance },
  gallery: [images.guitar, images.city, images.interior, images.facade, images.entrance, images.terrace],
}

export type InstagramPost = { id: string; kind: 'reel' | 'p' }
// Stvarne objave sa @behut_cafe — dodaj/zamijeni ID iz linka objave (instagram.com/reel/<ID>/)
export const instagramPosts: InstagramPost[] = [
  { id: 'DNQQMOXt8Bv', kind: 'reel' },
  { id: 'DPJ1vhWjfEc', kind: 'reel' },
  { id: 'DTGLBZBDZHu', kind: 'reel' },
]

export type MenuItem = { name: { bs: string; en?: string }; price: number | null }
export const menuCategories: { name: string; items: MenuItem[] }[] = [
  { name: 'Topli napici', items: [{ name: { bs: 'Bosanska kafa', en: 'Bosnian coffee' }, price: 5 }, { name: { bs: 'Behut specijalni čaj' }, price: null }, { name: { bs: 'Salep' }, price: null }] },
  { name: 'Hladni napici', items: [] },
  { name: 'Prirodni napici', items: [{ name: { bs: 'Limunana' }, price: null }] },
  { name: 'Tradicionalni sokovi', items: ['Ruža', 'Menta', 'Zova', 'Šerbe'].map(bs => ({ name: { bs }, price: null })) },
  { name: 'Ledene kafe', items: [] },
  { name: 'Behut Specials', items: [{ name: { bs: 'Behut ledeni čaj' }, price: null }] },
  { name: 'Tradicionalni kolači', items: ['Baklava', 'Hurmašica'].map(bs => ({ name: { bs }, price: null })) },
]
