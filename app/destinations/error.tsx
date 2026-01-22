'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function DestinationsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Destinations Error:', error)
  }, [error])

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver al inicio</span>
        </Link>

        <div className="max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error en Destinos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error.message || 'No se pudo cargar los destinos'}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Reintentar
            </button>
            <Link
              href="/"
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition text-center"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
