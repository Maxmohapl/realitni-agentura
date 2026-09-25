import { z } from 'zod';

export const PROPERTY_SOURCE = { URBIUM: 'urbium', LEGACY: 'legacy' } as const;
export const TRANSACTION_TYPE = { SALE: 'SALE', RENT: 'RENT' } as const;
export const PROPERTY_TYPE = {
  APARTMENT: 'APARTMENT', HOUSE: 'HOUSE', LAND: 'LAND', COMMERCIAL: 'COMMERCIAL',
  OTHER: 'OTHER', PROJECT: 'PROJECT',
} as const;
export const PROPERTY_STATUS = {
  ACTIVE: 'ACTIVE', RESERVED: 'RESERVED', SOLD: 'SOLD', RENTED: 'RENTED',
  UNPUBLISHED: 'UNPUBLISHED', ARCHIVED: 'ARCHIVED',
} as const;

export type TransactionType = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE];
export type PropertyType = typeof PROPERTY_TYPE[keyof typeof PROPERTY_TYPE];
export type PropertyStatus = typeof PROPERTY_STATUS[keyof typeof PROPERTY_STATUS];

const optionalNumber = z.number().finite().nonnegative().nullable().optional();
const optionalText = z.string().trim().max(50_000).nullable().optional();

export const propertySchema = z.object({
  id: z.string().min(1), externalId: z.string().min(1),
  source: z.enum([PROPERTY_SOURCE.URBIUM, PROPERTY_SOURCE.LEGACY]),
  title: z.string().trim().min(1).max(300), slug: z.string().trim().min(1).max(300),
  transactionType: z.enum([TRANSACTION_TYPE.SALE, TRANSACTION_TYPE.RENT]),
  propertyType: z.enum(Object.values(PROPERTY_TYPE) as [PropertyType, ...PropertyType[]]),
  subtype: optionalText, disposition: optionalText,
  status: z.enum(Object.values(PROPERTY_STATUS) as [PropertyStatus, ...PropertyStatus[]]),
  price: optionalNumber, currency: z.string().trim().length(3).default('CZK'),
  priceNote: optionalText, pricePerM2: optionalNumber,
  shortDescription: optionalText, description: optionalText,
  location: z.object({
    country: optionalText, region: optionalText, district: optionalText,
    city: optionalText, cityPart: optionalText, street: optionalText,
    houseNumber: optionalText, zip: optionalText,
    latitude: z.number().finite().min(-90).max(90).nullable().optional(),
    longitude: z.number().finite().min(-180).max(180).nullable().optional(),
  }),
  areas: z.object({
    usableArea: optionalNumber, floorArea: optionalNumber, landArea: optionalNumber,
    builtUpArea: optionalNumber, balconyArea: optionalNumber, terraceArea: optionalNumber,
    gardenArea: optionalNumber, cellarArea: optionalNumber,
  }),
  constructionType: optionalText, condition: optionalText, ownershipType: optionalText,
  energyRating: optionalText, floor: z.number().int().nullable().optional(),
  floorsTotal: z.number().int().positive().nullable().optional(),
  elevator: z.boolean().nullable().optional(), parking: z.boolean().nullable().optional(),
  garage: z.boolean().nullable().optional(),
  features: z.array(z.string().trim().min(1)).default([]),
  equipment: z.array(z.string().trim().min(1)).default([]),
  images: z.array(z.object({
    url: z.string().url(), alt: optionalText, order: z.number().int().nonnegative(), cover: z.boolean(),
  })).default([]),
  videos: z.array(z.string().url()).default([]),
  virtualTours: z.array(z.string().url()).default([]),
  agent: z.object({ id: optionalText, name: optionalText, phone: optionalText, email: z.string().email().nullable().optional(), photo: z.string().url().or(z.string().startsWith('/')).nullable().optional() }).nullable().optional(),
  branch: optionalText,
  createdAt: z.string().datetime().nullable().optional(), updatedAt: z.string().datetime().nullable().optional(),
  publishedAt: z.string().datetime().nullable().optional(), lastSeenAt: z.string().datetime().nullable().optional(),
});

export type Property = z.infer<typeof propertySchema>;

export const transactionLabels: Record<TransactionType, string> = { SALE: 'Prodej', RENT: 'Pronájem' };
export const propertyTypeLabels: Record<PropertyType, string> = {
  APARTMENT: 'Byty', HOUSE: 'Domy', LAND: 'Pozemky', COMMERCIAL: 'Komerční',
  OTHER: 'Ostatní', PROJECT: 'Projekty',
};
export const propertyStatusLabels: Record<PropertyStatus, string> = {
  ACTIVE: 'Aktivní', RESERVED: 'Rezervováno', SOLD: 'Prodáno', RENTED: 'Pronajato',
  UNPUBLISHED: 'Nezveřejněno', ARCHIVED: 'Archivováno',
};

export function primaryArea(property: Property) {
  return property.areas.usableArea ?? property.areas.floorArea ?? property.areas.landArea ?? 0;
}

export function primaryImage(property: Property) {
  return [...property.images].sort((a, b) => Number(b.cover) - Number(a.cover) || a.order - b.order)[0];
}

export function isPublicProperty(property: Property) {
  return [PROPERTY_STATUS.ACTIVE, PROPERTY_STATUS.RESERVED].includes(property.status as 'ACTIVE' | 'RESERVED');
}
