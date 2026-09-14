'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  propertyCategories,
  propertyCategoryIcons,
  propertyListings,
  propertyPageSize,
} from './property-data';
import type { PropertyFilter, PropertyTransaction } from './property-data';

type PropertyListingsProps = {
  mode?: 'preview' | 'full';
};

type PriceFilter = 'all' | 'rent-20000' | 'sale-5000000' | 'sale-7000000';
type AreaFilter = 'all' | '50' | '90' | '120';
type SortFilter = 'recommended' | 'price-asc' | 'price-desc' | 'area-desc';
type TransactionFilter = 'Vše' | PropertyTransaction;

const priceOptions: Array<{ label: string; value: PriceFilter }> = [
  { label: 'Bez limitu', value: 'all' },
  { label: 'Nájem do 20 tis.', value: 'rent-20000' },
  { label: 'Prodej do 5 mil.', value: 'sale-5000000' },
  { label: 'Prodej do 7 mil.', value: 'sale-7000000' },
];

const areaOptions: Array<{ label: string; value: AreaFilter }> = [
  { label: 'Libovolná', value: 'all' },
  { label: 'od 50 m²', value: '50' },
  { label: 'od 90 m²', value: '90' },
  { label: 'od 120 m²', value: '120' },
];

const sortOptions: Array<{ label: string; value: SortFilter }> = [
  { label: 'Doporučené', value: 'recommended' },
  { label: 'Nejnižší cena', value: 'price-asc' },
  { label: 'Nejvyšší cena', value: 'price-desc' },
  { label: 'Největší plocha', value: 'area-desc' },
];

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function PropertyListings({
  mode = 'preview',
}: PropertyListingsProps) {
  const isFull = mode === 'full';
  const [activeCategory, setActiveCategory] = useState<PropertyFilter>('Vše');
  const [transaction, setTransaction] = useState<TransactionFilter>('Vše');
  const [selectedLocation, setSelectedLocation] = useState('Všechny lokality');
  const [priceLimit, setPriceLimit] = useState<PriceFilter>('all');
  const [areaLimit, setAreaLimit] = useState<AreaFilter>('all');
  const [sortBy, setSortBy] = useState<SortFilter>('recommended');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(
    isFull ? propertyPageSize + 3 : propertyPageSize,
  );

  const propertyCategoryCounts = useMemo(() => {
    return propertyCategories.reduce(
      (counts, category) => ({
        ...counts,
        [category]: propertyListings.filter(
          (property) => property.category === category,
        ).length,
      }),
      {} as Record<(typeof propertyCategories)[number], number>,
    );
  }, []);

  const locations = useMemo(() => {
    return [
      'Všechny lokality',
      ...Array.from(
        new Set(propertyListings.map((property) => property.city)),
      ).sort((a, b) => a.localeCompare(b, 'cs')),
    ];
  }, []);

  const filteredProperties = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    const minArea = areaLimit === 'all' ? 0 : Number(areaLimit);

    const filtered = propertyListings.filter((property) => {
      const matchesCategory =
        activeCategory === 'Vše' || property.category === activeCategory;
      const matchesTransaction =
        transaction === 'Vše' || property.transaction === transaction;
      const matchesLocation =
        selectedLocation === 'Všechny lokality' ||
        property.city === selectedLocation;
      const matchesArea = property.area >= minArea;
      const matchesQuery =
        !normalizedQuery ||
        normalizeText(
          `${property.title} ${property.location} ${property.metadata}`,
        ).includes(normalizedQuery);
      const matchesPrice =
        priceLimit === 'all' ||
        (priceLimit === 'rent-20000' &&
          property.transaction === 'Pronájem' &&
          property.priceValue <= 20000) ||
        (priceLimit === 'sale-5000000' &&
          property.transaction === 'Prodej' &&
          property.priceValue <= 5000000) ||
        (priceLimit === 'sale-7000000' &&
          property.transaction === 'Prodej' &&
          property.priceValue <= 7000000);

      return (
        matchesCategory &&
        matchesTransaction &&
        matchesLocation &&
        matchesArea &&
        matchesQuery &&
        matchesPrice
      );
    });

    return filtered.toSorted((first, second) => {
      if (sortBy === 'price-asc') {
        return first.priceValue - second.priceValue;
      }

      if (sortBy === 'price-desc') {
        return second.priceValue - first.priceValue;
      }

      if (sortBy === 'area-desc') {
        return second.area - first.area;
      }

      return first.id - second.id;
    });
  }, [
    activeCategory,
    areaLimit,
    priceLimit,
    query,
    selectedLocation,
    sortBy,
    transaction,
  ]);

  const previewProperties = filteredProperties.slice(0, propertyPageSize);
  const visibleProperties = isFull
    ? filteredProperties.slice(0, visibleCount)
    : previewProperties;
  const canLoadMore = isFull && visibleCount < filteredProperties.length;

  const selectCategory = (filter: PropertyFilter) => {
    setActiveCategory(filter);
    setVisibleCount(isFull ? propertyPageSize + 3 : propertyPageSize);
  };

  const resetFilters = () => {
    setActiveCategory('Vše');
    setTransaction('Vše');
    setSelectedLocation('Všechny lokality');
    setPriceLimit('all');
    setAreaLimit('all');
    setSortBy('recommended');
    setQuery('');
    setVisibleCount(propertyPageSize + 3);
  };

  return (
    <section
      className={`properties-section ${isFull ? 'properties-section--full' : 'properties-section--preview'}`}
      id="nabidka"
      aria-label="Nabídka nemovitostí"
    >
      <div className="properties-shell">
        {isFull && (
          <div className="properties-heading">
            <p>Aktuální nabídka</p>
            <h1>Všechny nemovitosti</h1>
            <span>
              Projděte si kompletní nabídku a vyfiltrujte si nemovitost podle
              typu, lokality, ceny nebo plochy.
            </span>
          </div>
        )}

        <div className="property-filters" aria-label="Filtrovat nemovitosti">
          {(['Vše', ...propertyCategories] as PropertyFilter[]).map(
            (filter) => {
              const isActive = activeCategory === filter;
              const count =
                filter === 'Vše'
                  ? propertyListings.length
                  : propertyCategoryCounts[filter];

              return (
                <button
                  className={`property-filter ${isActive ? 'property-filter--active' : ''}`}
                  type="button"
                  aria-pressed={isActive}
                  key={filter}
                  onClick={() => selectCategory(filter)}
                >
                  {filter !== 'Vše' && (
                    <img src={propertyCategoryIcons[filter]} alt="" />
                  )}
                  <span>{filter}</span>
                  <small>{count}</small>
                </button>
              );
            },
          )}
        </div>

        {isFull && (
          <div className="advanced-filters">
            <label className="filter-search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Hledat v nabídce</span>
              <input
                type="search"
                placeholder="Hledat lokalitu, dispozici nebo typ"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <label className="filter-field">
              <span>Typ nabídky</span>
              <select
                value={transaction}
                onChange={(event) =>
                  setTransaction(event.target.value as TransactionFilter)
                }
              >
                <option>Vše</option>
                <option>Prodej</option>
                <option>Pronájem</option>
              </select>
            </label>

            <label className="filter-field">
              <span>Lokalita</span>
              <select
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
              >
                {locations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </label>

            <label className="filter-field">
              <span>Cena</span>
              <select
                value={priceLimit}
                onChange={(event) =>
                  setPriceLimit(event.target.value as PriceFilter)
                }
              >
                {priceOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter-field">
              <span>Plocha</span>
              <select
                value={areaLimit}
                onChange={(event) =>
                  setAreaLimit(event.target.value as AreaFilter)
                }
              >
                {areaOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter-field">
              <span>Řadit podle</span>
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortFilter)
                }
              >
                {sortOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="filters-reset"
              type="button"
              onClick={resetFilters}
            >
              <X size={17} aria-hidden="true" />
              Vyčistit
            </button>
          </div>
        )}

        <div className="properties-resultbar">
          <span>
            {isFull
              ? `${filteredProperties.length} nalezených nabídek`
              : `Ukázka ${visibleProperties.length} z ${propertyListings.length} nabídek`}
          </span>
          {isFull && (
            <strong>
              <SlidersHorizontal size={17} aria-hidden="true" />
              Rozšířené filtry
            </strong>
          )}
        </div>

        <div className="properties-grid">
          {visibleProperties.map((property, index) => (
            <article
              className="property-card"
              key={`${activeCategory}-${property.id}`}
              style={
                {
                  '--property-delay': `${Math.min(index, 8) * 55}ms`,
                } as CSSProperties
              }
            >
              <div className="property-card__media">
                <img src={property.image} alt={property.title} />
                <span className="property-card__badge">
                  {property.transaction}
                </span>
                <button
                  className="property-card__favorite"
                  type="button"
                  aria-label={`Přidat do oblíbených: ${property.title}`}
                >
                  <img src="/assets/realitni/icon_favorite_heart.png" alt="" />
                </button>
              </div>

              <div className="property-card__body">
                <h3>{property.title}</h3>
                <p className="property-card__location">
                  <img src="/assets/realitni/icon_location_pin.png" alt="" />
                  <span>{property.location}</span>
                </p>
                <p className="property-card__meta">{property.metadata}</p>
                <p className="property-card__price">{property.price}</p>
              </div>
            </article>
          ))}
        </div>

        {visibleProperties.length === 0 && (
          <div className="properties-empty">
            <h2>Nic jsme nenašli</h2>
            <p>Zkuste ubrat některý filtr nebo vyčistit zadání.</p>
            <button
              className="filters-reset"
              type="button"
              onClick={resetFilters}
            >
              <X size={17} aria-hidden="true" />
              Vyčistit filtry
            </button>
          </div>
        )}

        <div className="properties-actions">
          <p>
            Zobrazeno {visibleProperties.length} z {filteredProperties.length}{' '}
            nabídek
          </p>
          {canLoadMore && (
            <button
              className="properties-load"
              type="button"
              onClick={() =>
                setVisibleCount((current) =>
                  Math.min(
                    current + propertyPageSize,
                    filteredProperties.length,
                  ),
                )
              }
            >
              Načíst další nabídky
              <ArrowDown size={17} aria-hidden="true" />
            </button>
          )}
          {!isFull && (
            <a
              className="properties-link properties-link--bottom"
              href="/nabidka"
            >
              Zobrazit celou nabídku
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <img
        className="properties-cityline"
        src="/assets/realitni/01_city_olomouc_lineart.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="properties-slogan"
        src="/assets/realitni/02_slogan_vas_domov_nase_starost.png"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}
