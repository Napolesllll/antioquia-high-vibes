'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 600)
    }, 2400)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-600 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Fondo animado con gradientes */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900/50 to-gray-900">
        {/* Gradientes animados */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-500/30 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-ocean-500/30 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Grid de fondo sutil */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Líneas animadas de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent animate-pulse" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocean-500/30 to-transparent animate-pulse animation-delay-1000" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent animate-pulse animation-delay-2000" />
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        {/* Logo Container con animaciones */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12">
          {/* Círculos de luz de fondo */}
          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-primary-500/20 to-ocean-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-ocean-500/15 to-primary-500/15 rounded-full blur-2xl animate-pulse animation-delay-1000" />

          {/* Logo */}
          <div className="relative z-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-scale-in">
            <Image
              src="/images/logol.png"
              alt="Antioquia High Vibes"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, (max-width: 1024px) 256px, 256px"
            />
          </div>

          {/* Orbitas animadas */}
          <div className="absolute w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full border border-primary-500/30 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full border border-ocean-500/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
        </div>

        {/* Texto principal */}
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white animate-fade-in-up leading-tight">
            <span className="bg-gradient-to-r from-primary-300 via-white to-ocean-300 bg-clip-text text-transparent">
              Antioquia High Vibes
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 animate-fade-in-up font-medium tracking-wide" style={{ animationDelay: '0.2s' }}>
            Experiencias inolvidables en los destinos más mágicos
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Dots animados */}
          <div className="flex gap-2 sm:gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400"
                style={{
                  animation: `bounce 1.4s infinite ease-in-out`,
                  animationDelay: `${i * 0.16}s`,
                }}
              />
            ))}
          </div>

          {/* Texto de carga */}
          <p className="text-xs sm:text-sm text-gray-400 animate-pulse tracking-widest">
            PREPARANDO MAGIA
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="absolute bottom-8 sm:bottom-12 w-full max-w-xs mx-auto px-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 via-ocean-500 to-primary-500 rounded-full animate-loading-bar" />
          </div>
        </div>
      </div>

      {/* Estilos globales para las animaciones */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateY(180deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            opacity: 0.5;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-12px);
          }
        }

        @keyframes loading-bar {
          0% {
            width: 0%;
            left: 0;
          }
          50% {
            width: 100%;
            left: 0;
          }
          100% {
            width: 100%;
            left: 100%;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animate-scale-in {
          animation: scale-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          @keyframes bounce {
            0%, 80%, 100% {
              opacity: 0.5;
              transform: translateY(0);
            }
            40% {
              opacity: 1;
              transform: translateY(-8px);
            }
          }
        }
      `}</style>
    </div>
  )
}
