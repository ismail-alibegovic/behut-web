/** Dva jezika sajta: bosanski na "/", engleski na "/en". */
export type Locale = 'bs' | 'en'
export type L = { bs: string; en: string }

export const tr = (text: L, locale: Locale) => text[locale]

export const paths = {
  home: { bs: '/', en: '/en' },
  menu: { bs: '/meni', en: '/en/menu' },
  drinks: { bs: '/pica', en: '/en/drinks' },
  qr: { bs: '/meni/qr', en: '/meni/qr' },
} satisfies Record<string, L>

export const formatPrice = (price: number, locale: Locale) => locale === 'bs' ? `${price.toFixed(2).replace('.', ',')} KM` : `${price.toFixed(2)} KM`

const bs = {
  skip: 'Preskoči na sadržaj',
  opensMaps: ' (otvara Google Maps)',
  opensInstagram: ' (otvara Instagram)',
  toTop: 'BEHUT Sarajevo, na vrh stranice',
  directions: 'Kako do nas',
  nav: {
    main: 'Glavna navigacija', extra: 'Dodatna navigacija', quick: 'Brza navigacija', mobile: 'Mobilna navigacija', panel: 'Navigacija',
    menu: 'Meni', story: 'Naša priča', gallery: 'Galerija', location: 'Lokacija', instagram: 'Instagram',
    openMenu: 'Meni', close: 'Zatvori navigaciju', address: 'Kovači 20, 71000 Sarajevo',
    language: 'Jezik', switchTo: 'English', switchLabel: 'Prebaci na engleski',
  },
  hero: { line1: 'Gdje si?', line2: 'U Behutu!', lead: 'Jedna sarajevska adresa na Kovačima. Hiljadu razloga da ostaneš još malo.', cta: 'Pogledaj meni' },
  showcase: { eyebrow: 'Naši mali rituali', title: 'Izaberi svoje piće', chips: 'Izdvojena pića', cta: 'Pogledaj meni', prev: 'Prethodno piće', next: 'Sljedeće piće' },
  menu: {
    eyebrow: 'Meni', title: 'Po tvom. Po našem.', lead: 'Od prve jutarnje do posljednje priče. Pronađi nešto baš za sebe.',
    categories: 'Kategorije menija', details: 'Detalji', flavours: 'Okusi', close: 'Zatvori', more: (n: number) => `Prikaži još ${n} ${n === 1 ? 'piće' : 'pića'}`, less: 'Prikaži manje',
    full: 'Cijeli meni', pdf: 'Cijeli meni (PDF)',
  },
  cta: { eyebrow: 'Kovači 20, Sarajevo', title: 'Kafa je na putu?', titleEm: 'Svrati na Kovače.', lead: 'Bez žurbe, bez povoda. Sjedi, naruči i ostani još malo.', points: ['U srcu Sarajeva', 'Terasa s pogledom', 'Vintage ambijent'] },
  story: {
    title1: 'Više od', title2: 'kafe.', heading: 'Dobrodošli u kafić Behut!',
    p1: 'U srcu naše čaršije, gdje miris svježe kafe susreće duh tradicije, otvorili smo vrata mjesta gdje ste uvijek među svojima. Ovdje se kafa ne pije na brzinu – ona se ćejfi, uz priču, osmijeh i toplu dobrodošlicu.',
    p2: 'Bilo da ste na prolazu ili ste dio naše raje, kod nas ste uvijek kući. Neka vam svaki gutljaj bude rahatluk, a svaka posjeta razlog da se opet vratite.',
    sign: 'Dobro nam došli!', opened: 'otvorili smo vrata',
  },
  reviews: {
    eyebrow: 'Google recenzije', title: 'Šta kažu gosti.', of: (count: number) => `od 5 · ${count} recenzija na Google Maps`,
    google: 'Google recenzija', ratingOf: (r: number) => `Ocjena ${r} od 5`, prev: 'Prethodna recenzija', next: 'Sljedeća recenzija',
    rate: { q: 'Bio si u Behutu?', q2: 'Ocijeni nas.', pick: 'Izaberi ocjenu', of5: 'od 5', labels: ['', 'Može bolje', 'Solidno', 'Dobro', 'Odlično', 'Pravi merak!'], cta: 'Napiši recenziju na Google Maps' },
  },
  gallery: { eyebrow: 'Galerija', title: 'Svaki kutak,', titleEm: 'jedna priča.', lead: 'Mali detalji, veliki osjećaj. Upoznaj svoj novi omiljeni kutak na Kovačima.', open: 'Uvećaj fotografiju', label: 'Galerija Behut Sarajevo', close: 'Zatvori galeriju', prev: 'Prethodna fotografija', next: 'Sljedeća fotografija', count: (i: number, n: number) => `Fotografija ${i} od ${n}: ` },
  instagram: { eyebrow: 'Trenutke ne brojimo. Čuvamo ih.', lead: 'Malo offline, malo na feedu. Povuci konopac ili klikni fotku.', follow: 'Prati nas na Instagramu', carousel: 'Behut reelovi s Instagrama', open: 'Otvori reel', prev: 'Prethodna objava', next: 'Sljedeća objava', post: (i: number, n: number) => `Objava ${i} od ${n}: ` },
  location: { eyebrow: 'Lokacija', title: 'Vidimo se na Kovačima.', country: 'Bosna i Hercegovina', map: 'Mapa: Behut Coffee shop, Kovači 20, Sarajevo' },
  footer: { tag: 'Dobra kafa. Dobri ljudi.', tagEm: 'To je Behut.', visit: 'Posjeti nas', explore: 'Istraži', follow: 'Prati nas', links: 'Linkovi u podnožju', since: 'Sarajevo · Kovači 20 · od 2024.', top: 'Nazad na vrh ↑' },
  menuPage: { drinks: 'Pića', moreAbout: 'Više o piću', inMenu: 'Pogledaj u meniju', title: 'Meni', lead: 'Kafa, čajevi, sokovi i kolači – sve s merakom.', jump: 'Kategorije', back: 'Na početnu', note: 'Cijene su u KM. Za alergene pitajte osoblje.' },
}

