'use client';
import { useEffect, useState } from 'react';
import ValuationForm from './ValuationForm';
import { ArrowRight } from 'lucide-react';
export default function TeamInquiry({ contextual = false }: { contextual?: boolean }) {
 const [valuation,setValuation]=useState(false);
 const [message,setMessage]=useState('');
 useEffect(()=>{
  if(!contextual)return;
  const params=new URLSearchParams(window.location.search);
  const value=(key:string)=>params.get(key)?.slice(0,180) || '';
  if(params.get('typ')==='naceneni')setValuation(true);
  const lines:string[]=[];
  if(value('projekt'))lines.push(`Mám zájem o projekt ${value('projekt')}.`);
  if(value('sluzba'))lines.push(`Mám zájem o službu: ${value('sluzba') === 'financovani' ? 'financování' : value('sluzba')}.`);
  const labels:Record<string,string>={typ:'Typ financování',cena:'Cena nemovitosti (Kč)',uver:'Výše úvěru (Kč)',splatnost:'Splatnost (roky)',fixace:'Fixace (roky)',sazba:'Orientační sazba (%)',splatka:'Orientační splátka (Kč)',pojisteni:'Pojištění'};
  for(const [key,label] of Object.entries(labels))if(value(key))lines.push(`${label}: ${value(key)}`);
  if(lines.length)setMessage(`Dobrý den,\n\n${lines.join('\n')}\n\nProsím o bližší informace.`);
 },[contextual]);
 const [prepared,setPrepared]=useState(false);
 return <section className="team-inquiry-section" id="poptavka"><div><span className="about-eyebrow">NEZÁVAZNÁ POPTÁVKA</span><h2>S čím vám můžeme pomoci?</h2><p>Napište nám, co hledáte nebo plánujete. Společně najdeme vhodné řešení.</p></div><div><div className="inquiry-switch" role="group" aria-label="Typ poptávky"><button type="button" aria-pressed={!valuation} onClick={()=>setValuation(false)}>Běžná poptávka</button><button type="button" aria-pressed={valuation} onClick={()=>setValuation(true)}>Nacenění zdarma</button></div><div hidden={!valuation}><ValuationForm /></div><div hidden={valuation}><form className="team-inquiry-form" onSubmit={event=>{event.preventDefault();const values=new FormData(event.currentTarget);const body=`Dobrý den,\n\n${values.get('message')}\n\nJméno: ${values.get('name')}\nE-mail: ${values.get('email')}\nTelefon: ${values.get('phone') || 'Neuveden'}`;window.location.href=`mailto:info@realitni-agentura.cz?subject=${encodeURIComponent('Nezávazná poptávka')}&body=${encodeURIComponent(body)}`;setPrepared(true);}}><label>Jméno a příjmení<input name="name" autoComplete="name" required maxLength={120}/></label><div className="team-inquiry-form__row"><label>E-mail<input name="email" type="email" autoComplete="email" required maxLength={180}/></label><label>Telefon <span>(nepovinný)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40}/></label></div><label>Vaše zpráva<textarea name="message" value={message} onChange={event=>setMessage(event.target.value)} rows={5} required maxLength={3000} placeholder="Jak vám můžeme pomoci?" /></label><p className="team-inquiry-form__hint">Otevře se vaše e-mailová aplikace s připravenou zprávou pro info@realitni-agentura.cz.</p><button type="submit" className="about-button">Připravit poptávku<ArrowRight /></button>{prepared && <p role="status" className="team-inquiry-form__hint">Zprávu odešlete ve své e-mailové aplikaci. Pokud se neotevřela, napište na <a href="mailto:info@realitni-agentura.cz">info@realitni-agentura.cz</a>.</p>}</form></div></div></section>;
}
