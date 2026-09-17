'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

const projects = [
 {id:1,name:'Novostavby Ústín',location:'Ústín u Olomouce',description:'Rodinné domy se zahradou v klidné lokalitě nedaleko Olomouce.',href:'/projekty/novostavby-ustin'},
 {id:2,name:'Mušlovské vinohrady',location:'Mušlov, Mikulov',description:'Apartmány mezi vinicemi s výhledy na Pálavu a jižní Moravu.',href:'/projekty/muslovske-vinohrady'},
 {id:3,name:'Projekt 03',location:'Lokalitu brzy doplníme',description:'Podrobnosti o projektu pro vás připravujeme.',href:''},
 {id:4,name:'Projekt 04',location:'Lokalitu brzy doplníme',description:'Podrobnosti o projektu pro vás připravujeme.',href:''},
];
export default function ProjectCarousel() {
 const track = useRef<HTMLDivElement>(null);
 const [paused, setPaused] = useState(false);
 const [hovered, setHovered] = useState(false);
 const [focused, setFocused] = useState(false);
 const [reducedMotion, setReducedMotion] = useState(false);
 useEffect(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => setReducedMotion(media.matches);
  update(); media.addEventListener('change', update);
  return () => media.removeEventListener('change', update);
 }, []);
 function move(direction: number) {
  const el = track.current;
  if (!el) return;
  const card = el.firstElementChild as HTMLElement | null;
  const step = (card?.offsetWidth || 350) + 24;
  const end = el.scrollWidth - el.clientWidth;

  const next = direction > 0 && el.scrollLeft >= end - 3 ? 0 : direction < 0 && el.scrollLeft <= 3 ? end : el.scrollLeft + direction * step;
  el.scrollTo({left: next, behavior: reducedMotion ? 'instant' : 'smooth'});
 }
 useEffect(() => {
  if (paused || hovered || focused || reducedMotion) return;
  const timer = window.setInterval(() => { if (!document.hidden) move(1); }, 4000);
  return () => window.clearInterval(timer);
 }, [paused, hovered, focused, reducedMotion]);
 return <section className="projects-list" id="aktualni-projekty" aria-labelledby="projects-list-title" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false);}}>
  <div className="projects-list__heading"><div><div className="projects-eyebrow">AKTUÁLNÍ PROJEKTY<span /></div><h2 id="projects-list-title">Naše rezidenční projekty</h2></div><div className="projects-controls"><button type="button" aria-label={paused ? 'Spustit automatické posouvání' : 'Pozastavit automatické posouvání'} onClick={()=>setPaused(!paused)}>{paused ? <Play /> : <Pause />}</button><button type="button" aria-label="Předchozí projekty" onClick={()=>move(-1)}><ArrowLeft /></button><button type="button" aria-label="Další projekty" onClick={()=>move(1)}><ArrowRight /></button></div></div>
  <div className="projects-track" ref={track} role="region" aria-label="Posouvatelný seznam projektů" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}}}>
   {projects.map(project=><article className="project-tile" key={project.id}><div className="project-tile__image">{project.href && <a className="project-tile__image-link" href={project.href} aria-label={`Zobrazit ${project.name}`} />}<img src={`/images/projects/project-${project.id}.png`} alt={`Vizualizace projektu ${project.id}`} loading="lazy" /></div><h3>{project.href ? <a href={project.href}>{project.name}</a> : project.name}</h3><p className="project-tile__location">{project.location}</p><p>{project.description}</p>{project.href ? <a className="project-tile__link" href={project.href}>Zobrazit projekt <ArrowRight size={18} /></a> : <span className="project-tile__soon">Již brzy <ArrowRight size={18} /></span>}</article>)}
  </div>
  <div className="projects-tagline"><span />KVALITNÍ DOMOVY PRO LEPŠÍ ŽIVOT<span /></div>
 </section>;
}
