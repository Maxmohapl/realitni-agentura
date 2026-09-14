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

export const propertyListings: PropertyListing[] = [
  {
    id: 1,
    title: 'Pronájem bytu 3+1, 94 m²',
    location: 'Ruda nad Moravou - Hrabenov',
    city: 'Ruda nad Moravou',
    category: 'Byty',
    metadata: 'Byt | 94 m² | 3+1',
    price: '15 000 Kč/měsíc',
    priceValue: 15000,
    transaction: 'Pronájem',
    area: 94,
    rooms: '3+1',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Rodinný dům 5+1, 160 m²',
    location: 'Sudkov',
    city: 'Sudkov',
    category: 'Domy',
    metadata: 'Dům | 160 m² | 5+1',
    price: '5 490 000 Kč',
    priceValue: 5490000,
    transaction: 'Prodej',
    area: 160,
    rooms: '5+1',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Pronájem bytu 2+kk, 48 m²',
    location: 'Lazebnická, Mohelnice',
    city: 'Mohelnice',
    category: 'Byty',
    metadata: 'Byt | 48 m² | 2+kk',
    price: '11 000 Kč/měsíc',
    priceValue: 11000,
    transaction: 'Pronájem',
    area: 48,
    rooms: '2+kk',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Byt 2+kk, 50 m²',
    location: 'Olomouc - Nové Sady',
    city: 'Olomouc',
    category: 'Byty',
    metadata: 'Byt | 50 m² | 2+kk',
    price: '4 790 000 Kč',
    priceValue: 4790000,
    transaction: 'Prodej',
    area: 50,
    rooms: '2+kk',
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    title: 'Pronájem bytu 3+kk, 70 m²',
    location: 'Olomouc - Povel',
    city: 'Olomouc',
    category: 'Byty',
    metadata: 'Byt | 70 m² | 3+kk',
    price: '18 500 Kč/měsíc',
    priceValue: 18500,
    transaction: 'Pronájem',
    area: 70,
    rooms: '3+kk',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    title: 'Stavební pozemek 969 m²',
    location: 'Dolany u Olomouce',
    city: 'Dolany u Olomouce',
    category: 'Pozemky',
    metadata: 'Pozemek | 969 m²',
    price: '3 990 000 Kč',
    priceValue: 3990000,
    transaction: 'Prodej',
    area: 969,
    rooms: 'Pozemek',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    title: 'Kancelářské prostory 112 m²',
    location: 'Olomouc - centrum',
    city: 'Olomouc',
    category: 'Komerční',
    metadata: 'Komerční | 112 m² | kanceláře',
    price: '29 000 Kč/měsíc',
    priceValue: 29000,
    transaction: 'Pronájem',
    area: 112,
    rooms: 'Kanceláře',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    title: 'Novostavba domu 4+kk',
    location: 'Velká Bystřice',
    city: 'Velká Bystřice',
    category: 'Projekty',
    metadata: 'Projekt | 128 m² | 4+kk',
    price: 'od 7 850 000 Kč',
    priceValue: 7850000,
    transaction: 'Prodej',
    area: 128,
    rooms: '4+kk',
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 9,
    title: 'Řadový dům se zahradou',
    location: 'Litovel',
    city: 'Litovel',
    category: 'Domy',
    metadata: 'Dům | 142 m² | 4+1',
    price: '6 290 000 Kč',
    priceValue: 6290000,
    transaction: 'Prodej',
    area: 142,
    rooms: '4+1',
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 10,
    title: 'Garážové stání v rezidenci',
    location: 'Olomouc - Neředín',
    city: 'Olomouc',
    category: 'Ostatní',
    metadata: 'Ostatní | 18 m² | garážové stání',
    price: '590 000 Kč',
    priceValue: 590000,
    transaction: 'Prodej',
    area: 18,
    rooms: 'Garáž',
    image:
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 11,
    title: 'Pozemek pro rodinný dům',
    location: 'Bohuňovice',
    city: 'Bohuňovice',
    category: 'Pozemky',
    metadata: 'Pozemek | 1 184 m²',
    price: '4 650 000 Kč',
    priceValue: 4650000,
    transaction: 'Prodej',
    area: 1184,
    rooms: 'Pozemek',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 12,
    title: 'Obchodní prostor u hlavní třídy',
    location: 'Šumperk',
    city: 'Šumperk',
    category: 'Komerční',
    metadata: 'Komerční | 86 m² | obchod',
    price: '21 500 Kč/měsíc',
    priceValue: 21500,
    transaction: 'Pronájem',
    area: 86,
    rooms: 'Obchod',
    image:
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=900&q=80',
  },
];
