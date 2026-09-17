'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, MapPin, Coins, FileCheck2, ChartColumnIncreasing, Camera, UsersRound, FileText } from 'lucide-react';

const services = [
  {
    label: 'Prodej nemovitosti',
    title: 'Prodáme vaši nemovitost za',
    accent: 'nejlepší cenu.',
    description: 'Zajistíme kompletní servis pro prodej vaší nemovitosti od profesionální prezentace až po právní zajištění a předání kupujícímu.',
    action: 'Chci prodat nemovitost',
    image: '/images/services/living-room.png',
    features: [
              {
                Icon: ChartColumnIncreasing,
                title: 'Profesionální ocenění',
                text: 'Stanovíme reálnou tržní cenu na základě aktuálních dat a zkušeností.',
              },
              {
                Icon: Camera,
                title: 'Moderní prezentace',
                text: 'Profesionální fotografie, video a 3D prohlídky, které zaujmou.',
              },
              {
                Icon: UsersRound,
                title: 'Aktivní marketing',
                text: 'Vaši nemovitost prezentujeme na největších realitních portálech i v naší síti zájemců.',
              },
              {
                Icon: FileText,
                title: 'Právní servis',
                text: 'Smlouvy, advokátní úschova i bezpečný převod jsou pro nás samozřejmostí.',
              },
            ],
  },
  {
    label: 'Koupě nemovitosti',
    title: 'Najdeme pro vás domov',
    accent: 'bez zbytečného rizika.',
    description: 'Pomůžeme vám s výběrem vhodné nemovitosti, prověříme lokalitu i technický stav, zkontrolujeme smlouvy a provedeme vás celým procesem až po bezpečné předání.',
    action: 'Chci koupit nemovitost',
    image: '/images/services/buy-house.png',
    features: [
      { Icon: Home, title: 'Vyhledání nemovitosti', text: 'Najdeme vhodné nabídky podle vašich požadavků a rozpočtu.' },
      { Icon: MapPin, title: 'Analýza lokality', text: 'Prověříme dostupnost, občanskou vybavenost a potenciál lokality.' },
      { Icon: Coins, title: 'Financování a hypotéka', text: 'Pomůžeme s rozpočtem, hypotékou i správným nastavením financování.' },
      { Icon: FileCheck2, title: 'Právní kontrola a předání', text: 'Zkontrolujeme smlouvy, pomůžeme s přepisy a zajistíme bezpečné předání.' },
    ],
  },
  {
    label: 'Pronájem nemovitosti',
    title: 'Pronajmeme vaši nemovitost bezpečně',
    accent: 'bez starostí.',
    description: 'Zajistíme kompletní servis pronájmu od stanovení ceny a prezentace až po výběr nájemce, smlouvy a předání bytu či domu.',
    action: 'Chci pronajmout nemovitost',
    image: '/images/services/rental-viewing.png',
    features: [
      { Icon: ChartColumnIncreasing, title: 'Stanovení nájemného', text: 'Pomůžeme určit správnou cenu pronájmu podle lokality, stavu a aktuální situace na trhu.' },
      { Icon: Camera, title: 'Příprava nabídky a prezentace', text: 'Vytvoříme atraktivní inzerci včetně fotografií a prezentace nemovitosti.' },
      { Icon: UsersRound, title: 'Výběr a prověření nájemce', text: 'Zajistíme komunikaci, prohlídky a pečlivý výběr spolehlivého nájemce.' },
      { Icon: FileText, title: 'Smlouvy a předání', text: 'Připravíme dokumentaci, předávací protokol i přepisy energií a služeb.' },
    ],
  },
];

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const service = services[activeIndex];
  const changeSlide = (direction: number) => setActiveIndex(current => (current + direction + services.length) % services.length);
  return (
    <section className="service-detail" id="prodej-nemovitosti" aria-label="Naše služby" aria-roledescription="karusel">
      <div className={`service-detail__shell${activeIndex > 0 ? ' service-detail__shell--purchase' : ''}`}>
        <div className="service-detail__intro service-detail__enter" key={`intro-${activeIndex}`}>
          <p className="service-detail__kicker"><span>{String(activeIndex + 1).padStart(2, '0')}</span><i aria-hidden="true" />{service.label}</p>
          <h2>{service.title} <span>{activeIndex === 2 && <b className="service-detail__conjunction">a </b>}{service.accent}</span></h2>
          <p>{service.description}</p>
          <a className="service-detail__button" href="/kontakt">{service.action}<ArrowRight size={22} aria-hidden="true" /></a>
        </div>
        <div className="service-detail__features service-detail__enter" key={`features-${activeIndex}`}>
          {service.features.map(item => (
            <article className="service-feature" key={item.title}>
              <span><item.Icon size={36} strokeWidth={1.8} aria-hidden="true" /></span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
        <div className={`service-detail__image service-detail__enter${activeIndex === 2 ? ' service-detail__image--masked service-detail__image--rental' : activeIndex === 1 ? ' service-detail__image--masked' : ''}`} key={`image-${activeIndex}`} aria-hidden="true">
          <img src={service.image} alt="" />
        </div>
        <div className="service-detail__pager" aria-label="Navigace služeb">
          <button type="button" aria-label="Předchozí služba" onClick={() => changeSlide(-1)}><ArrowLeft size={19} aria-hidden="true" /></button>
          <strong aria-live="polite" aria-atomic="true"><span className="sr-only">{service.label}, </span>{activeIndex + 1} / {services.length}</strong>
          <button type="button" aria-label="Další služba" onClick={() => changeSlide(1)}><ArrowRight size={21} aria-hidden="true" /></button>
        </div>
        <img className="service-detail__note" src="/images/services/note-detail.png" alt="" aria-hidden="true" />
      </div>
    </section>
  );
}
