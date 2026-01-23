'use client'

import { Star, Quote, Sparkles, Heart, Zap, Users } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    name: 'María González',
    location: 'Medellín',
    rating: 5,
    text: 'La experiencia fue increíble. La finca superó nuestras expectativas y el servicio fue impecable. ¡Volveremos sin duda!',
    avatarColor: 'from-primary-500 to-primary-600',
    stay: 'Finca La Esperanza, Jardín',
    date: 'Febrero 2024'
  },
  {
    name: 'Carlos Ramírez',
    location: 'Bogotá',
    rating: 5,
    text: 'Perfecta para desconectar de la ciudad. Las instalaciones son de primera y la atención personalizada hace la diferencia.',
    avatarColor: 'from-ocean-500 to-ocean-600',
    stay: 'Finca Vista al Valle, Guatapé',
    date: 'Enero 2024'
  },
  {
    name: 'Laura Martínez',
    location: 'Cali',
    rating: 5,
    text: 'Celebramos nuestro aniversario aquí y fue mágico. Cada detalle estaba cuidado. High Vibes es sinónimo de calidad.',
    avatarColor: 'from-gold-500 to-gold-600',
    stay: 'Finca Los Pinos, Jericó',
    date: 'Diciembre 2023'
  },
  {
    name: 'Andrés López',
    location: 'Barranquilla',
    rating: 5,
    text: 'Increíble experiencia familiar. Los niños no querían irse. El paisaje y la comodidad de la finca fueron excepcionales.',
    avatarColor: 'from-emerald-500 to-emerald-600',
    stay: 'Finca El Descanso, Jardín',
    date: 'Noviembre 2023'
  },
  {
    name: 'Sofía Rodríguez',
    location: 'Cartagena',
    rating: 5,
    text: 'La mejor escapada romántica. La atención al detalle y la privacidad hicieron de nuestro viaje algo único e inolvidable.',
    avatarColor: 'from-purple-500 to-purple-600',
    stay: 'Finca La Cumbre, Jericó',
    date: 'Octubre 2023'
  },
  {
    name: 'David Herrera',
    location: 'Pereira',
    rating: 5,
    text: 'Excelente para reuniones de trabajo. Las instalaciones modernas y el entorno natural aumentaron nuestra productividad.',
    avatarColor: 'from-pink-500 to-pink-600',
    stay: 'Finca Las Colinas, Guatapé',
    date: 'Septiembre 2023'
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isHovering])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
  }

  const visibleTestimonials = [...testimonials, ...testimonials.slice(0, 2)]

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-primary-500/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-500/10 to-ocean-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-primary-600/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-400/20 mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">
              TESTIMONIOS REALES
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4">
            Lo que dicen nuestros{' '}
            <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
              huéspedes
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experiencias reales de personas que han creado momentos inolvidables
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-600 dark:text-primary-400">4.9/5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calificación promedio</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-ocean-600 dark:text-ocean-400">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Satisfacción</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Experiencias</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gold-600 dark:text-gold-400">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Soporte</div>
          </div>
        </div>

        {/* Testimonials Carousel - Mobile & Tablet */}
        <div className="lg:hidden">
          <div 
            ref={containerRef}
            className="relative h-[500px] sm:h-[550px] overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === activeIndex
                    ? 'opacity-100 translate-x-0'
                    : index < activeIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl h-full">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-primary-100 dark:text-primary-900/30">
                    <Quote className="w-12 h-12 sm:w-16 sm:h-16" />
                  </div>

                  {/* Rating */}
                  <div className="flex space-x-1 mb-4 sm:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-gold-500 text-gold-500" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 italic leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n.charAt(0)).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lg text-gray-900 dark:text-white truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {testimonial.stay}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-primary-500 w-6'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl xl:rounded-3xl p-6 xl:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary-100 dark:text-primary-900/30 group-hover:scale-110 transition-transform duration-500">
                <Quote className="w-16 h-16" />
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 xl:w-6 xl:h-6 fill-gold-500 text-gold-500 group-hover:scale-110 transition-transform duration-300"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed group-hover:translate-x-1 transition-transform duration-500">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <span className="text-white font-bold text-xl">
                    {testimonial.name.split(' ').map(n => n.charAt(0)).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg text-gray-900 dark:text-white truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.location}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                    {testimonial.stay}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 group-hover:border-primary-200 dark:group-hover:border-primary-800 transition-colors duration-500">
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.date}</p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl xl:rounded-3xl border-2 border-transparent group-hover:border-primary-500/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Users className="w-5 h-5" />
              <span className="text-sm">Más de 500 experiencias verificadas</span>
            </div>
            <button className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <Heart className="w-5 h-5" />
              <span>Ver todas las experiencias</span>
              <Zap className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}