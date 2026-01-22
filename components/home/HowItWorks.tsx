'use client'

import { Search, Calendar, Home, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Explora',
    description: 'Descubre fincas increíbles en los mejores destinos de Antioquia',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Calendar,
    title: 'Reserva',
    description: 'Selecciona tus fechas y confirma tu reserva de forma segura',
    color: 'from-ocean-500 to-ocean-600',
  },
  {
    icon: Home,
    title: 'Disfruta',
    description: 'Vive experiencias únicas en espacios diseñados para ti',
    color: 'from-gold-500 to-gold-600',
  },
  {
    icon: Sparkles,
    title: 'Crea Recuerdos',
    description: 'Momentos inolvidables que atesorarás para siempre',
    color: 'from-purple-500 to-purple-600',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="section-title">¿Cómo Funciona?</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2 sm:mt-4 px-2">
            En solo 4 pasos simples, estarás listo para vivir tu próxima aventura
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-center group">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.color} shadow-lg sm:shadow-xl mb-4 sm:mb-6 hover:scale-110 hover:rotate-6 transition-transform`}>
                  <step.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                  {step.description}
                </p>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-300 to-ocean-300 dark:from-primary-700 dark:to-ocean-700" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}