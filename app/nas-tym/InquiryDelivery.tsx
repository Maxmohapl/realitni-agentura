'use client';
import InquiryPrivacyNotice from '@/components/InquiryPrivacyNotice';
import { useEffect, useRef, useState } from 'react';
import { inquiryRecipient, prepareInquiryEmail } from '@/lib/inquiries/message';

type Widget = { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void; reset: (id: string) => void };
declare global { interface Window { turnstile?: Widget } }

export default function InquiryDelivery({ kind, values, photos = [] }: { kind: string; values?: Record<string, string>; photos?: File[] }) {
 const host = useRef<HTMLDivElement>(null), widget = useRef<string | undefined>(undefined), lock = useRef(false);
 const [token, setToken] = useState(''), [enabled, setEnabled] = useState(false), [configured, setConfigured] = useState(false);
 const [busy, setBusy] = useState(false), [sent, setSent] = useState(false), [message, setMessage] = useState('');
 useEffect(() => {
  let cancelled = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  fetch('/api/inquiries/config', { signal: controller.signal })
   .then(response => { if (!response.ok) throw new Error(); return response.json() as Promise<{ enabled: boolean; siteKey: string | null }>; })
   .then(config => {
    if (cancelled) return;
    if (!config.enabled || !config.siteKey) return;
    setEnabled(true);
    if (!document.querySelector('script[data-inquiry-turnstile]')) {
     const script = document.createElement('script');
     script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
     script.async = true; script.dataset.inquiryTurnstile = 'true'; document.head.appendChild(script);
    }
    let ticks = 0;
    timer = setInterval(() => {
     if (cancelled) return;
     if (window.turnstile && host.current) {
      clearInterval(timer);
      widget.current = window.turnstile.render(host.current, {
       sitekey: config.siteKey, action: 'inquiry', size: 'flexible',
       callback: (value: string) => setToken(value), 'expired-callback': () => setToken(''),
       'error-callback': () => { setToken(''); setMessage('Ověření se nepodařilo. Obnovte stránku nebo nám napište e-mailem.'); },
      });
     } else if (++ticks > 100) { clearInterval(timer); setMessage('Ověření se nenačetlo. Obnovte stránku nebo nám napište e-mailem.'); }
    }, 100);
   })
   .catch(() => { /* An unavailable delivery service still leaves the email fallback usable. */ })
   .finally(() => { clearTimeout(timeout); if (!cancelled) setConfigured(true); });
  return () => { cancelled = true; controller.abort(); clearTimeout(timeout); clearInterval(timer); if (widget.current) window.turnstile?.remove(widget.current); };
 }, []);
 return <div className="inquiry-delivery">
  <div ref={host} />
  <label style={{ position: 'absolute', left: '-10000px' }} aria-hidden="true">Web<input name="website" tabIndex={-1} autoComplete="off" /></label>
  {configured && !enabled && <p className="team-inquiry-form__hint">Tlačítko připraví zprávu ve vaší poštovní aplikaci. Odeslání v ní potvrdíte sami.{photos.length > 0 && ' Vybrané fotografie přiložte v poštovní aplikaci ručně.'}</p>}
  <button type="button" className="about-button" disabled={!configured || (enabled && !token) || busy || sent} onClick={async event => {
   const form = event.currentTarget.closest('form'); if (!form || !form.reportValidity() || lock.current) return;
   const fields = new FormData(form);
   const field = (key: string) => { const value = fields.get(key); return typeof value === 'string' ? value : ''; };
   const payload = values || Object.fromEntries(['name', 'email', 'phone', 'address', 'description'].map(key => [key, field(key)]));
   if (!enabled) {
    window.location.href = prepareInquiryEmail(kind, payload);
    setMessage('Dokončete odeslání v poštovní aplikaci. Pokud se neotevřela, napište nám na níže uvedený e-mail.');
    return;
   }
   lock.current = true; setBusy(true); setMessage('');
   const body = new FormData(); body.set('payload', JSON.stringify({ kind, values: payload })); body.set('token', token); body.set('website', field('website'));
   photos.forEach(photo => body.append('photos', photo));
   try {
    const response = await fetch('/api/inquiries', { method: 'POST', body });
    const result = await response.json() as { success?: boolean; error?: string };
    if (!response.ok || !result.success) throw new Error(result.error || 'Odeslání nebylo potvrzeno. Kontaktujte nás e-mailem.');
    setSent(true); setMessage('Děkujeme, poptávka byla odeslána. Ozveme se vám na uvedený kontakt.');
   } catch (error) { setMessage(error instanceof Error ? error.message : 'Odeslání nebylo potvrzeno. Kontaktujte nás e-mailem.'); }
   finally { lock.current = false; setBusy(false); setToken(''); if (widget.current) window.turnstile?.reset(widget.current); }
  }}>{!configured ? 'Načítám formulář…' : busy ? 'Odesílám…' : sent ? 'Odesláno' : enabled ? 'Odeslat poptávku' : 'Připravit e-mail'}</button>
  <InquiryPrivacyNotice />
  {message && <output style={{ display: 'block' }}>{message}</output>}
  <p className="team-inquiry-form__hint">Kontakt: <a href={`mailto:${inquiryRecipient}`}>{inquiryRecipient}</a></p>
 </div>;
}
