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
  Byty: '/assets/realitni/icon_filter_byty.png',
  Domy: '/assets/realitni/icon_filter_domy.png',
  Pozemky: '/assets/realitni/icon_filter_pozemky.png',
  Komerční: '/assets/realitni/icon_filter_komercni.png',
  Ostatní: '/assets/realitni/icon_filter_ostatni.png',
  Projekty: '/assets/realitni/icon_filter_projekty.png',
};

// Reálné nabídky se načítají výhradně ze synchronizace Urbium.
export const propertyListings: PropertyListing[] = [];

