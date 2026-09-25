import { primaryArea, type Property, type PropertyStatus, type PropertyType, type TransactionType } from './model';

export type PropertyQuery = {
  transactionType?: TransactionType; propertyType?: PropertyType; disposition?: string;
  city?: string; minPrice?: number; maxPrice?: number; minArea?: number; maxArea?: number;
  status?: PropertyStatus; sort?: 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';
};

export function queryProperties(properties: Property[], query: PropertyQuery = {}) {
  const filtered = properties.filter((property) =>
    (!query.transactionType || property.transactionType === query.transactionType) &&
    (!query.propertyType || property.propertyType === query.propertyType) &&
    (!query.disposition || property.disposition === query.disposition) &&
    (!query.city || property.location.city === query.city) &&
    (query.minPrice == null || (property.price ?? 0) >= query.minPrice) &&
    (query.maxPrice == null || (property.price ?? Infinity) <= query.maxPrice) &&
    (query.minArea == null || primaryArea(property) >= query.minArea) &&
    (query.maxArea == null || primaryArea(property) <= query.maxArea) &&
    (!query.status || property.status === query.status));
  const sort = query.sort ?? 'newest';
  return filtered.toSorted((a, b) => {
    if (sort === 'price-asc') return (a.price ?? Infinity) - (b.price ?? Infinity);
    if (sort === 'price-desc') return (b.price ?? -Infinity) - (a.price ?? -Infinity);
    if (sort === 'area-asc') return primaryArea(a) - primaryArea(b);
    if (sort === 'area-desc') return primaryArea(b) - primaryArea(a);
    const aTime = Date.parse(a.publishedAt ?? a.createdAt ?? '1970-01-01');
    const bTime = Date.parse(b.publishedAt ?? b.createdAt ?? '1970-01-01');
    return sort === 'oldest' ? aTime - bTime : bTime - aTime;
  });
}