const en: typeof bs = {
  skip: 'Skip to content',
  opensMaps: ' (opens Google Maps)',
  opensInstagram: ' (opens Instagram)',
  toTop: 'BEHUT Sarajevo, back to top',
  directions: 'Get directions',
  nav: {
    main: 'Main navigation', extra: 'More navigation', quick: 'Quick navigation', mobile: 'Mobile navigation', panel: 'Navigation',
    menu: 'Menu', story: 'Our story', gallery: 'Gallery', location: 'Location', instagram: 'Instagram',
    openMenu: 'Menu', close: 'Close navigation', address: 'Kovači 20, 71000 Sarajevo',
    language: 'Language', switchTo: 'Bosanski', switchLabel: 'Switch to Bosnian',
  },
  hero: { line1: 'Where are you?', line2: 'At Behut!', lead: 'One Sarajevo address on Kovači. A thousand reasons to stay a little longer.', cta: 'See the menu' },
  showcase: { eyebrow: 'Our little rituals', title: 'Pick your drink', chips: 'Featured drinks', cta: 'See the menu', prev: 'Previous drink', next: 'Next drink' },
  menu: {
    eyebrow: 'Menu', title: 'Your way. Our way.', lead: 'From the first morning cup to the last story of the day. Find something just for you.',
    categories: 'Menu categories', details: 'Details', flavours: 'Flavours', close: 'Close', more: (n: number) => `Show ${n} more ${n === 1 ? 'drink' : 'drinks'}`, less: 'Show less',
    full: 'Full menu', pdf: 'Full menu (PDF)',
  },
  cta: { eyebrow: 'Kovači 20, Sarajevo', title: 'Craving coffee?', titleEm: 'Drop by Kovači.', lead: 'No rush, no reason needed. Sit down, order and stay a little longer.', points: ['In the heart of Sarajevo', 'Terrace with a view', 'Vintage atmosphere'] },
  story: {
    title1: 'More than', title2: 'coffee.', heading: 'Welcome to Behut café!',
    p1: 'In the heart of our old bazaar, where the scent of fresh coffee meets the spirit of tradition, we opened the doors to a place where you are always among your own. Here coffee is never rushed – it is savoured slowly, with a story, a smile and a warm welcome.',
    p2: 'Whether you are passing through or one of our regulars, with us you are always at home. May every sip bring you peace, and every visit give you a reason to come back.',
    sign: 'You are most welcome!', opened: 'we opened our doors',
  },
  reviews: {
    eyebrow: 'Google reviews', title: 'What guests say.', of: (count: number) => `out of 5 · ${count} reviews on Google Maps`,
    google: 'Google review', ratingOf: (r: number) => `Rated ${r} out of 5`, prev: 'Previous review', next: 'Next review',
    rate: { q: 'Been to Behut?', q2: 'Rate us.', pick: 'Pick a rating', of5: 'out of 5', labels: ['', 'Could be better', 'Decent', 'Good', 'Excellent', 'Pure merak!'], cta: 'Write a review on Google Maps' },
  },
  gallery: { eyebrow: 'Gallery', title: 'Every corner,', titleEm: 'a story.', lead: 'Small details, a big feeling. Meet your new favourite corner on Kovači.', open: 'Enlarge photo', label: 'Behut Sarajevo gallery', close: 'Close gallery', prev: 'Previous photo', next: 'Next photo', count: (i: number, n: number) => `Photo ${i} of ${n}: ` },
  instagram: { eyebrow: 'We don’t count moments. We keep them.', lead: 'A little offline, a little on the feed. Pull the string or tap a photo.', follow: 'Follow us on Instagram', carousel: 'Behut reels from Instagram', open: 'Open reel', prev: 'Previous post', next: 'Next post', post: (i: number, n: number) => `Post ${i} of ${n}: ` },
  location: { eyebrow: 'Location', title: 'See you on Kovači.', country: 'Bosnia and Herzegovina', map: 'Map: Behut Coffee shop, Kovači 20, Sarajevo' },
  footer: { tag: 'Good coffee. Good people.', tagEm: 'That’s Behut.', visit: 'Visit us', explore: 'Explore', follow: 'Follow us', links: 'Footer links', since: 'Sarajevo · Kovači 20 · since 2024', top: 'Back to top ↑' },
  menuPage: { drinks: 'Drinks', moreAbout: 'More about this drink', inMenu: 'See it on the menu', title: 'Menu', lead: 'Coffee, teas, juices and cakes – all made with merak.', jump: 'Categories', back: 'Home', note: 'Prices in KM (BAM). Ask our staff about allergens.' },
}

export const dict = { bs, en }
export type Dict = typeof bs
