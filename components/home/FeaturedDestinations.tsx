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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Cargando destinos mágicos...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 overflow-hidden">
      {/* Fondo con efectos sutiles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(74,222,128,0.1),transparent_50%)]" />
      
      {/* Partículas flotantes */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary-300/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Encabezado con gradiente */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 mb-6 backdrop-blur-sm border border-primary-200 dark:border-primary-700">
          <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400 animate-pulse" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider">
            CAROUSEL INTERACTIVO
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
          Descubre los{' '}
          <span className="relative inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-ocean-600 bg-clip-text text-transparent">
            pueblos mágicos
            <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
              <path
                d="M2 10C50 2 150 2 198 10"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(var(--primary-500))" />
                  <stop offset="100%" stopColor="rgb(var(--primary-600))" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Desliza, navega y explora los destinos más encantadores de Antioquia
        </p>
      </div>

      {/* Contenedor del Carousel */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Flechas de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl flex items-center justify-center text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
            aria-label="Destino anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl flex items-center justify-center text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
            aria-label="Siguiente destino"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Controles del carousel */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
            <button
              onClick={toggleAutoPlay}
              className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            {/* Indicadores de posición */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700">
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
            className="overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="min-w-full relative"
                >
                  <Link
                    href={`/destinations/${category.slug}`}
                    className="block relative h-[500px] md:h-[600px] lg:h-[700px] group"
                    onMouseEnter={() => {
                      setHoveredCard(index)
                      if (isPlaying) stopAutoPlay()
                    }}
                    onMouseLeave={() => {
                      setHoveredCard(null)
                      if (isPlaying) startAutoPlay()
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      {/* Imagen con overlay ajustado para mejor visibilidad */}
                      <div className="relative w-full h-full">
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          fill
                          sizes="100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          priority={index === 0}
                        />
                        
                        {/* Overlay más sutil para mejor visibilidad de la imagen */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Efecto de luz sutil ajustado */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        {/* Filtro de brillo para mejorar contraste */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                      </div>

                      {/* Badge de ubicación animado */}
                      <div className="absolute top-6 left-6 z-10">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg transform transition-all duration-300 group-hover:scale-105 border border-gray-200 dark:border-gray-700">
                          <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          <span className="text-sm font-semibold text-gray-800 dark:text-white">
                            Antioquia
                          </span>
                        </div>
                      </div>

                      {/* Botón de favorito */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        className="absolute top-20 right-6 z-10 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
                        aria-label="Agregar a favoritos"
                      >
                        <Heart className="w-5 h-5" />
                      </button>

                      {/* Contenido principal con fondo semitransparente para mejor legibilidad */}
                      <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-10">
                        {/* Fondo semitransparente para el texto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm" />
                        
                        <div className="relative space-y-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                                {category.name}
                              </h3>
                              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-bold text-yellow-400">4.8</span>
                              </div>
                            </div>
                            <p className="text-base md:text-lg text-gray-200 max-w-2xl line-clamp-2">
                              {category.description}
                            </p>
                          </div>

                          {/* Botón de acción */}
                          <div className="flex items-center gap-4">
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-all duration-300 group-hover:translate-x-2 shadow-lg border border-gray-200 dark:border-gray-700">
                              <span>Explorar Pueblo</span>
                              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                            <span className="text-sm text-gray-300 font-medium">
                              {index + 1} / {categories.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Efecto de borde gradiente animado más sutil */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary-400/30 transition-all duration-700" />
                    </div>

                    {/* Efecto de partículas en hover */}
                    {hoveredCard === index && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-particle"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 2}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border border-primary-500"
          >
            <span>Descubrir Todos los Destinos</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Estilos CSS para animaciones personalizadas */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }

        @keyframes particle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-particle {
          animation: particle 2s ease-out infinite;
        }
      `}</style>
    </section>
  )
}