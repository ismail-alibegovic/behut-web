import type { SiteImage } from './site-config'

/**
 * Behut menu — single source of truth for the digital menu.
 *
 * Only products and prices that have been verified are listed here. A `price`
 * of `null` means the price has not been confirmed yet and is shown as
 * "cijena u caféu". Do not add products, prices or descriptions that are not
 * on the approved Behut menu.
 */

export type FrameVariant = 'brass' | 'walnut' | 'bronze'

export type MenuCategoryId = 'topli-napici' | 'hladni-napici' | 'prirodni-napici' | 'tradicionalni-sokovi' | 'ledene-kafe' | 'behut-specials' | 'tradicionalni-kolaci'

export type MenuCategory = { id: MenuCategoryId; name: string; note?: string }

export type MenuItem = {
  id: string
  category: MenuCategoryId
  name: string
  nameEn?: string
  /** Price in KM, or null when not yet verified. */
  price: number | null
  description?: string
  image?: SiteImage
  frame: FrameVariant
}

export const menuCategories: MenuCategory[] = [
  { id: 'topli-napici', name: 'Topli napici' },
  { id: 'hladni-napici', name: 'Hladni napici' },
  { id: 'prirodni-napici', name: 'Prirodni napici' },
  { id: 'tradicionalni-sokovi', name: 'Tradicionalni sokovi' },
  { id: 'ledene-kafe', name: 'Ledene kafe' },
  { id: 'behut-specials', name: 'Behut Specials' },
  { id: 'tradicionalni-kolaci', name: 'Tradicionalni kolači' },
]

const photo = (file: string, alt: string, position = '50% 55%'): SiteImage => ({ src: `/images/menu/${file}`, alt, position, width: 1200, height: 896 })

export const menuItems: MenuItem[] = [
  {
    id: 'bosanska-kafa',
    category: 'topli-napici',
    name: 'Bosanska kafa',
    nameEn: 'Bosnian coffee',
    price: 5,
    description: 'Džezva, fildžan i vrijeme koje je samo tvoje.',
    image: photo('bosanska-kafa.webp', 'Bosanska kafa u bakrenoj džezvi i fildžanu s kockom rahatlokuma', '52% 55%'),
    frame: 'brass',
  },
  {
    id: 'behut-specijalni-caj',
    category: 'topli-napici',
    name: 'Behut specijalni čaj',
    price: null,
    description: 'Kućni čaj za duge razgovore.',
    image: photo('behut-caj.webp', 'Behut specijalni čaj u staklenoj šolji na drvenom stolu', '50% 58%'),
    frame: 'walnut',
  },
  {
    id: 'salep',
    category: 'topli-napici',
    name: 'Salep',
    price: null,
    description: 'Topao, kremast, zimski klasik starog Sarajeva.',
    image: photo('salep.webp', 'Topli salep u porculanskoj šolji na tanjiriću', '50% 60%'),
    frame: 'bronze',
  },
  {
    id: 'limunana',
    category: 'prirodni-napici',
    name: 'Limunana',
    price: null,
    description: 'Domaća, hladna i uvijek dobrodošla.',
    image: photo('limunana.webp', 'Čaša limunade s ledom, kriškom limuna i listićima mente', '42% 55%'),
    frame: 'brass',
  },
  {
    id: 'sok-ruza',
    category: 'tradicionalni-sokovi',
    name: 'Ruža',
    price: null,
    description: 'Tradicionalni sok od ruže.',
    image: photo('sok-ruza.webp', 'Ružičasti sok od ruže u brušenoj čaši s laticama ruže', '52% 55%'),
    frame: 'walnut',
  },
  {
    id: 'sok-menta',
    category: 'tradicionalni-sokovi',
    name: 'Menta',
    price: null,
    description: 'Tradicionalni sok od mente.',
    image: photo('sok-menta.webp', 'Zeleni sok od mente u čaši s ledom i limunom', '64% 55%'),
    frame: 'bronze',
  },
  {
    id: 'sok-zova',
    category: 'tradicionalni-sokovi',
    name: 'Zova',
    price: null,
    description: 'Tradicionalni sok od zove.',
    frame: 'brass',
  },
  {
    id: 'serbe',
    category: 'tradicionalni-sokovi',
    name: 'Šerbe',
    price: null,
    description: 'Staro sarajevsko osvježenje.',
    image: photo('serbe.webp', 'Šerbe u visokoj čaši s ledom, štapićem cimeta i kriškom limuna', '45% 55%'),
    frame: 'walnut',
  },
  {
    id: 'behut-ledeni-caj',
    category: 'behut-specials',
    name: 'Behut ledeni čaj',
    price: null,
    description: 'Naš kućni ledeni čaj za dane na terasi.',
    image: photo('ledeni-caj.webp', 'Behut ledeni čaj u visokoj čaši s kriškama citrusa i mentom', '33% 55%'),
    frame: 'bronze',
  },
  {
    id: 'baklava',
    category: 'tradicionalni-kolaci',
    name: 'Baklava',
    price: null,
    description: 'Sarajevski klasik uz kafu.',
    image: photo('baklava.webp', 'Dva komada baklave na porculanskom tanjiru', '40% 60%'),
    frame: 'brass',
  },
  {
    id: 'hurmasica',
    category: 'tradicionalni-kolaci',
    name: 'Hurmašica',
    price: null,
    description: 'Zalivena, kao kod nane.',
    image: photo('hurmasica.webp', 'Dvije hurmašice na porculanskom tanjiru', '50% 55%'),
    frame: 'walnut',
  },
]

/** Featured on the dark "Behut favoriti" stage. IDs must exist in `menuItems`. */
export const featuredDrinkIds = ['bosanska-kafa', 'salep', 'behut-ledeni-caj', 'serbe'] as const

export const featuredCopy: Record<(typeof featuredDrinkIds)[number], { kicker: string; story: string }> = {
  'bosanska-kafa': { kicker: 'Ritual broj jedan', story: 'Nije samo kafa. To je vrijeme za sebe, za svoje ljude i za razgovore koji traju. Polako, iz džezve, kako je oduvijek bilo.' },
  salep: { kicker: 'Za hladnije dane', story: 'Topao i kremast, salep je mali zimski zagrljaj. Pije se polako, uz pogled na Kovače.' },
  'behut-ledeni-caj': { kicker: 'Kućni specijalitet', story: 'Naš ledeni čaj, napravljen za ljetna popodneva na terasi. Još jedan razlog da ostaneš malo duže.' },
  serbe: { kicker: 'Sarajevska tradicija', story: 'Šerbe pamte stare čaršijske kafane. Mi ga služimo s istim poštovanjem, u čaši koja se ne prazni na brzinu.' },
}

export const getMenuItem = (id: string) => menuItems.find(item => item.id === id)

export const formatPrice = (price: number | null) => (price === null ? null : `${price.toFixed(2).replace('.', ',')} KM`)
