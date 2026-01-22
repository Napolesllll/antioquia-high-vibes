'use client'

import { MapPin } from 'lucide-react'

interface PropertyMapProps {
  latitude: number
  longitude: number
  name: string
}

export default function PropertyMap({ latitude, longitude, name }: PropertyMapProps) {
  // En producción, aquí integrarías Leaflet o Google Maps
  // Por ahora, usamos un placeholder con enlace a Google Maps
  
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Ubicación
      </h2>
      
      <div className="relative h-96 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
        {/* Placeholder - En producción usar Leaflet */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <MapPin className="w-16 h-16 text-primary-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-center px-4">
            Mapa de ubicación de {name}
          </p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Ver en Google Maps
          </a>
        </div>
        
        {/* Imagen de mapa estático como alternativa */}
        <img
          src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+22c55e(${longitude},${latitude})/${longitude},${latitude},13,0/600x400@2x?access_token=pk.eyJ1IjoicGxhY2Vob2xkZXIiLCJhIjoiY2xkIn0.placeholder`}
          alt="Mapa"
          className="w-full h-full object-cover opacity-50"
          onError={(e) => {
            // Si falla la carga, ocultar imagen
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            Nota:
          </span>{' '}
          La ubicación exacta se compartirá después de confirmar la reserva
        </p>
      </div>
    </div>
  )
}