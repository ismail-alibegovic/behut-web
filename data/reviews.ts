/**
 * Google recenzije za sekciju "Šta kažu gosti", s Google Maps profila
 * "Behut Coffee shop". Dok je lista prazna, sekcija se ne prikazuje. Ništa ne izmišljaj.
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

// Ocjene i kratki tekstovi na bosanskom koje je dostavio Behut. Prve tri su špil koji se vidi na početku; treća je naprijed.
export const reviews: Review[] = [
  { author: 'Zlatin Mladenski', rating: 5, text: 'Ugodan kafić s odličnom atmosferom.' },
  { author: 'Erle Lauknes', rating: 5, text: 'Posjetili smo Behut tri puta. Posebno preporučujemo salep i odličnu uslugu.' },
  { author: 'Kira Dahlin', rating: 5, text: 'Moje omiljeno mjesto u Sarajevu. Odlična usluga i predivna atmosfera.' },
  { author: 'Damir Holcner', rating: 5, text: 'Prelijepo uređen kafić, ljubazno osoblje i odlična bosanska kafa.' },
  { author: 'Igor Bjeli', rating: 5, text: 'Autentična bosanska kafa, tradicionalni ambijent i izuzetno gostoprimstvo.' },
  { author: 'Özlem Güler', rating: 5, text: 'Topao i ugodan prostor, ukusan salep i posebna soba za fotografisanje.' },
  { author: 'Evrim İnce', rating: 5, text: 'Izuzetno smo zadovoljni posjetom, posebno bosanskom kafom.' },
  { author: 'Eda ÖNCÜ', rating: 5, text: 'Sve je bilo odlično. Posebno preporučujem bosansku kafu.' },
  { author: 'Michèle Liptai', rating: 5, text: 'Sjajan izbor čajeva, šareni ambijent i veoma srdačan domaćin.' },
  { author: 'Hrvoje Mikasović', rating: 5, text: 'Odličan čaj, pristojna usluga i prekrasan pogled.' },
  { author: 'Sabrina van Heesen', rating: 5, text: 'Posebni čajevi i veoma zanimljiva dodatna prostorija.' },
  { author: 'Alma Tarzikhan', rating: 5, text: 'Mjesto koje definitivno vrijedi posjetiti zbog izuzetne usluge.' },
  { author: 'Tea Psc', rating: 5, text: 'Autentična bosanska kafa i odlična muzika.' },
  { author: 'Isabel Perceval', rating: 5, text: 'Ukusna domaća limunada, lijep dekor i veoma ljubazan vlasnik.' },
  { author: 'Esra Nur Uckol', rating: 5, text: 'Topla atmosfera, ukusna kafa i veoma ljubazno osoblje.' },
]

/** Sažetak s Google Maps profila "Behut Coffee shop", stanje 29. 10. 2026. */
export const reviewSummary = { rating: 4.8, count: 326 }
