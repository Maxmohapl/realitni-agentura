# Audit připravenosti webu – 5. 10. 2026

**Verdikt: nasazenou verzi zatím nedoporučuji jako hotový ostrý web.** Hlavní překážky jsou chybějící identifikace a informace pro návštěvníky, velké obrázky, prázdná nabídka a starší nasazená verze.

Kontrolovaný online web: https://realitni-agentura.mohaplmax7.workers.dev/ (adresa nalezená v dokumentaci projektu). Současně kontrolován zdrojový export `upload-2026-10-03/realitni-agentura-source.zip`. Tyto dvě verze **nejsou shodné**. Závěry o nasazení se vztahují k adrese workers.dev, nikoli automaticky k finální doméně realitni-agentura.cz.

## Co bylo ověřeno

- Online osm hlavních stránek při šířkách 320, 390, 768, 950, 1024 a 1440 px; všech pět detailů projektů při 320, 390, 768, 1024 a 1440 px. Ve všech měřeních šířka dokumentu odpovídala viewportu.
- Lokální export: osm hlavních stránek navíc při 360 a 1920 px. Výsledky hlavních stránek jsou v `responsive.json`.
- Vizuální kontrola vybraných obrazovek mobilu a počítače. Celostránkové snímky měly chybu skládání, proto nejsou použity jako důkaz duplicit obsahu; následná kontrola DOM potvrdila jedinou patičku.
- Mobilní menu a navigace, rozbalení filtrů, výběr projektu a přechod do jeho detailu v exportu, formulář do posledního kroku online, kalkulačka a předání parametrů do kontaktu, odkaz Koupě nemovitosti a správná aktivace služby po načtení.
- Všech sedm kotev makléřů existuje. Telefonní a e-mailové odkazy používají tel: a mailto:. Nebyl uskutečněn telefonát ani odeslán e-mail.
- 13 obsahových URL vrací HTTP 200. Ověřeno 67 přímo nalezených lokálních aktiv, všechna vrací 200. Oba externí odkazy (Google recenze a GPF) končí na HTTP 200; nebyla ověřována aktuálnost jejich obchodního obsahu.
- Neexistující stránka vrací správně HTTP 404. Robots a sitemap existují. Poslední kontrola konzole neukázala chyby ani varování.
- Export: všech 16 existujících testů prošlo (`node --import tsx --test tests/**/*.test.ts`), TypeScript kontrola prošla. Testy nejsou testem produkčního doručení e-mailu ani potvrzením stavu živé databáze.

## Nezbytné před ostrým spuštěním

### 1. Doplnit provozovatele, soukromí a spotřebitelské informace

