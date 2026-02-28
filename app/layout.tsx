import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Abhaya_Libre } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const abhaya = Abhaya_Libre({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-abhaya',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Todo es un Balance | Maria Fernanda Azcunes - Psicologia',
  description:
    'Espacio de psicologia clinica con Maria Fernanda Azcunes. Terapia individual, de parejas, ansiedad, autoestima y mas.',
}

export const viewport: Viewport = {
  themeColor: '#fdebdd',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${abhaya.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
