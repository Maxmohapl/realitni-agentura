'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  Handshake,
  Home,
  Mail,
  Menu,
  Phone,
  TrendingUp,
  UsersRound,
} from 'lucide-react';

type Agent = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  url: string;
  position: {
    left: string;
    bottom: string;
    width: string;
    zIndex: number;
    cardAlign?: 'left' | 'center' | 'right';
  };
};

type PropertyCategory =
  | 'Byty'
  | 'Domy'
  | 'Pozemky'
  | 'Komerční'
  | 'Ostatní'
  | 'Projekty';

type PropertyFilter = 'Vše' | PropertyCategory;

type PropertyListing = {
  id: number;
  title: string;
  location: string;
  category: PropertyCategory;
  metadata: string;
  price: string;
  badge: 'Prodej' | 'Pronájem';
  image: string;
};

const agents: Agent[] = [
  {
    id: 'jaroslav-bejdak',
    name: 'Jaroslav Bejdák',
    role: 'realitní makléř',
    phone: '+420 602 526 500',
    email: 'jaroslav.bejdak@realitni-agentura.cz',
    image: '/images/team/jaroslav-bejdak.png',
    url: '/makleri/jaroslav-bejdak',
    position: {
      left: '32%',
      bottom: '-5.5%',
      width: '18.4%',
      zIndex: 13,
      cardAlign: 'left',
    },
  },
  {
    id: 'iva-dokoupilova',
    name: 'Iva Dokoupilová',
    role: 'realitní makléřka',
    phone: '+420 724 035 099',
    email: 'iva.dokoupilova@realitni-agentura.cz',
    image: '/images/team/iva-dokoupilova.png',
    url: '/makleri/iva-dokoupilova',
    position: {
      left: '41.7%',
      bottom: '-3.5%',
      width: '18.4%',
      zIndex: 12,
      cardAlign: 'center',
    },
  },
  {
    id: 'leona-kocikova',
    name: 'Leona Kočíková',
    role: 'realitní makléřka',
    phone: '+420 731 594 867',
    email: 'kocikova@egpreality.cz',
    image: '/images/team/leona-kocikova.png',
    url: '/makleri/leona-kocikova',
    position: {
      left: '51.4%',
      bottom: '-1.5%',
      width: '18.4%',
      zIndex: 14,
      cardAlign: 'center',
    },
  },
  {
    id: 'radek-mezl',
    name: 'Bc. Radek Mézl',
    role: 'majitel realitní kanceláře',
    phone: '+420 734 760 779',
    email: 'radek.mezl@realitni-agentura.cz',
    image: '/images/team/radek-mezl.png',
    url: '/makleri/radek-mezl',
    position: {
      left: '61.1%',
      bottom: '0%',
      width: '18.4%',
      zIndex: 18,
      cardAlign: 'center',
    },
  },
  {
    id: 'tomas-prochazka',
    name: 'Tomáš Procházka',
    role: 'realitní makléř',
    phone: '+420 774 650 001',
    email: 'prochazkova@egpreality.cz',
    image: '/images/team/tomas-prochazka.png',
    url: '/makleri/tomas-prochazka',
    position: {
      left: '70.8%',
      bottom: '-1.5%',
      width: '18.4%',
      zIndex: 15,
      cardAlign: 'center',
    },
  },
  {
    id: 'eva-prochazkova',
    name: 'Eva Procházková',
    role: 'realitní makléřka',
    phone: '+420 774 650 001',
    email: 'prochazkova@egpreality.cz',
    image: '/images/team/eva-prochazkova.png',
    url: '/makleri/eva-prochazkova',
    position: {
      left: '80.5%',
      bottom: '-3.5%',
      width: '18.4%',
      zIndex: 16,
      cardAlign: 'right',
    },
  },
  {
    id: 'anna-uricarova',
    name: 'Anna Uřičářová',
    role: 'realitní makléřka',
    phone: '+420 737 253 966',
    email: 'uricarova.anna@seznam.cz',
    image: '/images/team/anna-uricarova.png',
    url: '/makleri/anna-uricarova',
    position: {
      left: '90.2%',
      bottom: '-5.5%',
      width: '18.4%',
      zIndex: 17,
      cardAlign: 'right',
    },
  },
];

