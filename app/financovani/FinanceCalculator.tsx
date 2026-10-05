'use client';
import OptimizedImage from '@/components/OptimizedImage';

import GpfCalculator from './GpfCalculator';
import { ChartColumnIncreasing, UsersRound, ShieldCheck } from 'lucide-react';
import SiteHeader from '../SiteHeader';


export default function FinanceCalculator() {

  return (
    <main className="site-shell finance-page">
      <SiteHeader activeItem="Financování" />
      <section className="finance-hero" aria-labelledby="finance-title">
        <div className="finance-copy">
          <p className="finance-eyebrow">Financování</p>
          <h1 id="finance-title">Spočítejte si{' '}<br />financování{' '}<br /><span>jednoduše</span> a přehledně.</h1>
          <p className="finance-lead">Najděte si ideální řešení pro koupi vašeho nového domova. Porovnejte orientační nabídky hypoték z kalkulačky Gepard Finance.</p>
          <div className="finance-benefits">
            {[
              { Icon: ChartColumnIncreasing, title: 'Rychlý přehled', text: 'Výsledek během několika vteřin.' },
              { Icon: UsersRound, title: 'Odborné poradenství', text: 'Pomůžeme vám vybrat nejlepší řešení.' },
              { Icon: ShieldCheck, title: 'Bez závazků', text: 'Nezávazná konzultace a srovnání nabídek.' },
            ].map(({ Icon, title, text }) => <div key={title}><span><Icon size={28} strokeWidth={1.8} aria-hidden="true" /></span><div><h2>{title}</h2><p>{text}</p></div></div>)}
          </div>
          <div className="finance-photo"><OptimizedImage src="/images/services/finance-reference.webp" alt="Moderní dům s terasou při západu slunce" /></div>
        </div>
        <div className="finance-workspace"><GpfCalculator /></div>
      </section>
    </main>
  );
}

