import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, FileText, Mail, Phone } from 'lucide-react';
import SiteHeader from '../../SiteHeader';
import projects from '../project-details.json';
import ProjectInquiry from '../ProjectInquiry';
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
 const {slug}=await params; const project=projects.find(p=>p.slug===slug);
 return {title: project ? `${project.title} | Realitní Agentura` : 'Projekt nenalezen'};
}
export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const project=projects.find(p=>p.slug===slug);
 if(!project) notFound();
 const sections: {title:string;blocks:typeof project.blocks}[]=[];
 for(const block of project.blocks) { if(block.tag==='h2') sections.push({title:block.text,blocks:[]}); else sections.at(-1)?.blocks.push(block); }
 const intro=sections.shift();
 const firstBenefit=intro?.blocks.findIndex(b=>b.tag==='h5') ?? -1;
 const introduction=intro?.blocks.slice(0,firstBenefit) || [];
 const benefits=intro?.blocks.slice(firstBenefit) || [];
 const benefitsGroups:{title:string;text:string[]}[]=[];
 for(const block of benefits) { if(block.tag==='h5')benefitsGroups.push({title:block.text,text:[]});else benefitsGroups.at(-1)?.text.push(block.text); }
 const standardGroups=(blocks:typeof project.blocks)=> {
  const groups:{title:string;items:string[]}[]=[];
  for(const b of blocks) {if(b.tag==='h3')groups.push({title:b.text,items:[]});else if(b.tag==='li')groups.at(-1)?.items.push(b.text);}
  return groups;
 };
 return <main className="site-shell project-detail"><SiteHeader activeItem="Projekty" />
  <header className="project-detail__hero"><a className="project-back" href="/projekty"><ArrowLeft size={17} />Všechny projekty</a><div className="project-detail__hero-grid"><div><div className="projects-eyebrow">{project.location}</div><h1>{project.title}</h1><p>{introduction[0]?.text}</p><a className="projects-button" href="#nabidka">Prohlédnout nabídku<ArrowRight size={19}/></a></div><img src={`/images/projects/project-${project.photo}.png`} alt={`Vizualizace – ${project.title}`} /></div></header>
  <nav className="project-detail__nav" aria-label="Sekce projektu"><a href="#o-projektu">O projektu</a><a href="#vybaveni">Vybavení a standardy</a><a href="#galerie">Galerie a průběh stavby</a><a href="#nabidka">Nabídka nemovitostí</a><a href="#dokumenty">Dokumenty</a>{project.partners.length>0 && <a href="#partneri">Partneři projektu</a>}<a href="#kontakt-projektu">Kontakt a poptávka</a></nav>
  <section className="project-detail__section" id="o-projektu"><div className="project-detail__intro"><h2>{intro?.title}</h2><div>{introduction.slice(1).map((b,i)=><p key={i}>{b.text}</p>)}</div></div><div className="project-benefit-grid">{benefitsGroups.map(b=><article key={b.title}><h3>{b.title}</h3>{b.text.map((text,i)=><p key={i}>{text}</p>)}</article>)}</div>{sections.filter(s=>s.title==='O projektu').map(s=><div className="project-description" key={s.title}><h2>{s.title}</h2>{s.blocks.map((b,i)=><p key={i}>{b.text}</p>)}</div>)}</section>
  <section className="project-detail__section project-detail__tinted" id="vybaveni">{sections.filter(s=>s.title!=='O projektu').map(s=><div className="project-standards" key={s.title}><h2>{s.title}</h2><div className="project-standard-grid">{standardGroups(s.blocks).map(g=><details key={g.title} open><summary>{g.title}</summary><ul>{g.items.map((item,i)=><li key={i}>{item}</li>)}</ul></details>)}</div>{s.blocks.filter(b=>b.tag==='h6').map((b,i)=><p className="project-small" key={i}>{b.text}</p>)}</div>)}</section>
  <section className="project-detail__section" id="galerie"><div className="project-section-heading"><h2>Galerie a průběh stavby</h2><span>{project.images.length} fotografií a vizualizací</span></div><div className="project-gallery">{project.images.map((img,i)=><a key={i} href={img.full} target="_blank" rel="noopener noreferrer" aria-label={`Otevřít fotografii ${i+1} v plné velikosti`}><img src={img.src} alt={img.alt} loading="lazy" /></a>)}</div></section>
  <section className="project-detail__section project-detail__tinted" id="nabidka"><h2>{project.photo===1?'Přehled jednotlivých domů':'Přehled jednotlivých apartmánů'}</h2><p className="project-small">Ceny a dostupnost převzaty 17. 9. 2026. Aktuální stav vám potvrdí makléř.</p>{project.plans.map(plan=><a className="project-siteplan" key={plan.src} href={plan.full} target="_blank" rel="noopener noreferrer"><img src={plan.src} alt="Situační plán projektu" /></a>)}<div className="project-table-wrap"><table><thead><tr><th>Jednotka</th><th>Dispozice, vybavení a plocha</th><th>Cena</th><th>Stav</th><th>Půdorys</th></tr></thead><tbody>{project.units.map(unit=><tr key={unit.id}><th scope="row">{unit.id}</th><td>{unit.details}</td><td>{unit.price || '—'}</td><td><span className={`unit-status ${unit.status==='Volný'?'unit-status--available':''}`}>{unit.status}</span></td><td>{unit.pdf ? <a href={unit.pdf} target="_blank" rel="noopener noreferrer">Schéma PDF ↗</a> : '—'}</td></tr>)}</tbody></table></div>{project.photo===2 && <p className="project-small">T – terasa / Z – zahrada / S – sklep / G – garáž / GS – garážové stání / VS – venkovní parkovací stání</p>}</section>
  <section className="project-detail__section" id="dokumenty"><h2>Dokumenty ke stažení</h2><div className="project-document-grid">{(project.documents.length ? project.documents : project.units.filter(u=>u.pdf).map(u=>({name:`Dům ${u.id} – situační výkres`,url:u.pdf!}))).map(doc=><a key={doc.url} href={doc.url} target="_blank" rel="noopener noreferrer"><FileText size={25}/><span>{doc.name}</span><ArrowRight size={18}/></a>)}</div></section>
  {project.partners.length>0 && <section className="project-detail__section" id="partneri"><h2>Partneři projektu</h2><div className="project-partners">{project.partners.map(partner=><img key={partner.src} src={partner.src} alt={partner.alt} loading="lazy" />)}</div></section>}
  <section className="project-detail__section project-detail__contact" id="kontakt-projektu"><div><div className="projects-eyebrow">KONTAKT</div><h2>Zajímají vás podrobnosti?</h2><img src="/images/team/radek-mezl.png" alt="Bc. Radek Mézl" /><h3>Bc. Radek Mézl{project.photo===1?', MBA.':''}</h3><a href="tel:+420734760779"><Phone size={19}/>+420 734 760 779</a><a href="mailto:radek.mezl@realitni-agentura.cz"><Mail size={19}/>radek.mezl@realitni-agentura.cz</a><a href={project.navigation} target="_blank" rel="noopener noreferrer">Navigovat do kanceláře ↗</a></div><ProjectInquiry title={project.title} units={project.units.map(u=>u.id)} source={project.source}/></section>
  <p className="project-source">Podklady projektu: <a href={project.source} target="_blank" rel="noopener noreferrer">{project.title} – původní stránka ↗</a></p>
 </main>;
}
