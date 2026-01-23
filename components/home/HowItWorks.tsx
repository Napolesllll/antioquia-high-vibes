'use client'

import { Search, Calendar, Home, Sparkles, ChevronRight, ArrowRight, Check, Zap, Users, Heart } from 'lucide-react'
import { useState } from 'react'

const steps = [
  {
    icon: Search,
    title: 'Explora',
    description: 'Descubre fincas increíbles en los mejores destinos de Antioquia',
    color: 'from-primary-500 to-primary-600',
    gradient: 'bg-gradient-to-r from-primary-500/20 via-primary-600/20 to-primary-700/20',
    features: ['Busca por destino', 'Filtra por características', 'Compara opciones'],
  },
  {
    icon: Calendar,
    title: 'Reserva',
    description: 'Selecciona tus fechas y confirma tu reserva de forma segura',
    color: 'from-ocean-500 to-ocean-600',
    gradient: 'bg-gradient-to-r from-ocean-500/20 via-ocean-600/20 to-ocean-700/20',
    features: ['Pago seguro online', 'Confirmación inmediata', 'Modificación flexible'],
  },
  {
    icon: Home,
    title: 'Disfruta',
    description: 'Vive experiencias únicas en espacios diseñados para ti',
    color: 'from-gold-500 to-gold-600',
    gradient: 'bg-gradient-to-r from-gold-500/20 via-gold-600/20 to-gold-700/20',
    features: ['Check-in sin complicaciones', 'Asistencia 24/7', 'Experiencias personalizadas'],
  },
  {
    icon: Sparkles,
    title: 'Crea Recuerdos',
    description: 'Momentos inolvidables que atesorarás para siempre',
    color: 'from-purple-500 to-purple-600',
    gradient: 'bg-gradient-to-r from-purple-500/20 via-purple-600/20 to-purple-700/20',
    features: ['Fotos increíbles', 'Historias para compartir', 'Ganas de repetir'],
  },
]

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section className="relative py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Fondo con efectos */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/10">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary-500/5 to-transparent"></div>
      </div>
      
      {/* Partículas decorativas */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-500/10"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Header con efectos */}
        <div className="text-center mb-10 xs:mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-ocean-500/10 backdrop-blur-lg px-4 py-2 rounded-full border border-primary-400/20 mb-4 xs:mb-6">
            <Zap className="w-4 h-4 xs:w-5 xs:h-5 text-primary-500 animate-pulse" />
            <span className="text-primary-600 dark:text-primary-400 font-bold text-xs xs:text-sm">
              PROCESO SENCILLO
            </span>
          </div>
          
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
            Vive tu{' '}
            <span className="bg-gradient-to-r from-primary-600 via-ocean-600 to-primary-600 bg-clip-text text-transparent">
              experiencia perfecta
            </span>{' '}
            en 4 pasos
          </h2>
          
          <p className="text-sm xs:text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 leading-relaxed">
            Desde la búsqueda hasta el momento mágico, te acompañamos en cada paso del camino
          </p>
        </div>

        {/* Steps Grid - Completamente responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 mb-12 xs:mb-16 sm:mb-20">
          {/* Steps en mobile/tablet, imagen en desktop */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 xs:p-6 border-2 ${
                    hoveredStep === index 
                      ? 'border-primary-500/50 shadow-xl shadow-primary-500/20' 
                      : 'border-white/20 dark:border-gray-700/50'
                  } transition-all duration-500 h-full transform hover:-translate-y-1 hover:scale-[1.02]`}>
                    {/* Step indicator */}
                    <div className="absolute -top-3 -left-3 w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg flex items-center justify-center">
                      <div className={`w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                        <step.icon className="w-4 h-4 xs:w-5 xs:h-5 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 xs:w-6 xs:h-6 bg-white dark:bg-gray-900 rounded-full border-2 border-white dark:border-gray-800 shadow-md flex items-center justify-center">
                        <span className="text-xs xs:text-sm font-black text-gray-900 dark:text-white">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pl-10 xs:pl-12">
                      <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2 xs:mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm mb-3 xs:mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Features */}
                      <div className="space-y-1.5 xs:space-y-2">
                        {step.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 xs:w-5 xs:h-5 rounded-full bg-gradient-to-r from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                              <Check className="w-2 h-2 xs:w-3 xs:h-3 text-primary-600 dark:text-primary-400" />
                            </div>
                            <span className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connector line for desktop */}
                    {index < steps.length - 1 && index % 2 === 0 && (
                      <div className="hidden sm:block absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary-500/30 to-transparent"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ilustración/CTA para desktop */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-ocean-500/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 backdrop-blur-xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500/10 to-ocean-500/10 px-6 py-3 rounded-full mb-4">
                    <Heart className="w-6 h-6 text-primary-500 fill-primary-500/20" />
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      +500 Experiencias
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                    ¿Listo para empezar?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Únete a miles de personas que ya han vivido momentos inolvidables
                  </p>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <span className="relative flex items-center justify-center gap-3">
                      <Search className="w-5 h-5" />
                      Explorar Fincas Disponibles
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                  
                  <button className="w-full group bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg text-gray-900 dark:text-white font-bold py-4 px-6 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 transition-all duration-300 transform hover:-translate-y-0.5">
                    <span className="flex items-center justify-center gap-3">
                      <Calendar className="w-5 h-5" />
                      Ver Guía Completa
                      <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>

                {/* Stats mini */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-xl font-black text-primary-600 dark:text-primary-400">98%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Satisfacción</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-ocean-600 dark:text-ocean-400">24/7</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Soporte</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-gold-600 dark:text-gold-400">5★</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Calificación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline para mobile/tablet */}
        <div className="lg:hidden relative">
          <div className="absolute left-4 xs:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/20 via-primary-500/10 to-transparent"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative pl-10 xs:pl-14 mb-8 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute left-0 top-6 transform -translate-x-1/2">
                <div className={`w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-gradient-to-br ${step.color} shadow-lg flex items-center justify-center`}>
                  <step.icon className="w-4 h-4 xs:w-5 xs:h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 xs:w-6 xs:h-6 bg-white dark:bg-gray-800 rounded-full border-2 border-white dark:border-gray-800 shadow-md flex items-center justify-center">
                  <span className="text-xs xs:text-sm font-black text-gray-900 dark:text-white">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Step card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 xs:p-6 border border-white/20 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-lg xs:text-xl font-black text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm mb-3">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-xs xs:text-sm">
                  <Check className="w-3 h-3 xs:w-4 xs:h-4" />
                  <span>{step.features[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para mobile/tablet */}
        <div className="lg:hidden mt-12 xs:mt-16">
          <div className="bg-gradient-to-r from-primary-500/10 to-ocean-500/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 xs:p-8 text-center">
            <h3 className="text-xl xs:text-2xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
              ¿Listo para tu próxima aventura?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base mb-6 xs:mb-8">
              Comienza ahora y crea momentos inolvidables
            </p>
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center">
              <button className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-3 xs:py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <Search className="w-4 h-4 xs:w-5 xs:h-5" />
                  Explorar Fincas
                </span>
              </button>
              <button className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg text-gray-900 dark:text-white font-bold py-3 xs:py-4 px-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary-500 transition-all duration-300">
                <span className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 xs:w-5 xs:h-5" />
                  Contactar Asesor
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="hidden lg:block mt-16 lg:mt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-ocean-500/10 backdrop-blur-lg px-6 py-3 rounded-full mb-6">
              <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">
                💬 LO QUE DICEN NUESTROS CLIENTES
              </span>
            </div>
            <p className="text-xl italic text-gray-600 dark:text-gray-300 mb-4">
              &quot;El proceso fue tan sencillo y la atención tan personalizada que desde el primer clic supe que estaba en buenas manos. ¡Una experiencia 10/10!&quot;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-ocean-500"></div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">María González</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Finca La Esperanza, Jardín</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}