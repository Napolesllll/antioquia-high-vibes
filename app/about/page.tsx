import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Target, Zap, Users, Award, TreePine, Sparkles, Globe, Shield, Star, ChevronRight, Home, Mountain, Coffee, Leaf } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros | Antioquia High Vibes',
  description: 'Conoce la historia, misión y valores detrás de Antioquia High Vibes',
  openGraph: {
    title: 'Nosotros | Antioquia High Vibes',
    description: 'Conoce la historia y misión detrás de Antioquia High Vibes',
    images: ['/images/about-hero.jpg'],
  },
}

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Pasión Auténtica',
      description: 'Amamos lo que hacemos y se refleja en cada detalle de nuestro servicio',
      color: 'from-rose-500/20 to-pink-500/20',
      iconColor: 'text-rose-500'
    },
    {
      icon: Target,
      title: 'Precisión Exquisita',
      description: 'Cada finca es seleccionada cuidadosamente para garantizar calidad máxima',
      color: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500'
    },
    {
      icon: Zap,
      title: 'Innovación Constante',
      description: 'Utilizamos tecnología moderna para mejorar cada aspecto de tu experiencia',
      color: 'from-amber-500/20 to-yellow-500/20',
      iconColor: 'text-amber-500'
    },
    {
      icon: Users,
      title: 'Comunidad Sólida',
      description: 'Creamos conexiones genuinas entre huéspedes y propietarios',
      color: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-500'
    },
  ]

  const stats = [
    { number: '50+', label: 'Fincas Exclusivas', icon: Home, color: 'from-primary-500/20 to-primary-600/20' },
    { number: '1000+', label: 'Huéspedes Felices', icon: Users, color: 'from-emerald-500/20 to-green-500/20' },
    { number: '15+', label: 'Pueblos Mágicos', icon: Mountain, color: 'from-purple-500/20 to-pink-500/20' },
    { number: '98%', label: 'Satisfacción', icon: Star, color: 'from-amber-500/20 to-yellow-500/20' },
  ]

  const team = [
    {
      name: 'María García',
      role: 'Fundadora & CEO',
      emoji: '👩‍💼',
      description: 'Apasionada por el turismo sostenible y las experiencias auténticas',
      color: 'from-primary-500/10 to-primary-600/10'
    },
    {
      name: 'Carlos López',
      role: 'Director de Operaciones',
      emoji: '👨‍💼',
      description: 'Experto en hospitalidad y gestión de propiedades premium',
      color: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      name: 'Ana Martínez',
      role: 'Directora de Experiencia',
      emoji: '👩‍🔬',
      description: 'Especialista en crear momentos memorables para cada huésped',
      color: 'from-emerald-500/10 to-green-500/10'
    },
    {
      name: 'Juan Rodríguez',
      role: 'Especialista en Tecnología',
      emoji: '👨‍💻',
      description: 'Innovador en soluciones digitales para el sector turístico',
      color: 'from-purple-500/10 to-pink-500/10'
    },
  ]

  const commitments = [
    {
      icon: Leaf,
      title: 'Sostenibilidad Integral',
      description: 'Promovemos prácticas ecológicas y responsables en todas nuestras fincas asociadas',
      color: 'from-emerald-500/20 to-green-500/20'
    },
    {
      icon: Users,
      title: 'Equidad Comunitaria',
      description: 'Beneficiamos a las comunidades locales de forma justa, transparente y sostenible',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Shield,
      title: 'Excelencia Garantizada',
      description: 'Mantenemos los más altos estándares de calidad y seguridad en cada experiencia',
      color: 'from-amber-500/20 to-yellow-500/20'
    },
    {
      icon: Globe,
      title: 'Impacto Positivo',
      description: 'Contribuimos al desarrollo sostenible del turismo en Antioquia',
      color: 'from-purple-500/20 to-pink-500/20'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/50">
      {/* Hero Section - Completamente Responsiva */}
      <div className="relative pt-24 xs:pt-28 sm:pt-32 pb-12 xs:pb-16 sm:pb-20 px-3 xs:px-4 sm:px-6 overflow-hidden">
        {/* Fondos decorativos animados */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-ocean-500/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-gradient-to-bl from-primary-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 xs:w-72 xs:h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-ocean-500/20 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-8xl mx-auto relative z-10">
          {/* Breadcrumb Mejorado */}
          <div className="mb-6 xs:mb-8 sm:mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 xs:gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-4 xs:px-5 py-2.5 xs:py-3 rounded-xl hover:rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 text-primary-600 dark:text-primary-400 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm xs:text-base">
                Volver al inicio
              </span>
            </Link>
          </div>

          {/* Header Principal */}
          <div className="text-center mb-8 xs:mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 xs:gap-2 bg-gradient-to-r from-primary-500/10 to-ocean-500/10 backdrop-blur-lg px-3 xs:px-4 py-1.5 xs:py-2 rounded-full border border-primary-400/20 mb-4 xs:mb-6">
              <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-500" />
              <span className="text-primary-600 dark:text-primary-400 font-bold text-xs xs:text-sm">
                NUESTRA HISTORIA
              </span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-4 xs:mb-6 leading-tight px-2">
              Más que una plataforma,{' '}
              <span className="bg-gradient-to-r from-primary-600 via-ocean-600 to-primary-600 bg-clip-text text-transparent">
                una pasión compartida
              </span>
            </h1>
            
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-3 xs:px-4 leading-relaxed">
              Somos guardianes de experiencias inolvidables en los pueblos mágicos de Antioquia, conectando viajeros con la autenticidad rural.
            </p>
          </div>
        </div>
      </div>

      {/* Main Story - Responsiva */}
      <div className="max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 sm:gap-16 items-center">
          {/* Contenido de Historia */}
          <div className="space-y-6 xs:space-y-8 sm:space-y-10">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 xs:mb-6">
                El inicio de{' '}
                <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                  algo extraordinario
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base leading-relaxed">
                En 2020, durante un viaje por los pueblos escondidos de Antioquia, descubrimos la magia que yacía en las fincas familiares. La calidez de su gente y la autenticidad de sus espacios nos inspiraron a crear un puente entre estos tesoros ocultos y viajeros que buscan experiencias genuinas.
              </p>
            </div>

            <div className="space-y-4 xs:space-y-6">
              <div className="bg-gradient-to-r from-primary-500/5 to-primary-500/10 backdrop-blur-lg rounded-2xl p-4 xs:p-6 border border-primary-400/20">
                <h3 className="text-xl xs:text-2xl font-black text-primary-700 dark:text-primary-300 mb-2 xs:mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 xs:w-6 xs:h-6" />
                  Nuestra Misión
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base">
                  Conectar viajeros con las fincas más auténticas de Antioquia, creando experiencias transformadoras que renuevan el espíritu y enriquecen el alma.
                </p>
              </div>

              <div className="bg-gradient-to-r from-ocean-500/5 to-ocean-500/10 backdrop-blur-lg rounded-2xl p-4 xs:p-6 border border-ocean-400/20">
                <h3 className="text-xl xs:text-2xl font-black text-ocean-700 dark:text-ocean-300 mb-2 xs:mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 xs:w-6 xs:h-6" />
                  Nuestra Visión
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base">
                  Ser el referente líder en experiencias rurales auténticas en Colombia, donde cada estadía es un capítulo memorable en la historia personal de nuestros huéspedes.
                </p>
              </div>
            </div>
          </div>

          {/* Imagen/Ilustración */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-500/20 via-primary-500/10 to-ocean-500/20 rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/20 backdrop-blur-lg">
              <div className="aspect-square flex flex-col items-center justify-center p-8 xs:p-10 sm:p-12">
                <div className="relative mb-6 xs:mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-ocean-500 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-24 h-24 xs:w-32 xs:h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-full flex items-center justify-center">
                    <Mountain className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 text-white" />
                  </div>
                </div>
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2 xs:mb-3 text-center">
                  Transformando
                  <br />
                  <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                    Experiencias
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base text-center max-w-xs">
                  Cada finca es una historia, cada huésped un protagonista
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section - Responsiva */}
      <div className="max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-20">
        <div className="text-center mb-10 xs:mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
            Valores que nos{' '}
            <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
              definen
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-3">
            Los principios que guían cada decisión y acción en nuestro camino
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 xs:p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 xs:mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto`}>
                  <Icon className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 ${value.iconColor}`} />
                </div>
                <h3 className="text-lg xs:text-xl font-black text-gray-900 dark:text-white mb-2 xs:mb-3 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats Section - Responsiva */}
      <div className="relative overflow-hidden py-12 xs:py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-ocean-500/10"></div>
        <div className="max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 xs:p-6 border border-white/50 dark:border-gray-700/50 text-center transform hover:scale-105 transition-all duration-500"
                >
                  <div className={`w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 xs:mb-4 mx-auto`}>
                    <Icon className="w-5 h-5 xs:w-6 xs:h-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div className="text-2xl xs:text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-1 xs:mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Team Section - Responsiva */}
      <div className="max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-20">
        <div className="text-center mb-10 xs:mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
            El equipo{' '}
            <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
              detrás de la magia
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-3">
            Profesionales apasionados dedicados a crear experiencias extraordinarias
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 xs:p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-500/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="text-5xl xs:text-6xl sm:text-7xl mb-4 xs:mb-6 text-center">{member.emoji}</div>
                <h3 className="text-lg xs:text-xl font-black text-gray-900 dark:text-white mb-1.5 xs:mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-bold text-sm xs:text-base mb-2 xs:mb-3 text-center">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm text-center leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment Section - Responsiva */}
      <div className="max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-20">
        <div className="text-center mb-10 xs:mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 xs:mb-4">
            Nuestro compromiso{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              con el futuro
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-3">
            Más allá del turismo, construimos un legado positivo para Antioquia
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 xs:gap-12">
          <div className="space-y-4 xs:space-y-6 sm:space-y-8">
            {commitments.map((commitment, index) => {
              const Icon = commitment.icon
              return (
                <div
                  key={index}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 xs:p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-500/50 transition-all duration-500 transform hover:-translate-x-1"
                >
                  <div className="flex items-start gap-3 xs:gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br ${commitment.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-5 h-5 xs:w-6 xs:h-6 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="text-lg xs:text-xl font-black text-gray-900 dark:text-white mb-1 xs:mb-2">
                        {commitment.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm leading-relaxed">
                        {commitment.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/20 backdrop-blur-lg h-full">
              <div className="aspect-square flex flex-col items-center justify-center p-8 xs:p-10 sm:p-12">
                <div className="relative mb-6 xs:mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-24 h-24 xs:w-32 xs:h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                    <Leaf className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 text-white" />
                  </div>
                </div>
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2 xs:mb-3 text-center">
                  Sostenibilidad
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    como estilo de vida
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base text-center max-w-xs">
                  Cuidamos cada detalle para un turismo responsable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Responsiva */}
      <div className="max-w-8xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-20">
        <div className="bg-gradient-to-r from-primary-500/10 via-primary-500/5 to-ocean-500/10 rounded-2xl sm:rounded-3xl p-8 xs:p-10 sm:p-12 md:p-16 text-center relative overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute top-0 left-0 w-32 h-32 xs:w-40 xs:h-40 bg-primary-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 xs:w-48 xs:h-48 bg-ocean-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 xs:gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg px-3 xs:px-4 py-1.5 xs:py-2 rounded-full mb-4 xs:mb-6">
              <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary-500" />
              <span className="text-primary-600 dark:text-primary-400 font-bold text-xs xs:text-sm">
                ÚNETE A LA EXPERIENCIA
              </span>
            </div>
            <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 xs:mb-6">
              ¿Listo para tu próxima{' '}
              <span className="bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                aventura memorable?
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm xs:text-base sm:text-lg mb-8 xs:mb-12 max-w-2xl mx-auto px-3">
              Únete a miles de viajeros que han descubierto la magia auténtica de Antioquia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 xs:gap-6 justify-center">
              <Link
                href="/destinations"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-6 xs:px-8 py-3.5 xs:py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm xs:text-base inline-flex items-center justify-center gap-2"
              >
                <Mountain className="w-4 h-4 xs:w-5 xs:h-5" />
                <span>Explorar Destinos</span>
              </Link>
              <Link
                href="/properties"
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg text-gray-900 dark:text-white font-bold px-6 xs:px-8 py-3.5 xs:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300 text-sm xs:text-base inline-flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 xs:w-5 xs:h-5" />
                <span>Descubrir Fincas</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}