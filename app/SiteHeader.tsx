'use client';

import { useEffect, useRef, useState } from 'react';
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
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuRef.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false); };
    const resize = () => { if (window.innerWidth > 950) setMenuOpen(false); };
    document.addEventListener('keydown', escape); document.addEventListener('pointerdown', outside); window.addEventListener('resize', resize);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); window.removeEventListener('resize', resize); };
  }, [menuOpen]);
  return (
    <header ref={headerRef} className="site-header">
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

      <button ref={menuRef} className="menu-button" type="button" aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>
    </header>
  );
}
