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
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const carouselRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const touchStartX = useRef<number>(0)

  // Detectar dispositivo con más breakpoints
  const [deviceSize, setDeviceSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
  
  // Intersection Observer para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const checkDevice = () => {
      const width = window.innerWidth
      if (width < 480) setDeviceSize('xs')
      else if (width < 768) setDeviceSize('sm')
      else if (width < 1024) setDeviceSize('md')
      else if (width < 1280) setDeviceSize('lg')
      else setDeviceSize('xl')
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const difference = touchStartX.current - touchEndX
    const threshold = 50

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  const nextSlide = () => {
    setCurrentSlide(prev => {
      if (properties.length === 0) return 0
      return prev >= properties.length - 1 ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentSlide(prev => {
      if (properties.length === 0) return 0
      return prev <= 0 ? properties.length - 1 : prev - 1
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
    switch (deviceSize) {
      case 'xs': return 1
      case 'sm': return 1
      case 'md': return 2
      case 'lg': return 3
      case 'xl': return 3
      default: return 3
    }
  }

  // Función para obtener icono según categoría
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName?.toLowerCase() || ''
    if (name.includes('río') || name.includes('playa') || name.includes('agua')) return Waves
    if (name.includes('montaña') || name.includes('sierra')) return Mountain
    if (name.includes('bosque') || name.includes('selva')) return Trees
    return Home
  }

  // Calcular el índice de visualización para el carrusel
  const getVisibleStartIndex = () => {
    const visibleCount = getVisibleCount()
    return Math.floor(currentSlide / visibleCount) * visibleCount
  }

  // Función para truncar descripción a 5 palabras
  const truncateDescription = (description: string) => {
    const words = description.split(' ')
    return words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '')
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* Efecto de partículas flotantes sutiles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: `radial-gradient(circle, rgba(${
                i % 3 === 0 ? '250,204,21' : i % 3 === 1 ? '14,165,233' : '34,197,94'
              }, 0.4), transparent)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Fondo dinámico con gradientes animados */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/20 to-emerald-900/10 animate-gradient-shift"></div>
        
        {/* Lentes de luz dinámicas */}
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gold-500/10 via-transparent to-gold-300/5 blur-3xl animate-pulse-gentle"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-ocean-500/10 via-transparent to-ocean-300/5 blur-3xl animate-pulse-gentle" style={{ animationDelay: '2s' }}></div>
        
        {/* Patrón geométrico sutil */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:50px_50px] animate-geometric-shift"></div>
        </div>
      </div>

      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="py-16 md:py-24 lg:py-32">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            {/* Encabezado con animación de aparición */}
            <div className="text-center mb-16 lg:mb-24">
              <div className="inline-flex items-center justify-center mb-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500/30 via-primary-400/20 to-gold-500/30 rounded-full blur-2xl animate-pulse-slow"></div>
                  <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-2xl border border-gray-900 dark:border-gold-500/30 shadow-2xl shadow-gold-500/10 hover:shadow-gold-500/30 transition-all duration-500 animate-glow-pulse">
                    <Sparkles className="w-5 h-5 text-gray-900 dark:text-gold-300 animate-spin-slow" />
                    <span className="text-sm font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gold-300 dark:via-yellow-200 dark:to-gold-300 bg-clip-text text-transparent">
                      Selección luxury
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="relative mb-8">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 bg-gradient-to-r from-gold-500/10 via-gold-300/5 to-gold-500/10 blur-3xl"></div>
                
                <div className="relative">
                  <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-white via-gold-100 to-white bg-clip-text text-transparent animate-gradient-flow">
                      FINCAS
                    </span>
                  </span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mt-2">
                    <span className="bg-gradient-to-br from-gold-300 via-gold-400 to-yellow-300 bg-clip-text text-transparent animate-gradient-flow" style={{ animationDelay: '0.5s' }}>
                      EXCLUSIVAS
                    </span>
                  </span>
                </div>

                {/* Efecto de subrayado animado */}
                <div className="flex justify-center gap-4 mt-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full animate-line-extend"></div>
                  <div className="w-20 h-1 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 rounded-full animate-line-extend" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full animate-line-extend" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </h1>

              <p className="relative text-lg text-gray-900 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light tracking-wide animate-fade-up">
                Descubre propiedades donde la <span className="font-bold text-gold-300">excelencia</span> se encuentra con la <span className="font-bold text-gold-300">naturaleza</span>, creando experiencias que trascienden lo ordinario
              </p>
            </div>

            {/* Carrusel con efectos avanzados */}
            <div 
              className="relative group/carousel mt-16"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Controles de navegación flotantes */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl flex items-center justify-center border border-white/20 hover:border-gold-400/50 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-gold-500/30 z-20 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:text-gold-300 transition-colors" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl flex items-center justify-center border border-white/20 hover:border-gold-400/50 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-gold-500/30 z-20 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:text-gold-300 transition-colors" />
              </button>

              {/* Contenedor del carrusel */}
              <div className="relative overflow-hidden rounded-3xl md:rounded-4xl -mx-2 md:-mx-3 lg:-mx-4 px-2 md:px-3 lg:px-4">
                <div 
                  ref={carouselRef}
                  className="flex transition-transform duration-1000 ease-out"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  style={{ 
                    transform: `translateX(-${getVisibleStartIndex() * (100 / getVisibleCount())}%)`,
                    width: `${properties.length * (100 / getVisibleCount())}%`
                  }}
                >
                  {properties.map((property, index) => {
                    const CategoryIcon = getCategoryIcon(property.category?.name || '')
                    const isFavorite = favorites.has(String(property.id))
                    const isCurrent = index === currentSlide
                    
                    return (
                      <div
                        key={property.id}
                        className="px-2 md:px-3 lg:px-4 flex-shrink-0"
                        style={{ width: `${100 / getVisibleCount()}%` }}
                      >
                        <a 
                          href={`/properties/${property.slug}`} 
                          className="block group/card h-full"
                        >
                          {/* Tarjeta con efectos 3D */}
                          <div className={`relative h-full rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl border border-white/10 hover:border-gold-400/30 transition-all duration-700 group-hover/card:transform-gpu group-hover/card:scale-[1.02] group-hover/card:-translate-y-2 ${isCurrent ? 'shadow-2xl shadow-gold-500/20' : 'shadow-xl'}`}>
                            
                            {/* Efecto de brillo en hover */}
                            <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-gold-500/0 via-gold-400/0 to-gold-500/0 group-hover/card:from-gold-500/5 group-hover/card:via-gold-400/3 group-hover/card:to-gold-500/5 transition-all duration-700"></div>
                            
                            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden flex flex-col h-full">
                              {/* Contenedor de imagen con parallax effect */}
                              <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10"></div>
                                <div className="absolute inset-0 group-hover/card:scale-110 transition-transform duration-1000">
                                  <img
                                    src={property.images[0] || '/images/placeholder.jpg'}
                                    alt={property.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                
                                {/* Badge de categoría */}
                                {property.category && (
                                  <div className="absolute top-4 left-4 z-20">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                                      <CategoryIcon className="w-4 h-4 text-gold-300" />
                                      <span className="text-xs font-medium text-white">{property.category.name}</span>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Botón favorito con efecto de onda */}
                                <button 
                                  onClick={(e) => toggleFavorite(String(property.id), e)}
                                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:border-red-400/50 transition-all duration-300 hover:scale-110 group/fav z-20"
                                >
                                  <Heart className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white group-hover/fav:text-red-400'}`} />
                                </button>
                                
                                {/* Precio con efecto de aparición */}
                                <div className="absolute bottom-4 left-4 z-20">
                                  <div className="text-2xl md:text-3xl font-bold">
                                    <span className="bg-gradient-to-r from-gold-300 via-yellow-200 to-gold-300 bg-clip-text text-transparent">
                                      ${(property.pricePerNight / 1000).toFixed(0)}k
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-900 dark:text-gray-300">por noche</div>
                                </div>
                              </div>
                              
                              {/* Contenido de la tarjeta */}
                              <div className="p-4 md:p-6 flex flex-col flex-1 bg-gradient-to-b from-gray-900/50 to-black/70">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover/card:text-gold-100 transition-colors line-clamp-2">
                                  {property.name}
                                </h3>
                                
<p className="text-sm text-gray-900 dark:text-gray-300 mb-4 line-clamp-2 flex-1">
                                  {truncateDescription(property.description)}
                                </p>
                                
                                {/* Amenidades */}
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-900 dark:text-gray-300">{property.capacity} personas</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-gold-300" />
                                    <span className="text-sm text-gray-900 dark:text-gray-300">Exclusivo</span>
                                  </div>
                                </div>
                                
                                {/* Botón de acción */}
                                <div className="relative group/btn absolute bottom-4 left-4 md:static md:bottom-auto md:left-auto md:mt-0">
                                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-gold-400/10 rounded-lg blur-xl group-hover/btn:blur-2xl transition-all duration-500 hidden md:block"></div>
                                  <button className="relative w-auto md:w-full px-3 py-1 md:py-3 md:px-0 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-white text-[10px] md:text-base font-medium hover:from-gold-600 hover:to-gold-700 transition-all duration-300 transform hover:scale-[1.02]">
                                    Ver Detalles
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Indicadores personalizados */}
              <div className="flex justify-center mt-8 gap-2">
                {properties.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="relative group/indicator"
                    aria-label={`Ir a propiedad ${index + 1}`}
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${currentSlide === index ? 'bg-gold-400 scale-125' : 'bg-white/30 hover:bg-white/50'}`}></div>
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-gold-400/20 animate-ping-once" style={{ animationDelay: `${index * 100}ms` }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA final */}
            <div className="text-center mt-20">
              <div className="relative inline-block group/cta">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/30 via-transparent to-gold-500/30 blur-3xl animate-pulse-slow"></div>
                
                <a
                  href="/properties"
                  className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl border border-gray-900 dark:border-white/20 hover:border-gold-400/50 transition-all duration-500 group-hover/cta:scale-105 group-hover/cta:shadow-2xl group-hover/cta:shadow-gold-500/20"
                >
                  <span className="text-lg font-medium bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent animate-gradient-flow">
                    Explorar Todas las Propiedades
                  </span>
                  <div className="relative">
                    <ChevronRight className="w-5 h-5 text-white transform group-hover/cta:translate-x-2 transition-transform duration-500" />
                    <ChevronRight className="absolute inset-0 w-5 h-5 text-white opacity-0 group-hover/cta:opacity-100 group-hover/cta:translate-x-4 transition-all duration-500" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-flow {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          50% { 
            transform: translateY(-100px) translateX(50px) rotate(180deg);
            opacity: 0.3;
          }
          90% { opacity: 0.6; }
        }
        
        @keyframes geometric-shift {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        @keyframes line-extend {
          0% { 
            width: 0;
            opacity: 0;
          }
          100% { 
            width: var(--target-width);
            opacity: 1;
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(250, 204, 21, 0.6);
          }
        }
        
        @keyframes fade-up {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes ping-once {
          0% { 
            transform: scale(1);
            opacity: 0.8;
          }
          100% { 
            transform: scale(3);
            opacity: 0;
          }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        
        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradient-flow 3s linear infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 4s ease-in-out infinite;
        }
        
        .animate-particle-float {
          animation: particle-float linear infinite;
        }
        
        .animate-geometric-shift {
          animation: geometric-shift 20s linear infinite;
        }
        
        .animate-line-extend {
          --target-width: auto;
          animation: line-extend 1s ease-out forwards;
          animation-delay: var(--delay, 0s);
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .animate-fade-up {
          animation: fade-up 1s ease-out 0.5s both;
        }
        
        .animate-ping-once {
          animation: ping-once 0.6s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Efecto de vidrio esmerilado */
        .backdrop-blur-2xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        
        /* Optimización de rendimiento */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Ajustes responsivos */
        @media (max-width: 640px) {
          .text-8xl { font-size: 3rem; }
          .text-7xl { font-size: 2.5rem; }
        }
      `}</style>
    </section>
  )
}