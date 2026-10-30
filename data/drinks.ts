import type { L, Locale } from '@/lib/i18n'
import { allMenuItems } from './menu'
import { formatPrice } from '@/lib/i18n'

/**
 * Sadržaj stranice "Pića" (/pica, /en/drinks): pet pića iz menija. Naziv, cijena, opis iz menija i fotografija
 * uzimaju se iz data/menu.ts (jedini izvor istine); ovdje su samo dodatni tekstovi.
 *
 * Pravilo: ništa o Behutovoj pripremi što nije u meniju ili vidljivo na fotografiji. Dio `about` je opće znanje o
 * piću (šta je salep, zašto čaj mijenja boju...) i tako je i označen. Prije izmjena tekstova provjeri sa vlasnikom.
 */
export type DrinkContent = {
  /** id stavke u data/menu.ts; ujedno sidro (#id) na stranici pića i u punom meniju. */
  id: string
  /** Kratki uvod pod naslovom, samo provjerene činjenice. */
  lead: L
  /** Naslov i tekst o piću općenito (opće znanje, ne o Behutovoj pripremi). */
  aboutTitle: L
  about: L
  /** Srodne stavke iz menija koje gost može tražiti uz ovo piće (id-evi iz data/menu.ts). */
  related?: string[]
}

export const drinkContent: DrinkContent[] = [
  {
    id: 'salep',
    lead: {
      bs: 'Salep je topao, kremast napitak koji se tradicionalno pije u hladnijem dijelu godine. U Behutu na Kovačima, u sarajevskom Starom Gradu, poslužuje se u staklenoj šolji, posut cimetom.',
      en: 'Salep is a warm, creamy drink traditionally enjoyed in the colder months. At Behut on Kovači, in Sarajevo’s Old Town, it is served in a glass mug, dusted with cinnamon.',
    },
    aboutTitle: { bs: 'Šta je salep?', en: 'What is salep?' },
    about: {
      bs: 'Salep (poznat i kao sahlep ili sahlab) pravi se od brašna osušenih gomolja divljih orhideja. Skrob iz gomolja zgušnjava mlijeko pa napitak dobije gustu, kremastu strukturu, a obično se posipa cimetom. Zbog rijetkosti orhideja neki proizvođači koriste zamjene, pa se sastav razlikuje od mjesta do mjesta.',
      en: 'Salep (also spelled sahlep or sahlab) is made from the flour of dried wild orchid tubers. The starch in the tubers thickens milk into a dense, creamy drink, usually finished with cinnamon. Because wild orchids are scarce, some producers use substitutes, so recipes differ from place to place.',
    },
  },
  {
    id: 'behut-ice-tea',
    lead: {
      bs: 'Behut ledeni čaj (na engleskom Behut Ice Tea) je naš čaj koji mijenja boju. Prema opisu u meniju pravi se od cvijeta plave klitorije, mente i limuna, a poslužuje se s ledom u čaši.',
      en: 'Behut Ice Tea (in Bosnian Behut ledeni čaj) is our colour-changing iced tea. According to our menu it is made with butterfly pea flower, mint and lemon, and it is served over ice in a glass.',
    },
    aboutTitle: { bs: 'Zašto čaj mijenja boju?', en: 'Why does the tea change colour?' },
    about: {
      bs: 'Cvijet plave klitorije (Clitoria ternatea) daje čaju prirodnu intenzivnu plavu boju. Ta boja reaguje na kiselost: kad se doda kiseo sastojak, poput limuna, pomjera se prema ljubičastoj i ružičastoj.',
      en: 'Butterfly pea flower (Clitoria ternatea) gives tea a vivid natural blue. The colour reacts to acidity: when something acidic such as lemon is added, it shifts towards violet and pink.',
    },
    related: ['ledeni-latte', 'limunana'],
  },
  {
    id: 'bosanska-kafa',
    lead: {
      bs: 'Bosanska kafa (kahva) u Behutu poslužuje se s rahat-lokumom i čašom vode, a košta {bosanska-kafa}. Na našoj fotografiji su bakrena džezva, fildžan i kocke šećera na rezbarenom bakarnom tacnu.',
      en: 'Bosnian coffee (kahva) at Behut is served with rahat lokum and a glass of water, for {bosanska-kafa}. Our photograph shows a copper džezva, a fildžan cup and sugar cubes on a carved copper tray.',
    },
    aboutTitle: { bs: 'Bosanska kafa i bosanski ritual', en: 'Bosnian coffee and the Bosnian ritual' },
    about: {
      bs: 'Bosanska kafa nije „turska kafa“: Bosanci ističu vlastiti način posluživanja i pijenja. Općenito, džezva s kafom stiže na tacni, gost sam sipa u fildžan, a šećer i rahat-lokum nude se posebno, pa svako bira kako će ih koristiti. Kafa se pije polako, uz razgovor, i zato se u Sarajevu na kahvu ide družiti, a ne žuriti.',
      en: 'Bosnian coffee is not “Turkish coffee”: Bosnians stress their own way of serving and drinking it. In general, the džezva arrives at the table on a tray, guests pour into their own fildžan, and sugar and rahat lokum are offered separately so everyone chooses how to use them. It is sipped slowly, in conversation, which is why in Sarajevo you go for kahva to spend time, not to rush.',
    },
    related: ['espresso'],
  },
  {
    id: 'pink-limunada',
    lead: {
      bs: 'Pink limunada je voćna limunada nježno roze boje, lagana i osvježavajuća. Pravi se od tradicionalnog soka od ruže i šota limunade, a poslužuje se s ledom u visokoj rebrastoj čaši; na fotografiji je ukrašena laticama.',
      en: 'Pink lemonade is a fruity lemonade in a soft pink hue, light and refreshing. It is made from traditional rose juice and a shot of lemonade, and served over ice in a tall ribbed glass; in our photograph it is topped with petals.',
    },
    aboutTitle: { bs: 'Uz pink limunadu', en: 'Alongside pink lemonade' },
    about: {
      bs: 'Sok od ruže je tradicionalni napitak, a u Behutu je na meniju i kao zasebno piće Ruža ({ruza}). Ako voliš limunadu, tu su i klasična limunada ({limunada}) te Limunana ({limunana}), specijalitet kuće: limunada s dodatkom mente.',
      en: 'Rose juice is a traditional drink, and the Behut menu also has it on its own as Rose ({ruza}). If you like lemonade there is also classic lemonade ({limunada}) and Limunana ({limunana}), a house speciality: lemonade with a minty twist.',
    },
    related: ['ruza', 'limunada', 'limunana'],
  },
  {
    id: 'espresso',
    lead: {
      bs: 'Espresso u Behutu košta {espresso}. Za jači doživljaj tu je Espresso doppio ({espresso-doppio}), a dodatni espresso shot može se dodati za {extra-espresso-shot}.',
      en: 'Espresso at Behut costs {espresso}. For something stronger there is an Espresso doppio ({espresso-doppio}), and an extra espresso shot can be added for {extra-espresso-shot}.',
    },
    aboutTitle: { bs: 'Šta je espresso?', en: 'What is espresso?' },
    about: {
      bs: 'Espresso je koncentrovana kafa koja se priprema tako što se vruća voda pod pritiskom propušta kroz fino mljevenu kafu. Izvorno potiče iz Italije, a danas je osnova za cappuccino, macchiato, flat white i druge kafe iz Behutovog menija.',
      en: 'Espresso is a concentrated coffee made by forcing hot water under pressure through finely ground coffee. It originated in Italy and is now the base of the cappuccino, macchiato, flat white and other coffees on the Behut menu.',
    },
    related: ['espresso-doppio', 'flat-white'],
  },
]

