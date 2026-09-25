'use client';
import { useRef, useState } from 'react';
import { projects } from './projects';
import { ArrowLeft, ArrowRight, House, TreePine, UsersRound } from 'lucide-react';
import SiteHeader from '../SiteHeader';
import ProjectCarousel from './ProjectCarousel';
export default function ProjectsOverview() {
 const [selectedId, setSelectedId] = useState<number>();
 const hero = useRef<HTMLElement>(null);
 const selected = projects.find(project => project.id === selectedId);
 function selectProject(id?: number) {
  setSelectedId(id);
  hero.current?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start'});
 }

 return <main className="site-shell projects-page"><SiteHeader activeItem="Projekty" />
  {selected ? <section ref={hero} className="project-preview">
   <button className="project-preview__back" onClick={()=>selectProject()}><ArrowLeft size={20} />Všechny projekty</button>
   <div className="project-preview__layout"><div className="project-preview__copy">
    <div className="projects-eyebrow">VYBRANÝ PROJEKT<span /></div>
    <h1>{selected.name}</h1><p className="project-preview__location">{selected.location}</p>
    <p className="project-preview__description">{selected.description}</p>
    {selected.href ? <a className="projects-button" href={selected.href}>Více o projektu<ArrowRight size={22} /></a> : <p className="project-preview__soon">Kompletní informace již brzy.</p>}
   </div><div className="project-preview__image"><img src={selected.thumbnail || '/images/projects/project-1.png'} alt={selected.name} /></div></div>
  </section> : <section ref={hero} className="projects-hero">
   <div className="projects-hero__copy"><div className="projects-eyebrow">NAŠE PROJEKTY<span /></div><h1>Projekty,<br />které dávají smysl.</h1><p className="projects-lead">Moderní bydlení, promyšlené lokality<br />a kvalitní architektura.</p><p>Naše rezidenční projekty vznikají s důrazem na kvalitu života, moderní standardy a dlouhodobou hodnotu. Spojujeme zkušenosti, spolehlivé partnery a individuální přístup, abychom vytvářeli místa, kde se dobře žije.</p><a className="projects-button" href="#aktualni-projekty">Prozkoumat projekty<ArrowRight size={20} /></a></div>
   <div className="projects-benefits"><div><House /><h2>Kvalitní<br />architektura</h2><p>Moderní a funkční domy s důrazem na detail.</p></div><div><TreePine /><h2>Klidné lokality<br />a zeleň</h2><p>Promyšlená místa pro pohodový život.</p></div><div><UsersRound /><h2>Individuální<br />přístup</h2><p>Nasloucháme vašim potřebám a hledáme nejlepší řešení.</p></div></div>
  </section>}<ProjectCarousel selectedId={selectedId} onSelect={selectProject} />
 </main>;
}
