/**
 * Google recenzije za sekciju "Šta kažu gosti", s Google Maps profila
 * "Behut Coffee shop". Tekst je kako ga Google prikazuje (skraćeni završavaju s …).
 * Dok je lista prazna, sekcija se ne prikazuje. Ništa ne izmišljaj.
 */
export type Review = {
  author: string
  /** 1 do 5; bez ocjene se zvjezdice ne prikazuju. */
  rating?: number
  text: string
  /** Kako ga Google prikazuje, npr. "mart 2026". */
  date?: string
  /** Avatar s Google profila, ako ga imaš lokalno. */
  avatar?: string
  /** Jezik teksta kad nije bosanski, za čitače ekrana. */
  lang?: string
}

// Prve tri su špil koji se vidi na početku; treća je naprijed.
export const reviews: Review[] = [
  { lang: 'en', author: 'Mrinal Halder', text: 'This is one of the nicest cafes in Sarajevo Old Town. We got stuck because of sudden rain and entered to this cute cafe which has outside seats to get nice views of the surroundings. We enjoyed the traditional Bosnian Coffee and an…' },
  { lang: 'en', author: 'Emina', text: 'The best place in Sarajevo to have coffee, enjoy the view! Super-friendly staff will help you enjoy even more! In my personal opinion THE BEST BOSNIAN COFFEE IN THE CITY! Try their home-made juices as well! Also, interior design is giving…' },
  { author: 'Ismail Alibegović', text: 'Behut nije samo kafić – to je mjesto koje odiše dušom Sarajeva. Besprijekoran spoj modernog i tradicionalnog čini ga posebnim, ali ono što ga izdvaja su gazda Kula i njegovi ugostitelji Abi i Brko, čije gostoprimstvo svaki dolazak pretvara u nezaboravno iskustvo. Behut je, s razlogom, postao kultno mjesto okupljanja Starograđana, ali i svih drugih dragih gostiju. To je kutak topline i autentičnosti koji se uvijek vraća u srce.' },
  { lang: 'en', author: 'Miltos Den', text: 'Best bosnian coffee. The owner is very friendly. He explained us the right way to drink bosnian coffee. Quiet place with view and nice vibes. You can also pay with card🙂…' },
  { lang: 'en', author: 'elni', text: 'Amazing macchiato — one of the best I’ve had recently. As a coffee lover and connoisseur, that says a lot. I also really loved the cozy atmosphere and the charming decor.' },
  { lang: 'en', author: 'Medina Turcinovic', text: 'A lovely coffee spot in Sarajevo. We had Bosnian coffee and a lemonade, both of which were fresh and well-prepared. The staff were genuinely friendly and welcoming, and there’s a clear sense of connection with regulars. You can tell this is…' },
  { lang: 'en', author: 'gamze', text: 'it was very cozy and warm. just a 1 min walk from the bascarsi. great coffee and tea menu. have special blends etc.' },
  { lang: 'en', author: 'shirni ong', text: 'My favourite cafe in Sarajevo. Skip those at the square. More chill here and without crowds & pegions…' },
  { lang: 'en', author: 'Amelie P.', text: 'Super cozy & beautiful café just a couple of steps away from pigeon place/ old town. We were more than 10 people and they were super welcoming and we had our own little room. If I’m ever back in Sarajevo I’ll definitely come back here!' },
  { lang: 'en', author: 'Isabella Elise', text: 'We were here as a group of 20 international people in October and we all fit into the very cute space! The owners were so nice to all of us and gifted us chocolate and a cake to try out! The traditional Salep (milk with cinnamon) was very good and you should definitely try it if you’re visiting here! We loved it so much thank you!!💗✨…' },
]

/** Sažetak s Google Maps profila "Behut Coffee shop", stanje 29. 10. 2026. */
export const reviewSummary = { rating: 4.8, count: 326 }
