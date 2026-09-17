# Propojení recenzí Google

Nastavte v lokálním prostředí / hostingu (nikdy v klientském kódu):

- GOOGLE_PLACES_API_KEY: klíč pro povolené Places API (New).
- GOOGLE_PLACE_ID: identifikátor potvrzeného firemního profilu.
- GOOGLE_REVIEWS_URL: odkaz na potvrzený profil, použitý i při nedostupnosti API.

Klíč necommitujte. Po změně prostředí restartujte server. Endpoint /api/google-reviews vrací nejvýše tři skutečné recenze a hodnocení. Bez konfigurace se zobrazuje neutrální stav bez smyšlených recenzí. Připojení k reálnému profilu dosud čeká na nastavení.
