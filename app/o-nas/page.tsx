import type { Metadata } from 'next';
import { ArrowRight, CircleDot } from 'lucide-react';
import SiteHeader from '../SiteHeader';

export const metadata: Metadata = { title: 'O nás | Realitní Agentura' };
const questions = [
  'Chcete bydlet na samotě nebo v rušné městské atmosféře?',
  'Hledáte rodinný dům nebo byt?',
  'Líbí se vám dívat se na okolí z výšky nebo upřednostňujete klid přízemí?',
  'Toužíte po slunné terase nebo stinném obývacím pokoji?',
  'Přejete si bungalov nebo patrový dům?',
];
function Visual({ kind, alt }: { kind: string; alt: string }) {
  return <div className={`about-visual about-visual--${kind}`}><img src="/images/about/reference.png" alt={alt} /></div>;
}
export default function Page() {
  return (
    <main className="site-shell about-page">
      <SiteHeader activeItem="O nás" />
      <section className="about-intro about-section">
        <Visual kind="owner" alt="Bc. Radek Mézl, majitel realitní kanceláře" />
        <div className="about-copy">
          <div className="about-eyebrow">O NÁS<span /></div>
          <h1>Pár slov <em>úvodem</em></h1>
          <p>V naší realitní agentuře na vás čeká tým profesionálů, kteří se na realitním trhu pohybují již řadu let a mají rozsáhlé zkušenosti s obchodováním s nemovitostmi. Zajišťujeme zprostředkování prodeje i pronájmu nemovitostí, umíme vaši nemovitost ocenit a stanovit reálnou tržní cenu.</p>
          <p>Dokážeme stanovit předpokládanou časovou osu prodeje a umíme pro vás zajistit nejvýhodnější způsob financování nového bydlení. U prodeje pozemků vyhledáme a zajistíme všechny potřebné a důležité údaje. Po celou dobu spolupráce budete mít jasné a přesné informace o průběhu obchodu.</p>
          <p className="about-signature"><strong>Bc. Radek Mézl</strong><br />majitel realitní kanceláře</p>
        </div>
      </section>
      <section className="about-team about-section">
        <div className="about-copy">
          <div className="about-eyebrow">NÁŠ TÝM<span /></div>
          <h2>Máme skvělý tým,<br />na který se můžete <em>spolehnout.</em></h2>
          <p>Naše realitní agentura stojí na zkušených profesionálech, kteří spojují odbornost s lidským přístupem. Otevřeně komunikujeme, nasloucháme vašim potřebám a společně hledáme ta nejlepší řešení – ať už jde o prodej, pronájem, ocenění nemovitosti nebo financování.</p>
          <div className="about-values"><span>Zkušenosti</span><span>Osobní přístup</span><span>Jasná komunikace</span></div>
          <a className="about-button" href="/nas-tym">POZNAT NÁŠ TÝM<ArrowRight /></a>
        </div>
        <Visual kind="team" alt="Náš tým při společné práci v realitní kanceláři" />
      </section>
      <section className="about-contact about-section">
        <div className="about-copy">
          <div className="about-eyebrow">VŽDY JSME TU PRO VÁS<span /></div>
          <h2>„Vždy vám rádi<br /> odpovíme, poradíme<br /> a <em>vše vyřešíme.</em>“</h2>
          <p>Než se však pustíme do práce, nejdříve vás pečlivě vyslechneme, zjistíme vaše potřeby a probereme vaše záměry. Pod pojmem kvalitní bydlení si totiž každý z nás představuje něco jiného. Zajímá nás, proč nemovitost prodáváte nebo pronajímáte nebo co právě hledáte.</p>
          <ul>{questions.map(question => <li key={question}><CircleDot aria-hidden="true" />{question}</li>)}</ul>
          <a className="about-button" href="/kontakt">KONTAKT<ArrowRight /></a>
        </div>
        <Visual kind="contact" alt="Ilustrace domu s realitním makléřem. Těšíme se na spolupráci!" />
      </section>
    </main>
  );
}
