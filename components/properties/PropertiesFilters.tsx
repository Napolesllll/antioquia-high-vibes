'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Star, Zap, Users, SortAsc, Grid3x3, List } from 'lucide-react'

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

interface PropertiesFiltersProps {
  initialProperties: Property[]
  onFilteredPropertiesChange: (properties: Property[]) => void
}

export default function PropertiesFilters({ initialProperties, onFilteredPropertiesChange }: PropertiesFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'featured' | 'pool' | 'large'>('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filtrar y ordenar propiedades
  const filteredProperties = useMemo(() => {
    let filtered = [...initialProperties]

    // Aplicar filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        prop =>
          prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (prop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      )
    }

    // Aplicar filtro por tipo
    if (filterType === 'featured') {
      filtered = filtered.filter(prop => prop.featured)
    } else if (filterType === 'pool') {
      filtered = filtered.filter(prop =>
        prop.amenities?.some(a => a.toLowerCase().includes('piscina') || a.toLowerCase().includes('pool'))
      )
    } else if (filterType === 'large') {
      filtered = filtered.filter(prop => prop.capacity >= 10)
    }

    // Aplicar ordenamiento
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight)
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.pricePerNight - a.pricePerNight)
    } else if (sortBy === 'capacity') {
      filtered.sort((a, b) => b.capacity - a.capacity)
    } else if (sortBy === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return filtered
  }, [searchTerm, filterType, sortBy, initialProperties])

  // Notificar cambios
  useMemo(() => {
    onFilteredPropertiesChange(filteredProperties)
  }, [filteredProperties, onFilteredPropertiesChange])

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-xl p-3 xs:p-4 sm:p-5 md:p-6 border border-gray-200/50 dark:border-gray-700/50">
      {/* Barra de búsqueda */}
      <div className="relative mb-3 xs:mb-4 sm:mb-6">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Search className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar fincas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2.5 xs:py-3 sm:py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-xs xs:text-sm sm:text-base"
        />
      </div>

      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-6">
        <button
          onClick={() => setFilterType('all')}
          className={`flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
            filterType === 'all'
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
              : 'bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 hover:border-primary-500'
          }`}
        >
          <Filter className="w-3 h-3 xs:w-4 xs:h-4" />
          <span>Todas</span>
        </button>

        <button
          onClick={() => setFilterType('featured')}
          className={`flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap transition-all duration-300 ${
            filterType === 'featured'
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
              : 'bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 hover:border-primary-500'
          }`}
        >
          <Star className="w-3 h-3 xs:w-4 xs:h-4 text-gold-500" />
          <span>Destacadas</span>
        </button>

        <button
          onClick={() => setFilterType('pool')}
          className={`flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap transition-all duration-300 ${
            filterType === 'pool'
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
              : 'bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 hover:border-primary-500'
          }`}
        >
          <Zap className="w-3 h-3 xs:w-4 xs:h-4 text-primary-500" />
          <span>Con piscina</span>
        </button>

        <button
          onClick={() => setFilterType('large')}
          className={`flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap transition-all duration-300 ${
            filterType === 'large'
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
              : 'bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 hover:border-primary-500'
          }`}
        >
          <Users className="w-3 h-3 xs:w-4 xs:h-4 text-emerald-500" />
          <span>+10 personas</span>
        </button>
      </div>

      {/* Ordenar y vista */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 xs:gap-4 flex-wrap">
        <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          Mostrando <span className="font-bold text-gray-900 dark:text-white">{filteredProperties.length}</span> fincas
        </div>
        <div className="flex items-center gap-3 xs:gap-4 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <SortAsc className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none outline-none text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 max-w-xs xs:max-w-sm cursor-pointer"
            >
              <option value="featured">Destacadas primero</option>
              <option value="price-asc">Precio: Menor a mayor</option>
              <option value="price-desc">Precio: Mayor a menor</option>
              <option value="capacity">Capacidad</option>
            </select>
          </div>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden xs:block"></div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
