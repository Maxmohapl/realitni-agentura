import type { Metadata } from 'next';
import SiteHeader from '../SiteHeader';
import TeamInquiry from '../nas-tym/TeamInquiry';
export const metadata: Metadata = { title: 'Kontakt | Realitní Agentura' };
export default function Page() {
  return <main className="site-shell contact-page"><SiteHeader activeItem="Kontakt" /><div className="contact-page__shell"><h1>Napište <span>nám.</span></h1><TeamInquiry contextual /></div></main>;
}
