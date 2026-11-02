# Propojení recenzí a statistik

Na serveru nastavte GOOGLE_PLACES_API_KEY (Places API New, povolená fakturace a omezení klíče na tuto službu), GOOGLE_PLACE_ID potvrzeného firemního profilu a GOOGLE_REVIEWS_URL. Klíč se neposílá prohlížeči. Náklady a kvóty nastavte v Google Cloud před aktivací; endpoint požaduje i recenze.

Úvod a služby čerpají stejné celkové hodnocení jako sekce recenzí. Procento je zaokrouhlené rating / 5 * 100, ne podíl spokojených klientů. Bez platného hodnocení a nenulového počtu recenzí je zobrazena pomlčka. Výpočet nepoužívá průměr několika vybraných recenzí.

Sekce recenzí po připojení zobrazí vrácené recenze včetně autorů, profilových odkazů, dostupných fotografií autorů a odkazu na Google Maps. Bez připojení zachovává původní ručně vybranou sekci z podkladů majitele, ale nezobrazuje neověřený souhrnný rating 4,6. Automatický výběr může obsahovat i hodnocení nižší než pět hvězd.

V lib/content/statistics.ts je potvrzený základ 15 let zkušeností v roce 2026 a 10 lidí v týmu (8 makléřů a 2 právníci). Doplňte ještě potvrzený totalSold. Hodnota null znamená nezadaný údaj (pomlčka na webu). Rok se počítá podle kalendáře Europe/Prague; po novém roce se navýší bez změny kódu. Nejde o přesný počet dokončených let od výročí založení. Počet celkových prodejů se nezvyšuje automaticky, dokud nemá ověřený zdroj.

Podklady: https://developers.google.com/maps/documentation/places/web-service/place-details a https://developers.google.com/maps/documentation/places/web-service/policies
