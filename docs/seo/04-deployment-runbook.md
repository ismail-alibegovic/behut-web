# Plan isporuke na cPanel (behut.ba): bez izmjena na serveru dok vlasnik ne odobri

## Stanje na dan pripreme (30.10.2026)
- **SSH nije dostupan s ovog računara:** nema `~/.ssh` (nema ključeva ni `config`), pa nije bilo pokušaja prijave. Server je pregledan samo javnim HTTPS zahtjevima (GET/HEAD).
- **Hosting:** cPanel (korisnik `behut`, primarna domena `behut.ba`, SSL aktivan). Server je Apache; sajt je **statički export**, nije potreban Node.js.
- **Produkcija je stariji build** (isti dizajn, bez novih SEO izmjena): 83 od 90 provjerenih resursa postoje, a nedostaje 7 novijih (favicon, ikone, OG slika, manifest, latte macchiato). Sve slike koje stariji HTML referencira vraćaju 200, **nema slika koje nedostaju u trenutnom live buildu**.
- `scripts/verify-live.py` na produkciji danas: 27/49 prolazi (očekivano, jer nova verzija nije objavljena). Na lokalnoj kopiji novog builda: 70/71 (jedina razlika je http→https preusmjeravanje koje radi tek Apache).

## Gdje je pristup potreban
Za objavu treba jedno od: (a) cPanel File Manager (sam korisnik), (b) SSH ključ ili FTP nalog ograničen na `public_html`.
Lozinke i privatni ključevi se ne šalju u chat niti commituju. SSH u cPanelu: *Security → SSH Access → Manage SSH Keys → Generate*, pa *Authorize*.
Ako SSH ostane isključen, isporuka ide ručno kroz File Manager (dolje).

## Šta se čuva (ne dirati, ne brisati)
- `.htaccess`: sadržaj **spojiti**, ne zamijeniti slijepo. Ako u postojećem ima blok `# php -- BEGIN cPanel-generated handler` ili slično, ostaje.
- `.well-known/` (AutoSSL/ACME provjere), `cgi-bin/`, `google*.html` ili bilo koji fajl za verifikaciju Search Consolea/Bing, `.user.ini`, `error_log`.
- Sve što ne pripada sajtu (npr. stari WordPress fajlovi, ako ih ima, čekaju odluku vlasnika; ne brišu se u ovoj isporuci).
- Email nalozi i baze su odvojeni od `public_html` i ne diraju se.

## Redoslijed (svaki korak čeka potvrdu prethodnog)
1. **Backup (obavezno):** cPanel → *Backup* → *Download a Full Account Backup* (ili *Backup Wizard*), a dodatno File Manager → `public_html` → *Compress* u `/home/behut/backups/public_html-2026-10-30.zip`. Preuzeti ZIP na računar.
2. **Provjera backupa:** otvoriti ZIP lokalno (`unzip -l`), provjeriti da sadrži `index.html`, `.htaccess`, `_next/`, `images/`; zapisati broj fajlova.
3. **Pregled spajanja `.htaccess`:** uporediti live `.htaccess` s `cpanel/.htaccess` iz repozitorija; ako se razlikuju samo naši blokovi, zamijeniti, inače spojiti.
4. **Staging:** `behut-cpanel.zip` raspakovati u `/home/behut/behut_staging/` (izvan `public_html`) i provjeriti da je sadržaj potpun (130 fajlova + `.htaccess`).
5. **Isporuka (tek uz izričitu potvrdu):** kopirati iz staginga u `public_html` (File Manager → *Copy*, uz *Overwrite*). **Ne brisati** ništa iz `public_html`.
6. **Verifikacija:** `python3 scripts/verify-live.py` (cilj 49/49 ili više). Zatim ručno: početna BS/EN, `/pica/`, `/en/drinks/`, `/meni/`, QR stranica, mobilni prikaz, pet slika pića.
7. **Rollback ako išta ne valja:** u File Manageru raspakovati backup ZIP preko `public_html` (*Extract*, uz *Overwrite*). Time se vraća prethodni live build (isti ZIP je reference). Novi fajlovi koje stari build ne zna (`/pica/`, `/en/drinks/` itd.) ne smetaju, a po potrebi se obrišu pojedinačno nakon što se potvrdi vraćanje.

## Planirane izmjene na serveru
**Novi fajlovi (25):**
- `/en/drinks/__next.!KGVuKQ.en.drinks.__PAGE__.txt`
- `/en/drinks/__next._full.txt`
- `/en/drinks/__next._tree.txt`
- `/en/drinks/index.html`
- `/en/drinks/index.txt`
- `/favicon.ico`
- `/icon-192.png`
- `/icon-32.png`
- `/icon-512.png`
- `/images/menu/behut-ice-tea.webp`
- `/images/menu/latte-macchiato.webp`
- `/og/behut-og.jpg`
- `/pica/__next.!KGJzKQ.pica.__PAGE__.txt`
- `/pica/__next._full.txt`
- `/pica/__next._tree.txt`
- `/pica/index.html`
- `/pica/index.txt`
- `/site.webmanifest`
- još 7 novih fajlova u `/_next/static/` (JS/CSS s novim hashevima)

**Zamijenjeni fajlovi (23):** HTML stranice (`/index.html`, `/en/index.html`, `/meni/index.html`, `/en/menu/index.html`, `/meni/qr/index.html`) i njihovi `.txt` pratioci, `apple-icon.png`, `robots.txt`, `sitemap.xml` (0 u `_next/`).

**Bez promjena:** 81 fajlova (slike, teksture, fontovi).

**Zastarjeli (ne brisati sada):** 3 starih `_next/static` fajlova koje novi HTML više ne referencira, i `/images/menu/behut-ledeni-caj.webp` (preimenovan u `behut-ice-tea.webp`). Brisanje tek poslije potvrđene isporuke i nakon što istekne keširanje (npr. 7 dana).

## Zabranjeno u ovoj isporuci
- `rm -rf`, `rsync --delete`, brisanje cijelog `public_html`, slijepa sinhronizacija.
- Prepisivanje fajlova koji ne pripadaju sajtu.
- Spremanje lozinki, ključeva ili tokena u repozitorij, logove ili dokumentaciju.

## Poslije isporuke (zadaci vlasnika)
- Google Search Console: property `behut.ba`, DNS verifikacija, slanje `https://behut.ba/sitemap.xml`, *Request indexing* za `/`, `/pica/`, `/en/drinks/`, `/meni/`.
- Google Business Profile: website `https://behut.ba/`, link na meni `https://behut.ba/meni/`, fotografije pića, radno vrijeme i telefon (vidi `02-local-visibility-and-links.md`).
- Mjerenje: `03-ai-search-measurement.md`.
