import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MapPin, Users, DollarSign, ArrowLeft, Star, 
  ChevronRight, Sparkles, Filter, Search, Home,
  Heart, Shield, Wifi, Car, Trees, Mountain,
  Coffee, Zap, Calendar, Check, Package,
  Grid3x3, List, SortAsc, X, Sliders
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fincas | Antioquia High Vibes',
  description: 'Descubre todas nuestras fincas exclusivas en los pueblos mágicos de Antioquia. Experiencias únicas para momentos inolvidables.',
  openGraph: {
    title: 'Fincas | Antioquia High Vibes',
    description: 'Descubre todas nuestras fincas disponibles en Antioquia',
    images: ['/images/properties-hero.jpg'],
  },
}

async function getProperties() {
  return prisma.property.findMany({
    include: {
      category: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function PropertiesPage() {
  const properties = await getProperties()

  // Calcular estadísticas
  const stats = {
    totalProperties: properties.length,
    featuredCount: properties.filter(p => p.featured).length,
    totalCapacity: properties.reduce((acc, p) => acc + p.capacity, 0),
    averagePrice: properties.length > 0 
      ? Math.round(properties.reduce((acc, p) => acc + p.pricePerNight, 0) / properties.length)
      : 0,
    destinationsCount: [...new Set(properties.map(p => p.category.name))].length
  }

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
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-xl p-3 xs:p-4 sm:p-5 md:p-6 border border-gray-200/50 dark:border-gray-700/50">
          {/* Barra de búsqueda */}
          <div className="relative mb-3 xs:mb-4 sm:mb-6">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar fincas..."
              className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2.5 xs:py-3 sm:py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-xs xs:text-sm sm:text-base"
            />
          </div>

          {/* Filtros rápidos */}
          <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-6">
            <button className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg text-xs font-semibold whitespace-nowrap">
              <Filter className="w-3 h-3 xs:w-4 xs:h-4" />
              <span>Todas</span>
            </button>
            <button className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-white/80 dark:bg-gray-700/80 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg border border-gray-200/50 dark:border-gray-600/50 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-primary-500 transition-all duration-300 whitespace-nowrap">
              <Star className="w-3 h-3 xs:w-4 xs:h-4 text-gold-500" />
              <span>Destacadas</span>
            </button>
            <button className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-white/80 dark:bg-gray-700/80 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg border border-gray-200/50 dark:border-gray-600/50 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-primary-500 transition-all duration-300 whitespace-nowrap">
              <Zap className="w-3 h-3 xs:w-4 xs:h-4 text-primary-500" />
              <span>Con piscina</span>
            </button>
            <button className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-white/80 dark:bg-gray-700/80 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg border border-gray-200/50 dark:border-gray-600/50 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-primary-500 transition-all duration-300 whitespace-nowrap">
              <Users className="w-3 h-3 xs:w-4 xs:h-4 text-emerald-500" />
              <span>+10 personas</span>
            </button>
          </div>

          {/* Ordenar y vista */}
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 xs:gap-4 flex-wrap">
            <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Mostrando <span className="font-bold text-gray-900 dark:text-white">{properties.length}</span> fincas
            </div>
            <div className="flex items-center gap-3 xs:gap-4 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <SortAsc className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <select className="bg-transparent border-none outline-none text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 max-w-xs xs:max-w-sm">
                  <option>Ordenar por</option>
                  <option>Precio: Menor a mayor</option>
                  <option>Precio: Mayor a menor</option>
                  <option>Capacidad</option>
                  <option>Destacadas primero</option>
                </select>
              </div>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden xs:block"></div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button className="p-2 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de propiedades - Completamente responsiva */}
      <div className="max-w-8xl mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 pb-8 xs:pb-12 sm:pb-16 md:pb-20">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.slug}`}
                className="group block"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-2 active:scale-95">
                  {/* Badge destacado */}
                  {property.featured && (
                    <div className="absolute top-4 xs:top-6 right-4 xs:right-6 z-10">
                      <div className="flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-gold-500 to-amber-500 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-lg">
                        <Star className="w-3 h-3 xs:w-4 xs:h-4 text-white fill-white" />
                        <span className="text-white font-bold text-xs">DESTACADA</span>
                      </div>
                    </div>
                  )}

                  {/* Imagen con overlay */}
                  <div className="relative h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                    {property.images && property.images[0] ? (
                      <>
                        <Image
                          src={property.images[0]}
                          alt={property.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-ocean-400">
                        <div className="text-center p-4">
                          <Home className="w-12 h-12 text-white/50 mx-auto mb-2" />
                          <span className="text-white/70 font-medium text-sm">Imagen no disponible</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Información en imagen */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 xs:gap-2 bg-black/60 backdrop-blur-sm px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full">
                          <Users className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                          <span className="text-white text-xs xs:text-sm font-medium">
                            {property.capacity} personas
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 xs:gap-2 bg-black/60 backdrop-blur-sm px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full">
                          <DollarSign className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                          <span className="text-white text-xs xs:text-sm font-bold">
                            ${property.pricePerNight.toLocaleString()}
                            <span className="text-white/70 text-xs">/noche</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-3 xs:p-4 sm:p-5 md:p-6 space-y-2 xs:space-y-3 sm:space-y-4">
                    {/* Header */}
                    <div>
                      <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 xs:mb-1.5 sm:mb-2 line-clamp-1">
                        {property.name}
                      </h3>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="bg-primary-100 dark:bg-primary-900/30 px-2 py-0.5 rounded text-xs font-bold text-primary-700 dark:text-primary-300">
                              {property.category.name}
                            </div>
                            {property.featured && (
                              <div className="bg-gold-100 dark:bg-gold-900/30 px-2 py-0.5 rounded text-xs font-bold text-gold-700 dark:text-gold-300 flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-current" />
                                <span>Premium</span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm line-clamp-1">
                            {property.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Amenidades rápidas */}
                    <div className="flex items-center gap-2 xs:gap-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Wifi className="w-3 h-3" />
                        <span className="hidden xs:inline">WiFi</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Car className="w-3 h-3" />
                        <span className="hidden xs:inline">Parking</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Trees className="w-3 h-3" />
                        <span className="hidden xs:inline">Jardín</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Coffee className="w-3 h-3" />
                        <span className="hidden xs:inline">Cocina</span>
                      </div>
                    </div>

                    {/* Descripción */}
                    <div className="flex items-start gap-2 xs:gap-3">
                      <div className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mt-0.5">
                        <Check className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-primary-600 dark:text-primary-400" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm leading-relaxed line-clamp-2 flex-1">
                        {property.description}
                      </p>
                    </div>

                    {/* Separador */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                    {/* Botón de acción */}
                    <div className="pt-1 xs:pt-2">
                      <div className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 xs:py-4 px-4 xs:px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-500/25">
                        <div className="flex items-center justify-between">
                          <span className="text-sm xs:text-base">Explorar Finca</span>
                          <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                        </div>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* Borde gradiente */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/20 rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-none"></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Estado vacío */
          <div className="text-center py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-800/50 rounded-xl xs:rounded-2xl sm:rounded-3xl">
            <div className="max-w-md mx-auto px-3 xs:px-4">
              <div className="w-16 h-16 xs:w-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 xs:mb-6 sm:mb-8 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                <Home className="w-8 h-8 xs:w-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-gray-400" />
              </div>
              <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 xs:mb-3 sm:mb-4">
                Próximamente nuevas fincas
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base mb-6 xs:mb-8">
                Estamos trabajando para traerte las propiedades más exclusivas de Antioquia
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-6 xs:px-8 py-3 xs:py-3.5 rounded-xl hover:shadow-xl transition-all duration-300"
                >
                  <MapPin className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span className="text-sm xs:text-base">Explorar Destinos</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg text-gray-900 dark:text-white font-bold px-6 xs:px-8 py-3 xs:py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span className="text-sm xs:text-base">Solicitar Finca</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* CTA de suscripción */}
        <div className="mt-8 xs:mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          <div className="bg-gradient-to-r from-primary-500/10 to-ocean-500/10 rounded-xl xs:rounded-2xl sm:rounded-3xl p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Efectos de fondo */}
            <div className="absolute top-0 left-0 w-24 h-24 xs:w-32 sm:w-40 sm:h-40 bg-primary-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 xs:w-40 sm:w-48 sm:h-48 bg-ocean-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full mb-3 xs:mb-4 sm:mb-6">
                <Bell className="w-3 h-3 xs:w-3.5 sm:w-4 sm:h-4 text-primary-500" />
                <span className="text-primary-600 dark:text-primary-400 font-bold text-xs sm:text-sm">
                  NO TE PIERDAS NADA
                </span>
              </div>
              <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4 sm:mb-6">
                ¿Quieres ser el primero en conocer{' '}
                <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                  nuevas fincas?
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm sm:text-base md:text-lg mb-6 xs:mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
                Suscríbete y recibe notificaciones exclusivas de nuevas propiedades y ofertas especiales
              </p>
              <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center items-center px-2 xs:px-0">
                <div className="relative w-full max-w-md">
                  <input
                    type="email"
                    placeholder="Tu correo..."
                    className="w-full pl-4 xs:pl-6 pr-24 xs:pr-32 py-2.5 xs:py-3.5 sm:py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-xs xs:text-sm sm:text-base"
                  />
                  <button className="absolute right-1 xs:right-2 top-1.5 xs:top-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-3 xs:px-4 sm:px-6 py-1 xs:py-1.5 sm:py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-xs xs:text-sm sm:text-base whitespace-nowrap">
                    Suscribirme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente de campana para suscripción
const Bell = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)