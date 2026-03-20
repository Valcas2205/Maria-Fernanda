import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Abhaya_Libre } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/cookie-banner'
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
  metadataBase: new URL('https://www.todoesunbalance.com'),
  title: {
    default: 'Psicóloga en Barquisimeto | Maria Fernanda Azcunes',
    template: '%s | Maria Fernanda Azcunes - Todo es un Balance',
  },
  description:
    'Psicóloga clínica en Barquisimeto, Maria Fernanda Azcunes. Terapia presencial y online para adultos y parejas. Especializada en ansiedad, autoestima y bienestar emocional.',
  keywords: [
    'Psicóloga en Barquisimeto',
    'Psicóloga clínica Barquisimeto',
    'Terapia presencial Barquisimeto',
    'Terapia de parejas Barquisimeto',
    'Psicoterapeuta Barquisimeto',
    'Maria Fernanda Azcunes',
    'Todo es un balance',
    'Terapia online',
  ],
  authors: [{ name: 'Maria Fernanda Azcunes' }],
  creator: 'Maria Fernanda Azcunes',
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://www.todoesunbalance.com',
    title: 'Psicóloga en Barquisimeto | Maria Fernanda Azcunes',
    description: 'Terapia presencial en Barquisimeto y online para adultos y parejas. Encuentra tu balance con Maria Fernanda Azcunes.',
    siteName: 'Todo es un Balance',
  },
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
      <html lang="es" className={`${abhaya.variable} ${cormorant.variable} scroll-smooth scroll-pt-20`}>
      <body className="font-sans antialiased">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}

