import { Suspense } from 'react'
import Hero from './Hero'

export default function HeroWrapper() {
  return (
    <Suspense fallback={null}>
      <Hero />
    </Suspense>
  )
}
