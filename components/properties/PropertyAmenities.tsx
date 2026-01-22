'use client'

import {
  Wifi,
  Car,
  Waves,
  Utensils,
  Tv,
  Wind,
  Coffee,
  Users,
  Home,
  TreePine,
  Check,
} from 'lucide-react'

interface PropertyAmenitiesProps {
  amenities: string[]
}

const amenityIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Estacionamiento': Car,
  'Piscina': Waves,
  'Cocina equipada': Utensils,
  'TV': Tv,
  'Aire acondicionado': Wind,
  'Cafetera': Coffee,
  'Zona social': Users,
  'BBQ': Home,
  'Jardín': TreePine,
}

export default function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Comodidades
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => {
          const Icon = amenityIcons[amenity] || Check
          
          return (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {amenity}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}