'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Users, MapPin, Star } from 'lucide-react'
import { SafeProperty } from '@/types'

interface FeaturedPropertiesProps {
  properties: SafeProperty[]
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Fincas Destacadas</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experiencias premium seleccionadas especialmente para ti
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link href={`/properties/${property.slug}`}>
                <div className="card card-hover group">
                  <div className="relative h-64 overflow-hidden rounded-t-2xl">
                    <Image
                      src={property.images[0] || '/images/placeholder.jpg'}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 bg-gold-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">Destacada</span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Category */}
                    {property.category && (
                      <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{property.category.name}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {property.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {property.description}
                    </p>

                    {/* Details */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Hasta {property.capacity} personas</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          ${property.pricePerNight.toLocaleString('es-CO')}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">por noche</p>
                      </div>
                    </div>

                    {/* Amenities Preview */}
                    {property.amenities.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((amenity, i) => (
                          <span
                            key={i}
                            className="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                            +{property.amenities.length - 3} más
                          </span>
                        )}
                      </div>
                    )}
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
          className="text-center mt-12"
        >
          <Link href="/properties" className="btn-secondary">
            Ver Todas las Fincas
          </Link>
        </motion.div>
      </div>
    </section>
  )
}