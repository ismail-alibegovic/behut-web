#!/usr/bin/env python3
"""Provjera objavljenog sajta (samo čitanje, HTTP GET/HEAD). Upotreba: python3 scripts/verify-live.py [https://behut.ba] [javna-adresa-u-canonical]"""
import json, re, sys, urllib.request, html

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'https://behut.ba').rstrip('/')
# Drugi argument: javna adresa upisana u canonical/sitemap kad se provjerava lokalna kopija (npr. http://localhost:3461).
PUBLIC = (sys.argv[2] if len(sys.argv) > 2 else BASE).rstrip('/')
UA = {'User-Agent': 'Mozilla/5.0 (compatible; BehutVerify/1.0)'}
PAGES = {'/': 'bs', '/en/': 'en', '/pica/': 'bs', '/en/drinks/': 'en', '/meni/': 'bs', '/en/menu/': 'en'}
DRINK_IMAGES = ['salep', 'behut-ice-tea', 'bosanska-kafa', 'pink-limunada', 'espresso']
results = []

def check(ok, name, detail=''):
    results.append((ok, name, detail)); print(('PASS' if ok else 'FAIL'), name, detail)

def get(path, method='GET'):
    req = urllib.request.Request(BASE + path, headers=UA, method=method)
    try:
        r = urllib.request.urlopen(req, timeout=20)
        return r.status, r.headers, (r.read() if method == 'GET' else b'')
    except urllib.error.HTTPError as e:
        return e.code, e.headers, b''
    except Exception as e:
        return str(e), {}, b''

for path, lang in PAGES.items():
    status, headers, body = get(path)
    check(status == 200, f'{path} dostupna', str(status))
    if status != 200: continue
    h = body.decode('utf-8', 'replace')
    canon = re.findall(r'rel="canonical" href="([^"]*)"', h)
    check(canon == [PUBLIC + path], f'{path} canonical', str(canon))
    check(f'<html lang="{lang}"' in h, f'{path} lang={lang}')
    check('name="robots" content="index, follow"' in h, f'{path} index,follow')
    check(len(re.findall(r'<h1', h)) == 1, f'{path} tačno jedan h1')
    check('og:image' in h and 'twitter:card' in h, f'{path} Open Graph/Twitter')
    ld = []
    for blk in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, flags=re.S):
        try:
            d = json.loads(html.unescape(blk)); ld += d if isinstance(d, list) else [d]
        except Exception: pass
    types = sorted({x.get('@type') for x in ld})
    check('CafeOrCoffeeShop' in types, f'{path} JSON-LD kafić', str(types))
    if path in ('/pica/', '/en/drinks/'):
        check({'Menu', 'FAQPage', 'BreadcrumbList'} <= set(types), f'{path} JSON-LD meni/FAQ/breadcrumb')
        for name in ['Salep', 'Behut Ice Tea', 'Espresso']:
            check(name in h, f'{path} sadrži "{name}" u HTML-u')

for img in DRINK_IMAGES:
    status, headers, _ = get(f'/images/menu/{img}.webp', 'HEAD')
    ctype = headers.get('content-type', '') if headers else ''
    check(status == 200 and ctype.startswith('image/webp'), f'slika {img}.webp', f'{status} {ctype}')

for path in ['/favicon.ico', '/icon-192.png', '/og/behut-og.jpg', '/site.webmanifest', '/images/menu/latte-macchiato.webp']:
    status, _, _ = get(path, 'HEAD'); check(status == 200, f'resurs {path}', str(status))

status, _, body = get('/robots.txt'); txt = body.decode('utf-8', 'replace')
check(status == 200 and f'Sitemap: {PUBLIC}/sitemap.xml' in txt and 'Disallow: /meni/qr/' in txt, 'robots.txt', str(status))
status, _, body = get('/sitemap.xml'); xml = body.decode('utf-8', 'replace')
locs = re.findall(r'<loc>([^<]*)</loc>', xml)
check(status == 200 and PUBLIC + '/pica/' in locs and PUBLIC + '/en/drinks/' in locs, 'sitemap.xml sadrži stranice pića', f'{len(locs)} loc')
imgs = re.findall(r'<image:loc>([^<]*)</image:loc>', xml)
check(len(imgs) >= 10, 'sitemap.xml image unosi', str(len(imgs)))
for loc in locs:
    s, _, _ = get(loc.replace(PUBLIC, ''), 'HEAD'); check(s == 200, f'sitemap URL {loc}', str(s))

req = urllib.request.Request(BASE.replace('https://', 'http://') + '/', headers=UA, method='HEAD')
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
try: r = urllib.request.build_opener(NoRedirect).open(req, timeout=20); code, loc = r.status, ''
except urllib.error.HTTPError as e: code, loc = e.code, e.headers.get('Location', '')
check(code == 301 and loc.startswith(BASE), 'http → https preusmjeravanje', f'{code} {loc}')
status, _, _ = get('/ne-postoji-123/'); check(status == 404, '404 za nepostojeću stranicu', str(status))

failed = [r for r in results if not r[0]]
print(f'\n{len(results) - len(failed)}/{len(results)} provjera prošlo na {BASE}')
sys.exit(1 if failed else 0)
