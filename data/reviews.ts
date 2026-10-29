/**
 * Google recenzije za sekciju "Šta kažu gosti". Upiši ih tačno kako stoje na
 * Google Maps (ime, ocjena, tekst, datum). Dok je lista prazna, sekcija se ne
 * prikazuje. Ništa ne izmišljaj.
 */
export type Review = {
  author: string
  /** 1 do 5 */
  rating: number
  text: string
  /** Kako ga Google prikazuje, npr. "prije 2 mjeseca" ili "mart 2026". */
  date?: string
  /** Avatar s Google profila, ako ga imaš lokalno. */
  avatar?: string
}

export const reviews: Review[] = []

/** Sažetak s Google Maps profila "Behut Coffee shop", stanje 29. 10. 2026. */
export const reviewSummary = { rating: 4.8, count: 326 }
