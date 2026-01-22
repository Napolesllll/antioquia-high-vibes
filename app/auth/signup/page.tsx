import { Metadata } from 'next'
import SignUpForm from '@/components/auth/SignUpForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Crear Cuenta | Antioquia High Vibes',
  description: 'Regístrate en Antioquia High Vibes',
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-ocean-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32 pb-16">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver al inicio</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Crea tu cuenta
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Únete a Antioquia High Vibes y descubre las mejores fincas
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <SignUpForm />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
          Al crear una cuenta, aceptas nuestros{' '}
          <Link href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
            términos de servicio
          </Link>
        </p>
      </div>
    </div>
  )
}
