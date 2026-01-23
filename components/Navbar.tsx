'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { 
  Menu, X, Sun, Moon, User, LogOut, Settings, 
  Home, MapPin, Users as UsersIcon, Sparkles, 
  ChevronDown, Search, Bell, Heart, MessageCircle, HelpCircle
} from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  if (!mounted) return (
    <nav className="fixed top-0 w-full z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg">
      <div className="max-w-8xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 xs:h-16 sm:h-20">
          <div className="w-28 xs:w-32 sm:w-40 h-10 xs:h-12 sm:h-16 bg-gradient-to-r from-primary-500/20 to-primary-600/20 animate-pulse rounded-lg sm:rounded-xl"></div>
        </div>
      </div>
    </nav>
  )

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] transition-all duration-500">
        {/* Barra principal */}
        <div className={`w-full transition-all duration-500 ${
          scrolled
            ? 'bg-gradient-to-r from-white/98 via-white/96 to-white/95 dark:from-gray-900/98 dark:via-gray-900/96 dark:to-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-white/20 dark:border-gray-800/20'
            : 'bg-gradient-to-r from-white/95 via-white/90 to-white/85 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/85 backdrop-blur-lg border-b border-white/10 dark:border-gray-800/10'
        }`}>
          <div className="max-w-8xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-10">
            <div className="flex justify-between items-center h-14 xs:h-16 sm:h-20">
              
              {/* Logo - Optimizado para todos los dispositivos */}
              <Link 
                href="/" 
                className="flex items-center flex-shrink-0 group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/5 to-ocean-500/5 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 hidden sm:block"></div>
                <div className="relative w-28 xs:w-32 sm:w-40 md:w-52 lg:w-64 xl:w-72 2xl:w-80 h-10 xs:h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32 transform hover:scale-105 transition-all duration-500">
                  <Image
                    src="/images/logol.png"
                    alt="High Vibes Logo"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                    sizes="(max-width: 360px) 112px, (max-width: 480px) 128px, (max-width: 640px) 160px, (max-width: 768px) 208px, (max-width: 1024px) 256px, (max-width: 1280px) 288px, 320px"
                  />
                </div>
              </Link>

              {/* Desktop Navigation - Tablet en adelante */}
              <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
                
                {/* Navegación principal */}
                <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                  <Link
                    href="/destinations"
                    className="relative group flex items-center gap-2 px-3 py-2 rounded-xl text-sm lg:text-base xl:text-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-semibold hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10"
                  >
                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                    <span className="whitespace-nowrap">Destinos</span>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-ocean-500 group-hover:w-3/4 transition-all duration-300"></div>
                  </Link>
                  
                  <Link
                    href="/properties"
                    className="relative group flex items-center gap-2 px-3 py-2 rounded-xl text-sm lg:text-base xl:text-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-semibold hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10"
                  >
                    <Home className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                    <span className="whitespace-nowrap">Fincas</span>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-ocean-500 group-hover:w-3/4 transition-all duration-300"></div>
                  </Link>
                  
                  <div className="relative group"
                    onMouseEnter={() => setActiveDropdown('more')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm lg:text-base xl:text-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-semibold hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10">
                      <UsersIcon className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                      <span className="whitespace-nowrap">Más</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden transition-all duration-300 transform origin-top ${
                      activeDropdown === 'more' ? 'scale-100 opacity-100' : 'scale-95 opacity-0 invisible'
                    }`}>
                      <Link
                        href="/about"
                        className="block px-4 py-3 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-primary-500/5 hover:to-ocean-500/5 transition-all duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Sobre Nosotros
                      </Link>
                      <Link
                        href="/contact"
                        className="block px-4 py-3 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-primary-500/5 hover:to-ocean-500/5 transition-all duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Contacto
                      </Link>
                      <Link
                        href="/faq"
                        className="block px-4 py-3 text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-primary-500/5 hover:to-ocean-500/5 transition-all duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        FAQ
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Separador */}
                <div className="h-6 lg:h-8 xl:h-10 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

                {/* Acciones del usuario */}
                <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
                  
                  {/* Botones de acción para pantallas grandes */}
                  <div className="hidden lg:flex items-center gap-2">
                    <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                      <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {/* Toggle de tema */}
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="relative p-2 rounded-xl hover:scale-110 transition-all duration-300 group bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-lg border border-white/50 dark:border-gray-700/50 shadow-lg"
                    aria-label="Toggle theme"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/20 group-hover:via-primary-500/10 group-hover:to-primary-500/20 rounded-xl transition-all duration-500"></div>
                    {theme === 'dark' ? (
                      <Sun className="relative w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                    ) : (
                      <Moon className="relative w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                    )}
                  </button>

                  {session ? (
                    <>
                      {/* Panel de administrador */}
                      {session.user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="relative group flex items-center gap-2 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-lg border border-white/50 dark:border-gray-700/50 shadow-lg"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span className="font-semibold whitespace-nowrap text-sm hidden lg:inline">Admin</span>
                        </Link>
                      )}
                      
                      {/* Perfil de usuario */}
                      <div className="relative group"
                        onMouseEnter={() => setActiveDropdown('user')}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-lg border border-white/50 dark:border-gray-700/50 shadow-lg">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-ocean-500 flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-sm truncate max-w-[80px] lg:max-w-[120px] xl:max-w-[150px] hidden lg:inline">
                            {session.user.name}
                          </span>
                          <ChevronDown className="w-3 h-3 text-gray-500 transition-transform duration-300 group-hover:rotate-180" />
                        </button>
                        
                        {/* Menú desplegable del usuario */}
                        <div className={`absolute top-full right-0 mt-2 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden transition-all duration-300 transform origin-top ${
                          activeDropdown === 'user' ? 'scale-100 opacity-100' : 'scale-95 opacity-0 invisible'
                        }`}>
                          <div className="p-2">
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-primary-500/5 hover:to-ocean-500/5 transition-all duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <User className="w-4 h-4" />
                              <span>Mi Perfil</span>
                            </Link>
                            <Link
                              href="/bookings"
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-primary-500/5 hover:to-ocean-500/5 transition-all duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <Calendar className="w-4 h-4" />
                              <span>Mis Reservas</span>
                            </Link>
                            <button
                              onClick={() => {
                                signOut()
                                setActiveDropdown(null)
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Cerrar Sesión</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Botón de inicio de sesión */
                    <Link 
                      href="/auth/signin" 
                      className="relative overflow-hidden group px-4 py-2 lg:px-6 lg:py-3 rounded-xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300"></div>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <span className="relative flex items-center gap-2 text-sm lg:text-base">
                        <User className="w-4 h-4" />
                        <span className="hidden sm:inline">Iniciar Sesión</span>
                        <span className="sm:hidden">Entrar</span>
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Botón de menú móvil/tablet */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-10 h-10 xs:w-12 xs:h-12 flex flex-col items-center justify-center rounded-xl transition-all duration-500 group"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-lg border border-white/50 dark:border-gray-700/50 rounded-xl shadow-lg"></div>
                
                <div className="relative w-6 h-6 transform transition-all duration-500">
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`}>
                    <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                  </div>
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`}>
                    <X className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil/tablet */}
        <div className={`md:hidden fixed inset-0 top-14 xs:top-16 sm:top-20 z-[99] transition-all duration-700 overflow-y-auto ${
          isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}>
          {/* Overlay de fondo */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-lg"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menú principal */}
          <div className={`absolute right-2 xs:right-3 sm:right-4 top-4 w-[calc(100%-1rem)] xs:w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-sm bg-gradient-to-br from-white/95 via-white/90 to-white/85 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/85 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 dark:border-gray-700/40 transform transition-all duration-700 ${
            isOpen 
              ? 'translate-y-0 scale-100' 
              : 'translate-y-8 scale-95'
          }`}>
            <div className="p-4 xs:p-6">
              
              {/* Información del usuario */}
              {session && (
                <div className="mb-4 xs:mb-6 pb-4 xs:pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-gradient-to-r from-primary-500 to-ocean-500 flex items-center justify-center">
                      <User className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 dark:text-white text-sm xs:text-base truncate">
                        {session.user.name}
                      </p>
                      <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 truncate">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Barra de búsqueda móvil */}
              <div className="mb-4 xs:mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar destinos o fincas..."
                    className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-sm xs:text-base"
                  />
                </div>
              </div>

              {/* Navegación móvil */}
              <div className="space-y-1 xs:space-y-2">
                <Link
                  href="/destinations"
                  className="flex items-center gap-3 px-3 xs:px-4 py-3 xs:py-4 rounded-xl text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-r from-primary-500/20 to-ocean-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-4 h-4 xs:w-5 xs:h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="font-bold text-sm xs:text-lg">Destinos</span>
                </Link>

                <Link
                  href="/properties"
                  className="flex items-center gap-3 px-3 xs:px-4 py-3 xs:py-4 rounded-xl text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-r from-primary-500/20 to-ocean-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Home className="w-4 h-4 xs:w-5 xs:h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="font-bold text-sm xs:text-lg">Fincas</span>
                </Link>

                <Link
                  href="/about"
                  className="flex items-center gap-3 px-3 xs:px-4 py-3 xs:py-4 rounded-xl text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-r from-primary-500/20 to-ocean-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <UsersIcon className="w-4 h-4 xs:w-5 xs:h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="font-bold text-sm xs:text-lg">Sobre Nosotros</span>
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center gap-3 px-3 xs:px-4 py-3 xs:py-4 rounded-xl text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-r from-primary-500/20 to-ocean-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-4 h-4 xs:w-5 xs:h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="font-bold text-sm xs:text-lg">Contacto</span>
                </Link>

                <Link
                  href="/faq"
                  className="flex items-center gap-3 px-3 xs:px-4 py-3 xs:py-4 rounded-xl text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-r from-primary-500/20 to-ocean-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HelpCircle className="w-4 h-4 xs:w-5 xs:h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="font-bold text-sm xs:text-lg">Preguntas Frecuentes</span>
                </Link>
              </div>

              {/* Separador */}
              <div className="my-4 xs:my-6 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

              {/* Acciones móviles */}
              <div className="space-y-1 xs:space-y-2">
                {session ? (
                  <>
                    {session.user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-3 xs:px-4 py-3 xs:py-4 rounded-xl text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-r from-gold-500/20 to-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 text-gold-600 dark:text-gold-400" />
                        </div>
                        <span className="font-bold text-sm xs:text-lg">Panel Admin</span>
                      </Link>
                    )}

                    <Link
                      href="/favorites"
                      className="flex items-center gap-3 px-3 xs:px-4 py-3 xs:py-4 rounded-xl text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-ocean-500/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-r from-pink-500/20 to-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Heart className="w-4 h-4 xs:w-5 xs:h-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <span className="font-bold text-sm xs:text-lg">Favoritos</span>
                    </Link>

                    <button
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 xs:px-4 py-3 xs:py-4 rounded-xl text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 group hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10"
                    >
                      <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <LogOut className="w-4 h-4 xs:w-5 xs:h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="font-bold text-sm xs:text-lg">Cerrar Sesión</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="w-full flex items-center gap-3 px-3 xs:px-4 py-3 xs:py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <User className="w-4 h-4 xs:w-5 xs:h-5 text-white" />
                    </div>
                    <span className="text-sm xs:text-lg">Iniciar Sesión</span>
                  </Link>
                )}
              </div>

              {/* Toggle de tema móvil */}
              <div className="mt-4 xs:mt-6 pt-4 xs:pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-full flex items-center justify-between px-3 xs:px-4 py-3 xs:py-4 rounded-xl bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-lg border border-white/50 dark:border-gray-700/50"
                >
                  <span className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">
                    Modo {theme === 'dark' ? 'Oscuro' : 'Claro'}
                  </span>
                  <div className="relative w-10 h-6 xs:w-12 xs:h-6 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700">
                    <div className={`absolute top-1/2 w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-white transform -translate-y-1/2 transition-all duration-300 ${
                      theme === 'dark' ? 'left-5 xs:left-6' : 'left-0.5 xs:left-1'
                    }`}>
                      {theme === 'dark' ? (
                        <Moon className="w-3 h-3 xs:w-4 xs:h-4 text-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      ) : (
                        <Sun className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Espaciador para el contenido */}
      <div className="h-14 xs:h-16 sm:h-20"></div>
    </>
  )
}

// Componente de calendario para las reservas
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)