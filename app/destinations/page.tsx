import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Destinos | Antioquia High Vibes',
  description: 'Explora todos los pueblos mágicos de Antioquia',
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
              Pueblos Mágicos de Antioquia
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              Descubre los destinos más encantadores de Antioquia. Cada pueblo tiene su propia historia, su belleza única y fincas extraordinarias para disfrutar.
            </p>
          </div>
        </div>

        {/* Destinations Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group"
              >
                <Link href={`/destinations/${category.slug}`}>
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Properties Count */}
                      <div className="self-end">
                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 flex items-center space-x-2">
                          <Package className="w-4 h-4 text-white" />
                          <span className="text-white text-sm font-semibold">
                            {category._count.properties} Finca{category._count.properties !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-3xl font-bold text-white">
                            {category.name}
                          </h3>
                          <MapPin className="w-6 h-6 text-white flex-shrink-0" />
                        </div>
                        <p className="text-white/90 text-sm line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No hay destinos disponibles aún
            </p>
          </div>
        )}

        {/* Info Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Naturaleza Pura
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Espacios rodeados de paisajes naturales espectaculares
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">🏡</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Fincas Únicas
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Propiedades especialmente seleccionadas para tu comodidad
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Experiencias Inolvidables
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Crea momentos mágicos con familia y amigos
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}