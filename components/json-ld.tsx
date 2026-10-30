/** Ugrađuje strukturirane podatke (JSON-LD) u stranicu; `<` se escapuje da tekst ne može zatvoriti script. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
