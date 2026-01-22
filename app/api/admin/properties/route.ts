import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        categoryId: true,
        location: true,
        capacity: true,
        pricePerNight: true,
        featured: true,
      },
    })
    return NextResponse.json(properties)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener propiedades' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const {
      categoryId,
      name,
      slug,
      location,
      description,
      capacity,
      pricePerNight,
      amenities,
      images,
      featured,
    } = await request.json()

    if (
      !categoryId ||
      !name ||
      !slug ||
      !location ||
      !description ||
      !capacity ||
      !pricePerNight
    ) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const existingProperty = await prisma.property.findUnique({
      where: { slug },
    })

    if (existingProperty) {
      return NextResponse.json(
        { error: 'Este slug ya existe' },
        { status: 409 }
      )
    }

    const property = await prisma.property.create({
      data: {
        categoryId,
        name,
        slug,
        location,
        description,
        capacity,
        pricePerNight,
        amenities: amenities || [],
        images: images || [],
        featured: featured || false,
      },
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Property creation error:', error)
    return NextResponse.json(
      { error: 'Error al crear propiedad' },
      { status: 500 }
    )
  }
}
