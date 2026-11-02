'use client';
import { useEffect, useRef, useState } from 'react';
import { useGoogleReviews, type GoogleReview } from '@/hooks/use-google-reviews';
import { ratingPercentage } from '@/lib/content/statistics';
import { ArrowLeft, ArrowRight, Pause, Play, Star, ArrowUpRight } from 'lucide-react';

// Selected five-star reviews transcribed from the screenshots supplied by the owner.
// Names, profile pictures and relative dates are deliberately omitted.
const selectedReviews = [
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
 const google = useGoogleReviews();
 const rating = google.status === 'ready' && ratingPercentage(google.rating, google.count) !== null ? google.rating! : null;
 const live = google.status === 'ready' && !!google.reviews?.length;
 const reviews: GoogleReview[] = live ? google.reviews! : selectedReviews.map(text => ({ text, rating: 5, author: '' }));
 const profileUrl = google.profileUrl || 'https://g.page/realitni-agentura?share';
 const track = useRef<HTMLDivElement>(null);
 const [expanded,setExpanded] = useState(false);
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
  <div className="google-reviews__heading"><div><span className="google-reviews__eyebrow">ZKUŠENOSTI NAŠICH KLIENTŮ</span><h2 id="reviews-heading">Co o nás říkají <span>klienti.</span></h2><p className="google-reviews__selection">Výběr recenzí z Googlu</p>{rating !== null && <div className="google-reviews__rating" aria-label={`Hodnocení na Google Maps ${rating} z 5 hvězdiček`}><strong>{rating.toLocaleString('cs-CZ')}</strong><span className="google-reviews__rating-stars" aria-hidden="true"><span>{Array.from({length:5},(_,i)=><Star key={i} size={19} fill="currentColor" />)}</span><span className="google-reviews__rating-fill" style={{width: `${rating / 5 * 100}%`}}>{Array.from({length:5},(_,i)=><Star key={i} size={19} fill="currentColor" />)}</span></span><span>z 5 na Google Maps · {google.count} hodnocení</span></div>}</div><div className="review-controls"><button type="button" aria-label={paused?'Spustit protáčení recenzí':'Pozastavit protáčení recenzí'} onClick={()=>setPaused(!paused)}>{paused?<Play />:<Pause />}</button><button type="button" aria-label="Předchozí recenze" onClick={()=>move(-1)}><ArrowLeft /></button><button type="button" aria-label="Další recenze" onClick={()=>move(1)}><ArrowRight /></button></div></div>
  <div id="review-list" className={`google-reviews__grid google-reviews__carousel${expanded ? ' google-reviews__carousel--expanded' : ''}`} ref={track} tabIndex={0} role="region" aria-label="Vybrané recenze, posouvatelný seznam" onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}}}>{reviews.map((review,index)=><article key={`${review.author}-${index}`}><div className="google-reviews__stars" aria-label={`${review.rating} z 5 hvězdiček`}>{Array.from({length:5},(_,i)=><Star key={i} size={18} fill={i < Math.round(review.rating) ? 'currentColor' : 'none'} />)}</div><blockquote><p>{review.text}</p></blockquote>{live && <div className="review-author">{review.authorPhoto && <img src={review.authorPhoto} alt="" width={32} height={32} loading="lazy" referrerPolicy="no-referrer" />}{review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noopener noreferrer">{review.author}</a> : <span>{review.author}</span>}{review.time && <small>{review.time}</small>}</div>}{live ? <a className="review-source" href={review.url || profileUrl} target="_blank" rel="noopener noreferrer">Google Maps · Zobrazit recenzi</a> : <span className="review-source">Google Maps · {index<2?'úryvek recenze':'recenze'}</span>}</article>)}</div>
  {reviews.length > 3 && <button className="google-reviews__expand" type="button" aria-expanded={expanded} aria-controls="review-list" onClick={()=>setExpanded(!expanded)}>{expanded ? 'Zobrazit méně recenzí' : `Zobrazit dalších ${reviews.length - 3} recenzí`}</button>}
  <a className="google-reviews__link" href={profileUrl} target="_blank" rel="noopener noreferrer">Zobrazit všechny recenze na Googlu <ArrowUpRight size={18} /></a>
 </section>;
}
