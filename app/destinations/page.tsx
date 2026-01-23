import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, MapPin, Package, Star, ChevronRight, 
  Sparkles, Mountain, Trees, Home, Heart, Filter,
  Shield, Users, Globe, Coffee, Wifi, Car
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Destinos | Antioquia High Vibes',
  description: 'Explora todos los pueblos mágicos de Antioquia y descubre fincas exclusivas para experiencias inolvidables',
  openGraph: {
    title: 'Destinos | Antioquia High Vibes',
    description: 'Explora todos los pueblos mágicos de Antioquia',
    images: ['/images/destinations-hero.jpg'],
  },
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { properties: true },
      },
    },
  })
}

export default async function DestinationsPage() {
  const categories = await getCategories()

  // Estadísticas generales
  const stats = {
    totalDestinations: categories.length,
    totalProperties: categories.reduce((acc, cat) => acc + cat._count.properties, 0),
    featuredDestinations: categories.filter(cat => cat._count.properties > 5).length,
    averageProperties: categories.length > 0 
      ? Math.round(categories.reduce((acc, cat) => acc + cat._count.properties, 0) / categories.length)
      : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/50">
      {/* Hero Section - Completamente responsiva */}
      <div className="relative pt-24 xs:pt-28 sm:pt-32 pb-12 xs:pb-16 sm:pb-20 px-3 xs:px-4 sm:px-6 overflow-hidden">
        {/* Fondo con gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-ocean-500/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-gradient-to-bl from-primary-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 xs:w-72 xs:h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-ocean-500/20 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-8xl mx-auto relative z-10">
          {/* Breadcrumb mejorado */}
          <div className="mb-6 xs:mb-8 sm:mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 xs:gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-4 xs:px-5 py-2.5 xs:py-3 rounded-xl hover:rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 text-primary-600 dark:text-primary-400 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm xs:text-base">
                Volver al inicio
              </span>
            </Link>
          </div>

          {/* Header principal */}
          <div className="text-center mb-8 xs:mb-12 sm:mb-16">
            {/* Badge decorativo */}
            <div className="inline-flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-primary-500/10 to-ocean-500/10 backdrop-blur-lg px-3 xs:px-4 py-1.5 xs:py-2 rounded-full border border-primary-400/20 mb-4 xs:mb-6">
              <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-500" />
              <span className="text-primary-600 dark:text-primary-400 font-bold text-xs xs:text-sm">
                DESCUBRE ANTIOQUIA
              </span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-4 xs:mb-6 leading-tight">
              Explora los{' '}
              <span className="bg-gradient-to-r from-primary-600 via-ocean-600 to-primary-600 bg-clip-text text-transparent">
                pueblos mágicos
              </span>
              {' '}de Antioquia
            </h1>
            
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-3 xs:px-4 leading-relaxed">
              Descubre los destinos más encantadores de Antioquia. Cada pueblo tiene su propia historia, belleza única y fincas extraordinarias para experiencias inolvidables.
            </p>
          </div>

          {/* Stats Bar - Completamente responsiva */}
          <div className="mb-8 xs:mb-12 sm:mb-16">
            <div className="bg-gradient-to-r from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 xs:p-5 sm:p-6 border border-white/50 dark:border-gray-700/50">
              <div className="grid grid-cols-2 xs:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl xs:text-3xl sm:text-4xl font-black bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                    {stats.totalDestinations}
                  </div>
                  <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                    Destinos
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl xs:text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {stats.totalProperties}+
                  </div>
                  <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                    Fincas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl xs:text-3xl sm:text-4xl font-black bg-gradient-to-r from-gold-600 to-amber-600 bg-clip-text text-transparent">
                    {stats.featuredDestinations}
                  </div>
                  <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                    Destacados
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl xs:text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stats.averageProperties}
                  </div>
                  <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                    Promedio/destino
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid - Completamente responsiva */}
      <div className="max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 pb-12 xs:pb-16 sm:pb-20">
        {/* Filtros (solo en desktop) */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300">
              <Filter className="w-4 h-4" />
              <span className="font-semibold text-sm">Filtrar</span>
            </button>
            <button className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300">
              <span className="font-semibold text-sm">Ordenar por</span>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando <span className="font-bold text-gray-900 dark:text-white">{categories.length}</span> destinos
          </div>
        </div>

        {/* Grid de destinos */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/destinations/${category.slug}`}
                className="group block"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-1 active:scale-95">
                  {/* Imagen con overlay gradiente */}
                  <div className="relative h-48 xs:h-56 sm:h-64 md:h-72 overflow-hidden">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    
                    {/* Badge de cantidad de propiedades */}
                    <div className="absolute top-4 xs:top-6 right-4 xs:right-6">
                      <div className="flex items-center gap-1.5 xs:gap-2 bg-black/60 backdrop-blur-sm px-3 xs:px-4 py-1.5 xs:py-2 rounded-full">
                        <Package className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-white" />
                        <span className="text-white font-bold text-xs xs:text-sm">
                          {category._count.properties} {category._count.properties === 1 ? 'Finca' : 'Fincas'}
                        </span>
                      </div>
                    </div>

                    {/* Efecto de brillo al hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:via-primary-500/5 group-hover:to-primary-500/10 transition-all duration-700"></div>
                  </div>

                  {/* Contenido */}
                  <div className="p-4 xs:p-6 space-y-3 xs:space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
                          <MapPin className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-500 flex-shrink-0" />
                          <span className="text-primary-600 dark:text-primary-400 font-bold text-xs xs:text-sm">
                            PUEBLO DE ANTIOQUIA
                          </span>
                        </div>
                        <h3 className="text-xl xs:text-2xl sm:text-3xl font-black text-gray-900 dark:text-white line-clamp-1">
                          {category.name}
                        </h3>
                      </div>
                      {category._count.properties > 5 && (
                        <div className="flex items-center gap-1 bg-gradient-to-r from-gold-500/20 to-amber-500/20 px-2 py-1 rounded-lg">
                          <Star className="w-3 h-3 text-gold-600 dark:text-gold-400 fill-gold-400" />
                          <span className="text-xs font-bold text-gold-700 dark:text-gold-300">Destacado</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base leading-relaxed line-clamp-2">
                      {category.description}
                    </p>

                    {/* Separador decorativo */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                    {/* Botón de acción */}
                    <div className="pt-1 xs:pt-2">
                      <div className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 xs:py-4 px-4 xs:px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-500/25">
                        <div className="flex items-center justify-between">
                          <span className="text-sm xs:text-base">Explorar destino</span>
                          <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                        </div>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* Borde gradiente al hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/20 rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-none"></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Estado vacío */
          <div className="text-center py-16 xs:py-20 sm:py-24 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-800/50 rounded-2xl sm:rounded-3xl">
            <div className="max-w-md mx-auto px-4">
              <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 mx-auto mb-6 xs:mb-8 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                <Mountain className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 text-gray-400" />
              </div>
              <h3 className="text-2xl xs:text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
                Próximamente nuevos destinos
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base mb-6 xs:mb-8">
                Estamos explorando los rincones más mágicos de Antioquia para traerte experiencias únicas
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-6 xs:px-8 py-3 xs:py-3.5 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="text-sm xs:text-base">Volver al inicio</span>
              </Link>
            </div>
          </div>
        )}

        {/* Info Cards - Responsivas */}
        <div className="mt-12 xs:mt-16 sm:mt-20 lg:mt-24">
          <div className="text-center mb-8 xs:mb-12 sm:mb-16">
            <div className="inline-block mb-4 xs:mb-6">
              <div className="flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-primary-500/10 to-ocean-500/10 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full">
                <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-500" />
                <span className="text-primary-600 dark:text-primary-400 font-bold text-xs xs:text-sm">
                  ¿POR QUÉ ELEGIRNOS?
                </span>
              </div>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 xs:mb-6">
              Viví la{' '}
              <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                experiencia completa
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base sm:text-lg max-w-3xl mx-auto">
              No solo te alquilamos fincas, te ofrecemos momentos inolvidables en los lugares más especiales de Antioquia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 xs:p-8 border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="w-12 h-12 xs:w-14 xs:h-14 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center mb-4 xs:mb-6">
                <Trees className="w-6 h-6 xs:w-7 xs:h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl xs:text-2xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
                Naturaleza Pura
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base leading-relaxed">
                Espacios rodeados de paisajes naturales espectaculares, donde podrás conectar con la tranquilidad y belleza de Antioquia.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 xs:p-8 border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="w-12 h-12 xs:w-14 xs:h-14 bg-gradient-to-r from-primary-500/20 to-ocean-500/20 rounded-xl flex items-center justify-center mb-4 xs:mb-6">
                <Home className="w-6 h-6 xs:w-7 xs:h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl xs:text-2xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
                Fincas Únicas
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base leading-relaxed">
                Propiedades especialmente seleccionadas por su arquitectura, comodidades y ubicación privilegiada para tu máximo confort.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 xs:p-8 border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="w-12 h-12 xs:w-14 xs:h-14 bg-gradient-to-r from-gold-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-4 xs:mb-6">
                <Star className="w-6 h-6 xs:w-7 xs:h-7 text-gold-600 dark:text-gold-400 fill-gold-400" />
              </div>
              <h3 className="text-xl xs:text-2xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
                Experiencias Premium
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base leading-relaxed">
                Crea momentos mágicos con familia y amigos en escenarios diseñados para experiencias inolvidables y memorables.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 pb-16 xs:pb-20 sm:pb-24">
        <div className="bg-gradient-to-r from-primary-500/10 to-ocean-500/10 rounded-2xl sm:rounded-3xl p-8 xs:p-10 sm:p-12 md:p-16 text-center relative overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute top-0 left-0 w-32 h-32 xs:w-40 xs:h-40 bg-primary-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 xs:w-48 xs:h-48 bg-ocean-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 xs:mb-6">
              ¿Listo para tu próxima{' '}
              <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                aventura?
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base sm:text-lg mb-8 xs:mb-12 max-w-2xl mx-auto">
              Encuentra el destino perfecto para tu escapada y comienza a planificar momentos inolvidables
            </p>
            <div className="flex flex-col sm:flex-row gap-4 xs:gap-6 justify-center">
              <Link
                href="/properties"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-6 xs:px-8 py-3.5 xs:py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm xs:text-base"
              >
                Explorar Todas las Fincas
              </Link>
              <Link
                href="/contact"
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg text-gray-900 dark:text-white font-bold px-6 xs:px-8 py-3.5 xs:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300 text-sm xs:text-base"
              >
                Necesito Ayuda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}