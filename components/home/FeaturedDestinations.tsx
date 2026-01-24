'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Sparkles, Heart, Star, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  const carouselRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  // Configurar autoplay
  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 4000)
  }

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (isPlaying) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return () => stopAutoPlay()
  }, [isPlaying, currentIndex])

  // Detectar dispositivo
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Touch events para swipe en móviles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isSwipe = Math.abs(distance) > 50

    if (isSwipe) {
      if (distance > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    
    setTouchStart(null)
    setTouchEnd(null)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (categories.length === 0) return 0
      return prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (categories.length === 0) return 0
      return prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    })
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data.slice(0, 5)) // Tomar más categorías para el carousel
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
          
          <div className="flex justify-center">
            <div className="w-full max-w-4xl h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl animate-pulse"></div>
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
        {/* Partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado con gradiente */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-primary-600/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-400/20 mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">
              CAROUSEL INTERACTIVO
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4">
            Descubre los{' '}
            <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
              pueblos mágicos
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            Desliza, navega y explora los destinos más encantadores de Antioquia
          </p>
        </div>

        {/* Contenedor del Carousel */}
        <div className="relative max-w-6xl mx-auto px-14 xs:px-16 sm:px-20 md:px-24 lg:px-28">
          {/* Flechas de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
            aria-label="Destino anterior"
          >
            <ChevronLeft className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
            aria-label="Siguiente destino"
          >
            <ChevronRight className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors" />
          </button>

          {/* Controles del carousel */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            <button
              onClick={toggleAutoPlay}
              className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              aria-label={isPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary-600" />
              ) : (
                <Play className="w-5 h-5 text-primary-600" />
              )}
            </button>
            
            {/* Indicadores de posición */}
            <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-gradient-to-r from-primary-500 to-primary-600' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Ir al destino ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Carousel principal */}
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${categories.length * 100}%`
              }}
            >
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="w-full flex-shrink-0 transition-all duration-500"
                >
                  <div
                    className="group relative"
                    onMouseEnter={() => {
                      setHoveredCard(index)
                      if (isPlaying) stopAutoPlay()
                    }}
                    onMouseLeave={() => {
                      setHoveredCard(null)
                      if (isPlaying) startAutoPlay()
                    }}
                  >
                    <Link href={`/destinations/${category.slug}`}>
                      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 active:scale-95">
                        {/* Imagen con overlay ajustado para mejor visibilidad */}
                        <div className="absolute inset-0">
                          <Image
                            src={category.imageUrl}
                            alt={category.name}
                            fill
                            className="object-cover object-center w-full h-full"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                            priority={index === currentIndex}
                          />
                          {/* Overlay más sutil para mejor visibilidad de la imagen */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                          {/* Efecto de luz sutil ajustado */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 via-transparent to-ocean-500/10 mix-blend-overlay"></div>
                          
                          {/* Filtro de brillo para mejorar contraste */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
                        </div>

                        {/* Badge de ubicación animado */}
                        <div className="absolute top-6 left-6">
                          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-3 rounded-xl border border-primary-400/30 animate-pulse-slow">
                            <MapPin className="w-5 h-5 text-primary-400 animate-bounce-slow" />
                            <span className="text-white text-base font-bold">Antioquia</span>
                          </div>
                        </div>

                        {/* Botón de favorito */}
                        <button 
                          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/30 hover:border-primary-400 transition-all duration-300 hover:scale-110 hover:bg-black/70 group"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                        >
                          <Heart className={`w-6 h-6 ${
                            hoveredCard === index 
                              ? 'text-primary-400 fill-primary-400 animate-pulse' 
                              : 'text-white/80'
                          } transition-all duration-300`} />
                        </button>

                        {/* Contenido principal con fondo semitransparente para mejor legibilidad */}
                        <div className="absolute inset-x-0 bottom-0 p-8">
                          <div className="relative">
                            {/* Fondo semitransparente para el texto */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl -m-4"></div>
                            
                            <div className="relative transform transition-all duration-700 translate-y-0">
                              <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-lg pr-2">
                                  {category.name}
                                </h3>
                                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                                  <Star className="w-5 h-5 text-gold-500 fill-gold-500 animate-pulse" />
                                  <span className="text-white text-lg font-bold">4.8</span>
                                </div>
                              </div>
                              
                              <p className="text-white/95 text-base sm:text-lg mb-8 line-clamp-3 max-w-2xl drop-shadow-md">
                                {category.description}
                              </p>
                              
                              {/* Botón de acción */}
                              <div className="flex items-center gap-4">
                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg group z-10 relative">
                                  <span>Explorar Pueblo</span>
                                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                                
                                <div className="text-white/80 text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                                  {index + 1} / {categories.length}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Efecto de borde gradiente animado más sutil */}
                        <div className={`absolute inset-0 rounded-3xl border-3 border-transparent transition-all duration-500 ${
                          hoveredCard === index 
                            ? 'border-primary-500/40 shadow-[0_0_40px_rgba(59,130,246,0.4)]' 
                            : 'border-transparent'
                        }`}></div>

                        {/* Efecto de partículas en hover */}
                        {hoveredCard === index && (
                          <div className="absolute inset-0 overflow-hidden">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-primary-400/20 rounded-full animate-float"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${i * 0.1}s`
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <Link
            href="/destinations"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:scale-105"
          >
            <span>Descubrir Todos los Destinos</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Estilos CSS para animaciones personalizadas */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        /* Smooth transitions */
        .transition-transform {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Mejora de rendimiento para animaciones */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-pulse-slow,
          .animate-bounce-slow {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}