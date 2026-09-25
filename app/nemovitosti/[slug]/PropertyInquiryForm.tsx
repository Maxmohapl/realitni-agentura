'use client';
import { useState } from 'react';
import { submitPropertyInquiry, type PropertyInquiry } from '@/lib/properties/inquiry';

export default function PropertyInquiryForm({ context, agentEmail }: { context: Omit<PropertyInquiry, 'name' | 'email' | 'phone' | 'message'>; agentEmail?: string | null }) {
  const [prepared, setPrepared] = useState(false);
  return <form className="property-inquiry" onSubmit={(event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    window.location.href = submitPropertyInquiry({ ...context, name: String(form.get('name') || ''), email: String(form.get('email') || ''), phone: String(form.get('phone') || ''), message: String(form.get('message') || '') }, agentEmail || undefined);
    setPrepared(true);
  }}>
    <h2>Mám zájem o nemovitost</h2>
    <label>Jméno a příjmení<input name="name" autoComplete="name" required /></label>
    <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
    <label>Telefon<input name="phone" type="tel" autoComplete="tel" /></label>
    <label>Zpráva<textarea name="message" rows={4} defaultValue={`Dobrý den, mám zájem o nemovitost ${context.propertyTitle}.`} /></label>
    <button className="properties-load" type="submit">Připravit e-mail</button>
    <p className="property-inquiry__note">Tlačítko otevře připravenou zprávu ve vaší e-mailové aplikaci. Odeslání potvrdíte sami.</p>
    {prepared && <p role="status">Zpráva je připravená ve vaší e-mailové aplikaci.</p>}
  </form>;
}
