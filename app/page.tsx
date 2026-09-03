"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Handshake,
  Home,
  Mail,
  Menu,
  Phone,
  TrendingUp,
  UsersRound,
} from "lucide-react";

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
    cardAlign?: "left" | "center" | "right";
  };
};

const agents: Agent[] = [
  {
    id: "jaroslav-bejdak",
    name: "Jaroslav Bejdák",
    role: "realitní makléř",
    phone: "+420 602 526 500",
    email: "jaroslav.bejdak@realitni-agentura.cz",
    image: "/images/team/jaroslav-bejdak.png",
    url: "/makleri/jaroslav-bejdak",
    position: {
      left: "40%",
      bottom: "-4.8%",
      width: "18.6%",
      zIndex: 13,
      cardAlign: "left",
    },
  },
  {
    id: "iva-dokoupilova",
    name: "Iva Dokoupilová",
    role: "realitní makléřka",
    phone: "+420 724 035 099",
    email: "iva.dokoupilova@realitni-agentura.cz",
    image: "/images/team/iva-dokoupilova.png",
    url: "/makleri/iva-dokoupilova",
    position: {
      left: "48%",
      bottom: "-4.4%",
      width: "17.2%",
      zIndex: 12,
      cardAlign: "center",
    },
  },
  {
    id: "leona-kocikova",
    name: "Leona Kočíková",
    role: "realitní makléřka",
    phone: "+420 731 594 867",
    email: "kocikova@egpreality.cz",
    image: "/images/team/leona-kocikova.png",
    url: "/makleri/leona-kocikova",
    position: {
      left: "56%",
      bottom: "-6.3%",
      width: "17.9%",
      zIndex: 14,
      cardAlign: "center",
    },
  },
  {
    id: "radek-mezl",
    name: "Bc. Radek Mézl",
    role: "majitel realitní kanceláře",
    phone: "+420 734 760 779",
    email: "radek.mezl@realitni-agentura.cz",
    image: "/images/team/radek-mezl.png",
    url: "/makleri/radek-mezl",
    position: {
      left: "64%",
      bottom: "-4.2%",
      width: "18.5%",
      zIndex: 17,
      cardAlign: "center",
    },
  },
  {
    id: "tomas-prochazka",
    name: "Tomáš Procházka",
    role: "realitní makléř",
    phone: "+420 774 650 001",
    email: "prochazkova@egpreality.cz",
    image: "/images/team/tomas-prochazka.png",
    url: "/makleri/tomas-prochazka",
    position: {
      left: "72%",
      bottom: "-5.5%",
      width: "16.2%",
      zIndex: 15,
      cardAlign: "center",
    },
  },
  {
    id: "eva-prochazkova",
    name: "Eva Procházková",
    role: "realitní makléřka",
    phone: "+420 774 650 001",
    email: "prochazkova@egpreality.cz",
    image: "/images/team/eva-prochazkova.png",
    url: "/makleri/eva-prochazkova",
    position: {
      left: "80%",
      bottom: "-6.8%",
      width: "17.6%",
      zIndex: 16,
      cardAlign: "right",
    },
  },
  {
    id: "anna-uricarova",
    name: "Anna Uřičářová",
    role: "realitní makléřka",
    phone: "+420 737 253 966",
    email: "uricarova.anna@seznam.cz",
    image: "/images/team/anna-uricarova.png",
    url: "/makleri/anna-uricarova",
    position: {
      left: "88%",
      bottom: "-7%",
      width: "18.3%",
      zIndex: 18,
      cardAlign: "right",
    },
  },
];

const navItems = [
  "Nabídka",
  "Naše služby",
  "O nás",
  "Náš tým",
  "Reference",
  "Financování",
  "Projekty",
  "Kontakt",
];

const stats = [
  {
    icon: Home,
    value: "250+",
    label: "Prodaných nemovitostí za poslední rok",
  },
  {
    icon: UsersRound,
    value: "7",
    label: "Specialistů ve vašem týmu",
  },
  {
    icon: Handshake,
    value: "98 %",
    label: "Spokojených klientů doporučuje dál",
  },
  {
    icon: TrendingUp,
    value: "15+ let",
    label: "Zkušeností na trhu s nemovitostmi",
  },
];

const toHash = (value: string) =>
  `#${value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "-")}`;

export default function HomePage() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const lastPointerType = useRef<string>("mouse");

  useEffect(() => {
    const clearActiveAgent = (event: PointerEvent) => {
      const target = event.target as Element | null;

      if (!target?.closest(".realitni-team")) {
        setActiveAgent(null);
      }
    };

    document.addEventListener("pointerdown", clearActiveAgent);

    return () => {
      document.removeEventListener("pointerdown", clearActiveAgent);
    };
  }, []);

  const activeName = useMemo(
    () => agents.find((agent) => agent.id === activeAgent)?.name,
    [activeAgent],
  );

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Realitní Agentura">
          <span className="brand__mark" aria-hidden="true">
            <Home size={26} strokeWidth={2.4} />
          </span>
          <span className="brand__text">
            <span>Realitní</span>
            <span>Agentura</span>
          </span>
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
          <div className="hero__cityline" />
        </div>

        <div className="hero__content">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              Vaše jistota na realitním trhu
            </p>
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
            className={`realitni-team ${activeAgent ? "team--has-active" : ""}`}
            aria-label={`Tým realitních makléřů${activeName ? `, aktivní ${activeName}` : ""}`}
          >
            {agents.map((agent) => {
              const isActive = activeAgent === agent.id;
              const isInactive = activeAgent !== null && !isActive;

              return (
                <article
                  key={agent.id}
                  className={`agent ${isActive ? "agent--active" : ""} ${
                    isInactive ? "agent--inactive" : ""
                  }`}
                  style={
                    {
                      "--agent-left": agent.position.left,
                      "--agent-bottom": agent.position.bottom,
                      "--agent-width": agent.position.width,
                      "--agent-z": agent.position.zIndex,
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

                    if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
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
                        lastPointerType.current === "touch" ||
                        lastPointerType.current === "pen";

                      if (isTouch && activeAgent !== agent.id) {
                        event.preventDefault();
                        setActiveAgent(agent.id);
                        event.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "center",
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
                    className={`agent__card agent__card--${agent.position.cardAlign ?? "center"}`}
                    id={`${agent.id}-card`}
                  >
                    <p className="agent__role">{agent.role}</p>
                    <h2>{agent.name}</h2>
                    <a
                      className="agent__contact"
                      href={`tel:${agent.phone.replaceAll(" ", "")}`}
                    >
                      <Phone size={15} aria-hidden="true" />
                      {agent.phone}
                    </a>
                    <a className="agent__contact" href={`mailto:${agent.email}`}>
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
    </main>
  );
}