export type Faq = { q: L; a: L }

/** Pitanja koja gosti zaista postavljaju; odgovori su samo ono što je potvrđeno menijem i lokacijom. */
export const drinkFaq: Faq[] = [
  {
    q: { bs: 'Gdje popiti salep u Sarajevu?', en: 'Where can I get salep in Sarajevo?' },
    a: { bs: 'Salep je na meniju Behuta, Kovači 20 u Starom Gradu. Košta {salep} i poslužuje se topao, posut cimetom.', en: 'Salep is on the menu at Behut, Kovači 20 in Sarajevo’s Old Town (Stari Grad). It costs {salep} and is served warm, dusted with cinnamon.' },
  },
  {
    q: { bs: 'Gdje popiti bosansku kafu u Starom Gradu?', en: 'Which café serves Bosnian coffee in the Old Town?' },
    a: { bs: 'Bosansku kafu (kahvu) možeš popiti u Behutu na Kovačima 20, u Starom Gradu. Poslužuje se s rahat-lokumom i čašom vode, a cijena je {bosanska-kafa}.', en: 'You can have Bosnian coffee (kahva) at Behut, Kovači 20, in the Old Town. It is served with rahat lokum and a glass of water, and costs {bosanska-kafa}.' },
  },
  {
    q: { bs: 'Koja je razlika između bosanske i turske kafe?', en: 'What is the difference between Bosnian and Turkish coffee?' },
    a: { bs: 'Bosanci bosansku kafu smatraju zasebnim načinom pripreme i posluživanja: džezva stiže na tacni, kafa se sipa u fildžan, a šećer i rahat-lokum nude se posebno. Detalji pripreme se razlikuju od izvora do izvora, pa ih ne navodimo kao pravilo.', en: 'Bosnians regard Bosnian coffee as its own way of preparing and serving: the džezva arrives on a tray, the coffee is poured into a fildžan, and sugar and rahat lokum are offered separately. Preparation details vary between sources, so we do not state them as rules.' },
  },
  {
    q: { bs: 'Gdje popiti zanimljiv ledeni čaj u Sarajevu?', en: 'Where can I find an interesting iced tea in Sarajevo?' },
    a: { bs: 'Behut ledeni čaj (Behut Ice Tea) je čaj koji mijenja boju, od cvijeta plave klitorije, mente i limuna. Košta {behut-ice-tea}, a možeš ga popiti u Behutu na Kovačima 20.', en: 'Behut Ice Tea is a colour-changing iced tea made with butterfly pea flower, mint and lemon. It costs {behut-ice-tea} and you can have it at Behut, Kovači 20.' },
  },
  {
    q: { bs: 'Gdje popiti pink limunadu u Sarajevu?', en: 'Where can I drink pink lemonade in Sarajevo?' },
    a: { bs: 'Pink limunada je na meniju Behuta, Kovači 20, Stari Grad. Pravi se od tradicionalnog soka od ruže i šota limunade, a košta {pink-limunada}.', en: 'Pink lemonade is on the menu at Behut, Kovači 20, Old Town (Stari Grad). It is made from traditional rose juice and a shot of lemonade, and costs {pink-limunada}.' },
  },
  {
    q: { bs: 'Koliko košta espresso u Behutu?', en: 'How much is an espresso at Behut?' },
    a: { bs: 'Espresso košta {espresso}, Espresso doppio {espresso-doppio}, a dodatni espresso shot {extra-espresso-shot}. Cijene su prema aktuelnom meniju.', en: 'Espresso costs {espresso}, Espresso doppio {espresso-doppio} and an extra espresso shot {extra-espresso-shot}. Prices follow the current menu.' },
  },
]

/** Zamjenjuje {id} u tekstu cijenom stavke iz menija, pa cijene u tekstu ne mogu odstupiti od menija. */
export const withPrices = (text: string, locale: Locale) => text.replace(/\{([a-z-]+)\}/g, (_, id: string) => {
  const item = allMenuItems.find(entry => entry.id === id)
  if (!item) throw new Error(`Nepoznata stavka menija u tekstu pića: ${id}`)
  return formatPrice(item.price, locale)
})
