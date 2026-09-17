import type { Metadata } from 'next';
import { ArrowRight, KeyRound, Home, UsersRound, Star, Camera, ImageIcon, SquarePlay, TrendingUp, ChartColumnIncreasing, MapPin, FileText, ShieldCheck, PencilLine, Coins } from 'lucide-react';
import SiteHeader from '../SiteHeader';
import ServiceCarousel from './ServiceCarousel';

export const metadata: Metadata = {
  title: 'Naše služby | Realitní Agentura',
  description:
    'Kompletní servis realitní agentury od prvního rozhovoru až po předání klíčů.',
};

export default function ServicesPage() {
  return (
    <main className="site-shell services-page">
      <SiteHeader activeItem="Naše služby" currentPath="subpage" />

      <section className="services-hero" aria-labelledby="services-page-title">
        <div className="services-hero__shell">
          <div className="services-hero__copy">
            <p className="services-hero__eyebrow">Naše služby</p>
            <h1 id="services-page-title">
              Kompletní servis
              <br />v oblasti <span>realit.</span>
            </h1>
            <p className="services-hero__lead">
              Postaráme se o celý proces od prvního rozhovoru až po předání
              klíčů. Profesionálně, bezpečně a s důrazem na vaše potřeby.
            </p>
            <a className="services-hero__button" href="#prodej-nemovitosti">
              Nezávazná konzultace
              <ArrowRight size={22} aria-hidden="true" />
            </a>

            <img
              className="services-hero__note"
              src="/images/services/note-hero.png"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="services-hero__visual" aria-hidden="true">
            <img
              className="services-hero__image"
              src="/images/services/hero-combined.png"
              alt=""
            />
            <div className="services-hero__card">
              <span>
                <KeyRound strokeWidth={1.8} aria-hidden="true" />
              </span>
              <strong>Od prvního rozhovoru až po předání klíčů.</strong>
              <button type="button" aria-label="Pokračovat">
                <ArrowRight size={24} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="services-hero__stats" aria-label="Statistiky služeb">
            <div>
              <Home strokeWidth={1.8} aria-hidden="true" />
              <strong>250+</strong>
              <span>prodaných nemovitostí</span>
            </div>
            <div>
              <UsersRound strokeWidth={1.8} aria-hidden="true" />
              <strong>15+ let</strong>
              <span>zkušeností na trhu</span>
            </div>
            <div>
              <Star strokeWidth={1.8} aria-hidden="true" />
              <strong>98 %</strong>
              <span>spokojených klientů</span>
            </div>
          </div>
        </div>
      </section>

      <ServiceCarousel />
      <section className="property-presentation" aria-labelledby="presentation-title">
        <div className="property-presentation__shell">
          <div className="property-presentation__copy">
            <h2 id="presentation-title">Profesionální prezentace,<br />která <span>zvyšuje hodnotu.</span></h2>
            <p className="property-presentation__lead">Kvalitní fotografie, poutavý inzerát a promyšlená prezentace dokážou výrazně ovlivnit zájem kupujících a výslednou prodejní cenu. Vaši nemovitost představíme v tom nejlepším světle – moderně, profesionálně a na všech relevantních platformách.</p>
            <div className="property-presentation__features">
              {[
                { Icon: Camera, title: 'Profesionální focení', text: 'Využíváme špičkovou techniku, širokoúhlé záběry a úpravy, které zvýrazní přednosti vaší nemovitosti.' },
                { Icon: ImageIcon, title: 'Atraktivní inzerce', text: 'Připravíme poutavý inzerát s promyšleným textem, půdorysy, videem a správným cílením.' },
                { Icon: SquarePlay, title: 'Větší zájem, vyšší cena', text: 'Profesionální prezentace přitahuje více zájemců a může zvýšit prodejní cenu až o 5–15 %.' },
              ].map(({ Icon, title, text }) => (
                <article className="service-feature" key={title}>
                  <span><Icon size={36} strokeWidth={1.8} aria-hidden="true" /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
            <a className="service-detail__button" href="/kontakt">Chci profesionální prezentaci<ArrowRight size={22} aria-hidden="true" /></a>
          </div>
          <div className="property-presentation__visual">
            <svg width="0" height="0" aria-hidden="true"><defs><clipPath id="presentation-photo-shape" clipPathUnits="objectBoundingBox"><path d="M .47,0 C .25,0 .11,.23 .02,.53 C -.03,.69 .015,.75 .08,.75 L .29,.75 C .41,.75 .41,1 .56,1 L 1,1 L 1,.02 Z" /></clipPath></defs></svg>
            <img className="property-presentation__photo" src="/images/presentation/photographer.png" alt="Fotograf při profesionálním focení nemovitosti" />
            <div className="property-presentation__result">
              <img src="/images/presentation/living.png" alt="" />
              <div><p>3+kk, 78 m²<br />Pardubice</p><strong><TrendingUp size={22} aria-hidden="true" /> +12 %</strong><span>vyšší prodejní cena</span></div>
              <ChartColumnIncreasing className="property-presentation__chart" size={36} aria-hidden="true" />
            </div>
            <div className="property-presentation__gallery" aria-label="Ukázky fotografií nemovitosti">
              {[
                ['living', 'Obývací pokoj'],
                ['kitchen', 'Kuchyň a jídelna'],
                ['bedroom', 'Ložnice'],
                ['bathroom', 'Koupelna'],
                ['balcony', 'Balkon s výhledem'],
              ].map(([name, alt]) => (
                <a key={name} href={`/images/presentation/${name}.png`} target="_blank" rel="noreferrer" aria-label={`Zvětšit: ${alt}`}>
                  <img src={`/images/presentation/${name}.png`} alt={alt} loading="lazy" />
                </a>
              ))}
            </div>
          </div>
          <div className="property-presentation__note" aria-hidden="true">Detaily,<br />které dělají<br />rozdíl <span>⤴</span></div>
        </div>
      </section>
      <section className="property-pricing" aria-labelledby="pricing-title">
        <div className="property-pricing__shell">
          <h2 id="pricing-title">Správné nacenění, které <span>rozhoduje.</span></h2>
          <div className="property-pricing__layout">
            <div className="property-pricing__visual">
              <img src="/images/services/pricing-reference.png" alt="Makléř s klienty porovnává tržní data a cenu nemovitosti. Reálná data pro lepší rozhodnutí." loading="lazy" />
            </div>
            <div className="property-pricing__copy">
              <p className="property-pricing__lead">Správná cena nemovitosti vychází z detailní znalosti trhu, lokality, stavu nemovitosti a aktuální poptávky. Dobře nastavená cena přitahuje vážné zájemce a pomáhá maximalizovat výslednou hodnotu prodeje.</p>
              <div className="property-pricing__features">
                {[
                  { Icon: ChartColumnIncreasing, title: 'Analýza trhu', text: 'Sledujeme aktuální prodejní data, trendy a reálné ceny srovnatelných nemovitostí.' },
                  { Icon: MapPin, title: 'Znalost lokality', text: 'Zohledňujeme specifika lokality, občanskou vybavenost i budoucí rozvoj území.' },
                  { Icon: FileText, title: 'Strategie ceny', text: 'Navrhneme optimální cenovou strategii, která přiláká seriózní zájemce a zajistí nejlepší výsledek.' },
                ].map(({ Icon, title, text }) => (
                  <article className="service-feature" key={title}>
                    <span><Icon size={36} strokeWidth={1.8} aria-hidden="true" /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="legal-services" aria-labelledby="legal-title">
        <div className="legal-services__shell">
          <div className="legal-services__top">
            <div className="legal-services__intro">
              <h2 id="legal-title">Postaráme se<br />o veškeré <span>formality.</span></h2>
              <p>Od přípravy smluv až po bezpečné předání nemovitosti. Vy se nemusíte starat o žádné papírování – vše vyřídíme za vás, s důrazem na bezpečnost a právní jistotu.</p>
            </div>
            <div className="legal-services__cards">
              {[
                { Icon: FileText, title: 'Příprava smluv', text: 'Rezervační, kupní i nájemní smlouvy na míru.' },
                { Icon: ShieldCheck, title: 'Právní kontrola', text: 'Ověření dokumentů a právní stav nemovitosti.' },
                { Icon: PencilLine, title: 'Komunikace s úřady', text: 'Katastr, přepisy a veškeré úřední záležitosti.' },
                { Icon: KeyRound, title: 'Bezpečné předání', text: 'Zajistíme hladký průběh až do předání klíčů.' },
              ].map(({ Icon, title, text }) => (
                <article className="legal-services__card" key={title}>
                  <span className="legal-services__icon"><Icon size={36} strokeWidth={1.8} aria-hidden="true" /></span>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="legal-services__process">
            <ol aria-label="Postup právního servisu">
              {['Příprava dokumentů', 'Kontrola a konzultace', 'Podpis smluv', 'Předání nemovitosti'].map((step, index) => (
                <li key={step}><span>{index + 1}</span><p>{step}</p></li>
              ))}
            </ol>
          </div>
          <div className="legal-services__finance">
            <span className="legal-services__icon"><Coins size={36} strokeWidth={1.8} aria-hidden="true" /></span>
            <div><h3>Pomůžeme vám i s financováním.</h3><p>Ve spolupráci s ověřenými partnery zajistíme nejvýhodnější hypotéku nebo jiné financování přesně podle vašich potřeb.</p></div>
            <a href="/financovani"><span>Více o financování</span><i><ArrowRight size={26} aria-hidden="true" /></i></a>
          </div>
        </div>
      </section>
    </main>
  );
}
