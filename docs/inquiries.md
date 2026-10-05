# Aktivace poptávek na Cloudflare

Poptávky se odesílají serverem přes Resend výhradně na prochazka@egpreality.cz. Zákazník dostane potvrzení na stránce, nikoli automatický e-mail. Úspěch znamená přijetí poskytovatelem, nikoliv potvrzení doručení do schránky.

## Aktivace
1. Aplikujte `drizzle/0001_inquiry_protection.sql` do produkční D1 navázané jako DB (realitni-agentura-db). Například `npx wrangler d1 execute realitni-agentura-db --remote --file drizzle/0001_inquiry_protection.sql` s konfigurací tohoto Workeru.
2. Založte Turnstile widget pro `realitni-agentura.mohaplmax7.workers.dev` a případnou finální doménu. Server ověřuje hostname a action `inquiry`.
3. V Resend ověřte odesílací doménu a DNS. Použijte API klíč s oprávněním pouze k odesílání.
4. Cloudflare Worker Settings → Variables and Secrets: nastavte tajné TURNSTILE_SECRET_KEY, RESEND_API_KEY a INQUIRY_HASH_SECRET (náhodných alespoň 32 znaků). Nikdy je nedávejte do GitHubu ani NEXT_PUBLIC proměnných.
5. Nastavte běžné proměnné TURNSTILE_SITE_KEY, INQUIRY_FROM (adresa na ověřené doméně), INQUIRY_ORIGINS (povolené originy oddělené čárkou, např. https://realitni-agentura.mohaplmax7.workers.dev).
6. Až po konfiguraci nastavte INQUIRIES_ENABLED=true a nasaďte. Předtím API vrací 503 a formulář nabízí e-mailový kontakt.
7. Proveďte jeden domluvený test všech polí a fotografií, ověřte příjem v cílové schránce i Resend logu. Pro lokální test použijte mock testy; CF-Connecting-IP musí v produkci pocházet z Cloudflare.

## Ochrany a limity
Turnstile na serveru, same-origin kontrola, honeypot, validace povinných polí, pevný příjemce a textový e-mail. D1 atomicky omezuje pokusy (10/IP/min, 120 globálně/min), odeslání (3/IP/15 min, 10/IP/den, 5/e-mail/den, 100 globálně/den). Duplicitní požadavky se deduplikují a poskytovatel dostává idempotency klíč. Nejasný výsledek se nikdy nevydává za úspěch.

Fotky jsou povoleny pouze u nacenění: max. 8 a 12 MB celkem, JPEG/PNG/WebP s kontrolou MIME a signatury, pevné názvy příloh. Neprobíhá antivirová kontrola, úplné dekódování ani odstranění EXIF. Fotky nejsou veřejně hostované; dostává je e-mailový poskytovatel a příjemce jako přílohy.

D1 ukládá pouze HMAC otisky IP, e-mailu a požadavku, stav a čas. Obsah ani fotografie neukládá. Staré řádky se mažou při dalších povolených pokusech po 24 hodinách (při neaktivitě zůstávají do příštího pokusu). Žádná automatická fronta/retry není aktivní; při výpadku poskytovatele formulář nabídne kontakt. Pro další ochranu objemu provozu nastavte Cloudflare WAF/rate-limit na POST /api/inquiries. Aplikační limity nenahrazují ochranu proti DDoS.
