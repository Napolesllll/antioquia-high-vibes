'use client'

import { MessageCircle, Facebook, Instagram } from 'lucide-react'

export default function ContactCards() {
  const contactChannels = [
    {
      name: 'WhatsApp',
      description: 'Respuesta instantánea',
      icon: MessageCircle,
      url: 'https://wa.me/573193539046',
      gradient: 'from-green-500 to-green-600',
      hoverGradient: 'hover:from-green-600 hover:to-green-700',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      textColor: 'text-green-400',
      hoverTextColor: 'group-hover:text-green-300',
    },
    {
      name: 'Facebook',
      description: 'Comunidad activa',
      icon: Facebook,
      url: 'https://facebook.com',
      gradient: 'from-blue-600 to-blue-700',
      hoverGradient: 'hover:from-blue-700 hover:to-blue-800',
      bgColor: 'bg-blue-600/10',
      borderColor: 'border-blue-600/20',
      textColor: 'text-blue-400',
      hoverTextColor: 'group-hover:text-blue-300',
    },
    {
      name: 'Instagram',
      description: 'Inspiración diaria',
      icon: Instagram,
      url: 'https://instagram.com',
      gradient: 'from-pink-500 to-rose-500',
      hoverGradient: 'hover:from-pink-600 hover:to-rose-600',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      textColor: 'text-pink-400',
      hoverTextColor: 'group-hover:text-pink-300',
    },
    {
      name: 'TikTok',
      description: 'Contenido viral',
      icon: () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-3.47V8.54a8.12 8.12 0 0 0 3.73 1.15v-3z" />
        </svg>
      ),
      url: 'https://tiktok.com',
      gradient: 'from-gray-900 to-gray-800',
      hoverGradient: 'hover:from-gray-800 hover:to-gray-700',
      bgColor: 'bg-gray-900/20',
      borderColor: 'border-gray-700/20',
      textColor: 'text-gray-300',
      hoverTextColor: 'group-hover:text-white',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden pt-24 pb-12 xs:pb-16 sm:pb-20">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-ocean-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 xs:mb-16 sm:mb-20">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 xs:mb-6">
            Contacta con{' '}
            <span className="bg-gradient-to-r from-primary-400 to-ocean-400 bg-clip-text text-transparent">
              Nosotros
            </span>
          </h1>
          <p className="text-gray-400 text-base xs:text-lg sm:text-xl max-w-2xl mx-auto">
            Elige tu canal favorito y comunícate con nuestro equipo. Estamos listos para ayudarte a encontrar la experiencia perfecta.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
          {contactChannels.map((channel) => {
            const IconComponent = channel.icon
            return (
              <a
                key={channel.name}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative h-full overflow-hidden rounded-2xl xs:rounded-3xl transition-all duration-500 transform hover:scale-105">
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${channel.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                  
                  {/* Base background */}
                  <div className={`absolute inset-0 ${channel.bgColor} backdrop-blur-xl border ${channel.borderColor}`}></div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 xs:p-8 sm:p-10 h-full flex flex-col items-center justify-center text-center">
                    {/* Icon container */}
                    <div className={`relative mb-4 xs:mb-6 p-4 xs:p-5 rounded-2xl bg-gradient-to-br ${channel.gradient} shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110`}>
                      <IconComponent className="w-8 h-8 xs:w-10 xs:h-10 text-white" />
                      
                      {/* Animated ring */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/20 animate-pulse group-hover:animate-none"></div>
                    </div>

                    {/* Text content */}
                    <h3 className={`text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300`}>
                      {channel.name}
                    </h3>
                    <p className={`text-sm xs:text-base ${channel.textColor} ${channel.hoverTextColor} transition-colors duration-300 mb-6 xs:mb-8`}>
                      {channel.description}
                    </p>

                    {/* CTA Button */}
                    <div className={`relative px-6 xs:px-8 py-2.5 xs:py-3 rounded-lg bg-gradient-to-r ${channel.gradient} text-white font-semibold text-sm xs:text-base shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative">Contactar</span>
                    </div>

                    {/* Bottom accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${channel.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 xs:mt-20 sm:mt-24 p-6 xs:p-8 sm:p-12 rounded-2xl xs:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-2xl xs:text-3xl font-bold text-white mb-4 xs:mb-6 flex items-center gap-3">
            <span className="text-2xl xs:text-3xl">💬</span> ¿Prefieres escribir?
          </h2>
          <p className="text-gray-300 text-base xs:text-lg mb-4 xs:mb-6">
            También puedes enviarnos un email directamente a{' '}
            <a
              href="mailto:info@antioquiahighvibes.com"
              className="text-primary-400 hover:text-primary-300 font-semibold transition-colors duration-300"
            >
              info@antioquiahighvibes.com
            </a>
          </p>
          <p className="text-gray-400 text-sm xs:text-base">
            Nos comprometemos a responderte en un plazo máximo de 24 horas.
          </p>
        </div>
      </div>
    </div>
  )
}
