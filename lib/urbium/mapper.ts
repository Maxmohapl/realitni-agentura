import sanitizeHtml from 'sanitize-html';
import { PROPERTY_SOURCE, PROPERTY_STATUS, PROPERTY_TYPE, TRANSACTION_TYPE, propertySchema, type Property } from '@/lib/properties/model';
import type { MockUrbiumImage, MockUrbiumListing } from './types';

const array = <T>(value?: T | T[]) => value == null ? [] : Array.isArray(value) ? value : [value];
const number = (value?: string) => { if (!value?.trim()) return null; const parsed = Number(value.replace(/\s/g, '').replace(',', '.')); return Number.isFinite(parsed) ? parsed : null; };
const boolean = (value?: string) => value == null ? null : ['true', '1', 'ano', 'yes'].includes(value.toLowerCase()) ? true : ['false', '0', 'ne', 'no'].includes(value.toLowerCase()) ? false : null;
const date = (value?: string) => value && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null;
const text = (value?: string) => value ? sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim() || null : null;
const slugify = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const typeMap: Record<string, Property['propertyType']> = { apartment: PROPERTY_TYPE.APARTMENT, house: PROPERTY_TYPE.HOUSE, land: PROPERTY_TYPE.LAND, commercial: PROPERTY_TYPE.COMMERCIAL, other: PROPERTY_TYPE.OTHER, project: PROPERTY_TYPE.PROJECT };
const statusMap: Record<string, Property['status']> = { active: PROPERTY_STATUS.ACTIVE, reserved: PROPERTY_STATUS.RESERVED, sold: PROPERTY_STATUS.SOLD, rented: PROPERTY_STATUS.RENTED, unpublished: PROPERTY_STATUS.UNPUBLISHED, archived: PROPERTY_STATUS.ARCHIVED };

function images(input?: { image?: MockUrbiumImage | MockUrbiumImage[] }) {
  const seen = new Set<string>();
  return array(input?.image).map((image, index) => ({ url: image.url, alt: text(image.alt), order: number(image.order) ?? index, cover: boolean(image.cover) ?? index === 0 }))
    .filter((image) => { try { new URL(image.url); } catch { return false; } if (seen.has(image.url)) return false; seen.add(image.url); return true; })
    .toSorted((a, b) => a.order - b.order);
}

/** MAIN MAPPING POINT: replace these temporary mock field names when the official Urbium schema arrives. */
export function mapUrbiumListingToProperty(listing: MockUrbiumListing, now = new Date()): Property {
  const externalId = String(listing.id || '').trim();
  const title = text(listing.title) || '';
  const mapped = {
    id: `urbium:${externalId}`, externalId, source: PROPERTY_SOURCE.URBIUM,
    title, slug: `${slugify(title)}-${slugify(externalId)}`,
    transactionType: listing.transaction?.toLowerCase() === 'rent' ? TRANSACTION_TYPE.RENT : TRANSACTION_TYPE.SALE,
    propertyType: typeMap[listing.type.toLowerCase()] ?? PROPERTY_TYPE.OTHER,
    subtype: text(listing.subtype), disposition: text(listing.disposition),
    status: listing.status ? statusMap[listing.status.toLowerCase()] ?? PROPERTY_STATUS.ACTIVE : PROPERTY_STATUS.ACTIVE,
    price: number(listing.price), currency: listing.currency?.toUpperCase() || 'CZK', priceNote: text(listing.priceNote), pricePerM2: null,
    shortDescription: text(listing.shortDescription), description: text(listing.description),
    location: { country: text(listing.location?.country), region: text(listing.location?.region), district: text(listing.location?.district), city: text(listing.location?.city), cityPart: text(listing.location?.cityPart), street: text(listing.location?.street), houseNumber: text(listing.location?.houseNumber), zip: text(listing.location?.zip), latitude: number(listing.location?.latitude), longitude: number(listing.location?.longitude) },
    areas: { usableArea: number(listing.areas?.usableArea), floorArea: number(listing.areas?.floorArea), landArea: number(listing.areas?.landArea), builtUpArea: number(listing.areas?.builtUpArea), balconyArea: number(listing.areas?.balconyArea), terraceArea: number(listing.areas?.terraceArea), gardenArea: number(listing.areas?.gardenArea), cellarArea: number(listing.areas?.cellarArea) },
    constructionType: text(listing.constructionType), condition: text(listing.condition), ownershipType: text(listing.ownershipType), energyRating: text(listing.energyRating),
    floor: number(listing.floor), floorsTotal: number(listing.floorsTotal), elevator: boolean(listing.elevator), parking: boolean(listing.parking), garage: boolean(listing.garage),
    features: array(listing.features?.feature).map(String).map((v) => text(v)).filter(Boolean), equipment: array(listing.equipment?.item).map(String).map((v) => text(v)).filter(Boolean),
    images: images(listing.images), videos: array(listing.videos?.video).filter((v) => { try { new URL(v); return true; } catch { return false; } }), virtualTours: array(listing.virtualTours?.tour).filter((v) => { try { new URL(v); return true; } catch { return false; } }),
    agent: listing.agent ? { id: text(listing.agent.id), name: text(listing.agent.name), phone: text(listing.agent.phone), email: listing.agent.email || null, photo: listing.agent.photo || null } : null,
    branch: text(listing.branch), createdAt: date(listing.createdAt), updatedAt: date(listing.updatedAt), publishedAt: date(listing.publishedAt), lastSeenAt: now.toISOString(),
  };
  return propertySchema.parse(mapped);
}

export const conversions = { number, boolean, date };
