import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import PropertiesPageContent from '@/components/properties/PropertiesPageContent'

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
    take: 100,
  })
}

async function getTotalProperties() {
  return prisma.property.count()
}

export default async function PropertiesPage() {
  const properties = await getProperties()
  const total = await getTotalProperties()

  // Serializar properties para pasarlas al componente cliente
  const serializedProperties = properties.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))

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
    <PropertiesPageContent properties={serializedProperties} stats={stats} />
  )
}
