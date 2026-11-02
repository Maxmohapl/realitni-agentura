import type { Metadata } from 'next';
import SiteHeader from '../SiteHeader';
import TeamInquiry from '../nas-tym/TeamInquiry';
import OptimizedImage from '../../components/OptimizedImage';
export const metadata: Metadata = { title: 'Kontakt | Realitní Agentura' };
export default function Page() {
  return <main className="site-shell contact-page"><SiteHeader activeItem="Kontakt" /><div className="contact-scene">
    <OptimizedImage className="contact-scene__house" src="/images/contact/agency-house-wide.png" width={2172} height={724} alt="Dům Realitní Agentury s označením kanceláře na plotě" fetchPriority="high" />
    <div className="contact-page__shell"><h1>Napište <span>nám.</span></h1><TeamInquiry contextual /></div>
  </div></main>;
}
