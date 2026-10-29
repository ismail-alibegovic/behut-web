/**
 * Google recenzije za sekciju "Šta kažu gosti", s Google Maps profila
 * "Behut Coffee shop". Dok je lista prazna, sekcija se ne prikazuje. Ništa ne izmišljaj.
 */
export type Review = {
  author: string
  /** 1 do 5; bez ocjene se zvjezdice ne prikazuju. */
  rating?: number
  text: string
  /** Isti tekst na engleskom, za /en. */
  textEn?: string
  /** Kako ga Google prikazuje, npr. "mart 2026". */
  date?: string
  /** Avatar s Google profila, ako ga imaš lokalno. */
  avatar?: string
  /** Jezik teksta kad nije bosanski, za čitače ekrana. */
  lang?: string
}

// Ocjene i kratki tekstovi na bosanskom koje je dostavio Behut. Prve tri su špil koji se vidi na početku; treća je naprijed.
export const reviews: Review[] = [
  { author: 'Zlatin Mladenski', rating: 5, text: 'Ugodan kafić s odličnom atmosferom.' , textEn: 'A cosy café with a great atmosphere.' },
  { author: 'Erle Lauknes', rating: 5, text: 'Posjetili smo Behut tri puta. Posebno preporučujemo salep i odličnu uslugu.' , textEn: 'We visited Behut three times. We especially recommend the salep and the excellent service.' },
  { author: 'Kira Dahlin', rating: 5, text: 'Moje omiljeno mjesto u Sarajevu. Odlična usluga i predivna atmosfera.' , textEn: 'My favourite place in Sarajevo. Excellent service and a lovely atmosphere.' },
  { author: 'Damir Holcner', rating: 5, text: 'Prelijepo uređen kafić, ljubazno osoblje i odlična bosanska kafa.' , textEn: 'A beautifully decorated café, friendly staff and excellent Bosnian coffee.' },
  { author: 'Igor Bjeli', rating: 5, text: 'Autentična bosanska kafa, tradicionalni ambijent i izuzetno gostoprimstvo.' , textEn: 'Authentic Bosnian coffee, a traditional setting and exceptional hospitality.' },
  { author: 'Özlem Güler', rating: 5, text: 'Topao i ugodan prostor, ukusan salep i posebna soba za fotografisanje.' , textEn: 'A warm, cosy space, delicious salep and a special room for taking photos.' },
  { author: 'Evrim İnce', rating: 5, text: 'Izuzetno smo zadovoljni posjetom, posebno bosanskom kafom.' , textEn: 'We were very happy with our visit, especially the Bosnian coffee.' },
  { author: 'Eda ÖNCÜ', rating: 5, text: 'Sve je bilo odlično. Posebno preporučujem bosansku kafu.' , textEn: 'Everything was excellent. I especially recommend the Bosnian coffee.' },
  { author: 'Michèle Liptai', rating: 5, text: 'Sjajan izbor čajeva, šareni ambijent i veoma srdačan domaćin.' , textEn: 'A great choice of teas, a colourful setting and a very warm host.' },
  { author: 'Hrvoje Mikasović', rating: 5, text: 'Odličan čaj, pristojna usluga i prekrasan pogled.' , textEn: 'Excellent tea, decent service and a beautiful view.' },
  { author: 'Sabrina van Heesen', rating: 5, text: 'Posebni čajevi i veoma zanimljiva dodatna prostorija.' , textEn: 'Special teas and a very interesting extra room.' },
  { author: 'Alma Tarzikhan', rating: 5, text: 'Mjesto koje definitivno vrijedi posjetiti zbog izuzetne usluge.' , textEn: 'A place definitely worth visiting for the exceptional service.' },
  { author: 'Tea Psc', rating: 5, text: 'Autentična bosanska kafa i odlična muzika.' , textEn: 'Authentic Bosnian coffee and great music.' },
  { author: 'Isabel Perceval', rating: 5, text: 'Ukusna domaća limunada, lijep dekor i veoma ljubazan vlasnik.' , textEn: 'Tasty homemade lemonade, lovely decor and a very kind owner.' },
  { author: 'Esra Nur Uckol', rating: 5, text: 'Topla atmosfera, ukusna kafa i veoma ljubazno osoblje.' , textEn: 'A warm atmosphere, tasty coffee and very friendly staff.' },
]

/** Sažetak s Google Maps profila "Behut Coffee shop", stanje 29. 10. 2026. */
export const reviewSummary = { rating: 4.8, count: 326 }
