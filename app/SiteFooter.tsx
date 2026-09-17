import { Mail, MapPin, Phone } from 'lucide-react';
const links = [['Nabídka','/nabidka'],['Naše služby','/nase-sluzby'],['O nás','/o-nas'],['Náš tým','/nas-tym'],['Financování','/financovani'],['Projekty','/projekty'],['Kontakt','/kontakt']];
export default function SiteFooter() {
 return <footer className="site-footer">
  <div className="site-footer__main">
   <div className="site-footer__brand"><a href="/" aria-label="Realitní Agentura – úvodní stránka"><img src="/images/hero/navbar-logo.png" alt="Realitní Agentura" /></a><p>Profesionální služby v oblasti<br />realit už mnoho let.</p></div>
   <nav aria-label="Odkazy v zápatí"><h2>Rychlé odkazy</h2><div className="site-footer__links">{links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</div></nav>
   <div><h2>Kontakt</h2><address><span><MapPin />Lazecká 57/6, 779 00 Olomouc</span><a href="tel:+420734688825"><Phone />+420 734 688 825</a><a href="mailto:info@realitni-agentura.cz"><Mail />info@realitni-agentura.cz</a></address></div>
   <div className="site-footer__reach"><h2>Jsme tu pro vás</h2><p>Prodej, pronájem<br />a financování nemovitostí.</p><a href="/kontakt">Napište nám →</a></div>
  </div>
  <div className="site-footer__bottom">© {new Date().getFullYear()} Realitní agentura. Všechna práva vyhrazena.</div>
 </footer>;
}
