export type ProjectSummary = {
  id: number;
  slug: string;
  name: string;
  location: string;
  description: string;
  href: string;
  thumbnail: string;
  eyebrow?: string;
  type?: string;
  surroundings?: string;
  status?: string;
  benefits?: string[];
  compact?: boolean;
};

export const projects: ProjectSummary[] = [
  {
    id: 1,
    slug: 'domy-ustin',
    name: 'Domy Ústín',
    location: 'Ústín',
    description: 'Rodinné bydlení v klidném prostředí s vlastním venkovním prostorem.',
    href: '/projekty/domy-ustin',
    thumbnail: '/projects/domy-ustin.webp',
    eyebrow: 'Rezidenční projekt',
    type: 'Rodinné domy',
    surroundings: 'Klidná obec',
    status: 'Projekt',
    benefits: ['Samostatné rodinné domy', 'Vlastní zahrada', 'Klidné rezidenční prostředí'],
    compact: true,
  },
  {
    id: 2,
    slug: 'muslovske-vinohrady',
    name: 'Mušlovské vinohrady',
    location: 'Mušlov u Mikulova',
    description: 'Výjimečné místo obklopené vinicemi a jihomoravskou krajinou v blízkosti Mikulova.',
    href: '/projekty/muslovske-vinohrady',
    thumbnail: '/projects/muslovske-vinohrady.webp',
    eyebrow: 'Projekt mezi vinicemi',
    type: 'Ubytovací projekt',
    surroundings: 'Vinice a jihomoravská krajina',
    status: 'Realizovaný projekt',
    benefits: ['Výhledy do krajiny', 'Klid mezi vinicemi', 'Mikulov na dosah'],
    compact: true,
  },
  {
    id: 3,
    slug: 'bell-house-brodek',
    name: 'Bell House',
    location: 'Brodek u Přerova',
    description: 'Moderní rezidenční projekt s promyšleným bydlením a upraveným okolím.',
    href: '/projekty/bell-house-brodek',
    thumbnail: '/projects/bell-house-brodek.webp',
    eyebrow: 'Rezidenční projekt',
    type: 'Rezidenční bydlení',
    surroundings: 'Klidná část obce',
    status: 'Projekt',
    benefits: ['Moderní architektura', 'Balkony a venkovní prostor', 'Příjemné rezidenční okolí'],
    compact: true,
  },
  {
    id: 4,
    slug: 'apartmany-ricky',
    name: 'Apartmány Říčky',
    location: 'Říčky',
    description: 'Apartmánové bydlení zasazené do klidného horského prostředí.',
    href: '/projekty/apartmany-ricky',
    thumbnail: '/projects/apartmany-ricky.webp',
    eyebrow: 'Apartmánový projekt',
    type: 'Apartmány',
    surroundings: 'Horská obec a příroda',
    status: 'Dokončený projekt',
    benefits: ['Horské prostředí', 'Výhled do krajiny', 'Příroda na dosah'],
    compact: true,
  },
  {
    id: 5,
    slug: 'penzion-lansperk',
    name: 'Penzion Lanšperk',
    location: 'Lanšperk',
    description: 'Penzion zasazený do klidného přírodního prostředí s venkovním zázemím.',
    href: '/projekty/penzion-lansperk',
    thumbnail: '/projects/penzion-lansperk.webp',
    eyebrow: 'Penzion v přírodě',
    type: 'Penzion',
    surroundings: 'Lesy a klidné okolí',
    status: 'Realizovaný projekt',
    benefits: ['Klidná poloha', 'Příroda v bezprostředním okolí', 'Venkovní zázemí'],
    compact: true,
  },
];
