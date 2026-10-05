import { createHmac, createHash } from 'node:crypto';
import { z } from 'zod';

export const recipient = 'prochazka@egpreality.cz';
export const maxPhotosBytes = 12 * 1024 * 1024;
const fields = ['name','email','phone','type','address','area','condition','timing','price','intent','location','budget','layout','topic','description'] as const;
export const schema = z.object({
 kind:z.enum(['valuation','sale','rent','search','other']),
 values:z.object(Object.fromEntries(fields.map(key=>[key,z.string().trim().max(key==='description'?3000:300).optional()])) as Record<typeof fields[number],z.ZodOptional<z.ZodString>>).strict(),
}).superRefine(({kind,values},ctx)=>{
 const required = ['name','email',...(kind==='valuation'?['phone','address','description']:kind==='sale'||kind==='rent'?['type','address','condition']:kind==='search'?['intent','type','location','budget']:['topic','description'])];
 for(const key of required)if(!values[key as keyof typeof values])ctx.addIssue({code:'custom',message:'Vyplňte povinná pole.'});
 if(!z.string().email().safeParse(values.email).success || /[\r\n]/.test(values.email||''))ctx.addIssue({code:'custom',message:'Neplatný e-mail.'});
});
export type InquiryEnv = { DB:D1Database; INQUIRIES_ENABLED?:string; TURNSTILE_SITE_KEY?:string; TURNSTILE_SECRET_KEY?:string; RESEND_API_KEY?:string; INQUIRY_FROM?:string; INQUIRY_HASH_SECRET?:string; INQUIRY_ORIGINS?:string };
export function ready(e:InquiryEnv){return e.INQUIRIES_ENABLED==='true'&&!!(e.DB&&e.TURNSTILE_SITE_KEY&&e.TURNSTILE_SECRET_KEY&&e.RESEND_API_KEY&&e.INQUIRY_FROM&&e.INQUIRY_ORIGINS&&e.INQUIRY_HASH_SECRET&&e.INQUIRY_HASH_SECRET.length>=32);}
export function photoType(b:Uint8Array){
 if(b.length<12)return null;
 if(b[0]===255&&b[1]===216&&b[2]===255)return 'jpg';
 if(Buffer.from(b.subarray(0,8)).equals(Buffer.from([137,80,78,71,13,10,26,10])))return 'png';
 if(Buffer.from(b.subarray(0,4)).toString()==='RIFF'&&Buffer.from(b.subarray(8,12)).toString()==='WEBP')return 'webp';
 return null;
}
class Rejected extends Error { constructor(public status:number,message:string){super(message);} }
const reply=(status:number,error:string)=>Response.json({error},{status,headers:{'Cache-Control':'no-store',...(status===429?{'Retry-After':'900'}:{})}});
async function limitedBody(request:Request){
 const max=maxPhotosBytes+65536;
 if(Number(request.headers.get('content-length'))>max)throw new Rejected(413,'Přílohy jsou příliš velké.');
 const reader=request.body?.getReader();if(!reader)throw new Rejected(400,'Chybí data.');
 let size=0;const chunks:Uint8Array[]=[];
 while(true){const item=await reader.read();if(item.done)break;size+=item.value.length;if(size>max){await reader.cancel();throw new Rejected(413,'Přílohy jsou příliš velké.');}chunks.push(item.value);}
 return new Response(new Blob(chunks as BlobPart[]),{headers:{'Content-Type':request.headers.get('content-type')||''}}).formData();
}
export async function handleInquiry(request:Request,e:InquiryEnv,fetcher:typeof fetch=fetch){
 if(!ready(e))return reply(503,'Odesílání zatím není dostupné. Napište na '+recipient+'.');
 const origins=e.INQUIRY_ORIGINS!.split(',').map(s=>s.trim());
 const origin=request.headers.get('origin');
 if(!origin||!origins.includes(origin)||origin!==new URL(request.url).origin)return reply(403,'Nepovolený původ požadavku.');
 if(!request.headers.get('content-type')?.startsWith('multipart/form-data;'))return reply(415,'Nepodporovaný formát.');
 const ip=request.headers.get('CF-Connecting-IP');if(!ip)return reply(403,'Požadavek nelze ověřit.');
 const hash=(s:string)=>createHmac('sha256',e.INQUIRY_HASH_SECRET!).update(s).digest('hex');
 const now=Math.floor(Date.now()/1000),ipHash=hash(ip);
 try {
  // Atomic buckets bound even invalid requests before parsing attachments or contacting vendors.
  for(const [key,limit] of [[`attempt:global:${Math.floor(now/60)}`,120],[`attempt:${ipHash}:${Math.floor(now/60)}`,10]] as const){
   const r=await e.DB.prepare('INSERT INTO inquiry_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 WHERE count < ? RETURNING count').bind(key,now+120,limit).first();
   if(!r)throw new Rejected(429,'Příliš mnoho pokusů. Zkuste to prosím později.');
  }
  await e.DB.batch([e.DB.prepare('DELETE FROM inquiry_limits WHERE expires_at<?').bind(now),e.DB.prepare('DELETE FROM inquiry_requests WHERE created_at<?').bind(now-86400)]);
  const form=await limitedBody(request);
  if(String(form.get('website')||'').length)throw new Rejected(400,'Požadavek nelze ověřit.');
  let payload:unknown;try{payload=JSON.parse(String(form.get('payload')||''));}catch{throw new Rejected(400,'Neplatná data formuláře.');}
  const parsed=schema.safeParse(payload);
  if(!parsed.success)throw new Rejected(400,'Zkontrolujte povinná pole a e-mail.');
  const {kind,values}=parsed.data;
  const token=form.get('token');if(typeof token!=='string'||!token||token.length>2048)throw new Rejected(400,'Dokončete ověření proti spamu.');
  const verification=await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:e.TURNSTILE_SECRET_KEY,response:token,remoteip:ip}),signal:AbortSignal.timeout(10000)});
  const check=await verification.json() as {success?:boolean;hostname?:string;action?:string};
  if(!verification.ok||!check.success||check.action!=='inquiry'||check.hostname!==new URL(origin).hostname)throw new Rejected(400,'Ověření vypršelo nebo neprošlo. Zkuste ho znovu.');
  const files=form.getAll('photos');
  if(files.length>8||(kind!=='valuation'&&files.length))throw new Rejected(400,'Neplatné přílohy.');
  let total=0;const attachments:{filename:string;content:string}[]=[];const photoHashes:string[]=[];
  for(const file of files){
   if(!(file instanceof File)||!file.size)throw new Rejected(400,'Neplatná fotografie.');
   total+=file.size;if(total>maxPhotosBytes)throw new Rejected(413,'Fotografie mohou mít dohromady nejvýše 12 MB.');
   const bytes=new Uint8Array(await file.arrayBuffer()),ext=photoType(bytes);
   if(!ext||file.type!==({jpg:'image/jpeg',png:'image/png',webp:'image/webp'}[ext]))throw new Rejected(400,'Použijte fotografie JPG, PNG nebo WebP.');
   attachments.push({filename:`nemovitost-${attachments.length+1}.${ext}`,content:Buffer.from(bytes).toString('base64')});photoHashes.push(createHash('sha256').update(bytes).digest('hex'));
  }
  const emailHash=hash(values.email!.toLowerCase());
  const id=hash(JSON.stringify({kind,values,photoHashes}));
  const existing=await e.DB.prepare('SELECT status FROM inquiry_requests WHERE id=? AND created_at>?').bind(id,now-86400).first<{status:string}>();
  if(existing){if(existing.status==='sent')return Response.json({success:true},{headers:{'Cache-Control':'no-store'}});throw new Rejected(409,'Stejná poptávka už se zpracovává. Neodesílejte ji znovu; při potížích nás kontaktujte telefonicky.');}
  // One atomic INSERT enforces sliding-window and global send budgets across all locations.
  const admitted=await e.DB.prepare(`INSERT OR IGNORE INTO inquiry_requests (id,ip_hash,email_hash,status,created_at) SELECT ?,?,?,'pending',?
   WHERE (SELECT count(*) FROM inquiry_requests WHERE ip_hash=? AND created_at>?)<3
   AND (SELECT count(*) FROM inquiry_requests WHERE ip_hash=? AND created_at>?)<10
   AND (SELECT count(*) FROM inquiry_requests WHERE email_hash=? AND created_at>?)<5
   AND (SELECT count(*) FROM inquiry_requests WHERE created_at>?)<100 RETURNING id`)
   .bind(id,ipHash,emailHash,now,ipHash,now-900,ipHash,now-86400,emailHash,now-86400,now-86400).first();
  if(!admitted)throw new Rejected(429,'Limit odesílání byl dosažen. Zkuste to později nebo nás kontaktujte telefonicky.');
  const labels:Record<string,string>={name:'Jméno',email:'E-mail',phone:'Telefon',type:'Typ nemovitosti',address:'Adresa',area:'Plocha',condition:'Stav',timing:'Termín',price:'Cena',intent:'Zájem',location:'Lokalita',budget:'Rozpočet',layout:'Dispozice',topic:'Téma',description:'Popis'};
  const titles={valuation:'Nacenění zdarma',sale:'Prodej nemovitosti',rent:'Pronájem nemovitosti',search:'Hledání nemovitosti',other:'Ostatní poptávka'};
  const sent=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${e.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`inquiry-${id}`},body:JSON.stringify({from:e.INQUIRY_FROM,to:[recipient],reply_to:values.email,subject:titles[kind],text:Object.entries(values).map(([key,value])=>`${labels[key]}: ${value}`).join('\n'),...(attachments.length?{attachments}:{})}),signal:AbortSignal.timeout(20000)});
  const result=await sent.json() as {id?:string};
  if(!sent.ok||!result.id){await e.DB.prepare("UPDATE inquiry_requests SET status='failed' WHERE id=?").bind(id).run();throw new Rejected(502,'E-mailová služba žádost nepotvrdila. Kontaktujte nás prosím telefonicky.');}
  await e.DB.prepare("UPDATE inquiry_requests SET status='sent' WHERE id=?").bind(id).run();
  await e.DB.batch([e.DB.prepare('DELETE FROM inquiry_limits WHERE expires_at<?').bind(now),e.DB.prepare('DELETE FROM inquiry_requests WHERE created_at<?').bind(now-172800)]);
  return Response.json({success:true},{headers:{'Cache-Control':'no-store'}});
 }catch(error){if(error instanceof Rejected)return reply(error.status,error.message);return reply(503,'Odeslání se nepodařilo potvrdit. Neodesílejte opakovaně; kontaktujte nás prosím telefonicky.');}
}
