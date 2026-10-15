B&G Avtomobili – nova spletna stran v13 (popravki po dokumentu BG_popravki) (staticni HTML)
Slogan: Kdor pri B&G kupuje, z garancijo potuje.

Jeziki (izbira desno zgoraj v glavi):
  /            Slovenscina (glavna stran, korenska mapa)
  /en/         English
  /hr/         Hrvatski
  /sr/         Srpski (cirilica)
  /ru/         Russkij
  Vsaka jezikovna mapa ima iste datoteke (index.html, storitve.html ...), zato izbira jezika
  vedno odpre isto stran v drugem jeziku. Besedila posameznega jezika urejate neposredno v datotekah te mape.
  V <head> so oznake hreflang (naslov https://www.bg-avtomobili.si/) – ce bo domena drugacna, jo zamenjajte.

Struktura:
  index.html        Domov
  (Vozila: povezava v meniju vodi neposredno na zalogo na avto.net)
  storitve.html     Storitve in servis + obrazec za narocilo (#narocilo)
  zavarovanja.html  Zavarovanja, cenitev in prijava skode
  o-nas.html        O nas in ekipa
  kontakt.html      Kontakt, zemljevid, WhatsApp/Viber
  izjava-o-varstvu-osebnih-podatkov.html  Izjava o varstvu osebnih podatkov (povezava v nogi in pri obrazcu)
  css/style.css     Vsi slogi (barve in pisave so v :root na vrhu datoteke) – skupni za vse jezike
  js/main.js        Mobilni meni, izbira jezika, animacija ob drsenju, obrazci – skupni za vse jezike
  img/              Fotografije (webp, spletna locljivost) in logotipi – skupne za vse jezike

Pred objavo:
  1. Edini obrazec je narocilo na servis (storitve.html#narocilo, v vseh jezikih): na <form> nastavite action="..." in method="post"
     (ali storitev, kot je Formspree) ter odstranite atribut data-demo. Dokler je data-demo prisoten, se ob posiljanju prikaze obvestilo.
  2. Fotografije v img/ zamenjajte z izvirniki v polni locljivosti (ista imena datotek).
  3. Fotografije ekipe: v o-nas.html in index.html zamenjajte <span class="avatar">P</span>
     z <img class="avatar" src="img/ekipa/primoz.jpg" alt="Primoz"> (v jezikovnih mapah pot ../img/...).
  4. WhatsApp/Viber: povezave wa.me/386... in viber://chat?number=%2B386... ob vseh mobilnih stevilkah.
  5. Barva poudarka: spremenite --accent (in --accent-dark) v css/style.css.
  6. Zemljevid: vdelan Google Maps (iframe) na naslovnici in strani Kontakt; jezik zemljevida doloca parameter hl=.
  7. Menjava fotografij na naslovnici: 9 fotografij (img/hero-*.webp), vsaka 6 sekund, s pretapljanjem.
     Fotografijo dodate/odstranite v index.html (blok photo-hero__slides) in ustrezno crtico v bloku hero-dots.
     Prva fotografija se nalozi takoj, ostale sproti (data-src), zato stran ostane hitra.
  8. Obrazec za servis ima dve obvezni potrditvi (kontakt + izjava o varstvu podatkov); polji se imenujeta soglasje in varstvo-podatkov.
  9. E-posta povsod: info@bg-avtomobili.si. Podatki podjetja (sedez, maticna st., ID za DDV, TRR) so v nogi vsake strani.
