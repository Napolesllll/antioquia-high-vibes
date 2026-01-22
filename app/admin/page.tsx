import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import AdminLayout from '@/components/admin/AdminLayout'
import { BarChart3, Package, FolderPlus, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Panel de Administración | Antioquia High Vibes',
}

async function getStats() {
  const [categoriesCount, propertiesCount, usersCount, reservationsCount] =
    await Promise.all([
      prisma.category.count(),
      prisma.property.count(),
      prisma.user.count(),
      prisma.reservation.count(),
    ])

  return {
    categories: categoriesCount,
    properties: propertiesCount,
    users: usersCount,
    reservations: reservationsCount,
  }
}

export default async function AdminPage() {
  const stats = await getStats()

  const statCards = [
    {
      title: 'Pueblos',
      value: stats.categories,
      icon: FolderPlus,
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'Fincas',
      value: stats.properties,
      icon: Package,
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Usuarios',
      value: stats.users,
      icon: Users,
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Reservas',
      value: stats.reservations,
      icon: BarChart3,
      color: 'from-orange-400 to-orange-600',
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenido al panel de administración de Antioquia High Vibes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${card.color} rounded-xl shadow-lg p-6 text-white`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">
                      {card.title}
                    </p>
                    <p className="text-4xl font-bold mt-2">{card.value}</p>
                  </div>
                  <Icon className="w-12 h-12 text-white/30" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/admin/categories"
              className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition"
            >
              <FolderPlus className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Gestionar Pueblos
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Crear y editar categorías de destinos
              </p>
            </a>
            <a
              href="/admin/properties"
              className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition"
            >
              <Package className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Gestionar Fincas
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Crear y editar propiedades disponibles
              </p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
