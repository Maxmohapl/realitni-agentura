export const inquiryRecipient = 'prochazka@egpreality.cz';

const labels: Record<string, string> = {
  name: 'Jméno', email: 'E-mail', phone: 'Telefon', type: 'Typ nemovitosti',
  address: 'Adresa', area: 'Plocha', condition: 'Stav', timing: 'Termín',
  price: 'Cena', intent: 'Zájem', location: 'Lokalita', budget: 'Rozpočet',
  layout: 'Dispozice', topic: 'Téma', description: 'Popis',
};

export function prepareInquiryEmail(kind: string, values: Record<string, string>) {
  const titles: Record<string, string> = {
    valuation: 'Nacenění zdarma', sale: 'Prodej nemovitosti', rent: 'Pronájem nemovitosti',
    search: 'Hledání nemovitosti', other: 'Ostatní poptávka',
  };
  const subject = titles[kind] || 'Poptávka';
  const body = Object.entries(labels).filter(([key]) => values[key])
    .map(([key, label]) => `${label}: ${values[key]}`).join('\n');
  return `mailto:${inquiryRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
