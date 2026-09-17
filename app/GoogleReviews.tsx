 'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
type ReviewData = { status: string; rating?: number; count?: number; profileUrl?: string; reviews?: {rating:number;text:string;author:string;authorUrl?:string;time?:string;url?:string}[] };
export default function GoogleReviews() {
 const [data,setData] = useState<ReviewData | null>(null);
 useEffect(() => { const controller = new AbortController(); fetch('/api/google-reviews', {signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(setData).catch(()=>{if(!controller.signal.aborted)setData({status:'unavailable'});}); return ()=>controller.abort(); }, []);
 return <section className="google-reviews" id="recenze" aria-labelledby="reviews-heading">
  <div className="google-reviews__heading"><div><span className="google-reviews__eyebrow">ZKUŠENOSTI NAŠICH KLIENTŮ</span><h2 id="reviews-heading">Co o nás říkají <span>klienti.</span></h2></div><div className="google-reviews__source"><span>Google Maps</span>{data?.rating !== undefined && <strong><Star fill="currentColor" size={20} />{data.rating.toLocaleString('cs-CZ')} / 5 <small>({data.count} hodnocení)</small></strong>}</div></div>
  {!!data?.reviews?.length && <div className="google-reviews__grid">{data.reviews.map((review,index)=><article key={index}><div className="google-reviews__stars" aria-label={`${review.rating} z 5 hvězdiček`}>{Array.from({length:5},(_,i)=><Star key={i} size={16} fill={i<review.rating?'currentColor':'none'} />)}</div><p>{review.text || 'Hodnocení bez slovního komentáře.'}</p><div className="google-reviews__author">{review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noopener noreferrer">{review.author}</a> : <strong>{review.author}</strong>}<small>{review.time}</small></div>{review.url && <a className="google-reviews__original" href={review.url} target="_blank" rel="noopener noreferrer">Celá recenze na Googlu <ArrowUpRight size={15} /></a>}</article>)}</div>}
  {!data?.reviews?.length && <p className="google-reviews__empty" role="status">{!data ? 'Načítáme recenze…' : data.status === 'unconfigured' ? 'Recenze z Googlu zde brzy najdete.' : 'Recenze se nyní nepodařilo načíst.'}</p>}
  {data?.profileUrl && <a className="google-reviews__link" href={data.profileUrl} target="_blank" rel="noopener noreferrer">Všechny recenze na Googlu <ArrowUpRight size={18} /></a>}
 </section>;
}
