import type { SiteImage } from './site-config'

/** price je null dok cijena nije potvrđena; tada se na sajtu ne prikazuje. */
export type MenuItem = {
  id: string
  name: { bs: string; en?: string }
  price: number | null
  image?: SiteImage
  description?: string
  /** Ikona kad nema fotografije. */
  icon?: 'cup' | 'glass' | 'pastry'
}
export type MenuCategory = { id: string; name: string; items: MenuItem[] }

const photo = (file: string, alt: string): SiteImage => ({ src: `/images/menu/${file}.webp`, alt })

const categories: MenuCategory[] = [
  {
    id: 'topli',
    name: 'Topli napici',
    items: [
      { id: 'bosanska-kafa', name: { bs: 'Bosanska kafa', en: 'Bosnian coffee' }, price: 5, icon: 'cup', description: 'Kuhana u džezvi, servirana polako. Kafa za sjedenje, ne za usput.' },
      { id: 'espresso', name: { bs: 'Espresso' }, price: null, image: photo('espresso', 'Espresso u bijeloj šoljici s cvjetnim tanjirićem'), description: 'Kratak, gust i aromatičan. Za one koji znaju šta hoće.' },
      { id: 'espresso-doppio', name: { bs: 'Espresso doppio' }, price: null, image: photo('espresso-doppio', 'Dupli espresso s gustom kremom u bijeloj šoljici'), description: 'Duplo espressa, duplo razloga da ostaneš.' },
      { id: 'mali-makijato', name: { bs: 'Mali makijato' }, price: null, image: photo('mali-makijato', 'Mali makijato s mliječnom pjenom u maloj šoljici'), description: 'Espresso i kapljica mliječne pjene. Mali, ali svoj.' },
      { id: 'veliki-makijato', name: { bs: 'Veliki makijato' }, price: null, image: photo('veliki-makijato', 'Veliki makijato s latte art listom u bijeloj šoljici'), description: 'Više mlijeka, više mekoće, isti espresso u srcu.' },
      { id: 'kapucino', name: { bs: 'Kapućino', en: 'Cappuccino' }, price: null, image: photo('kapucino', 'Kapućino s latte art listom na bijelom tanjiriću'), description: 'Espresso, toplo mlijeko i svilenkasta pjena.' },
      { id: 'flat-white', name: { bs: 'Flat white' }, price: null, image: photo('flat-white', 'Flat white s latte art crtežom u bijeloj šoljici'), description: 'Jači od kapućina, mekši od espressa.' },
      { id: 'topla-cokolada', name: { bs: 'Topla čokolada', en: 'Hot chocolate' }, price: null, image: photo('topla-cokolada', 'Topla čokolada sa šlagom i komadićima čokolade u staklenoj šolji'), description: 'Gusta, topla i sa šlagom. Za hladnije sarajevske dane.' },
      { id: 'salep', name: { bs: 'Salep' }, price: null, image: photo('salep', 'Salep posut cimetom u staklenoj šolji'), description: 'Topli mliječni napitak posut cimetom.' },
      { id: 'behut-specijalni-caj', name: { bs: 'Behut specijalni čaj' }, price: null, icon: 'cup', description: 'Behutov specijalni čaj, za spori razgovor.' },
    ],
  },
  {
    id: 'ledene-kafe',
    name: 'Ledene kafe',
    items: [
      { id: 'ledeni-espresso', name: { bs: 'Ledeni espresso', en: 'Iced espresso' }, price: null, image: photo('ledeni-espresso', 'Ledeni espresso s kockama leda u staklenoj čaši'), description: 'Espresso preko leda. Kratko osvježenje.' },
      { id: 'ledeni-americano', name: { bs: 'Ledeni americano', en: 'Iced americano' }, price: null, image: photo('ledeni-americano', 'Ledeni americano s ledom u staklenoj čaši'), description: 'Espresso, hladna voda i puno leda.' },
      { id: 'ledeni-latte-karamel', name: { bs: 'Ledeni latte s karamelom', en: 'Caramel iced latte' }, price: null, image: photo('ledeni-latte-karamel', 'Ledeni latte s karamelom i ledom u visokoj čaši sa slamkom'), description: 'Mlijeko, espresso i karamel preko leda.' },
      { id: 'ledena-moka', name: { bs: 'Ledena moka', en: 'Iced mocha' }, price: null, image: photo('ledena-moka', 'Ledena moka s čokoladnim prelivom u visokoj čaši sa slamkom'), description: 'Espresso i čokolada, ohlađeni za terasu.' },
    ],
  },
  {
    id: 'tradicionalni-sokovi',
    name: 'Tradicionalni sokovi',
    items: [
      { id: 'ruza', name: { bs: 'Ruža' }, price: null, image: photo('ruza', 'Sok od ruže s laticama i ledom u visokoj čaši'), description: 'Sok od ruže, s laticama i ledom.' },
      { id: 'menta', name: { bs: 'Menta' }, price: null, image: photo('menta', 'Osvježavajući sok od mente s ledom u visokoj čaši'), description: 'Hladna, svježa i zelena kao naša vrata.' },
      { id: 'zova', name: { bs: 'Zova' }, price: null, image: photo('zova', 'Sok od zove s ledom u visokoj čaši sa slamkom'), description: 'Cvjetni, osvježavajući sok od zove.' },
      { id: 'serbe', name: { bs: 'Šerbe' }, price: null, icon: 'glass', description: 'Tradicionalno šerbe, slatko i hladno.' },
    ],
  },
  {
    id: 'prirodni',
    name: 'Prirodni napici',
    items: [{ id: 'limunada', name: { bs: 'Limunada' }, price: null, icon: 'glass', description: 'Svjež limun za vrući dan.' }],
  },
  {
    id: 'specials',
    name: 'Behut Specials',
    items: [{ id: 'behut-ledeni-caj', name: { bs: 'Behut ledeni čaj' }, price: null, icon: 'glass', description: 'Behutov ledeni čaj za terasu.' }],
  },
  {
    id: 'kolaci',
    name: 'Tradicionalni kolači',
    items: [
      { id: 'baklava', name: { bs: 'Baklava' }, price: null, icon: 'pastry', description: 'Uz kafu, kako to već ide.' },
      { id: 'hurmasica', name: { bs: 'Hurmašica' }, price: null, icon: 'pastry', description: 'Tradicionalni kolač natopljen šerbetom.' },
    ],
  },
]
export const menuCategories = categories.filter(category => category.items.length > 0)

export type MenuEntry = MenuItem & { category: string }
export const allMenuItems: MenuEntry[] = menuCategories.flatMap(category => category.items.map(item => ({ ...item, category: category.name })))

/** Pića u luku iznad tamne sekcije: samo ona koja imaju fotografiju. */
const featuredIds = ['espresso', 'mali-makijato', 'kapucino', 'flat-white', 'salep', 'ruza', 'ledeni-latte-karamel', 'menta']
export const featuredDrinks = featuredIds.map(id => allMenuItems.find(item => item.id === id)).filter((item): item is MenuEntry => Boolean(item?.image))

export const formatPrice = (price: number) => `${price.toFixed(2).replace('.', ',')} KM`
