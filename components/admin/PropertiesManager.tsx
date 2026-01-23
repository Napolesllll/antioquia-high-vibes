'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit2, Loader2, AlertCircle, CheckCircle, X } from 'lucide-react'
import CloudinaryUpload from '@/components/CloudinaryUpload'
import CloudinaryMultiUpload from '@/components/CloudinaryMultiUpload'

interface Category {
  id: number
  name: string
}

interface Property {
  id: number
  name: string
  categoryId: number
  location: string
  capacity: number
  pricePerNight: number
  featured: boolean
  description?: string
  images?: string[]
  amenities?: string[]
}

interface FormData {
  categoryId: number
  name: string
  location: string
  description: string
  capacity: number
  pricePerNight: number
  amenities: string
  images: string[]
  featured: boolean
}

export default function PropertiesManager() {
  const [properties, setProperties] = useState<Property[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    categoryId: 0,
    name: '',
    location: '',
    description: '',
    capacity: 2,
    pricePerNight: 0,
    amenities: '',
    images: [],
    featured: false,
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  const fetchData = async () => {
    try {
      const [propsRes, catsRes] = await Promise.all([
        fetch('/api/admin/properties'),
        fetch('/api/admin/categories'),
      ])

      if (!propsRes.ok || !catsRes.ok) throw new Error('Error al cargar')
      const props = await propsRes.json()
      const cats = await catsRes.json()
      setProperties(props)
      setCategories(cats)

      if (cats.length > 0 && !editingId) {
        setFormData(prev => ({ ...prev, categoryId: cats[0].id }))
      }
    } catch (err) {
      setError('No se pudieron cargar los datos')
    }
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!formData.categoryId || !formData.name || !formData.location || !formData.pricePerNight || !formData.capacity) {
      setError('Categoría, nombre, ubicación, precio y capacidad son requeridos')
      return
    }

    setIsLoading(true)

    try {
      const slug = generateSlug(formData.name)
      const payload = {
        categoryId: parseInt(formData.categoryId.toString()),
        name: formData.name,
        slug,
        location: formData.location,
        description: formData.description,
        capacity: parseInt(formData.capacity.toString()),
        pricePerNight: parseFloat(formData.pricePerNight.toString()),
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
        images: Array.isArray(formData.images) ? formData.images : [],
        featured: formData.featured,
      }

      const response = await fetch(
        editingId ? `/api/admin/properties/${editingId}` : '/api/admin/properties',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al guardar')
      }

      setSuccess(editingId ? 'Finca actualizada' : 'Finca creada')
      resetForm()
      await fetchData()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (property: Property) => {
    setFormData({
      categoryId: property.categoryId,
      name: property.name,
      location: property.location,
      description: property.description || '',
      capacity: property.capacity,
      pricePerNight: property.pricePerNight,
      amenities: property.amenities?.join(', ') || '',
      images: property.images || [],
      featured: property.featured,
    })
    setEditingId(property.id)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro?')) return

    try {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Error al eliminar')
      setSuccess('Finca eliminada')
      await fetchData()
    } catch (err) {
      setError('Error al eliminar la finca')
    }
  }

  const resetForm = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setFormData({
      categoryId: categories[0]?.id || 0,
      name: '',
      location: '',
      description: '',
      capacity: 2,
      pricePerNight: 0,
      amenities: '',
      images: [],
      featured: false,
    })
  }

  return (
    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 xs:gap-4">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Gestionar Fincas
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 xs:gap-2 bg-gradient-tropical hover:shadow-lg text-white font-semibold px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg transition text-xs xs:text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="w-4 h-4 xs:w-5 xs:h-5" />
          <span>Nueva Finca</span>
        </button>
      </div>

      {/* Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start xs:items-center gap-2 xs:gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg text-sm xs:text-base"
        >
          <AlertCircle className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start xs:items-center gap-2 xs:gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg text-sm xs:text-base"
        >
          <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
          <span>{success}</span>
        </motion.div>
      )}

      {/* Properties Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">
                  Nombre
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">
                  Pueblo
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">
                  Capacidad
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">
                  Precio/Noche
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">
                  Destacada
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-center text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {properties.map((property) => {
                const category = categories.find(c => c.id === property.categoryId)
                return (
                  <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-gray-900 dark:text-white font-medium text-xs xs:text-sm">
                      {property.name}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-gray-600 dark:text-gray-400 text-xs xs:text-sm">
                      {category?.name}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-gray-600 dark:text-gray-400 text-xs xs:text-sm">
                      {property.capacity} personas
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-gray-900 dark:text-white font-semibold text-xs xs:text-sm">
                      ${property.pricePerNight.toLocaleString()}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <span className={`px-2 xs:px-3 py-0.5 xs:py-1 rounded-full text-xs xs:text-sm font-medium whitespace-nowrap ${
                        property.featured
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                      }`}>
                        {property.featured ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-center space-x-1 xs:space-x-2 flex justify-center">
                      <button
                        onClick={() => handleEdit(property)}
                        className="p-1.5 xs:p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                      >
                        <Edit2 className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="p-1.5 xs:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl xs:rounded-2xl shadow-2xl w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl p-3 xs:p-4 sm:p-6 space-y-3 xs:space-y-4 sm:space-y-6 max-h-[95vh] overflow-y-auto my-2 xs:my-4 relative"
          >
            <div className="flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 pb-1 xs:pb-2 -mx-3 xs:-mx-4 sm:-mx-6 px-3 xs:px-4 sm:px-6 mb-2 xs:mb-3 sm:mb-4">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {editingId ? 'Editar Finca' : 'Crear Nueva Finca'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-shrink-0 w-8 h-8 xs:w-10 xs:h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5 xs:w-6 xs:h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5 xs:space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 xs:mb-2">
                    Pueblo
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs xs:text-sm"
                    disabled={isLoading}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 xs:mb-2">
                    Nombre de la Finca
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Casa Rural Bella Vista"
                    className="w-full px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs xs:text-sm"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 xs:mb-2">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Dirección completa"
                    className="w-full px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs xs:text-sm"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 xs:mb-2">
                    Precio por Noche ($)
                  </label>
                  <input
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="1000"
                    className="w-full px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs xs:text-sm"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 xs:mb-2">
                    Capacidad (Personas)
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs xs:text-sm"
                    disabled={isLoading}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 xs:gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-4 h-4 rounded"
                      disabled={isLoading}
                    />
                    <span className="text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300">
                      Destacar esta finca
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2 xs:space-y-2.5">
                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe la finca detalladamente"
                  rows={2}
                  className="w-full px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs xs:text-sm resize-none"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 xs:space-y-2.5">
                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amenidades (separadas por comas)
                </label>
                <textarea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="WiFi, Piscina, Jardín, Cocina, etc."
                  rows={2}
                  className="w-full px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs xs:text-sm resize-none"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 xs:space-y-2.5">
                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300">
                  Imágenes de la Finca
                </label>
                <div className="rounded-lg border border-gray-300 dark:border-gray-600 p-2 xs:p-3">
                  <CloudinaryMultiUpload
                    onImagesUpload={(urls) => {
                      setFormData(prev => ({ ...prev, images: urls }))
                    }}
                    placeholder="Sube las imágenes de la finca"
                    currentImages={Array.isArray(formData.images) ? formData.images : []}
                  />
                </div>
              </div>

              <div className="flex gap-2 xs:gap-3 pt-2 xs:pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isLoading}
                  className="flex-1 px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 text-xs xs:text-sm whitespace-nowrap"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-1.5 xs:gap-2 bg-gradient-tropical text-white font-medium rounded-lg hover:shadow-lg transition disabled:opacity-50 px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-xs xs:text-sm whitespace-nowrap"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 xs:w-3.5 xs:h-3.5 animate-spin" />
                      <span className="hidden xs:inline text-xs">Guardando</span>
                    </>
                  ) : (
                    <span className="text-xs xs:text-sm">{editingId ? 'Actualizar' : 'Crear'}</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
