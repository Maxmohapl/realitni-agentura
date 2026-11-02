import OptimizedImage from '@/components/OptimizedImage';
import type { Metadata } from 'next';
import { ArrowRight, KeyRound, Camera, ImageIcon, SquarePlay, Drone, ChartColumnIncreasing, MapPin, FileText } from 'lucide-react';
import SiteHeader from '../SiteHeader';
import ServiceCarousel from './ServiceCarousel';
import JourneyIcon from './JourneyIcon';
import AgencyStats from '../AgencyStats';

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
            <a className="services-hero__button" href="/kontakt?sluzba=Nez%C3%A1vazn%C3%A1%20konzultace">
              Nezávazná konzultace
              <ArrowRight size={22} aria-hidden="true" />
            </a>

            <OptimizedImage
              className="services-hero__note"
              src="/images/services/note-hero.webp"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="services-hero__visual" aria-hidden="true">
            <OptimizedImage
              className="services-hero__image"
              src="/images/services/hero-combined.webp"
              alt=""
            />
            <div className="services-hero__card">
              <span>
                <KeyRound strokeWidth={1.8} aria-hidden="true" />
              </span>
              <strong>Od prvního rozhovoru až po předání klíčů.</strong>
              <a href="#prodej-nemovitosti" aria-label="Přejít na přehled služeb">
                <ArrowRight size={24} aria-hidden="true" />
              </a>
            </div>
          </div>

          <AgencyStats compact />
        </div>
      </section>

      <ServiceCarousel />
      <section className="presentation-showcase" aria-labelledby="presentation-title">
        <div className="presentation-showcase__shell">
          <div className="presentation-showcase__copy">
            <h2 id="presentation-title">Prezentace, která<br /><span>zvyšuje hodnotu.</span></h2>
            <p className="presentation-showcase__lead">Kvalitní fotografie a působivá prezentace dokážou ukázat vaši nemovitost v tom nejlepším světle a přilákat více zájemců.</p>
            <div className="presentation-showcase__features">
              {[
                { Icon: Camera, title: 'Profesionální focení', text: 'Využíváme špičkovou techniku, širokoúhlé záběry a úpravy, které zvýrazní přednosti vaší nemovitosti.' },
                { Icon: ImageIcon, title: 'Atraktivní inzerce', text: 'Připravíme poutavý inzerát s promyšleným textem, půdorysy, videem a správným cílením.' },
              ].map(({ Icon, title, text }) => <article className="presentation-showcase__feature" key={title}><span><Icon size={32} strokeWidth={1.8} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}
            </div>
            <div className="presentation-showcase__video">
              <p className="presentation-showcase__eyebrow">DRON A VIDEO</p>
              <h3>Z nové perspektivy.</h3>
              <p className="presentation-showcase__lead">Záběry z výšky i prohlídka interiéru přiblíží nemovitost, její okolí a atmosféru.</p>
              <div className="presentation-showcase__features">
                {[
                  { Icon: Drone, title: 'Záběry z dronu', text: 'Ukážeme nemovitost z výšky a její okolí. Letecké záběry odhalí polohu, výhledy i dispozici pozemku.' },
                  { Icon: SquarePlay, title: 'Videoprohlídka nemovitosti', text: 'Propojíme záběry z dronu s prohlídkou interiéru do profesionálního promo videa, které zaujme na první pohled.' },
                ].map(({ Icon, title, text }) => <article className="presentation-showcase__feature" key={title}><span><Icon size={32} strokeWidth={1.8} aria-hidden="true" /></span><div><h4>{title}</h4><p>{text}</p></div></article>)}
              </div>
            </div>
            <a className="presentation-showcase__button" href="/kontakt?sluzba=Prezentace%20nemovitosti">Chci profesionální prezentaci</a>
          </div>
          <div className="presentation-showcase__visual presentation-showcase__visual--supplied" aria-label="Fotografie interiérů a exteriéru nemovitostí">
            <OptimizedImage className="presentation-showcase__supplied" src="/images/presentation/property-presentation-supplied.webp" alt="Obývací pokoj s jídelnou, exteriér domů u vinice a detaily interiérů" loading="lazy" />
            <OptimizedImage className="presentation-showcase__drone" src="/images/presentation/camera-drone.webp" alt="" aria-hidden="true" loading="lazy" />
          </div>
        </div>
      </section>
      <section className="property-pricing" aria-labelledby="pricing-title">
        <div className="property-pricing__shell">
          <h2 id="pricing-title">Správné nacenění, které <span>rozhoduje.</span></h2>
          <div className="property-pricing__layout">
            <div className="property-pricing__visual">
              <OptimizedImage src="/images/services/pricing-house-corrected.png" width={1536} height={1024} alt="Dům s vyznačenými prvky ovlivňujícími cenu: atraktivní lokalita, moderní technologie, vyhřívaná podlaha a garáž nebo parkování." loading="lazy" />
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
      <section className="legal-services legal-services--journey" id="jak-to-probiha" aria-labelledby="legal-title">
        <div className="legal-services__shell">
          <div className="journey-heading">
            <div className="legal-services__intro">
              <p className="journey-eyebrow">Jak to probíhá</p>
              <h2 id="legal-title">Postaráme se<br />o veškeré <span>formality.</span></h2>
              <p>Od prvního setkání po předání klíčů. Jasný plán, vyřízené papírování a jistota v každém kroku.</p>
            </div>
            <OptimizedImage className="journey-house" src="/images/services/journey-house-terrace.png" width={1774} height={887} alt="Rodinný dům se zahradou a terasou" loading="lazy" />
          </div>
          <div className="journey-steps">
            <svg className="journey-road" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
              <path d="M90 60 H1325 C1455 60 1455 205 1325 205 H100 M100 205 C0 205 0 350 100 350 H1350" fill="none" stroke="#d2dfed" strokeWidth="32" />
              <path d="M90 60 H1325 C1455 60 1455 205 1325 205 H100 M100 205 C0 205 0 350 100 350 H1350" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 10" />
            </svg>
            <ol aria-label="Postup spolupráce">
              {[
                { title: 'Vaše představy', text: 'Ujasníme si cíle, potřeby a termín.' },
                { title: 'Reálná cena', text: 'Oceníme podle trhu a lokality.' },
                { title: 'Plán prodeje', text: 'Zvolíme cenu, postup a cílovou skupinu.' },
                { title: 'První dojem', text: 'Fotografie, video a 3D prohlídka.' },
                { title: 'Nabídka na očích', text: 'Realitní portály, sociální sítě i naše databáze.' },
                { title: 'Správný zájemce', text: 'Prohlídky a prověření zájemců.' },
                { title: 'Dohoda a rezervace', text: 'Podmínky obchodu a rezervační smlouva.' },
                { title: 'Smlouvy a úschova', text: 'Právní kontrola a bezpečí vašich peněz.' },
                { title: 'Převod vlastnictví', text: 'Katastr a komunikace s úřady.' },
                { title: 'Předání klíčů', text: 'Protokol, energie a vše připravené.' },
              ].map(({ title, text }, index) => (
                <li className="journey-step" key={title}>
                  <span className="journey-step__number">{index + 1}</span>
                  <span className="journey-step__icon"><JourneyIcon step={index} /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="legal-services__finance" id="financovani-spoluprace">
            <span className="legal-services__icon"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13.744 17.736a6 6 0 1 1-7.48-7.48" />
              <circle cx="16" cy="8" r="6" />
              <g strokeWidth="1.1">
                <path d="M17.5 6h-2.2a1 1 0 0 0 0 2h1.4a1 1 0 0 1 0 2h-2.2M16 5v6" />
                <g transform="rotate(-30 8 16)"><path d="M9.5 14H7.3a1 1 0 0 0 0 2h1.4a1 1 0 0 1 0 2H6.5M8 13v6" /></g>
              </g>
            </svg></span>
            <div><h3>Financování na míru.</h3><p>S ověřenými partnery najdeme hypotéku nebo jiné financování podle vašich potřeb.</p></div>
            <a href="/financovani"><span>Více o financování</span><i><ArrowRight size={26} aria-hidden="true" /></i></a>
          </div>
        </div>
      </section>
    </main>
  );
}
