'use client'

import { useState } from 'react'
import { ChevronDown, Search, Sparkles, HelpCircle } from 'lucide-react'

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      question: '¿Cómo realizo una reserva?',
      answer: 'Es muy sencillo. Navega por nuestras fincas disponibles, selecciona tu destino favorito, elige las fechas deseadas y completa el proceso de pago de forma segura. ¡En minutos tendrás tu experiencia confirmada!',
      category: 'Reservas',
    },
    {
      question: '¿Cuál es el tiempo mínimo de reserva?',
      answer: 'El tiempo mínimo de reserva es de 2 noches para la mayoría de nuestras propiedades. Sin embargo, algunas fincas premium ofrecen estadías de 1 noche. Verifica los detalles específicos en cada propiedad.',
      category: 'Reservas',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos todas las tarjetas de crédito (Visa, Mastercard, American Express), transferencias bancarias y billeteras digitales. Puedes pagar el total o utilizar nuestro plan de cuotas sin interés.',
      category: 'Pago',
    },
    {
      question: '¿Hay cancelación o modificación gratis?',
      answer: 'Sí, ofrecemos cancelación gratuita hasta 14 días antes de tu llegada. Las modificaciones de fechas también son gratuitas con ese mismo plazo. Después de eso, aplican políticas específicas por propiedad.',
      category: 'Cancelaciones',
    },
    {
      question: '¿Las fincas incluyen servicios adicionales?',
      answer: 'Cada finca es diferente. Todas incluyen lo básico: wifi, cocina, baños completos. Algunas ofrecen piscina, jacuzzi, sauna, entretenimiento y personal de servicio. Revisa la descripción detallada de cada propiedad.',
      category: 'Servicios',
    },
    {
      question: '¿Puedo traer mascotas?',
      answer: 'Sí, tenemos propiedades pet-friendly. Al momento de hacer la búsqueda, selecciona el filtro "Mascotas permitidas" para ver solo las fincas que acepta tu compañero felino o canino.',
      category: 'Políticas',
    },
    {
      question: '¿Hay servicio de transporte?',
      answer: 'Algunas de nuestras fincas premium incluyen servicio de transporte desde el aeropuerto. Puedes solicitar este servicio adicional al confirmar tu reserva o contactarnos directamente.',
      category: 'Transporte',
    },
    {
      question: '¿Cómo es el proceso de check-in?',
      answer: 'El check-in es desde las 3:00 PM y el check-out hasta las 11:00 AM. Te enviaremos instrucciones detalladas con los códigos de acceso y contactos del administrador de la finca con anticipación.',
      category: 'Reservas',
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden pt-24 pb-12 xs:pb-16 sm:pb-20">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-ocean-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 xs:mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center gap-2 mb-4 xs:mb-6 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20">
            <HelpCircle className="w-5 h-5 text-primary-400" />
            <span className="text-sm font-semibold text-primary-400">Preguntas Frecuentes</span>
          </div>
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-black text-white mb-4 xs:mb-6">
            Te Resolvemos tus{' '}
            <span className="bg-gradient-to-r from-primary-400 to-ocean-400 bg-clip-text text-transparent">
              Dudas
            </span>
          </h1>
          <p className="text-gray-400 text-base xs:text-lg sm:text-xl max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestro servicio. ¿No encuentras lo que buscas? Contacta con nuestro equipo.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 xs:mb-16">
          <div className="relative">
            <Search className="absolute left-4 xs:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Busca tu pregunta aquí..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 xs:pl-14 pr-4 xs:pr-6 py-3 xs:py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl xs:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 text-sm xs:text-base"
            />
          </div>
        </div>

        {/* Category Tags */}
        {filteredFaqs.length === faqs.length && (
          <div className="mb-12 xs:mb-16 flex flex-wrap gap-2 xs:gap-3">
            {categories.map((category) => (
              <div
                key={category}
                className="px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-ocean-500/20 border border-primary-500/30 text-xs xs:text-sm font-semibold text-primary-300 hover:from-primary-500/30 hover:to-ocean-500/30 transition-all duration-300 cursor-default"
              >
                {category}
              </div>
            ))}
          </div>
        )}

        {/* Results Info */}
        {searchQuery && (
          <p className="text-gray-400 text-sm xs:text-base mb-8 xs:mb-12">
            Se encontraron <span className="text-primary-400 font-semibold">{filteredFaqs.length}</span> resultados para &quot;{searchQuery}&quot;
          </p>
        )}

        {/* FAQ Accordion */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3 xs:space-y-4 sm:space-y-5">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="group"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <div className="relative overflow-hidden rounded-xl xs:rounded-2xl transition-all duration-500">
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:via-primary-500/10 group-hover:to-primary-500/5 transition-all duration-500"></div>

                  {/* Base background */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-primary-500/20 transition-all duration-300"></div>

                  {/* Content */}
                  <button className="relative w-full text-left p-4 xs:p-6 sm:p-8 focus:outline-none">
                    {/* Question Header */}
                    <div className="flex items-start gap-3 xs:gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-6 h-6 xs:w-8 xs:h-8 rounded-lg bg-gradient-to-br from-primary-500 to-ocean-500 flex items-center justify-center transform transition-transform duration-300 ${
                          activeIndex === index ? 'scale-110 rotate-12' : 'group-hover:scale-105'
                        }`}>
                          <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                        </div>
                      </div>

                      {/* Question */}
                      <div className="flex-1">
                        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300 pr-8 xs:pr-12">
                          {faq.question}
                        </h3>
                        <p className="text-xs xs:text-sm text-primary-400/70 mt-1 xs:mt-2">
                          {faq.category}
                        </p>
                      </div>

                      {/* Chevron */}
                      <ChevronDown
                        className={`w-5 h-5 xs:w-6 xs:h-6 text-gray-400 group-hover:text-primary-400 transition-all duration-300 flex-shrink-0 mt-1 transform ${
                          activeIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    {/* Answer */}
                    <div
                      className={`grid transition-all duration-500 ease-out overflow-hidden ${
                        activeIndex === index ? 'grid-rows-1 mt-4 xs:mt-6' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-8 xs:pl-12 sm:pl-14 text-gray-300 text-sm xs:text-base leading-relaxed">
                          <p className="pb-2">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-ocean-500 to-primary-500 transform transition-transform duration-300 ${
                    activeIndex === index ? 'scale-x-100' : 'scale-x-0 origin-left'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 xs:py-16">
            <HelpCircle className="w-12 h-12 xs:w-16 xs:h-16 text-gray-600 mx-auto mb-4 xs:mb-6" />
            <h3 className="text-xl xs:text-2xl font-bold text-white mb-2">Sin resultados</h3>
            <p className="text-gray-400">
              No encontramos preguntas que coincidan con tu búsqueda. Intenta con otros términos.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 xs:mt-20 sm:mt-24 p-6 xs:p-8 sm:p-12 rounded-2xl xs:rounded-3xl bg-gradient-to-br from-primary-500/10 via-ocean-500/5 to-primary-500/10 border border-primary-500/20 backdrop-blur-xl">
          <div className="text-center">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-3 xs:mb-4">
              ¿Aún tienes dudas?
            </h2>
            <p className="text-gray-300 text-base xs:text-lg mb-6 xs:mb-8">
              Nuestro equipo está disponible 24/7 para ayudarte. Contáctanos por tu canal favorito.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center">
              <a
                href="/contact"
                className="group relative px-6 xs:px-8 py-2.5 xs:py-3 bg-gradient-to-r from-primary-500 to-ocean-500 text-white font-semibold rounded-lg xs:rounded-xl hover:shadow-2xl transition-all duration-300 overflow-hidden text-sm xs:text-base"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Contactar Ahora</span>
              </a>
              <a
                href="https://wa.me/573193539046"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 xs:px-8 py-2.5 xs:py-3 bg-green-500/20 border border-green-500/30 text-green-300 font-semibold rounded-lg xs:rounded-xl hover:bg-green-500/30 hover:border-green-500/50 transition-all duration-300 text-sm xs:text-base"
              >
                <span className="relative">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
