import type { Metadata } from 'next';
import { UsersRound, Heart, ShieldCheck, Phone, Mail, CircleUserRound } from 'lucide-react';
import SiteHeader from '../SiteHeader';
import TeamInquiry from './TeamInquiry';
export const metadata: Metadata = { title: 'Náš tým | Realitní Agentura' };
const agents = [{"id": "radek-mezl", "name": "Bc. Radek Mézl", "role": "majitel realitní kanceláře", "phone": "+420 734 760 779", "email": "radek.mezl@realitni-agentura.cz", "image": "/images/team/radek-mezl.png", "description": "Vedu naši kancelář s důrazem na kvalitu služeb, důvěru a dlouhodobé vztahy s klienty. V realitách se pohybuji řadu let a dobře znám místní trh."}, {"id": "iva-dokoupilova", "name": "Iva Dokoupilová", "role": "realitní makléřka", "phone": "+420 724 035 099", "email": "iva.dokoupilova@realitni-agentura.cz", "image": "/images/team/iva-dokoupilova.png", "description": "Pomáhám klientům s prodejem i pronájmem nemovitostí. Zakládám si na osobním přístupu, pečlivosti a spolehlivosti."}, {"id": "jaroslav-bejdak", "name": "Jaroslav Bejdák", "role": "realitní makléř", "phone": "+420 602 526 500", "email": "jaroslav.bejdak@realitni-agentura.cz", "image": "/images/team/jaroslav-bejdak.png", "description": "Ke každému obchodu přistupuji zodpovědně a s důrazem na bezpečnost a spokojenost klienta. Mám dlouholeté zkušenosti z realitního trhu."}, {"id": "tomas-prochazka", "name": "Tomáš Procházka", "role": "realitní makléř", "phone": "+420 774 650 001", "email": "prochazkova@egpreality.cz", "image": "/images/team/tomas-prochazka.png", "description": "Specializuji se na prodej a pronájem nemovitostí v Olomouci a okolí. Klientům pomáhám najít to nejlepší řešení s ohledem na jejich potřeby."}, {"id": "eva-prochazkova", "name": "Eva Procházková", "role": "realitní makléřka", "phone": "+420 774 650 001", "email": "prochazkova@egpreality.cz", "image": "/images/team/eva-prochazkova.png", "description": "V realitách se zaměřuji na individuální přístup a efektivní řešení. Ráda pomáhám lidem najít domov, kde se budou cítit dobře."}, {"id": "leona-kocikova", "name": "Leona Kočíková", "role": "realitní makléřka", "phone": "+420 731 594 867", "email": "kocikova@egpreality.cz", "image": "/images/team/leona-kocikova.png", "description": "Mým cílem je, aby celý proces prodeje nebo pronájmu proběhl hladce a bez starostí. Zakládám si na komunikaci, transparentnosti a pečlivosti."}, {"id": "anna-uricarova", "name": "Anna Uřičářová", "role": "realitní makléřka", "phone": "+420 737 253 966", "email": "uricarova.anna@seznam.cz", "image": "/images/team/anna-uricarova.png", "description": "Ke klientům přistupuji otevřeně a s porozuměním. Pomáhám s prodejem i pronájmem a vždy hledám praktická řešení, která dávají smysl."}, {"id": "marcela-svakova", "name": "Marcela Sváková", "role": "realitní makléřka", "phone": "+420 777 002 406", "email": "svakovam@email.cz", "image": "", "description": "V realitách mě baví práce s lidmi a hledání nových příležitostí. Klientům nabízím spolehlivost, zkušenosti a maximální nasazení."}];
export default function TeamPage() {
 return <main className="site-shell team-page">
  <SiteHeader activeItem="Náš tým" />
  <section className="team-intro">
   <div className="team-intro__copy">
    <nav className="team-breadcrumb" aria-label="Drobečková navigace"><a href="/">Domů</a><span>›</span>Náš tým</nav>
    <h1>Náš tým</h1>
    <p>Jsme sehraný tým zkušených profesionálů, kteří vám pomohou s prodejem, pronájmem, oceněním nemovitosti i financováním. Ke každému klientovi přistupujeme osobně, férově a s maximálním nasazením.</p>
    <div className="team-values"><div><UsersRound /><span>Zkušenosti<br />a odbornost</span></div><div><Heart /><span>Osobní přístup<br />ke každému klientovi</span></div><div><ShieldCheck /><span>Spolehlivost<br />a férové jednání</span></div></div>
   </div>
   <div className="team-group" aria-label="Tým Realitní Agentury">
    <img className="team-group__mark" src="/images/hero/team-mark.png" alt="" />
    {['jaroslav-bejdak','iva-dokoupilova','leona-kocikova','radek-mezl','tomas-prochazka','eva-prochazkova','anna-uricarova'].map((id,index) => <img key={id} className="team-group__person" style={{left: `${index * 12.4}%`, zIndex: index === 3 ? 10 : index + 1}} src={`/images/team/${id}.png`} alt={agents.find(a=>a.id===id)?.name} />)}
   </div>
  </section>
  <section className="team-directory">
   <div className="team-directory__heading"><h2>Seznamte se s naším týmem</h2><p>Každý z nás přináší do týmu jedinečné zkušenosti. Spojuje nás společný cíl – spokojenost našich klientů.</p></div>
   <div className="team-grid">{agents.map(agent => <article className="team-card" key={agent.id}>
    <div className={`team-card__portrait${agent.image ? '' : ' team-card__portrait--reference'}`}><img src={agent.image || '/images/team/reference.png'} alt={agent.name} /></div>
    <div className="team-card__body"><h3>{agent.name}</h3><p className="team-card__role">{agent.role}</p>
    <a className="team-card__contact" href={`tel:${agent.phone.replaceAll(' ','')}`}><Phone />{agent.phone}</a>
    <a className="team-card__contact" href={`mailto:${agent.email}`}><Mail />{agent.email}</a>
    <p className="team-card__description">{agent.description}</p>
    <a className="team-red-button" href="/nabidka">NEMOVITOSTI MAKLÉŘE</a></div>
   </article>)}</div>
   <aside className="team-legal"><div className="team-legal__portrait"><CircleUserRound aria-hidden="true" /></div><div className="team-legal__person"><span>PRÁVNÍ PODPORA</span><h3>Mgr. Dalibor Lachman</h3><p>advokát</p><a href="tel:+420777723407"><Phone />+420 777 723 407</a><a href="mailto:daliborlachman@seznam.cz"><Mail />daliborlachman@seznam.cz</a></div><p className="team-legal__description">Zajišťuje právní servis naší kanceláře, včetně přípravy smluv, právního poradenství a bezpečného převodu nemovitostí. Díky jeho odbornosti mají naši klienti jistotu, že je celý proces v souladu s platnou legislativou.</p></aside>
  </section>
  <TeamInquiry />
 </main>;
}
