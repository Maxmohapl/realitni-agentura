'use client';

import PropertyListings from '../PropertyListings';
import SiteHeader from '../SiteHeader';

export default function OfferPage() {
  return (
    <main className="site-shell offers-page">
      <SiteHeader activeItem="Nabídka" currentPath="subpage" />

      <PropertyListings mode="full" />
    </main>
  );
}
