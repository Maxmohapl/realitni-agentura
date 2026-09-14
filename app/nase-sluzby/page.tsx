import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Camera,
  FileText,
  Home,
  KeyRound,
  Star,
  UsersRound,
} from 'lucide-react';
import SiteHeader from '../SiteHeader';

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

            <div className="services-hero__note" aria-hidden="true">
              <span>Váš domov naše starost</span>
            </div>
          </div>

          <div className="services-hero__visual" aria-hidden="true">
            <img
              className="services-hero__mark"
              src="/images/hero/team-mark.png"
              alt=""
            />
            <img
              className="services-hero__image"
              src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=86"
              alt=""
            />
            <div className="services-hero__card">
              <span>
                <KeyRound size={34} aria-hidden="true" />
              </span>
              <strong>Od prvního rozhovoru až po předání klíčů.</strong>
              <button type="button" aria-label="Pokračovat">
                <ArrowRight size={24} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="services-hero__stats" aria-label="Statistiky služeb">
            <div>
              <Home size={31} aria-hidden="true" />
              <strong>250+</strong>
              <span>prodaných nemovitostí</span>
            </div>
            <div>
              <UsersRound size={32} aria-hidden="true" />
              <strong>15+ let</strong>
              <span>zkušeností na trhu</span>
            </div>
            <div>
              <Star size={32} aria-hidden="true" />
              <strong>98 %</strong>
              <span>spokojených klientů</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="service-detail"
        id="prodej-nemovitosti"
        aria-labelledby="sale-service-title"
      >
        <div className="service-detail__shell">
          <div className="service-detail__intro">
            <p className="service-detail__kicker">
              <span>01</span>
              <i aria-hidden="true" />
              Prodej nemovitosti
            </p>
            <h2 id="sale-service-title">
              Prodáme vaši nemovitost za <span>nejlepší cenu.</span>
            </h2>
            <p>
              Zajistíme kompletní servis pro prodej vaší nemovitosti od
              profesionální prezentace až po právní zajištění a předání
              kupujícímu.
            </p>
            <a className="service-detail__button" href="/#kontakt">
              Chci prodat nemovitost
              <ArrowRight size={22} aria-hidden="true" />
            </a>
          </div>

          <div className="service-detail__features">
            {[
              {
                icon: BarChart3,
                title: 'Profesionální ocenění',
                text: 'Stanovíme reálnou tržní cenu na základě aktuálních dat a zkušeností.',
              },
              {
                icon: Camera,
                title: 'Moderní prezentace',
                text: 'Profesionální fotografie, video a 3D prohlídky, které zaujmou.',
              },
              {
                icon: UsersRound,
                title: 'Aktivní marketing',
                text: 'Vaši nemovitost prezentujeme na největších realitních portálech i v naší síti zájemců.',
              },
              {
                icon: FileText,
                title: 'Právní servis',
                text: 'Smlouvy, advokátní úschova i bezpečný převod jsou pro nás samozřejmostí.',
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article className="service-feature" key={item.title}>
                  <span>
                    <Icon size={33} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="service-detail__image" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=86"
              alt=""
            />
          </div>

          <div className="service-detail__pager" aria-label="Navigace služeb">
            <button type="button" aria-label="Předchozí služba">
              <ArrowLeft size={19} aria-hidden="true" />
            </button>
            <strong>1 / 3</strong>
            <button type="button" aria-label="Další služba">
              <ArrowRight size={21} aria-hidden="true" />
            </button>
          </div>

          <div className="service-detail__note" aria-hidden="true">
            <span>Společně k vašemu domovu</span>
          </div>
        </div>
      </section>
    </main>
  );
}
