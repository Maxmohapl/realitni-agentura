# Příprava webu k nasazení

Projekt je React/vinext aplikace s Cloudflare Workerem a D1 databází. Není to statický HTML web pro prosté nahrání přes FTP. Zdrojový ZIP obsahuje aktuální pracovní stav včetně rozpracovaného serverového odesílání poptávek.

## Sestavení a nahrání

Použijte Node.js 22.13 nebo novější a npm:

```sh
npm ci
npm test
npx tsc --noEmit --incremental false
npm run build
npx wrangler deploy --config dist/server/wrangler.json
```

Před deployem zkontrolujte název Workeru a vazbu D1 v `vite.config.ts` a vygenerovaném `dist/server/wrangler.json`. Nepřepisujte jiný Worker. Produkční build je v `dist/`; při nasazení je nutný server i klientská aktiva, nikoli samotná složka public.

## Nastavení před ostrým spuštěním

- Nastavte SITE_URL na finální HTTPS doménu (metadata, robots a sitemap).
- Připojte produkční D1 databázi a aplikujte její migrace. Před existující databází ověřte již aplikované migrace.
- Nastavte přístup k Urbium a proveďte autorizovanou synchronizaci nabídky. V kontrolovaném lokálním náhledu byla nabídka prázdná.
- Automatické odesílání formulářů vyžaduje Resend, Turnstile a migraci ochrany poptávek; postup je v `docs/inquiries.md`. Bez konfigurace formulář nabízí e-mailový kontakt a automatické odesílání není aktivní.
- Tajné hodnoty nastavujte v hostingu, nikoli ve zdrojích. `.env.example` obsahuje pouze vzor.
- Externí fotografie importovaných projektů a Urbium zůstávají závislé na zdrojovém serveru. Lokální optimalizace je nemění.

## Média

Lokální rasterové obrázky jsou WebP s odpovídajícími rozměry. Velké obrázky mají varianty 480 a 960 px, které vybírá prohlížeč přes srcset/sizes. Komponenta OptimizedImage doplňuje rozměry a asynchronní dekódování. Fotografie pod prvním pohledem mají odložené načítání. OG obrázek zůstává PNG pro kompatibilitu sdílení.

Původní média jsou zálohována mimo public v pracovní složce Realitní Agentura Olomouc / image-originals-2026-10-03. Záloha nepatří do uploadu. Přehled úspory je v `docs/image-optimization.json`.

## Kontrola

Kontrola osmi hlavních stránek v prohlížeči při 390, 820 a 1440 px: bez horizontálního přesahu celé stránky. Ověřeno mobilní menu, otevření odhadu ceny, výběr projektu a detail Domy Ústín, přepočet splátky a přepnutí typu hypotéky. Projektový carousel má záměrně horizontální posun uvnitř svého panelu.

Nejde o měření Lighthouse ani test reálného doručení e-mailu nebo ostré synchronizace dat. Po nasazení ověřte finální doménu, formuláře a aktuální nabídku v produkci.
