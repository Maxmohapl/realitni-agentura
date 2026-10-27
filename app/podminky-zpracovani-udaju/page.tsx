import type { Metadata } from 'next';
import SiteHeader from '../SiteHeader';
import { company } from '@/lib/company';

const title = 'Podmínky zpracování údajů | Realitní Agentura';
const description = 'Jak vyřizujeme nezávazné poptávky doručené e-mailem, jak používáme osobní údaje a jak můžete uplatnit svá práva.';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: '/podminky-zpracovani-udaju' },
  openGraph: { title, description, url: '/podminky-zpracovani-udaju' },
};

export default function InquiryPrivacyPage() {
  return <main className="site-shell"><SiteHeader /><article className="legal-page">
    <h1>Podmínky zpracování údajů</h1>
    <p>Tyto informace se týkají nezávazných poptávek, dotazů a žádostí o orientační ocenění zaslaných prostřednictvím našeho webu nebo e-mailem.</p>

    <section><h2>Kdo vaše údaje zpracovává</h2>
      <p>Správcem osobních údajů je <strong>{company.name}</strong>, IČO {company.ico}, se sídlem {company.address}. {company.register}</p>
      <p>Kontakt pro dotazy i uplatnění práv: <a href={`mailto:${company.email}`}>{company.email}</a>, telefon <a href="tel:+420734688825">{company.phone}</a>. Obrátit se na nás můžete také písemně na adrese sídla.</p>
    </section>

    <section><h2>Nezávazná poptávka a její vyřízení</h2>
      <p>Odeslání poptávky je bezplatné. Samotným odesláním ani potvrzením přijetí nevzniká smlouva o realitním zprostředkování, rezervace nemovitosti ani povinnost zaplatit provizi. Případnou spolupráci, její rozsah a odměnu sjednáme samostatně.</p>
      <p>Vaše zpráva je určena kanceláři nebo makléři uvedenému u nabídky. Pověřená osoba vás může kontaktovat e-mailem či telefonicky za účelem vyřízení požadavku. Dostupnost nemovitosti a aktuální podmínky potvrdíme při následné komunikaci.</p>
      <p>Pokud tlačítko připravuje e-mail, otevře zprávu ve vaší poštovní aplikaci a odeslání dokončíte sami. U přímého odeslání z webu předáme zprávu e-mailové službě. Potvrzení na stránce neznamená, že pracovník kanceláře již zprávu přečetl. Při potížích nás kontaktujte telefonicky nebo e-mailem.</p>
    </section>

    <section><h2>Orientační ocenění a přílohy</h2>
      <p>Bezplatné ocenění je orientační odhad na základě dodaných informací a dostupných údajů o trhu. Není znaleckým posudkem, bankovním oceněním ani zárukou dosažení určité prodejní ceny. Výsledek může ovlivnit prohlídka, skutečný stav nemovitosti a vývoj trhu.</p>
      <p>Posílejte pouze potřebné informace a fotografie, které jste oprávněni pro tento účel poskytnout. Nepřikládejte doklady totožnosti, fotografie osob ani jiné nepotřebné osobní údaje. Fotografie mohou obsahovat také metadata, například polohu; před odesláním je můžete odstranit.</p>
      <p>Zaslání fotografií pro posouzení nemovitosti samo o sobě neopravňuje k jejich veřejnému zveřejnění nebo reklamnímu použití. Takové použití je předmětem samostatné dohody.</p>
    </section>

    <section><h2>Jaké údaje používáme</h2>
      <p>Podle zvoleného formuláře jde o jméno, e-mail, telefon, údaje o nemovitosti, lokalitu, rozpočet, požadavky, obsah zprávy, dobrovolné fotografie a navazující komunikaci. Povinná pole jsou označena ve formuláři. Bez nich nelze příslušný formulář odeslat; můžete využít jiný zveřejněný kontakt. Fotografie jsou dobrovolné.</p>
      <p>Při provozu webu a ochraně proti spamu se zpracovávají také nezbytné technické údaje, například IP adresa, informace o prohlížeči a stav a čas požadavku. Ochrana formuláře používá pseudonymizované otisky pro omezení opakovaných pokusů.</p>
    </section>

    <section><h2>Účely a právní základy</h2>
      <ul>
        <li><strong>Jednání o službě na vaši žádost:</strong> vyřízení poptávky a příprava případné smlouvy podle čl. 6 odst. 1 písm. b) GDPR.</li>
        <li><strong>Obecné dotazy a bezpečnost:</strong> oprávněný zájem na vyřízení příchozí komunikace a ochraně webu před zneužitím podle čl. 6 odst. 1 písm. f) GDPR.</li>
        <li><strong>Ochrana právních nároků:</strong> oprávněný zájem na uchování nezbytných důkazů podle čl. 6 odst. 1 písm. f) GDPR.</li>
        <li><strong>Zákonné povinnosti:</strong> pokud se na konkrétní dokumentaci vztahuje povinnost uchování, čl. 6 odst. 1 písm. c) GDPR.</li>
      </ul>
      <p>Odeslání poptávky není souhlasem s newsletterem ani s nesouvisejícími reklamními nabídkami. Případný odběr obchodních sdělení se řeší samostatně. Poptávky nejsou určeny k prodeji kontaktů.</p>
    </section>

    <section><h2>Doručení e-mailem a příjemci údajů</h2>
      <p>Obsah poptávky a přílohy se doručují do e-mailové schránky určené k jejímu vyřízení. K údajům mohou mít přístup pověření pracovníci a zapojení makléři, poskytovatelé e-mailových služeb a technické podpory, v nezbytných případech právní poradci a oprávněné orgány veřejné moci.</p>
      <p>Web využívá infrastrukturu Cloudflare. Při aktivním přímém odesílání používá také Cloudflare Turnstile pro ochranu proti spamu a Resend pro doručení e-mailu. Při odeslání z vaší poštovní aplikace se přenos řídí rovněž službou vašeho poskytovatele pošty.</p>
      <p>Databáze ochrany formuláře neukládá obsah zprávy ani fotografie. To však neznamená, že po odeslání údaje zaniknou: zpráva a přílohy zůstávají v e-mailové komunikaci a mohou být zpracovávány poskytovateli doručení.</p>
      <p>Využití zahraničních technických služeb může zahrnovat zpracování mimo Evropský hospodářský prostor. Pro takové předávání musí být splněny podmínky GDPR, například odpovídající rozhodnutí o ochraně nebo vhodné smluvní záruky. Informace o konkrétních příjemcích a použitých zárukách si můžete vyžádat na výše uvedeném kontaktu.</p>
    </section>

    <section><h2>Doba uchování a výmaz</h2>
      <p>Doba uchování se řídí účelem: dobou vyřízení požadavku, nezbytností navazující komunikace a případnými zákonnými povinnostmi nebo potřebou ochrany konkrétních právních nároků. Samotné uložení zprávy v e-mailové schránce není důvodem pro neomezené uchování.</p>
      <p>Po skončení jednání bez zakázky je třeba odstranit údaje, které již nejsou potřebné. Totéž platí pro fotografie poskytnuté výhradně k ocenění. Pokud vznikne zakázka, nezbytné podklady mohou tvořit její dokumentaci a jejich uchování se posuzuje podle souvisejících smluvních a zákonných povinností.</p>
      <p>Výmaz e-mailové komunikace zajišťuje správce schránky; samotný web ji automaticky nemaže. Technické záznamy ochrany formuláře se průběžně čistí při dalších požadavcích. Kopie u poskytovatelů a v zálohách podléhají také jejich retenčním cyklům; nejde o záruku okamžitého odstranění všech kopií při odeslání či smazání zprávy.</p>
    </section>

    <section><h2>Vaše práva a kontakt</h2>
      <p>Za podmínek GDPR můžete požadovat přístup k údajům, jejich opravu, výmaz nebo omezení zpracování. Proti zpracování založenému na oprávněném zájmu můžete vznést námitku. U automatizovaného zpracování založeného na smlouvě nebo souhlasu se může uplatnit právo na přenositelnost. Pokud by zpracování vycházelo ze souhlasu, můžete jej odvolat bez vlivu na zákonnost předchozího zpracování.</p>
      <p>Žádost můžete zaslat na <a href={`mailto:${company.email}`}>{company.email}</a> nebo uplatnit jiným odpovídajícím způsobem. Při důvodných pochybnostech o totožnosti můžeme požádat o nezbytné doplňující ověření. O vyřízení informujeme bez zbytečného odkladu, nejpozději do jednoho měsíce; o případném prodloužení o další dva měsíce z důvodu složitosti nebo počtu žádostí informujeme během prvního měsíce.</p>
      <p>Výmaz není bezvýjimečný, například pokud je nezbytné uchování nařízeno zákonem nebo slouží ochraně právních nároků. Máte právo podat stížnost <a href="https://uoou.gov.cz" target="_blank" rel="noopener noreferrer">Úřadu pro ochranu osobních údajů</a>.</p>
      <p>Samotný formulář neprovádí automatizované rozhodování s právními nebo obdobně významnými účinky. Ověření proti spamu slouží k zabezpečení odesílání.</p>
    </section>
  </article></main>;
}
