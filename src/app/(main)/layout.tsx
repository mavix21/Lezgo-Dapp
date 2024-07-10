import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lezgo Home Page',
  description: 'Lezgo Home Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} dark`}>{children}</body>
    </html>
  );
}
