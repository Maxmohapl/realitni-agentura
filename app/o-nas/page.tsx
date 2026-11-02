import OptimizedImage from '@/components/OptimizedImage';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import SiteHeader from '../SiteHeader';

export const metadata: Metadata = { title: 'O nás | Realitní Agentura' };
const questions = [
  'Chcete bydlet na samotě nebo v rušné městské atmosféře?',
  'Hledáte rodinný dům nebo byt?',
  'Líbí se vám dívat se na okolí z výšky nebo upřednostňujete klid přízemí?',
  'Toužíte po slunné terase nebo stinném obývacím pokoji?',
  'Přejete si bungalov nebo patrový dům?',
];
const teamPortraits = [
  ['jaroslav-bejdak', 'Jaroslav Bejdák'],
  ['iva-dokoupilova', 'Bc. Iva Dokoupilová'],
  ['leona-kocikova', 'Leona Kočíková'],
  ['radek-mezl', 'Bc. Radek Mézl, MBA'],
  ['tomas-prochazka', 'Tomáš Procházka'],
  ['eva-prochazkova', 'Eva Procházková'],
  ['anna-uricarova', 'Anna Uřičářová'],
];
export default function Page() {
  return (
    <main className="site-shell about-page">
      <SiteHeader activeItem="O nás" />
      <section className="about-intro about-section">
        <div className="about-owner-portrait"><OptimizedImage src="/images/about/owner-portrait.webp" alt="Bc. Radek Mézl, MBA, majitel realitní kanceláře" /></div>
        <div className="about-copy">
          <div className="about-eyebrow">O NÁS<span /></div>
          <h1>Pár slov <em>úvodem</em></h1>
          <p>V naší realitní agentuře na vás čeká tým profesionálů, kteří se na realitním trhu pohybují již řadu let a mají rozsáhlé zkušenosti s obchodováním s nemovitostmi. Zajišťujeme zprostředkování prodeje i pronájmu nemovitostí, umíme vaši nemovitost ocenit a stanovit reálnou tržní cenu.</p>
          <p>Dokážeme stanovit předpokládanou časovou osu prodeje a umíme pro vás zajistit nejvýhodnější způsob financování nového bydlení. U prodeje pozemků vyhledáme a zajistíme všechny potřebné a důležité údaje. Po celou dobu spolupráce budete mít jasné a přesné informace o průběhu obchodu.</p>
          <p className="about-signature"><strong>Bc. Radek Mézl, MBA</strong><br />majitel realitní kanceláře</p>
        </div>
      </section>
      <section className="about-team about-section about-team--portraits" id="nas-tym">
        <div className="about-copy">
          <div className="about-eyebrow">NÁŠ TÝM<span /></div>
          <h2>Máme skvělý tým,{' '}<br />na který se můžete <em>spolehnout.</em></h2>
          <p>Naše realitní agentura stojí na zkušených profesionálech, kteří spojují odbornost s lidským přístupem. Otevřeně komunikujeme, nasloucháme vašim potřebám a společně hledáme ta nejlepší řešení – ať už jde o prodej, pronájem, ocenění nemovitosti nebo financování.</p>
          <div className="about-values"><span>Zkušenosti</span><span>Osobní přístup</span><span>Jasná komunikace</span></div>
          <a className="about-button" href="/nas-tym">POZNAT NÁŠ TÝM<ArrowRight /></a>
        </div>
        <div className="about-real-team" aria-label="Seznamte se s našimi makléři">
          {teamPortraits.map(([id, name], index) => (
            <a key={id} href={`/nas-tym#${id}`} className="about-real-team__person" style={{ left: `${index * 12.5 + 6.25}%`, zIndex: index === 3 ? 10 : index + 1 }} aria-label={`Poznat: ${name}`}>
              <OptimizedImage src={`/images/team/${id}.webp`} alt={name} loading="lazy" />
              <span>{name}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="about-contact about-section">
        <div className="about-copy">
          <div className="about-eyebrow">VŽDY JSME TU PRO VÁS<span /></div>
          <h2>„Vždy vám rádi<br /> odpovíme, poradíme<br /> a <em>vše vyřešíme.</em>“</h2>
          <p>Než se však pustíme do práce, nejdříve vás pečlivě vyslechneme, zjistíme vaše potřeby a probereme vaše záměry. Pod pojmem kvalitní bydlení si totiž každý z nás představuje něco jiného. Zajímá nás, proč nemovitost prodáváte nebo pronajímáte nebo co právě hledáte.</p>
          <ul>{questions.map(question => <li key={question}><span className="about-list-dot" aria-hidden="true">•</span>{question}</li>)}</ul>
          <a className="about-button" href="/kontakt">KONTAKT<ArrowRight /></a>
        </div>
        <div className="about-contact-art"><OptimizedImage src="/images/about/wooden-house.png" width={1447} height={1087} alt="Dům s dřevěnou fasádou a zahradou" loading="lazy" /></div>
      </section>
    </main>
  );
}
