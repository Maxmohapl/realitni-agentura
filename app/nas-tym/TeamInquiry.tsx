'use client';
import { useEffect, useRef, useState } from 'react';
import ValuationForm from './ValuationForm';
import { ArrowRight, ArrowLeft, Calculator, Home, KeyRound, Search, MessageCircle } from 'lucide-react';
const choices = [
 {id:'valuation',label:'Nezávazná kalkulace ceny',text:'Zjistěte zdarma orientační cenu své nemovitosti.',Icon:Calculator},
 {id:'sale',label:'Prodej nemovitosti',text:'Chci prodat byt, dům nebo pozemek.',Icon:Home},
 {id:'rent',label:'Pronájem nemovitosti',text:'Mám nemovitost a hledám nájemce.',Icon:KeyRound},
 {id:'search',label:'Poptávka koupě / pronájmu nemovitosti',text:'Hledám nové bydlení nebo investici.',Icon:Search},
 {id:'other',label:'Ostatní',text:'Financování, projekt nebo jiný dotaz.',Icon:MessageCircle},
];
export default function TeamInquiry({contextual=false}:{contextual?:boolean}) {
 const [open,setOpen]=useState(false),[selected,setSelected]=useState(''),[step,setStep]=useState(1),[prepared,setPrepared]=useState(false);
 const [drafts,setDrafts]=useState<Record<string,Record<string,string>>>({});
 const heading=useRef<HTMLHeadingElement>(null);
 const choice=choices.find(item=>item.id===selected);
 const values=drafts[selected]||{};
 const set=(key:string,value:string)=>{setPrepared(false);setDrafts(current=>({...current,[selected]:{...current[selected],[key]:value}}));};
 useEffect(()=>{if(!contextual)return;const params=new URLSearchParams(location.search);if(!params.size)return;
 const service=params.get('sluzba')||'';const id=params.get('typ')==='naceneni'?'valuation':service.includes('Prodej')?'sale':service.includes('Pronájem')?'rent':service.includes('Koupě')?'search':'other';
 const labels:Record<string,string>={projekt:'Projekt',sluzba:'Služba',typ:'Typ',cena:'Cena nemovitosti',uver:'Úvěr',splatnost:'Splatnost',fixace:'Fixace',sazba:'Sazba',splatka:'Splátka',pojisteni:'Pojištění'};
 const context=Object.entries(labels).filter(([key])=>params.has(key)).map(([key,label])=>`${label}: ${params.get(key)?.slice(0,180)}`).join('\n');
 setDrafts({[id]:{description:context}});setSelected(id);setOpen(true);
 },[contextual]);
 useEffect(()=>{if(open)heading.current?.focus({preventScroll:true});},[open,selected,step]);
 const field=(key:string,label:string,required=true,type='text',placeholder='')=><label>{label}<input name={key} type={type} value={values[key]||''} onChange={e=>set(key,e.target.value)} required={required} maxLength={300} placeholder={placeholder} autoComplete={key==='email'?'email':key==='phone'?'tel':key==='name'?'name':'off'}/></label>;
 const select=(key:string,label:string,options:string[])=><label>{label}<select required name={key} value={values[key]||''} onChange={e=>set(key,e.target.value)}><option value="">Vyberte možnost</option>{options.map(value=><option key={value}>{value}</option>)}</select></label>;
 return <section className="team-inquiry-section questionnaire" id="poptavka"><div><span className="about-eyebrow">JSME TU PRO VÁS</span><h2>S čím vám můžeme pomoci?</h2><p>Vyberte, co právě řešíte. Několik krátkých otázek nám pomůže lépe porozumět vašim potřebám.</p></div><div>
 {!open?<button className="about-button" onClick={()=>setOpen(true)}>Napsat zprávu<ArrowRight/></button>:<>
 <div className="questionnaire-top"><button className="questionnaire-back" onClick={()=>{if(step===2)setStep(1);else if(selected)setSelected('');else setOpen(false);setPrepared(false);}}><ArrowLeft size={18}/>{step===2?'Zpět k odpovědím':selected?'Změnit typ poptávky':'Zavřít'}</button><span>{selected?(selected==='valuation'?'Nacenění zdarma':`Krok ${step} ze 2`):'Začněme výběrem'}</span></div>
 <h3 ref={heading} tabIndex={-1} className="questionnaire-title">{choice?(step===2?'Kam se vám můžeme ozvat?':choice.label):'Co pro vás můžeme udělat?'}</h3>
 {!selected?<div className="questionnaire-choices">{choices.map(({id,label,text,Icon})=><button key={id} onClick={()=>{setSelected(id);setStep(1);}}><Icon size={26}/><span><strong>{label}</strong><small>{text}</small></span><ArrowRight size={20}/></button>)}</div>:selected==='valuation'?<ValuationForm/>:<form className="team-inquiry-form" onSubmit={event=>{event.preventDefault();if(step===1){setStep(2);return;}const body=Object.entries(values).map(([key,value])=>`${({name:'Jméno',email:'E-mail',phone:'Telefon',type:'Typ nemovitosti',address:'Adresa',area:'Plocha',condition:'Stav',timing:'Termín',price:'Představa o ceně',intent:'Hledám',location:'Lokalita',budget:'Rozpočet',layout:'Dispozice',topic:'Téma',description:'Popis'} as Record<string,string>)[key]||key}: ${value}`).join('\n');window.location.href=`mailto:prochazka@egpreality.cz?subject=${encodeURIComponent(choice?.label||'Poptávka')}&body=${encodeURIComponent(body)}`;setPrepared(true);}}>
 {step===1?<>
 {(selected==='sale'||selected==='rent')&&<>{select('type','Co nabízíte?',['Byt','Rodinný dům','Pozemek','Komerční nemovitost','Jiné'])}{field('address','Kde se nemovitost nachází?',true,'text','Ulice, obec a PSČ')}{field('area','Přibližná plocha (m²)',false)}{select('condition','V jakém je stavu?',['Novostavba','Po rekonstrukci','Dobrý stav','Před rekonstrukcí','Jiné / netýká se'])}{field('price',selected==='rent'?'Představa o měsíčním nájemném (Kč, nepovinné)':'Představa o prodejní ceně (Kč, nepovinné)',false)}{field('timing',selected==='rent'?'Od kdy chcete pronajímat?':'Kdy plánujete prodej?',false)}</>}
 {selected==='search'&&<>{select('intent','Máte zájem o koupi, nebo pronájem?',['Koupě','Pronájem','Obě možnosti'])}{select('type','Jakou nemovitost hledáte?',['Byt','Rodinný dům','Pozemek','Komerční nemovitost','Jiné'])}{field('location','Preferovaná lokalita')}{field('budget','Rozpočet (Kč; u pronájmu měsíčně)')}{field('layout','Dispozice a velikost (nepovinné)',false)}{field('timing','Kdy se chcete stěhovat / koupit? (nepovinné)',false)}</>}
 {selected==='other'&&field('topic','Čeho se váš dotaz týká?')}
 <label>{selected==='other'?'Vaše zpráva':'Další informace (nepovinné)'}<textarea rows={5} value={values.description||''} onChange={e=>set('description',e.target.value)} required={selected==='other'} maxLength={3000}/></label>
 <button className="about-button" type="submit">Pokračovat na kontakt<ArrowRight/></button>
 </>:<>{field('name','Jméno a příjmení')}{field('email','E-mail',true,'email')}{field('phone','Telefon (nepovinný)',false,'tel')}<p className="team-inquiry-form__hint">Připravíme zprávu pro prochazka@egpreality.cz ve vaší poštovní aplikaci. Odeslání v ní potvrdíte sami.</p><button className="about-button" type="submit">Připravit poptávku<ArrowRight/></button>{prepared&&<p role="status">Zpráva je připravená. Dokončete odeslání ve své poštovní aplikaci.</p>}</>}
 </form>}
 </>}
 </div></section>;
}
