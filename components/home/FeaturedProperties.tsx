'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Users, MapPin, Star, ChevronLeft, ChevronRight, Heart, Home, Waves, Mountain, Trees } from 'lucide-react'
import { SafeProperty } from '@/types'

interface FeaturedPropertiesProps {
  properties: SafeProperty[]
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const carouselRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  // Detectar dispositivo
  useEffect(() => {
    if (typeof window === 'undefined') return
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Configurar autoplay
  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 3500)
  }

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (isPlaying && !isHovered) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return () => stopAutoPlay()
  }, [isPlaying, isHovered, currentSlide])

  const nextSlide = () => {
    setCurrentSlide(prev => {
      if (properties.length === 0) return 0
      const visibleCards = isMobile ? 1 : 3
      const maxSlide = Math.max(0, properties.length - visibleCards)
      return prev >= maxSlide ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentSlide(prev => {
      if (properties.length === 0) return 0
      const visibleCards = isMobile ? 1 : 3
      const maxSlide = Math.max(0, properties.length - visibleCards)
      return prev <= 0 ? maxSlide : prev - 1
    })
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Calcular cuántas tarjetas mostrar según dispositivo
  const getVisibleCount = () => {
    if (isMobile) return 1
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return 2
    return 3
  }

  // Función para obtener icono según categoría
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName?.toLowerCase() || ''
    if (name.includes('río') || name.includes('playa') || name.includes('agua')) return Waves
    if (name.includes('montaña') || name.includes('sierra')) return Mountain
    if (name.includes('bosque') || name.includes('selva')) return Trees
    return Home
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        {/* Patrón de puntos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado con diseño diferente */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-primary-500"></div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/20 to-emerald-500/20 flex items-center justify-center">
                <Home className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="absolute -inset-1 rounded-full border-2 border-primary-500/30 animate-ping-slow"></div>
            </div>
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-primary-500"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary-600 via-emerald-600 to-primary-600 bg-clip-text text-transparent animate-gradient">
                Fincas Exclusivas
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full"></span>
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubre propiedades únicas donde cada detalle está pensado para tu comodidad
          </p>
        </div>

        {/* Contenedor del carousel diferente */}
        <div className="relative"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
          
          {/* Navegación superior */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                {[1, 2, 3].map((_, i) => (
                  <div 
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide % 3 === i 
                        ? 'w-6 bg-gradient-to-r from-primary-500 to-emerald-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {currentSlide + 1} de {Math.max(1, properties.length - (getVisibleCount() - 1))}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-3 bg-primary-600 rounded-full animate-pulse"></div>
                    <div className="w-1 h-3 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-primary-600 ml-1"></div>
                )}
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 shadow-lg group"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 shadow-lg group"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel con diseño diferente - Tarjetas en perspectiva */}
          <div className="relative overflow-hidden rounded-3xl">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / getVisibleCount())}%)`,
                width: `${properties.length * (100 / getVisibleCount())}%`
              }}
            >
              {properties.map((property, index) => {
                const CategoryIcon = getCategoryIcon(property.category?.name || '')
                const isFavorite = favorites.has(String(property.id))
                
                return (
                  <div
                    key={property.id}
                    className="px-3 sm:px-4 flex-shrink-0"
                    style={{ width: `${100 / getVisibleCount()}%` }}
                  >
                    <div className="relative h-full">
                      <Link 
                        href={`/properties/${property.slug}`} 
                        className="block h-full group"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <div className="relative h-[500px] sm:h-[550px] rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                          
                          {/* Imagen con efecto de cristal */}
                          <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                            <div className="absolute inset-0">
                              <Image
                                src={property.images[0] || '/images/placeholder.jpg'}
                                alt={property.name}
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
                              
                              {/* Efecto de cristal en la esquina */}
                              <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm rounded-2xl border border-white/30 -rotate-12"></div>
                            </div>
                            
                            {/* Badge destacado */}
                            <div className="absolute top-4 left-4">
                              <div className="relative">
                                <div className="bg-gradient-to-r from-gold-500 to-yellow-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg transform -rotate-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm">EXCLUSIVA</span>
                                  </div>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-xl blur-sm opacity-50 -z-10"></div>
                              </div>
                            </div>
                            
                            {/* Botón de favoritos */}
                            <button 
                              onClick={(e) => toggleFavorite(String(property.id), e)}
                              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:border-red-400 transition-all duration-300 hover:scale-110 group/fav"
                            >
                              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white/80'} group-hover/fav:fill-red-500 group-hover/fav:text-red-500 transition-all`} />
                            </button>
                          </div>
                          
                          {/* Contenido de la tarjeta */}
                          <div className="p-6">
                            {/* Categoría con icono */}
                            {property.category && (
                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/10 to-emerald-500/10 flex items-center justify-center">
                                  <CategoryIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{property.category.name}</span>
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Categoría premium</div>
                                </div>
                              </div>
                            )}
                            
                            {/* Título */}
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                              {property.name}
                            </h3>
                            
                            {/* Descripción */}
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                              {property.description}
                            </p>
                            
                            {/* Detalles principales */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Capacidad</span>
                                </div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                  {property.capacity} personas
                                </div>
                              </div>
                              
                              <div className="bg-gradient-to-br from-primary-500/10 to-emerald-500/10 rounded-xl p-4">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Precio por noche</div>
                                <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">
                                  ${(property.pricePerNight / 1000).toFixed(0)}k
                                </div>
                              </div>
                            </div>
                            
                            {/* Amenidades */}
                            {property.amenities.length > 0 && (
                              <div className="mb-6">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Incluye:</div>
                                <div className="flex flex-wrap gap-2">
                                  {property.amenities.slice(0, 3).map((amenity, i) => (
                                    <div 
                                      key={i}
                                      className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium border border-primary-200 dark:border-primary-700"
                                    >
                                      {amenity}
                                    </div>
                                  ))}
                                  {property.amenities.length > 3 && (
                                    <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                                      +{property.amenities.length - 3} más
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* Botón de acción */}
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                              <div className="relative bg-gradient-to-r from-primary-600 to-emerald-600 text-white font-bold py-3 rounded-xl text-center group-hover:from-primary-700 group-hover:to-emerald-700 transition-all duration-300 transform group-hover:scale-[1.02]">
                                Ver disponibilidad
                              </div>
                            </div>
                          </div>
                          
                          {/* Efecto de brillo en hover */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-500/20 transition-all duration-500 pointer-events-none"></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Indicadores de posición (inferiores) */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(properties.length / getVisibleCount()) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index * getVisibleCount())}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentSlide / getVisibleCount()) === index
                      ? 'w-8 bg-gradient-to-r from-primary-500 to-emerald-500'
                      : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Ir a grupo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA diferente */}
        <div className="text-center mt-16 sm:mt-20">
          <Link
            href="/properties"
            className="group inline-flex items-center justify-center gap-3 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold px-8 py-4 rounded-2xl border-2 border-transparent group-hover:border-primary-500/30 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <div className="flex items-center gap-3">
                <span>Explorar todas las fincas</span>
                <div className="relative">
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  <ChevronRight className="absolute -right-4 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300" />
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </Link>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes ping-slow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        /* Efecto de desenfoque de fondo */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </section>
  )
}