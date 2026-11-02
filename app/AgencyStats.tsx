'use client';
import { useEffect, useState } from 'react';
import { Home, UsersRound, Star, TrendingUp } from 'lucide-react';
import { useGoogleReviews } from '@/hooks/use-google-reviews';
import { agencyStatistics, ratingPercentage } from '@/lib/content/statistics';
export default function AgencyStats({ compact = false }: { compact?: boolean }) {
 const [company, setCompany] = useState<{ totalSold: number | null; years: number | null }>({ totalSold: null, years: null });
 const google = useGoogleReviews();
 const percentage = google.status === 'ready' ? ratingPercentage(google.rating, google.count) : null;
 useEffect(() => {
  const controller = new AbortController();
  const update = () => { void fetch('/api/company-stats', { signal: controller.signal }).then(r => { if (!r.ok) throw new Error(); return r.json() as Promise<{ totalSold: number | null; years: number | null }>; }).then(setCompany).catch(() => {}); };
  update(); const timer = window.setInterval(update, 3600000);
  return () => { controller.abort(); window.clearInterval(timer); };
 }, []);
 const stats = [
  { icon: Home, value: company.totalSold === null ? '—' : company.totalSold.toLocaleString('cs-CZ'), label: 'Celkem prodaných nemovitostí' },
  ...(!compact ? [{ icon: UsersRound, value: String(agencyStatistics.teamSize), label: 'Lidí v týmu' }] : []),
  { icon: Star, value: percentage === null ? '—' : `${percentage} %`, label: percentage === null ? 'Hodnocení na Google Maps' : `Google Maps: ${google.rating?.toLocaleString('cs-CZ')} z 5 · ${google.count} hodnocení`, detail: percentage === null ? undefined : 'Přepočet průměrného hodnocení na procenta, nikoli podíl spokojených klientů.' },
  { icon: TrendingUp, value: company.years === null ? '—' : `${company.years}`, label: 'Let zkušeností na realitním trhu' },
 ];
 return <div className={compact ? 'services-hero__stats' : 'hero-stats'} aria-label="Statistiky realitní agentury">{stats.map(({ icon: Icon, value, label, detail }) => <div className={compact ? undefined : 'stat'} key={label} title={detail}>
  <Icon className={compact ? undefined : 'stat__icon'} size={34} strokeWidth={1.9} aria-hidden="true" />
  {compact ? <><strong>{value}</strong><span>{label}</span></> : <div><strong>{value}</strong><span>{label}</span></div>}
 </div>)}</div>;
}
