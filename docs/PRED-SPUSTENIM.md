# Stav před spuštěním — 5. 10. 2026

Opravy jsou ve zdrojovém kódu. Push do GitHubu sám o sobě nepotvrzuje nasazení na veřejný web.

## Hotové opravy

- Provozovatel PANFERRADA invest s.r.o., IČO 03805735, sídlo a zápis v rejstříku jsou doplněny do patičky a nové stránky `/pravni-informace`. Doplněno ADR pro realitní služby. Údaje ověřeny v ARES a veřejném rejstříku.
- Tým: osm makléřů a jeden právník podle potvrzení provozovatele. Tomášův kontakt ponechán podle zadání.
- Opravené mezery v mobilním nadpisu financování, přehlednější karty služeb na malých displejích, mobilní recenze se rozbalují tlačítkem.
- Zachovány novější úpravy kalkulačky Gepard Finance a prezentace služeb z původního pracovního adresáře.
- Začleněny optimalizované WebP obrázky a responzivní varianty. Původní optimalizace 70 obrázků snížila celkový objem z 78,8 MB na 14,5 MB včetně variant (81,6 %). Nejde o velikost jedné návštěvy stránky ani o měření rychlosti připojení.
- Poptávka při neaktivním serverovém odesílání připraví kompletní e-mail; jasně říká, že uživatel musí odeslání dokončit v poštovní aplikaci a fotografie přiložit ručně. Nezobrazuje falešné potvrzení odeslání.
- Prázdná nabídka a chyba síťového načítání mají srozumitelný stav a odkaz na poptávku.
- Rozšířena sitemap, přidány bezpečnostní hlavičky do konfigurace a odstraněn nepoužívaný zápis sidebar cookie.

## Co chybí a jak to vyřešit

1. **Informace o zpracování osobních údajů.** Doplnit poskytovatele firemních schránek a skutečnou dobu uchování neúspěšných poptávek a fotografií. Potom dokončit informační text a odkázat na něj u formulářů a v patičce. Podklad je v `docs/SOUKROMI-PODKLAD.md`. Tato neznámá fakta nelze nahradit smyšlenou dobou uchování.
2. **Produkční odesílání poptávek.** Nastavit Resend, Turnstile a D1 podle `docs/inquiries.md`; tajné klíče zadat přímo v Cloudflare, ne do chatu nebo GitHubu. Následně provést domluvenou testovací poptávku a ověřit její přijetí ve schránce. Do aktivace funguje příprava e-mailu.
3. **Nabídka nemovitostí.** Veřejné API při auditu vracelo prázdnou nabídku. Nastavit export Urbium a synchronizaci podle `docs/urbium-integration.md`, pak ověřit fotografie, ceny, filtry a detail skutečné nemovitosti. Prázdný výsledek může pocházet i z konfigurace databáze; uživatelská hláška sama import neopraví.
4. **Nasazení a doména.** Ověřit přístup ke stávajícímu Cloudflare Workeru / původnímu Sites projektu. Sites nástroj pro uložené ID vracel „project not found“, proto nebyl vytvořen náhradní projekt. Po nasazení nastavit správné SITE_URL, ověřit HTTPS, přesměrování domény, canonical, OG obrázek, sitemap a bezpečnostní hlavičky na veřejné odpovědi.
5. **Cookies a technické služby.** V kontrolovaném veřejném kódu nebyla nalezena marketingová analytika a kontrolované HTTP odpovědi neobsahovaly Set-Cookie. Nelze tím zaručit nulové cookies ve všech stavech infrastruktury. Cloudflare posílal hlavičky NEL pro hlášení síťových chyb. Po aktivaci Turnstile a změně hostingu znovu ověřit všechny požadavky a úložiště v čistém prohlížeči. Chcete-li vypnout i NEL, řeší se v nastavení hostingu.
6. **Obsahové údaje.** Potvrdit doložitelnost tvrzení „250+ za poslední rok“, „98 %“ a aktuálnost hodnocení 4,6 z Googlu. Ověřit práva k fotkám a recenzím. Údaje bez podkladu nejsou touto kontrolou potvrzené.

## Ověření a jeho meze

- Původní audit hlavních stránek: šířky 320–1920 px, mobilní odkazy, menu, filtry, kotvy a pět projektových detailů. Podrobnosti a původní zjištění jsou v `audit-2026-10-05/AUDIT.md`.
- Po opravách znovu ověřeny mobilní menu, karty služeb, rozbalování recenzí a financování na 320/390 px. Kalkulačka načetla nabídku GPF. Kontrola byla v emulaci prohlížeče, ne na fyzickém iPhonu/Androidu.
- Automatické testy: 19 úspěšných. TypeScript a produkční sestavení prošly.
- Lint není čistý: zůstávají výhrady ve starších komponentách, například doporučení Link místo běžných odkazů, pravidla pro ARIA, efekty a zastaralé API validace. Nejde o potvrzené selhání sestavení, ale výsledek nelze označit za úspěšný lint.
- Před ostrým spuštěním doporučeno měření Lighthouse/Core Web Vitals na nasazeném webu, ovládání klávesnicí a čtečkou obrazovky, fyzický iOS/Android test, reálné doručení formuláře a obnova ze zálohy. Kontrola nenahrazuje právní posouzení konkrétního podnikání.

## Podklady

- ARES: https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/03805735
- Zápis v rejstříku: https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-vr/03805735
- ČOI: https://coi.gov.cz/informace-o-adr/
- ÚOOÚ: https://uoou.gov.cz/verejnost/zakladni-prirucka-k-ochrane-udaju
- Cookies: https://uoou.gov.cz/verejnost/qa-otazky-a-odpovedi/cookies
