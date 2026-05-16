import './globals.css';

export const metadata = {
  title: 'Shakkam Games',
  description: 'Jeux mobiles par Shakkam Games — Guess Your Mind et plus encore.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-[#0a0a0f] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
