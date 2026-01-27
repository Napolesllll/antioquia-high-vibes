'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import PropertiesFilters from './PropertiesFilters'
import PropertiesGrid from './PropertiesGrid'
import { ArrowLeft, Home, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

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

interface Stats {
  totalProperties: number
  featuredCount: number
  totalCapacity: number
  averagePrice: number
  destinationsCount: number
}

interface PropertiesPageContentProps {
  properties: Property[]
  stats: Stats
}

export default function PropertiesPageContent({ properties, stats }: PropertiesPageContentProps) {
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [currentPage, setCurrentPage] = useState(1)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  // Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    setWindowWidth(window.innerWidth)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const itemsPerPage = windowWidth < 768 ? 3 : 6
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProperties, currentPage, itemsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredProperties])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/50">
      {/* Hero Section - Completamente responsiva */}
      <div className="relative pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-8 xs:pb-12 sm:pb-16 md:pb-20 px-2.5 xs:px-3 sm:px-4 md:px-6 overflow-hidden">
        {/* Fondo animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-ocean-500/10"></div>
        <div className="absolute top-0 right-0 w-48 h-48 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-primary-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gradient-to-tr from-ocean-500/20 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-8xl mx-auto relative z-10">
          {/* Breadcrumb premium */}
          <div className="mb-4 xs:mb-6 sm:mb-8 md:mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 xs:gap-2 sm:gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 rounded-xl hover:rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 xs:w-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs xs:text-sm sm:text-base">
                Volver al inicio
              </span>
            </Link>
          </div>

          {/* Header principal */}
          <div className="text-center mb-6 xs:mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-gradient-to-r from-primary-500/10 to-ocean-500/10 backdrop-blur-lg px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full border border-primary-400/20 mb-3 xs:mb-4 sm:mb-6">
              <Home className="w-3 h-3 xs:w-3.5 sm:w-4 sm:h-4 text-primary-500" />
              <span className="text-primary-600 dark:text-primary-400 font-bold text-xs sm:text-sm">
                COLECCIÓN EXCLUSIVA
              </span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4 sm:mb-6 leading-tight px-1 xs:px-2">
              Descubre{' '}
              <span className="bg-gradient-to-r from-primary-600 via-ocean-600 to-primary-600 bg-clip-text text-transparent">
                fincas extraordinarias
              </span>
            </h1>
            
            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-2 xs:px-3 sm:px-4 leading-relaxed">
              Explora nuestra colección completa de fincas cuidadosamente seleccionadas en los pueblos más mágicos de Antioquia.
            </p>
          </div>

          {/* Stats Bar - Responsiva */}
          <div className="mb-6 xs:mb-8 sm:mb-12 md:mb-16">
            <div className="bg-gradient-to-r from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-2xl rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-2xl p-3 xs:p-4 sm:p-5 md:p-6 border border-white/50 dark:border-gray-700/50">
              <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                    {stats.totalProperties}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                    Fincas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-gold-600 to-amber-600 bg-clip-text text-transparent">
                    {stats.featuredCount}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                    Destacadas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {stats.totalCapacity}+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                    Capacidad total
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${stats.averagePrice}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                    Precio promedio
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda - Responsivos */}
      <div className="max-w-8xl mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 mb-6 xs:mb-8 sm:mb-12 md:mb-16">
        <PropertiesFilters 
          initialProperties={properties} 
          onFilteredPropertiesChange={setFilteredProperties}
        />
      </div>

      {/* Grid de propiedades */}
      <PropertiesGrid properties={paginatedProperties} />

      {/* Paginación Luxury */}
      {totalPages > 1 && (
        <div className="max-w-8xl mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-8 xs:py-12 sm:py-16 md:py-20">
          <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-4">
            {/* Botón anterior */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="group p-2 xs:p-2.5 sm:p-3 rounded-lg xs:rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
            </button>

            {/* Números de página */}
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isCurrentPage = page === currentPage
                const isNear = Math.abs(page - currentPage) <= 1
                
                if (totalPages <= 5 || isCurrentPage || isNear) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`
                        relative px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl text-xs xs:text-sm sm:text-base font-semibold transition-all duration-300
                        ${isCurrentPage
                          ? 'bg-gradient-to-r from-primary-600 to-ocean-600 text-white shadow-lg shadow-primary-500/50'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400'
                        }
                      `}
                    >
                      {page}
                    </button>
                  )
                } else if (isNear || (page === 2 && currentPage === 1) || (page === totalPages - 1 && currentPage === totalPages)) {
                  return null
                } else if (page === 2 || page === totalPages - 1) {
                  return (
                    <span key={`ellipsis-${page}`} className="text-gray-400 dark:text-gray-600 px-1 text-xs xs:text-sm">
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>

            {/* Botón siguiente */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="group p-2 xs:p-2.5 sm:p-3 rounded-lg xs:rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
            >
              <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
            </button>

            {/* Info de página */}
            <div className="ml-2 xs:ml-3 sm:ml-4 text-xs xs:text-sm text-gray-600 dark:text-gray-400 font-medium">
              <span className="hidden sm:inline">Página </span>
              <span className="font-bold text-gray-900 dark:text-white">{currentPage}</span>
              <span className="hidden sm:inline"> de {totalPages}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