const navItems = [
  'Nabídka',
  'Naše služby',
  'O nás',
  'Náš tým',
  'Reference',
  'Financování',
  'Projekty',
  'Kontakt',
];

const stats = [
  {
    icon: Home,
    value: '250+',
    label: 'Prodaných nemovitostí za poslední rok',
  },
  {
    icon: UsersRound,
    value: '7',
    label: 'Specialistů ve vašem týmu',
  },
  {
    icon: Handshake,
    value: '98 %',
    label: 'Spokojených klientů doporučuje dál',
  },
  {
    icon: TrendingUp,
    value: '15+ let',
    label: 'Zkušeností na trhu s nemovitostmi',
  },
];

const services = [
  {
    title: 'Prodej nemovitosti',
    description: 'Prodejte za správnou cenu a bez starostí.',
    icon: '/images/service-icons/minimalist_red_house_icon_with_blue_window-cropped.png',
    accent: 'red',
    href: '#prodej',
    points: [
      'Ocenění a analýza trhu',
      'Příprava nemovitosti k prodeji',
      'Profesionální prezentace',
      'Propagace online i offline',
      'Prohlídky a komunikace',
      'Právní servis a smlouvy',
      'Bezpečné předání a převody',
    ],
  },
  {
    title: 'Koupě nemovitosti',
    description: 'Najděte nemovitost bez zbytečného rizika.',
    icon: '/images/service-icons/blue_house_and_red_key_icon-cropped.png',
    accent: 'blue',
    href: '#koupe',
    points: [
      'Vyhledání nemovitosti',
      'Analýza lokality a dostupnosti',
      'Konzultace financování a hypotéky',
      'Prověření technického stavu',
      'Právní kontrola a smlouvy',
      'Přepis energií a služeb',
      'Předání nemovitosti',
    ],
  },
  {
    title: 'Pronájem nemovitosti',
    description: 'Pronajměte bezpečně a správnému člověku.',
    icon: '/images/service-icons/blue_building_and_red_user_icon-cropped.png',
    accent: 'mixed',
    href: '#pronajem',
    points: [
      'Stanovení nájemného',
      'Příprava nabídky a prezentace',
      'Vyhledání a prověření nájemce',
      'Organizace prohlídek',
      'Nájemní smlouvy a dokumentace',
      'Předávací protokol a měřidla',
      'Přepisy energií a služeb',
    ],
  },
];

const propertyPageSize = 6;

const propertyCategories: PropertyCategory[] = [
  'Byty',
  'Domy',
  'Pozemky',
  'Komerční',
  'Ostatní',
  'Projekty',
];

const propertyCategoryIcons: Record<PropertyCategory, string> = {
  Byty: '/assets/realitni/icon_filter_byty.png',
  Domy: '/assets/realitni/icon_filter_domy.png',
  Pozemky: '/assets/realitni/icon_filter_pozemky.png',
  Komerční: '/assets/realitni/icon_filter_komercni.png',
  Ostatní: '/assets/realitni/icon_filter_ostatni.png',
  Projekty: '/assets/realitni/icon_filter_projekty.png',
};

