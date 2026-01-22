'use client'

import Image from 'next/image'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  })

  const particles = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 8,
      xOffset: (Math.random() - 0.5) * 80,
      yOffset: (Math.random() - 0.5) * 80,
      delay: Math.random() * 4,
    })),
    []
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()
    if (searchParams.location) queryParams.set('location', searchParams.location)
    if (searchParams.checkIn) queryParams.set('checkIn', searchParams.checkIn)
    if (searchParams.checkOut) queryParams.set('checkOut', searchParams.checkOut)
    if (searchParams.guests) queryParams.set('guests', searchParams.guests)
    
    router.push(`/properties?${queryParams.toString()}`)
  }

  return (
    <section className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-12 sm:pt-20 px-4">
      {/* Fondo con gradientes optimizados para móvil */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(14, 165, 233, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(250, 204, 21, 0.1) 0%, transparent 50%)'
          }}
        />

        {/* Partículas optimizadas para móvil */}
        {particles.slice(0, 8).map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/8"
            style={{
              width: `${Math.min(particle.size, 2.5)}px`,
              height: `${Math.min(particle.size, 2.5)}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `twinkle ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Globs más suaves y posicionados mejor en móvil */}
        <div className="absolute top-1/3 -left-12 sm:left-1/4 w-40 sm:w-64 md:w-80 h-40 sm:h-64 md:h-80 bg-gradient-to-r from-primary-400/20 to-ocean-400/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 -right-12 sm:right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-l from-gold-400/15 to-primary-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

        <div 
          className="absolute inset-0 opacity-[0.005]"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, white 100%), linear-gradient(0deg, transparent 95%, white 100%)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Logo mejorado para móvil */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative w-32 h-32 sm:w-64 md:w-80 lg:w-96 h-32 sm:h-64 md:h-80 lg:h-96">
              <Image
                src="/images/logooo.png"
                alt="High Vibes Logo"
                fill
                className="object-contain drop-shadow-xl"
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>
          </div>

          {/* Subtítulo más impactante */}
          <div className="space-y-2 sm:space-y-4 mb-6 sm:mb-10">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto font-medium px-2 animate-fade-in-up tracking-wide" style={{ animationDelay: '0.1s' }}>
              No te alquilamos fincas…
            </p>

            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold max-w-3xl mx-auto px-2 animate-fade-in-up leading-tight sm:leading-snug" style={{ animationDelay: '0.2s' }}>
              Te ofrecemos espacios para crear{' '}
              <span className="bg-gradient-to-r from-primary-300 to-ocean-300 bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0">
                momentos inolvidables
              </span>
            </p>
          </div>
        </div>

        {/* Search Form - Optimizado para móvil */}
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <form
            onSubmit={handleSearch}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-5 md:p-7 mb-8 sm:mb-20 border border-white/30 dark:border-white/10 transition-all duration-300"
          >
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5">
              {/* Location Input */}
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-5 sm:h-5 text-primary-500" />
                </div>
                <input
                  type="text"
                  placeholder="¿A dónde vas?"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, location: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 text-base bg-white/95 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Date Inputs Container */}
              <div className="grid grid-cols-2 gap-3">
                {/* Check-in Input */}
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-5 sm:h-5 text-primary-500" />
                  </div>
                  <input
                    type="date"
                    placeholder="Llegada"
                    value={searchParams.checkIn}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, checkIn: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-3 text-sm sm:text-base bg-white/95 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Check-out Input */}
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-5 sm:h-5 text-primary-500" />
                  </div>
                  <input
                    type="date"
                    placeholder="Salida"
                    value={searchParams.checkOut}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, checkOut: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-3 text-sm sm:text-base bg-white/95 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Guests Select */}
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-5 sm:h-5 text-primary-500" />
                </div>
                <select
                  value={searchParams.guests}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, guests: e.target.value })
                  }
                  className="w-full pl-10 pr-10 py-3 text-base bg-white/95 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Huésped' : 'Huéspedes'}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full mt-4 sm:mt-5 flex items-center justify-center space-x-3 text-base sm:text-base font-semibold py-4 sm:py-4 rounded-xl transition-all duration-300 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Buscar Experiencias</span>
            </button>
          </form>
        </div>

        {/* Scroll Indicator - Mejorado para móvil */}
        <div className="flex sm:flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-10 h-14 border-2 border-white/40 rounded-2xl flex justify-center items-center p-2 bg-white/5">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}