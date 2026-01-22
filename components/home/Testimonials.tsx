'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'María González',
    location: 'Medellín',
    image: '/images/testimonial-1.jpg',
    rating: 5,
    text: 'La experiencia fue increíble. La finca superó nuestras expectativas y el servicio fue impecable. ¡Volveremos sin duda!',
  },
  {
    name: 'Carlos Ramírez',
    location: 'Bogotá',
    image: '/images/testimonial-2.jpg',
    rating: 5,
    text: 'Perfecta para desconectar de la ciudad. Las instalaciones son de primera y la atención personalizada hace la diferencia.',
  },
  {
    name: 'Laura Martínez',
    location: 'Cali',
    image: '/images/testimonial-3.jpg',
    rating: 5,
    text: 'Celebramos nuestro aniversario aquí y fue mágico. Cada detalle estaba cuidado. High Vibes es sinónimo de calidad.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Lo Que Dicen Nuestros Huéspedes</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experiencias reales de personas que han creado momentos inolvidables
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="card p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary-200 dark:text-primary-800">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {/* Placeholder avatar */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-tropical text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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