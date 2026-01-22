'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Algo salió mal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || 'Hubo un error inesperado en la aplicación'}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Reintentar
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  )
}
