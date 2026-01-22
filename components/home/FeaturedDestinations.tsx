'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
  description: string
  imageUrl: string
}

export default function FeaturedDestinations() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="h-48 sm:h-72 md:h-96 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg sm:rounded-2xl animate-pulse"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-block mb-2 sm:mb-4">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-semibold">
              ✨ Explora Nuestros Destinos
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 px-2">
            Pueblos Mágicos de Antioquia
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
            Descubre los paisajes más hermosos de Antioquia y encuentra la finca perfecta para tus aventuras
          </p>
        </motion.div>

        {/* Destinations Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href={`/destinations/${category.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative h-48 sm:h-72 md:h-96 rounded-lg sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 md:p-6">
                      {/* Top Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="self-start bg-white/20 backdrop-blur-md px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30"
                      >
                        <div className="flex items-center space-x-1.5 text-white">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm font-medium">Pueblo</span>
                        </div>
                      </motion.div>

                      {/* Bottom Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                          {category.name}
                        </h3>
                        <p className="text-white/90 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-4">
                          {category.description}
                        </p>
                        <div className="flex items-center space-x-2 text-white/80 group-hover:text-white transition-colors text-xs sm:text-sm">
                          <span className="font-medium">Explorar</span>
                          <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Hover Overlay Accent */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-primary-500/20 to-transparent blur-2xl sm:blur-3xl pointer-events-none"
                    ></motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              No hay destinos disponibles aún
            </p>
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-8 sm:mt-12 md:mt-16"
        >
          <Link
            href="/destinations"
            className="inline-flex items-center space-x-2 bg-gradient-tropical hover:shadow-lg text-white font-semibold px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 transform sm:hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            <span>Ver Todos los Destinos</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
