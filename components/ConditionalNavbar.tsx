'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // No renderizar hasta que esté montado
  if (!mounted) {
    return <div className="h-20" /> // Placeholder para evitar layout shift
  }
  
  // No mostrar Navbar en rutas de admin
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <Navbar />
}