'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface PropertyGalleryProps {
  images: string[]
  name: string
}

export default function PropertyGallery({ images, name }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-1 xs:gap-2 h-64 xs:h-80 sm:h-96 md:h-[500px] rounded-xl xs:rounded-2xl overflow-hidden">
        {/* Main Image */}
        <div className="col-span-2 row-span-2 relative group cursor-pointer">
          <Image
            src={images[0] || '/images/placeholder.jpg'}
            alt={`${name} - Principal`}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center"
            onClick={() => openLightbox(0)}
          >
            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Secondary Images */}
        {images.slice(1, 5).map((image, index) => (
          <div key={index + 1} className="relative group cursor-pointer">
            <Image
              src={image || '/images/placeholder.jpg'}
              alt={`${name} - ${index + 2}`}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center"
              onClick={() => openLightbox(index + 1)}
            >
              <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {index === 3 && images.length > 5 && (
              <div
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
                onClick={() => openLightbox(index + 1)}
              >
                <span className="text-white text-2xl font-bold">
                  +{images.length - 5}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeLightbox()
              }
            }}
            onTouchEnd={(e) => {
              if (e.target === e.currentTarget) {
                closeLightbox()
              }
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              onTouchEnd={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              className="absolute top-2 xs:top-3 sm:top-6 right-2 xs:right-3 sm:right-6 p-2 xs:p-2.5 sm:p-3 text-white bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 z-[200] flex-shrink-0 shadow-lg"
            >
              <X className="w-6 h-6 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              onTouchEnd={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-2 xs:left-3 sm:left-4 p-1.5 xs:p-2 sm:p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              onTouchEnd={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-2 xs:right-3 sm:right-4 p-1.5 xs:p-2 sm:p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-white text-xs xs:text-sm">
              {selectedImage + 1} / {images.length}
            </div>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-4xl xs:max-w-5xl sm:max-w-6xl max-h-[85vh] xs:max-h-[88vh] sm:max-h-[90vh] mx-2 xs:mx-3 sm:mx-4 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage]}
                alt={`${name} - ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}