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
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="section-title">Fincas Destacadas</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2 sm:mt-4 px-2">
            Experiencias premium seleccionadas especialmente para ti
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link href={`/properties/${property.slug}`} className="block h-full">
                <div className="card card-hover group h-full flex flex-col">
                  {/* Image Container - Responsive height */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-xl sm:rounded-t-2xl w-full">
                    <Image
                      src={property.images[0] || '/images/placeholder.jpg'}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Featured Badge */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gold-500 text-white px-2 sm:px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                      <span className="text-xs sm:text-sm font-semibold">Destacada</span>
                    </div>
                  </div>

                  {/* Content - Flex grow for consistent height */}
                  <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
                    {/* Category */}
                    {property.category && (
                      <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium truncate">{property.category.name}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {property.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 flex-1">
                      {property.description}
                    </p>

                    {/* Details */}
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 gap-2">
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 min-w-0">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">Hasta {property.capacity}</span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">
                          ${(property.pricePerNight / 1000).toFixed(0)}k
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">por noche</p>
                      </div>
                    </div>

                    {/* Amenities Preview */}
                    {property.amenities.length > 0 && (
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                        {property.amenities.slice(0, 2).map((amenity, i) => (
                          <span
                            key={i}
                            className="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full line-clamp-1"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 2 && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                            +{property.amenities.length - 2}
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
      </div>
    </section>
  )
}