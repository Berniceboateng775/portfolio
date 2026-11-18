import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';
import './globals.css';
import Masthead from '@/components/Masthead';
import Reveals from '@/components/Reveals';
import SmoothScroll from '@/components/SmoothScroll';

const sora = Sora({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://bernices-portfolio.vercel.app'),
  title: {
    default: 'Bernice Animwaa Boateng — AI/ML Engineer & Software Developer',
    template: '%s — Bernice Animwaa Boateng',
  },
  description:
    'AI/ML engineer and software developer in Accra, Ghana. Clinical machine learning, NLP and the full-stack products around them: MedMate, Vellichor, Limerence, CardioGlobal.',
  authors: [{ name: 'Bernice Animwaa Boateng' }],
  openGraph: {
    title: 'Bernice Animwaa Boateng reads between the lines',
    description: 'AI/ML engineer and software developer. Models that find what is not written down, and the products around them.',
    type: 'website',
    images: ['/work/medmate/home.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0d',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <SmoothScroll />
        <Masthead />
        {children}
        <Reveals />
      </body>
    </html>
  );
}
