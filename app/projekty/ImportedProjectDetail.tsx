import { ArrowLeft, ArrowRight, Check, MapPin } from 'lucide-react';
import SiteHeader from '../SiteHeader';
import type { ProjectSummary } from './projects';

export default function ImportedProjectDetail({ project }: { project: ProjectSummary }) {
  const facts = [
    ['Typ projektu', project.type],
    ['Prostředí', project.surroundings],
    ['Stav', project.status],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <main className="site-shell project-detail project-detail--compact">
      <SiteHeader activeItem="Projekty" />
      <header className="compact-project">
        <a className="project-back" href="/projekty"><ArrowLeft size={17} />Všechny projekty</a>
        <div className="compact-project__grid">
          <div className="compact-project__copy">
            <div className="projects-eyebrow">{project.eyebrow || 'Projekt'}<span /></div>
            <h1>{project.name}</h1>
            <p className="compact-project__location"><MapPin size={21} />{project.location}</p>
            <p className="compact-project__description">{project.description}</p>
            {facts.length > 0 && <dl className="compact-project__facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
            <a className="projects-button" href={`/kontakt?projekt=${encodeURIComponent(project.name)}`}>Mám zájem o projekt<ArrowRight size={20} /></a>
          </div>
          <figure className="compact-project__image">
            <img src={project.thumbnail || '/images/projects/project-1.png'} alt={`${project.name} – ${project.location}`} />
          </figure>
        </div>
      </header>
      <section className="compact-project__benefits" aria-labelledby="project-benefits-title">
        <div>
          <div className="projects-eyebrow">HLAVNÍ VÝHODY<span /></div>
          <h2 id="project-benefits-title">Proč tento projekt</h2>
        </div>
        {project.benefits?.length ? (
          <div className="compact-project__benefit-grid">{project.benefits.map(benefit => <article key={benefit}><Check aria-hidden="true" /><h3>{benefit}</h3></article>)}</div>
        ) : <p>Podrobnosti o výhodách projektu pro vás připravujeme.</p>}
      </section>
      <section className="compact-project__cta">
        <div><p>Chcete vědět více?</p><h2>Probereme s vámi možnosti tohoto projektu.</h2></div>
        <a className="projects-button" href={`/kontakt?projekt=${encodeURIComponent(project.name)}`}>Kontaktovat nás<ArrowRight size={20} /></a>
      </section>
    </main>
  );
}

