import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Realitní Agentura | Hero sekce',
  description:
    'Responzivní hero sekce realitní kanceláře se samostatnými makléři a kontaktní interakcí.',
  openGraph: {
    title: 'Realitní Agentura | Hero sekce',
    description:
      'Moderní hero sekce realitní kanceláře s interaktivním týmem makléřů.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Hero sekce Realitní Agentury s týmem makléřů',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Realitní Agentura | Hero sekce',
    description:
      'Moderní hero sekce realitní kanceláře s interaktivním týmem makléřů.',
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
      </body>
    </html>
  );
}
