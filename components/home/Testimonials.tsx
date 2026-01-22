'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'María González',
    location: 'Medellín',
    rating: 5,
    text: 'La experiencia fue increíble. La finca superó nuestras expectativas y el servicio fue impecable. ¡Volveremos sin duda!',
  },
  {
    name: 'Carlos Ramírez',
    location: 'Bogotá',
    rating: 5,
    text: 'Perfecta para desconectar de la ciudad. Las instalaciones son de primera y la atención personalizada hace la diferencia.',
  },
  {
    name: 'Laura Martínez',
    location: 'Cali',
    rating: 5,
    text: 'Celebramos nuestro aniversario aquí y fue mágico. Cada detalle estaba cuidado. High Vibes es sinónimo de calidad.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="section-title">Lo Que Dicen Nuestros Huéspedes</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2 sm:mt-4 px-2">
            Experiencias reales de personas que han creado momentos inolvidables
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="card p-4 sm:p-6 md:p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 text-primary-200 dark:text-primary-800">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 italic leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  {/* Placeholder avatar with initials */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-tropical text-white font-bold text-xs sm:text-sm">
                    {testimonial.name.split(' ').map(n => n.charAt(0)).join('')}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}