'use client';

import { ArrowLeft, Menu } from 'lucide-react';
import PropertyListings from '../PropertyListings';

const navItems = [
  { label: 'Úvod', href: '/' },
  { label: 'Služby', href: '/#sluzby' },
  { label: 'O nás', href: '/#o-nas' },
  { label: 'Tým', href: '/#nas-tym' },
  { label: 'Reference', href: '/#reference' },
  { label: 'Kontakt', href: '/#kontakt' },
];

export default function OfferPage() {
  return (
    <main className="site-shell offers-page">
      <header className="site-header site-header--offers">
        <a className="brand" href="/" aria-label="Realitní Agentura">
          <img src="/images/hero/navbar-logo.png" alt="Realitní Agentura" />
        </a>

        <nav className="site-nav" aria-label="Hlavní navigace">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="/">
          <ArrowLeft size={17} aria-hidden="true" />
          Zpět na úvod
        </a>

        <button className="menu-button" type="button" aria-label="Otevřít menu">
          <Menu size={23} />
        </button>
      </header>

      <PropertyListings mode="full" />
    </main>
  );
}
