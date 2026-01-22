import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Users, DollarSign } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Hero */}
      <div className="relative h-96 md:h-[500px] overflow-hidden pt-20">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Link
            href="/destinations"
            className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver a Destinos</span>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-primary-400" />
              <span className="text-primary-300 font-semibold">Pueblo de Antioquia</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {destination.name}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              {destination.description}
            </p>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Fincas Disponibles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {destination.properties.length} propiedad{destination.properties.length !== 1 ? 'es' : ''} para elegir
          </p>
        </div>

        {destination.properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destination.properties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.slug}`}
              >
                <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
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
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {property.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {property.location}
                      </p>
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
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
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
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No hay fincas disponibles en este destino aún
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
