import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Brucie Chat',
  description: 'Created by Jordan'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <div className='flex items-center justify-center p-24 dark:bg-gray-900 min-h-screen'>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
