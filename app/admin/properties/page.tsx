import { Metadata } from 'next'
import AdminLayout from '@/components/admin/AdminLayout'
import PropertiesManager from '@/components/admin/PropertiesManager'

export const metadata: Metadata = {
  title: 'Gestionar Fincas | Admin - Antioquia High Vibes',
}

export default function PropertiesPage() {
  return (
    <AdminLayout>
      <PropertiesManager />
    </AdminLayout>
  )
}
