'use client';
import { useEffect, useState } from 'react';
export type GoogleReview = { rating: number; text: string; author: string; authorUrl?: string; authorPhoto?: string; time?: string; url?: string };
export type GoogleReviewsData = { status: string; rating?: number; count?: number; profileUrl?: string | null; reviews?: GoogleReview[] };
let pending: Promise<GoogleReviewsData> | undefined;
export function useGoogleReviews() {
 const [data, setData] = useState<GoogleReviewsData>({ status: 'loading' });
 useEffect(() => {
  let active = true;
  if (!pending) {
   pending = fetch('/api/google-reviews', { signal: AbortSignal.timeout(10000) }).then(response => {
    if (!response.ok) throw new Error('Reviews unavailable');
    return response.json() as Promise<GoogleReviewsData>;
   }).catch(() => ({ status: 'unavailable' }));
   const request = pending;
   void request.then(() => { if (pending === request) pending = undefined; });
  }
  void pending.then(result => { if (active) setData(result); });
  return () => { active = false; };
 }, []);
 return data;
}
