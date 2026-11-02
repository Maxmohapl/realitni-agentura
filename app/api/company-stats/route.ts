import { agencyStatistics, yearsInBusiness } from '@/lib/content/statistics';
export function GET() {
 const year = Number(new Intl.DateTimeFormat('en', { timeZone: 'Europe/Prague', year: 'numeric' }).format(new Date()));
 return Response.json({ ...agencyStatistics, years: yearsInBusiness(year) }, { headers: { 'Cache-Control': 'no-store' } });
}
