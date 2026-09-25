import type { Property } from './model';

export type PropertyInquiry = { name: string; email: string; phone?: string; message?: string; propertyId: string; externalId: string; propertyTitle: string; propertyUrl: string; agentId?: string | null };

/** Existing mail-based delivery. Replace this adapter if Urbium later offers a confirmed lead API. */
export function submitPropertyInquiry(inquiry: PropertyInquiry, agentEmail = 'info@realitni-agentura.cz') {
  const subject = `Poptávka – ${inquiry.propertyTitle}`;
  const body = [`Dobrý den,`, '', `mám zájem o nemovitost ${inquiry.propertyTitle}.`, inquiry.message || '', `Odkaz: ${inquiry.propertyUrl}`, `Interní ID: ${inquiry.propertyId}`, `Externí ID: ${inquiry.externalId}`, `Makléř: ${inquiry.agentId || 'neuveden'}`, '', `${inquiry.name}`, `E-mail: ${inquiry.email}`, `Telefon: ${inquiry.phone || 'neuveden'}`].join('\n');
  return `mailto:${agentEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function inquiryContext(property: Property, propertyUrl: string) {
  return { propertyId: property.id, externalId: property.externalId, propertyTitle: property.title, propertyUrl, agentId: property.agent?.id };
}
