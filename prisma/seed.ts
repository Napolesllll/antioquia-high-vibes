import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@antioquiahighvibes.com' },
    update: {},
    create: {
      email: 'admin@antioquiahighvibes.com',
      name: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Crear categorías de ejemplo
  const categories = [
    {
      name: 'Girardota',
      slug: 'girardota',
      description: 'Pueblo cercano a Medellín con clima cálido y hermosas fincas',
      imageUrl: '/images/girardota.jpg',
    },
    {
      name: 'Santa Fe de Antioquia',
      slug: 'santa-fe-de-antioquia', 
      description: 'Pueblo patrimonio con arquitectura colonial y naturaleza',
      imageUrl: '/images/santafe.jpg',
    },
    {
      name: 'San Jerónimo',
      slug: 'san-jeronimo',
      description: 'Tranquilidad y paisajes verdes a pocos kilómetros de la ciudad',
      imageUrl: '/images/sanjeronimo.jpg',
    },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  console.log('✅ Seed completado!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })