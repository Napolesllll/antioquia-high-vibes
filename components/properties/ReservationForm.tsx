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
}

export default function ReservationForm({
  propertyId,
  pricePerNight,
  maxGuests,
}: ReservationFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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
    if (!session) {
      toast.error('Debes iniciar sesión para reservar')
      router.push('/auth/signin')
      return
    }

    if (nights < 1) {
      toast.error('La estadía debe ser de al menos 1 noche')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/reservations', {
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

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear la reserva')
      }

      toast.success('¡Reserva creada exitosamente!')
      router.push('/profile')
    } catch (error: any) {
      toast.error(error.message || 'Error al procesar la reserva')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      {/* Price Header */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${pricePerNight.toLocaleString('es-CO')}
          </span>
          <span className="text-gray-500 dark:text-gray-400">/ noche</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Llegada
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                {...register('checkIn')}
                min={new Date().toISOString().split('T')[0]}
                className="input-field pl-10 text-sm"
              />
            </div>
            {errors.checkIn && (
              <p className="text-xs text-red-500 mt-1">{errors.checkIn.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Salida
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                {...register('checkOut')}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="input-field pl-10 text-sm"
              />
            </div>
            {errors.checkOut && (
              <p className="text-xs text-red-500 mt-1">{errors.checkOut.message}</p>
            )}
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Huéspedes
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              {...register('guests', { valueAsNumber: true })}
              className="input-field pl-10 text-sm"
            >
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Huésped' : 'Huéspedes'}
                </option>
              ))}
            </select>
          </div>
          {errors.guests && (
            <p className="text-xs text-red-500 mt-1">{errors.guests.message}</p>
          )}
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                ${pricePerNight.toLocaleString('es-CO')} x {nights}{' '}
                {nights === 1 ? 'noche' : 'noches'}
              </span>
              <span>${subtotal.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Tarifa de limpieza</span>
              <span>${cleaningFee.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Tarifa de servicio</span>
              <span>${serviceFee.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span>
              <span>${total.toLocaleString('es-CO')}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || nights < 1}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            'Reservar Ahora'
          )}
        </button>

        {!session && (
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Necesitas iniciar sesión para reservar
          </p>
        )}
      </form>

      {/* Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          No te preocupes, aún no se te cobrará
        </p>
      </div>
    </div>
  )
}