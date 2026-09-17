import type { Metadata } from 'next';
import SiteHeader from '../SiteHeader';

export const metadata: Metadata = { title: 'Kontakt | Realitní Agentura' };

export default function Page() {
  return (
    <main className="site-shell placeholder-page">
      <SiteHeader activeItem="Kontakt" />
      <section className="placeholder-page__content">
        <h1>Kontakt</h1>
      </section>
    </main>
  );
}
