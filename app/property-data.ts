export type PropertyCategory =
  | 'Byty'
  | 'Domy'
  | 'Pozemky'
  | 'Komerční'
  | 'Ostatní'
  | 'Projekty';

export type PropertyTransaction = 'Prodej' | 'Pronájem';
export type PropertyFilter = 'Vše' | PropertyCategory;

export type PropertyListing = {
  id: number;
  title: string;
  location: string;
  city: string;
  category: PropertyCategory;
  metadata: string;
  price: string;
  priceValue: number;
  transaction: PropertyTransaction;
  area: number;
  rooms: string;
  image: string;
};

export const propertyPageSize = 6;

export const propertyCategories: PropertyCategory[] = [
  'Byty',
  'Domy',
  'Pozemky',
  'Komerční',
  'Ostatní',
  'Projekty',
];

export const propertyCategoryIcons: Record<PropertyCategory, string> = {
  Byty: '/assets/realitni/icon_filter_byty.webp',
  Domy: '/assets/realitni/icon_filter_domy.webp',
  Pozemky: '/assets/realitni/icon_filter_pozemky.webp',
  Komerční: '/assets/realitni/icon_filter_komercni.webp',
  Ostatní: '/assets/realitni/icon_filter_ostatni.webp',
  Projekty: '/assets/realitni/icon_filter_projekty.webp',
};

// Reálné nabídky se načítají výhradně ze synchronizace Urbium.
export const propertyListings: PropertyListing[] = [];

