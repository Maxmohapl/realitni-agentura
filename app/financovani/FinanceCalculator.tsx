'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ChartColumnIncreasing, UsersRound, ShieldCheck, Phone, Check } from 'lucide-react';
import SiteHeader from '../SiteHeader';
import { calculateFinancing, financeProducts, maximumLoan, type FinanceProduct, type Fixation } from '@/lib/finance/calculator';

const money = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 });
const productIds = Object.keys(financeProducts) as FinanceProduct[];
const fixations: Fixation[] = [1, 3, 5, 10];

export default function FinanceCalculator() {
  const [product, setProduct] = useState<FinanceProduct>('housing');
  const [price, setPrice] = useState(2_500_000);
  const [loan, setLoan] = useState(1_000_000);
  const [years, setYears] = useState(20);
  const [fixation, setFixation] = useState<Fixation>(3);
  const [insurance, setInsurance] = useState(false);
  const config = financeProducts[product];
  const loanMax = maximumLoan(product, price);
  const result = useMemo(() => calculateFinancing({ product, propertyPrice: price, loan, years, fixation, insurance }), [product, price, loan, years, fixation, insurance]);

  const setPropertyPrice = (value: number) => {
    const next = Math.min(30_000_000, Math.max(300_000, Number.isFinite(value) ? value : 300_000));
    setPrice(next);
    setLoan(current => Math.min(current, maximumLoan(product, next)));
  };
  const setLoanAmount = (value: number) => setLoan(Math.min(loanMax, Math.max(0, Number.isFinite(value) ? value : 0)));
  const changeProduct = (next: FinanceProduct) => {
    const nextConfig = financeProducts[next];
    setProduct(next);
    setLoan(current => Math.min(current, maximumLoan(next, price)));
    setYears(current => Math.min(current, nextConfig.maxYears));
  };
  const contactUrl = `/kontakt?sluzba=financovani&typ=${encodeURIComponent(config.label)}&cena=${price}&uver=${result.loan}&splatnost=${result.years}&fixace=${fixation}&sazba=${result.rate}&splatka=${Math.round(result.monthlyPayment)}&pojisteni=${insurance ? 'ano' : 'ne'}`;
  const sliderProgress = loanMax > 0 ? Math.min(100, result.loan / loanMax * 100) : 0;

  return (
    <main className="site-shell finance-page">
      <SiteHeader activeItem="Financování" />
      <section className="finance-hero" aria-labelledby="finance-title">
        <div className="finance-copy">
          <p className="finance-eyebrow">Financování</p>
          <h1 id="finance-title">Spočítejte si<br />financování<br /><span>jednoduše</span> a přehledně.</h1>
          <p className="finance-lead">Najděte si ideální řešení pro koupi vašeho nového domova. Kalkulačka ukazuje orientační anuitní splátku podle zadaných parametrů.</p>
          <div className="finance-benefits">
            {[
              { Icon: ChartColumnIncreasing, title: 'Rychlý přehled', text: 'Výsledek během několika vteřin.' },
              { Icon: UsersRound, title: 'Odborné poradenství', text: 'Pomůžeme vám vybrat nejlepší řešení.' },
              { Icon: ShieldCheck, title: 'Bez závazků', text: 'Nezávazná konzultace a srovnání nabídek.' },
            ].map(({ Icon, title, text }) => <div key={title}><span><Icon size={28} strokeWidth={1.8} aria-hidden="true" /></span><div><h2>{title}</h2><p>{text}</p></div></div>)}
          </div>
          <div className="finance-photo"><img src="/images/services/finance-reference.png" alt="Moderní dům s terasou při západu slunce" /></div>
        </div>
        <div className="finance-workspace">
          <div className="mortgage-calculator">
            <div className="mortgage-fields">
              <div className="mortgage-tabs" role="tablist" aria-label="Typ financování">
                {productIds.map((id, index) => <button type="button" role="tab" id={`mortgage-tab-${index}`} aria-selected={product === id} aria-controls="mortgage-panel" key={id} onClick={() => changeProduct(id)}>{financeProducts[id].label}</button>)}
              </div>
              <div id="mortgage-panel" role="tabpanel" aria-labelledby={`mortgage-tab-${productIds.indexOf(product)}`}>
                <div className="mortgage-amount">
                  <label htmlFor="property-price">{product === 'refinancing' ? 'Odhadní hodnota nemovitosti' : 'Cena nemovitosti'}</label>
                  <div className="mortgage-amount__row">
                    <div><input aria-label="Cena nemovitosti – posuvník" type="range" min="300000" max="30000000" step="10000" style={{ background: `linear-gradient(to right, #94d63f 0%, #94d63f ${(price - 300000) / 29700000 * 100}%, #dedede ${(price - 300000) / 29700000 * 100}%, #dedede 100%)` }} value={price} onChange={event => setPropertyPrice(Number(event.target.value))} /><div className="mortgage-range-labels"><span>300 000 Kč</span><span>30 000 000 Kč</span></div></div>
                    <div className="mortgage-number"><input id="property-price" type="number" min="300000" max="30000000" step="10000" value={price} onChange={event => setPropertyPrice(Number(event.target.value))} /><span>Kč</span></div>
                  </div>
                </div>
                <div className="mortgage-amount">
                  <label htmlFor="loan-amount">{product === 'refinancing' ? 'Zůstatek úvěru k refinancování' : 'Kolik si chcete půjčit'}</label>
                  <div className="mortgage-amount__row">
                    <div><input aria-label="Výše úvěru – posuvník" type="range" min="0" max={loanMax} step="10000" style={{ background: `linear-gradient(to right, #94d63f 0%, #94d63f ${sliderProgress}%, #dedede ${sliderProgress}%, #dedede 100%)` }} value={result.loan} onChange={event => setLoanAmount(Number(event.target.value))} /><div className="mortgage-range-labels"><span>0 Kč</span><span>{money.format(loanMax)} Kč</span></div></div>
                    <div className="mortgage-number"><input id="loan-amount" type="number" min="0" max={loanMax} step="10000" value={result.loan} onChange={event => setLoanAmount(Number(event.target.value))} /><span>Kč</span></div>
                  </div>
                  <p className="mortgage-hint">Modelový limit: {Math.round(config.maxLtv * 100)} % hodnoty nemovitosti. Vlastní zdroje: <strong>{money.format(result.ownFunds)} Kč</strong>.</p>
                </div>
                <div className="mortgage-options">
                  <label>Doba splácení<select value={result.years} onChange={event => setYears(Number(event.target.value))}>{[5,10,15,20,25,30].filter(year => year <= config.maxYears).map(year => <option key={year} value={year}>{year} let</option>)}</select></label>
                  <label>Doba fixace<select value={fixation} onChange={event => setFixation(Number(event.target.value) as Fixation)}>{fixations.map(year => <option key={year} value={year}>{year} {year === 1 ? 'rok' : year < 5 ? 'roky' : 'let'}</option>)}</select></label>
                  <fieldset><legend>Modelové pojištění splácení</legend><div>{[true,false].map(value => <label key={String(value)}><input type="radio" name="insurance" checked={insurance === value} onChange={() => setInsurance(value)} />{value ? 'Ano' : 'Ne'}</label>)}</div></fieldset>
                </div>
                <p className="mortgage-disclaimer">Orientační anuitní výpočet s modelovou sazbou podle produktu a fixace. Pojištění je odhadnuto na 0,05 % z úvěru měsíčně. Výpočet nezahrnuje poplatky; konkrétní sazbu, RPSN a podmínky stanoví banka.</p>
              </div>
            </div>
            <div className="mortgage-result">
              <h2>Vaše měsíční splátka</h2>
              <p className="mortgage-payment" aria-live="polite">{money.format(Math.round(result.monthlyPayment))}<sup>Kč</sup></p>
              <p className="mortgage-rate">modelová sazba {result.rate.toLocaleString('cs-CZ')} % p. a.</p>
              {insurance && <p className="mortgage-insurance">včetně odhadu pojištění {money.format(Math.round(result.insurancePayment))} Kč/měs.</p>}
              <div className="mortgage-summary"><span>Úvěr <strong>{money.format(result.loan)} Kč</strong></span><span>Celkem za {result.years} let <strong>{money.format(Math.round(result.totalPaid))} Kč</strong></span></div>
              <a href="https://gpf.cz/produkty-a-sluzby" target="_blank" rel="noopener noreferrer" className="mortgage-compare">POROVNAT HYPOTÉKY U GPF<ArrowRight size={28} aria-hidden="true" /></a>
              <p className="mortgage-disclaimer">Přesnou nabídku si ověřte v kalkulačce Gepard Finance. Tlačítko ji otevře v nové záložce.</p>
              <ul>{['Porovnání nabídek od více bank','Nezávazná konzultace zdarma','Pomoc s vyřízením hypotéky'].map(text => <li key={text}><Check size={16} aria-hidden="true" />{text}</li>)}</ul>
            </div>
          </div>
          <div className="finance-contact"><span><Phone size={24} strokeWidth={1.8} aria-hidden="true" /></span><div><h2>Máte dotazy?</h2><p>Ozvěte se nám, rádi vám poradíme s výběrem nejvhodnějšího financování.</p></div><a href={contactUrl}>Kontaktovat poradce<ArrowRight size={22} aria-hidden="true" /></a></div>
        </div>
      </section>
    </main>
  );
}

