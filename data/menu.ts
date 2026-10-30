import type { L, Locale } from '@/lib/i18n'
import type { SiteImage } from './site-config'

/**
 * Behut meni prema "Kula.pdf" (Canva, avgust 2026). Cijene su u KM; opisi samo tamo gdje ih ima u PDF-u.
 * Fotografiju piću dodaješ tako da staviš sliku u public/images/menu/<id>.webp
 * i stavci upišeš `photo: { bs: '…', en: '…' }` (opis slike za čitače ekrana).
 */
export type MenuItem = {
  id: string
  name: L
  price: number
  description?: L
  /** Alt tekst fotografije public/images/menu/<id>.webp; bez nje se prikazuje ikona. */
  photo?: L
  /** Tačka na fotografiji gdje je piće (CSS object-position), za kadriranje u ovalnom okviru. */
  focus?: string
  /** Ikona kad nema fotografije. */
  icon?: 'cup' | 'glass' | 'pastry'
  /** Stavka se ne prikazuje u meniju na početnoj (ali je u punom meniju za QR). */
  homeHidden?: boolean
  /** Okusi s vlastitom fotografijom public/images/menu/<id>.webp; biraju se u detaljima stavke. */
  variants?: MenuVariant[]
}
export type MenuVariant = { id: string; name: L; photo: L }
export type MenuCategory = {
  id: string
  name: L
  /** Kategorije koje se ne prikazuju u meniju na početnoj (ali su u punom meniju za QR). */
  homeHidden?: boolean
  items: MenuItem[]
}

const same = (text: string): L => ({ bs: text, en: text })

