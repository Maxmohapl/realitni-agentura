# Podklad pro informace o soukromí — nezveřejněný návrh

Tento dokument je určen k dokončení provozovatelem a jeho právníkem. Není zatím publikovanou zásadou ochrany osobních údajů.

Správce: PANFERRADA invest s.r.o., IČO 03805735, Lazecká 57/6, Lazce, 779 00 Olomouc. Kontakt: info@realitni-agentura.cz.

## Skutečnosti z implementace

- Formuláře mohou obsahovat jméno, e-mail, telefon, informace o nemovitosti, rozpočtu a požadavcích; ocenění též fotografie. Účelem je vyřízení konkrétního dotazu a příprava nabídky služby.
- Bez aktivace serverového doručování se připravuje e-mail v aplikaci návštěvníka. Teprve jeho odesláním jsou údaje zaslány příjemci.
- Po aktivaci serverového doručování se používají Cloudflare (hosting, D1, Turnstile) a Resend (doručení e-mailu); příjemcem poptávky je prochazka@egpreality.cz. Provozovatel musí ověřit smlouvy se zpracovateli, regiony, případná předání mimo EHP a jejich záruky.
- D1 ukládá HMAC otisky pro omezení zneužití, stav a čas, nikoli obsah zpráv či fotografie. Záznamy starší 24 hodin se čistí při následujících povolených pokusech; nejde o garantovaný výmaz přesně za 24 hodin.
- Fotografie se posílají jako přílohy. Kód neodstraňuje metadata EXIF.
- Kalkulačka předává GPF parametry financování, ne jméno a kontaktní údaje z formuláře.
- V kontrolovaném kódu není marketingové měření; ochrany a logy infrastruktury je nutné ověřit u skutečně nasazeného poskytovatele.

## Doplnit před zveřejněním

1. Poskytovatele schránek a případného CRM, všechny příjemce a zpracovatele, jejich role a podmínky.
2. Skutečnou dobu uchování vyřízených poptávek bez zakázky a fotografií, zvlášť dobu uchování smluvních a zákonem vyžadovaných podkladů a záloh. Návrh doby musí odpovídat tomu, co tým skutečně nastaví a dodrží.
3. Právní tituly pro jednotlivé účely: jednání o smlouvě na žádost zájemce; podle okolností oprávněný zájem pro ochranu proti zneužití a běžné dotazy; povinnosti vyplývající ze zákona. Nepoužívat univerzální povinný marketingový souhlas jako náhradu těchto titulů.
4. Poučení o přístupu, opravě, výmazu, omezení, přenositelnosti a námitce tam, kde se uplatní; způsob uplatnění práv a právo stížnosti u ÚOOÚ. U případného souhlasu uvést možnost odvolání.
5. Povinnost či dobrovolnost jednotlivých údajů a důsledky jejich neposkytnutí; ověřit, zda existuje profilování nebo automatizované rozhodování mimo samotný web.

Po doplnění zveřejnit samostatnou stránku a přidat odkazy k formulářům i do patičky. Předat právníkovi také informace o poskytování/zprostředkování finančních služeb, aby posoudil specifické informační povinnosti a oprávnění skutečného poskytovatele.
