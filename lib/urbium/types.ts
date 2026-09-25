/** Temporary development shape only. This is NOT the official Urbium XML schema. */
export type MockUrbiumListing = {
  id: string; title: string; transaction: string; type: string; subtype?: string;
  disposition?: string; status?: string; price?: string; currency?: string; priceNote?: string;
  shortDescription?: string; description?: string;
  location?: { country?: string; region?: string; district?: string; city?: string; cityPart?: string; street?: string; houseNumber?: string; zip?: string; latitude?: string; longitude?: string };
  areas?: Record<string, string | undefined>;
  constructionType?: string; condition?: string; ownershipType?: string; energyRating?: string;
  floor?: string; floorsTotal?: string; elevator?: string; parking?: string; garage?: string;
  features?: { feature?: string | string[] }; equipment?: { item?: string | string[] };
  images?: { image?: MockUrbiumImage | MockUrbiumImage[] };
  videos?: { video?: string | string[] }; virtualTours?: { tour?: string | string[] };
  agent?: { id?: string; name?: string; phone?: string; email?: string; photo?: string };
  branch?: string; createdAt?: string; updatedAt?: string; publishedAt?: string;
};
export type MockUrbiumImage = { url: string; alt?: string; order?: string; cover?: string };
export type ParsedUrbiumFeed = { listings: MockUrbiumListing[]; completeSnapshot: boolean };
