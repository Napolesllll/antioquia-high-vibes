import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { revalidatePath } from 'next/cache'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: {
    id: string
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const id = parseInt(params.id)
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

    const property = await prisma.property.update({
      where: { id },
      data: {
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
      },
    })

    // Revalidar los paths donde se muestran propiedades
    revalidatePath('/properties')
    revalidatePath('/')
    revalidatePath('/admin/properties')
    revalidatePath(`/properties/${slug}`)

    return NextResponse.json(property)
  } catch (error) {
    console.error('Property update error:', error)
    return NextResponse.json(
      { error: 'Error al actualizar propiedad' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const id = parseInt(params.id)

    await prisma.property.delete({
      where: { id },
    })

    // Revalidar los paths donde se muestran propiedades
    revalidatePath('/')
    revalidatePath('/properties')
    revalidatePath('/admin/properties')

    return NextResponse.json({ message: 'Propiedad eliminada' })
  } catch (error) {
    console.error('Property delete error:', error)
    return NextResponse.json(
      { error: 'Error al eliminar propiedad' },
      { status: 500 }
    )
  }
}
