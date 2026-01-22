'use client'

import { useState, useEffect } from 'react'
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
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="h-8 sm:h-12 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 sm:h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg animate-pulse w-3/4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 sm:h-72 md:h-96 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg sm:rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mejorado para móvil */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 animate-fade-in-up">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="px-4 sm:px-5 py-2 sm:py-2.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase">
              ✨ Explora Nuestros Destinos
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-5 px-3 sm:px-0 leading-tight">
            Pueblos Mágicos de Antioquia
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed font-light">
            Descubre los paisajes más hermosos de Antioquia y encuentra la finca perfecta para tus aventuras
          </p>
        </div>

        {/* Destinations Grid - Optimizado para móvil */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={`/destinations/${category.slug}`}>
                  <div className="relative h-72 sm:h-72 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer sm:hover:-translate-y-2 hover:-translate-y-1 hover:scale-[1.02] sm:hover:scale-100">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 md:p-6">
                      {/* Top Badge - Mejorado */}
                      <div className="self-start bg-white/25 backdrop-blur-lg px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/40 shadow-lg">
                        <div className="flex items-center space-x-2 text-white">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-bold tracking-wide">Pueblo</span>
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                          {category.name}
                        </h3>
                        <p className="text-white/95 text-xs sm:text-sm line-clamp-2 leading-relaxed font-light">
                          {category.description}
                        </p>
                        <div className="flex items-center space-x-2 text-white/90 group-hover:text-white transition-all duration-300 text-xs sm:text-sm font-semibold">
                          <span>Explorar</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay - Mejorado */}
                    <div className="absolute -top-1/2 -right-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-primary-400/15 to-transparent rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              No hay destinos disponibles aún
            </p>
          </div>
        )}

        {/* CTA Button - Mejorado para móvil */}
        <div className="text-center mt-10 sm:mt-14 md:mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center space-x-3 bg-gradient-tropical hover:shadow-2xl text-white font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base shadow-lg hover:shadow-primary-500/50 group"
          >
            <span>Ver Todos los Destinos</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}