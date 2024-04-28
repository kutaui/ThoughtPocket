import React from 'react';
import '@/css/globals.css';
import Providers from '@/components/Providers';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Thought Pocket',
  description: 'Your notes, your thoughts, your pocket.',
  keywords: [
    'ThoughtPocket',
    'Thought Pocket',
    'Thought',
    'Pocket',
    'Notes',
    'Notion',
    'Next.js',
  ],
  authors: [
    {
      name: 'kutaui',
      url: 'https://kutay.boo',
    },
  ],
  creator: 'kutaui',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/logo-light.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
