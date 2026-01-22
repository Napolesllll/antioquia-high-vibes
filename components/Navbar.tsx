'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, User, LogOut, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    const scrollListener = handleScroll
    window.addEventListener('scroll', scrollListener, { passive: true })
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  if (!mounted) return null

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 relative">
          {/* Logo - Responsive size */}
          <Link 
            href="/" 
            className={`flex items-center flex-shrink-0 relative ${!scrolled ? 'pointer-events-auto' : ''}`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-32 h-12 sm:w-48 sm:h-16 md:w-64 md:h-16"
            >
              <Image
                src="/images/logol.png"
                alt="High Vibes Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, 256px"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-4 lg:gap-6 relative ${!scrolled ? 'pointer-events-auto' : ''}`}>
            {/* Navigation Links */}
            <div className="flex items-center space-x-6 lg:space-x-8">
              <Link
                href="/destinations"
                className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium whitespace-nowrap"
              >
                Destinos
              </Link>
              <Link
                href="/properties"
                className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium whitespace-nowrap"
              >
                Fincas
              </Link>
              <Link
                href="/about"
                className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium whitespace-nowrap"
              >
                Nosotros
              </Link>
            </div>
            
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

            {/* User Actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                )}
              </button>

              {/* User Menu */}
              {session ? (
                <>
                  {session.user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm lg:text-base"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="font-medium whitespace-nowrap">Admin</span>
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm lg:text-base"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium truncate max-w-[100px]">{session.user.name}</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="p-1.5 sm:p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                    aria-label="Cerrar sesión"
                  >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              ) : (
                <Link href="/auth/signin" className="btn-primary text-sm sm:text-base">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative ${!scrolled ? 'pointer-events-auto' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative"
          >
            <div className="px-3 py-4 xs:px-4 xs:py-6 space-y-3 xs:space-y-4">
              <Link
                href="/destinations"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Destinos
              </Link>
              <Link
                href="/properties"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Fincas
              </Link>
              <Link
                href="/about"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Nosotros
              </Link>
              
              {session ? (
                <>
                  {session.user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Panel Admin
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                    }}
                    className="w-full text-left py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="block w-full text-center btn-primary mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}