# Behut: mapa upita i sadržaja (pet prioritetnih pića)

Pet klastera, jedna stranica pića (`/pica/`, `/en/drinks/`) sa sidrima, plus pun meni (`/meni/#id`) i početna.
Nisu pravljene zasebne stranice po piću: za svako piće imamo jednu fotografiju, jedan opis iz menija i kratko opće
objašnjenje, što je premalo za pet održivih stranica ("thin content"). Pet sekcija na jednoj stranici ima dovoljno
zajedničkog konteksta (lokacija, FAQ, meni) i svaka sekcija ima stabilan URL: `/pica/#salep` itd.
Zasebna stranica ima smisla tek kad za to piće postoji stvaran dodatni sadržaj (npr. bosanska kafa: vlastite fotografije
rituala, tekst vlasnika o servisu, video) i kad se u mjerenju (Search Console) vidi traženje samo za to piće.

| Klaster | Glavni upiti (BS) | Glavni upiti (EN) | Gdje je odgovor | Namjera |
|---|---|---|---|---|
| Salep | salep Sarajevo, gdje popiti salep u Sarajevu, salep Baščaršija, topli napici Sarajevo, tradicionalni salep | salep Sarajevo, where to drink salep in Sarajevo, sahlep/sahlab Sarajevo, traditional hot drinks Sarajevo | `/pica/#salep`, FAQ, `/meni/#salep`, početna (izbor pića) | lokalna + informativna (šta je salep) |
| Behut ledeni čaj / Behut Ice Tea | Behut ledeni čaj, ledeni čaj Sarajevo, gdje popiti ledeni čaj u Sarajevu, posebni ledeni čajevi | Behut iced tea Sarajevo, specialty iced tea Sarajevo, unique/refreshing drinks Sarajevo | `/pica/#behut-ice-tea` (BS naziv "Behut ledeni čaj", EN "Behut Ice Tea"), FAQ (zašto mijenja boju) | brend + otkrivanje (turisti, Instagram) |
| Bosanska kafa | bosanska kafa/kahva/kava Sarajevo, gdje popiti bosansku kahvu, kafa Baščaršija, kahva Stari Grad | traditional/authentic Bosnian coffee Sarajevo, where to drink Bosnian coffee, Bosnian coffee Old Town, coffee culture Sarajevo | `/pica/#bosanska-kafa`, FAQ (razlika od turske kafe) | turistička, kulturna, lokalna |
| Pink limunada | pink/roze limunada Sarajevo, gdje popiti limunadu u Sarajevu | pink lemonade Sarajevo, specialty/refreshing lemonade, summer drinks Sarajevo Old Town | `/pica/#pink-limunada`, FAQ | sezonska, vizuelna (fotografija) |
| Espresso | espresso Sarajevo, gdje popiti espresso, dobar espresso, kafa u blizini Baščaršije | espresso Sarajevo, best/good espresso (bez superlativa), coffee near Baščaršija | `/pica/#espresso`, FAQ (cijena) | komercijalna, navigaciona |

Upiti s "Baščaršija" su istraživanje namjere pretrage; na sajtu se ne tvrdi "blizu Baščaršije" dok vlasnik ne potvrdi udaljenost, nego se koristi potvrđeno "Kovači, Stari Grad".

Sinonimi i varijante (sahlep/sahlab, kahva/kava/kafa, roze/pink, ice tea/ledeni čaj) uvedeni su prirodno u tekst, bez
ponavljanja ključnih riječi. "Najbolji", "najbolji espresso", "Italian espresso" i "domaća limunada" namjerno NISU
upotrijebljeni jer se ne mogu dokazati (nema nagrada, ocjena po piću ni potvrde o izvoru/pripremi).

## Prirodna pitanja pokrivena FAQ-om (vidljiv HTML + FAQPage JSON-LD)
- Gdje popiti salep u Sarajevu? / Where can I get salep in Sarajevo?
- Koji kafić služi bosansku kafu u Starom Gradu? / Which café serves Bosnian coffee in the Old Town?
- Razlika između bosanske i turske kafe (bez spornih detalja pripreme)
- Gdje popiti zanimljiv ledeni čaj? / Where can I find an interesting iced tea?
- Gdje popiti pink limunadu u Sarajevu? / Where can I drink pink lemonade in Sarajevo?
- Koliko košta espresso u Behutu? (cijene se čitaju iz `data/menu.ts`, ne mogu odstupiti od menija)

## Šta je tvrdnja, a šta ostaje otvoreno
| Tvrdnja na sajtu | Izvor | Status |
|---|---|---|
| Behut je na Kovačima 20, Stari Grad, Sarajevo | adresa u `site-config.ts` + potvrda vlasnika | **potvrđeno** (30.10.2026). "Blizu Baščaršije" **nije** tvrdnja na sajtu dok vlasnik ne potvrdi udaljenost |
| Salep: "Topao napitak od korijena orhideje, kremast…", posut cimetom | meni (PDF) + fotografija | potvrđeno |
| Naziv: BS "Behut ledeni čaj", EN "Behut Ice Tea" | vlasnik, 30.10.2026 | **potvrđeno**; id/sidro ostaje `behut-ice-tea` |
| Behut ledeni čaj: cvijet plave klitorije, menta, limun, mijenja boju | meni (PDF) | potvrđeno |
| Bosanska kafa se služi s rahat-lokumom i čašom vode | vlasnik, 30.10.2026 | **potvrđeno**; fotografija prikazuje džezvu, fildžan i šećer (lokum i voda nisu na fotografiji) |
| Pink limunada: tradicionalni sok od ruže + šot limunade | vlasnik, 30.10.2026 | **potvrđeno**; "latice" na fotografiji se opisuju samo kao ukras |
| Espresso 3 KM, doppio 5 KM, dodatni shot 2 KM; Ruža 4 KM | meni (PDF) | potvrđeno |

Prije bilo kakve tvrdnje o porijeklu kafe, zrnu, prženju, "domaćem" ili "svježe cijeđenom" treba pisana potvrda vlasnika.
Prijedlog za novu fotografiju: kadar bosanske kafe s lokumom i čašom vode, jer ih postojeća fotografija ne prikazuje.
