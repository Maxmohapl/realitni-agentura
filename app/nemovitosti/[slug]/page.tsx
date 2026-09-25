import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Mail, MapPin, Phone } from 'lucide-react';
import SiteHeader from '@/app/SiteHeader';
import { inquiryContext } from '@/lib/properties/inquiry';
import { primaryArea, primaryImage, propertyStatusLabels, propertyTypeLabels, transactionLabels, type Property } from '@/lib/properties/model';
import { propertyBySlug } from '@/lib/urbium/repository';
import PropertyInquiryForm from './PropertyInquiryForm';

const siteUrl = process.env.SITE_URL || 'https://www.realitni-agentura.cz';
const money = new Intl.NumberFormat('cs-CZ');
const address = (property: Property) => [property.location.street, property.location.houseNumber, property.location.cityPart, property.location.city].filter(Boolean).join(', ');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const property = await propertyBySlug((await params).slug);
  if (!property) return { title: 'Nemovitost nenalezena', robots: { index: false, follow: false } };
  const description = property.shortDescription || `${transactionLabels[property.transactionType]} – ${property.title}, ${address(property)}`;
  const url = `${siteUrl}/nemovitosti/${property.slug}`; const image = primaryImage(property)?.url;
  return { title: `${property.title} | Realitní Agentura`, description, alternates: { canonical: url }, openGraph: { title: property.title, description, url, type: 'website', images: image ? [{ url: image }] : [] }, twitter: { card: image ? 'summary_large_image' : 'summary', title: property.title, description, images: image ? [image] : [] } };
}

export default async function PropertyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const property = await propertyBySlug((await params).slug); if (!property) notFound();
  const cover = primaryImage(property); const location = address(property);
  const specs = [
    ['Typ', propertyTypeLabels[property.propertyType]], ['Dispozice', property.disposition], ['Užitná plocha', property.areas.usableArea && `${property.areas.usableArea} m²`], ['Plocha pozemku', property.areas.landArea && `${property.areas.landArea} m²`], ['Balkon', property.areas.balconyArea && `${property.areas.balconyArea} m²`], ['Terasa', property.areas.terraceArea && `${property.areas.terraceArea} m²`], ['Zahrada', property.areas.gardenArea && `${property.areas.gardenArea} m²`], ['Konstrukce', property.constructionType], ['Stav', property.condition], ['Vlastnictví', property.ownershipType], ['Podlaží', property.floor], ['Výtah', property.elevator == null ? null : property.elevator ? 'Ano' : 'Ne'], ['Parkování', property.parking == null ? null : property.parking ? 'Ano' : 'Ne'], ['Garáž', property.garage == null ? null : property.garage ? 'Ano' : 'Ne'], ['Energetická náročnost', property.energyRating],
  ].filter(([, value]) => value != null && value !== '');
  const canonical = `${siteUrl}/nemovitosti/${property.slug}`;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'RealEstateListing', name: property.title, description: property.description || property.shortDescription, url: canonical, image: property.images.map((image) => image.url), datePosted: property.publishedAt, offers: property.price != null ? { '@type': 'Offer', price: property.price, priceCurrency: property.currency, availability: property.status === 'RESERVED' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock' } : undefined, address: { '@type': 'PostalAddress', addressCountry: property.location.country, addressRegion: property.location.region, addressLocality: property.location.city, streetAddress: [property.location.street, property.location.houseNumber].filter(Boolean).join(' '), postalCode: property.location.zip } };
  return <main className="site-shell property-detail-page"><SiteHeader activeItem="Nabídka" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <header className="property-detail-hero"><a href="/nabidka" className="project-back"><ArrowLeft size={18}/>Zpět na nabídku</a><div className="property-detail-hero__grid"><div><span className="property-detail-status">{propertyStatusLabels[property.status]}</span><p className="properties-eyebrow">{transactionLabels[property.transactionType]} · {propertyTypeLabels[property.propertyType]}</p><h1>{property.title}</h1>{location && <p className="property-detail-location"><MapPin size={20}/>{location}</p>}<p className="property-detail-price">{property.price != null ? `${money.format(property.price)} ${property.currency}${property.priceNote ? ` · ${property.priceNote}` : ''}` : 'Cena na vyžádání'}</p></div>{cover && <img src={cover.url} alt={cover.alt || property.title}/>}</div></header>
    {property.images.length > 1 && <section className="property-detail-section"><div className="property-detail-gallery">{property.images.map((image) => <a href={image.url} target="_blank" rel="noopener noreferrer" key={image.url}><img src={image.url} alt={image.alt || property.title} loading="lazy"/></a>)}</div></section>}
    <section className="property-detail-section property-detail-content"><article><h2>O nemovitosti</h2>{property.shortDescription && <p className="property-detail-lead">{property.shortDescription}</p>}<p>{property.description}</p>{(property.features.length > 0 || property.equipment.length > 0) && <div className="property-detail-features">{[...property.features, ...property.equipment].map((item) => <span key={item}><Check size={17}/>{item}</span>)}</div>}</article><aside><h2>Základní informace</h2><dl>{specs.map(([label, value]) => <div key={String(label)}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></aside></section>
    {(property.videos.length > 0 || property.virtualTours.length > 0) && <section className="property-detail-section"><h2>Video a virtuální prohlídka</h2><div className="property-detail-links">{property.videos.map((url) => <a href={url} target="_blank" rel="noopener noreferrer" key={url}>Přehrát video ↗</a>)}{property.virtualTours.map((url) => <a href={url} target="_blank" rel="noopener noreferrer" key={url}>Otevřít virtuální prohlídku ↗</a>)}</div></section>}
    <section className="property-detail-section property-detail-contact"><div>{property.agent?.photo && <img src={property.agent.photo} alt={property.agent.name || 'Realitní makléř'}/>}<h2>{property.agent?.name || 'Realitní Agentura'}</h2>{property.agent?.phone && <a href={`tel:${property.agent.phone.replaceAll(' ', '')}`}><Phone size={19}/>{property.agent.phone}</a>}{property.agent?.email && <a href={`mailto:${property.agent.email}`}><Mail size={19}/>{property.agent.email}</a>}</div><PropertyInquiryForm context={inquiryContext(property, canonical)} agentEmail={property.agent?.email}/></section>
  </main>;
}
