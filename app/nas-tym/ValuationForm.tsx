'use client';
import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

const MAX_TOTAL = 12 * 1024 * 1024;
const allowed = ['image/jpeg', 'image/png', 'image/webp'];
const encode = (bytes: Uint8Array) => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).match(/.{1,76}/g)?.join('\r\n') || '';
};

export default function ValuationForm() {
 const [photos,setPhotos]=useState<File[]>([]);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const [prepared,setPrepared]=useState(false);
 return <form className="team-inquiry-form" onSubmit={async event=>{
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const body=`Dobrý den, žádám o nacenění nemovitosti zdarma.\n\nJméno: ${data.get('name')}\nE-mail: ${data.get('email')}\nTelefon: ${data.get('phone')}\nAdresa nemovitosti: ${data.get('address')}\n\n${data.get('description')}`;
  setBusy(true);setError('');setPrepared(false);
  try {
   if(!photos.length){window.location.href=`mailto:prochazka@egpreality.cz?subject=${encodeURIComponent('Nacenění nemovitosti zdarma')}&body=${encodeURIComponent(body)}`;}
   else {
    const boundary=`inquiry_${crypto.randomUUID()}`;
    const parts=[`To: prochazka@egpreality.cz`, `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent('Nacenění nemovitosti zdarma')))}?=`, 'X-Unsent: 1', 'MIME-Version: 1.0', `Content-Type: multipart/mixed; boundary="${boundary}"`, '', `--${boundary}`, 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', encode(new TextEncoder().encode(body))];
    for(const [index,file] of photos.entries()) {
     const ext=file.type==='image/jpeg'?'jpg':file.type==='image/png'?'png':'webp';
     parts.push(`--${boundary}`,`Content-Type: ${file.type}`,`Content-Disposition: attachment; filename="nemovitost-${index+1}.${ext}"`,'Content-Transfer-Encoding: base64','',encode(new Uint8Array(await file.arrayBuffer())));
    }
    parts.push(`--${boundary}--`,'');
    const url=URL.createObjectURL(new Blob([parts.join('\r\n')],{type:'message/rfc822'}));
    const link=document.createElement('a');link.href=url;link.download='naceneni-nemovitosti.eml';link.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
   }
   setPrepared(true);
  } catch {setError('Koncept se nepodařilo připravit. Zkuste to znovu nebo napište na prochazka@egpreality.cz.');}
  finally {setBusy(false);}
 }}>
 <h3>Nacenění nemovitosti zdarma</h3><p>Popište nám nemovitost a přidejte fotografie. Ozveme se vám na uvedený kontakt.</p>
 <label>Jméno a příjmení<input name="name" autoComplete="name" required maxLength={120}/></label>
 <div className="team-inquiry-form__row"><label>E-mail<input name="email" type="email" autoComplete="email" required maxLength={180}/></label><label>Telefon<input name="phone" type="tel" autoComplete="tel" required maxLength={40}/></label></div>
 <label>Adresa nemovitosti<input name="address" required maxLength={300} placeholder="Ulice, číslo domu, obec a PSČ"/></label>
 <label>Popis nemovitosti<textarea name="description" required rows={5} maxLength={3000} placeholder="Typ nemovitosti, dispozice, plocha, stav a další důležité informace…"/></label>
 <label className="valuation-upload">Fotografie nemovitosti <span>(nepovinné)</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={event=>{
  const next=[...photos,...Array.from(event.target.files||[])];event.target.value='';setPrepared(false);
  if(next.length>8){setError('Můžete přidat nejvýše 8 fotografií.');return;}
  if(next.some(file=>!allowed.includes(file.type)||!file.size)){setError('Vyberte neprázdné fotografie JPG, PNG nebo WebP.');return;}
  if(next.reduce((sum,file)=>sum+file.size,0)>MAX_TOTAL){setError('Celková velikost fotografií může být nejvýše 12 MB.');return;}
  setPhotos(next);setError('');
 }}/><small>JPG, PNG nebo WebP. Nejvýše 8 fotek, dohromady 12 MB.</small></label>
 {!!photos.length&&<ul className="valuation-files">{photos.map((file,index)=><li key={`${index}-${file.name}`}><span>{file.name} · {(file.size/1024/1024).toFixed(1)} MB</span><button type="button" aria-label={`Odebrat ${file.name}`} onClick={()=>{setPhotos(photos.filter((_,i)=>i!==index));setPrepared(false);setError('');}}><X size={18}/></button></li>)}</ul>}
 <p className="team-inquiry-form__hint">{photos.length?'Stáhne se e-mailový koncept (.eml) včetně fotek. Otevřete ho v poštovní aplikaci, která podporuje koncepty .eml, a odešlete. Pokud ji nemáte, přiložte fotky ručně do zprávy na prochazka@egpreality.cz.':'Otevře se vaše e-mailová aplikace s připravenou žádostí.'} Fotografie se na web neukládají.</p>
 {error&&<p role="alert">{error}</p>}
 <button type="submit" className="about-button" disabled={busy}>{busy?'Připravuji…':photos.length?'Stáhnout žádost s fotkami':'Připravit žádost zdarma'}<ArrowRight/></button>
 {prepared&&<p role="status">Žádost je připravená, zatím nebyla odeslána. Dokončete odeslání ve své poštovní aplikaci.</p>}
 </form>;
}
