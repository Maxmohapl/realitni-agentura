'use client';

import { useState } from 'react';
import { ArrowRight, ChartColumnIncreasing, UsersRound, ShieldCheck, Phone, Check } from 'lucide-react';
import SiteHeader from '../SiteHeader';

const money = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 });
const products = ['hypotéka na bydlení', 'americká hypotéka', 'refinancování'];

export default function FinanceCalculator() {
  const [product, setProduct] = useState(0);
  const [price, setPrice] = useState(2500000);
  const [loan, setLoan] = useState(1000000);
  const [years, setYears] = useState(20);
  const [fixation, setFixation] = useState(3);
  const [insurance, setInsurance] = useState(false);
  const rate = 4.99;
  const monthlyRate = rate / 1200;
  const payment = loan * monthlyRate / (1 - Math.pow(1 + monthlyRate, -years * 12));
  const setPropertyPrice = (value: number) => {
    const next = Math.min(30000000, Math.max(300000, Number.isFinite(value) ? value : 300000));
    setPrice(next);
    setLoan(current => Math.min(current, next));
  };
  const setLoanAmount = (value: number) => setLoan(Math.min(price, 10000000, Math.max(300000, Number.isFinite(value) ? value : 300000)));
  const contactUrl = `/kontakt?sluzba=financovani&typ=${encodeURIComponent(products[product])}&uver=${loan}&splatnost=${years}&fixace=${fixation}&pojisteni=${insurance ? 'ano' : 'ne'}`;
  return (
    <main className="site-shell finance-page">
      <SiteHeader activeItem="Financování" />
      <section className="finance-hero" aria-labelledby="finance-title">
        <div className="finance-copy">
          <p className="finance-eyebrow">Financování</p>
          <h1 id="finance-title">Spočítejte si<br />financování<br /><span>jednoduše</span> a přehledně.</h1>
          <p className="finance-lead">Najděte si ideální řešení pro koupi vašeho nového domova. Díky naší kalkulačce získáte rychlý přehled o měsíční splátce a můžete snadno porovnat možnosti financování.</p>
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
                {products.map((label, index) => <button type="button" role="tab" id={`mortgage-tab-${index}`} aria-selected={product === index} aria-controls="mortgage-panel" key={label} onClick={() => setProduct(index)}>{label}</button>)}
              </div>
              <div id="mortgage-panel" role="tabpanel" aria-labelledby={`mortgage-tab-${product}`}>
                <div className="mortgage-amount">
                  <label htmlFor="property-price">Cena nemovitosti</label>
                  <div className="mortgage-amount__row">
                    <div><input aria-label="Cena nemovitosti – posuvník" type="range" min="300000" max="30000000" step="10000" style={{ background: `linear-gradient(to right, #94d63f 0%, #94d63f ${(price - 300000) / (30000000 - 300000) * 100}%, #dedede ${(price - 300000) / (30000000 - 300000) * 100}%, #dedede 100%)` }} value={price} onChange={event => setPropertyPrice(Number(event.target.value))} /><div className="mortgage-range-labels"><span>300 000 Kč</span><span>30 000 000 Kč</span></div></div>
                    <div className="mortgage-number"><input id="property-price" type="number" min="300000" max="30000000" step="10000" value={price} onChange={event => setPropertyPrice(Number(event.target.value))} /><span>Kč</span></div>
                  </div>
                </div>
                <div className="mortgage-amount">
                  <label htmlFor="loan-amount">{product === 2 ? 'Zůstatek úvěru k refinancování' : 'Kolik si chcete půjčit'}</label>
                  <div className="mortgage-amount__row">
                    <div><input aria-label="Výše úvěru – posuvník" type="range" min="300000" max={Math.min(price, 10000000)} step="10000" style={{ background: `linear-gradient(to right, #94d63f 0%, #94d63f ${(loan - 300000) / Math.max(1, Math.min(price, 10000000) - 300000) * 100}%, #dedede ${(loan - 300000) / Math.max(1, Math.min(price, 10000000) - 300000) * 100}%, #dedede 100%)` }} value={loan} onChange={event => setLoanAmount(Number(event.target.value))} /><div className="mortgage-range-labels"><span>300 000 Kč</span><span>{money.format(Math.min(price, 10000000))} Kč</span></div></div>
                    <div className="mortgage-number"><input id="loan-amount" type="number" min="300000" max={Math.min(price, 10000000)} step="10000" value={loan} onChange={event => setLoanAmount(Number(event.target.value))} /><span>Kč</span></div>
                  </div>
                </div>
                <div className="mortgage-options">
                  <label>Doba splácení<select value={years} onChange={event => setYears(Number(event.target.value))}>{[5,10,15,20,25,30].map(year => <option key={year} value={year}>{year} let</option>)}</select></label>
                  <label>Doba fixace<select value={fixation} onChange={event => setFixation(Number(event.target.value))}>{[1,3,5,10].map(year => <option key={year} value={year}>{year} {year === 1 ? 'rok' : year < 5 ? 'roky' : 'let'}</option>)}</select></label>
                  <fieldset><legend>Pojištění schopnosti splácet</legend><div>{[true,false].map(value => <label key={String(value)}><input type="radio" name="insurance" checked={insurance === value} onChange={() => setInsurance(value)} />{value ? 'Ano' : 'Ne'}</label>)}</div></fieldset>
                </div>
                <p className="mortgage-disclaimer">Orientační výpočet se sazbou 4,99 % pro všechny varianty. Bez poplatků a pojištění; skutečná nabídka závisí na bance a zvolené fixaci.</p>
              </div>
            </div>
            <div className="mortgage-result">
              <h2>Vaše měsíční splátka</h2>
              <p className="mortgage-payment" aria-live="polite">{money.format(payment)}<sup>Kč</sup></p>
              <p className="mortgage-rate">při úroku 4,99 % p. a.</p>
              <a href={contactUrl} className="mortgage-compare">POROVNAT<br />HYPOTÉKY<ArrowRight size={28} aria-hidden="true" /></a>
              <ul>{['Porovnání nabídek od více bank','Nezávazná konzultace zdarma','Pomoc s vyřízením hypotéky'].map(text => <li key={text}><Check size={16} aria-hidden="true" />{text}</li>)}</ul>
            </div>
          </div>
          <div className="finance-contact"><span><Phone size={24} strokeWidth={1.8} aria-hidden="true" /></span><div><h2>Máte dotazy?</h2><p>Ozvěte se nám, rádi vám poradíme s výběrem nejvhodnějšího financování.</p></div><a href={contactUrl}>Kontaktovat poradce<ArrowRight size={22} aria-hidden="true" /></a></div>
        </div>
      </section>
    </main>
  );
}
