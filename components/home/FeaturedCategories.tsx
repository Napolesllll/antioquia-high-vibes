'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { SafeCategory } from '@/types'

interface FeaturedCategoriesProps {
  categories: SafeCategory[]
}

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="section-title">Explora Nuestros Destinos</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2 sm:mt-4 px-2">
            Descubre los pueblos más encantadores de Antioquia y sus fincas premium
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link href={`/categories/${category.slug}`} className="block h-full">
                <div className="card card-hover group h-full">
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-xl sm:rounded-t-2xl w-full">
                    <Image
                      src={category.imageUrl || '/images/placeholder.jpg'}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Badge con número de propiedades */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full shadow-md">
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {category._count?.properties || 0} fincas
                      </span>
                    </div>

                    {/* Título sobre la imagen */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                      <div className="flex items-start space-x-2 text-white mb-1 sm:mb-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">{category.name}</h3>
                      </div>
                      <p className="text-white/85 text-xs sm:text-sm line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link href="/categories" className="btn-secondary inline-block text-sm sm:text-base">
            Ver Todos los Destinos
          </Link>
        </motion.div>
      </div>
    </section>
  )
}