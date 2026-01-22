'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="text-lg sm:text-2xl font-bold bg-gradient-tropical bg-clip-text text-transparent mb-3 sm:mb-4">
              Antioquia High Vibes
            </h3>
            <p className="text-gray-400 mb-3 sm:mb-4 max-w-md text-sm sm:text-base leading-relaxed">
              No te alquilamos fincas… Te ofrecemos espacios para crear momentos inolvidables 
              en los mejores destinos de Antioquia.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Enlaces Rápidos</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/destinations" className="text-xs sm:text-sm hover:text-primary-400 transition-colors">
                  Destinos
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-xs sm:text-sm hover:text-primary-400 transition-colors">
                  Todas las Fincas
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-xs sm:text-sm hover:text-primary-400 transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs sm:text-sm hover:text-primary-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Contacto</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Medellín, Antioquia, Colombia</span>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">+57 300 123 4567</span>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm break-words">info@antioquiahighvibes.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Antioquia High Vibes. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}