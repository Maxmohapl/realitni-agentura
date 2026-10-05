'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { limits, validInput, type QuoteInput, type Offer, type Product } from '@/lib/finance/gpf';
const money=new Intl.NumberFormat('cs-CZ',{maximumFractionDigits:0});
const products:[Product,string][]=[['BYD','hypotéka na bydlení'],['AHU','americká hypotéka'],['RFU','refinancování']];
const initial:QuoteInput={product:'BYD',price:2500000,loan:2000000,years:30,fixation:3,insurance:true};
function Hint({text}:{text:string}) { return <span className="gpf-hint" tabIndex={0} aria-label={text}><Info size={14}/><span role="tooltip">{text}</span></span>; }
export default function GpfCalculator() {
 const [input,setInput]=useState<QuoteInput>(initial),[offers,setOffers]=useState<Offer[]>([]),[best,setBest]=useState<Offer|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState(''),[showOffers,setShowOffers]=useState(false),[retry,setRetry]=useState(0);
 const sequence=useRef(0); const l=limits(input.product); const valid=validInput(input);
 useEffect(()=>{
  const id=++sequence.current; const controller=new AbortController(); setShowOffers(false); setError(''); setBest(null); setOffers([]);
  if(!valid){setLoading(false);return;}
  setLoading(true);
  const timer=setTimeout(async()=>{
   try { const response=await fetch('/api/finance/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input),signal:controller.signal}); const data=await response.json() as {offers:Offer[];best:Offer|null;error?:string}; if(!response.ok)throw new Error(data.error||'Výpočet se nezdařil.'); if(sequence.current!==id)return; setOffers(data.offers);setBest(data.best); if(!data.best)setError('Pro zadané parametry nyní není k dispozici nabídka.'); }
   catch(e){if(sequence.current===id&&!controller.signal.aborted)setError(e instanceof Error?e.message:'Výpočet je nedostupný.');}
   finally{if(sequence.current===id&&!controller.signal.aborted)setLoading(false);}
  },1000);
  return()=>{clearTimeout(timer);controller.abort();};
 },[input,valid,retry]);
 const change=(patch:Partial<QuoteInput>)=>{setLoading(true);setBest(null);setShowOffers(false);setInput(x=>({...x,...patch}));};
 const switchProduct=(product:Product)=>{if(product===input.product)return; change(product==='RFU'?{product}:{product,price:2500000,loan:product==='AHU'?1000000:2000000,years:product==='AHU'?20:30,fixation:3});};
 const amount=(key:'price'|'loan',label:string,help:string,max:number)=><div className="gpf-amount"><div><label htmlFor={`gpf-${key}`}>{label}</label><Hint text={help}/></div><div className="gpf-amount-row"><div><input aria-label={`${label} – posuvník`} type="range" min={l.min} max={max} step={50000} value={Math.max(l.min,Math.min(max,input[key]))} style={{backgroundSize:`${Math.min(100,input[key]/max*100)}% 100%`}} onChange={e=>change({[key]:Number(e.target.value)})}/><div className="gpf-range-labels"><span>{money.format(l.min)} Kč</span><span>{money.format(max)} Kč</span></div></div><div className="gpf-number"><input id={`gpf-${key}`} inputMode="numeric" type="text" value={input[key]?money.format(input[key]):''} onChange={e=>{const digits=e.target.value.replace(/\s/g,''); if(/^\d*$/.test(digits))change({[key]:Number(digits)});}} aria-invalid={input[key]<l.min||input[key]>max}/><span>Kč</span></div></div>{(input[key]<l.min||input[key]>max)&&<p className="gpf-error">Zadejte částku od {money.format(l.min)} do {money.format(max)} Kč.</p>}{key==='loan'&&input.loan>input.price*.9&&<p className="gpf-error">MAX. VÝŠE ÚVĚRU JE 90 % Z CENY NEMOVITOSTI</p>}</div>;
 const contact=`/kontakt?sluzba=financovani&typ=${encodeURIComponent(products.find(([p])=>p===input.product)![1])}&cena=${input.price}&uver=${input.loan}&splatnost=${input.years}&fixace=${input.fixation}&pojisteni=${input.insurance?'ano':'ne'}${best?`&sazba=${best.interestRate}&splatka=${Math.round(best.monthlyPayment)}`:''}`;
 return <div className="gpf-widget">
 <div className="gpf-calculator"><div className="gpf-fields">
 <div className="gpf-tabs" role="tablist" aria-label="Typ financování">{products.map(([id,label])=><button type="button" role="tab" id={`gpf-tab-${id}`} aria-controls="gpf-panel" aria-selected={input.product===id} key={id} onClick={()=>switchProduct(id)}>{label}</button>)}</div>
 <div role="tabpanel" id="gpf-panel" aria-labelledby={`gpf-tab-${input.product}`}>
 {amount('price','Cena nemovitosti','Odhadní cena nemovitosti, která bude sloužit jako zástava úvěru. Pokud nevíte, zadejte kupní cenu nemovitosti.',l.priceMax)}
 {amount('loan','Kolik si chcete půjčit','Zadejte výši hypotéky, kterou byste rádi získali.',l.loanMax)}
 <div className="gpf-options"><div><label htmlFor="gpf-years">Doba splácení</label><Hint text="Doba splácení závisí na typu hypotéky, výši úvěru a věku klienta."/><select id="gpf-years" value={input.years} onChange={e=>change({years:Number(e.target.value)})}>{Array.from({length:l.yearsMax-4},(_,i)=>i+5).map(y=><option key={y} value={y}>{y} let</option>)}</select></div>
 <div><label htmlFor="gpf-fixation">Doba fixace</label><Hint text="Po dobu fixace je garantována platnost sjednaných úrokových podmínek."/><select id="gpf-fixation" value={input.fixation} onChange={e=>change({fixation:Number(e.target.value)})}>{[1,3,5,10].map(y=><option key={y} value={y}>{y} {y===1?'rok':y===3?'roky':'let'}</option>)}</select></div>
 <fieldset><legend>Pojištění schopnosti splácet <Hint text="Pojištění pro případ úmrtí, invalidity či pracovní neschopnosti."/></legend><div className="gpf-radios">{[true,false].map(value=><label key={String(value)}><input type="radio" name="gpf-insurance" checked={input.insurance===value} onChange={()=>change({insurance:value})}/><span>{value?'Ano':'Ne'}</span></label>)}</div></fieldset></div>
 </div></div>
 <div className="gpf-result" aria-busy={loading}><h2>Vaše měsíční splátka</h2><div className="gpf-payment" aria-live="polite">{loading?<span className="gpf-spinner" role="status" aria-label="Načítám výpočet"/>:best?money.format(Math.round(best.monthlyPayment)):'—'}<sup>Kč</sup></div><p className="gpf-rate">{best?`při úroku ${best.interestRate} % p. a.`:loading?'Počítáme vaši splátku…':'Výpočet není k dispozici'}</p><button className="gpf-compare" disabled={loading||!best||!valid} onClick={()=>setShowOffers(x=>!x)}>POROVNAT HYPOTÉKY<ArrowRight size={23}/></button>{error&&<div role="alert" className="gpf-provider-error">{error}<button type="button" onClick={()=>setRetry(x=>x+1)}>Zkusit znovu</button></div>}</div></div>
 <p className="gpf-source">Orientační nabídky z kalkulačky Gepard Finance. Konečné podmínky potvrdí banka.</p>
 {showOffers&&<section className="gpf-offers" aria-label="Porovnání hypoték"><h2>Porovnání hypoték</h2>{offers.map((offer,i)=><article key={`${offer.bankName}-${i}`}><div><h3>{offer.bankName}</h3><p>{offer.productName}</p></div><div><strong>{money.format(Math.round(offer.monthlyPayment))} Kč/měs.</strong><p>Úrok {offer.interestRate} % p. a.{offer.apr!==null?` · RPSN ${offer.apr} %`:''}</p></div></article>)}<a href={contact}>Probrat nabídky s poradcem</a></section>}
 <a className="gpf-adviser" href={contact}>Kontaktovat poradce</a>
 </div>;
}
