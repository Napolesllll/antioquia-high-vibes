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

  // Detectar dispositivo con más breakpoints
  const [deviceSize, setDeviceSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
  
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

  return (
    <section className="relative w-full overflow-hidden">
      {/* Padding responsivo */}
      <div className="py-8 xs:py-12 sm:py-16 md:py-24 lg:py-32">
      
      {/* Fondo épico con múltiples capas */}
      <div className="absolute inset-0">
        {/* Gradiente de fondo principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/40 to-emerald-900/40 dark:from-gray-950 dark:via-blue-950 dark:to-emerald-950"></div>
        
        {/* Orbes de luz épicos - responsivos */}
        <div className="absolute -top-20 xs:-top-32 sm:-top-40 -right-20 xs:-right-32 sm:-right-40 w-40 h-40 xs:w-64 sm:w-80 xs:h-64 sm:h-80 bg-gradient-to-br from-gold-400/40 via-primary-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/4 xs:top-1/3 -left-20 xs:-left-32 sm:-left-40 w-48 h-48 xs:w-64 sm:w-96 xs:h-64 sm:h-96 bg-gradient-to-br from-ocean-500/30 via-primary-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute -bottom-16 xs:-bottom-24 sm:-bottom-32 right-1/4 w-40 h-40 xs:w-56 sm:w-72 xs:h-56 sm:h-72 bg-gradient-to-tl from-emerald-500/25 via-primary-400/15 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        
        {/* Grid luminoso ultra sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(255,255,255,0.06)_0.5px,transparent_0.5px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(255,255,255,0.02)_0.5px,transparent_0.5px)] bg-[size:3rem_3rem] xs:bg-[size:4rem_4rem] sm:bg-[size:5rem_5rem] opacity-40"></div>
        
        {/* Líneas decorativas diagonales */}
        <div className="absolute top-1/4 -left-1/2 w-64 xs:w-96 h-px bg-gradient-to-r from-transparent via-ocean-400/20 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-1/4 -right-1/2 w-64 xs:w-96 h-px bg-gradient-to-r from-transparent via-primary-400/20 to-transparent transform rotate-45"></div>
        
        {/* Partículas flotantes premium */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              background: i % 3 === 0 ? 'rgba(34, 197, 94, 0.4)' : i % 3 === 1 ? 'rgba(14, 165, 233, 0.4)' : 'rgba(250, 204, 21, 0.3)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 15}s`,
            }}
          />
        ))}
        
        {/* Efecto de luz radial */}
        <div className="absolute inset-0 bg-radial-gradient opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-full overflow-hidden">
        {/* Container responsivo con padding dinámico */}
        <div className="mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 max-w-6xl lg:max-w-7xl">
          {/* Encabezado épico y cautivador */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          {/* Badge premium animado - responsivo */}
          <div className="inline-flex items-center justify-center mb-4 xs:mb-5 sm:mb-6 md:mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-ocean-500 to-gold-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative inline-flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded-full bg-gradient-to-r from-gray-900/80 to-gray-900/60 dark:from-gray-950/80 dark:to-gray-950/60 backdrop-blur-xl border border-primary-500/30 shadow-xl">
                <div className="flex items-center gap-1.5 xs:gap-2 whitespace-nowrap">
                  <div className="relative w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex-shrink-0">
                    <Sparkles className="w-full h-full text-gold-400 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <span className="text-[10px] xs:text-xs sm:text-sm font-black bg-gradient-to-r from-gold-300 via-primary-300 to-ocean-300 bg-clip-text text-transparent uppercase tracking-widest hidden xs:inline">
                    Experiencias
                  </span>
                  <span className="text-[10px] xs:text-xs sm:text-sm font-black bg-gradient-to-r from-gold-300 via-primary-300 to-ocean-300 bg-clip-text text-transparent uppercase tracking-widest xs:hidden">
                    Premium
                  </span>
                  <Award className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gold-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Título monumental - responsivo */}
          <h2 className="relative mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">
            {/* Brillo de fondo */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 xs:h-16 sm:h-24 md:h-32 lg:h-40 bg-gradient-to-r from-primary-500/20 via-ocean-500/10 to-primary-500/20 blur-3xl"></div>
            
            {/* Texto principal */}
            <div className="relative">
              <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-primary-200 to-white dark:from-blue-100 dark:via-primary-100 dark:to-emerald-100 bg-clip-text text-transparent drop-shadow-lg">
                  Fincas
                </span>
              </span>
              <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight mt-1 xs:mt-1.5 sm:mt-2 md:mt-3 lg:mt-4">
                <span className="bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-500 bg-clip-text text-transparent drop-shadow-lg">
                  Exclusivas
                </span>
              </span>
            </div>
            
            {/* Subrayado decorativo animado */}
            <div className="flex justify-center gap-1 xs:gap-1.5 sm:gap-2 mt-3 xs:mt-4 sm:mt-6 md:mt-8">
              <div className="w-4 xs:w-6 sm:w-8 md:w-12 h-0.5 xs:h-1 bg-gradient-to-r from-primary-500 to-ocean-500 rounded-full"></div>
              <div className="w-8 xs:w-12 sm:w-16 md:w-20 h-0.5 xs:h-1 bg-gradient-to-r from-gold-400 to-primary-500 rounded-full"></div>
              <div className="w-4 xs:w-6 sm:w-8 md:w-12 h-0.5 xs:h-1 bg-gradient-to-r from-ocean-500 to-primary-500 rounded-full"></div>
            </div>
          </h2>
          
          <p className="relative text-xs xs:text-sm sm:text-base md:text-lg text-gray-200 dark:text-blue-100 max-w-2xl xs:max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-3 xs:px-4 sm:px-6 font-medium">
            Propiedades cuidadosamente seleccionadas donde la <span className="font-bold text-gold-300">lujo</span>, la <span className="font-bold text-primary-300">naturaleza</span> y el <span className="font-bold text-ocean-300">confort</span> se encuentran en perfecta armonía
          </p>
        </div>

        {/* Contenedor del carousel épico */}
        <div className="relative group/carousel mt-8 xs:mt-10 sm:mt-12 md:mt-16 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
          
          {/* Carousel ultra responsivo */}
          <div className="relative overflow-hidden rounded-2xl xs:rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-2xl">
            {/* Efecto de borde brillante */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 via-gold-500/30 to-ocean-500/30 rounded-2xl xs:rounded-2xl sm:rounded-3xl md:rounded-4xl opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${getVisibleStartIndex() * (100 / getVisibleCount())}%)`,
                width: `${properties.length * (100 / getVisibleCount())}%`
              }}
            >
              {properties.map((property, index) => {
                const CategoryIcon = getCategoryIcon(property.category?.name || '')
                const isFavorite = favorites.has(String(property.id))
                
                return (
                  <div
                    key={property.id}
                    className="px-1.5 xs:px-2 sm:px-3 md:px-4 lg:px-5 flex-shrink-0"
                    style={{ width: `${100 / getVisibleCount()}%` }}
                  >
                    <a 
                      href={`/properties/${property.slug}`} 
                      className="block group/card h-full"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {/* Tarjeta premium - altura responsiva mejorada */}
                      <div className="relative rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/20 dark:to-gray-900/20 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover/card:-translate-y-2 xs:group-hover/card:-translate-y-3 border border-white/30 dark:border-white/10 group-hover/card:border-gold-400/50">
                        
                        {/* Contenedor interno con overflow hidden para todo el contenido */}
                        <div className="rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl overflow-visible relative flex flex-col min-h-[550px] sm:min-h-[540px] md:min-h-[560px] lg:min-h-[600px]">
                        {/* Imagen épica con efectos */}
                        <div className="relative h-[160px] sm:h-48 md:h-52 lg:h-56 flex-shrink-0 overflow-hidden">
                          <img
                            src={property.images[0] || '/images/placeholder.jpg'}
                            alt={property.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-125 group-hover/card:rotate-1"
                          />
                          
                          {/* Overlay gradiente épico */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div>
                          
                          {/* Efecto de destello en hover */}
                          <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-300/30 via-transparent to-primary-300/30"></div>
                          </div>
                          
                          {/* Badge premium épico - responsivo */}
                          <div className="absolute top-2 xs:top-2.5 sm:top-3 md:top-4 left-2 xs:left-2.5 sm:left-3 md:left-4 z-20">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-xl xs:rounded-2xl blur-lg opacity-50 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                              <div className="relative bg-gradient-to-r from-gold-500 to-yellow-500 text-gray-900 px-2.5 xs:px-3 sm:px-4 md:px-5 py-1 xs:py-1.5 sm:py-2 md:py-2.5 rounded-lg xs:rounded-xl sm:rounded-2xl font-black shadow-xl transform -rotate-2 group-hover/card:rotate-0 transition-all duration-300 flex items-center gap-1 xs:gap-1.5">
                                <Star className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-current flex-shrink-0" />
                                <span className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap">Exclusiva</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Botón favorito épico - responsivo */}
                          <button 
                            onClick={(e) => toggleFavorite(String(property.id), e)}
                            className="absolute top-2 xs:top-2.5 sm:top-3 md:top-4 right-2 xs:right-2.5 sm:right-3 md:right-4 w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md flex items-center justify-center border-2 border-white/50 hover:border-red-400 transition-all duration-300 hover:scale-125 group/fav shadow-lg z-20"
                          >
                            <Heart className={`w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-300 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-700 dark:text-gray-300'} group-hover/fav:fill-red-500 group-hover/fav:text-red-500 group-hover/fav:scale-110`} />
                          </button>
                        </div>
                        
                        {/* Contenido premium - responsivo con flex-1 para ocupar espacio */}
                        <div className="p-3 xs:p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-1 bg-gradient-to-b from-gray-900/50 via-gray-900/70 to-gray-950/90 dark:from-gray-900/60 dark:to-gray-950 backdrop-blur-xl min-h-0">
                          
                          {/* Categoría con icono */}
                          {property.category && (
                            <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 flex-shrink-0 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4">
                              <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-gold-500/20 to-primary-500/20 flex items-center justify-center flex-shrink-0 border border-gold-500/30">
                                <CategoryIcon className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gold-400" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 xs:gap-2 text-gold-300">
                                  <MapPin className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span className="text-xs xs:text-xs sm:text-sm font-bold truncate">{property.category.name}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Título épico - responsivo */}
                          <h3 className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-black text-white group-hover/card:text-gold-200 transition-colors line-clamp-2 leading-tight flex-shrink-0 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4">
                            {property.name}
                          </h3>
                          
                          {/* Descripción elegante - responsiva */}
                          <p className="text-xs xs:text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2 flex-shrink-0 mb-3 xs:mb-3.5 sm:mb-4">
                            {property.description?.split(' ').slice(0, 8).join(' ')}...
                          </p>
                          
                          {/* Spacer para empujar contenido hacia abajo */}
                          <div className="flex-1 min-h-[8px]"></div>
                          
                          {/* Grid de información premium - responsivo - COLUMNA en móvil, GRID en desktop */}
                          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 flex-shrink-0 mb-3 xs:mb-3.5 sm:mb-4 md:mb-4">
                            <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-2xl p-2.5 xs:p-3 sm:p-3 md:p-4 border border-primary-500/30 group-hover/card:border-primary-400/60 transition-all duration-300">
                              <div className="flex items-center gap-1.5 xs:gap-1.5 mb-1.5 xs:mb-2">
                                <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-300 flex-shrink-0" />
                                <span className="text-[9px] xs:text-[10px] sm:text-xs md:text-xs text-primary-200 font-bold leading-none">Capacidad</span>
                              </div>
                              <div className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-black text-white">
                                {property.capacity}
                              </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gold-500/30 to-yellow-600/20 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-2xl p-2.5 xs:p-3 sm:p-3 md:p-4 border border-gold-500/40 group-hover/card:border-gold-400/60 transition-all duration-300">
                              <div className="text-[9px] xs:text-[10px] sm:text-xs md:text-xs text-gold-100 font-bold leading-none mb-1.5 xs:mb-2">Por Noche</div>
                              <div className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-black">
                                <span className="bg-gradient-to-r from-gold-200 to-yellow-200 bg-clip-text text-transparent">
                                  ${(property.pricePerNight / 1000).toFixed(0)}k
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* CTA épico - responsivo - PEQUEÑO en móvil, esquina inferior izquierda */}
                          <div className="relative flex-shrink-0 sm:w-full w-auto self-start sm:self-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-gold-500 to-ocean-500 rounded-lg sm:rounded-xl md:rounded-2xl blur-lg opacity-40 group-hover/card:opacity-70 transition-opacity duration-300"></div>
                            <div className="relative bg-gradient-to-r from-primary-600 via-gold-500 to-ocean-600 text-white font-bold px-4 py-2 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl md:rounded-2xl text-center text-xs sm:text-sm group-hover/card:from-primary-700 group-hover/card:via-gold-600 group-hover/card:to-ocean-700 transition-all duration-300 transform group-hover/card:scale-105 shadow-xl group-hover/card:shadow-2xl whitespace-nowrap sm:w-full">
                              Reservar
                            </div>
                          </div>
                        </div>
                        </div>
                        
                        {/* Borde brillante */}
                        <div className="absolute inset-0 rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl border-2 border-transparent group-hover/card:border-gold-400/40 transition-all duration-500 pointer-events-none"></div>
                      </div>
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Controles de navegación flotantes - solo desktop */}
          <div className="hidden lg:block absolute -left-12 xl:-left-16 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevSlide}
              className="group/btn w-10 xl:w-12 h-10 xl:h-12 rounded-full bg-gradient-to-br from-primary-500 to-ocean-500 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-gold-500/50"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6 text-white group-hover/btn:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="hidden lg:block absolute -right-12 xl:-right-16 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
            <button
              onClick={nextSlide}
              className="group/btn w-10 xl:w-12 h-10 xl:h-12 rounded-full bg-gradient-to-br from-gold-500 to-primary-500 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-gold-500/50"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6 text-white group-hover/btn:-translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          
          {/* Indicadores inferiores - UN PUNTO POR CADA PROPIEDAD */}
          <div className="flex justify-center mt-6 xs:mt-7 sm:mt-8 md:mt-10 lg:mt-12 gap-1 xs:gap-1.5 sm:gap-2 md:gap-2.5">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-400 rounded-full ${
                  currentSlide === index
                    ? 'w-6 xs:w-7 sm:w-8 md:w-10 lg:w-12 h-2 xs:h-2.5 sm:h-3 md:h-3 lg:h-3.5 bg-gradient-to-r from-gold-400 via-primary-400 to-ocean-400 shadow-lg shadow-gold-500/50'
                    : 'w-2 xs:w-2.5 sm:w-3 md:w-3 lg:w-4 h-2 xs:h-2.5 sm:h-3 md:h-3 lg:h-3.5 bg-white/40 hover:bg-white/60 dark:bg-gray-600 dark:hover:bg-gray-500'
                }`}
                aria-label={`Ir a propiedad ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* CTA épico final - responsivo */}
        <div className="text-center mt-10 xs:mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-3 xs:px-4 sm:px-6">
          <a
            href="/properties"
            className="group inline-flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500 via-primary-500 to-ocean-500 rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl blur-xl md:blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-105"></div>
            <div className="relative px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 py-2.5 xs:py-3 sm:py-4 md:py-5 lg:py-6 rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-r from-gold-500 via-primary-500 to-ocean-500 text-white font-black text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl border-2 border-transparent group-hover:border-gold-300 transition-all duration-300 shadow-2xl group-hover:shadow-gold-500/50 group-hover:scale-105 transform">
              <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-4">
                <span className="whitespace-nowrap">Explorar Fincas</span>
                <div className="relative flex items-center">
                  <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 transform group-hover:translate-x-2 xs:group-hover:translate-x-2.5 transition-transform duration-500" />
                  <ChevronRight className="absolute -right-2 xs:-right-2.5 sm:-right-3 md:-right-4 w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 xs:group-hover:translate-x-5 transition-all duration-500" />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      </div>
      </div>

      {/* Estilos CSS avanzados y animaciones épicas */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer-ultra {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(100%) skewX(-20deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.4;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
          }
          50% { 
            opacity: 0.8;
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.6);
          }
        }

        @keyframes float-premium {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-50px) translateX(0);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-30px) translateX(-15px);
            opacity: 0.5;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            text-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(250, 204, 21, 0.8);
          }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        
        .animate-shimmer-ultra::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer-ultra 3s infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-float {
          animation: float-premium linear infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        
        /* Efectos de cristal mejorados */
        .backdrop-blur-xl {
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
        }

        /* Gradiente radial personalizado */
        .bg-radial-gradient {
          background: radial-gradient(ellipse 80% 80% at 50% 0%, rgba(34, 197, 94, 0.1), transparent);
        }

        /* Mejora de sombras */
        .shadow-glow {
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.4);
        }

        /* Optimización para movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Responsive avanzado */
        @media (max-width: 640px) {
          .text-7xl { font-size: 2.5rem; }
          .text-8xl { font-size: 3rem; }
        }
      `}</style>
    </section>
  )
}