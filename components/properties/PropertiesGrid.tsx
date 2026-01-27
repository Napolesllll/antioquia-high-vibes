'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Users, DollarSign, Star, Home } from 'lucide-react'

interface Category {
  id: number
  name: string
}

interface Property {
  id: number
  name: string
  slug: string
  description: string | null
  images: string[]
  capacity: number
  pricePerNight: number
  amenities: string[]
  featured: boolean
  category?: Category
}

interface PropertiesGridProps {
  properties: Property[]
}

export default function PropertiesGrid({ properties }: PropertiesGridProps) {
  return (
    <div className="max-w-8xl mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 pb-8 xs:pb-12 sm:pb-16 md:pb-20">
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              className="group block"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-2 active:scale-95">
                {/* Badge destacado */}
                {property.featured && (
                  <div className="absolute top-4 xs:top-6 right-4 xs:right-6 z-10">
                    <div className="flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-gold-500 to-amber-500 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-lg">
                      <Star className="w-3 h-3 xs:w-4 xs:h-4 text-white fill-white" />
                      <span className="text-white font-bold text-xs">DESTACADA</span>
                    </div>
                  </div>
                )}

                {/* Imagen con overlay */}
                <div className="relative h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                  {property.images && property.images[0] ? (
                    <>
                      <Image
                        src={property.images[0]}
                        alt={property.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-ocean-400">
                      <div className="text-center p-4">
                        <Home className="w-12 h-12 text-white/50 mx-auto mb-2" />
                        <span className="text-white/70 font-medium text-sm">Imagen no disponible</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Información en imagen */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 xs:gap-2 bg-black/60 backdrop-blur-sm px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full">
                        <Users className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                        <span className="text-white font-bold text-xs">Hasta {property.capacity} personas</span>
                      </div>
                      <div className="flex items-center gap-1 xs:gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full">
                        <DollarSign className="w-3 h-3 xs:w-4 xs:h-4 text-gold-300" />
                        <span className="text-white font-bold text-xs">${property.pricePerNight.toLocaleString('es-CO')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4 xs:p-5 sm:p-6">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 xs:mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {property.name}
                  </h3>
                  
                  <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-3 xs:mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  {property.category && (
                    <div className="inline-flex items-center gap-1.5 xs:gap-2 bg-primary-500/10 dark:bg-primary-500/20 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full mb-3 xs:mb-4">
                      <span className="text-xs xs:text-sm font-semibold text-primary-700 dark:text-primary-300">
                        {property.category.name}
                      </span>
                    </div>
                  )}

                  {property.amenities && property.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 xs:gap-2">
                      {property.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 xs:px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 xs:py-16 sm:py-20">
          <Home className="w-12 h-12 xs:w-16 sm:w-20 text-gray-300 dark:text-gray-600 mx-auto mb-4 xs:mb-6" />
          <p className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400">
            No se encontraron propiedades
          </p>
          <p className="text-sm xs:text-base text-gray-500 dark:text-gray-500 mt-2">
            Intenta con otros filtros o búsqueda
          </p>
        </div>
      )}
    </div>
  )
}
