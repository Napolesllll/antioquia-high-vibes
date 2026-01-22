import { Metadata } from 'next'
import AdminLayout from '@/components/admin/AdminLayout'
import CategoriesManager from '@/components/admin/CategoriesManager'

export const metadata: Metadata = {
  title: 'Gestionar Pueblos | Admin - Antioquia High Vibes',
}

export default function CategoriesPage() {
  return (
    <AdminLayout>
      <CategoriesManager />
    </AdminLayout>
  )
}
