import type { Metadata } from 'next';
import { ArrowRight, House, TreePine, UsersRound } from 'lucide-react';
import SiteHeader from '../SiteHeader';
import ProjectCarousel from './ProjectCarousel';
export const metadata: Metadata = { title: 'Projekty | Realitní Agentura' };
export default function Page() {
 return <main className="site-shell projects-page"><SiteHeader activeItem="Projekty" />
  <section className="projects-hero">
   <div className="projects-hero__copy"><div className="projects-eyebrow">NAŠE PROJEKTY<span /></div><h1>Projekty,<br />které dávají smysl.</h1><p className="projects-lead">Moderní bydlení, promyšlené lokality<br />a kvalitní architektura.</p><p>Naše rezidenční projekty vznikají s důrazem na kvalitu života, moderní standardy a dlouhodobou hodnotu. Spojujeme zkušenosti, spolehlivé partnery a individuální přístup, abychom vytvářeli místa, kde se dobře žije.</p><a className="projects-button" href="#aktualni-projekty">Prozkoumat projekty<ArrowRight size={20} /></a></div>
   <div className="projects-benefits"><div><House /><h2>Kvalitní<br />architektura</h2><p>Moderní a funkční domy s důrazem na detail.</p></div><div><TreePine /><h2>Klidné lokality<br />a zeleň</h2><p>Promyšlená místa pro pohodový život.</p></div><div><UsersRound /><h2>Individuální<br />přístup</h2><p>Nasloucháme vašim potřebám a hledáme nejlepší řešení.</p></div></div>
  </section><ProjectCarousel />
 </main>;
}
