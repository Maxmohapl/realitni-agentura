import type { Metadata } from 'next';
import SiteHeader from '../SiteHeader';

export const metadata: Metadata = {
  title: 'Naše služby | Realitní Agentura',
  description: 'Samostatná stránka služeb realitní agentury.',
};

export default function ServicesPage() {
  return (
    <main className="site-shell">
      <SiteHeader activeItem="Naše služby" currentPath="subpage" />

      <section className="services-page" aria-labelledby="services-page-title">
        <div className="services-page__shell">
          <p className="services-page__eyebrow">Naše služby</p>
          <h1 id="services-page-title">Naše služby</h1>
        </div>
      </section>
    </main>
  );
}
