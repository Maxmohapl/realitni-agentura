import { publicProperties } from '@/lib/urbium/repository';

export async function GET() {
  return Response.json({ properties: await publicProperties() }, { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' } });
}
