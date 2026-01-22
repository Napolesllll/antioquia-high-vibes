import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, DollarSign, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fincas | Antioquia High Vibes',
  description: 'Descubre todas nuestras fincas disponibles en Antioquia',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver al inicio</span>
          </Link>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Todas Nuestras Fincas
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              Explora la colección completa de fincas disponibles en Antioquia High Vibes.
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.slug}`}
              >
                <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 bg-gradient-to-br from-primary-400 to-ocean-400 overflow-hidden">
                    {property.images && property.images[0] ? (
                      <Image
                        src={property.images[0]}
                        alt={property.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/50">
                        <span>Sin imagen</span>
                      </div>
                    )}
                    {property.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                        ⭐ Destacada
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {property.name}
                      </h3>
                      <div className="flex items-start space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                            {property.category.name}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {property.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {property.capacity} personas
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          ${property.pricePerNight.toLocaleString()}/noche
                        </span>
                      </div>
                    </div>

                    {/* Description Preview */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 flex-1">
                      {property.description}
                    </p>

                    {/* CTA */}
                    <button className="w-full bg-gradient-tropical hover:shadow-lg text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="text-6xl mb-4">🏡</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No hay fincas disponibles en este momento
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Pronto tendremos nuevas propiedades para ti
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
