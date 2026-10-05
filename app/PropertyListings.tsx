'use client';
import OptimizedImage from '@/components/OptimizedImage';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowDown,
  SlidersHorizontal,
  ArrowRight,
  X,
} from 'lucide-react';
import {
  propertyCategories,
  propertyCategoryIcons,
  propertyPageSize,
} from './property-data';
import type { PropertyFilter, PropertyTransaction } from './property-data';
import { legacyProperties } from '@/lib/properties/legacy';
import { primaryArea, primaryImage, propertyTypeLabels, transactionLabels, type Property } from '@/lib/properties/model';

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

export default function PropertyListings({
  mode = 'preview',
}: PropertyListingsProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [properties, setProperties] = useState<Property[]>(legacyProperties);
  const isFull = mode === 'full';
  const [activeCategory, setActiveCategory] = useState<PropertyFilter>('Vše');
  const [transaction, setTransaction] = useState<TransactionFilter>('Vše');
  const [selectedLocation, setSelectedLocation] = useState('Všechny lokality');
  const [priceLimit, setPriceLimit] = useState<PriceFilter>('all');
  const [areaLimit, setAreaLimit] = useState<AreaFilter>('all');
  const [sortBy, setSortBy] = useState<SortFilter>('recommended');
  const [visibleCount, setVisibleCount] = useState(
    isFull ? propertyPageSize + 3 : propertyPageSize,
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/properties', { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Properties unavailable')))
      .then((data) => data as { properties?: Property[] })
      .then((data) => { if (!Array.isArray(data.properties)) throw new Error('Invalid properties response'); setProperties(data.properties); setLoadState('ready'); })
      .catch(() => { if (!controller.signal.aborted) setLoadState('error'); });
    return () => controller.abort();
  }, []);

  const propertyCategoryCounts = useMemo(() => {
    return propertyCategories.reduce(
      (counts, category) => ({
        ...counts,
        [category]: properties.filter(
          (property) => propertyTypeLabels[property.propertyType] === category,
        ).length,
      }),
      {} as Record<(typeof propertyCategories)[number], number>,
    );
  }, [properties]);

  const locations = useMemo(() => {
    return [
      'Všechny lokality',
      ...Array.from(
        new Set(properties.map((property) => property.location.city).filter((city): city is string => Boolean(city))),
      ).sort((a, b) => a.localeCompare(b, 'cs')),
    ];
  }, [properties]);

  const filteredProperties = useMemo(() => {
    const minArea = areaLimit === 'all' ? 0 : Number(areaLimit);

    const filtered = properties.filter((property) => {
      const matchesCategory =
        activeCategory === 'Vše' || propertyTypeLabels[property.propertyType] === activeCategory;
      const matchesTransaction =
        transaction === 'Vše' || transactionLabels[property.transactionType] === transaction;
      const matchesLocation =
        selectedLocation === 'Všechny lokality' ||
        property.location.city === selectedLocation;
      const matchesArea = primaryArea(property) >= minArea;
      const matchesPrice =
        priceLimit === 'all' ||
        (priceLimit === 'rent-20000' &&
          property.transactionType === 'RENT' &&
          (property.price ?? Infinity) <= 20000) ||
        (priceLimit === 'sale-5000000' &&
          property.transactionType === 'SALE' &&
          (property.price ?? Infinity) <= 5000000) ||
        (priceLimit === 'sale-7000000' &&
          property.transactionType === 'SALE' &&
          (property.price ?? Infinity) <= 7000000);

      return (
        matchesCategory &&
        matchesTransaction &&
        matchesLocation &&
        matchesArea &&
        matchesPrice
      );
    });

    return filtered.toSorted((first, second) => {
      if (sortBy === 'price-asc') {
        return (first.price ?? Infinity) - (second.price ?? Infinity);
      }

      if (sortBy === 'price-desc') {
        return (second.price ?? -Infinity) - (first.price ?? -Infinity);
      }

      if (sortBy === 'area-desc') {
        return primaryArea(second) - primaryArea(first);
      }

      return (Date.parse(second.publishedAt ?? '') || 0) - (Date.parse(first.publishedAt ?? '') || 0);
    });
  }, [
    activeCategory,
    areaLimit,
    priceLimit,
    selectedLocation,
    sortBy,
    transaction,
    properties,
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
                  ? properties.length
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
                    <OptimizedImage src={propertyCategoryIcons[filter]} alt="" />
                  )}
                  <span>{filter}</span>
                  <small>{count}</small>
                </button>
              );
            },
          )}
        </div>

        <div className={isFull ? "offers-layout" : "offers-preview-layout"}>
        {isFull && (
          <div className="offers-filter-panel"><button className="mobile-filter-toggle" type="button" aria-expanded={filtersOpen} aria-controls="offers-detailed-filters" onClick={()=>setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={19}/><span>{filtersOpen ? 'Skrýt filtry' : 'Upřesnit hledání'}</span><span>{filteredProperties.length} nabídek</span></button><aside id="offers-detailed-filters" className={`advanced-filters${filtersOpen ? ' advanced-filters--open' : ''}`} aria-label="Podrobné filtry">
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
          </aside></div>
        )}

        <div className="offers-results">
        {isFull && <div className="properties-resultbar"><span>{filteredProperties.length} nalezených nabídek</span></div>}

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
              <a className="property-card__link" href={`/nemovitosti/${property.slug}`} aria-label={`Zobrazit nemovitost: ${property.title}`}>
              <div className="property-card__media">
                <OptimizedImage loading="lazy" src={primaryImage(property)?.url || '/images/services/hero-house.webp'} alt={primaryImage(property)?.alt || property.title} />
                <span className="property-card__badge">
                  {property.status === 'RESERVED' ? 'Rezervováno' : transactionLabels[property.transactionType]}
                </span>
              </div>

              <div className="property-card__body">
                <h3>{property.title}</h3>
                <p className="property-card__location">
                  <OptimizedImage src="/assets/realitni/icon_location_pin.webp" alt="" />
                  <span>{[property.location.cityPart, property.location.city].filter(Boolean).join(', ') || 'Lokalita na vyžádání'}</span>
                </p>
                <p className="property-card__meta">{[propertyTypeLabels[property.propertyType].replace(/y$|í$/, ''), primaryArea(property) ? `${primaryArea(property)} m²` : null, property.disposition].filter(Boolean).join(' | ')}</p>
                <p className="property-card__price">{property.price != null ? `${property.priceNote === 'od' ? 'od ' : ''}${new Intl.NumberFormat('cs-CZ').format(property.price)} ${property.currency}${property.priceNote && property.priceNote !== 'od' ? ` / ${property.priceNote.replace(/^za /, '')}` : ''}` : 'Cena na vyžádání'}</p>
              </div>
              </a>
            </article>
          ))}
        </div>

        {visibleProperties.length === 0 && (
          <div className="properties-empty" role="status">
            <h2>{loadState === 'loading' ? 'Načítáme nabídku nemovitostí…' : loadState === 'error' ? 'Nabídku se nepodařilo načíst' : properties.length === 0 ? 'Aktuálně připravujeme nové nabídky' : 'Nic jsme nenašli'}</h2>
            <p>{loadState === 'loading' ? 'Vyčkejte prosím chvíli.' : loadState === 'error' ? 'Obnovte stránku nebo nás kontaktujte. Rádi vám s výběrem pomůžeme.' : properties.length === 0 ? 'Kontaktujte nás a pomůžeme vám s hledáním nemovitosti.' : 'Zkuste ubrat některý filtr nebo vyčistit zadání.'}</p>
            {properties.length === 0 && loadState !== 'loading' && <a className="properties-load" href="/kontakt?sluzba=Koup%C4%9B%20nemovitosti">Poptat nemovitost</a>}
            {properties.length > 0 && (
            <button
              className="filters-reset"
              type="button"
              onClick={resetFilters}
            >
              <X size={17} aria-hidden="true" />
              Vyčistit filtry
            </button>
            )}
          </div>
        )}

        <div className="properties-actions">
          {isFull && <p>Zobrazeno {visibleProperties.length} z {filteredProperties.length} nabídek</p>}
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
        </div>
      </div>

      <OptimizedImage
        className="properties-cityline"
        src="/assets/realitni/01_city_olomouc_lineart.webp"
        alt=""
        aria-hidden="true"
      />
      <OptimizedImage
        className="properties-slogan"
        src="/assets/realitni/02_slogan_vas_domov_nase_starost.webp"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}
