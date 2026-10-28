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

export const menuImages: Record<string, SiteImage> = {
  'Bosanska kafa': {
    src: '/images/menu/bosanska-kafa.jpg',
    alt: 'Bosanska kafa u tradicionalnoj bakrenoj džezvi i fildžanu s rahatlokumom na Kovačima',
    position: '50% 55%',
  },
  'Behut specijalni čaj': {
    src: '/images/menu/behut-caj.jpg',
    alt: 'Behut specijalni biljni čaj poslužen u starinskoj čaši s cimetom i sušenom narandžom',
    position: '50% 58%',
  },
  Salep: {
    src: '/images/menu/salep.jpg',
    alt: 'Topli kremasti salep posut cimetom i pistacijama u vintage šolji',
    position: '50% 58%',
  },
  Limunana: {
    src: '/images/menu/limunana.jpg',
    alt: 'Osvježavajuća domaća limunana s ledom, svježim limunom i mentom na terasi Behuta',
    position: '50% 48%',
  },
  Ruža: {
    src: '/images/menu/sok-ruza.jpg',
    alt: 'Tradicionalni sarajevski domaći sok od ruže đulbešećerke s ledom',
    position: '55% 52%',
  },
  Menta: {
    src: '/images/menu/sok-menta.jpg',
    alt: 'Domaći osvježavajući sok od svježe mente s ledom i limunom',
    position: '50% 54%',
  },
  Zova: {
    src: '/images/menu/sok-zova.jpg',
    alt: 'Tradicionalni domaći sok od cvjetova zove s ledom i kriškom limuna',
    position: '50% 45%',
  },
  Šerbe: {
    src: '/images/menu/serbe.jpg',
    alt: 'Tradicionalno sarajevsko začinjeno šerbe posluženo u starinskoj čaši',
    position: '50% 52%',
  },
  'Behut ledeni čaj': {
    src: '/images/menu/ledeni-caj.jpg',
    alt: 'Behut kućni ledeni čaj s kriškama narandže, limuna i svježom mentom',
    position: '55% 50%',
  },
  Baklava: {
    src: '/images/menu/baklava.jpg',
    alt: 'Tradicionalna sarajevska baklava s orasima u domaćoj agdi na porculanskom tanjiru',
    position: '50% 58%',
  },
  Hurmašica: {
    src: '/images/menu/hurmasica.jpg',
    alt: 'Domaća zalivena hurmašica s orasima poslužena na vintage tanjiriću',
    position: '50% 60%',
  },
}

export const siteConfig = {
  name: 'BEHUT Sarajevo',
  instagram: 'https://www.instagram.com/behut_cafe/',
  address: 'Kovači 20, 71000 Sarajevo, Bosnia and Herzegovina',
  maps: 'https://www.google.com/maps/search/?api=1&query=Kova%C4%8Di%2020%2C%2071000%20Sarajevo%2C%20Bosnia%20and%20Herzegovina',
  openingHours: null as string | null,
  phone: null as string | null,
  menuPdf: null as string | null,
  coffeeImage: menuImages['Bosanska kafa'] as SiteImage | null,
  productImages: menuImages as Record<string, SiteImage | undefined>,
  hero: { main: images.terrace, left: images.facade, right: images.entrance },
  gallery: [images.guitar, images.city, images.interior, images.facade, images.entrance, images.terrace],
}

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
