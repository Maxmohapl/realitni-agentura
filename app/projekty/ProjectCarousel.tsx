'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

import { projects } from './projects';

export default function ProjectCarousel({ selectedId, onSelect }: { selectedId?: number; onSelect?: (id: number) => void }) {
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
  const step = (card?.offsetWidth || 350) + (parseFloat(getComputedStyle(el).columnGap) || 0);
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
   {projects.map(project=><article className={`project-tile${selectedId === project.id ? ' project-tile--selected' : ''}`} key={project.id}>
    <button type="button" className="project-tile__preview" onClick={()=>onSelect?.(project.id)} aria-label={`Zobrazit ${project.name}`} aria-pressed={selectedId === project.id}>
     <div className="project-tile__image"><img src={project.thumbnail || '/images/projects/project-1.png'} alt={project.name} loading="lazy" onError={event => { event.currentTarget.src = '/images/projects/project-1.png'; }} /></div>
     <h3>{project.name}</h3><p className="project-tile__location">{project.location}</p><p>{project.description}</p><span className="project-tile__link">Zobrazit projekt <ArrowRight size={18} /></span>
    </button></article>)}
  </div>
  <div className="projects-tagline"><span />KVALITNÍ DOMOVY PRO LEPŠÍ ŽIVOT<span /></div>
 </section>;
}
