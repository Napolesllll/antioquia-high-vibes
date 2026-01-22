'use client'

import { motion } from 'framer-motion'
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">¿Cómo Funciona?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            En solo 4 pasos simples, estarás listo para vivir tu próxima aventura
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative"
            >
              <div className="text-center group">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} shadow-xl mb-6`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>

                {/* Connector Line (except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-300 to-ocean-300 dark:from-primary-700 dark:to-ocean-700" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}