export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const profileUrl = process.env.GOOGLE_REVIEWS_URL || null;
  const headers = { 'Cache-Control': 'no-store' };
  if (!key || !placeId) return Response.json({ status: 'unconfigured', profileUrl }, { headers });
  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=cs`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews' },
      signal: AbortSignal.timeout(8000), cache: 'no-store',
    });
    if (!response.ok) return Response.json({ status: 'unavailable', profileUrl }, { headers });
    const data = await response.json();
    return Response.json({ status: 'ready', rating: data.rating, count: data.userRatingCount, profileUrl: data.googleMapsUri || profileUrl, reviews: (data.reviews || []).slice(0,3).map((review: { rating: number; text?: {text:string}; authorAttribution?: {displayName:string;uri?:string}; relativePublishTimeDescription?:string; googleMapsUri?:string }) => ({ rating: review.rating, text: review.text?.text || '', author: review.authorAttribution?.displayName || 'Uživatel Google', authorUrl: review.authorAttribution?.uri, time: review.relativePublishTimeDescription, url: review.googleMapsUri })) }, { headers });
  } catch { return Response.json({ status: 'unavailable', profileUrl }, { headers }); }
}
