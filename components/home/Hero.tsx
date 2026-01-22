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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Fondo con gradientes optimizados */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 119, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(118, 192, 255, 0.2) 0%, transparent 50%)'
          }}
        />

        {/* Partículas - Solo decorativas, sin animación problemática */}
        {particles.slice(0, 10).map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/5 animate-pulse"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-gradient-to-r from-ocean-400/15 to-primary-400/15 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 md:w-96 h-56 sm:h-72 md:h-96 bg-gradient-to-l from-gold-400/12 to-primary-500/12 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, white 100%), linear-gradient(0deg, transparent 95%, white 100%)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96">
              <Image
                src="/images/logooo.png"
                alt="High Vibes Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-2 sm:mb-4 max-w-3xl mx-auto font-light px-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            No te alquilamos fincas…
          </p>

          <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold mb-8 sm:mb-12 max-w-3xl mx-auto px-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Te ofrecemos espacios para crear momentos inolvidables
          </p>
        </div>

        {/* Search Form */}
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <form
            onSubmit={handleSearch}
            className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-md rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl p-3 sm:p-4 md:p-6 mb-12 sm:mb-20 border border-white/20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Destino"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, location: e.target.value })
                  }
                  className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="date"
                  placeholder="Llegada"
                  value={searchParams.checkIn}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, checkIn: e.target.value })
                  }
                  className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="date"
                  placeholder="Salida"
                  value={searchParams.checkOut}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, checkOut: e.target.value })
                  }
                  className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <select
                  value={searchParams.guests}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, guests: e.target.value })
                  }
                  className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Huésped' : 'Huéspedes'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-3 sm:mt-4 btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Buscar Experiencias</span>
            </button>
          </form>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}