'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play, Star, ArrowUpRight } from 'lucide-react';

// Selected five-star reviews transcribed from the screenshots supplied by the owner.
// Names, profile pictures and relative dates are deliberately omitted.
const reviews = [
 'Ráda bych poděkovala za skvělou spolupráci při prodeji domu. Přes komplikovaný proces, skrze dědictví nezletilých dětí, celý prodej probíhal profesionálně a …',
 'Skvělá zkušenost s Realitní agenturou!\nKomunikoval jsem s panem Radkem Mézlem, který byl po celou dobu velmi …',
 'Výborná zkušenost - rychlá reakce, snaha nalézt nejvhodnější řešení, vstřícný přístup a profesionalita.',
 'Spolupracuji s touto realitní kanceláří v oblasti pronájmu. Velká ochota a schopnost řešit i nadstandardní situace. Určitě spokojenost.',
 'Při prodeji RD vše profesionálně vyřešené, včetně právního servisu.',
 'Pana Mézla doporučuji, vše proběhlo dle dohody, svižně a férově.',
 'Radek Mézl je spolehlivý obchodní partner i realitní makléř.',
 'Perfektní',
];
export default function GoogleReviews() {
 const track = useRef<HTMLDivElement>(null);
 const [paused,setPaused] = useState(false);
 const [interacting,setInteracting] = useState(false);
 const [focused,setFocused] = useState(false);
 const [reduced,setReduced] = useState(true);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 function move(direction:number) {
  const el=track.current;if(!el)return;
  const card=el.firstElementChild as HTMLElement|null;
  const step=(card?.offsetWidth || 350) + (parseFloat(getComputedStyle(el).columnGap) || 0);
  const max=el.scrollWidth-el.clientWidth;
  const next=direction>0 && el.scrollLeft>=max-3 ? 0 : direction<0 && el.scrollLeft<=3 ? max : el.scrollLeft+direction*step;
  el.scrollTo({left:next,behavior:reduced?'instant':'smooth'});
 }
 useEffect(()=>{if(paused || interacting || focused || reduced)return;const timer=window.setInterval(()=>{if(!document.hidden)move(1);},5000);return()=>window.clearInterval(timer);},[paused,interacting,focused,reduced]);
 return <section className="google-reviews" id="recenze" aria-labelledby="reviews-heading" onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)} onTouchStart={()=>setInteracting(true)} onTouchEnd={()=>setInteracting(false)} onTouchCancel={()=>setInteracting(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false);}}>
  <div className="google-reviews__heading"><div><span className="google-reviews__eyebrow">ZKUŠENOSTI NAŠICH KLIENTŮ</span><h2 id="reviews-heading">Co o nás říkají <span>klienti.</span></h2><p className="google-reviews__selection">Výběr recenzí z Googlu</p><div className="google-reviews__rating" aria-label="Hodnocení na Googlu 4,6 z 5 hvězdiček"><strong>4,6</strong><span className="google-reviews__rating-stars" aria-hidden="true"><span>{Array.from({length:5},(_,i)=><Star key={i} size={19} fill="currentColor" />)}</span><span className="google-reviews__rating-fill">{Array.from({length:5},(_,i)=><Star key={i} size={19} fill="currentColor" />)}</span></span><span>z 5 na Googlu</span></div></div><div className="review-controls"><button type="button" aria-label={paused?'Spustit protáčení recenzí':'Pozastavit protáčení recenzí'} onClick={()=>setPaused(!paused)}>{paused?<Play />:<Pause />}</button><button type="button" aria-label="Předchozí recenze" onClick={()=>move(-1)}><ArrowLeft /></button><button type="button" aria-label="Další recenze" onClick={()=>move(1)}><ArrowRight /></button></div></div>
  <div className="google-reviews__grid google-reviews__carousel" ref={track} tabIndex={0} role="region" aria-label="Vybrané recenze, posouvatelný seznam" onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}}}>{reviews.map((text,index)=><article key={index}><div className="google-reviews__stars" aria-label="5 z 5 hvězdiček">{Array.from({length:5},(_,i)=><Star key={i} size={18} fill="currentColor" />)}</div><blockquote><p>{text}</p></blockquote><span className="review-source">Google · {index<2?'úryvek recenze':'recenze'}</span></article>)}</div>
  <a className="google-reviews__link" href="https://g.page/realitni-agentura?share" target="_blank" rel="noopener noreferrer">Zobrazit všechny recenze na Googlu <ArrowUpRight size={18} /></a>
 </section>;
}
