import { propertyListings } from '@/app/property-data';
import { PROPERTY_SOURCE, PROPERTY_STATUS, PROPERTY_TYPE, TRANSACTION_TYPE, type Property } from './model';

const categoryMap = {
  Byty: PROPERTY_TYPE.APARTMENT, Domy: PROPERTY_TYPE.HOUSE, Pozemky: PROPERTY_TYPE.LAND,
  Komerční: PROPERTY_TYPE.COMMERCIAL, Ostatní: PROPERTY_TYPE.OTHER, Projekty: PROPERTY_TYPE.PROJECT,
} as const;

function slugify(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const legacyProperties: Property[] = propertyListings.map((listing) => ({
  id: `legacy:${listing.id}`, externalId: String(listing.id), source: PROPERTY_SOURCE.LEGACY,
  title: listing.title, slug: `${slugify(listing.title)}-${listing.id}`,
  transactionType: listing.transaction === 'Prodej' ? TRANSACTION_TYPE.SALE : TRANSACTION_TYPE.RENT,
  propertyType: categoryMap[listing.category], disposition: listing.rooms,
  status: PROPERTY_STATUS.ACTIVE, price: listing.priceValue, currency: 'CZK',
  priceNote: listing.price.includes('měsíc') ? 'za měsíc' : listing.price.startsWith('od ') ? 'od' : null,
  shortDescription: `${listing.metadata} v lokalitě ${listing.location}.`,
  description: `Více informací o nemovitosti „${listing.title}“ vám rádi sdělíme osobně. Kontaktujte nás a domluvte si prohlídku.`,
  location: { country: 'Česko', city: listing.city, cityPart: listing.location },
  areas: { usableArea: listing.category === 'Pozemky' ? null : listing.area, landArea: listing.category === 'Pozemky' ? listing.area : null },
  features: [], equipment: [],
  images: [{ url: listing.image, alt: listing.title, order: 0, cover: true }],
  videos: [], virtualTours: [],
  agent: { id: 'radek-mezl', name: 'Bc. Radek Mézl', phone: '+420 734 760 779', email: 'radek.mezl@realitni-agentura.cz', photo: '/images/team/radek-mezl.png' },
  branch: 'Olomouc',
}));
