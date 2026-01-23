'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Facebook, Instagram, Twitter, Mail, Phone, MapPin, 
  ChevronRight, Heart, Sparkles, Shield, Globe, 
  Coffee, Mountain, Home, Users, Calendar, 
  Check, Send, ArrowRight, Star, Zap, MessageCircle
} from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-ocean-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-20">
        {/* Newsletter Section */}
        

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xs:gap-10 sm:gap-12 mb-12 xs:mb-16 sm:mb-20">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="mb-4 xs:mb-6">
              <div className="flex items-center gap-2 mb-3 xs:mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-ocean-500 rounded-lg blur-md"></div>
                  <div className="relative bg-gradient-to-r from-primary-600 to-ocean-600 px-4 py-2 rounded-lg">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-white">
                      Antioquia High Vibes
                    </h3>
                  </div>
                </div>
                <span className="text-primary-400 text-xs font-bold bg-primary-500/10 px-2 py-1 rounded">
                  ✨
                </span>
              </div>
              <p className="text-gray-400 mb-4 xs:mb-6 max-w-2xl text-sm xs:text-base leading-relaxed">
                No te alquilamos fincas… Te ofrecemos espacios para crear momentos inolvidables 
                en los destinos más mágicos de Antioquia. Experiencias premium, recuerdos eternos.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-white mb-3 xs:mb-4 text-sm xs:text-base">Síguenos</h4>
              <div className="flex gap-3 xs:gap-4">
                {[
                  { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
                  { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
                  { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
                  { icon: Mail, label: 'Email', color: 'hover:bg-primary-600' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className={`group relative p-3 xs:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 ${social.color} transition-all duration-300 transform hover:-translate-y-1`}
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/5 group-hover:to-white/10 rounded-xl transition-all duration-500"></div>
                    <social.icon className="relative w-4 h-4 xs:w-5 xs:h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 xs:mb-6 text-sm xs:text-base flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-primary-500" />
              Navegación
            </h4>
            <ul className="space-y-2 xs:space-y-3">
              {[
                { href: '/destinations', label: 'Destinos', icon: MapPin },
                { href: '/properties', label: 'Todas las Fincas', icon: Home },
                { href: '/featured', label: 'Fincas Destacadas', icon: Star },
                { href: '/about', label: 'Nuestra Historia', icon: Users },
                { href: '/contact', label: 'Contacto', icon: Mail },
                { href: '/blog', label: 'Blog de Viajes', icon: Coffee }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-2 text-xs xs:text-sm hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <link.icon className="w-3 h-3" />
                    </div>
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 xs:mb-6 text-sm xs:text-base flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-primary-500" />
              Contacto
            </h4>
            <ul className="space-y-3 xs:space-y-4">
              <li>
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs xs:text-sm font-semibold">Ubicación</p>
                    <p className="text-gray-400 text-xs xs:text-sm">Medellín, Antioquia, Colombia</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs xs:text-sm font-semibold">Teléfono</p>
                    <p className="text-gray-400 text-xs xs:text-sm">+57 300 123 4567</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs xs:text-sm font-semibold">Email</p>
                    <p className="text-gray-400 text-xs xs:text-sm break-all">info@antioquiahighvibes.com</p>
                  </div>
                </div>
              </li>
            </ul>

            {/* Badges */}
            <div className="mt-6 xs:mt-8 pt-6 xs:pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-green-900/20 text-green-400 px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <Shield className="w-3 h-3" />
                  <span>100% Seguro</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-900/20 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <Globe className="w-3 h-3" />
                  <span>Reserva Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 xs:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 xs:gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-xs xs:text-sm">
                &copy; {currentYear} Antioquia High Vibes. Todos los derechos reservados.
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Hecho con <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> en Colombia
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 xs:gap-6 text-xs xs:text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">
                Cookies
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-primary-400 transition-colors">
                Mapa del Sitio
              </Link>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <span className="text-xs xs:text-sm">Volver arriba</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                <ChevronRight className="w-4 h-4 transform -rotate-90" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/573193539046"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Contactar por WhatsApp"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-md animate-ping"></div>
          <div className="relative w-14 h-14 xs:w-16 xs:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110">
            <MessageCircle className="w-7 h-7 xs:w-8 xs:h-8 text-white fill-white" />
            <div className="absolute -top-1 -right-1 w-5 h-5 xs:w-6 xs:h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
        </div>
      </a>
    </footer>
  )
}