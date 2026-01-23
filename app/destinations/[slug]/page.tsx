import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, MapPin, Users, DollarSign, Star, 
  ChevronRight, Calendar, Check, Zap, Sparkles,
  Heart, Wifi, Car, Coffee, Mountain,
  Sun, Home, Shield
} from 'lucide-react'

interface DestinationPageProps {
  params: {
    slug: string
  }
}

async function getDestination(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      properties: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const destination = await getDestination(params.slug)

  if (!destination) {
    return {
      title: 'Destino no encontrado',
    }
  }

  return {
    title: `${destination.name} | Antioquia High Vibes`,
    description: destination.description,
    openGraph: {
      title: destination.name,
      description: destination.description,
      images: [destination.imageUrl],
    },
  }
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const destination = await getDestination(params.slug)

  if (!destination) {
    notFound()
  }

  // Calcular estadísticas
  const stats = {
    totalProperties: destination.properties.length,
    featuredCount: destination.properties.filter(p => p.featured).length,
    maxCapacity: destination.properties.length > 0 
      ? Math.max(...destination.properties.map(p => p.capacity))
      : 0,
    minPrice: destination.properties.length > 0 
      ? Math.min(...destination.properties.map(p => p.pricePerNight))
      : 0,
    avgRating: 4.8,
    amenities: ['Piscina', 'WiFi', 'Parqueadero', 'Vista', 'Cocina']
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/50">
      {/* Header Hero - Completamente responsivo */}
      <div className="relative h-[60vh] xs:h-[65vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[90vh] overflow-hidden pt-16">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          className="object-cover scale-105 md:scale-100"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

        {/* Navegación */}
        <div className="absolute top-0 left-0 right-0 z-20 px-3 xs:px-4 sm:px-6 pt-6">
          <div className="max-w-8xl mx-auto">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 xs:gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-xl px-4 xs:px-5 py-2.5 xs:py-3 rounded-2xl text-white font-bold text-sm xs:text-base transition-all duration-300 border border-white/40 hover:border-white/60 shadow-2xl hover:shadow-2xl group active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="hidden xs:inline">Explorar Destinos</span>
              <span className="xs:hidden">Destinos</span>
            </Link>
          </div>
        </div>

        {/* Contenido del Hero */}
        <div className="absolute inset-0 flex items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto w-full">
          <div className="text-center space-y-3 xs:space-y-4 sm:space-y-6 w-full">
            {/* Badge de ubicación */}
            <div className="inline-flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-primary-500/20 to-primary-600/20 backdrop-blur-lg px-3 xs:px-4 py-1.5 xs:py-2 rounded-full border border-primary-400/30">
              <MapPin className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-300" />
              <span className="text-primary-200 font-bold text-xs xs:text-sm tracking-wide">
                PUEBLO DE ANTIOQUIA
              </span>
            </div>

            {/* Título */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight px-2">
              <span className="bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent">
                {destination.name}
              </span>
            </h1>

            {/* Descripción */}
            <div className="max-w-2xl mx-auto px-3 xs:px-4">
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/95 font-medium leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center pt-4 xs:pt-6">
              <Link
                href="#properties"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-5 xs:px-6 py-3 xs:py-3.5 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Home className="w-4 h-4 xs:w-5 xs:h-5" />
                <span>Ver Fincas</span>
              </Link>
              <button className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white font-bold px-5 xs:px-6 py-3 xs:py-3.5 rounded-xl border border-white/40 hover:border-white/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
                <Heart className="w-4 h-4 xs:w-5 xs:h-5" />
                <span>Guardar</span>
              </button>
            </div>

            {/* Indicador de scroll */}
            <div className="pt-8 xs:pt-12">
              <div className="inline-flex flex-col items-center gap-1.5 xs:gap-2 animate-bounce">
                <span className="text-white/70 text-xs xs:text-sm font-medium">Explorar</span>
                <ChevronRight className="w-5 h-5 xs:w-6 xs:h-6 text-white rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar - Completamente responsivo */}
      <div className="relative -mt-8 xs:-mt-10 sm:-mt-12 md:-mt-16 lg:-mt-20 px-3 xs:px-4 sm:px-6">
        <div className="max-w-8xl mx-auto">
          <div className="bg-gradient-to-r from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 border border-white/50 dark:border-gray-700/50">
            <div className="grid grid-cols-2 xs:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl font-black bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                  {stats.totalProperties}
                </div>
                <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                  Fincas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl font-black bg-gradient-to-r from-gold-600 to-amber-600 bg-clip-text text-transparent">
                  {stats.featuredCount}
                </div>
                <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                  Destacadas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  {stats.maxCapacity}+
                </div>
                <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                  Personas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${stats.minPrice.toLocaleString()}
                </div>
                <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5 xs:mt-1">
                  Desde/noche
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section - Completamente responsiva */}
      <div id="properties" className="max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-20 lg:py-24">
        {/* Header de sección */}
        <div className="text-center mb-10 xs:mb-12 sm:mb-16">
          <div className="inline-block mb-3 xs:mb-4">
            <div className="flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-primary-500/10 to-ocean-500/10 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full">
              <Zap className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-500" />
              <span className="text-primary-600 dark:text-primary-400 font-bold text-xs xs:text-sm">
                EXPERIENCIAS DISPONIBLES
              </span>
            </div>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4 px-2">
            Descubre tu{' '}
            <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
              escapada perfecta
            </span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-3">
            {destination.properties.length} propiedad{destination.properties.length !== 1 ? 'es' : ''} cuidadosamente seleccionadas para tu experiencia inolvidable
          </p>
        </div>

        {/* Grid de propiedades */}
        {destination.properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {destination.properties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.slug}`}
                className="group block"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-1 active:scale-95">
                  {/* Badge destacado */}
                  {property.featured && (
                    <div className="absolute top-4 xs:top-6 right-4 xs:right-6 z-10">
                      <div className="flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-gold-500 to-amber-500 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-lg">
                        <Star className="w-3 h-3 xs:w-4 xs:h-4 text-white fill-white" />
                        <span className="text-white font-bold text-xs">DESTACADA</span>
                      </div>
                    </div>
                  )}

                  {/* Imagen */}
                  <div className="relative h-48 xs:h-56 sm:h-64 md:h-72 overflow-hidden">
                    {property.images && property.images[0] ? (
                      <>
                        <Image
                          src={property.images[0]}
                          alt={property.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-ocean-400">
                        <span className="text-white/70 font-medium text-sm">Imagen no disponible</span>
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
                  <div className="p-4 xs:p-6 space-y-3 xs:space-y-4">
                    <div>
                      <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-1.5 xs:mb-2 line-clamp-1">
                        {property.name}
                      </h3>
                      <div className="flex items-center gap-1.5 xs:gap-2">
                        <MapPin className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-500" />
                        <span className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm font-medium line-clamp-1">
                          {property.location}
                        </span>
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
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Estado vacío */
          <div className="text-center py-12 xs:py-16 sm:py-20 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-800/50 rounded-2xl sm:rounded-3xl">
            <div className="max-w-md mx-auto px-4">
              <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto mb-4 xs:mb-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 xs:mb-3">
                Próximamente
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base mb-4 xs:mb-6">
                Estamos trabajando para traerte las mejores fincas en este destino
              </p>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-primary-500 to-ocean-500 text-white font-bold px-5 xs:px-6 py-2.5 xs:py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="text-sm xs:text-base">Explorar otros destinos</span>
              </Link>
            </div>
          </div>
        )}

        {/* CTA al final */}
        <div className="mt-12 xs:mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="bg-gradient-to-r from-primary-500/10 to-ocean-500/10 rounded-2xl sm:rounded-3xl p-6 xs:p-8 sm:p-10 md:p-12">
            <div className="inline-block mb-4 xs:mb-6">
              <div className="flex items-center gap-1.5 xs:gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg px-3 xs:px-4 py-1.5 xs:py-2 rounded-full">
                <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-500" />
                <span className="text-primary-600 dark:text-primary-400 font-bold text-xs xs:text-sm">
                  ¿NECESITAS AYUDA?
                </span>
              </div>
            </div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base sm:text-lg mb-6 xs:mb-8 max-w-2xl mx-auto px-3">
              Nuestro equipo puede ayudarte a encontrar la finca perfecta para tu experiencia
            </p>
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-5 xs:px-6 py-3 xs:py-3.5 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm xs:text-base"
              >
                Contactar Asesor
              </Link>
              <Link
                href="/destinations"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold px-5 xs:px-6 py-3 xs:py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300 text-sm xs:text-base"
              >
                Ver Todos los Destinos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}