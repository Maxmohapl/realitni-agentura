import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
                <img src="/images/services/icon-key.png" alt="" />
              </span>
              <strong>Od prvního rozhovoru až po předání klíčů.</strong>
              <button type="button" aria-label="Pokračovat">
                <ArrowRight size={24} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="services-hero__stats" aria-label="Statistiky služeb">
            <div>
              <img src="/images/services/icon-home.png" alt="" />
              <strong>250+</strong>
              <span>prodaných nemovitostí</span>
            </div>
            <div>
              <img src="/images/services/icon-people.png" alt="" />
              <strong>15+ let</strong>
              <span>zkušeností na trhu</span>
            </div>
            <div>
              <img src="/images/services/icon-star.png" alt="" />
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
                icon: '/images/services/icon-chart.png',
                title: 'Profesionální ocenění',
                text: 'Stanovíme reálnou tržní cenu na základě aktuálních dat a zkušeností.',
              },
              {
                icon: '/images/services/icon-camera.png',
                title: 'Moderní prezentace',
                text: 'Profesionální fotografie, video a 3D prohlídky, které zaujmou.',
              },
              {
                icon: '/images/services/icon-users.png',
                title: 'Aktivní marketing',
                text: 'Vaši nemovitost prezentujeme na největších realitních portálech i v naší síti zájemců.',
              },
              {
                icon: '/images/services/icon-document.png',
                title: 'Právní servis',
                text: 'Smlouvy, advokátní úschova i bezpečný převod jsou pro nás samozřejmostí.',
              },
            ].map((item) => (
              <article className="service-feature" key={item.title}>
                <span>
                  <img src={item.icon} alt="" />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="service-detail__image" aria-hidden="true">
            <img src="/images/services/living-room.png" alt="" />
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

          <img
            className="service-detail__note"
            src="/images/services/note-detail.png"
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>
    </main>
  );
}
