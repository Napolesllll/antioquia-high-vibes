'use client'

import Image from 'next/image'
import { Search, MapPin, Calendar, Users, Sparkles, ChevronDown, Zap, ArrowDown, AlertCircle } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const searchSchema = z.object({
  location: z.string().min(0),
  checkIn: z.string().min(1, 'Selecciona la fecha de llegada'),
  checkOut: z.string().min(1, 'Selecciona la fecha de salida'),
  guests: z.string().min(1, 'Selecciona número de huéspedes'),
}).refine((data) => {
  if (data.checkIn && data.checkOut) {
    return new Date(data.checkOut) > new Date(data.checkIn)
  }
  return true
}, {
  message: 'La fecha de salida debe ser posterior a la de llegada',
  path: ['checkOut']
})

type SearchFormData = z.infer<typeof searchSchema>

const ANTIOQUIA_DESTINATIONS = [
  'Jardín',
  'Guatapé',
  'Jericó',
  'Santa Fe de Antioquia',
  'Pueblo Rico',
  'Salento',
  'Cocora',
  'Penol',
  'Otro',
]

export default function Hero() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: '',
      guests: '2',
    },
  })

  const checkInValue = watch('checkIn')
  const checkOutValue = watch('checkOut')
  const locationValue = watch('location')

  useEffect(() => {
    setMounted(true)
    // Cargar parámetros de búsqueda si existen
    const location = searchParams.get('location') || ''
    const checkIn = searchParams.get('checkIn') || ''
    const checkOut = searchParams.get('checkOut') || ''
    const guests = searchParams.get('guests') || '2'

    if (location) setValue('location', location)
    if (checkIn) setValue('checkIn', checkIn)
    if (checkOut) setValue('checkOut', checkOut)
    if (guests) setValue('guests', guests)
  }, [searchParams, setValue])

  // Calcular fechas mínimas y máximas
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)
  const maxDateString = maxDate.toISOString().split('T')[0]

  const handleSearch = (data: SearchFormData) => {
    const queryParams = new URLSearchParams()
    if (data.location) queryParams.set('location', data.location)
    if (data.checkIn) queryParams.set('checkIn', data.checkIn)
    if (data.checkOut) queryParams.set('checkOut', data.checkOut)
    if (data.guests) queryParams.set('guests', data.guests)
    
    router.push(`/properties?${queryParams.toString()}`)
  }

  const particles = useMemo(() => 
    [...Array(30)].map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    })),
    []
  )

  if (!mounted) return null

  return (
    <section className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 px-3 xs:px-4 sm:px-6">
      {/* Fondo con efectos mejorados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradientes principales */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(14, 165, 233, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(250, 204, 21, 0.15) 0%, transparent 50%)',
            animation: 'gradientShift 15s ease-in-out infinite alternate'
          }}
        />

        {/* Partículas mejoradas */}
        {particles.slice(0, 12).map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: `${Math.min(particle.size, 3)}px`,
              height: `${Math.min(particle.size, 3)}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Globs animados */}
        <div className="absolute top-1/4 -left-16 sm:-left-20 md:left-1/4 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-gradient-to-r from-primary-500/25 to-ocean-500/15 rounded-full blur-3xl sm:blur-4xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-16 sm:-right-20 md:right-1/4 w-56 sm:w-72 md:w-96 h-56 sm:h-72 md:h-96 bg-gradient-to-l from-gold-500/20 to-primary-500/15 rounded-full blur-3xl sm:blur-4xl animate-pulse" style={{ animationDelay: '1.5s' }} />

        {/* Patrón decorativo sutil */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8 text-center">
        {/* Logo con efecto */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
          <div className="relative w-36 h-36 xs:w-40 xs:h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-ocean-500/20 rounded-full blur-xl animate-pulse"></div>
            <Image
              src="/images/logooo.png"
              alt="High Vibes Logo"
              fill
              className="object-contain drop-shadow-2xl animate-float"
              priority
              sizes="(max-width: 360px) 144px, (max-width: 480px) 160px, (max-width: 640px) 224px, (max-width: 768px) 288px, (max-width: 1024px) 384px, 512px"
            />
          </div>
        </div>

        {/* Texto principal */}
        <div className="space-y-3 xs:space-y-4 sm:space-y-6 mb-8 sm:mb-12 md:mb-16 px-2">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-ocean-500/20 backdrop-blur-lg px-4 py-2 rounded-full border border-primary-400/30 mb-2">
            <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 text-primary-300 animate-pulse" />
            <span className="text-gray-900 dark:text-primary-200 font-bold text-xs xs:text-sm tracking-wider">
              EXPERIENCIAS ÚNICAS
            </span>
          </div>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white/95 max-w-3xl mx-auto font-medium animate-fade-in-up tracking-wide" style={{ animationDelay: '0.1s' }}>
            No te alquilamos fincas…
          </p>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white max-w-4xl mx-auto animate-fade-in-up leading-tight sm:leading-snug px-2" style={{ animationDelay: '0.2s' }}>
            Te ofrecemos espacios para crear{' '}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-ocean-600 dark:from-primary-300 dark:via-ocean-300 dark:to-primary-300 bg-clip-text text-transparent block xs:inline mt-2 xs:mt-0">
              momentos inolvidables
            </span>
          </h1>

          <p className="text-sm xs:text-base sm:text-lg text-gray-700 dark:text-white/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Descubre los pueblos mágicos de Antioquia y vive experiencias exclusivas en fincas cuidadosamente seleccionadas
          </p>
        </div>

        {/* Formulario de búsqueda - Completamente rediseñado */}
        <div className="w-full max-w-4xl mx-auto px-2 xs:px-3 sm:px-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <form
            onSubmit={handleSubmit(handleSearch)}
            className="bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 border border-white/40 dark:border-white/10 transition-all duration-500 hover:shadow-3xl"
          >
            <div className="grid grid-cols-1 gap-4 xs:gap-5 sm:gap-6">
              {/* Input de ubicación */}
              <div className="relative group">
                <label className="block text-left text-sm xs:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    ¿A dónde te gustaría ir?
                  </div>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-500 transition-colors group-focus-within:text-primary-600" />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ej: Jardín, Guatapé, Jericó..."
                      {...register('location')}
                      onFocus={() => setShowLocationDropdown(true)}
                      onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                      className="w-full pl-12 pr-4 py-3 xs:py-4 text-base bg-white/80 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-primary-400/30 focus:border-primary-400 transition-all duration-300"
                    />
                    
                    {/* Dropdown de ubicaciones */}
                    {showLocationDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border-2 border-primary-400 rounded-xl shadow-xl z-50">
                        {ANTIOQUIA_DESTINATIONS.filter(d => 
                          d.toLowerCase().includes(locationValue.toLowerCase()) || !locationValue
                        ).map((destination) => (
                          <button
                            key={destination}
                            type="button"
                            onClick={() => {
                              setValue('location', destination)
                              setShowLocationDropdown(false)
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors text-sm"
                          >
                            <MapPin className="w-4 h-4 inline mr-2 text-primary-500" />
                            {destination}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pl-1">
                  Descubre los pueblos más mágicos de Antioquia
                </p>
              </div>

              {/* Fechas - Con etiquetas claras */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5">
                {/* Check-in */}
                <div className="relative group">
                  <label className="block text-left text-sm xs:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      Fecha de llegada
                    </div>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-500 transition-colors group-focus-within:text-primary-600" />
                    </div>
                    <input
                      type="date"
                      min={today}
                      max={maxDateString}
                      {...register('checkIn')}
                      className="w-full pl-12 pr-4 py-3 xs:py-4 text-base bg-white/80 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-primary-400/30 focus:border-primary-400 transition-all duration-300 cursor-pointer"
                    />
                  </div>
                  {errors.checkIn && (
                    <div className="flex items-center gap-1 mt-2 pl-1 text-xs text-red-500">
                      <AlertCircle className="w-3 h-3" />
                      {errors.checkIn.message}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pl-1">
                    Selecciona el día de tu llegada a la finca
                  </p>
                </div>

                {/* Check-out */}
                <div className="relative group">
                  <label className="block text-left text-sm xs:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      Fecha de salida
                    </div>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-500 transition-colors group-focus-within:text-primary-600" />
                    </div>
                    <input
                      type="date"
                      min={checkInValue || today}
                      max={maxDateString}
                      {...register('checkOut')}
                      className={`w-full pl-12 pr-4 py-3 xs:py-4 text-base bg-white/80 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-4 focus:ring-primary-400/30 transition-all duration-300 cursor-pointer ${
                        errors.checkOut 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-primary-400'
                      }`}
                    />
                  </div>
                  {errors.checkOut && (
                    <div className="flex items-center gap-1 mt-2 pl-1 text-xs text-red-500">
                      <AlertCircle className="w-3 h-3" />
                      {errors.checkOut.message}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pl-1">
                    Selecciona el día de tu salida de la finca
                  </p>
                </div>
              </div>

              {/* Huéspedes */}
              <div className="relative group">
                <label className="block text-left text-sm xs:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary-500" />
                    Número de huéspedes
                  </div>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-500 transition-colors group-focus-within:text-primary-600" />
                  </div>
                  <select
                    {...register('guests')}
                    className="w-full pl-12 pr-12 py-3 xs:py-4 text-base bg-white/80 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-primary-400/30 focus:border-primary-400 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Huésped' : 'Huéspedes'}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-focus-within:rotate-180" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pl-1">
                  Incluye adultos y niños
                </p>
              </div>
            </div>

            {/* Botón de búsqueda con efectos */}
            <button
              type="submit"
              className="w-full mt-6 xs:mt-7 sm:mt-8 group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-4 xs:py-5 sm:py-6 px-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(errors).length > 0}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="relative flex items-center justify-center gap-3 text-base xs:text-lg sm:text-xl">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />
                  <span>Buscar Experiencias</span>
                </div>
                <Zap className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 transform group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>

            {/* Info adicional */}
            <div className="mt-4 xs:mt-5 text-center">
              <p className="text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                🔒 Reserva 100% segura • 🎯 Más de 50 fincas disponibles • ⭐ 4.9/5 de satisfacción
              </p>
            </div>
          </form>
        </div>

        {/* Indicador de scroll */}
        <div className="mt-8 sm:mt-12 md:mt-16 animate-bounce">
          <div className="inline-flex flex-col items-center gap-2">
            <span className="text-gray-900 dark:text-white/70 text-xs xs:text-sm font-medium tracking-wider">EXPLORA MÁS</span>
            <div className="w-10 h-16 xs:w-12 xs:h-20 border-2 border-gray-900/40 dark:border-white/40 rounded-2xl flex justify-center items-start p-2 backdrop-blur-sm bg-white/5">
              <div className="w-1.5 h-3 bg-gradient-to-b from-gray-900 to-gray-900/60 dark:from-white dark:to-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { 
            background-position: 20% 30%, 80% 60%, 40% 80%;
          }
          100% { 
            background-position: 30% 40%, 70% 50%, 50% 70%;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        /* Estilos para el input de fecha en móviles */
        input[type="date"] {
          color-scheme: light dark;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
        
        /* Mejorar la experiencia táctil en móviles */
        @media (max-width: 640px) {
          input, select {
            font-size: 16px; /* Previene el zoom automático en iOS */
          }
        }
      `}</style>
    </section>
  )
}