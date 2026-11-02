'use client';
import OptimizedImage from '@/components/OptimizedImage';

import { useEffect, useRef, useState } from 'react';
import { Clock3, ArrowLeft, ArrowRight, Play, Pause, Home, MapPin, Coins, FileCheck2, ChartColumnIncreasing, Camera, UsersRound, FileText } from 'lucide-react';

const services = [
  {
    label: 'Prodej nemovitosti',
    title: 'Prodáme vaši nemovitost za',
    accent: 'nejlepší cenu.',
    description: 'Zajistíme kompletní servis pro prodej vaší nemovitosti od profesionální prezentace až po právní zajištění a předání kupujícímu.',
    action: 'Chci prodat nemovitost',
    image: '/images/services/sale-supplied.png',
    features: [
              {
                Icon: ChartColumnIncreasing,
                title: 'Profesionální ocenění',
                text: 'Ocenění stanovujeme na základě skutečných prodejních cen srovnatelných nemovitostí na trhu.',
              },
              {
                Icon: Camera,
                title: 'Moderní prezentace',
                text: 'Profesionální fotografie, video a 3D prohlídky.',
              },
              {
                Icon: UsersRound,
                title: 'Proaktivní marketing',
                text: 'Využíváme největší realitní portály a sociální sítě. Nabídku předáváme také klientům z naší databáze.',
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
    image: '/images/services/purchase-supplied.png',
    features: [
      { Icon: Home, title: 'Vyhledání nemovitosti', text: 'Najdeme vhodné nabídky podle vašich požadavků a rozpočtu.' },
      { Icon: MapPin, title: 'Analýza lokality', text: 'Prověříme dostupnost, občanskou vybavenost a potenciál lokality.' },
      { Icon: Coins, title: 'Financování a hypotéka', text: 'Pomůžeme s rozpočtem, hypotékou i správným nastavením financování.' },
      { Icon: FileCheck2, title: 'Právní kontrola a předání', text: 'Zkontrolujeme smlouvy, pomůžeme s přepisy a zajistíme bezpečné předání.' },
    ],
  },
  {
    label: 'Pronájem a správa nemovitosti',
    title: 'Pronajmeme vaši nemovitost bezpečně',
    accent: 'bez starostí.',
    description: 'Zařídíme pronájem od nacenění po předání klíčů i následnou správu nemovitosti.',
    action: 'Chci pronajmout nemovitost',
    image: '/images/services/rental-supplied.png',
    features: [
      { Icon: ChartColumnIncreasing, title: 'Stanovení nájemného', text: '' },
      { Icon: Camera, title: 'Příprava nabídky a prezentace', text: '' },
      { Icon: UsersRound, title: 'Výběr a prověření nájemce v registru', text: '' },
      { Icon: FileText, title: 'Smlouvy a předání', text: '' },
      { Icon: Home, title: 'Správa nemovitosti', text: '' },
    ],
  },
  {
    label: 'Investice do nemovitostí',
    title: 'Investujte',
    accent: 'tam, kde ostatní končí.',
    description: 'Hledáme nemovitosti s reálným potenciálem a zaměřujeme se na lokality, které mají prostor pro dlouhodobý růst.',
    action: 'Prozkoumat možnosti',
    image: '/images/services/investment-city-sunset.png',
    features: [],
  },
];

export default function ServiceCarousel() {
  const swipeStart = useRef<{x:number;y:number}|null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) setPaused(true);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || !visible) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveIndex(current => (current + 1) % services.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [paused, visible, activeIndex]);
  useEffect(()=>{
    const sync=()=>{const key=new URLSearchParams(window.location.search).get('sluzba');setActiveIndex(key==='koupe'?1:key==='pronajem'?2:key==='investice'?3:0);};
    sync();window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync);
  },[]);
  const service = services[activeIndex];
  const changeSlide = (direction: number) => { setPaused(true); setActiveIndex(current => (current + direction + services.length) % services.length); };
  return (
    <section ref={sectionRef} className="service-detail service-detail--editorial" id="prodej-nemovitosti" aria-label="Naše služby" aria-roledescription="karusel" onPointerDown={event=>{if(event.pointerType==='touch')swipeStart.current={x:event.clientX,y:event.clientY};}} onPointerCancel={()=>{swipeStart.current=null;}} onPointerUp={event=>{const start=swipeStart.current;swipeStart.current=null;if(!start)return;const dx=event.clientX-start.x;const dy=event.clientY-start.y;if(Math.abs(dx)>65 && Math.abs(dx)>Math.abs(dy)*1.5)changeSlide(dx<0?1:-1);}}>
      <div className={`service-detail__shell${activeIndex === 3 ? ' service-detail__shell--investment' : activeIndex > 0 ? ' service-detail__shell--purchase' : ''}`}>
        {activeIndex === 3 ? (<>
          <div className="investment-services__copy">
            <p className="service-detail__kicker"><span>04</span><i aria-hidden="true" />Investice do nemovitostí</p>
            <h2 id="investment-title">Investujte<br /><span>tam, kde ostatní končí.</span></h2>
            <p className="investment-services__lead">Hledáme nemovitosti s reálným potenciálem a zaměřujeme se na lokality, které mají prostor pro dlouhodobý růst.</p>
            <a className="service-detail__button" href="/kontakt?sluzba=Investice%20do%20nemovitost%C3%AD">Prozkoumat možnosti<ArrowRight size={24} aria-hidden="true" /></a>
          </div>
          <div className="investment-services__comparison">
            <OptimizedImage src="/images/services/investment-comparison-transparent.png" width={1448} height={1086} alt="Srovnání investic: dům v Olomouci za 7 milionů Kč s nájemným 22 tisíc Kč měsíčně oproti bytům v Litovli za 2,9 milionu Kč a ve Šternberku za 3,7 milionu Kč, každý s nájemným 15 tisíc Kč měsíčně." loading="lazy" />
          </div>
          <div className="investment-services__city" aria-hidden="true">
            <OptimizedImage src="/images/services/investment-city-sunset.png" width={1672} height={941} alt="" loading="lazy" />
          </div>
          <div className="investment-services__features">
            {[
              { Icon: ChartColumnIncreasing, title: 'Lokality s potenciálem', text: 'Zaměřujeme se na místa, která mají smysl i do budoucna.' },
              { Icon: Clock3, title: 'Různé typy nemovitostí', text: 'Byty, domy, pozemky i menší projekty – podle situace a cíle.' },
              { Icon: MapPin, title: 'Zvážíme diverzifikaci', text: 'Projdeme možnosti rozložení rizika napříč typy a lokalitami.' },
              { Icon: ChartColumnIncreasing, title: 'Ověříme smysl investice', text: 'Reálná data, zkušenosti a pohled do budoucna.' },
            ].map(({ Icon, title, text }) => (
              <article key={title}><span><Icon size={36} strokeWidth={1.8} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </>) : (<>
        <div className="service-detail__intro service-detail__enter" key={`intro-${activeIndex}`}>
          <p className="service-detail__kicker"><span>{String(activeIndex + 1).padStart(2, '0')}</span><i aria-hidden="true" />{service.label}</p>
          <h2>{service.title} <span>{activeIndex === 2 && <b className="service-detail__conjunction">a </b>}{service.accent}</span></h2>
          <p>{service.description}</p>
          <a className="service-detail__button" href={`/kontakt?sluzba=${encodeURIComponent(service.label)}`}>{service.action}<ArrowRight size={22} aria-hidden="true" /></a>
        </div>
        <div className="service-detail__features service-detail__enter" key={`features-${activeIndex}`}>
          {service.features.map(item => (
            <article className={`service-feature${!item.text ? ' service-feature--title-only' : ''}`} key={item.title}>
              <span><item.Icon size={36} strokeWidth={1.8} aria-hidden="true" /></span>
              <div><h3>{item.title}</h3>{item.text && <p>{item.text}</p>}</div>
            </article>
          ))}
        </div>
        <div className={`service-detail__image service-detail__enter${activeIndex === 2 ? ' service-detail__image--rental' : activeIndex === 1 ? ' service-detail__image--masked' : ''}`} key={`image-${activeIndex}`} aria-hidden="true">
          <OptimizedImage loading="lazy" src={service.image} alt="" />
        </div>
        </>)}
        <nav className="service-detail__pager" aria-label="Navigace služeb">
          <button type="button" aria-label="Předchozí služba" onClick={() => changeSlide(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
          <strong aria-live={paused ? 'polite' : 'off'} aria-atomic="true">{activeIndex + 1} / {services.length}<span className="sr-only"> · {service.label}</span></strong>
          <button type="button" aria-label="Další služba" onClick={() => changeSlide(1)}><ArrowRight size={20} aria-hidden="true" /></button>
          <button className="service-detail__autoplay" type="button" aria-label={paused ? 'Spustit automatické přepínání po 10 sekundách' : 'Pozastavit automatické přepínání'} title={paused ? 'Spustit přepínání po 10 sekundách' : 'Pozastavit přepínání'} onClick={() => setPaused(value => !value)}>{paused ? <Play size={20} aria-hidden="true" /> : <Pause size={20} aria-hidden="true" />}</button>
        </nav>
        {activeIndex !== 3 && <OptimizedImage className="service-detail__note" src="/images/services/note-detail.webp" alt="" aria-hidden="true" />}
      </div>
    </section>
  );
}
