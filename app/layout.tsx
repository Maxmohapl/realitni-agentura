import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './mobile.css';
import SiteFooter from './SiteFooter';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://www.realitni-agentura.cz'),
  title: 'Realitní Agentura Olomouc | Prodej a pronájem nemovitostí',
  description:
    'Prodej, pronájem a odhad ceny nemovitostí v Olomouci a okolí. Profesionální prezentace, osobní přístup a kompletní realitní servis.',
  openGraph: {
    title: 'Realitní Agentura Olomouc',
    description:
      'Pomůžeme vám s prodejem, pronájmem i financováním nemovitosti v Olomouci a okolí.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Realitní Agentura Olomouc – tým makléřů',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Realitní Agentura Olomouc',
    description:
      'Pomůžeme vám s prodejem, pronájmem i financováním nemovitosti v Olomouci a okolí.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
