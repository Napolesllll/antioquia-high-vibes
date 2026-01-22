import { Category, Property, Reservation, User } from '@prisma/client'

export type SafeUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type SafeProperty = Omit<Property, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
  category?: SafeCategory
}

export type SafeCategory = Omit<Category, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
  _count?: {
    properties: number
  }
}

export type SafeReservation = Omit<Reservation, 'createdAt' | 'updatedAt' | 'checkIn' | 'checkOut'> & {
  createdAt: string
  updatedAt: string
  checkIn: string
  checkOut: string
  property?: SafeProperty
}

export interface SearchParams {
  categoryId?: string
  checkIn?: string
  checkOut?: string
  guests?: string
  minPrice?: string
  maxPrice?: string
  amenities?: string[]
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      image?: string
      role: string
    }
  }

  interface User {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}