# B&G Avtomobili – website

New static website for B&G Avtomobili d.o.o., Šentjur. Slogan: *Kdor pri B&G kupuje, z garancijo potuje.*

Plain HTML, CSS and JavaScript – no build step. Open `index.html` in a browser to view it.

## Languages

| Folder | Language |
|---|---|
| `/` | Slovenščina (main) |
| `/en/` | English |
| `/hr/` | Hrvatski |
| `/sr/` | Српски (Cyrillic) |
| `/ru/` | Русский |

Every language folder has the same file names, so the language switch (top right) always opens the same page in the other language.

## Pages

- `index.html` – home (photo slideshow, sales, car import, services, insurance, team, map)
- `storitve.html` – workshop services and the service booking form (`#narocilo`)
- `zavarovanja.html` – insurance, valuation and claims
- `o-nas.html` – about us and the team
- `kontakt.html` – contact, map, WhatsApp / Viber

Shared files: `css/style.css`, `js/main.js`, `img/`.

## Before going live

1. Connect the service booking form: set `action="..."` and `method="post"` on the `<form>` in each `storitve.html` (or use a service such as Formspree) and remove the `data-demo` attribute.
2. If the domain is not `www.bg-avtomobili.si`, update the `hreflang` links in each page's `<head>`.

More notes (in Slovenian) are in `README.txt`.

## Publishing with GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)`.
