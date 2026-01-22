import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Antioquia High Vibes | Espacios para momentos inolvidables',
  description: 'No te alquilamos fincas… Te ofrecemos espacios para crear momentos inolvidables en los mejores destinos de Antioquia, Colombia.',
  keywords: 'fincas antioquia, alquiler fincas colombia, turismo antioquia, experiencias premium',
  openGraph: {
    title: 'Antioquia High Vibes',
    description: 'Espacios para crear momentos inolvidables',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Preconnect para optimizar recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{__html: `:root { --font-poppins: system-ui, -apple-system, sans-serif; }`}} />
      </head>
      <body className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            containerClassName="sm:right-4"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '10px',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}