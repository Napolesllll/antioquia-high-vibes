'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Sparkles, Heart, Star } from 'lucide-react'

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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data.slice(0, 3)) // Tomar solo los primeros 3 para destacados
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
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="h-8 w-48 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-full animate-pulse"></div>
            </div>
            <div className="h-10 sm:h-12 w-3/4 mx-auto bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 w-1/2 mx-auto bg-gradient-to-r from-gray-200/30 to-gray-300/30 dark:from-gray-700/30 dark:to-gray-800/30 rounded animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="group">
                <div className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-300/50 to-transparent dark:from-gray-700/50"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Fondo con efectos sutiles */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/50">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary-500/5 via-primary-500/2 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-ocean-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado con gradiente */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-primary-600/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-400/20 mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">
              DESTINOS DESTACADOS
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4">
            Descubre los{' '}
            <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
              pueblos mágicos
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            Explora los destinos más encantadores de Antioquia y encuentra la finca perfecta para tus aventuras
          </p>
        </div>

        {/* Grid de destinos - Optimizado para móvil */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link href={`/destinations/${category.slug}`}>
                  <div className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 active:scale-95">
                    {/* Imagen con overlay */}
                    <div className="absolute inset-0">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    </div>

                    {/* Badge de ubicación */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full">
                        <MapPin className="w-4 h-4 text-primary-400" />
                        <span className="text-white text-sm font-semibold">Antioquia</span>
                      </div>
                    </div>

                    {/* Botón de favorito */}
                    <button 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:border-primary-400 transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Lógica para agregar a favoritos
                      }}
                    >
                      <Heart className={`w-5 h-5 ${hoveredCard === index ? 'text-primary-400' : 'text-white/70'}`} />
                    </button>

                    {/* Contenido */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="transform transition-all duration-500 group-hover:translate-y-0">
                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                          {category.name}
                        </h3>
                        <p className="text-white/90 text-sm mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        
                        {/* Botón de acción */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white/90 group-hover:text-white transition-colors duration-300 text-sm font-semibold">
                            <span>Explorar</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                            <span className="text-white text-sm font-semibold">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Efecto de borde gradiente */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-500/30 transition-all duration-500"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                Explorando nuevos destinos
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Pronto tendremos los destinos más mágicos de Antioquia para ti
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/destinations"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            <span>Descubrir Todos los Destinos</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}