export const menuCategories: MenuCategory[] = [
  {
    id: 'topli-napici',
    name: { bs: 'Topli napici', en: 'Hot drinks' },
    items: [
      { id: 'bosanska-kafa', focus: '50% 45%', name: { bs: 'Bosanska kafa', en: 'Bosnian coffee' }, price: 5, photo: { bs: 'Bosanska kafa u bakrenoj džezvi s fildžanom i kockama šećera na rezbarenom tacnu', en: 'Bosnian coffee in a copper džezva with a fildžan cup and sugar cubes on a carved tray' } },
      { id: 'espresso', focus: '50% 42%', name: same('Espresso'), price: 3, photo: { bs: 'Espresso u bijeloj šoljici s cvjetnim tanjirićem', en: 'Espresso in a white cup on a floral saucer' } },
      { id: 'espresso-doppio', focus: '50% 42%', name: same('Espresso doppio'), price: 5, photo: { bs: 'Dupli espresso s gustom kremom u bijeloj šoljici', en: 'Double espresso with thick crema in a white cup' } },
      { id: 'extra-espresso-shot', name: { bs: 'Dodatni espresso shot', en: 'Extra espresso shot' }, price: 2, icon: 'cup', homeHidden: true },
      { id: 'veliki-makijato', focus: '50% 40%', name: same('Macchiato'), price: 4, photo: { bs: 'Makijato s latte art listom u bijeloj šoljici', en: 'Macchiato with latte art in a white cup' } },
      { id: 'mali-makijato', focus: '48% 42%', name: { bs: 'Mali macchiato', en: 'Piccolo macchiato' }, price: 3, photo: { bs: 'Mali makijato s mliječnom pjenom u maloj šoljici', en: 'Piccolo macchiato with milk foam in a small cup' } },
      { id: 'flat-white', focus: '50% 40%', name: same('Flat white'), price: 5, photo: { bs: 'Flat white s latte art crtežom u bijeloj šoljici', en: 'Flat white with latte art in a white cup' } },
      { id: 'americano', focus: '50% 42%', name: same('Americano'), price: 3.5, photo: { bs: 'Americano s kremom u bijeloj šoljici na tanjiriću', en: 'Americano with crema in a white cup on a saucer' } },
      { id: 'kapucino', focus: '50% 40%', name: same('Cappuccino'), price: 4, photo: { bs: 'Kapućino s latte art listom na bijelom tanjiriću', en: 'Cappuccino with latte art on a white saucer' } },
      { id: 'latte-macchiato', name: same('Latte macchiato'), price: 4.5, icon: 'glass' },
      { id: 'caffe-mocha', name: same('Caffe mocha'), price: 5, icon: 'cup', homeHidden: true },
      { id: 'bezkofeinska-kafa', focus: '50% 42%', name: { bs: 'Bezkofeinska kafa', en: 'Decaf coffee' }, price: 5, photo: { bs: 'Bezkofeinska kafa u bijeloj šoljici na tanjiriću', en: 'Decaf coffee in a white cup on a saucer' } },
      { id: 'topla-cokolada', focus: '50% 48%', name: { bs: 'Topla čokolada', en: 'Hot chocolate' }, price: 5, photo: { bs: 'Topla čokolada sa šlagom i komadićima čokolade u staklenoj šolji', en: 'Hot chocolate with whipped cream and chocolate pieces in a glass mug' } },
      { id: 'nescafe', focus: '50% 50%', name: same('Nescafe'), price: 4, photo: { bs: 'Nescafe s mliječnom pjenom u staklenoj šolji', en: 'Nescafe with milk foam in a glass mug' }, description: { bs: 'Vanilija, čokolada, bajadera', en: 'Vanilla, chocolate, bajadera' }, variants: [
        { id: 'nescafe', name: { bs: 'Vanilija', en: 'Vanilla' }, photo: { bs: 'Nescafe vanilija s mliječnom pjenom u staklenoj šolji', en: 'Vanilla Nescafe with milk foam in a glass mug' } },
        { id: 'nescafe-cokolada', name: { bs: 'Čokolada', en: 'Chocolate' }, photo: { bs: 'Nescafe čokolada s pjenom u staklenoj šolji', en: 'Chocolate Nescafe with foam in a glass mug' } },
        { id: 'nescafe-bajadera', name: same('Bajadera'), photo: { bs: 'Nescafe bajadera s pjenom u staklenoj šolji', en: 'Bajadera Nescafe with foam in a glass mug' } },
      ] },
      { id: 'premium-caj', name: { bs: 'Premium čaj', en: 'Herbal premium tea' }, price: 4, icon: 'cup', homeHidden: true },
      { id: 'turski-caj', name: { bs: 'Turski čaj', en: 'Turkish tea' }, price: 3.5, icon: 'cup', homeHidden: true },
    ],
  },
  {
    id: 'ledene-kafe',
    name: { bs: 'Ledene kafe', en: 'Iced coffee' },
    items: [
      { id: 'ledeni-espresso', focus: '50% 50%', name: { bs: 'Ledeni espresso', en: 'Iced espresso' }, price: 5, photo: { bs: 'Ledeni espresso s kockama leda u staklenoj čaši', en: 'Iced espresso with ice cubes in a glass' }, description: { bs: 'Dupli espresso preko leda, jednostavno i snažno.', en: 'Double espresso over ice, simple and strong.' } },
      { id: 'ledeni-americano', focus: '50% 50%', name: { bs: 'Ledeni americano', en: 'Iced americano' }, price: 5, photo: { bs: 'Ledeni americano s ledom u staklenoj čaši', en: 'Iced americano with ice in a glass' }, description: { bs: 'Osvježavajući espresso s hladnom vodom i ledom.', en: 'Refreshing espresso with cold water and ice.' } },
      { id: 'ledeni-latte', focus: '50% 50%', name: { bs: 'Ledeni latte', en: 'Iced latte' }, price: 6, photo: { bs: 'Ledeni latte s ledom u rebrastoj staklenoj čaši', en: 'Iced latte with ice in a ribbed glass' }, description: { bs: 'Espresso + hladno mlijeko + led.', en: 'Espresso + cold milk + ice.' } },
      { id: 'ledeni-latte-karamel', focus: '50% 48%', name: { bs: 'Ledeni caramel latte', en: 'Iced caramel latte' }, price: 7, photo: { bs: 'Ledeni latte s karamelom i ledom u visokoj čaši sa slamkom', en: 'Iced caramel latte with ice in a tall glass with a straw' }, description: { bs: 'Hladan latte sa karamel sirupom i šlagom.', en: 'Chilled latte with caramel syrup and whipped cream.' } },
      { id: 'ledena-moka', focus: '50% 48%', name: { bs: 'Ledena mocha', en: 'Iced mocha' }, price: 7, photo: { bs: 'Ledena moka s čokoladnim prelivom u visokoj čaši sa slamkom', en: 'Iced mocha with chocolate drizzle in a tall glass with a straw' }, description: { bs: 'Čokolada + espresso + mlijeko + led = desert u čaši.', en: 'Chocolate + espresso + milk + ice, a dessert in a cup.' } },
    ],
  },
  {
    id: 'behut-specials',
    name: same('Behut specials'),
    items: [
      { id: 'behut-specijalni-caj', focus: '50% 45%', name: { bs: 'Behut speciality čaj', en: 'Behut speciality tea' }, price: 6, photo: { bs: 'Behut čaj u plavom livenom čajniku sa šoljicom na drvenom tacnu', en: 'Behut tea in a blue cast-iron teapot with a cup on a wooden tray' }, description: { bs: 'Pažljivo odabrano bilje za naš specijalitet, BEHUT čaj.', en: 'Finely selected herbs for our BEHUT speciality tea.' } },
      { id: 'behut-ledeni-caj', focus: '50% 50%', name: { bs: 'Behut ledeni čaj', en: 'Behut ice tea' }, price: 7, photo: { bs: 'Plavo-ljubičasti ledeni čaj s laticama ruže i slamkom, uz čašicu limunovog soka', en: 'Blue-violet iced tea with rose petals and a straw, beside a shot of lemon juice' }, description: { bs: 'Čaj koji mijenja boju, od cvijeta plave klitorije, mente i limuna – živopisan, osvježavajuć i čaroban.', en: 'Colour-changing tea with butterfly pea flower, mint and lemon. Vibrant, refreshing and magical.' } },
      { id: 'salep', focus: '45% 50%', name: same('Salep'), price: 5, photo: { bs: 'Salep posut cimetom u staklenoj šolji', en: 'Salep dusted with cinnamon in a glass mug' }, description: { bs: 'Topao napitak od korijena orhideje, kremast i bogat tradicijom.', en: 'Heartwarming drink from orchid tubers, creamy and full of tradition.' } },
      { id: 'pink-limunada', focus: '50% 45%', name: { bs: 'Pink limunada', en: 'Pink lemonade' }, price: 5, photo: { bs: 'Roze limunada s ledom i laticama ruže u rebrastoj čaši', en: 'Pink lemonade with ice and rose petals in a ribbed glass' }, description: { bs: 'Voćna limunada nježno roze boje, lagana, osvježavajuća i posebna.', en: 'Fruity lemonade with a soft pink hue – light, refreshing and unique.' } },
      { id: 'limunana', focus: '50% 45%', name: same('Limunana'), price: 5, photo: { bs: 'Zelena limunana s ledom u rebrastoj staklenoj čaši', en: 'Green limunana with ice in a ribbed glass' }, description: { bs: 'Specijalitet kuće! Limunada s dodatkom mente, pravo osvježenje za vas.', en: 'Behut speciality! Classic lemonade with a minty twist, the ultimate refreshment.' } },
    ],
  },
  {
    id: 'tradicionalni-sokovi',
    name: { bs: 'Tradicionalni sokovi', en: 'Traditional juices' },
    items: [
      { id: 'ruza', focus: '50% 48%', name: { bs: 'Ruža', en: 'Rose' }, price: 4, photo: { bs: 'Sok od ruže s laticama i ledom u visokoj čaši', en: 'Rose juice with petals and ice in a tall glass' } },
      { id: 'menta', focus: '50% 48%', name: { bs: 'Menta', en: 'Mint' }, price: 4, photo: { bs: 'Osvježavajući sok od mente s ledom u visokoj čaši', en: 'Refreshing mint juice with ice in a tall glass' } },
      { id: 'zova', focus: '50% 48%', name: { bs: 'Zova', en: 'Elder flower' }, price: 4, photo: { bs: 'Sok od zove s ledom u visokoj čaši sa slamkom', en: 'Elder flower juice with ice in a tall glass with a straw' } },
      { id: 'serbe', focus: '50% 48%', name: { bs: 'Šerbe', en: 'Sherbe' }, price: 4, photo: { bs: 'Tamnocrveno šerbe s ledom u rebrastoj staklenoj čaši', en: 'Dark red sherbe with ice in a ribbed glass' } },
    ],
  },
  {
    id: 'prirodni-napici',
    name: { bs: 'Prirodni napici', en: 'Natural drinks' },
    items: [
      { id: 'cijedena-narandza', focus: '50% 45%', name: { bs: 'Cijeđena narandža', en: 'Fresh orange' }, price: 7, photo: { bs: 'Cijeđeni sok od narandže s ledom i kriškom narandže', en: 'Fresh orange juice with ice and an orange slice' } },
      { id: 'limunada', focus: '50% 48%', name: { bs: 'Limunada', en: 'Lemonade' }, price: 4, photo: { bs: 'Limunada s ledom i kriškom limuna u rebrastoj čaši', en: 'Lemonade with ice and a lemon slice in a ribbed glass' } },
      { id: 'detox-mix', focus: '50% 45%', name: same('Detox mix'), price: 8, photo: { bs: 'Narandžasti detox napitak s ledom u staklenoj čaši', en: 'Orange detox drink with ice in a glass' } },
    ],
  },
  {
    id: 'tradicionalni-kolaci',
    name: { bs: 'Tradicionalni kolači', en: 'Traditional cakes' },
    items: [
      { id: 'baklava', focus: '50% 45%', name: same('Baklava'), price: 5, photo: { bs: 'Komad baklave s orasima na tanjiru s listovima palme', en: 'A piece of walnut baklava on a palm-leaf plate' } },
      { id: 'hurmasica', focus: '50% 50%', name: same('Hurmašica'), price: 5, photo: { bs: 'Hurmašica natopljena agdom na tanjiru s listovima palme', en: 'Syrup-soaked hurmašica on a palm-leaf plate' } },
    ],
  },
  {
    id: 'hladni-napici',
    name: { bs: 'Hladni napici', en: 'Cold drinks' },
    homeHidden: true,
    items: [
      { id: 'gazirani-sokovi', name: { bs: 'Gazirani sokovi', en: 'Sodas' }, price: 4.5, icon: 'glass', description: same('Cola, Sprite, Ski Mango-Orange, Ski Orange') },
      { id: 'mineralna-voda', name: { bs: 'Mineralna voda', en: 'Sparkling water' }, price: 3, icon: 'glass' },
      { id: 'prirodna-voda', name: { bs: 'Prirodna voda', en: 'Still water' }, price: 2.5, icon: 'glass' },
      { id: 'cedevita', name: same('Cedevita'), price: 4, icon: 'glass', description: { bs: 'Narandža, limun', en: 'Orange, lemon' } },
      { id: 'ledeni-caj', name: { bs: 'Ledeni čaj', en: 'Ice tea' }, price: 4, icon: 'glass', description: { bs: 'Malina, breskva, kamilica-mango', en: 'Peach, cranberry, chamomile-mango' } },
      { id: 'cockta', name: same('Cockta'), price: 4.5, icon: 'glass' },
      { id: 'orangina', name: same('Orangina'), price: 5, icon: 'glass' },
      { id: 'kuca-prirode', name: { bs: 'Kuća prirode sokovi', en: 'Kuća prirode juices' }, price: 5, icon: 'glass', description: { bs: 'Jagoda, narandža, jabuka, breskva, ananas', en: 'Strawberry, orange, apple, peach, pineapple' } },
    ],
  },
]

/** Kategorije za meni na početnoj (bez hladnih napitaka i skrivenih stavki). */
export const homeCategories = menuCategories.filter(category => !category.homeHidden).map(category => ({ ...category, items: category.items.filter(item => !item.homeHidden) }))

export type MenuEntry = MenuItem & { category: L }
export const allMenuItems: MenuEntry[] = menuCategories.flatMap(category => category.items.map(item => ({ ...item, category: category.name })))

export const itemImage = (item: MenuItem, locale: Locale): SiteImage | undefined => item.photo && { src: `/images/menu/${item.id}.webp`, alt: item.photo[locale], position: item.focus }
export const variantImage = (item: MenuItem, variant: MenuVariant, locale: Locale): SiteImage => ({ src: `/images/menu/${variant.id}.webp`, alt: variant.photo[locale], position: item.focus })

/** Pića u luku iznad tamne sekcije. */
const featuredIds = ['espresso', 'salep', 'bosanska-kafa', 'pink-limunada', 'behut-specijalni-caj']
export const featuredDrinks = featuredIds.map(id => allMenuItems.find(item => item.id === id)).filter((item): item is MenuEntry => Boolean(item))
