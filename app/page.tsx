import Hero from '@/components/home/Hero'
import FeaturedDestinations from '@/components/home/FeaturedDestinations'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import { prisma } from '@/lib/prisma'

async function getHomeData() {
  const [categories, properties] = await Promise.all([
    prisma.category.findMany({
      take: 6,
      include: {
        _count: {
          select: { properties: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.property.findMany({
      where: { featured: true },
      take: 6,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return { categories, properties }
}

export default async function HomePage() {
  const { categories, properties } = await getHomeData()

  return (
    <div className="min-h-screen">
      <Hero />
      
      <FeaturedDestinations />
      
      <FeaturedProperties 
        properties={properties.map(prop => ({
          ...prop,
          description: prop.description || '',
          createdAt: prop.createdAt.toISOString(),
          updatedAt: prop.updatedAt.toISOString(),
          category: prop.category ? {
            ...prop.category,
            createdAt: prop.category.createdAt.toISOString(),
            updatedAt: prop.category.updatedAt.toISOString(),
          } : undefined,
        }))} 
      />
      
      <HowItWorks />
      <Testimonials />
    </div>
  )
}