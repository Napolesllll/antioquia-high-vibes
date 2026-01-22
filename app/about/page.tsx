import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Target, Zap, Users, Award, TreePine } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros | Antioquia High Vibes',
  description: 'Conoce la historia y misión detrás de Antioquia High Vibes',
}

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Pasión',
      description: 'Amamos lo que hacemos y se refleja en cada detalle de nuestro servicio',
    },
    {
      icon: Target,
      title: 'Precisión',
      description: 'Cada finca es seleccionada cuidadosamente para garantizar calidad',
    },
    {
      icon: Zap,
      title: 'Innovación',
      description: 'Utilizamos tecnología moderna para mejorar tu experiencia',
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Creamos conexiones genuinas entre huéspedes y propietarios',
    },
  ]

  const stats = [
    { number: '50+', label: 'Fincas Disponibles' },
    { number: '1000+', label: 'Huéspedes Felices' },
    { number: '15+', label: 'Pueblos Cubiertos' },
    { number: '98%', label: 'Satisfacción' },
  ]

  const team = [
    {
      name: 'María García',
      role: 'Fundadora & CEO',
      emoji: '👩‍💼',
    },
    {
      name: 'Carlos López',
      role: 'Director de Operaciones',
      emoji: '👨‍💼',
    },
    {
      name: 'Ana Martínez',
      role: 'Directora de Experiencia',
      emoji: '👩‍🔬',
    },
    {
      name: 'Juan Rodríguez',
      role: 'Especialista en Tecnología',
      emoji: '👨‍💻',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden pt-40">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-ocean-200/30 dark:bg-ocean-900/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver al inicio</span>
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Nuestra Historia
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Somos más que una plataforma de alquiler. Somos guardianes de experiencias inolvidables en los pueblos mágicos de Antioquia.
          </p>
        </div>

        {/* Main Story */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Cómo Comenzó Todo
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                En 2020, durante un viaje por los pueblos de Antioquia, descubrimos algo especial: la gente de la región ofrecía sus fincas con un cuidado genuino, pero faltaba un canal confiable para conectarlos con viajeros que buscaban autenticidad.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                La Misión
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Conectar a viajeros con las fincas más hermosas de Antioquia, creando experiencias auténticas que transforman la forma en que las personas descubren nuevos lugares.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                La Visión
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Ser la plataforma líder de experiencias rurales en Colombia, donde cada estancia es un viaje de transformación personal.
              </p>
            </div>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-ocean-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🌄</div>
                  <p className="text-white text-xl font-semibold">Experiencias que Transforman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Lo que nos guía en cada decisión
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-tropical rounded-full text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-br from-primary-500 to-ocean-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Profesionales apasionados por crear experiencias extraordinarias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Nuestro Compromiso
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Sostenibilidad
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Promovemos prácticas ecológicas en todas nuestras fincas
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Equidad
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Beneficiamos a las comunidades locales de forma justa y transparente
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Excelencia
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Mantenemos estándares altos en cada aspecto del servicio
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-ocean-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <TreePine className="w-24 h-24 text-white mx-auto mb-4" />
                    <p className="text-white text-lg font-semibold">Cuidando la Naturaleza</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-ocean-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a miles de viajeros que han descubierto la magia de Antioquia con nosotros
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/destinations"
              className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block"
            >
              Explorar Destinos
            </Link>
            <Link
              href="/properties"
              className="px-8 py-4 bg-primary-700 text-white font-bold rounded-xl hover:bg-primary-800 transition-all duration-300 hover:scale-105 inline-block border-2 border-white"
            >
              Ver Fincas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
