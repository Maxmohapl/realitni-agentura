import { validInput, gpfPayload, parseOffers, cheapestOffer, type QuoteInput } from '@/lib/finance/gpf';
export async function POST(request: Request) {
 const headers = { 'Cache-Control':'no-store' };
 if (Number(request.headers.get('content-length')) > 2048) return Response.json({error:'Příliš velký požadavek.'},{status:413,headers});
 let input: QuoteInput;
 try { const body=await request.text(); if(body.length>2048) throw new Error(); input=JSON.parse(body); } catch { return Response.json({error:'Neplatný požadavek.'},{status:400,headers}); }
 if(!validInput(input)) return Response.json({error:'Zkontrolujte parametry úvěru.'},{status:400,headers});
 try {
  const response=await fetch('https://www.gpf.cz/calculator',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(gpfPayload(input)),signal:AbortSignal.timeout(15000),cache:'no-store'});
  if(!response.ok) throw new Error();
  const offers=parseOffers(await response.json());
  return Response.json({offers,best:cheapestOffer(offers)}, {headers});
 } catch { return Response.json({error:'Výpočet GPF je nyní nedostupný. Zkuste to prosím znovu.'},{status:502,headers}); }
}