const propertyListings: PropertyListing[] = [
  {
    id: 1,
    title: 'Pronájem bytu 3+1, 94 m²',
    location: 'Ruda nad Moravou - Hrabenov',
    category: 'Byty',
    metadata: 'Byt | 94 m² | 3+1',
    price: '15 000 Kč/měsíc',
    badge: 'Pronájem',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Rodinný dům 5+1, 160 m²',
    location: 'Sudkov',
    category: 'Domy',
    metadata: 'Dům | 160 m² | 5+1',
    price: '5 490 000 Kč',
    badge: 'Prodej',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Pronájem bytu 2+kk, 48 m²',
    location: 'Lazebnická, Mohelnice',
    category: 'Byty',
    metadata: 'Byt | 48 m² | 2+kk',
    price: '11 000 Kč/měsíc',
    badge: 'Pronájem',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Byt 2+kk, 50 m²',
    location: 'Olomouc - Nové Sady',
    category: 'Byty',
    metadata: 'Byt | 50 m² | 2+kk',
    price: '4 790 000 Kč',
    badge: 'Prodej',
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    title: 'Pronájem bytu 3+kk, 70 m²',
    location: 'Olomouc - Povel',
    category: 'Byty',
    metadata: 'Byt | 70 m² | 3+kk',
    price: '18 500 Kč/měsíc',
    badge: 'Pronájem',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    title: 'Stavební pozemek 969 m²',
    location: 'Dolany u Olomouce',
    category: 'Pozemky',
    metadata: 'Pozemek | 969 m²',
    price: '3 990 000 Kč',
    badge: 'Prodej',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    title: 'Kancelářské prostory 112 m²',
    location: 'Olomouc - centrum',
    category: 'Komerční',
    metadata: 'Komerční | 112 m² | kanceláře',
    price: '29 000 Kč/měsíc',
    badge: 'Pronájem',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    title: 'Novostavba domu 4+kk',
    location: 'Velká Bystřice',
    category: 'Projekty',
    metadata: 'Projekt | 128 m² | 4+kk',
    price: 'od 7 850 000 Kč',
    badge: 'Prodej',
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 9,
    title: 'Řadový dům se zahradou',
    location: 'Litovel',
    category: 'Domy',
    metadata: 'Dům | 142 m² | 4+1',
    price: '6 290 000 Kč',
    badge: 'Prodej',
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 10,
    title: 'Garážové stání v rezidenci',
    location: 'Olomouc - Neředín',
    category: 'Ostatní',
    metadata: 'Ostatní | 18 m² | garážové stání',
    price: '590 000 Kč',
    badge: 'Prodej',
    image:
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 11,
    title: 'Pozemek pro rodinný dům',
    location: 'Bohuňovice',
    category: 'Pozemky',
    metadata: 'Pozemek | 1 184 m²',
    price: '4 650 000 Kč',
    badge: 'Prodej',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 12,
    title: 'Obchodní prostor u hlavní třídy',
    location: 'Šumperk',
    category: 'Komerční',
    metadata: 'Komerční | 86 m² | obchod',
    price: '21 500 Kč/měsíc',
    badge: 'Pronájem',
    image:
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=900&q=80',
  },
];

const toHash = (value: string) =>
  `#${value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll(' ', '-')}`;

