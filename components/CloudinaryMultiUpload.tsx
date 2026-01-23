'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useState } from 'react'
import { Upload, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface CloudinaryMultiUploadProps {
  onImagesUpload: (imageUrls: string[]) => void
  placeholder?: string
  currentImages?: string[]
}

export default function CloudinaryMultiUpload({
  onImagesUpload,
  placeholder = 'Sube imágenes',
  currentImages = [],
}: CloudinaryMultiUploadProps) {
  const [images, setImages] = useState<string[]>(currentImages)
  const MAX_IMAGES = 20

  const handleUpload = (result: any) => {
    if (result.event === 'success') {
      setImages((prevImages) => {
        const imageUrl = result.info.secure_url
        const newImages = [...prevImages, imageUrl]
        onImagesUpload(newImages)
        return newImages
      })
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onImagesUpload(newImages)
  }

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUpload}
        options={{
          multiple: true,
          maxFiles: MAX_IMAGES - images.length,
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open?.()}
            disabled={images.length >= MAX_IMAGES || !open}
            className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 dark:hover:border-primary-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-center space-y-2">
              <>
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {images.length >= MAX_IMAGES ? 'Límite de 20 imágenes alcanzado' : placeholder}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {images.length > 0 && `${images.length}/${MAX_IMAGES} imagen${images.length !== 1 ? 'es' : ''} cargada${images.length !== 1 ? 's' : ''}`}
                </span>
              </>
            </div>
          </button>
        )}
      </CldUploadWidget>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden">
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={image}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
