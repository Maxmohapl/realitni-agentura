import type { Metadata } from 'next';
import SiteHeader from '../SiteHeader';
import { company } from '@/lib/company';

export const metadata: Metadata = {
 title: 'Provozovatel a informace pro spotřebitele | Realitní Agentura',
 description: 'Identifikační údaje provozovatele Realitní Agentury a informace o mimosoudním řešení spotřebitelských sporů.',
 alternates: { canonical: '/pravni-informace' },
};
export default function LegalInformation() {
 return <main className="site-shell"><SiteHeader /><article className="legal-page">
  <h1>Provozovatel a informace pro spotřebitele</h1>
  <section><h2>Provozovatel webu</h2><p><strong>{company.name}</strong><br />Sídlo: {company.address}<br />IČO: {company.ico}<br />DIČ: {company.vatId}</p><p>{company.register}</p>
   <p>E-mail: <a href={`mailto:${company.email}`}>{company.email}</a><br />Telefon: <a href="tel:+420734688825">{company.phone}</a></p>
  </section>
  <section><h2>Mimosoudní řešení spotřebitelských sporů</h2>
   <p>Pokud mezi námi a spotřebitelem vznikne spor ze smlouvy o poskytování realitních služeb, který se nepodaří vyřešit vzájemnou dohodou, může spotřebitel podat návrh na mimosoudní řešení sporu České obchodní inspekci.</p>
   <p>Česká obchodní inspekce, Ústřední inspektorát – oddělení ADR<br />Gorazdova 1969/24, 120 00 Praha 2<br />E-mail: <a href="mailto:adr@coi.gov.cz">adr@coi.gov.cz</a></p>
   <p>Postup a podmínky najdete na <a href="https://coi.gov.cz/informace-o-adr/" target="_blank" rel="noopener noreferrer">stránkách České obchodní inspekce</a>.</p>
  </section>
  <section><h2>Financování nemovitosti</h2><p>Výsledky kalkulačky financování jsou orientační. Nejde o závaznou nabídku úvěru ani o příslib jeho poskytnutí. Konečnou nabídku a podmínky schvaluje příslušný poskytovatel úvěru.</p></section>
 </article></main>;
}
