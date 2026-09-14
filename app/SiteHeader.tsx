import { Menu } from 'lucide-react';

type NavLabel =
  | 'Nabídka'
  | 'Naše služby'
  | 'O nás'
  | 'Náš tým'
  | 'Reference'
  | 'Financování'
  | 'Projekty'
  | 'Kontakt';

type SiteHeaderProps = {
  activeItem?: NavLabel;
  currentPath?: 'home' | 'subpage';
};

const navItems: Array<{ label: NavLabel; hash: string; pageHref?: string }> = [
  { label: 'Nabídka', hash: '#nabidka', pageHref: '/nabidka' },
  { label: 'Naše služby', hash: '#sluzby', pageHref: '/nase-sluzby' },
  { label: 'O nás', hash: '#o-nas' },
  { label: 'Náš tým', hash: '#nas-tym' },
  { label: 'Reference', hash: '#reference' },
  { label: 'Financování', hash: '#financovani' },
  { label: 'Projekty', hash: '#projekty' },
  { label: 'Kontakt', hash: '#kontakt' },
];

const getHref = (
  item: (typeof navItems)[number],
  currentPath: SiteHeaderProps['currentPath'],
) => {
  if (item.pageHref) {
    return item.pageHref;
  }

  return currentPath === 'home' ? item.hash : `/${item.hash}`;
};

export default function SiteHeader({
  activeItem,
  currentPath = 'home',
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Realitní Agentura">
        <img src="/images/hero/navbar-logo.png" alt="Realitní Agentura" />
      </a>

      <nav className="site-nav" aria-label="Hlavní navigace">
        {navItems.map((item) => (
          <a
            href={getHref(item, currentPath)}
            key={item.label}
            aria-current={activeItem === item.label ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        className="header-cta"
        href={currentPath === 'home' ? '#nabidka' : '/nabidka'}
      >
        Nemovitosti
      </a>

      <button className="menu-button" type="button" aria-label="Otevřít menu">
        <Menu size={23} />
      </button>
    </header>
  );
}
