'use client'

import { useState, useEffect, useRef } from 'react'
import { Users, MapPin, Star, ChevronLeft, ChevronRight, Heart, Home, Waves, Mountain, Trees, Sparkles, Award, TrendingUp, Calendar } from 'lucide-react'

interface Category {
  id: number
  name: string
}

interface SafeProperty {
  id: number
  name: string
  slug: string
  description: string
  images: string[]
  capacity: number
  pricePerNight: number
  amenities: string[]
  category?: Category
}

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
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      {/* Fondo animado con efectos modernos */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orbes de luz */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-400/20 via-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 via-teal-400/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid moderno */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>
        
        {/* Partículas flotantes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 dark:bg-primary-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Encabezado ultra moderno */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-emerald-500/10 border border-primary-200/50 dark:border-primary-700/50 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-primary-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent uppercase tracking-wider">
              Selección Premium
            </span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          
          {/* Título con efectos */}
          <div className="relative inline-block mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-primary-800 to-gray-900 dark:from-white dark:via-primary-300 dark:to-white leading-tight">
              Fincas Exclusivas
            </h2>
            {/* Subrayado animado */}
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent animate-shimmer"></div>
            <div className="absolute -bottom-3 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent blur-sm"></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Descubre propiedades únicas donde cada detalle está pensado para tu comodidad y bienestar
          </p>
        </div>

        {/* Contenedor del carousel */}
        <div className="relative"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
          
          {/* Controles superiores compactos */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Indicadores mini */}
              <div className="hidden xs:flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide % 3 === i 
                        ? 'w-6 bg-gradient-to-r from-primary-500 to-emerald-500' 
                        : 'w-1.5 bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-semibold px-2 py-1 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm">
                {currentSlide + 1} / {Math.max(1, properties.length - (getVisibleCount() - 1))}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Botón play/pause minimalista */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <div className="flex items-center gap-0.5">
                    <div className="w-0.5 h-2.5 bg-primary-600 rounded-full animate-pulse"></div>
                    <div className="w-0.5 h-2.5 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[7px] border-transparent border-l-primary-600 ml-0.5"></div>
                )}
              </button>
              
              {/* Flechas de navegación compactas */}
              <div className="flex items-center gap-1">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel ultra responsivo */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
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
                    className="px-2 sm:px-3 flex-shrink-0"
                    style={{ width: `${100 / getVisibleCount()}%` }}
                  >
                    <div className="relative h-full">
                      <a 
                        href={`/properties/${property.slug}`} 
                        className="block h-full group cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <div className="relative h-[480px] xs:h-[500px] sm:h-[520px] md:h-[540px] rounded-xl sm:rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                          
                          {/* Imagen optimizada */}
                          <div className="relative h-40 xs:h-44 sm:h-48 md:h-56 overflow-hidden">
                            <img
                              src={property.images[0] || '/images/placeholder.jpg'}
                              alt={property.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
                            
                            {/* Efecto de luz sutil */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-2xl"></div>
                            
                            {/* Badge exclusivo minimalista */}
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                              <div className="relative group/badge">
                                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg font-bold shadow-lg transform -rotate-1 group-hover/badge:rotate-0 transition-transform duration-300">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                                    <span className="text-[10px] sm:text-xs uppercase tracking-wide">Premium</span>
                                  </div>
                                </div>
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg blur opacity-40 -z-10"></div>
                              </div>
                            </div>
                            
                            {/* Favorito compacto */}
                            <button 
                              onClick={(e) => toggleFavorite(String(property.id), e)}
                              className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/30 hover:border-red-400 transition-all duration-300 hover:scale-110 group/fav"
                            >
                              <Heart className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white/90'} group-hover/fav:fill-red-500 group-hover/fav:text-red-500 transition-all`} />
                            </button>
                          </div>
                          
                          {/* Contenido compacto y organizado */}
                          <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
                            {/* Categoría mini */}
                            {property.category && (
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary-500/10 to-emerald-500/10 dark:from-primary-500/20 dark:to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                  <CategoryIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
                                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm font-bold truncate">{property.category.name}</span>
                                  </div>
                                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Categoría premium</div>
                                </div>
                              </div>
                            )}
                            
                            {/* Título compacto */}
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight">
                              {property.name}
                            </h3>
                            
                            {/* Descripción mini - solo primeras 6 palabras */}
                            <p className="text-[11px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-snug">
                              {property.description?.split(' ').slice(0, 6).join(' ')}
                            </p>
                            
                            {/* Grid de info compacto */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg p-2 sm:p-3 border border-gray-200/50 dark:border-gray-600/50">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                  <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">Capacidad</span>
                                </div>
                                <div className="text-sm sm:text-base md:text-lg font-black text-gray-900 dark:text-white">
                                  {property.capacity}
                                  <span className="text-[10px] sm:text-xs font-normal text-gray-500 ml-1">pers.</span>
                                </div>
                              </div>
                              
                              <div className="bg-gradient-to-br from-primary-500/5 via-blue-500/5 to-emerald-500/10 dark:from-primary-500/10 dark:to-emerald-500/10 rounded-lg p-2 sm:p-3 border border-primary-200/50 dark:border-primary-700/50">
                                <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">Por noche</div>
                                <div className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">
                                  ${(property.pricePerNight / 1000).toFixed(0)}k
                                </div>
                              </div>
                            </div>
                            
                            {/* CTA compacto con efecto - ancho completo */}
                            <div className="relative pt-2 w-full">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                              <div className="relative w-full bg-gradient-to-r from-primary-600 to-emerald-600 text-white font-bold py-2 xs:py-2.5 sm:py-3 rounded-lg text-center text-[11px] xs:text-xs sm:text-sm group-hover:from-primary-700 group-hover:to-emerald-700 transition-all duration-300 transform group-hover:scale-[1.02] shadow-lg">
                                Ver disponibilidad
                              </div>
                            </div>
                          </div>
                          
                          {/* Borde brillante en hover */}
                          <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-primary-400/30 dark:group-hover:border-primary-500/30 transition-all duration-500 pointer-events-none"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Indicadores inferiores minimalistas */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              {Array.from({ length: Math.ceil(properties.length / getVisibleCount()) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index * getVisibleCount())}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentSlide / getVisibleCount()) === index
                      ? 'w-6 sm:w-8 bg-gradient-to-r from-primary-500 to-emerald-500'
                      : 'w-1.5 sm:w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Ir a grupo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA moderno y llamativo */}
        <div className="text-center mt-12 sm:mt-16">
          <a
            href="/properties"
            className="group inline-flex items-center justify-center gap-2 sm:gap-3 relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-2xl border-2 border-transparent group-hover:border-primary-500/30 transition-all duration-300 shadow-xl group-hover:shadow-2xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm sm:text-base">Explorar todas las fincas</span>
                <div className="relative">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  <ChevronRight className="absolute -right-3 sm:-right-4 w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300" />
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </a>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.3;
          }
          50% { 
            opacity: 0.6;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 3s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-float {
          animation: float linear infinite;
        }
        
        /* Mejoras de desenfoque */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        /* Optimización de transiciones para móviles */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Breakpoint personalizado para dispositivos extra pequeños */
        @media (min-width: 475px) {
          .xs\\:h-44 {
            height: 11rem;
          }
          .xs\\:flex {
            display: flex;
          }
        }
      `}</style>
    </section>
  )
}