export default function HomePage() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [activePropertyFilter, setActivePropertyFilter] =
    useState<PropertyFilter>('Vše');
  const [visiblePropertyCount, setVisiblePropertyCount] =
    useState(propertyPageSize);
  const lastPointerType = useRef<string>('mouse');

  useEffect(() => {
    const clearActiveAgent = (event: PointerEvent) => {
      const target = event.target as Element | null;

      if (!target?.closest('.realitni-team')) {
        setActiveAgent(null);
      }
    };

    document.addEventListener('pointerdown', clearActiveAgent);

    return () => {
      document.removeEventListener('pointerdown', clearActiveAgent);
    };
  }, []);

  const activeName = useMemo(
    () => agents.find((agent) => agent.id === activeAgent)?.name,
    [activeAgent],
  );

  const propertyCategoryCounts = useMemo(() => {
    return propertyCategories.reduce(
      (counts, category) => ({
        ...counts,
        [category]: propertyListings.filter(
          (property) => property.category === category,
        ).length,
      }),
      {} as Record<PropertyCategory, number>,
    );
  }, []);

  const filteredProperties = useMemo(() => {
    if (activePropertyFilter === 'Vše') {
      return propertyListings;
    }

    return propertyListings.filter(
      (property) => property.category === activePropertyFilter,
    );
  }, [activePropertyFilter]);

  const visibleProperties = filteredProperties.slice(0, visiblePropertyCount);
  const canLoadMoreProperties =
    visiblePropertyCount < filteredProperties.length;

  const selectPropertyFilter = (filter: PropertyFilter) => {
    setActivePropertyFilter(filter);
    setVisiblePropertyCount(propertyPageSize);
  };

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Realitní Agentura">
          <img src="/images/hero/navbar-logo.png" alt="Realitní Agentura" />
        </a>

        <nav className="site-nav" aria-label="Hlavní navigace">
          {navItems.map((item) => (
            <a href={toHash(item)} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#nabidka">
          Nemovitosti
        </a>

        <button className="menu-button" type="button" aria-label="Otevřít menu">
          <Menu size={23} />
        </button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__background" aria-hidden="true">
          <div className="hero__watermark">
            <img src="/images/hero/team-mark.png" alt="" />
          </div>
          <img
            className="hero__cityline"
            src="/images/hero/olomouc-skyline.png"
            alt=""
          />
        </div>

        <div className="hero__content">
          <div className="hero__copy">
            <p className="hero__eyebrow">Vaše jistota na realitním trhu</p>
            <h1 id="hero-title">
              Realitní služby, kterým můžete <span>věřit.</span>
            </h1>
            <p className="hero__lead">
              Pomáháme lidem najít nový domov, výhodně prodat nemovitost nebo
              bezpečně investovat. Profesionálně, lidsky a s výsledky.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#kontakt">
                Poptat spolupráci
              </a>
              <a className="button button--outline" href="#sluzby">
                Naše služby
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div
            className={`realitni-team ${activeAgent ? 'team--has-active' : ''}`}
            aria-label={`Tým realitních makléřů${activeName ? `, aktivní ${activeName}` : ''}`}
          >
            {agents.map((agent) => {
              const isActive = activeAgent === agent.id;
              const isInactive = activeAgent !== null && !isActive;

              return (
                <article
                  key={agent.id}
                  className={`agent ${isActive ? 'agent--active' : ''} ${
                    isInactive ? 'agent--inactive' : ''
                  }`}
                  style={
                    {
                      '--agent-left': agent.position.left,
                      '--agent-bottom': agent.position.bottom,
                      '--agent-width': agent.position.width,
                      '--agent-z': agent.position.zIndex,
                    } as React.CSSProperties
                  }
                  onPointerEnter={() => setActiveAgent(agent.id)}
                  onPointerLeave={() => setActiveAgent(null)}
                  onPointerDown={(event) => {
                    lastPointerType.current = event.pointerType;
                  }}
                  onFocus={() => setActiveAgent(agent.id)}
                  onBlur={(event) => {
                    const nextFocus = event.relatedTarget as Node | null;

                    if (
                      !nextFocus ||
                      !event.currentTarget.contains(nextFocus)
                    ) {
                      setActiveAgent(null);
                    }
                  }}
                >
                  <a
                    className="agent__link"
                    href={agent.url}
                    aria-describedby={`${agent.id}-card`}
                    onClick={(event) => {
                      const isTouch =
                        lastPointerType.current === 'touch' ||
                        lastPointerType.current === 'pen';

                      if (isTouch && activeAgent !== agent.id) {
                        event.preventDefault();
                        setActiveAgent(agent.id);
                        event.currentTarget.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                          inline: 'center',
                        });
                      }
                    }}
                  >
                    <img
                      className="agent__image"
                      src={agent.image}
                      alt={agent.name}
                      draggable="false"
                    />
                  </a>

                  <div
                    className={`agent__card agent__card--${agent.position.cardAlign ?? 'center'}`}
                    id={`${agent.id}-card`}
                  >
                    <p className="agent__role">{agent.role}</p>
                    <h2>{agent.name}</h2>
                    <a
                      className="agent__contact"
                      href={`tel:${agent.phone.replaceAll(' ', '')}`}
                    >
                      <Phone size={15} aria-hidden="true" />
                      {agent.phone}
                    </a>
                    <a
                      className="agent__contact"
                      href={`mailto:${agent.email}`}
                    >
                      <Mail size={15} aria-hidden="true" />
                      {agent.email}
                    </a>
                    <a className="agent__cta" href={agent.url}>
                      Detail makléře
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="hero-stats" aria-label="Statistiky realitní agentury">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="stat" key={stat.value}>
                <Icon
                  className="stat__icon"
                  size={34}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </aside>
      </section>

      <section
        className="services-section"
        id="sluzby"
        aria-labelledby="services-title"
      >
        <div className="services-shell">
          <h2 id="services-title">
            Od prvního rozhodnutí až po předání <span>klíčů.</span>
          </h2>
          <p className="services-intro">
            Ať prodáváte, kupujete nebo pronajímáte, provedeme vás celým
            procesem. Od správné ceny a prezentace až po smlouvy, financování a
            bezpečné předání.
          </p>

          <div className="service-grid">
            {services.map((service) => {
              return (
                <a
                  className={`service-card service-card--${service.accent}`}
                  href={service.href}
                  key={service.title}
                >
                  <div className="service-card__inner">
                    <div className="service-card__default">
                      <img
                        className="service-card__icon"
                        src={service.icon}
                        alt=""
                        aria-hidden="true"
                      />
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <span className="service-card__button" aria-hidden="true">
                        <ArrowRight size={18} />
                      </span>
                    </div>

                    <div className="service-card__hover" aria-hidden="true">
                      <div className="service-card__hover-title">
                        <img
                          className="service-card__hover-icon"
                          src={service.icon}
                          alt=""
                        />
                        <h3>{service.title}</h3>
                      </div>
                      <ul>
                        {service.points.map((point) => (
                          <li key={point}>
                            <Check size={15} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="service-card__back">
                        <ChevronLeft size={18} />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="properties-section"
        id="nabidka"
        aria-labelledby="properties-title"
      >
        <div className="properties-shell">
          <div className="properties-intro">
            <div>
              <p className="properties-eyebrow">Vybrané nemovitosti</p>
              <h2 id="properties-title">
                Vybrané nabídky <span>nemovitostí.</span>
              </h2>
              <p>
                Prohlédněte si aktuální nabídku nemovitostí, které pro vás právě
                máme. Možná mezi nimi najdete tu pravou.
              </p>
            </div>

            <a className="properties-link" href="#nabidka">
              Všechny nemovitosti
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="property-filters" aria-label="Filtrovat nemovitosti">
            {(['Vše', ...propertyCategories] as PropertyFilter[]).map(
              (filter) => {
                const isActive = activePropertyFilter === filter;
                const count =
                  filter === 'Vše'
                    ? propertyListings.length
                    : propertyCategoryCounts[filter];

                return (
                  <button
                    className={`property-filter ${isActive ? 'property-filter--active' : ''}`}
                    type="button"
                    aria-pressed={isActive}
                    key={filter}
                    onClick={() => selectPropertyFilter(filter)}
                  >
                    {filter !== 'Vše' && (
                      <img src={propertyCategoryIcons[filter]} alt="" />
                    )}
                    <span>{filter}</span>
                    <small>{count}</small>
                  </button>
                );
              },
            )}
          </div>

          <div className="properties-grid">
            {visibleProperties.map((property, index) => (
              <article
                className="property-card"
                key={`${activePropertyFilter}-${property.id}`}
                style={
                  {
                    '--property-delay': `${Math.min(index, 5) * 55}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="property-card__media">
                  <img src={property.image} alt={property.title} />
                  <span className="property-card__badge">{property.badge}</span>
                  <button
                    className="property-card__favorite"
                    type="button"
                    aria-label={`Přidat do oblíbených: ${property.title}`}
                  >
                    <img
                      src="/assets/realitni/icon_favorite_heart.png"
                      alt=""
                    />
                  </button>
                </div>

                <div className="property-card__body">
                  <h3>{property.title}</h3>
                  <p className="property-card__location">
                    <img src="/assets/realitni/icon_location_pin.png" alt="" />
                    <span>{property.location}</span>
                  </p>
                  <p className="property-card__meta">{property.metadata}</p>
                  <p className="property-card__price">{property.price}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="properties-actions">
            <p>
              Zobrazeno {visibleProperties.length} z {filteredProperties.length}{' '}
              nabídek
            </p>
            {canLoadMoreProperties && (
              <button
                className="properties-load"
                type="button"
                onClick={() =>
                  setVisiblePropertyCount((current) =>
                    Math.min(
                      current + propertyPageSize,
                      filteredProperties.length,
                    ),
                  )
                }
              >
                Načíst další nabídky
                <ArrowDown size={17} aria-hidden="true" />
              </button>
            )}
            <a
              className="properties-link properties-link--bottom"
              href="#nabidka"
            >
              Všechny nemovitosti
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <img
          className="properties-cityline"
          src="/assets/realitni/01_city_olomouc_lineart.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="properties-slogan"
          src="/assets/realitni/02_slogan_vas_domov_nase_starost.png"
          alt=""
          aria-hidden="true"
        />
      </section>
    </main>
  );
}
