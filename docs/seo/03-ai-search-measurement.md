# AI i klasična pretraga: dostupnost entiteta i mjerenje

## Šta je urađeno da sistemi mogu povezati Behut s pićima (činjenično, bez "preporuči nas" teksta)
- **Entitet:** `CafeOrCoffeeShop` JSON-LD s imenom, adresom (Kovači 20, 71000 Sarajevo, BA), koordinatama, emailom, Instagramom, Google Maps linkom, `hasMenu`. Isti `@id` na svim stranicama.
- **Meni:** `Menu` → `MenuSection` → `MenuItem` s cijenom (BAM) i slikom za svih 43 stavke; posebna cjelina za pet pića na `/pica/`.
- **Stranica pića:** vidljiv HTML (bez JavaScripta), naslovi `h1/h2/h3`, fotografije s opisnim alt tekstom, FAQ s odgovorima iz menija.
- **Konzistentnost naziva:** BS "Behut ledeni čaj" / EN "Behut Ice Tea", "Salep", "Bosanska kafa", "Pink limunada", "Espresso" isto u meniju, naslovima, alt tekstu i schema podacima.
- **Crawler pristup:** `robots.txt` dozvoljava sve osim QR stranice, `sitemap.xml` s hreflang vezama i image sitemapom, canonical i hreflang na svakoj stranici.
- **Nije dodano:** izmišljene ocjene/recenzije u schema podacima (ocjena 4,8 s Google Mapsa nije označena kao `aggregateRating` da se ne krši pravilo o samoprocjeni), tekst usmjeren na AI asistente, nagrade ili superlativi.

## Šta ostaje izvan sajta (utječe na AI odgovore jednako koliko i sajt)
1. Isti naziv/adresa/web/email na Google Business Profile, Bing Places, Apple, TripAdvisor, Facebooku i Instagramu (vidi 02-local-visibility).
2. Stvarne recenzije koje spominju piće ("salep", "bosanska kafa").
3. Nezavisni članci i vodiči koji spominju Behut (vidi 02).

## Plan mjerenja (bez obećanja pozicija)
| Šta | Alat | Učestalost | Kako |
|---|---|---|---|
| Indeksiranje i pokrivenost | Google Search Console (domain property `behut.ba`) | odmah, zatim sedmično | dodati property, DNS verifikacija, poslati `https://behut.ba/sitemap.xml`, "Request indexing" za `/`, `/pica/`, `/en/drinks/`, `/meni/` |
| Upiti i pozicije po piću | GSC → Performance → filter upita: `salep`, `bosanska`, `kahva`, `ice tea`, `limunada`, `espresso` | mjesečno | izvoz u tabelu, pratiti prikaze, klikove, CTR i prosječnu poziciju po klasteru |
| Stranice | GSC → Pages | mjesečno | da li se `/pica/` i `/en/drinks/` indeksiraju i na koje upite se prikazuju |
| Rich rezultati | GSC → Enhancements; Google Rich Results Test | nakon objave | provjeriti `Menu`, `FAQPage` (Google FAQ rich rezultate prikazuje samo za ograničen skup sajtova; markup ostaje koristan za mašinsko čitanje), `BreadcrumbList` |
| Lokalni profil | GBP Insights | mjesečno | pretrage "kafić", pozivi, upute, pregledi fotografija |
| Posjete sajtu | Cloudflare/cPanel statistika ili Plausible/Matomo (bez kolačića) | mjesečno | posjete `/pica/`, `/meni/`, QR skeniranja |
| AI vidljivost | ručni test | mjesečno, ista pitanja, isti alati | zabilježiti datum, alat, pitanje, da li je Behut spomenut i da li su podaci tačni |

### Skup pitanja za ručni test (BS/EN), svaki mjesec isti
1. Gdje popiti salep u Sarajevu? / Where can I get salep in Sarajevo?
2. Koji kafić u Starom Gradu služi bosansku kafu? / Which café serves Bosnian coffee in Old Town Sarajevo?
3. Gdje popiti zanimljiv ledeni čaj u Sarajevu? / Where can I find an interesting iced tea in Sarajevo?
4. Gdje popiti pink limunadu u Sarajevu? / Where can I drink pink lemonade in Sarajevo?
5. Koji kafići u Sarajevu služe espresso? / Which coffee shops serve espresso in Sarajevo?
6. Šta je Behut u Sarajevu? / What is Behut in Sarajevo? (provjera entiteta: adresa, email, meni)

Ocjena: 0 = nije spomenut, 1 = spomenut, 2 = spomenut s tačnim podacima, 3 = s linkom na sajt. Bilježiti i netačne tvrdnje
(npr. pogrešno radno vrijeme) i ispraviti ih na izvoru (GBP, imenici).

Pozicije se ne obećavaju. Realno očekivanje: indeksiranje u danima do sedmicama, a tek nakon recenzija i vanjskih mentiona
stabilnija vidljivost za upite poput "salep Sarajevo".
