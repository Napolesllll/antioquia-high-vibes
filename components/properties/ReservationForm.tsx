'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Calendar, Users, Loader2 } from 'lucide-react'
import { differenceInDays } from 'date-fns'

const reservationSchema = z.object({
  checkIn: z.string().min(1, 'Selecciona la fecha de llegada'),
  checkOut: z.string().min(1, 'Selecciona la fecha de salida'),
  guests: z.number().min(1, 'Mínimo 1 huésped'),
})

type ReservationFormData = z.infer<typeof reservationSchema>

interface ReservationFormProps {
  propertyId: number
  pricePerNight: number
  maxGuests: number
  propertyName: string
  propertySlug: string
}

export default function ReservationForm({
  propertyId,
  pricePerNight,
  maxGuests,
  propertyName,
  propertySlug,
}: ReservationFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573193539046'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
    },
  })

  const checkIn = watch('checkIn')
  const checkOut = watch('checkOut')
  const guests = watch('guests')

  // Calcular total
  const nights =
    checkIn && checkOut ? differenceInDays(new Date(checkOut), new Date(checkIn)) : 0
  const subtotal = nights * pricePerNight
  const cleaningFee = 50000
  const serviceFee = subtotal * 0.1
  const total = subtotal + cleaningFee + serviceFee

  const onSubmit = async (data: ReservationFormData) => {
    if (nights < 1) {
      toast.error('La estadía debe ser de al menos 1 noche')
      return
    }

    setIsLoading(true)

    try {
      // Formatear fechas
      const checkInDate = new Date(data.checkIn).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      const checkOutDate = new Date(data.checkOut).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      // Construir mensaje de WhatsApp
      const propertyUrl = `${window.location.origin}/properties/${propertySlug}`
      const message = `*Nueva Solicitud de Reserva - Antioquia High Vibes*\n\n` +
        `*Propiedad:* ${propertyName}\n` +
        `*Llegada:* ${checkInDate}\n` +
        `*Salida:* ${checkOutDate}\n` +
        `*Noches:* ${nights}\n` +
        `*Huéspedes:* ${data.guests}\n` +
        `*Valor/Noche:* $${(pricePerNight / 1000).toFixed(0)}k\n` +
        `*Total:* $${(total / 1000).toFixed(0)}k\n` +
        `*Enlace:* ${propertyUrl}`

      // Redirigir a WhatsApp
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`
      
      window.open(whatsappUrl, '_blank')
      toast.success('¡Redirigiendo a WhatsApp para confirmar tu reserva!')
      
      // También guardar la reserva en la BD si el usuario está autenticado
      if (session) {
        try {
          await fetch('/api/reservations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              propertyId,
              checkIn: data.checkIn,
              checkOut: data.checkOut,
              guests: data.guests,
              totalPrice: total,
            }),
          })
        } catch (error) {
          console.error('Error guardando reserva:', error)
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al procesar la reserva')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
      {/* Price Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            ${pricePerNight.toLocaleString('es-CO')}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">/ noche</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Llegada
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="date"
                {...register('checkIn')}
                min={new Date().toISOString().split('T')[0]}
                className="input-field pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            {errors.checkIn && (
              <p className="text-xs text-red-500 mt-0.5">{errors.checkIn.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Salida
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="date"
                {...register('checkOut')}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="input-field pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            {errors.checkOut && (
              <p className="text-xs text-red-500 mt-0.5">{errors.checkOut.message}</p>
            )}
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Huéspedes
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <select
              {...register('guests', { valueAsNumber: true })}
              className="input-field pl-8 sm:pl-10 text-xs sm:text-sm"
            >
              {Array.from({ length: Math.max(maxGuests, 300) }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Huésped' : 'Huéspedes'}
                </option>
              ))}
            </select>
          </div>
          {errors.guests && (
            <p className="text-xs text-red-500 mt-0.5">{errors.guests.message}</p>
          )}
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span>
                ${pricePerNight.toLocaleString('es-CO')} x {nights}{' '}
                {nights === 1 ? 'noche' : 'noches'}
              </span>
              <span>${subtotal.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span>Limpieza</span>
              <span>${cleaningFee.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span>Servicio</span>
              <span>${serviceFee.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900 dark:text-white pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span>
              <span>${total.toLocaleString('es-CO')}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || nights < 1}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base mt-3 sm:mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            'Contactar por WhatsApp'
          )}
        </button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Te redirigiremos a WhatsApp para confirmar tu reserva
        </p>
      </form>

      {/* Info */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          No te preocupes, aún no se te cobrará
        </p>
      </div>
    </div>
  )
}