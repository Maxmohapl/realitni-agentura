'use client';
import InquiryDelivery from './InquiryDelivery';
import { useState } from 'react';
import { X } from 'lucide-react';

const MAX_TOTAL = 12 * 1024 * 1024;
const allowed = ['image/jpeg', 'image/png', 'image/webp'];
export default function ValuationForm() {
 const [photos,setPhotos]=useState<File[]>([]);
 const [error,setError]=useState('');
 return <form className="team-inquiry-form" onSubmit={event=>event.preventDefault()}>
 <h3>Nacenění nemovitosti zdarma</h3><p>Popište nám nemovitost a přidejte fotografie. Ozveme se vám na uvedený kontakt.</p>
 <label>Jméno a příjmení<input name="name" autoComplete="name" required maxLength={120}/></label>
 <div className="team-inquiry-form__row"><label>E-mail<input name="email" type="email" autoComplete="email" required maxLength={180}/></label><label>Telefon<input name="phone" type="tel" autoComplete="tel" required maxLength={40}/></label></div>
 <label>Adresa nemovitosti<input name="address" required maxLength={300} placeholder="Ulice, číslo domu, obec a PSČ"/></label>
 <label>Popis nemovitosti<textarea name="description" required rows={5} maxLength={3000} placeholder="Typ nemovitosti, dispozice, plocha, stav a další důležité informace…"/></label>
 <label className="valuation-upload">Fotografie nemovitosti <span>(nepovinné)</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={event=>{
  const next=[...photos,...Array.from(event.target.files||[])];event.target.value='';
  if(next.length>8){setError('Můžete přidat nejvýše 8 fotografií.');return;}
  if(next.some(file=>!allowed.includes(file.type)||!file.size)){setError('Vyberte neprázdné fotografie JPG, PNG nebo WebP.');return;}
  if(next.reduce((sum,file)=>sum+file.size,0)>MAX_TOTAL){setError('Celková velikost fotografií může být nejvýše 12 MB.');return;}
  setPhotos(next);setError('');
 }}/><small>JPG, PNG nebo WebP. Nejvýše 8 fotek, dohromady 12 MB.</small></label>
 {!!photos.length&&<ul className="valuation-files">{photos.map((file,index)=><li key={`${index}-${file.name}`}><span>{file.name} · {(file.size/1024/1024).toFixed(1)} MB</span><button type="button" aria-label={`Odebrat ${file.name}`} onClick={()=>{setPhotos(photos.filter((_,i)=>i!==index));setError('');}}><X size={18}/></button></li>)}</ul>}
 {error&&<p role="alert">{error}</p>}
 <InquiryDelivery kind="valuation" photos={photos}/>
 </form>;
}
