'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type NavLabel =
  | 'Nabídka'
  | 'Naše služby'
  | 'O nás'
  | 'Náš tým'
  | 'Financování'
  | 'Projekty'
  | 'Kontakt';

type SiteHeaderProps = {
  activeItem?: NavLabel;
  currentPath?: 'home' | 'subpage';
};

const navItems: Array<{ label: NavLabel; href: string }> = [
  { label: 'Nabídka', href: '/nabidka' },
  { label: 'Naše služby', href: '/nase-sluzby' },
  { label: 'O nás', href: '/o-nas' },
  { label: 'Náš tým', href: '/nas-tym' },
  { label: 'Financování', href: '/financovani' },
  { label: 'Projekty', href: '/projekty' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function SiteHeader({
  activeItem,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Realitní Agentura">
        <img src="/images/hero/navbar-logo.png" alt="Realitní Agentura" />
      </a>

      <nav id="site-navigation" className={`site-nav${menuOpen ? " site-nav--open" : ""}`} aria-label="Hlavní navigace">
        {navItems.map((item) => (
          <a
            href={item.href}
            onClick={() => setMenuOpen(false)}
            key={item.label}
            aria-current={activeItem === item.label ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        className="header-cta"
        href="/nabidka"
      >
        Nemovitosti
      </a>

      <button className="menu-button" type="button" aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>
    </header>
  );
}
