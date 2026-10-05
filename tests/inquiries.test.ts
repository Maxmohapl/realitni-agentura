import {test} from 'node:test';
import assert from 'node:assert/strict';
import {schema,photoType,handleInquiry,type InquiryEnv} from '../lib/inquiries/service';
test('questionnaires validate required fields and reject injected recipient',()=>{
 assert.equal(schema.safeParse({kind:'other',values:{name:'Test',email:'a@example.com',topic:'Dotaz',description:'Text'}}).success,true);
 assert.equal(schema.safeParse({kind:'valuation',values:{name:'Test',email:'a@example.com'}}).success,false);
 assert.equal(schema.safeParse({kind:'other',values:{name:'Test',email:'a@example.com\r\nBcc:x@example.com',topic:'Dotaz',description:'Text'}}).success,false);
 assert.equal(schema.safeParse({kind:'other',values:{name:'Test',email:'a@example.com',topic:'Dotaz',description:'Text',to:'attacker@example.com'}}).success,false);
});
test('attachments reject executable content disguised as an image',()=>{assert.equal(photoType(new TextEncoder().encode('<script>bad</script>')),null);});
test('unconfigured delivery fails closed without sending',async()=>{let calls=0;const result=await handleInquiry(new Request('https://example.com/api/inquiries',{method:'POST'}),{} as InquiryEnv,async()=>{calls++;throw Error('must not send');});assert.equal(result.status,503);assert.equal(calls,0);});
function environment(){
 const db={prepare:(sql:string)=>{const statement={bind:()=>statement,first:async()=>sql.startsWith('SELECT')?null:{id:'ok'},run:async()=>({success:true})};return statement;},batch:async()=>[]};
 return {DB:db,INQUIRIES_ENABLED:'true',TURNSTILE_SITE_KEY:'site',TURNSTILE_SECRET_KEY:'secret',RESEND_API_KEY:'secret',INQUIRY_FROM:'web@example.com',INQUIRY_HASH_SECRET:'a'.repeat(32),INQUIRY_ORIGINS:'https://example.com'} as unknown as InquiryEnv;
}
function request(){const data=new FormData();data.set('payload',JSON.stringify({kind:'other',values:{name:'Test',email:'customer@example.com',topic:'Dotaz',description:'Test'}}));data.set('token','token');return new Request('https://example.com/api/inquiries',{method:'POST',headers:{origin:'https://example.com','CF-Connecting-IP':'192.0.2.1'},body:data});}
test('valid submission sends only to fixed recipient',async()=>{
 let calls=0;const mock=(async(_url:unknown,options:RequestInit)=>{calls++;if(calls===1)return Response.json({success:true,hostname:'example.com',action:'inquiry'});const body=JSON.parse(String(options.body));assert.deepEqual(body.to,['prochazka@egpreality.cz']);assert.equal(body.reply_to,'customer@example.com');assert.ok((options.headers as Record<string,string>)['Idempotency-Key']);return Response.json({id:'message-id'});}) as typeof fetch;
 const response=await handleInquiry(request(),environment(),mock);assert.equal(response.status,200);assert.equal(calls,2);
});
test('wrong Turnstile hostname never reaches email provider',async()=>{
 let calls=0;const response=await handleInquiry(request(),environment(),(async()=>{calls++;return Response.json({success:true,hostname:'attacker.example',action:'inquiry'});}) as typeof fetch);assert.equal(response.status,400);assert.equal(calls,1);
});
test('provider rejection is not reported as success',async()=>{
 let calls=0;const response=await handleInquiry(request(),environment(),(async()=>++calls===1?Response.json({success:true,hostname:'example.com',action:'inquiry'}):Response.json({error:'unavailable'},{status:503})) as typeof fetch);assert.equal(response.status,502);
});
