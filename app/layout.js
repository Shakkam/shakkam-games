import { Syne, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-display' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'LEO Labs — Apps, jeux & sites web',
  description: 'LEO Labs, studio indépendant né à Léognan : jeux mobiles (Shakkam Games), applications et sites web.',
  icons: { icon: '/icon.svg' },
};

export const viewport = {
  themeColor: '#07080a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-ink text-white min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
