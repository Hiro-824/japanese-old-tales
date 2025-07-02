import './globals.css'
import type { Metadata } from 'next'
import { Noto_Serif } from 'next/font/google';

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Japanese Old Tales',
  description: 'A website where you can read Japanese old stories in English.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={notoSerif.variable}>{children}</body>
    </html>
  )
}