Na kontrolovaných stránkách není plná právní identifikace provozovatele: značka Realitní Agentura a adresa kanceláře nenahrazují obchodní firmu/jméno, IČO, sídlo a příslušný údaj o zápisu v rejstříku. Pro s.r.o. viz [Ministerstvo spravedlnosti](https://obcanskyzakonik.justice.cz/index.php/home/infocentrum/caste-dotazy/75-obchodni-korporace/691-prosim-o-sdeleni-ktere-povinne-udaje-jsou-povinne-ke-zverejneni-na-webovych-strankach-u-s-r-o). Identitu nelze bezpečně doplnit odhadem podle názvu značky.

Chybí dostupné zásady zpracování osobních údajů i informace u formulářů. Doplnit správce a kontakt, účely a právní důvody, doby uchování, příjemce/zpracovatele, případná předávání mimo EHP a práva návštěvníků. V nové verzi zohlednit Cloudflare/Turnstile, Resend, doručovací schránku a fotografie. Pro běžné vyřízení poptávky není automaticky potřeba povinný souhlasový checkbox; informační povinnost tím ale nezaniká. [ÚOOÚ – základní příručka](https://uoou.gov.cz/verejnost/zakladni-prirucka-k-ochrane-udaju).

Při poskytování služeb spotřebitelům doplnit informaci o příslušném subjektu mimosoudního řešení sporů; pro běžné realitní služby typicky ČOI. [ČOI – ADR](https://coi.gov.cz/pro-podnikatele/informace-pro-prodejce-zbozi-a-sluzeb/mimosoudni-reseni-spotrebitelskych-sporu-adr/). Pro finanční služby ověřit konkrétního poskytovatele a relevantní režim samostatně.

Jde o zjištěné mezery a kontrolu proti veřejným pravidlům, nikoli právní potvrzení úplné shody. Podoba povinností závisí i na právním provozovateli a skutečně poskytovaných službách.

### 2. Nasadit aktuální optimalizovanou verzi

Online se stále načítají velké PNG bez optimalizací připravených v exportu. Velikosti jsou skutečně stažené velikosti veřejných souborů, v desetinných MB:

| Obrázek | Online | WebP v exportu |
|---|---:|---:|
| Letecký dům – aerial-house | 3,47 MB | 0,43 MB |
| Anna Uřičářová | 1,81 MB | 0,076 MB |
| Logo v navigaci | 0,444 MB | 0,083 MB |

Další velké soubory: pricing-reference 2,90 MB, bedroom 2,32 MB, kitchen 2,26 MB, living 2,19 MB. Online logo má šířku 2172 px při mobilním zobrazení přibližně 155 px.

Součet unikátních aktiv přímo odkazovaných HTML je přibližně **16,2 MB na úvodu**, **21,8 MB na službách** a **14,25 MB na stránce týmu**. Jde o součet souborů, ne o Core Web Vitals, dobu načtení ani objem prvního pohledu. Cache, lazy loading a další dynamické požadavky mohou skutečný přenos změnit. Úvod navíc přes HTTP Link přednačítá sedm velkých portrétů a další obrázky.

Export už má WebP, srcset, rozměry a část lazy loadingu. Největší lokální obrázek má asi 602 KiB, varianta 960 px asi 233 KiB. Všechny varianty v public dohromady zabírají přibližně 14 MiB; to se nestahuje na každé stránce. Nejprve nasadit hotové optimalizace a následně změřit reálný mobilní přenos a LCP/CLS/INP na cílové doméně.

### 3. Zprovoznit nabídku a rozhodnout o způsobu poptávek

Online `/api/properties` vrací `{"properties":[]}`. Návštěvník vidí všude nulu a oznámení o přípravě nových nabídek. Pokud mají být nemovitosti dostupné při spuštění, je nutné zprovoznit a zkontrolovat synchronizaci. Bez dat nebylo možné otestovat reálné detaily nemovitostí, jejich galerie, výsledky filtrů, stránkování, ceny a energetické údaje.

Online formulář končí tlačítkem **Připravit poptávku** a výslovně říká, že otevře poštovní aplikaci. Nejde o automatické odeslání serverem. Není to samo o sobě nepravdivé potvrzení ani nutně právní chyba, ale návštěvník bez nastaveného e-mailového klienta může poptávku nedokončit.

Export obsahuje nové serverové odesílání, ale živé `/api/inquiries/config` vrací 404. V exportu aktivace vyžaduje nastavení podle `docs/inquiries.md`; bez něj je odesílání záměrně vypnuté. Před spuštěním ověřit skutečné doručení všech druhů poptávek a příloh do určené schránky, nejen hlášku o úspěchu. Během auditu nic odesláno nebylo.

### 4. Opravit metadata a kontakty

Online úvod má titulkové/OG texty „Realitní Agentura | Hero sekce“ a popis vývojové komponenty. OG a Twitter obrázek odkazuje na `http://localhost:3000/og.png`, který není veřejně použitelný pro sdílení. Export metadata opravuje. Nastavit SITE_URL na definitivní HTTPS doménu.

Robots a sitemap online ukazují na `www.realitni-agentura.cz`, což je nutné sladit s finálním nasazením. Sitemap obsahuje osm hlavních stránek, ale chybí pět detailů projektů. Chybí i v exportu; doplnění pomůže jejich objevení vyhledávači.

Tomáš Procházka a Eva Procházková mají na úvodních kartách shodně `+420 774 650 001` a `prochazkova@egpreality.cz`, zatímco poptávky míří na `prochazka@egpreality.cz`. Ověřit s provozovatelem; shoda může být záměrná, ale je to podezřelá nesrovnalost. Web říká „7 specialistů“, zatímco stránka týmu obsahuje devět osob (včetně Marcely Svákové a Dalibora Lachmana). Vysvětlit nebo sjednotit počítání.

## Mobilní zobrazení a přístupnost

- **Potvrzená chyba:** na `/financovani` při 320 px nadpis zobrazuje „sifinancování“. Obě `<br>` mají `display:none` a okolní text nemá oddělující mezeru. Na počítači jsou slova oddělena řádkem. Opravit mezeru nebo způsob zalamování. Důkaz: `financovani-320.png`. Stejná struktura nadpisu je v exportu.
- **Potvrzený kontrast:** poznámka pod zeleným odkazem GPF má 12 px a barvu rgb(97,117,141) na rgb(45,57,67), kontrast přibližně **2,50 : 1**. Zesvětlit text; pro běžný text WCAG AA stanoví 4,5 : 1. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Toto není úplný audit přístupnosti ani automatický závěr o zákonné působnosti.
- V testovaných rozměrech se dokumenty neroztahují vodorovně. Samotná šířka dokumentu nevylučuje každý lokálně oříznutý nebo schovaný obsah.
- Mobilní služby na úvodu zůstávají ve třech úzkých sloupcích; doporučuji zvážit větší karty nebo svislé řazení pro pohodlnější čtení na nejmenších telefonech.
- V exportu se recenze na mobilu mění z karuselu na osm karet pod sebou. Obsah se neztrácí, ale výrazně prodlužuje stránku. Doporučení: ukázat např. tři a nabídnout rozbalení zbytku.
- Reálný Safari na iPhonu a Chrome na Androidu nebyly ověřeny. Šířka okna v Chromium neověřuje chování mobilní klávesnice, poštovní aplikace, safe-area ani skutečného dotykového zařízení.

## Cookies a další sledování

**Nenašel jsem známky aktivních analytických nebo reklamních cookies, ale nelze vydat absolutní potvrzení „všechny cookies jsou vypnuté“.**

- V kontrolovaných veřejných HTTP odpovědích stránek a 67 aktiv není Set-Cookie.
- V prověřených veřejných JS souborech nebyl nalezen zápis `document.cookie`, Google Analytics, GTM ani Facebook Pixel podle použitých signatur. Přímo nalezená aktiva jsou na stejné doméně; není to úplný záznam všech možných dynamických požadavků.
- Runtime obsahuje sessionStorage pro ochranu před opakovaným přesměrováním/načítáním. Jde o technické úložiště, nikoli analytický cookie. Zjištěno ze skriptu, nikoli čtením soukromého browserového úložiště.
- V exportu existuje nepoužitá UI komponenta sidebar se zápisem technického cookie. Nebyly nalezeny její importy do aplikace; existence souboru sama neznamená aktivní cookie.
- Hosting posílá NEL/Report-To na Cloudflare: konfiguraci reportování síťových chyb. Nejde o cookie, ale nelze proto říkat, že je vypnuté veškeré předávání technických údajů.
- Nová verze může při aktivaci formuláře načíst Cloudflare Turnstile. Je nutné zkontrolovat skutečné nastavení a promítnout dodavatele do zásad soukromí.
- Nebyl čten cookie jar ani local/session storage přihlášeného prohlížeče. Závěr je založen na HTTP a veřejném kódu, nikoli kompletním auditu browserového stavu ve všech scénářích.

Pokud web používá pouze nezbytné technické cookies, souhlasová lišta obvykle není potřeba; informační povinnost ale zůstává. [ÚOOÚ – cookies](https://uoou.gov.cz/verejnost/qa-otazky-a-odpovedi/cookies). Chybějící lišta tedy sama o sobě není chyba. Pokud cílem je nulové měření, posoudit také NEL a budoucí externí služby.

## Další kontroly doporučené před spuštěním

1. Na finální doméně ověřit HTTPS, jedinou preferovanou www/non-www variantu, přesměrování starých URL, indexaci a Search Console. Dočasný náhled zbytečně neindexovat souběžně s ostrou verzí.
2. Po naplnění nabídky projít skutečné inzeráty: aktuálnost, rezervace, ceny a provize, adresy, fotografie, odkazy na makléře a energetická třída tam, kde je povinná. [MPO – PENB](https://mpo.gov.cz/cz/energetika/uspory-energie/uspory-v-praxi/prukaz-energeticke-narocnosti-budov/prukaz-energeticke-narocnosti-budovy--277417/).
3. Potvrdit oprávnění k fotografiím, portrétům, referencím a logům; doložit tvrzení „250+ za poslední rok“, „98 %“ a aktuálnost ručně zapsaného hodnocení Google 4,6.
4. Test s pomalým připojením a studenou cache, Core Web Vitals po nasazení optimalizací; skutečný iPhone a Android, 200% zvětšení, klávesnice a čtečka obrazovky.
5. Ověřit zálohu a obnovu databáze, upozornění na neúspěšný import, dostupnost webu a stav odesílání. Ve vzorku HTTP hlaviček nejsou CSP, X-Content-Type-Options, Referrer-Policy ani explicitní HSTS; nastavit vhodné hlavičky a ověřit kompatibilitu se skripty. Nejde samo o sobě o důkaz zneužitelnosti.
6. Před zapnutím produkčního e-mailu prověřit DNS odesílací domény, antispam ochranu a skutečné doručení. Při aktualizaci aplikace ověřit závislosti; plný bezpečnostní penetrační test nebyl součástí auditu.

Nebyl změněn ani publikován web. Byly vytvořeny pouze lokální auditní soubory a rozbalena kopie exportu pro kontrolu. Kompletní HTTP evidence je v `live-http.json`.
