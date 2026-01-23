import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import PropertyGallery from '@/components/properties/PropertyGallery'
import ReservationForm from '@/components/properties/ReservationForm'
import PropertyAmenities from '@/components/properties/PropertyAmenities'
import PropertyMap from '@/components/properties/PropertyMap'
import { MapPin, Users, Bed, Bath, Wifi, Utensils, ArrowLeft } from 'lucide-react'

interface PropertyPageProps {
  params: {
    slug: string
  }
}

async function getProperty(slug: string) {
  const property = await prisma.property.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  })

  if (!property) return null

  return {
    ...property,
    createdAt: property.createdAt.toISOString(),
    updatedAt: property.updatedAt.toISOString(),
    category: {
      ...property.category,
      createdAt: property.category.createdAt.toISOString(),
      updatedAt: property.category.updatedAt.toISOString(),
    },
  }
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const property = await getProperty(params.slug)
  
  if (!property) {
    return {
      title: 'Propiedad no encontrada',
    }
  }

  return {
    title: `${property.name} | Antioquia High Vibes`,
    description: property.description ? property.description.substring(0, 160) : `Descubre ${property.name} en Antioquia High Vibes`,
    openGraph: {
      title: property.name,
      description: property.description || `Descubre ${property.name} en Antioquia High Vibes`,
      images: [property.images?.[0]],
    },
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getProperty(params.slug)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón Volver Atrás */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium text-sm">Volver</span>
        </Link>

        {/* Gallery */}
        <PropertyGallery images={property.images} name={property.name} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{property.category.name}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {property.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {property.location}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 mx-auto text-primary-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Capacidad</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {property.capacity}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <Bed className="w-6 h-6 mx-auto text-primary-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Habitaciones</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {Math.ceil(property.capacity / 2)}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <Bath className="w-6 h-6 mx-auto text-primary-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Baños</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {Math.ceil(property.capacity / 3)}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <Wifi className="w-6 h-6 mx-auto text-primary-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">WiFi</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Incluido
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Descripción
              </h2>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <PropertyAmenities amenities={property.amenities} />

            {/* Map */}
            {property.latitude && property.longitude && (
              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                name={property.name}
              />
            )}
          </div>

          {/* Right Column - Reservation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ReservationForm
                propertyId={property.id}
                pricePerNight={property.pricePerNight}
                maxGuests={property.capacity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}